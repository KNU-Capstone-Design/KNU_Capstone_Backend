/* Entry Point */
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/mongoose.js';
import { setupMiddleware } from './src/middlewares/appMiddleware.js';
import './src/cron/emailCron.js';
import './src/cron/recordCron.js';

// 라우터 임포트
import subscribeRoutes from './src/routes/subscribeRoutes.js';
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import questionRoutes from "./src/routes/questionRoutes.js";
import answerRoutes from "./src/routes/answerRoutes.js";
import activityRoute from "./src/routes/activityRoutes.js";
import logRoutes from "./src/routes/logRoutes.js";

// AdminJS에서 사용할 모델 임포트
import { setupCSP } from './src/middlewares/adminMiddleware.js';
import { setupAdminJS} from './src/config/admin.js';
import { setupAdminRouter } from "./src/routes/adminRoutes.js";
import apiLimiter from './src/middlewares/rateLimiter.js';
import cookieParser from "cookie-parser";
import serverRoutes from "./src/routes/serverRoutes.js";

dotenv.config();
// 애플리케이션 시작 함수
const start = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || 'localhost';

  // DB 연결
  connectDB();

  // 미들웨어 설정 적용
  setupMiddleware(app);
  setupCSP(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // 모든 API 요청에 rate-limit 적용
  app.use('/api', apiLimiter);

  // 기본 라우트
  app.get('/', (req, res) => {
    res.send('Server is running!');
  });

  // API 라우터 설정
  app.use('/api/users', userRoutes);
  app.use('/api/subscribe', subscribeRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/answers', answerRoutes);
  app.use('/api/questions', questionRoutes);
  app.use('/api/activities', activityRoute);
  app.use('/api/server-resources', serverRoutes);
  app.use('/api/logs', logRoutes);

  // AdminJS 설정
  const admin = setupAdminJS();
  await admin.watch()
  setupAdminRouter(app, admin);

  // 서버 실행
  app.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
    console.log(`AdminJS started on http://${HOST}:${PORT}${admin.options.rootPath}`);
  });
};

// Admin 실행 예외 처리
start().catch(err => {
  console.error('애플리케이션 시작 중 오류 발생:', err);
});