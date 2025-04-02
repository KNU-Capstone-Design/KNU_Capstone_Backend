import User from '../models/users.js'

/*
    DB에 이메일 등록하는 비즈니스 로직
    @param { String } = email
    @param { Array<String> } = categories
    @param { Boolean } = subscriptionStatus
    @returns { Promise<Object> } => DB에 저장되는 문서
 */
export const subscribe = async (email, categories, subscriptionStatus) => {
    // 새로운 User객체를 생성
    const newUser = new User ({
        email,categories,subscriptionStatus
    });
    // DB에 저장하고 저장된 문서를 반환
    return await newUser.save();
};

// DB에서 이메일 중복 여부 확인하는 비즈니스 로직
export const isAlreadySubscribed = async (email) => {
    console.log("이메일 중복 확인:", email);
};

// DB에서 해당 이메일의 구독 해지 상태로 바꾸는 비지니스 로직
export const unsubscribe = async (email) => {
    console.log("구독 해지", email);
};

// DB에 해당 이메일이 존재하는지 확인
export const isExist = async (email) => {
    console.log("없는 이매일", email);
};

// DB에서 이미 구독 해지된 이메일임을 확인하는 비즈니스 로직
export const isAlreadyUnsubscribed = async (email) => {
    console.log("구독 해지 중복 확인:", email);
};