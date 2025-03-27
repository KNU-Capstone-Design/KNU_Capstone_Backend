// 토큰 생성

import * as crypto from "node:crypto";

exports.generateTempToken = (size = 16) => {
    return crypto.randomBytes(size).toString('hex'); // 기본: 32자리
};