import { generateTempToken } from "../utils/token.js";

// 토큰을 생성하고 리턴하는 비지니스 로직
export const generateToken = async (email) => {
    return generateTempToken(email);
};