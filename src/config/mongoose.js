import mongoose from 'mongoose'
import dotenv from 'dotenv'

// dotenv 실행
dotenv.config();

//mongoDB연결
const connectDB = async() => {
    console.log("DB 연결 시도");
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log('DB 연결 성공'))
        .catch((e) => console.error('DB 연결 실패:', e));
}

export default connectDB;