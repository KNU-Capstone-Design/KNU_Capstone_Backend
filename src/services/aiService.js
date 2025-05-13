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
                    content: '너는 실력 있는 개발자이자 컴퓨터공학과 교수야. 사용자는 질문 내용을 거의 모르고 너에게 설명을 듣는 상황이야. 설명은 정확하고 간결하게 전달해야 한다. 수학 기호(O(n²), ≥, → 등)는 자유롭게 사용해도 된다.문장은 반드시 마침표로 끝내고, 문장 구조는 줄바꿈을 활용해 작게 나눠야 한다. 가독성을 높이기 위해 리스트, 소제목, 빈 줄을 적극 활용해야 한다. 서술형 문단은 피하고,줄 바꿈을 적극적으로 활용해서 여러 문단으로 구성된 짧고 정돈된 블록 형태로 출력해야 한다.마크다운 기호는 절대 사용하지 않는다. 대신 이모지는 가독성을 위해 사용할 수 있다. 답변은 잘 정돈된 노트처럼 보여야 한다.'
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
