import express from 'express'
import { requestToken } from "../controllers/authController.js";
import {requestTokenAndRedirect} from "../controllers/redirectController.js";

const router = express.Router();

// GET /api/users 요청시 라우팅
router.post('/users', requestToken);

// PATCH /api/users 요청시 라우팅
router.get('/users', requestTokenAndRedirect);

export default router;