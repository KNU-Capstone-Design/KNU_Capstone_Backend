import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();
//임시 작성, 나중에 모델이 확정되면 API키 작성 예정.
async function getFeedbackFromGroq(userAnswer) {
    const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
            model: 'llama3-8b-8192',
            messages: [
                {
                    role: 'system',
                    content: `
            너는 소프트웨어 기술 면접 답변을 평가하는 AI 멘토이다.
            평가 항목:
            1.종합 점수:
            2. 잘한 점:
            3. 개선해야 할 점:
            4. 툴린 점:
          `
                },
                {
                    role: 'user',
                    content: `다음 답변을 평가해줘: "${userAnswer}"`,
                }
            ],
            temperature: 0.5,
            max_tokens: 500,
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
        }
    );

    return response.data.choices[0].message.content;
}

module.exports = { getFeedbackFromGroq };