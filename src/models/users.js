import mongoose, {Schema} from 'mongoose';

// 유저 스키마
const userSchema = new mongoose.Schema({
    // 사용자의 이메일
    email: { type: String, required: true, unique: true },
    // 사용자가 구독한 카테고리
    categories: [{
        type: String,
    }],
    // 사용자의 구독 상태 (구독 중이면 true)
    subscriptionStatus: { type: Boolean, default: true },
    /*
       CS 질문, 기술스택 질문을 교차로 보내기 위한 유저별 인덱스 저장
    */
    emailSchedule: [{
        lastGroupType: { type: String, enum: ['CS', 'TECH'], default: 'CS' }, // 마지막 발송 그룹
        lastCSIndex: { type: Number, default: 0 },
        lastTECHIndex: { type: Number, default: 0 }
    }]
});

const User = mongoose.model('User', userSchema);

export default User;