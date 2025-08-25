// 서버에서 정해진 시간마다 스케줄링해서 이메일 전송 시키는 비지니스 로직

import cron from 'node-cron'
import moment from 'moment-timezone'
import { getSubscribedUsers } from '../services/subscribeService.js';
import { sendQuestionEmail } from '../services/mailService.js';
import logger from '../utils/logger.js';
import { increaseQuestionEmailCount } from "../services/smtpUsageService.js";

// 매일 9시마다 실행
cron.schedule('0 0 9 * * *', async () => {
    try {
        const koreaTime = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
        logger.info('매일 아침 9시 이메일 전송 시작', { time: koreaTime });
        
        const users = await getSubscribedUsers(); // 이메일 보낼 대상
        let successCount = 0; // 이메일 발송량
        
        // 병렬로 이메일 전송
        const results = await Promise.allSettled(
            users.map(user => 
                sendQuestionEmail({ to: user.email })
            )
        );

        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                successCount++;
            } else {
                logger.error('개별 이메일 전송 실패', {
                    email: users[index].email,
                    error: result.reason?.stack || result.reason?.message
                });
            }
        });

        if (successCount > 0) {
            await increaseQuestionEmailCount(successCount);
        }

    } catch (error) {
        logger.error('이메일 전송 크론 작업 중 오류 발생', {
            error: error.stack || error.message
        });
    }
}, {
    timezone: "Asia/Seoul"
});
