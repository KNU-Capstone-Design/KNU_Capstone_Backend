import express from 'express'
import { requestToken } from "../controllers/authController.js";
import {requestTokenAndRedirect} from "../controllers/redirectController.js";

const router = express.Router();

// POST /api/auth/token 요청시 라우팅
router.post('/token', requestToken);

// GET /api/auth/redirect? 요청시 라우팅
router.get('/auth/redirect', requestTokenAndRedirect);

export default router;