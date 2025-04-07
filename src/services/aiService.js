import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

async function getFeedbackFromGroq(userAnswer) {
  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'qwen-2.5-coder-32b',
      temperature: 0,  // 무작위성 조절 ,0에 가까울수록 답변이 안정적, 1에 가까울수록 다양함 적정수치 0.0 ~ 0.2 
      max_tokens: 700, // 800토큰이 600~700자임, 너무 길면 무한루프 나올수도 있음  적정수치 : 500 ~ 1000
      frequency_penalty: 0.3, // 같은 말이 너무 많이 나오는거 방지, "좋았습니다, 잘했습니다" 이런거 적게나오게됨, 적정수치 : 0.2 ~ 0.5
      messages: [
        {
          role: 'system',
          content: `너는 컴퓨터 회사의 면접관이야. 사용자의 답변을 다음 기준에 따라 평가해.

[점수 기준]
- 개념이 정확한가: 30점
- 용어 사용이 정확한가: 20점
- 문장력이 좋은가: 10점
- 빠뜨린 설명이 있는가: 20점
- 기타 (논리 흐름, 실무 맥락 등): 20점

[출력 형식은 아래 예시를 꼭 따를 것]

점수: NN점
세부내용:
개념이 정확한가: NN/30
용어의 사용이 올바른가: NN/20
문장력이 좋은가: NN/10
빠뜨린 설명이 있는가: NN/20
기타: NN/20
잘한 점: ... (두 줄)
부족한 점: ... (두 줄)
고칠 점: ... (두 줄)`
        },
        {
          role: 'user',
          content: `문제: 논클러스터드 인덱스의 기본 원리와 장단점은 무엇인가요?\n답변: ${userAnswer}`
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

export { getFeedbackFromGroq };