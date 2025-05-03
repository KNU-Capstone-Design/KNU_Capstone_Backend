// 질문 조회 컨트롤러
import { Question } from '../models/questions.js';
import { getQuestionInfo } from "../services/questionService.js";

export const getQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const questionInfo = await getQuestionInfo(questionId);
        res.status(200).json(questionInfo);
        if(!questionInfo) {
            req.status(404).json({ error: "질문을 찾을 수 없습니다."})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}
// 질문 read
export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: '질문을 불러오는 중 오류 발생' });
    }
};

// 질문 create
export const createQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ error: '질문 추가 실패' });
    }
};

// 질문 update
export const updateQuestion = async (req, res) => {
    try {
        const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: '질문 수정 실패' });
    }
};

// 질문 delete
export const deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: '질문 삭제 완료' });
    } catch (error) {
        res.status(400).json({ error: '질문 삭제 실패' });
    }
};
import { Question } from '../models/questions.js';

// 질문 read
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: '질문을 불러오는 중 오류 발생' });
  }
};

// 질문 create
export const createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: '질문 추가 실패' });
  }
};

// 질문 update
export const updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: '질문 수정 실패' });
  }
};

// 질문 delete
export const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: '질문 삭제 완료' });
  } catch (error) {
    res.status(400).json({ error: '질문 삭제 실패' });
  }
};