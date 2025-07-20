import { ApiUsage } from '../models/apiUsage.js';
import { createLogger } from "../utils/logger.js";
import {API_LIMIT} from "../config/constants.js";

// 로거 생성
const logger = createLogger('apiUsageService');

// 일별 API 사용량을 계산하는 함수
export async function getDailyApiUsageAggregation() {
    return ApiUsage.aggregate([
        {
            $group: {
                _id: '$date',
                totalCount: {$sum: '$count'}
            }
        },
        {
            $project: {
                _id: 0,
                date: '$_id',
                totalCount: 1
            }
        },
        {
            $sort: {date: 1}
        }
    ]);
}

// 당일 특정 사용자의 API 호출 횟수를 확인하는 함수
export async function checkDailyApiUsageLimit(email, date) {
    try {
        const usage = await ApiUsage.findOne({ email, date });
        // 사용 기록이 없거나 20회 미만이면 true 반환
        return !usage || usage.count < API_LIMIT;
    } catch (error) {
        logger.error("API 사용량 확인 실패", {
            error: error.message,
            stack: error.stack,
            email
        });
        return true;
    }
}

// API 호출시 사용량을 기록하는 함수
export async function recordApiUsage(email, date) {
    try {
        await ApiUsage.findOneAndUpdate(
            { email, date },
            { $inc: { count: 1 } }, // 항상 1씩 증가
            { upsert: true, new: true }
        );
    } catch (error) {
        logger.error("API 사용량 기록 실패", {
            error: error.message,
            stack: error.stack,
            email
        });
        throw error;
    }
}
