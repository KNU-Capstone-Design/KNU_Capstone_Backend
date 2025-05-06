import express from 'express';
import {getAnswer, requestAnswer} from "../controllers/answerController.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = express.Router();

// POST /api/answers/{questionId} 요청시 라우팅
router.post('/:questionId', validateToken, requestAnswer);

// POST /api/answers/reveal/{questionId} 요청시 라우팅
router.post('/reveal/:questionId', validateToken, getAnswer)

export default router;