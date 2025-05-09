import {getUserInfo, patchUserInfo} from "../services/userService.js";

// 사용자 정보를 조회 컨트롤러
export const getInfo = async (req, res) => {
    try {
        const userInfo = await getUserInfo(req.email);
        res.status(200).json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}

// 사용자 정보 수정 컨트롤러
export const patchInfo = async (req, res) => {
    try {
        const { category } = req.body;
        await patchUserInfo(req.email, category);
        res.status(200).json({message: "구독 항목 변경 완료"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}