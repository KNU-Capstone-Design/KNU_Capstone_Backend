import mongoose from "mongoose";

// 사용자 토큰 스키마 (처음 구독시 생성)
const userAuthSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true }
});

const UserAuth = mongoose.model('UserAuth', userAuthSchema);
export { UserAuth };