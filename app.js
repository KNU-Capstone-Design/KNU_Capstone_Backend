/* Entry Point */
import express from 'express'
import connectDB from './src/config/mongoose.js'
import subscribeRoutes from './src/routes/subscribeRoutes.js'
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
const port = 3000;

// json파싱을 위한 미들웨어 추가
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 라우터 설정
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/auth', authRoutes);

// DB실행
connectDB();

// 서버 실행
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
