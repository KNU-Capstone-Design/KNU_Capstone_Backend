import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { adminOptions } from '../admin/admin.options.js';
import { userResource } from "../admin/resources/user.resource.js";
import {
  apiUsageComponent,
  componentLoader,
  errorLogMonitorComponent,
  infoLogMonitorComponent,
  serverMonitorComponent
} from "../admin/components/components.js";
import { questionResource } from "../admin/resources/question.resource.js";



export const setupAdminJS = () => {

  // Mongoose 어댑터 등록
  AdminJS.registerAdapter(AdminJSMongoose);

  const admin = new AdminJS({
    ...adminOptions,
    componentLoader,
    resources: [userResource, questionResource],
    components: {
      serverMonitorComponent,errorLogMonitorComponent,infoLogMonitorComponent,apiUsageComponent
    }
  });
  return admin;
};