import { returnFeedBack } from "/src/services/answerService.js";

// 답변 제출을 처리하는 컨트롤러
export const requestAnswer = async (req, res) => {
    try {
        const { questionID, answer, token } = req.body;
        const result = await returnFeedBack(questionID, answer, token);

        return res.status(200).json({
            message: "답변 제출 완료"
        });

    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}