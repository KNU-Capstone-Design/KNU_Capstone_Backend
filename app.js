/* Entry Point */
import express from 'express';
import connectDB from './src/config/mongoose.js';
import subscribeRoutes from './src/routes/subscribeRoutes.js';
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import { setupMiddleware } from './src/middlewares/appMiddleware.js';
import dotenv from 'dotenv';
import './src/cron/emailCron.js';
import questionRoutes from "./src/routes/questionRoutes.js";
import answerRoutes from "./src/routes/answerRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

dotenv.config();

// 미들웨어 설정 적용
setupMiddleware(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 라우터 설정
app.use('/api/users', userRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/questions', questionRoutes);

// DB실행
connectDB();

// 서버 실행
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});