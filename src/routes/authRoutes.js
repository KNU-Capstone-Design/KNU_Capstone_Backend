import express from 'express'
import { requestToken } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/token 요청시 라우팅
router.post('/token', requestToken);

export default router;