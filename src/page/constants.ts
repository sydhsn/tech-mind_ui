export const METHOD = {
  POST: "POST",
  PUT: "PUT",
} as const;

export const AUTH_ACTIONS = {
  LOGIN: "auth/login",
  REGISTER: "auth/register",
  LOGOUT: "auth/logout",
  UPDATE_PROFILE: (userId: string) => `auth/profile/update/${userId}`,
} as const;

export const COURSE_ACTIONS = {
  CREATE_COURSE: "courses",
} as const;
