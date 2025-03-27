// DB에 이메일 등록하는 비즈니스 로직
export const subscribe = async (email) => {
    console.log("이메일 등록:", email);
};

// DB에서 이메일 중복 여부 확인하는 비즈니스 로직
export const isAlreadySubscribed = async (email) => {
    console.log("이메일 중복 확인:", email);
};