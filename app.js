/* Entry Point */
import connectDB from './src/config/mongoose.js'
import express from 'express'

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// DB실행
connectDB();

// 서버 실행
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
