import axios from 'axios'
import dotenv from 'dotenv'
import { createLogger } from "../utils/logger.js";

dotenv.config();

// 로거 생성
const logger = createLogger('aiService')

/* groq api를 호출해서 피드백을 받는 비지니스 로직 */
export async function getFeedbackFromGroq(userQuestion, userAnswer) {
    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
                temperature: 0,
                max_tokens: 700,
                top_p: 0.8,
                messages: [
                    {
                        role: 'system',
                        content: `너는 컴퓨터 회사의 면접관이야. 사용자의 답변을 다음 기준에 따라 평가하되, 점수를 0점, 20점, 40점, 60점, 80점, 100점 중 하나로 선택해.
                    너무 깐깐하게 평가하지 말고 면접자의 입장에서 피드백하는 톤으로 써줘.

[점수 기준]
- 100점: 완벽함. 모든 기준 충족.
- 80점: 개념과 흐름이 좋으나 세부 설명 부족
- 60점: 개념은 이해했으나 용어나 논리가 약함
- 40점: 핵심 개념 이해 부족
- 20점: 개념 자체를 거의 이해하지 못함
- 0점 : 아무것도 입력을 하지 못함

[출력 형식은 아래 예시를 따를 것]

점수: NN점  
잘한 점: ... (최대 5줄)  
부족한 점: ... (최대 5줄)  
틀린 점: ... (최대 5줄)
                    `
                    },
                    {
                        role: 'user',
                        content: `문제:${userQuestion}\n답변: ${userAnswer}`
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        logger.error('피드백 API 호출간 오류 발생', {
            error: error.message,
            stack: error.stack,
            userQuestion: userQuestion
        })
    }
}

/* 사용자가 “모르겠어요” 버튼을 클릭했을때 AI한테 정답을 제공받는 비지니스 로직 */
export async function getAnswerFromGroq(userQuestion) {
    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
                temperature: 0,
                max_tokens: 700,
                top_p: 0.8,
                messages: [
                    {
                        role: 'system',
                        content: `
너는 숙련된 컴퓨터공학 교수이자 개발자이다. 사용자가 묻는 질문에 대해 반드시 JSON 객체 형태로만 답변하라.

출력 스키마:
{
  "answer": "핵심 답변 문자열",
  "explanation": "간결하고 명확한 추가 설명",
  "examples": ["예시 문장1", "예시 문장2"],    // 필요 시
  "notes": ["추가 메모1", "추가 메모2"]         // 필요 시
}

– JSON 외 다른 형식(마크다운, 코드 블록 등) 사용 금지  
– 문자열 내부 개행만 허용, 키·값 쌍으로 읽기 쉽게 구성  
                    `.trim()
                    },
                    {
                        role: 'user',
                        content: `문제: ${userQuestion}`
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content;
    }
    catch (error) {
        logger.error('정답 요청 API 호출간 오류 발생 ', {
            error: error.message,
            stack: error.stack,
            userQuestion: userQuestion
        })
    }
}
