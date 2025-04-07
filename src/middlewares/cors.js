// CORS 문제 해결 미들웨어
import cors from 'cors'

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

export const corsMiddleware = cors(corsOptions);