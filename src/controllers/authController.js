import { generateToken } from "../services/authService.js";
import { TEMP_TOKEN_EXPIRY_MS } from "../config/constants.js";
import TempAuth from "../models/tempAuth.js";

export const requestToken = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: '이메일이 누락되었습니다.' });
    }

    try {
        // 1. 토큰 생성
        const token = await generateToken(email);

        // 2. 만료 시간 계산 (현재 시간 + 10분)
        const expiresAt = new Date(Date.now() + TEMP_TOKEN_EXPIRY_MS);

        // 3. TempAuth에 저장 (upsert: 있으면 갱신, 없으면 생성)
        await TempAuth.findOneAndUpdate(
            { email },
            { token, expiresAt },
            { upsert: true, new: true }
        );

        res.status(200).json({
            token,
            message: '임시 토큰이 발급되었습니다.'
        });
    } catch (err) {
        console.error('[Token 발급 실패]', err);
        res.status(500).json({ error: '서버 오류: 토큰 발급 실패' });
    }
};