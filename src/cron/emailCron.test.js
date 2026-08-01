import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('node-cron', () => ({
    default: { schedule: vi.fn() }
}));
vi.mock('../services/subscribeService.js', () => ({
    getSubscribedUsers: vi.fn()
}));
vi.mock('../services/mailService.js', () => ({
    sendQuestionEmail: vi.fn()
}));
vi.mock('../services/smtpUsageService.js', () => ({
    increaseQuestionEmailCount: vi.fn()
}));

import { getSubscribedUsers } from '../services/subscribeService.js';
import { sendQuestionEmail } from '../services/mailService.js';
import { increaseQuestionEmailCount } from '../services/smtpUsageService.js';
import { runDailyQuestionEmailJob } from './emailCron.js';

describe('runDailyQuestionEmailJob', () => {
    beforeEach(() => vi.clearAllMocks());

    it('일부 유저는 스킵(false)되고 일부는 발송(true)되면, 실제 발송 성공 건수만 집계한다', async () => {
        getSubscribedUsers.mockResolvedValue([
            { email: 'sent@test.com' },
            { email: 'skipped@test.com' },
            { email: 'smtp-fail@test.com' }
        ]);
        sendQuestionEmail
            .mockResolvedValueOnce(true)   // 정상 발송
            .mockResolvedValueOnce(false)  // 질문 소진으로 스킵
            .mockResolvedValueOnce(false); // SMTP 전송 실패

        await runDailyQuestionEmailJob();

        expect(increaseQuestionEmailCount).toHaveBeenCalledWith(1);
    });

    it('발송 도중 예외가 발생한(rejected) 유저는 집계에서 제외된다', async () => {
        getSubscribedUsers.mockResolvedValue([
            { email: 'sent@test.com' },
            { email: 'error@test.com' }
        ]);
        sendQuestionEmail
            .mockResolvedValueOnce(true)
            .mockRejectedValueOnce(new Error('unexpected'));

        await runDailyQuestionEmailJob();

        expect(increaseQuestionEmailCount).toHaveBeenCalledWith(1);
    });

    it('성공 건수가 0이면 increaseQuestionEmailCount를 호출하지 않는다', async () => {
        getSubscribedUsers.mockResolvedValue([{ email: 'skipped@test.com' }]);
        sendQuestionEmail.mockResolvedValueOnce(false);

        await runDailyQuestionEmailJob();

        expect(increaseQuestionEmailCount).not.toHaveBeenCalled();
    });
});
