import winston from 'winston';
import path from 'path';

// 로그 포맷 정의
const { combine, timestamp, printf, colorize, errors } = winston.format;

// 커스텀 로그 포맷
const logFormat = printf(({ level, message, timestamp, service, ...metadata }) => {
  const metaStr = Object.keys(metadata).length ? 
    `\n${JSON.stringify(metadata, null, 2)}` : '';
  return `[${timestamp}] [${level}] [${service}]: ${message}${metaStr}`;
});

// 로그 디렉토리 설정
const LOG_DIR = path.join(process.cwd(), 'logs');

// 환경 설정
const isDev = process.env.NODE_ENV !== 'production';

/**
 * winston 로거 생성 함수
 * @param {string} service - 서비스/모듈 이름
 * @returns {winston.Logger} 로거 인스턴스
 */
export function createLogger(service = 'app') {
  return winston.createLogger({
    level: isDev ? 'debug' : 'info', // 개발환경에서는 debug 레벨부터, 프로덕션은 info부터
    format: combine(
      errors({ stack: true }), // 에러 스택 추적
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      logFormat
    ),
    defaultMeta: { service }, // 모든 로그에 서비스명 추가
    transports: [
      // 콘솔 출력 (개발환경)
      new winston.transports.Console({
        format: combine(
          colorize(), // 콘솔에서는 색상 추가
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          logFormat
        )
      }),
      
      // 정보 수준 로그는 파일로 저장 (프로덕션 환경)
      !isDev && new winston.transports.File({ 
        filename: path.join(LOG_DIR, 'app.log'),
        level: 'info',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
      
      // 에러 수준 로그는 별도 파일에 저장 (프로덕션 환경)
      !isDev && new winston.transports.File({ 
        filename: path.join(LOG_DIR, 'error.log'),
        level: 'error',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      })
    ].filter(Boolean) // false 값 제거
  });
}

/**
 * 요청 실행 시간 측정 헬퍼 함수
 */
export function createTimer() {
  const startTime = Date.now();
  return () => Date.now() - startTime;
}

// 기본 앱 로거
export default createLogger();