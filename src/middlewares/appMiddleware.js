import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

export const setupMiddleware = (app) => {
    // CORS 설정
    app.use(cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // 보안 헤더 설정
    app.use(helmet());

    // 기본 미들웨어
    app.use(express.json());
    app.use(cookieParser());

    // 배포 환경 설정
    if (process.env.NODE_ENV === 'production') {
        app.set('trust proxy', 1);
    }
};