// scripts/testEmailSend.js
import dotenv from 'dotenv';
import {sendQuestionEmail, sendWelcomeEmail} from './services/mailService.js';
import connectDB from "./config/mongoose.js";
import {Question} from "./models/questions.js";
import User from "./models/users.js";
import {selectQuestion} from "./services/selectQuestionService.js";
import {questionEmail} from "./utils/mailTemplate.js";
import {getAnswerFromGroq, getFeedbackFromGroq} from "./services/aiService.js";
import {UserAuth} from "./models/userAuth.js";

dotenv.config();
connectDB();

const test = async () => {
    const token = await UserAuth.findOne({ email: "sunhokim28@gmail.com" }).select("token");
    console.log(token.token);
};

const dbTest = async () => {
    const question = await Question.find( { category: "Backend"});
   // console.log(question);
    const question2 = await Question.findById("67f76e27cf776341c0c81408");
    console.log(question2);
}

const emailTest = async () => {
    // const questionID =  await selectQuestion('sunhokim28@gmail.com');
    // console.log(questionID);
    // const question = await Question.findById(questionID);
    // console.log(question.text);
    //await sendQuestionEmail({ to: "sunhokim28@gmail.com" });
    await sendWelcomeEmail({to: "ksh2000@kangwon.ac.kr" });
}

const aiTest = async () => {
    const question = 'BFS와 DFS의 차이를 간단히 설명해 주세요.'
    const answer = 'BFS(Breadth-First Search)와 DFS(Depth-First Search)는 그래프 또는 트리 구조에서 데이터를 탐색하는 두 가지 기본 알고리즘입니다.\n' +
        '\n' +
        '1. **BFS (너비 우선 탐색)**: BFS는 시작 노드로부터 인접한 모든 노드를 우선 방문하고, 그 다음 레벨의 노드들을 방문하는 식으로 너비에 따라 탐색합니다. 큐(Queue) 자료구조를 사용하여 구현합니다.\n' +
        '\n' +
        '2. **DFS (깊이 우선 탐색)**: DFS는 시작 노드로부터 한 경로를 끝까지 탐색하고, 더 이상 갈 곳이 없으면 이전 노드로 돌아가 다른 경로를 탐색하는 식으로 깊이에 따라 탐색합니다. 스택(Stack) 또는 재귀 함수를 사용하여 구현합니다.\n' +
        '\n' +
        '두 알고리즘의 주요 차이점은 탐색 순서와 사용하는 자료구조에 있습니다.'
    const aiFeedback = await getFeedbackFromGroq(question, answer);
    //const aiAnswer = await getAnswerFromGroq(question);
    console.log(aiFeedback);
    //console.log(aiAnswer);
}
//aiTest();
emailTest();
//dbTest();
//test();