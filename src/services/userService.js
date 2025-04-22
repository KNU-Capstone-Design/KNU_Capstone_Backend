import User from "../models/users.js";

/**
 * DB에서 사용자 정보(구독 상태, 구독한 카테고리)를 조회하는 비지니스 로직
 * @param email - 사용자 이메일
 * @returns {JSON} - 사용자의 구독 상태, 구독한 카테고리
 */
export async function getUserInfo(email) {
    try {
        return await User
            .find({ email })
            .select({ subscriptionStatus: 1, categories: 1, _id: 0 })
            .lean();
    }
    catch (error) {
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