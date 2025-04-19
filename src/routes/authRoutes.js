import express from 'express'
import { verifyTokenAndSetCookie } from "../controllers/authController.js";
import { requestTokenAndRedirect } from "../controllers/redirectController.js";

const router = express.Router();

router.post("/verify", verifyTokenAndSetCookie);

// GET /api/auth/redirect? 요청시 라우팅
router.get('/auth/redirect', requestTokenAndRedirect);

export default router;