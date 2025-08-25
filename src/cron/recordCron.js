import cron from 'node-cron';
import { SmtpUsage } from "../models/smtpUsage.js";
import { getKSTDateString } from "../utils/date.js";
import logger from '../utils/logger.js';

// 매일 자정(00시 30분)에 SMTP 사용량 문서를 생성
cron.schedule('0 30 0 * * *', async () => {
    const todayDate = getKSTDateString();
    try {
        // 해당 날짜의 기록이 없으면 생성
        const exists = await SmtpUsage.findOne({ date: todayDate });

        if (!exists) {
            await SmtpUsage.create({
                date: todayDate,
                welcomeEmailCount: 0,
                questionEmailCount: 0
            });
        }
    }
    catch (error) {
        logger.error('SMTP 사용량 기록 크론 작업 중 오류 발생', {
            date: todayDate,
            error: error.stack || error.message
        });
    }
}, {
    timezone: "Asia/Seoul"
});
