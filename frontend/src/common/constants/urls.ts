import { SYSTEM_CONSTANTS } from "../constants/constants";
const BASE_URL = `${SYSTEM_CONSTANTS.BASE_URL}/api/v1`;
export const URLS = {
  REGISTER: BASE_URL + "/register",
  LOGIN: BASE_URL + "/login",
  LOGOUT: BASE_URL + "/logout",
  TASK_LIST: BASE_URL + "/tasks",
  TASK: BASE_URL + "/tasks/",
  TASK_CREATE: BASE_URL + "/tasks",
  TASK_UPDATE: BASE_URL + "/tasks/",
  TASK_DELETE: BASE_URL + "/tasks/",
  TASK_ITEMS: BASE_URL + "/subtaskGet",
  SUB_TASK: BASE_URL + "/subtasks/:subtaskId",
  SUB_TASK_CREATE: BASE_URL + "/subtasks",
  SUB_TASK_UPDATE: BASE_URL + "/subtasks/",
  SUB_TASK_DELETE: BASE_URL + "/subtasks/",
  TASK_LIST_SEARCH: BASE_URL + "/subtasks/",

  // SANCTUM_TOKEN: "/sanctum/csrf-cookie",
};
