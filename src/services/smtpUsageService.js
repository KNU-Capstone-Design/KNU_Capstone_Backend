import { SmtpUsage } from "../models/smtpUsage.js";
import { getKSTDateString } from "../utils/date.js";
import logger from "../utils/logger.js";

export async function increaseWelcomeEmailCount() {
    const date = getKSTDateString();

    // 트랜잭션 시작
    const session = await SmtpUsage.startSession();
    try {
        session.startTransaction();

        await SmtpUsage.findOneAndUpdate(
            { date },
            { $inc: { welcomeEmailCount: 1 } },
            { upsert: true, new: true, session }
        );

        // 트랜잭션 커밋
        await session.commitTransaction();
    } catch (error) {
        // 오류 발생시 롤백
        await session.abortTransaction();
        logger.error('welcomeEmailCount 증가 실패', { date, error: error.message });
        throw error;
    } finally {
        // 세션 종료
        await session.endSession();
    }
}

export async function increaseQuestionEmailCount(count) {
    const date = getKSTDateString();

    // 트랜잭션 시작
    const session = await SmtpUsage.startSession();
    try {
        session.startTransaction();

        await SmtpUsage.findOneAndUpdate(
            { date },
            { $inc: { questionEmailCount: count } },
            { upsert: true, new: true, session }
        );

        // 트랜잭션 커밋
        await session.commitTransaction();
    } catch (error) {
        // 오류 발생시 롤백
        await session.abortTransaction();
        logger.error('questionEmailCount 증가 실패', { date, error: error.message });
        throw error;
    } finally {
        // 세션 종료
        await session.endSession();
    }
}