/* AI 채점 API 라우터 */

import express from 'express';
import { getFeedbackFromGroq } from '../services/aiService.js';

const router = express.Router();

/**
사용자의 답변을 AI를 통해 채점하고 피드백을 반환
Body: { answer: "사용자 답변 내용" }
**/
router.post('/grade', async (req, res) => {
  try {
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({ error: '답변이 누락되었습니다.' });
    }

    const feedback = await getFeedbackFromGroq(answer);
    res.status(200).json({ feedback });
  } catch (err) {
    console.error('AI 평가 오류:', err.message);
    res.status(500).json({ error: 'AI 채점 중 오류가 발생했습니다.' });
  }
});

export default router;
