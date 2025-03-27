import express from 'express'
import tokenContoroller from "../controllers/tokenController.js";

const router = express.Router();

// POST /api/token/request 요청시 라우팅
router.post('/api/token/request', tokenContoroller.generateTempToken);

export default router;