import { userResource } from './user.resource.js';
import Answer from '../../models/answer.js';
import { UserActivity } from '../../models/userActivity.js';
import { serverResource } from "./server.resource.js";
import { questionResource } from './question.resource.js';
import { errorLogResource } from "./errorLog.resource.js";
import { infoLogResource } from "./infoLog.resource.js";
import { apiResource } from "./api.resource.js";


export const resources = [
  userResource,
  serverResource,
  questionResource,
  errorLogResource,
  infoLogResource,
  apiResource
];
