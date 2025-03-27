import express from 'express';
import { subscribeUser } from '../controllers/subscribeController.js';

const router = express.Router();

// POST /api/subscribe
router.post('/', subscribeUser);

export default router;