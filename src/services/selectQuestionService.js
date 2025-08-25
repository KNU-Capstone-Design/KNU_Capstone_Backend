/*
    이메일 발송 알고리즘
    - CS, TECH 관련 질문을 번갈아가며 발송
    - 카테고리는 사용자가 선택한 범위 내에서 순환
    - 이미 발송한 질문은 제외하고 새로운 질문만 발송
    - 발송된 질문은 UserActivity에 기록
*/

import User from '../models/users.js';
import { UserActivity } from '../models/userActivity.js';
import { Question } from "../models/questions.js";
import { CS_CATEGORY } from "../config/constants.js";
import { createLogger } from "../utils/logger.js";

// 로거 생성
const logger = createLogger('selectQuestionService');

export async function selectQuestion(email) {
    // 사용자 정보 조회 - email 인덱스 활용
    const user = await User.findOne({ email })
        .select('emailSchedule categories')
        .lean(); // lean() 사용하여 메모리 최적화

    if (!user || user.emailSchedule.length === 0) return null;

    const schedule = user.emailSchedule[0];
    const categories = user.categories;

    // 카테고리 선택 및 스케줄 설정 부분 - 분리하여 코드 명확성 향상
    const { selectedCategory, groupType, indexField, nextIndex } = selectCategoryAndGroup(schedule, categories);

    // 이미 발송한 질문 ID 조회 - {user, category} 복합 인덱스 활용
    const sentQuestionIds = await UserActivity.find({
        user: user._id,
        category: selectedCategory
    })
        .distinct('question')
        .lean();

    // 발송할 새로운 질문 조회 최적화
    const nextQuestion = await findNextQuestion(selectedCategory, sentQuestionIds);

    if (!nextQuestion) return null; // 발송할 질문이 없는 경우

    // 스케줄 업데이트 및 활동 기록
    await updateUserScheduleAndActivity(user._id, schedule, groupType, indexField, nextIndex, selectedCategory, nextQuestion._id);

    return nextQuestion._id; // 질문의 UID 반환
}

/**
 * 카테고리 선택 및 스케줄 그룹 설정
 */
function selectCategoryAndGroup(schedule, categories) {
    if (schedule.lastGroupType === "CS") {
        // TECH 질문 선택
        const nextIndex = (schedule.lastTECHIndex + 1) % categories.length;
        return {
            selectedCategory: categories[nextIndex],
            groupType: "TECH",
            indexField: "lastTECHIndex",
            nextIndex
        };
    } else {
        // CS 질문 선택
        const nextIndex = (schedule.lastCSIndex + 1) % CS_CATEGORY.length;
        return {
            selectedCategory: CS_CATEGORY[nextIndex],
            groupType: "CS",
            indexField: "lastCSIndex",
            nextIndex
        };
    }
}

/**
 * 다음 질문 찾기 - 최적화된 버전
 * 카테고리 인덱스와 _id 기본 인덱스 활용
 */
async function findNextQuestion(category, sentQuestionIds) {
    // 이미 발송된 질문 수에 따라 다른 쿼리 전략 사용
    if (sentQuestionIds.length > 500) {
        // 질문이 많이 발송된 경우 랜덤 샘플링 방식 사용
        const randomQuestions = await Question.aggregate([
            { $match: { category: category } },
            { $match: { _id: { $nin: sentQuestionIds } } },
            { $sample: { size: 1 } }
        ]);
        return randomQuestions.length > 0 ? randomQuestions[0] : null;
    } else {
        // 일반적인 경우 표준 쿼리 사용
        return Question.findOne({
            category: category,
            _id: {$nin: sentQuestionIds}
        }).lean();
    }
}

/**
 * 사용자 스케줄 업데이트 및 활동 기록 생성
 */
async function updateUserScheduleAndActivity(userId, schedule, groupType, indexField, nextIndex, category, questionId) {
    // 스케줄 업데이트 - 트랜잭션으로 묶을 수도 있음
    await User.updateOne(
        { _id: userId },
        {
            $set: {
                "emailSchedule.0.lastGroupType": groupType,
                [`emailSchedule.0.${indexField}`]: nextIndex
            }
        }
    );

    // UserActivity 생성 - 인덱싱된 필드를 먼저 지정
    await UserActivity.create({
        user: userId,
        category: category,
        question: questionId
    });
    logger.info('사용자 스케줄 업데이트 및 활동기록 생성', {
        userId: userId
    })
}