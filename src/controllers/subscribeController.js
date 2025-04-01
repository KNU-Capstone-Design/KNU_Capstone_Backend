import * as subscribeService from '../services/subscribeService.js';

// 회원 가입 컨트롤러
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

// 구독 해지 컨트롤러
export const unsubscribe = async (req, res) => {
    try {
        const { email } = req.body;
        const already = await subscribeService.isAlreadyUnsubscribed(email);
        const isEmailExist = await subscribeService.isExist(email);
        if (already) { // 이미 구독 해지된 이메일일 경우
            return res.status(200).json({ message: '해당 이메일은 이미 구독 해지된 상태입니다.', email: 'user@example.com' });
        }
        if (!isEmailExist) { // 등록된 이메일이 아닐경우
            return res.status(404).json({ error: '해당 이메일은 구독되어 있지 않습니다.' });
        }
        await subscribeService.unsubscribe(email);
        return res.status(200).json({ message: '이메일 구독이 성공적으로 해지되었습니다.', email: 'user@example.com' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};