// 질문 조회 컨트롤러
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