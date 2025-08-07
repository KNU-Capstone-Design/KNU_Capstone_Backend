import { Question } from '../../models/questions.js';

export const questionResource = {
  resource: Question,
  options: {
    navigation: {
      name: '질문 관리',
      icon: 'MessageCircle',
    },
    properties: {
      _id: {
        isVisible: { list: true, show: true, edit: false, filter: true }
      },
      text: {
        isTitle: true,
        position: 1,
        type: 'textarea',
        props: {
          rows: 3
        }
      },
      category: {
        position: 2,
        availableValues: [
          { value: 'Frontend', label: '프론트엔드' },
          { value: 'Backend', label: '백엔드' },
          { value: 'Android', label: '안드로이드' },
          { value: 'iOS', label: 'iOS' },
          { value: 'Unreal', label: '언리얼엔진' },
          { value: 'Unity', label: '유니티엔진' },
          { value: 'Database', label: '데이터베이스' },
          { value: 'Algorithm', label: '알고리즘' },
          { value: 'Network', label: '네트워크' },
          { value: 'OS', label: '운영체제' },
          { value: 'Java', label: '자바' },
          { value: 'JavaScript', label: '자바스크립트' },
          { value: 'Python', label: '파이썬' }
        ]
      },
    },
    actions: {
      new: {
        isAccessible: true
      },
      edit: {
        isAccessible: true
      },
      delete: {
        isAccessible: true
      },
      show: {
        isAccessible: true
      },
      list: {
        isAccessible: true
      }
    },
    listProperties: ['_id', 'text', 'category'],
    showProperties: ['_id', 'text', 'category'],
    editProperties: ['text', 'category'],
    filterProperties: ['category','text']
  }
}
