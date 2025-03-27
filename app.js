/* Entry Point */
import express from 'express'
import connectDB from './src/config/mongoose.js'
import subscribeRoutes from './src/routes/subscribeRoutes.js'

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 라우터 설정
app.use('/api/subscribe', subscribeRoutes);

// DB실행
connectDB();

// 서버 실행
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
