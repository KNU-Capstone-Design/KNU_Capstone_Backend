import rateLimit from 'express-rate-limit';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('rateLimiter');

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1분
    max: 100, // 1분 동안 100개 요청 허용
    handler: (req, res, next, options) => {
        logger.warn(`[RateLimit] IP ${req.ip}에서 과도한 요청이 감지되었습니다.`, {
            url: req.originalUrl,
            method: req.method,
        });
        res.status(options.statusCode).json({
            error: "너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요."
        });
    },
    standardHeaders: true, // `RateLimit-*` 헤더를 응답에 포함
    legacyHeaders: false, // `X-RateLimit-*` 헤더 비활성화
});

export default apiLimiter;

