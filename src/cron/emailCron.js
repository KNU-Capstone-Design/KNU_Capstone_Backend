// 서버에서 정해진 시간마다 스케줄링해서 이메일 전송 시키는 비지니스 로직

import cron from 'node-cron'
import { getSubscribedUsers } from '../services/subscribeService.js';
import { sendQuestionEmail } from '../services/mailService.js';

// 매일 9시마다 실행
cron.schedule('0 9 * * *', async () => {
    console.log('[매일 아침 9시 이메일 전송 시작');

    const users = await getSubscribedUsers(); // 이메일 보낼 대상
    for (const user of users) {
        await sendQuestionEmail({
            to: user.email,
            questionId: '랜덤 또는 오늘의 질문 ID',
        });
    }

    console.log('[CRON] 이메일 전송 완료');
});
