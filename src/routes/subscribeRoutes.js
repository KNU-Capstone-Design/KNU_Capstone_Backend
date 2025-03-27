import express from 'express'
import subscribeController from '/src/controllers/subscribeController.js'

const router = express.Router();

// POST /api/subscribe 요청시 라우팅
router.post('/api/subscribe',subscribeController.subscribeUser);

export default router;