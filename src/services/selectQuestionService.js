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

export async function selectQuestion(email) {
    // 사용자 정보 및 이메일 발송 스케줄, 구독 카테고리 조회
    const user = await User.findOne({ email }).select('emailSchedule categories');
    if (!user || user.emailSchedule.length === 0) return null;

    const schedule = user.emailSchedule[0];
    const categories = user.categories;

    let nextQuestion = null;
    let selectedCategory = null;

    // 이전에 CS 질문을 발송했다면 이번엔 TECH 발송
    if (schedule.lastGroupType === 'CS') {
        // 다음에 보낼 질문의 인덱스 선택
        const nextIndex = (schedule.lastTECHIndex + 1) % categories.length;
        selectedCategory = categories[nextIndex];

        // 이미 발송한 질문 목록 조회
        const sentQuestionIds = await UserActivity.find({ user: user._id,  category: selectedCategory }).distinct('question');

        // 중복 질문 방지
        nextQuestion = await Question.findOne({
            category: selectedCategory,
            _id: { $nin: sentQuestionIds }
        });

        // 다음 질문이 있다면 스케줄 갱신
        if (nextQuestion) {
            schedule.lastGroupType = 'TECH';
            schedule.lastTECHIndex = nextIndex;
        }
    } else {
        // 이전에 TECH 질문을 발송했다면 이번엔 CS 발송
        const nextIndex = (schedule.lastCSIndex + 1) % CS_CATEGORY.length;
        selectedCategory = CS_CATEGORY[nextIndex];
        // 이미 발송한 질문 목록 조회
        const sentQuestionIds = await UserActivity.find({ user: user._id,  category: selectedCategory }).distinct('question');

        nextQuestion = await Question.findOne({
            category: selectedCategory,
            _id: { $nin: sentQuestionIds }
        });

        // 다음 질문이 있다면 스케줄 갱신
        if (nextQuestion) {
            schedule.lastGroupType = 'CS';
            schedule.lastCSIndex = nextIndex;
        }
    }

    // 질문을 찾았으면 스케줄 저장 + 활동 기록 추가
    if (nextQuestion) {
        // schedule은 nested document이므로 변경 표시 필요할 수 있음
        user.markModified('emailSchedule');
        await user.save();

        // UserAcitivity 컬랙션에 발송한 질문에 대한 정보 저장
        await new UserActivity({
            user: user._id,
            question: nextQuestion._id,
            category: selectedCategory,
            answers: []
        }).save();

        return nextQuestion._id; // 질문의 UID 반환
    }

    // 더 이상 보낼 질문이 없는 경우
    return null;
}