import { generateTempToken } from "../utils/token.js";
import { TempAuth } from "../models/tempAuth.js";
import { TEMP_TOKEN_EXPIRY_MS } from "../config/constants.js";

// 토큰을 생성하고 DB에 저장하고 리턴하는 비지니스 로직
export const generateToken = async (email) => {
    const token = generateTempToken();
    const expiresAt = new Date(Date.now() + TEMP_TOKEN_EXPIRY_MS);

    await TempAuth.findOneAndUpdate(
        { email },
        { token, expiresAt },
        { upsert: true, new: true }
    );
    return token;
};