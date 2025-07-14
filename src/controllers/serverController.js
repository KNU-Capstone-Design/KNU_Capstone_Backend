import { getServerInfo } from '../services/serverService.js';

export const getServerResources = async (req, res) => {
  try {
    const serverData = await getServerInfo();
    res.json(serverData);
  } catch (error) {
    console.error('서버 리소스 정보 조회 오류:', error);
    res.status(500).json({ error: '서버 리소스 정보를 가져올 수 없습니다.' });
  }
};
