import express from 'express';
import { subscribeUser, unsubscribe } from '../controllers/subscribeController.js';

const router = express.Router();

// POST /api/subscribe 요청시 라우팅
router.post('/', subscribeUser);

// PATCH /api/subscribe 요청시 라우팅
router.patch('/', unsubscribe);

export default router;