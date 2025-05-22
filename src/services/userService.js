import User from "../models/users.js";
import { getKSTDateString } from "../utils/date.js"

/**
 * DB에서 사용자 정보(구독 상태, 구독한 카테고리)를 조회하는 비지니스 로직
 * @param email - 사용자 이메일
 * @returns {JSON} - 사용자의 구독 상태, 구독한 카테고리
 */
export async function getUserInfo(email) {
    try {
        const user = await User
            .findOne({ email })
            .select({ email: 1, subscriptionStatus: 1, categories: 1, _id: 0 })
            .lean();

        if (!user) return null;

        if (user.categories?.includes("Backend")) {
            user.categories = user.categories.filter(cat => cat !== "Java");
        }
        if (user.categories?.includes("Frontend")) {
            user.categories = user.categories.filter(cat => cat !== "JavaScript");
        }

        return user;
    } catch (error) {
        console.error("[사용자 정보 조회 실패]", error);
    }
}

/**
 *  @param email - 사용자 이메일
 *  @param category - 사용자가 변경후 구독하고 있는 카테고리
 */

export async function patchUserInfo(email, category) {
    try {
        /*
        사용자가 Backend,Frontend를 구독했을시 Java,JavaScript도 카테고리에 추가
        */
        if (category.includes("Backend")) {
            category.push("Java");
        }
        if (category.includes("Frontend")) {
            category.push("JavaScript");
        }

        return await User.findOneAndUpdate(
            { email },
            { categories: category }
        );
    }
    catch (error) {
        console.error("[사용자 정보 변경 실패]", error);
    }
}

/**
 * 사용자의 연속 풀이 일수 업데이트
 * @returns {Object|null} - 업데이트된 streak 정보 또는 실패 시 null
 * @param userId
 */
export async function updateUserStreak(userId, session) {
    try {
        // 사용자 찾기
        const user = await User.findById(userId).session(session);
        if (!user) {
            console.error(`사용자를 찾을 수 없습니다: ${userId}`);
            return null;
        }

        // 날짜 정보
        const today = getKSTDateString(0);
        const yesterday = getKSTDateString(-1);

        // streak 로직 구현
        // 첫 풀이인 경우
        if (!user.streak || !user.streak.lastSolvedDate) {
            user.streak = {
                current: 1,
                lastSolvedDate: today
            };
            user.$session(session);
            await user.save();
            return user.streak;
        }
        // 사용자가 마지막으로 문제풀이한 날짜 조회
        const lastSolvedDate = user.streak.lastSolvedDate.toISOString().slice(0,10);

        // 이미 오늘 풀었으면 변경 없음
        if (lastSolvedDate === today) {
            return user.streak; // 이미 업데이트됨, 변경 없음
        }
        // 어제 풀었으면 streak 증가
        else if (lastSolvedDate === yesterday) {
            user.streak.current += 1;
            user.streak.lastSolvedDate = today;
        }
        // 그 외 (이틀 이상 지남) - streak 리셋
        else {
            user.streak.current = 1;
            user.streak.lastSolvedDate = today;
        }

        // DB 업데이트
        user.$session(session);
        await user.save();
        return user.streak;
    } catch (error) {
        console.error("[스트릭 업데이트 실패]", error);
        return null;
    }
}