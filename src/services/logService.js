import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 프로젝트 루트의 상위 디렉토리의 logs 폴더
const logsDir = path.join(__dirname, '../../../logs');

class LogService {
  // 애플리케이션 로그 읽기 (app.log + app1.log ~ app4.log)
  static async getAppLogs() {
    try {
      let allLogData = '';

      // app.log부터 app4.log까지 순서대로 읽기 (오래된 것부터)
      for (let i = 4; i >= 0; i--) {
        const logFileName = i === 0 ? 'app.log' : `app${i}.log`;
        const logPath = path.join(logsDir, logFileName);

        if (fs.existsSync(logPath)) {
          console.log(`로그 파일 읽기: ${logFileName}`);
          const logData = fs.readFileSync(logPath, 'utf8');
          allLogData += logData + '\n';
        }
      }

      if (allLogData.trim() === '') {
        console.log("애플리케이션 로그 파일을 찾을 수 없음");
      }

      return this.limitLogLines(allLogData);
    } catch (error) {
      console.error('애플리케이션 로그 읽기 오류:', error);
    }
  }

  // 에러 로그 읽기 (error.log + error1.log ~ error4.log)
  static async getErrorLogs() {
    try {
      let allLogData = '';

      // error.log부터 error4.log까지 순서대로 읽기 (오래된 것부터)
      for (let i = 4; i >= 0; i--) {
        const logFileName = i === 0 ? 'error.log' : `error${i}.log`;
        const logPath = path.join(logsDir, logFileName);

        if (fs.existsSync(logPath)) {
          console.log(`로그 파일 읽기: ${logFileName}`);
          const logData = fs.readFileSync(logPath, 'utf8');
          allLogData += logData + '\n';
        }
      }

      if (allLogData.trim() === '') {
          console.log("애플리케이션 로그 파일을 찾을 수 없음");
      }

      return this.limitLogLines(allLogData);
    } catch (error) {
      console.error('에러 로그 읽기 오류:', error);
    }
  }

  // 로그 파일 크기 제한 (마지막 1000줄만)
  static limitLogLines(logData, maxLines = 1000) {
    const lines = logData.split('\n');
    if (lines.length > maxLines) {
      return lines.slice(-maxLines).join('\n');
    }
    return logData;
  }
}

export default LogService;
