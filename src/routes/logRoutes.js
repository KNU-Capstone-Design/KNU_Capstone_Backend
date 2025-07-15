import express from 'express';
import LogController from '../controllers/logController.js';

const router = express.Router();

// 애플리케이션 로그 조회
router.get('/app', LogController.getAppLogs);

// 에러 로그 조회
router.get('/error', LogController.getErrorLogs);

export default router;
