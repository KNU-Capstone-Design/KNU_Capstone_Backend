import { generateToken } from "../services/authService.js";
import { TEMP_TOKEN_EXPIRY_MS } from "../config/constants.js";
import { TempAuth } from "../models/tempAuth.js";

export const requestToken = async (req, res) => {
    const { email } = req.body;

    // 이메일이 누락됬을 경우의 예외 처리
    if (!email) {
        return res.status(400).json({ error: '이메일이 누락되었습니다.' });
    }

    try {
        const token = await generateToken(email);

        return res.status(200).json({
            token,
            message: '임시 토큰이 발급되었습니다.'
        });
    } catch (err) {
        console.error('Token 발급 실패', err);
        res.status(500).json({ error: "Server error" });
    }
};
