import cron from 'node-cron';
import { SmtpUsage } from "../models/smtpUsage.js";
import { getKSTDateString } from "../utils/date.js";

// 매일 자정(0시)에 SMTP 사용량 문서를 생성
cron.schedule('0 0 0 * * *', async () => {
    try {
        const todayDate = getKSTDateString();
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
        console.error('[CRON] SMTP 사용량 기록 중 오류 발생:', error);
    }
}, {
    timezone: "Asia/Seoul"
});
