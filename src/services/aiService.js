import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

    /* groq api를 호출해서 피드백을 받는 비지니스 로직 */
export async function getFeedbackFromGroq(userQuestion, userAnswer) {
    const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
            model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
            temperature: 0,  // 무작위성 조절 ,0에 가까울수록 답변이 안정적, 1에 가까울수록 다양함 적정수치 0.0 ~ 0.2
            max_tokens: 700, // 800토큰이 600~700자임, 너무 길면 무한루프 나올수도 있음  적정수치 : 500 ~ 1000
            top_p: 0.8, // 모델이 다음 단어를 생성할 때, 확률이 높은 상위 k개만 고려해서 무작위로 선택합니다.
            // frequency_penalty: 0.3 같은 말이 너무 많이 나오는거 방지, 적정수치 : 0.2 ~ 0.5, llama 계열에선 의미 없음, repetition_penalty 값이 좋은데 API에서 안받음
            messages: [
                {
                    role: 'system',
                    content: `너는 컴퓨터 회사의 면접관이야. 사용자의 답변을 다음 기준에 따라 너무 깐깐하지 않게 평가하고 출력 형식을 맞춰서 한글로 응답해.
                    [점수 기준]
                    - 개념이 정확한가: 30점
                    - 용어 사용이 정확한가: 20점
                    - 문장력이 좋은가: 10점
                    - 빠뜨린 설명이 있는가: 20점
                    - 기타 (논리 흐름, 실무 맥락 등): 20점
                    
                    [출력 형식은 아래 예시를 꼭 따를 것]
                    
                    점수: NN점
                    잘한 점: ... (세 줄)
                    부족한 점: ... (세 줄)
                    고칠 점: ... (세 줄)
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
            temperature: 0,  // 무작위성 조절 ,0에 가까울수록 답변이 안정적, 1에 가까울수록 다양함 적정수치 0.0 ~ 0.2
            max_tokens: 700, // 800토큰이 600~700자임, 너무 길면 무한루프 나올수도 있음  적정수치 : 500 ~ 1000
            top_p: 0.8, // 모델이 다음 단어를 생성할 때, 확률이 높은 상위 k개만 고려해서 무작위로 선택합니다.
            // frequency_penalty: 0.3 같은 말이 너무 많이 나오는거 방지, 적정수치 : 0.2 ~ 0.5, llama 계열에선 의미 없음, repetition_penalty 값이 좋은데 API에서 안받음
            messages: [
                {
                    role: 'system',
                    content: '너는 실력있는 개발자이자 컴퓨터공학과 교수야 사용자가 질문을 아예 몰라서 너한테 물어본 상황이니 정확하고 간결하게 설명해'
                },
                {
                    role: 'user',
                    content: `문제:${userQuestion}`,
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
