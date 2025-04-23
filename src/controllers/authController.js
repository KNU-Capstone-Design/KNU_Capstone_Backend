import { UserAuth } from "../models/userAuth.js";

export const verifyTokenAndSetCookie = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ error: "토큰이 없습니다." });
        }

        const record = await UserAuth.findOne({ token });
        if (!record) {
            return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
        }

        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Https 적용 후 반드시 true로 설정
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1일
        });

        return res.status(200).json({ message: "토큰 인증 성공" });
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
};