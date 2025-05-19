import express from 'express'
import { verifyTokenAndSetCookie } from "../controllers/authController.js";
import { redirectController } from "../controllers/redirectController.js";

const router = express.Router();

// POST /api/auth/verify 요청시 라우팅
router.post("/verify", verifyTokenAndSetCookie);

// GET /api/auth/redirect? 요청시 라우팅
router.get('/auth/redirect', redirectController);

export default router;