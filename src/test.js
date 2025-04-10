// scripts/testEmailSend.js
import dotenv from 'dotenv';
import { sendQuestionEmail } from './services/mailService.js';
import mongoose from 'mongoose'
import { Category } from "./models/questions.js";
import connectDB from "./config/mongoose.js";
import User from "./models/users.js";

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
    const categories = await Category.find({}, { category: 1 });
    console.log(categories);
    const result = await Category.findOne({ category: "Algorithm" });

    if (result) {
        const question = result.questions.find(q => q.questionId === 1);
        console.log(question?.text);
        }
    }

dbTest();
//test();