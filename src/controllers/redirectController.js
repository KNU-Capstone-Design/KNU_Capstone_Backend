import { generateToken} from "../services/authService.js";

// 인증 후 사용자에게 서비스로 리다이렉트 해주는 컨트롤러
export const requestTokenAndRedirect = async (req, res) => {
    // /api/auth/redirect?email=user@example.com&questionID=q001&target=answer 요청에서 쿼리 파라미터 추출
    const { email, questionID, target } = req.query;
    if (!email || !questionID || !target) { // 파라미터 누락시
        return res.status(400).send("email, questionID, target이 필요합니다.");
    }
    try {
        const token = await generateToken(email);

        const redirectMap = {
            answer: "/answer",
            review: "/review",
            retry: "/retry"
        };
        const path = redirectMap[target];
        if (!path) return res.status(400).send("유효하지 않은 target입니다.");
        // 리다이렉트 응답을 반환하여 자동으로 이동시킴.
        const redirectUrl = `http://20.39.191.62:3000/{path}?token=${token}&questionID=${questionID}`;
        return res.redirect(302, redirectUrl);
    } catch (err) {
        console.error("리다이렉트 실패", err);
        return res.status(500).send("Server Error");
    }
};
