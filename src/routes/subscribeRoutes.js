import express from 'express';
import { subscribeUser } from '../controllers/subscribeController.js';

const router = express.Router();

// POST /api/subscribe 요청시 라우팅
router.post('/', subscribeUser);

export default router;