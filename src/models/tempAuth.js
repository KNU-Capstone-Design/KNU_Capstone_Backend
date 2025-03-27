// 토큰 기반 임시 인증
const mongoose = require('mongoose');

const tempAuthSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('TempAuth', tempAuthSchema);