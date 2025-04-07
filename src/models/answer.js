// 사용자 답변, 피드백, 풀이 상태를 저장하는 스키마
import mongoose from 'mongoose';
const { Schema } = mongoose;

const answerSchema = new Schema({
    // User 컬렉션 참조
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // 질문 식별자
    questionId: { type: Number, required: true },
    // 카테고리명
    category: { type: String, required: true },

    // 사용자의 답변 내용
    answerText: { type: String, required: true },
    // 제출 시간
    submittedAt: { type: Date, default: Date.now },

    // AI 피드백
    score: { type: Number, default: 0 },
    strengths: { type: String },
    improvements: { type: String },
    wrongPoints: { type: String },

    // 상태값
    isFinal: { type: Boolean, default: true },
    revealedAnswer: { type: Boolean, default: false }
}, {
    timestamps: true  // createdAt, updatedAt 자동생성
});

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;