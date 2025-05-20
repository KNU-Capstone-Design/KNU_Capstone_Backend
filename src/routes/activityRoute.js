import express from 'express';
import { getUserActivities } from '../controllers/activityController.js';

const router = express.Router();

/* 페이지네이션된 답변 이력 조회 */
 
router.get('/', getUserActivities);

export default router;
