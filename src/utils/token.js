import * as crypto from "node:crypto";

// 토큰 생성
export const generateTempToken = (size = 16) => {
    return crypto.randomBytes(size).toString('hex');
};