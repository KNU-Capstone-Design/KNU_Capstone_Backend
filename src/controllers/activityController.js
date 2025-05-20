import { listUserActivities } from '../services/activityService.js';
export const getUserActivities = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    // 이부분은 gpt가 써준건데 잘 모르겠음
    const userEmail = req.user.email;

    const result = await listUserActivities({ page, userEmail });
    res.status(200).json(result);
  } catch (error) {
    console.error('getUserActivities error →', error);
    res.status(500).json({ error: '활동 목록 조회 중 오류 발생' });
  }
};


