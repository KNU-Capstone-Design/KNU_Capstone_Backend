// 자주 사용되는 에러 객체 생성 ex) 토큰인증, 서버에러
export function createError(message, statusCode) {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
}

// 토큰 인증 에러
export function invalidTokenError() {
    return createError("인증 오류", 401);
}

