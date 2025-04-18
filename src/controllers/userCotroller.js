import { getUserInfo } from "../services/userService.js";

// 사용자 정보를 조회 컨트롤러
export const getInfo = async (req, res) => {
    try {
        // 추후 토큰인증 미들웨어를 거처서 사용자 이메일을 반환하는 로직 설계 필요
        const userInfo = await getUserInfo(req.email);
        res.status(200).json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}