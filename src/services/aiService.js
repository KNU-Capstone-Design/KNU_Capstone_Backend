import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

/* groq api를 호출해서 피드백을 받는 비지니스 로직 */
export async function getFeedbackFromGroq(userQuestion, userAnswer) {
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
                    content: `너는 컴퓨터 회사의 면접관이야. 사용자의 답변을 다음 기준에 따라 평가하되, 점수를 0점, 20점, 40점, 60점, 80점, 100점 중 하나로 선택해. 너무 깐깐하게 평가하지 말고 면접자의 입장에서 피드백하는 톤으로 써줘.

[점수 기준]
- 100점: 완벽함. 모든 기준 충족.
- 80점: 개념과 흐름이 좋으나 세부 설명 부족
- 60점: 개념은 이해했으나 용어나 논리가 약함
- 40점: 핵심 개념 이해 부족
- 20점: 개념 자체를 거의 이해하지 못함
- 0점 : 아무것도 입력을 하지 못함함

[출력 형식은 아래 예시를 따를 것]

점수: NN점  
잘한 점: ... (최대 3줄)  
부족한 점: ... (최대 3줄)  
고칠 점: ... (최대 3줄)
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
}

/* 사용자가 모르겠어요 버튼을 클릭했을때 AI한테 정답을 제공받는 비지니스 로직 */
export async function getAnswerFromGroq(userQuestion) {
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
                    content: '너는 실력있는 개발자이자 컴퓨터공학과 교수야. 사용자가 질문을 아예 몰라서 너한테 물어본 상황이니 정확하고 간결하게 설명해.그리고 특수문자는 절대 사용하지마'
                },
                {
                    role: 'user',
                    content: `문제:${userQuestion}`
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
