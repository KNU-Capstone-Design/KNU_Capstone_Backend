import express from 'express'
import subscribeController from '/src/controllers/subscribeController.js'

const router = express.Router();

router.post('/api/subscribe',subscribeController.subscribeUser);

export default router;