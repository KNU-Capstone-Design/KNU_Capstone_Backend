/*
    이메일 발송 알고리즘
    CS,TECH 관련 질문을 교차로 발송해야하고 카테고리는 매번 달라야함.
    중복되는 질문을 발송되서는 안됨
*/

import User from '../models/users.js'
import { CS_CATEGORY } from "../config/constants.js";

export async function selectQuestion  (email)  {
    // 필요한 인덱스와 구독항목을 읽어옴
    const user = await User.findOne({ email }).select('emailSchedule categories');
    /*
        categories: [Backend, Java],
        emailSchedule: [
            { lastGroupType: "CS",
              lastCSIndex: 1,
              lastTECHIndex: 1 }
        ]
    */
    const schedule = user.emailSchedule[0];
    const category = user.categories;


    return questionID
}