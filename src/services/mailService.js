import nodemailer from 'nodemailer';
import { questionEmail, welcomeEmail } from '../utils/mailTemplate.js';
import { selectQuestion } from '../services/selectQuestionService.js'
import dotenv from 'dotenv';

dotenv.config();

// nodemailer transporter 생성 (SMTP 설정)
const transporter = nodemailer.createTransport({
    service:'naverworks',
    host: process.env.EMAIL_HOST,
    port: 465, // SSL 포트
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
export async function sendQuestionEmail({ to, questionId }) {
    const answerUrl = 'http://20.39.191.62:3000/';
    const questionID = selectQuestion(to);
    const html = questionEmail({ answerUrl, questionID });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: '오늘의 질문이 도착했습니다!',
        html,
    };

    await transporter.sendMail(mailOptions);
}

/**
 * 구독 환영 이메일을 보내는 함수
 * @param {Object} param0 - 이메일 전송 파라미터
 * @param {string} param0.to - 수신자 이메일 주소
*/
export async function sendWelcomeEmail({ to }) {
    const html = welcomeEmail();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "구독이 완료되었습니다!",
        html
    };
    await transporter.sendMail(mailOptions);
}