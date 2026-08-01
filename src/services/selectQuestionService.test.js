import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../models/users.js', () => ({
    default: { findOne: vi.fn(), updateOne: vi.fn() }
}));
vi.mock('../models/userActivity.js', () => ({
    UserActivity: { find: vi.fn(), findOne: vi.fn(), create: vi.fn() }
}));
vi.mock('../models/questions.js', () => ({
    Question: { findOne: vi.fn(), findById: vi.fn(), aggregate: vi.fn() }
}));

import User from '../models/users.js';
import { UserActivity } from '../models/userActivity.js';
import { Question } from '../models/questions.js';
import { selectQuestion } from './selectQuestionService.js';

// Mongoose 쿼리 체이닝(.select().lean() 등)을 흉내내는 thenable 목
function mockQuery(result) {
    const query = {
        select: vi.fn(() => query),
        lean: vi.fn(() => query),
        sort: vi.fn(() => query),
        distinct: vi.fn(() => query),
        then: (resolve, reject) => Promise.resolve(result).then(resolve, reject),
    };
    return query;
}

const baseUser = {
    _id: 'u1',
    categories: ['iOS', 'Unreal'],
    emailSchedule: [{ lastGroupType: 'CS', lastCSIndex: 0, lastTECHIndex: 0 }]
};
// lastGroupType: 'CS' -> 다음은 TECH, (lastTECHIndex 0 + 1) % 2 -> categories[1] -> 'Unreal'

describe('selectQuestion', () => {
    beforeEach(() => vi.clearAllMocks());

    it('유저가 없으면 null을 반환한다', async () => {
        User.findOne.mockReturnValue(mockQuery(null));

        const result = await selectQuestion('nobody@test.com');

        expect(result).toBeNull();
    });

    it('emailSchedule이 비어있으면 null을 반환한다', async () => {
        User.findOne.mockReturnValue(mockQuery({ _id: 'u1', categories: ['iOS'], emailSchedule: [] }));

        const result = await selectQuestion('empty-schedule@test.com');

        expect(result).toBeNull();
    });

    it('카테고리 내 미발송 질문이 있으면 해당 질문을 선택한다', async () => {
        User.findOne.mockReturnValue(mockQuery(baseUser));
        UserActivity.find.mockReturnValue(mockQuery(['sentQ1']));
        Question.findOne.mockReturnValue(mockQuery({ _id: 'newQ' }));
        User.updateOne.mockResolvedValue({});
        UserActivity.create.mockResolvedValue({});

        const result = await selectQuestion('user@test.com');

        expect(Question.findOne).toHaveBeenCalledWith({
            category: 'Unreal',
            _id: { $nin: ['sentQ1'] }
        });
        expect(result).toBe('newQ');
        expect(UserActivity.create).toHaveBeenCalledWith({ user: 'u1', category: 'Unreal', question: 'newQ' });
    });

    it('카테고리 내 질문을 모두 발송했으면 가장 오래 전에 보낸 질문으로 순환 발송한다', async () => {
        User.findOne.mockReturnValue(mockQuery(baseUser));
        UserActivity.find.mockReturnValue(mockQuery(['q1', 'q2'])); // 이미 전부 발송됨
        Question.findOne.mockReturnValue(mockQuery(null)); // 미발송 질문 없음(소진)
        UserActivity.findOne.mockReturnValue(mockQuery({ question: 'q1' })); // 가장 오래 전에 보낸 질문
        Question.findById.mockReturnValue(mockQuery({ _id: 'q1' }));
        User.updateOne.mockResolvedValue({});
        UserActivity.create.mockResolvedValue({});

        const result = await selectQuestion('exhausted@test.com');

        expect(UserActivity.findOne).toHaveBeenCalledWith({ user: 'u1', category: 'Unreal' });
        expect(Question.findById).toHaveBeenCalledWith('q1');
        expect(result).toBe('q1');
    });

    it('카테고리에 질문 자체가 없으면(순환할 이력도 없음) null을 반환한다', async () => {
        User.findOne.mockReturnValue(mockQuery(baseUser));
        UserActivity.find.mockReturnValue(mockQuery([]));
        Question.findOne.mockReturnValue(mockQuery(null));
        UserActivity.findOne.mockReturnValue(mockQuery(null));

        const result = await selectQuestion('no-questions@test.com');

        expect(result).toBeNull();
        expect(UserActivity.create).not.toHaveBeenCalled();
    });
});
