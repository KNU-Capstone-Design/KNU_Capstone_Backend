import express from 'express'
import { requestToken } from "../controllers/authController.js";
import {requestTokenAndRedirect} from "../controllers/redirectController.js";
import { getInfo } from "../controllers/userCotroller.js";

const router = express.Router();

// GET /api/users 요청시 라우팅
router.patch('/', requestToken);

// PATCH /api/users 요청시 라우팅
router.get('/', getInfo);

export default router;