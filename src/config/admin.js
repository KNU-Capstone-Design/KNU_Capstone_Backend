import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { adminOptions } from '../admin/admin.options.js';


export const setupAdminJS = () => {
  // AdminJS 어댑터 등록
  AdminJS.registerAdapter(AdminJSMongoose);

  const admin = new AdminJS(adminOptions);

  return admin;
};