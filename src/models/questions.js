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
        type: String, required: true
    }
});

const Question = mongoose.model('Question', QuestionSchema);
export { Question }