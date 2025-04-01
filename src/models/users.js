import mongoose from 'mongoose';

// 유저 스키마
const userSchema = new mongoose.Schema({
    // 사용자의 이메일
    email: { type: String, required: true, unique: true },
    // 사용자가 구독한 카테고리
    categories: [{ type: String}],
    // 사용자의 구독 상태 (기본값은 false, 구독 중이면 true)
    subscriptionStatus: { type: Boolean, default: false }

});

const User = mongoose.model('User', userSchema);

export default User;