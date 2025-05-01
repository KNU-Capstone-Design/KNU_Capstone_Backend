import nodemailer from 'nodemailer';
import { questionEmail, welcomeEmail } from '../utils/mailTemplate.js';
import { selectQuestion } from '../services/selectQuestionService.js'
import dotenv from 'dotenv';
import { Question } from "../models/questions.js";
import {UserAuth} from "../models/userAuth.js";

dotenv.config();

// nodemailer transporter 생성 (SMTP 설정)
const transporter = nodemailer.createTransport({
    service:'gmail',
    /*host: `"Myundo 알림" <${process.env.EMAIL_USER}>`,*/
    port: 465, // SSL 포트(465)
    secure: true, // SSL 사용 여부
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * 질문 전송 이메일을 보내는 함수
 * @param {Object} param0 - 이메일 전송 파라미터
 * @param {string} param0.to - 수신자 이메일 주소
 * @param {string} param0.questionId - 질문 식별자
 */
export async function sendQuestionEmail({ to }) {
    const questionID = await selectQuestion(to);
    const getToken = await UserAuth.find({ email: to }).select("token");
    const token = getToken[0].token;
    const question = await Question.findById(questionID);
    const answerUrl = process.env.SERVER_URL + `/verify?token=${token}&redirect=profile`;
    const { text: questionText, category } = question;
    const html = questionEmail({ answerUrl, questionText, category });

    const mailOptions = {
        from: `"Myundo" <${process.env.EMAIL_USER}>`,
        to,
        subject: '오늘의 질문이 도착했습니다!',
        text: '오늘도 화이팅!',
        html,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`[메일 전송 완료] to=${to}`);
    } catch (error) {
        console.error(`[메일 전송 실패] to=${to}:`, error);
    }
}

/**
 * 구독 환영 이메일을 보내는 함수
 * @param {Object} param0 - 이메일 전송 파라미터
 * @param {string} param0.to - 수신자 이메일 주소
*/
export async function sendWelcomeEmail({ to }) {
    const html = welcomeEmail();

    const mailOptions = {
        from: `"Myundo" <${process.env.EMAIL_USER}>`,
        to,
        subject: "구독이 완료되었습니다!",
        text: "구독 완료!",
        html
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`[메일 전송 완료] ${to}`);
    } catch (error) {
        console.error(`[메일 전송 실패] ${to}:`, error);
    }
}