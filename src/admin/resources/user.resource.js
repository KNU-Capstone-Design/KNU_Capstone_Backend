import User from '../../models/users.js';

export const userResource = {
  resource: User,
  options: {
    navigation: {
      name: '구독자 관리',
      icon: 'User',
    },
    properties: {
      email: { isTitle: true, position: 1 },
      subscriptionStatus: {
        position: 2,
        availableValues: [
          { value: true, label: '구독 중' },
          { value: false, label: '구독 해지' },
        ],
      },
      categories: { position: 3, type: 'string' },
      'streak.current': {
        position: 4,
        isVisible: { list: true, show: true, edit: false },
        name: '연속 문제 해결일',
      },
      'streak.lastSolvedDate': {
        position: 5,
        isVisible: { list: false, show: true, edit: false },
        name: '마지막 문제 해결일',
      },
      createdAt: { isVisible: { list: true, show: true } },
    },
    listProperties: ['email', 'subscriptionStatus', 'categories', 'streak.current', 'createdAt'],
    editProperties: ['email', 'subscriptionStatus', 'categories'],
    showProperties: ['email', 'subscriptionStatus', 'categories', 'streak.current', 'streak.lastSolvedDate', 'createdAt', 'updatedAt'],
  },
};