import { COURSE_ACTIONS, METHOD } from "../page/constants";
import { apiGateway } from "./apiGateway";

export interface ICourse {
  _id?: string; // Optional for new courses (auto-generated)
  userId: string;
  courseTitle: string;
  courseTitleUrl?: string;
  subTitle?: string;
  description?: string;
  category?: string;
  courseLevel: string; // Required
  coursePrice?: number;
  courseThumbnail?: string;
  enrolledStudents?: string[];
  isPreviewFree?: boolean;
  lectures?: Lecture[];
  duration?: number;
  creator?: ICreator;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Define Lecture Interface (If not already defined)
export interface Lecture {
  _id: string;
  lectureTitle: string;
  videoUrl?: string;
  publicId?: string;
  isPreviewFree?: boolean;
}

// Define Creator Interface
export interface ICreator {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  password: string;
  role: string;
  enrolledCourses?: string[];
  teachingCourses?: string[];
  profilePhoto?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IGetMyCourses {
  userId: string;
}

const courseAPI = apiGateway.injectEndpoints({
  endpoints: (build) => ({
    createCourse: build.mutation<ICourse, ICourse>({
      query: (course) => ({
        actionName: COURSE_ACTIONS.CREATE_COURSE,
        methodType: METHOD.POST,
        body: course,
      }),
    }),
    getMyCourses: build.query<ICourse[], IGetMyCourses>({
      query: (creator) => ({
        actionName: `${COURSE_ACTIONS.GET_MY_COURSES}/${creator?.userId}`,
        methodType: METHOD.GET,
      }),
    }),
    findCourseById: build.query<ICourse, string>({
      query: (courseId) => ({
        actionName: `${COURSE_ACTIONS.COURSE_BY_ID}/${courseId}`,
        methodType: METHOD.GET,
      }),
    }),
  }),
});
export const {
  useCreateCourseMutation,
  useLazyGetMyCoursesQuery,
  useLazyFindCourseByIdQuery,
} = courseAPI;
