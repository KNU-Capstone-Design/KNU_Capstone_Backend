import express from 'express';
import { getQuestion } from "../controllers/questionController.js";

const router = express.Router();

// GET /api/questions/:questionId 요청시 라우팅
router.get('/:questionId', getQuestion);

export default router;