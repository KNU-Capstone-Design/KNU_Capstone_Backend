import LogService from '../services/logService.js';

class LogController {
  // 애플리케이션 로그 조회
  static async getAppLogs(req, res) {
    try {
      const logData = await LogService.getAppLogs();
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.send(logData);
    } catch (error) {
      console.error('애플리케이션 로그 조회 오류:', error);
      res.status(500).json({
        error: '애플리케이션 로그를 조회할 수 없습니다',
        message: error.message
      });
    }
  }

  // 에러 로그 조회
  static async getErrorLogs(req, res) {
    try {
      const logData = await LogService.getErrorLogs();
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.send(logData);
    } catch (error) {
      console.error('에러 로그 조회 오류:', error);
      res.status(500).json({
        error: '에러 로그를 조회할 수 없습니다',
        message: error.message
      });
    }
  }
}

export default LogController;
