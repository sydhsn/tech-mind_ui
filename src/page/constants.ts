export const METHOD = {
  POST: "POST",
  PUT: "PUT",
  GET: "GET",
} as const;

export const AUTH_ACTIONS = {
  LOGIN: "auth/login",
  REGISTER: "auth/register",
  LOGOUT: "auth/logout",
  UPDATE_PROFILE: (userId: string) => `auth/profile/update/${userId}`,
} as const;

export const COURSE_ACTIONS = {
  COURSE_BY_ID: "courses",
  CREATE_COURSE: "courses/create",
  GET_MY_COURSES: "courses/my-courses",
} as const;
