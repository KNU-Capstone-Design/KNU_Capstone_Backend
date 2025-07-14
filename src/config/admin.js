import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { adminOptions } from '../admin/admin.options.js';
import { userResource } from "../admin/resources/user.resource.js";
import { componentLoader, serverMonitorComponent } from "../admin/components/componets.js";



export const setupAdminJS = () => {

  // Mongoose 어댑터 등록
  AdminJS.registerAdapter(AdminJSMongoose);

  const admin = new AdminJS({
    ...adminOptions,
    componentLoader,
    resources: [userResource],
    components: {
      serverMonitorComponent
    }
  });
  return admin;
};