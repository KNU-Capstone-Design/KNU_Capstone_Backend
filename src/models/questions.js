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
    // 카테고리 이름 (데이터베이스, 운영체제..)
    category: {
        type: String,
        required: true
    },
    // 카테고리 스키마는 질문 스키마를 포함
    questions: [QuestionSchema]
});

module.exports = mongoose.model('Category', CategorySchema);