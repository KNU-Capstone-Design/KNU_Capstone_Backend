import mongoose, {Schema} from 'mongoose';

// 유저 스키마
const userSchema = new mongoose.Schema({
    // 사용자의 이메일
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value}는 유효한 이메일 형식이 아닙니다!` // 이메일 형식 검증
        }
    },
    // 사용자가 구독한 카테고리
    categories: [{
        type: String,
    }],
    // 사용자의 구독 상태 (구독 중이면 true)
    subscriptionStatus: { type: Boolean, default: true },
    /*
       CS 질문, 기술스택 질문을 교차로 보내기 위한 유저별 인덱스 저장
    */
    emailSchedule: {
        type: [{
            _id: false,
            lastGroupType: { type: String, enum: ['CS', 'TECH'] },
            lastCSIndex: Number,
            lastTECHIndex: Number
        }],
        default: [{
            lastGroupType: 'CS',
            lastCSIndex: 0,
            lastTECHIndex: 0
        }]
    }
});

// 인덱스 추가
userSchema.index({ subscriptionStatus: 1 });

// 사용자의 모든 활동을 조회하는 가상 필드
userSchema.virtual('activities', {
    ref: 'UserActivity',
    localField: '_id',
    foreignField: 'user'
});

const User = mongoose.model('User', userSchema);

export default User;