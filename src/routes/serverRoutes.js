import express from 'express';
import { getServerResources } from "../controllers/serverController.js";

const router = express.Router();

router.get('/',getServerResources)

export default router