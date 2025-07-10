import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import session from 'express-session';

// AdminJS에서 사용할 모델 임포트
import User from '../models/users.js';
import { Question } from '../models/questions.js';
import Answer from '../models/answer.js';
import { UserActivity } from '../models/userActivity.js';

// AdminJS 설정 함수
export const setupAdminJS = (app) => {
  // AdminJS 어댑터 등록
  AdminJS.registerAdapter(AdminJSMongoose);
  
  // 기본 관리자 계정 설정
  const DEFAULT_ADMIN = {
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'password',
  };

  // 인증 함수 정의
  const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
  };

  const adminOptions = {
    // 관리할 모델 목록
    resources: [
      User,
      Question,
      Answer,
      UserActivity
    ],
    rootPath: '/admin',
     branding: {
      companyName: 'Myundo Admin',
      logo: false, 
      favicon: false, 
    },
  };
    return new AdminJS(adminOptions);
};