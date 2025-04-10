import { getFeedbackFromGroq } from "./aiService.js";
import { TempAuth } from "../models/tempAuth.js";

// 사용자가 입력한 답변을 채점하고 DB에 저장후 반환
export async function returnFeedBack(questionID, userAnswer) {
    const result = await getFeedbackFromGroq(userQuestion, userAnswer); // AI 피드백 요청
    await TempAuth.deleteOne({ token }); // 토큰은 한번 사용하고 삭제해야함.

    // db에 저장해야하는 로직 작성해야함

    return {
        questionID,
        feedback: result
    };
}
