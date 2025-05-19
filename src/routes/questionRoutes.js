import express from 'express';
import { getQuestion } from "../controllers/questionController.js";
import { getAllQuestions, createQuestion, updateQuestion, deleteQuestion } from '../controllers/questionController.js';
const router = express.Router();

// GET /api/questions/:questionId 요청시 라우팅
router.get('/:questionId', getQuestion);
// GET /api/questions/ 요청시 라우팅
router.get('/', getAllQuestions);
// POST /api/questions/ 요청시 라우팅
router.post('/', createQuestion);
// PUT /api/questions/:id 요청시 라우팅
router.put('/:id', updateQuestion);
// DELETE /api/quetions/:id 요청시 라우팅
router.delete('/:id', deleteQuestion);

export default router;
