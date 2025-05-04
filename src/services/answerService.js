import { getFeedbackFromGroq } from "./aiService.js";
import { Question } from "../models/questions.js";
import { parseFeedback } from "../utils/parseToJSON.js"


// 사용자가 입력한 답변을 채점하고 DB에 저장후 반환
export async function returnFeedBack(questionID, userAnswer) {
    const userQuestion = (await Question.findById(questionID).select("text").lean()).text;
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
    return result;
}
