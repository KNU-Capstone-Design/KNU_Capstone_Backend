// 서버에서 정해진 시간마다 스케줄링해서 이메일 전송 시키는 비지니스 로직

import cron from 'node-cron'
import moment from 'moment-timezone'
import { getSubscribedUsers } from '../services/subscribeService.js';
import { sendQuestionEmail } from '../services/mailService.js';
import logger from '../utils/logger.js';

// 매일 9시마다 실행
cron.schedule('0 0 9 * * *', async () => {
    try {
        const koreaTime = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
        logger.info('매일 아침 9시 이메일 전송 시작', { time: koreaTime });
        
        const users = await getSubscribedUsers(); // 이메일 보낼 대상
        
        // 병렬로 이메일 전송
        await Promise.all(
            users.map(user => 
                sendQuestionEmail({ to: user.email })
                .catch(error => {
                    logger.error('개별 이메일 전송 실패', {
                        email: user.email,
                        error: error.stack || error.message
                    });
                    return null; // 개별 이메일 실패해도 전체 프로세스는 계속 진행
                })
            )
        );

    } catch (error) {
        logger.error('이메일 전송 크론 작업 중 오류 발생', {
            error: error.stack || error.message
        });
    }
}, {
    timezone: "Asia/Seoul"
});
