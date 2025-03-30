// 토큰 기반 임시 인증
import mongoose from "mongoose";

const tempAuthSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
}, {
    timestamps: true
});

// 토큰 만료후 자동으로 문서 삭제
tempAuthSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const TempAuth = mongoose.model('TempAuth', tempAuthSchema);
export default TempAuth;