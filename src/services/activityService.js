import User from '../models/users.js';
import { UserActivity } from '../models/userActivity.js';
import Answer from "../models/answer.js";
import { parseToJSON } from "../utils/parseToJSON.js";
import { returnAnswer } from '../services/answerService.js';

/**
 * 사용자 답변 이력(활동) 목록 조회
 * @param page 조회할 페이지 번호
 * @param limit 페이지당 항목 수
 * @param email 사용자 이메일
 */
export async function listUserActivities(page = 1, limit = 10, email) {
  const skip = (page - 1) * limit;
    const user = await User.findOne({email: email})
        .populate({
          path: 'activities',
          options: {
            sort: {createdAt: -1},
            skip: skip,
            limit: limit
          },
          // 질문 정보 함께 가져오기 (중첩 populate)
          populate: [
            {
              path: 'question',
              select: 'text category content'
            },
            {
              path: 'answers',
              select: 'score'
            }
          ]
        }).lean()
    // 총 활동 수 계산
    const total = await User.aggregate([
      {$match: {email}},
      {
        $lookup: {
          from: 'useractivities',
          localField: '_id',
          foreignField: 'user',
          as: 'activities'
        }
      },
      {$project: {count: {$size: '$activities'}}}
    ]);
    const totalCount = total.length > 0 ? total[0].count : 0;
    const streak = user.streak.current;
    // 활동 데이터 가공
    const data = user.activities.map(activity => ({
      questionId: activity.question?._id.toString() || '',
      _id: activity._id.toString(),
      date: activity.createdAt.toISOString().split('T')[0].slice(5), // ISO 형식 날짜
      title: activity.question?.text || '삭제된 질문',
      category: activity.question?.category || 'unknown',
      score: activity.answers?.score || 0
    }));
    if (page === 1) {
      // 첫 페이지일 경우만 메타데이터 포함
      return {
        email,
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        streak: streak,
        data
      };
    } else {
      // 그 외 페이지는 데이터만 반환
      return {data};
    }
}

/**
 * 활동 상세 조회 - 특정 활동에 대한 세부 정보
 */
export async function detailUserActivity(activityId, email) {
  try {
    const userActivity = await UserActivity.findOne({ 
        _id: activityId,
    })
      .populate('question')
      .populate('answers')
      .populate('aiAnswer')
      .lean();
      
    if (!userActivity) {
      return { error: '활동 기록을 찾을 수 없습니다.' };
    }
    
    // utils의 파싱 함수 사용
    const parsedAiAnswer = parseToJSON(userActivity.aiAnswer?.aiAnswer, {
      answer: userActivity.aiAnswer?.aiAnswer || '',
      explanation: "",
      examples: [],
      notes: []
    });
    
    // 상세 정보 구성
    return {
      feedback: {
        userAnswer: userActivity.answers?.answerText || '',
        wellDone: userActivity.answers?.strengths?.[0] || '',
        improve: userActivity.answers?.improvements?.[0] || '',
        mistake: userActivity.answers?.wrongPoints?.[0] || ''
      },
      answer: {
        answer: parsedAiAnswer.answer || '',
        explanation: parsedAiAnswer.explanation || '',
        examples: parsedAiAnswer.examples || [],
        notes: parsedAiAnswer.notes || []
      }
    };
  } catch (error) {
    console.error('활동 상세 조회 오류:', error);
    return { error: '활동 상세 정보를 가져오는 중 오류가 발생했습니다.' };
  }
}