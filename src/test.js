// scripts/testEmailSend.js
import dotenv from 'dotenv';
import { sendQuestionEmail } from './services/mailService.js';
import connectDB from "./config/mongoose.js";
import {Question} from "./models/questions.js";
import User from "./models/users.js";
import {selectQuestion} from "./services/selectQuestionService.js";

dotenv.config();
connectDB();

const test = async () => {
    try {
        await sendQuestionEmail({
            to: 'sunhokim28@gmail.com',
            questionId: 'dummy-question-id-123',
        });
        console.log('✅ 이메일 전송 성공');
    } catch (error) {
        console.error('❌ 이메일 전송 실패:', error);
    }
};

const dbTest = async () => {
    const question = await Question.find( { category: "Backend"});
   // console.log(question);
    const question2 = await Question.findById("67f76e27cf776341c0c81408");
    console.log(question2);
}

const emailTest = async () => {
    const questionID =  await selectQuestion('sunhokim1@temp.com');
    const question = await Question.findById(questionID);
    //console.log(questionID);
    console.log(question.text);
}
emailTest();
//dbTest();
//test();