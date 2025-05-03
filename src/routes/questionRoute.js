import express from 'express';
import { getAllQuestions, createQuestion, updateQuestion, deleteQuestion } from '../controllers/questionController.js';

const router = express.Router();

router.get('/', getAllQuestions);
router.post('/', createQuestion);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;