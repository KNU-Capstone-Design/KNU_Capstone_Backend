import mongoose from 'mongoose';
const { Schema } = mongoose;

// 유저 활동 기록 스키마 ( 잔디밭 구현이나 중복되는 질문 이메일 발송 방지에 사용)
const userActivitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date
    },
    category: {
        type: String,
        required: true,
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    aiAnswer: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// 인덱스 추가 - 성능 최적화
userActivitySchema.index({ user: 1, category: 1 });
userActivitySchema.index({ question: 1 });
userActivitySchema.index({ createdAt: -1 });

// 가상 필드 (Virtuals) 추가
userActivitySchema.virtual('questionDetails', {
    ref: 'Question',
    localField: 'question',
    foreignField: '_id',
    justOne: true
});

// 답변 여부를 확인하는 가상 필드
userActivitySchema.virtual('hasAnswer').get(function() {
    return this.answers && this.answers.length > 0;
});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);
export { UserActivity };