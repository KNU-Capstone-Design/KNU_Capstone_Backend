import axios from "axios";
import { createLogger } from "../utils/logger.js";

export async function validateEmail(email) {

    const API_KEY = process.env.ABSTRACT_API;
    const url = `https://emailreputation.abstractapi.com/v1/?api_key=${API_KEY}&email=${email}`;
    const logger = createLogger('emailValidationService');

    try {
        const response = await axios.get(url);
        if(response.status == '429' || response.status == '422') {
            logger.info('이메일 검증 횟수 한도 초과');
            return;
        }
        if (response.data.email_deliverability.is_smtp_valid === false) {
            throw new Error('NONEXISTENT_EMAIL');
        }
        else if (response.data.email_deliverability.is_format_valid === false) {
            throw new Error('INVALID_EMAIL_FORMAT');
        }


    }
    catch (error) {
        logger.error('메일 검증 실패', {
            error: error.message,
            stack: error.stack,
            email: email
        });
        throw error;
    }

}