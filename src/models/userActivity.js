import mongoose from  'mongoose';
const { Schema } = mongoose;

// 유저 활동 기록 스키마 ( 잔디밭 구현이나 중복되는 질문 이메일 발송 방지에 사용)
const userActivitySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }]
}, {
    timestamps: true
});