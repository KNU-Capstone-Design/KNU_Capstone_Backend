// 서버에서 정해진 시간마다 스케줄링해서 이메일 전송 시키는 비지니스 로직

import cron from 'node-cron'
import moment from 'moment-timezone'
import { getSubscribedUsers } from '../services/subscribeService.js';
import { sendQuestionEmail } from '../services/mailService.js';
import {selectQuestion} from "../services/selectQuestionService.js";

// 매일 9시마다 실행
cron.schedule('0 0 9 * * *', async () => {
    const koreaTime = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
    console.log(`${koreaTime}:매일 아침 9시 이메일 전송 시작`);
    const users = await getSubscribedUsers(); // 이메일 보낼 대상
    for (const user of users) {
        await sendQuestionEmail({
            to: user.email
        });
    }
    console.log('[CRON] 이메일 전송 완료');
    }, {
    timezone: "Asia/Seoul"
});
