import { resources } from './resources/index.js';
import {
    apiUsageComponent,
    errorLogMonitorComponent,
    infoLogMonitorComponent,
    serverMonitorComponent
} from "./components/componets.js";

export const adminOptions = {
  resources: resources,
  rootPath: '/admin',
  branding: {
    companyName: 'Myundo Admin',
    logo: false,
    favicon: false,
  },
  // 네비게이션 항목 설정
  dashboard: {
    component: 'Dashboard',
  },
  // 커스텀 페이지를 위한 네비게이션 설정
  pages: {
    'serverMonitor' : {
        label: '서버 상태',
        icon: 'Activity',
        component: serverMonitorComponent
    },
    'infoLog': {
        label: '정보 로그',
        icon: 'Info',
        component: infoLogMonitorComponent
    },
    'errorLog': {
        label: '오류 로그',
        icon: 'AlertTriangle',
        component: errorLogMonitorComponent
    },
      'ApiMonitor': {
          label: 'API, SMTP 모니터링',
          icon: 'Info',
          component: apiUsageComponent
    }
  }
}
