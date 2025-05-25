import { generateTempToken } from "../utils/token.js";
import { UserAuth } from "../models/userAuth.js";
import { createLogger } from "../utils/logger.js";

// 로거 생성
const logger = createLogger('authService');


// 토큰을 생성하고 DB에 저장하는 비지니스 로직
export const generateToken = async (email) => {
    try {
        const token = generateTempToken(email);
        const userAuth = new UserAuth({
            email, token
        });
        await userAuth.save();
        logger.info('토큰 생성 완료', {
            email: email,
            token: token
        })
    } catch (error) {
      logger.log("토큰 생성중 오류 발생", {
          error: error.message,
          stack: error.stack,
          email: email
      });
    }
};