import { resources } from './resources/index.js';
import { serverMonitorComponent } from "./components/componets.js";

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
        label: '서버 모니터링',
        icon: 'Server',
        component: serverMonitorComponent
    }
  }
}
