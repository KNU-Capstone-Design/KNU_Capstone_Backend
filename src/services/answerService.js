import { getAnswerFromGroq, getFeedbackFromGroq } from "./aiService.js";
import { Question } from "../models/questions.js";
import { parseFeedback } from "../utils/parseToJSON.js";
import Answer from "../models/answer.js";
import { UserActivity } from "../models/userActivity.js";
import User from "../models/users.js";


// email을 통해 개인 UID를 반환하는 함수
async function getUid(email) {
    const user = await User
        .findOne({ email })
        .select("_id")
        .lean();
    if (!user) throw new Error(`사용자를 찾을 수 없습니다: ${email}`);
    return user._id;
}


// 사용자가 입력한 답변을 채점하고 DB에 저장후 반환
export async function returnFeedBack(email, questionId, userAnswer) {
    try {
        const userId = await getUid(email);

        // 이미 제출한 일반 답변이 있으면 교체
        let answerDoc = await Answer.findOne({
            user: userId,
            question: questionId,
            revealedAnswer: false
        });

        // 질문 텍스트 조회
        const userQuestion = await Question
            .findById(questionId)
            .select("text")
            .lean();
        if (!userQuestion) throw new Error("질문을 찾을 수 없습니다.");
        const text = userQuestion.text;

        // AI 피드백 요청 및 JSON 파싱
        const result = parseFeedback(
            await getFeedbackFromGroq(text, userAnswer)
        );
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

        if (answerDoc) {
            // 기존 답변 업데이트
            answerDoc.answerText    = userAnswer;
            answerDoc.score         = result.score;
            answerDoc.strengths     = result.strengths;
            answerDoc.improvements  = result.improvements;
            answerDoc.wrongPoints   = result.wrongPoints;
            await answerDoc.save();
        } else {
            // 신규 저장
            answerDoc = await saveFeedbackToDatabase(
                userId, questionId, userAnswer, result
            );
        }

        return {
            score:       answerDoc.score,
            strengths:   answerDoc.strengths,
            improvements:answerDoc.improvements,
            wrongPoints: answerDoc.wrongPoints
        };
    } catch (error) {
        console.error('피드백 처리 중 오류:', error);
        throw error;
    }
}


// 사용자가 모르겠어요 버튼을 눌렀을때 정답을 반환하고 DB에 저장
export async function returnAnswer(email, questionId) {
    try {
        const userId = await getUid(email);

        // 이미 aiAnswer 저장된 경우 DB 값만 반환
        let answerDoc = await Answer.findOne({
            user: userId,
            question: questionId,
            revealedAnswer: true
        }).lean();
        if (answerDoc) return answerDoc.aiAnswer;

        // 질문 텍스트 조회
        const userQuestion = await Question
            .findById(questionId)
            .select("text")
            .lean();
        if (!userQuestion) throw new Error("질문을 찾을 수 없습니다.");

        // AI 모범답안 호출
        const aiText = await getAnswerFromGroq(userQuestion.text);

        // DB에 저장 (동기적으로 처리)
        saveFeedbackToDatabase(
            userId, questionId, "", { aiAnswer: aiText }
        ).catch(err => console.error('답변 저장 실패:', err));

        return aiText;
    } catch (error) {
        console.error('피드백 처리 중 오류:', error);
        throw error;
    }
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
        const activityCategory = userActivity?.category ||
            (await Question
                .findById(questionId)
                .select("category")
                .lean())?.category;

        // Answer 객체 기본 필드
        const answerData = {
            user:       userId,
            question:   questionId,
            category:   activityCategory,
            answerText: userAnswer || "정답 요청",
            // AI 피드백
            score:       feedback.score || 0,
            strengths:   feedback.strengths || [],
            improvements:feedback.improvements || [],
            wrongPoints: feedback.wrongPoints || []
        };

        // 빈 답변이면 "모르겠어요" 버튼을 누른 것으로 간주하고 revealedAnswer를 true로 설정
        if (userAnswer === "") {
            answerData.revealedAnswer = true;
            answerData.aiAnswer      = feedback.aiAnswer || feedback;
        }

        // UserActivity 필드명 결정
        const destination = answerData.revealedAnswer ? "aiAnswer" : "answers";

        // 답변 저장
        const answer = new Answer(answerData);
        const savedAnswer = await answer.save();

        // UserActivity 업데이트
        await UserActivity.updateOne(
            { user: userId, question: questionId },
            { $push: { [destination]: savedAnswer._id } },
            { upsert: true }
        );

        console.log(`UserActivity 업데이트 완료 (user=${userId}, question=${questionId})`);
        console.log(`답변 저장 완료 (ID: ${savedAnswer._id})`);
        return savedAnswer;
    } catch (error) {
        console.error('답변 저장 실패:', error);
        throw error;
    }
}