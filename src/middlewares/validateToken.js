import { UserAuth } from "../models/userAuth.js";
import { invalidTokenError } from "../utils/errors.js";
import { redisClient } from "../config/redis.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger('validateToken');

// 토큰 유효성 검증 미들웨어 token이 필요한 서비스는 이 미들웨어를 거처서 컨트롤러에 도달해야함
export const validateToken = async (req, res, next) => {
    try {
        // 쿠키에서 토큰 추출
        const token = req.cookies.token;

        // 토큰 누락 체크
        if (!token) {
            return res.status(400).json({ error: "토큰이 필요합니다." });
        }

        // 1) Redis 캐시 조회 (token -> email)
        const cacheKey = `token:${token}`;
        try {
            if (redisClient?.isReady) {
                const cachedEmail = await redisClient.get(cacheKey);
                if (cachedEmail) {
                    req.email = cachedEmail;
                    return next();
                }
            }
        } catch (redisError) {
            // Redis 오류시 DB접근
            logger.warn('Redis 장애, DB에 접근', {
                error: redisError.message,
                stack: redisError.stack,
            });
        }

        // 2) 캐시 미스 → MongoDB 조회
        const record = await UserAuth.findOne({ token }).lean();

        // 존재 여부 체크
        if (!record) {
            throw invalidTokenError();
        }

        // 이후 컨트롤러에서 사용자 정보 활용할 수 있도록 추가
        req.email = record.email;

        // 3) 캐시에 저장 (TTL)
        const ttlSeconds = Number(process.env.TOKEN_CACHE_TTL_SECONDS);
        try {
            if (redisClient?.isReady) {
                await redisClient.set(cacheKey, record.email, { EX: ttlSeconds });
            }
        } catch (redisError) {
            logger.warn('Redis 장애', {
                error: redisError.message,
                stack: redisError.stack,
            });
        }

        return next();
    } catch (err) {
        const status = err.statusCode || 500;
        const message = err.message || "토큰 인증 중 오류가 발생했습니다.";
        return res.status(status).json({ error: message });
    }
};