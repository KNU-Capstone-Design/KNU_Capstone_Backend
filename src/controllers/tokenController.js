import generateToken from "../services/tokenService.js";

exports.requestToken = async (req, res) => {
    const { email } = req.body;
    if ( !email ) return res.status(400).json({ error: '이메일이 누락되었습니다.'
    });
    try {
        const token = await generateToken(email);
        res.status(200).json({ token, message: '임시 토큰이 발급되었습니다.' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}