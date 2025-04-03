import User from '../models/users.js'

/*
    DB에 이메일 등록하는 비즈니스 로직
    @param { String } = email
    @param { Array<String> } = categories
    @param { Boolean } = subscriptionStatus
    @returns { Promise<Object> } => DB에 저장되는 문서
 */
export const subscribe = async (email, categories, subscriptionStatus) => {
    // 재구독 유저 확인
    const existingUser = await User.findOne({ email });

    // 이미 존재하지만 구독 해지 상태인 경우 → 재활성화
    if (existingUser) {
        if (existingUser.subscriptionStatus === false) {
            existingUser.subscriptionStatus = true;
            existingUser.categories = categories;
            return await existingUser.save();
        }
        // 이미 구독 중인 경우
        throw new Error('ALREADY_SUBSCRIBED');
    }
    // 새로운 User객체를 생성
    const newUser = new User ({
        email,categories,subscriptionStatus
    });
    // DB에 저장하고 저장된 문서를 반환
    return await newUser.save();
};

// DB에서 해당 이메일의 구독 해지 상태로 바꾸는 비지니스 로직
export const unsubscribe = async (email) => {
   return User.findOneAndUpdate(
        { email },
        { subscriptionStatus: false }
    );
};

// DB에 해당 이메일이 존재하는지 확인
export const isExist = async (email) => {
    console.log("없는 이매일", email);
};

// DB에서 이미 구독 해지된 이메일임을 확인하는 비즈니스 로직
export const isAlreadyUnsubscribed = async (email) => {
    console.log("구독 해지 중복 확인:", email);
};