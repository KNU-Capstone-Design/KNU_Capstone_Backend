// 토큰 기반 임시 인증
import mongoose from "mongoose";

const tempAuthSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
}, {
    timestamps: true
});

const TempAuth = mongoose.model('TempAuth', tempAuthSchema);
export default TempAuth;