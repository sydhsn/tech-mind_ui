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
  PUBLISH_COURSE: "courses/published-courses",
} as const;

export const LECTURE_ACTIONS = {
  LECTURES: "lectures",
};

export const PAYMENT_ACTIONS = {
  COURSE_PHURCHASE: "course-purchase",
};

export const PROGRESS_ACTIONS = {
  SAVE_PROGRESS: "progress",
};
