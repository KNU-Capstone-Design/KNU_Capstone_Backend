// CORS 문제 해결 미들웨어
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const corsOptions = {
    origin: process.env.FRONTURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

export const corsMiddleware = cors(corsOptions);