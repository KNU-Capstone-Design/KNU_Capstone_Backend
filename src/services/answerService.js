import { getFeedbackFromGroq } from "./aiService.js";
import { Question } from "../models/questions.js";
import { parseFeedback } from "../utils/parseToJSON.js"
import Answer from "../models/answer.js";
import {UserActivity} from "../models/userActivity.js";
import User from "../models/users.js";


// 사용자가 입력한 답변을 채점하고 DB에 저장후 반환
export async function returnFeedBack(email, questionId, userAnswer) {
    try {
        const userQuestion = (await Question.findById(questionId).select("text").lean()).text;
        const result = parseFeedback(await getFeedbackFromGroq(userQuestion, userAnswer)); // AI 피드백 요청 및 JSON 파싱
    /*
        결과는 다음과 같이 할당됨
        {
            score: 100,
            strengths: [
            'BFS와 DFS의 정의를 정확하게 설명했습니다.',
            '각 알고리즘이 사용하는 자료구조(큐, 스택 또는 재귀 함수)를 언급하여 구현 방법을 이해하기 쉽게 했습니다.',
            '두 알고리즘의 주요 차이점을 간결하게 요약했습니다.'
            ],
            improvements: [],
            wrongPoints: []
        }
     */
    // db에 저장해야하는 로직 작성해야함
        const user = await User.findOne({ email: email }).select("_id");
        const userId = user._id;
        saveFeedbackToDatabase(userId, questionId, userAnswer, result)
        .catch(err => console.error('답변 저장 실패:', err));
        }  catch (error) {
        console.error('피드백 처리 중 오류:', error);
        throw error;
        }
    return result;
}

async function saveFeedbackToDatabase(userId, questionId, userAnswer, feedback) {
    try {
        // UserActivity 먼저 조회
        const userActivity = await UserActivity.findOne({ 
            user: userId, 
            question: questionId 
        }).lean();
        
        if (!userActivity) {
            console.warn(`UserActivity not found for user ${userId} and question ${questionId}`);
        }
        
        // UserActivity에서 필요한 정보 가져오기
        const activityCategory = userActivity?.category 
    
        // Answer 객체 생성 (UserActivity의 정보 활용)
        const answer = new Answer({
            user: userId,
            question: questionId,
            category: activityCategory, 
            answer: userAnswer,
            // AI 피드백
            score: feedback.score,
            strengths: feedback.strengths,
            improvements: feedback.improvements,
            wrongPoints: feedback.wrongPoints,
        });
        
        // 답변 저장
        const savedAnswer = await answer.save();
        
        //  UserActivity 업데이트
            await UserActivity.updateOne(
                { _id: userActivity._id },
                { $push: { answers: savedAnswer._id } }
            );
        console.log(`UserActivity 업데이트 완료 (ID: ${userActivity._id})`); 
        console.log(`답변 저장 완료 (ID: ${savedAnswer._id})`);
        return savedAnswer;
    } catch (error) {
        console.error('답변 저장 실패:', error);
        throw error;
    }
}
