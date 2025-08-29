import nodemailer from 'nodemailer';
import { questionEmail, welcomeEmail } from '../utils/mailTemplate.js';
import { selectQuestion } from './selectQuestionService.js';
import dotenv from 'dotenv';
import { Question } from "../models/questions.js";
import { UserAuth } from "../models/userAuth.js";
import { createLogger } from "../utils/logger.js";
import { increaseWelcomeEmailCount } from "./smtpUsageService.js";

dotenv.config();

// 로거생성
const logger = createLogger('mailService');

// nodemailer transporter 생성 (SMTP 설정)
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    port: 465, // SSL 포트(465)
    secure: true, // SSL 사용 여부
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    pool: true,
    maxConnections: 5
});

// 사용자 이메일로부터 토큰을 조회하는 함수
async function getTokenByEmail(email) {
    const user = await UserAuth.findOne({ email }).select("token");
    return user?.token;
}

//  토큰을 기반으로 프로필 페이지 URL을 생성하는 함수
function getProfileUrl(token) {
    return `${process.env.SERVER_URL}/verify?token=${token}&redirect=profile`;
}

//  공통 메일 전송 함수
async function sendEmail({ to, subject, html, text }) {
    const mailOptions = {
        from: `"Myundo" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`메일 전송 완료`, {
            email: to
        });
    } catch (error) {
        logger.error(`메일 전송 실패`, {
            error: error.message,
            stack: error.stack,
            email: to
        });
    }
}

/**
 * 질문 전송 이메일을 보내는 함수
 * @param {Object} param0 - 이메일 전송 파라미터
 * @param {string} param0.to - 수신자 이메일 주소
 */
export async function sendQuestionEmail({ to }) {
    // 질문 ID 선택
    const questionId = await selectQuestion(to);

    // 토큰 조회 및 URL 생성
    const token = await getTokenByEmail(to);
    const answerUrl = `${process.env.SERVER_URL}/verify?token=${token}&question=${questionId}&redirect=Quiz`;
    const profileUrl = getProfileUrl(token);

    // 질문 내용 조회
    const { text: questionText, category } = await Question.findById(questionId);

    // 이메일 본문 생성
    const html = questionEmail({ answerUrl, questionText, category, profileUrl });

    // 메일 전송
    await sendEmail({
        to,
        subject: '오늘의 질문이 도착했습니다!',
        text: '오늘도 화이팅!',
        html
    });
}

/**
 * 구독 환영 이메일을 보내는 함수
 * @param {Object} param0 - 이메일 전송 파라미터
 * @param {string} param0.to - 수신자 이메일 주소
 */
export async function sendWelcomeEmail({ to }) {
    // 토큰 조회 및 URL 생성
    const token = await getTokenByEmail(to);
    const profileUrl = getProfileUrl(token);

    // 이메일 본문 생성
    const html = welcomeEmail(profileUrl);

    // 메일 전송
    await sendEmail({
        to,
        subject: "구독이 완료되었습니다!",
        text: "구독 완료!",
        html
    });

    // 데이터베이스에 환영 이메일 전송 기록 추가
    await increaseWelcomeEmailCount();

}