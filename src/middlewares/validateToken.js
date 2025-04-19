import { UserAuth } from "../models/userAuth.js";
import { invalidTokenError } from "../utils/errors.js";

// 토큰 유효성 검증 미들웨어 token이 필요한 서비스는 이 미들웨어를 거처서 컨트롤러에 도달해야함
export const validateToken = async (req, res, next) => {
    try {
        // 쿠키에서 토큰 추출
        const token = req.cookies.token;

        // 토큰 누락 체크
        if (!token) {
            return res.status(400).json({ error: "토큰이 필요합니다." });
        }

        const record = await UserAuth.findOne({ token });

        // 존재 여부 체크
        if (!record) {
            throw invalidTokenError();
        }

        // 이후 컨트롤러에서 사용자 정보 활용할 수 있도록 추가
        req.email = record.email;

        next();
    } catch (err) {
        const status = err.statusCode || 500;
        const message = err.message || "토큰 인증 중 오류가 발생했습니다.";
        return res.status(status).json({ error: message });
    }
};