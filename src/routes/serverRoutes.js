import express from 'express';
import { getServerResources, getDailyApiUsage, getSmtpUsage } from "../controllers/serverController.js";

const router = express.Router();

router.get('/', getServerResources);
router.get('/api-usage', getDailyApiUsage);
router.get('/smtp-usage', getSmtpUsage);

export default router;
