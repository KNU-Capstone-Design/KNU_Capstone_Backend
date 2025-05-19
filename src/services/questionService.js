import { Question } from "../models/questions.js";

export async function getQuestionInfo( questionId ) {
    const question = await Question.findById(questionId);
    return {
        category: question.category,
        question: question.text
    };
}