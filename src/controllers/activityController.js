import { listUserActivities } from '../services/activityService.js';
import { DEFAULT_LIMIT } from "../config/constants.js";
/*
 페이지네이션을 처리하는 컨트롤러
 */
export const getUserActivities = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
    const email = req.email;
    const result = await listUserActivities(page, limit, email);
    res.status(200).json(result);
  } catch (error) {
    console.error('getUserActivities error →', error);
    res.status(500).json({ error: '활동 목록 조회 중 오류 발생' });
  }
};

export const getDetailUserActivities = async (req, res) =>
{

}

