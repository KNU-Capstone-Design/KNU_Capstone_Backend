import {returnAnswer, returnFeedBack} from "../services/answerService.js";

/*
 * 사용자 답변에 대한 피드백 제공
 */
export const requestAnswer = async (req, res) => {
    try {
        const { questionId } = req.params;
        const { answer } = req.body;
        const email = req.email; // validateToken에서 설정된 이메일
        
        if (!answer && answer !== '') {
            return res.status(400).json({
                success: false,
                error: "답변이 제공되지 않았습니다."
            });
        }

        const result = await returnFeedBack(email, questionId, answer);
        
        return res.status(200).json({
            success: true,
            data: {
                score: result.score,
                strengths: result.strengths,
                improvements: result.improvements,
                wrongPoints: result.wrongPoints
            },
            message: "답변 평가가 완료되었습니다."
        });
    }
    catch (error) {
        console.error("답변 처리 오류:", error);
        res.status(500).json({ 
            success: false, 
            error: '서버에서 답변을 처리하는 중 오류가 발생했습니다.' 
        });
    }
}

/*
 * "모르겠어요" 버튼 클릭 시 모범 답안 제공
 */
export const getAnswer = async(req, res) => {
    try {
        const { questionId } = req.params;
        const email = req.email; // validateToken에서 설정된 이메일
        
        const result = await returnAnswer(email, questionId);
        
        return res.status(200).json({
            success: true,
            data: {
                answer: result,
                message: "모범 답안이 제공되었습니다."
            }
        });
    }
    catch (error) {
        console.error("답안 제공 오류:", error);
        res.status(500).json({
            success: false, 
            error: '서버에서 답안을 제공하는 중 오류가 발생했습니다.'
        });
    }
}