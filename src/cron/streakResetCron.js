import cron from "node-cron";
import moment from "moment-timezone";
import { getKSTDateString } from "../utils/date.js";
import User from "../models/users.js";
import logger from '../utils/logger.js';

// 매일 00:05 (KST)에 실행
cron.schedule('0 5 0 * * *', async () => {
    try {
        const koreaTime = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
        logger.info('스트릭 리셋 크론 작업 시작', { time: koreaTime });

        const yesterday = getKSTDateString(-1);

        const result = await User.updateMany(
            {
                'streak.lastSolvedDate': { $lt: yesterday },
                'streak.current': { $gt: 0 } // 현재 스트릭이 0보다 큰 경우에만 업데이트
            },
            {
                $set: { 'streak.current': 0 } // 스트릭을 0으로 리셋
            }
        );

        if (result.modifiedCount > 0) {
            logger.info(`${result.modifiedCount}명의 사용자의 스트릭이 리셋되었습니다.`);
        }


    } catch (error) {
        logger.error('스트릭 리셋 크론 작업 중 오류 발생', {
            error: error.stack || error.message
        });
    }
}, {
    timezone: "Asia/Seoul"
});