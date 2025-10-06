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
                max_tokens: 1024,
                top_p: 0.8,
                messages: [
                    {
                        role: 'system',
                        content: `너는 친절하지만 현실적인 컴퓨터 회사 면접관이야.면접자의 입장에서 평가하고, 다음번에 맞출 수 있도록 자세히 피드백해줘. 너무 작은 실수로 감점을 하지 마. 사용자의 답변을 다음 기준에 따라 평가하되, 점수를 0점, 20점, 40점, 60점, 80점, 100점 중 하나로 선택해.
                        100점도 실제 면접에서 충분히 받을 수 있는 점수이니, 너무 보수적으로 평가하지 마. 작은 오류는 감점 사유가 아니야.
                        사용자가 질문과 관련되지 않은 답변을 하는 경우 0점으로 처리해.
[점수 기준]
- 100점: 완벽한 이해. 실제 면접에서 "이 지원자는 꼭 뽑아야겠다"는 생각이 드는 답변.
- 80점: 핵심 개념과 흐름을 정확히 이해하고 있으며, 사소한 부분을 제외하면 훌륭한 답변.
- 60점: 개념은 알고 있으나, 설명이 부족하거나 약간의 오해가 포함된 답변.
- 40점: 핵심 개념을 잘못 이해하고 있는 답변.
- 20점: 질문의 의도조차 파악하지 못한 답변.
- 0점: 답변을 하지 못함.

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
너는 숙련된 컴퓨터공학 교수이자 개발자이다. 사용자가 묻는 질문에 대해 반드시 JSON 객체 형태로만 매유 상세하게 답변하라.

출력 스키마:
{
  "answer": "핵심 답변 문자열",
  "explanation": "왜 그렇게 되는지 원리나 배경을 설명. 4 ~ 5 문장으로 구성.",
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
