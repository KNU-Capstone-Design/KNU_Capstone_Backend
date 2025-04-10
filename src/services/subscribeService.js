import User from '../models/users.js'
import {sendWelcomeEmail} from "./mailService.js";

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
    /*
        사용자가 Backend,Frontend를 구독했을시 Java,JavaScript도 카테고리에 추가
    */
    if (categories.includes("Backend")) {
        categories.push("Java");
    }
    if (categories.includes("Frontend")) {
        categories.push("JavaScript");
    }
    // 새로운 User객체를 생성
    const newUser = new User ({
        email,categories,subscriptionStatus
    });
    // 환영 이메일 발송
    await sendWelcomeEmail( { to: email });
    // DB에 저장하고 저장된 문서를 반환
    return await newUser.save();
};

// DB에서 해당 이메일의 구독 해지 상태로 바꾸는 비지니스 로직
export const unsubscribe = async (email) => {

    // DB에 등록된 이메일인지 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        // 이미 구독해지된 이메일일 경우의 예외처리
        if (existingUser.subscriptionStatus === false) {
            throw new Error('ALREADY_UNSUBSCRIBED');
        }
        else {
            return User.findOneAndUpdate(
                { email },
                { subscriptionStatus: false }
            );
        }
    }
    else {
        // DB에 등록되지 않은 이메일일 경우의 예외처리
        throw  new Error('UNREGISTERED');
    }
};

// 구독중인 사용자들을 반환
export async function getSubscribedUsers() {
    // 구독한 사용자만 필터링
    return User.find({ subscriptionStatus : true });
}

