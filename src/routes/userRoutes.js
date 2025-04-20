import express from 'express'
import {requestTokenAndRedirect} from "../controllers/redirectController.js";
import {getInfo, patchInfo} from "../controllers/userCotroller.js";
import {validateToken} from "../middlewares/validateToken.js";

const router = express.Router();

// PATCH /api/users 요청시 라우팅
router.patch('/', validateToken, patchInfo);

// GET /api/users 요청시 라우팅
router.get('/', validateToken, getInfo);

export default router;