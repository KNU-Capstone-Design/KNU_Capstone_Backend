import express from 'express';
import { requestAnswer } from "../controllers/answerController.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = express.Router();

// POST /api/answers 요청시 라우팅
router.post('/:questionId', validateToken, requestAnswer);

export default router;