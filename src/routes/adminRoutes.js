import AdminJSExpress from '@adminjs/express';
import session from 'express-session';
import { getServerResources } from '../controllers/serverController.js';

export const setupAdminRouter = (app, admin) => {
  // 관리자 인증 함수
  const authenticate = async (email, password) => {
    // 환경 변수에서 관리자 계정 정보 가져오기
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password';

    if (email === adminEmail && password === adminPassword) {
      return Promise.resolve({ email, role: 'admin' });
    }
    return null;
  };

  // 세션 설정
  const sessionOptions = {
    resave: true,
    saveUninitialized: true,
    secret: process.env.ADMIN_SESSION_SECRET || 'sessionsecret',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, // 1시간
    },
    name: 'adminjs',
  };

  // AdminJS 라우터 생성
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: process.env.ADMIN_COOKIE_PASSWORD || 'sessionsecret',
    },
    null,
    sessionOptions
  );

  // // 서버 리소스 API 엔드포인트 추가
  // adminRouter.get('api/server-resources', getServerResources);

  // AdminJS 라우터를 메인 앱에 연결
  app.use('/admin', adminRouter);

  return adminRouter;
};