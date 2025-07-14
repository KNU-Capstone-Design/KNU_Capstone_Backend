import { userResource } from './user.resource.js';
import Answer from '../../models/answer.js';
import { UserActivity } from '../../models/userActivity.js';
import { serverResource } from "./server.resource.js";

export const resources = [
  userResource,serverResource
];
