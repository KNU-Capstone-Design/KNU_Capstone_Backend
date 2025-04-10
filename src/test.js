// scripts/testEmailSend.js
import dotenv from 'dotenv';
import { sendQuestionEmail } from './services/mailService.js';
import connectDB from "./config/mongoose.js";
import {Question} from "./models/questions.js";

dotenv.config();
connectDB();

// const test = async () => {
//     try {
//         await sendQuestionEmail({
//             to: 'sunhokim28@gmail.com',     // ← 너의 수신자 이메일 주소로 바꿔
//             questionId: 'dummy-question-id-123', // ← 가짜 ID 넣어도 OK
//         });
//         console.log('✅ 이메일 전송 성공');
//     } catch (error) {
//         console.error('❌ 이메일 전송 실패:', error);
//     }
// };

const dbTest = async () => {
    const question = await Question.find( { category: "Backend"});
    console.log(question);
    const question2 = await Question.findById("67f76e27cf776341c0c813cc");
    console.log(question2);
}

dbTest();
//test();