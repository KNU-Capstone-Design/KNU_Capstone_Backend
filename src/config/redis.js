import dotenv from 'dotenv';
import { createClient } from 'redis';
import { createLogger } from '../utils/logger.js';

dotenv.config();

const logger = createLogger('redis');

const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const redisUrl = REDIS_PASSWORD
    ? `redis://:${encodeURIComponent(REDIS_PASSWORD)}@${REDIS_HOST}:${REDIS_PORT}`
    : `redis://${REDIS_HOST}:${REDIS_PORT}`;

export const redisClient = createClient({ url: redisUrl });

// 연결 상태 모니터링 이벤트
redisClient.on('error', (err) => logger.error('Redis Error', { error: err.message, stack: err.stack }));
redisClient.on('connect', () => logger.info('Redis connected'));

// 앱 실행 시 최초 1회 호출할 연결 함수
export const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        logger.error('Redis 연결 실패', { error: error.message, stack: error.stack });
    }
};
