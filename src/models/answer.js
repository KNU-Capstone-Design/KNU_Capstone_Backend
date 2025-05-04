// 사용자 답변, 피드백, 풀이 상태를 저장하는 스키마
import mongoose from 'mongoose';
const { Schema } = mongoose;

const answerSchema = new Schema({
    // User 컬렉션 참조
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // 질문 식별자
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    // 카테고리명
    category: { 
        type: String, 
        required: true,
    },

    // 사용자의 답변 내용
    answerText: { type: String, required: true },
    // 제출 시간
    submittedAt: { type: Date, default: Date.now },

    // AI 피드백
    score: { type: Number, default: 0 },
    strengths: { type: [String], default: [] },       // 잘한 점
    improvements: { type: [String], default: [] },    // 고칠 점
    wrongPoints: { type: [String], default: [] },      // 부족한 점

    // 상태값
    isFinal: { type: Boolean, default: true },
    revealedAnswer: { type: Boolean, default: false }
}, {
    timestamps: true,  // createdAt, updatedAt 자동생성
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// 인덱스 추가 - 성능 최적화
answerSchema.index({ user: 1, question: 1 });
answerSchema.index({ submittedAt: -1 });

// 가상 필드 추가 - 연관된 활동 정보 쉽게 조회
answerSchema.virtual('activityDetails', {
    ref: 'UserActivity',
    localField: '_id',
    foreignField: 'answers',
    justOne: true
});

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;