import { getServerInfo } from '../services/serverService.js';
import { getDailyApiUsageAggregation } from '../services/apiUsageService.js';
import { SmtpUsage } from '../models/smtpUsage.js';
import { createLogger } from '../utils/logger.js';

// 서버 컨트롤러 로거 생성
const logger = createLogger('serverController');

export const getServerResources = async (req, res) => {
  try {
    const serverData = await getServerInfo();
    res.json(serverData);
  } catch (error) {
    logger.error('서버 리소스 정보 조회 오류', { error: error.message, stack: error.stack });
    res.status(500).json({ error: '서버 리소스 정보를 가져올 수 없습니다.' });
  }
};

// API 사용량 집계 데이터 조회
export const getDailyApiUsage = async (req, res) => {
  try {
    const apiUsageData = await getDailyApiUsageAggregation();
    res.json(apiUsageData);
  } catch (error) {
    logger.error('API 사용량 조회 오류', { error: error.message, stack: error.stack });
    res.status(500).json({ error: 'API 사용량 데이터를 가져올 수 없습니다.' });
  }
};

// SMTP 사용량 데이터 조회
export const getSmtpUsage = async (req, res) => {
  try {
    const smtpUsageData = await SmtpUsage.find().sort({ date: 1 });
    res.json(smtpUsageData);
  } catch (error) {
    logger.error('SMTP 사용량 조회 오류', { error: error.message, stack: error.stack });
    res.status(500).json({ error: 'SMTP 사용량 데이터를 가져올 수 없습니다.' });
  }
};
