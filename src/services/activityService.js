import UserActivity from '../models/userActivity.js';
import Question     from '../models/questions.js';

const DEFAULT_LIMIT = 15;

/**
 * 사용자 답변 이력(활동) 목록 조회
 * @param {Object} options
 * @param {number} options.page 조회할 페이지 번호
 * @param {string} options.userEmail 사용자 이메일
 */
export async function listUserActivities({ page = 1, userEmail }) {
  const limit = DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  // 사용자 활동과 총 개수 조회
  const [activities, total] = await Promise.all([
    UserActivity.find({ userEmail })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    UserActivity.countDocuments({ userEmail })
  ]);

  // 질문 제목 매핑을 위해 questionId 배열 생성
  const questionIds = activities.map((a) => a.questionId);
  const questions = await Question.find({ _id: { $in: questionIds } })
    .lean()
    .select('title');
  const titleMap = Object.fromEntries(
    questions.map((q) => [q._id.toString(), q.title])
  );

  /* 프론트용 데이터 구조 변환 
  const data = activities.map((a) => ({
    activityId: a._id,
    date:       a.createdAt,
    title:      titleMap[a.questionId.toString()] || '',
    score:      a.score
  }));

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data
  };
}
*/
};