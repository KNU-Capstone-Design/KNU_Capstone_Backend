import { body, validationResult } from 'express-validator';
import { TECH_CATEGORY } from "../config/constants.js";
import { createLogger } from "../utils/logger.js";

// 로거 생성
const logger = createLogger('validation')

// 검증 결과를 처리하는 미들웨어
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // 검증 실패 로깅
        logger.error('[Validation] 입력값 검증 실패', {
            error: '입력값 검증 실패',
            details: errors.array(),
            requestBody: req.body,
            url: req.originalUrl,
            method: req.method
        });

        return res.status(400).json({
            error: '입력값이 올바르지 않습니다.',
            details: errors.array()
        });
    }
    next();
};

// 회원가입 검증 규칙
export const validateSubscription = [
    body('email')
        .isEmail()
        .withMessage('올바른 이메일 형식이 아닙니다.')
        .normalizeEmail(),

    body('categories')
        .optional()
        .isArray()
        .withMessage('올바른 카테고리 형식이 아닙니다.')
        .custom((categories) => {
            if (categories && categories.length > 0) {
                const invalidCategories = categories.filter(cat => !TECH_CATEGORY.includes(cat));
                if (invalidCategories.length > 0) {
                    throw new Error(`유효하지 않은 카테고리: ${invalidCategories.join(', ')}`);
                }
            }
            return true;
        }),
    handleValidationErrors
];

// 답변 제출 검증 규칙
export const validateAnswer = [
    body('answer')
        .notEmpty()
        .withMessage('답변을 입력해주세요.')
        .trim()
        .isLength({ min: 1, max: 5000 })
        .withMessage('답변은 1자 이상 5000자 이하로 입력해주세요.'),
    handleValidationErrors
];

