import * as subscribeService from '../services/subscribeService.js';

export const subscribeUser = async (req, res) => {
    try {
        const { email }  = req.body;
        const already = await subscribeService.isAlreadySubscribed(email);
        if (already) { //이미 구독중인 이메일 입니다.
            return res.status(409).json({ error: '이미 구독중인 이메일 입니다.' });
        }

        await subscribeService.subscribe(email);
        return res.status(200).json({
            message: "이메일이 성공적으로 등록되었습니다. 등록하신 이메일을 확인해주세요.",
            email: email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};