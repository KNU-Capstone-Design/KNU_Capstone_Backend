import { describe, it, expect, vi, beforeEach } from 'vitest';

const { sendMailMock } = vi.hoisted(() => ({ sendMailMock: vi.fn() }));

vi.mock('nodemailer', () => ({
    default: { createTransport: () => ({ sendMail: sendMailMock }) }
}));
vi.mock('./selectQuestionService.js', () => ({
    selectQuestion: vi.fn()
}));
vi.mock('../models/questions.js', () => ({
    Question: { findById: vi.fn() }
}));
vi.mock('../models/userAuth.js', () => ({
    UserAuth: { findOne: vi.fn() }
}));
vi.mock('../utils/mailTemplate.js', () => ({
    questionEmail: vi.fn(() => '<html>question</html>'),
    welcomeEmail: vi.fn(() => '<html>welcome</html>')
}));

import { selectQuestion } from './selectQuestionService.js';
import { Question } from '../models/questions.js';
import { UserAuth } from '../models/userAuth.js';
import { questionEmail } from '../utils/mailTemplate.js';
import { sendQuestionEmail } from './mailService.js';

// UserAuth.findOne({...}).select("token") 체이닝을 흉내내는 thenable 목
function mockQuery(result) {
    const query = {
        select: vi.fn(() => query),
        then: (resolve, reject) => Promise.resolve(result).then(resolve, reject),
    };
    return query;
}

describe('sendQuestionEmail', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        sendMailMock.mockResolvedValue({});
    });

    it('발송할 질문이 없으면(null) 메일 전송 없이 false를 반환한다', async () => {
        selectQuestion.mockResolvedValue(null);

        await expect(sendQuestionEmail({ to: 'exhausted@test.com' })).resolves.toBe(false);

        expect(Question.findById).not.toHaveBeenCalled();
        expect(questionEmail).not.toHaveBeenCalled();
        expect(sendMailMock).not.toHaveBeenCalled();
    });

    it('발송할 질문이 있으면 메일 본문을 생성해 전송하고 true를 반환한다', async () => {
        selectQuestion.mockResolvedValue('q1');
        UserAuth.findOne.mockReturnValue(mockQuery({ token: 'tok123' }));
        Question.findById.mockResolvedValue({ text: '질문 내용', category: 'Unreal' });

        await expect(sendQuestionEmail({ to: 'user@test.com' })).resolves.toBe(true);

        expect(Question.findById).toHaveBeenCalledWith('q1');
        expect(questionEmail).toHaveBeenCalled();
        expect(sendMailMock).toHaveBeenCalledTimes(1);
    });

    it('SMTP 전송 자체가 실패하면 예외를 던지지 않고 false를 반환한다', async () => {
        selectQuestion.mockResolvedValue('q1');
        UserAuth.findOne.mockReturnValue(mockQuery({ token: 'tok123' }));
        Question.findById.mockResolvedValue({ text: '질문 내용', category: 'Unreal' });
        sendMailMock.mockRejectedValue(new Error('SMTP 연결 실패'));

        await expect(sendQuestionEmail({ to: 'user@test.com' })).resolves.toBe(false);
    });
});
