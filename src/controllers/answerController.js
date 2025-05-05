import { returnFeedBack } from "../services/answerService.js";

// 답변 제출을 처리하는 컨트롤러
export const requestAnswer = async (req, res) => {
    try {
        const { questionId } = req.params;
        const { answer } = req.body;
        const { email } = req.email;
        const result = await returnFeedBack(email, questionId, answer);
        if (!result) {
            return res.status(400).json({
                message: "답변 제출 실패"
            });
        }
        return res.status(200).json(result);

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}