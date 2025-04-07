import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import aiRouter from './routes/ai.route.js'; // 경로 확인

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(express.json());

// 라우터
app.use('/api/ai', aiRouter);

// DB 연결    *****************************수정필요*********************************/
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(' MongoDB 연결 성공');
    app.listen(PORT, () => {
      console.log(` 서버 실행 중: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error(' DB 연결 오류:', err);
  });
/**********************************************************************************/