import express from 'express';
import {getAnswer, requestAnswer} from "../controllers/answerController.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validateAnswer } from "../middlewares/validation.js";

const router = express.Router();

// POST /api/answers/{questionId} 요청시 라우팅
router.post('/:questionId', validateToken, validateAnswer, requestAnswer);

// POST /api/answers/reveal/{questionId} 요청시 라우팅
router.get('/reveal/:questionId', validateToken, getAnswer)

export default router;