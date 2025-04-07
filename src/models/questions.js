const mongoose = require('mongoose');
const { Schema } = mongoose;

// 질문 스키마
const QuestionSchema = new Schema({
    // 질문별 고유 식별자
    questionId: {
        type: Number,
        required: true
    },
    // 질문 내용
    text: {
        type: String,
        required: true
    }
});

// 카테고리 스키마
const CategorySchema = new Schema({
    // 카테고리 이름 (Database, OS..)
    category: {
        type: String,
        required: true
    },
    // 카테고리 스키마는 질문 스키마를 포함
    questions: [QuestionSchema]
});

const QuestionModel = mongoose.model('QuestionModel', CategorySchema);
export { QuestionModel };