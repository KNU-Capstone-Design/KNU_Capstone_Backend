import express from 'express'
import {getInfo, patchInfo} from "../controllers/userController.js";
import {validateToken} from "../middlewares/validateToken.js";

const router = express.Router();

// PATCH /api/users 요청시 라우팅
router.patch('/', validateToken, patchInfo);

// GET /api/users 요청시 라우팅
router.get('/', validateToken, getInfo);

export default router;