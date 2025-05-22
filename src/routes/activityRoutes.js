import express from 'express';
import { getUserActivities, getDetailUserActivities } from '../controllers/activityController.js';
import { validateToken } from "../middlewares/validateToken.js";

const router = express.Router();

// GET /api/activities?page={page}&limit={limit} 요청시 라우팅
router.get('/',validateToken, getUserActivities);
// GET /api/activities/{questionId} 요청시 라우팅
router.get('/:activityId',validateToken, getDetailUserActivities);

export default router;
