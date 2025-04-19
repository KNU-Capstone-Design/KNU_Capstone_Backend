import * as crypto from "node:crypto";

// 토큰 생성
export const generateTempToken = (email) => {
    return crypto.createHash('sha256')
        .update(email + process.env.TOKEN_SECRET)
        .digest('hex');
};