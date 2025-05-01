import mongoose from 'mongoose';
const { Schema } = mongoose;

// 질문 스키마, _id로 관리
const QuestionSchema = new Schema({
    // 질문 내용
    text: {
        type: String,
        required: true
    },
    category: {
        type: String, 
        required: true,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// 인덱스 추가 - 카테고리별 질문 조회 성능 개선
QuestionSchema.index({ category: 1 });

// 가상 필드 추가 - 특정 질문에 대한 모든 활동 조회
QuestionSchema.virtual('activities', {
    ref: 'UserActivity',
    localField: '_id',
    foreignField: 'question'
});

// 가상 필드 추가 - 답변 수 조회
QuestionSchema.virtual('answerCount', {
    ref: 'UserActivity',
    localField: '_id',
    foreignField: 'question',
    count: true
});

const Question = mongoose.model('Question', QuestionSchema);
export { Question }