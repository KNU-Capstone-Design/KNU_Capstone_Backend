import generateTempToken from "../utils/token.js";

// 토큰 생성해서 리턴하는 비지니스 로직
exports.generateToken = async (email) => {
    return generateToken(email);
};