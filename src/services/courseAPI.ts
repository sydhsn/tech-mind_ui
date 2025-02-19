import { COURSE_ACTIONS, METHOD } from "../page/constants";
import { apiGateway } from "./apiGateway";

export interface ICourse {
  userId: string;
  courseTitle: string;
  description: string;
  category: string;
  duration: number;
  level: string;
  price: number;
  creator: string;
}

export interface ICourseResponse {
  courseTitle: string;
  description: string;
  category: string;
  enrolledStudents: any[];
  lectures: any[];
  creator: string;
  isPublished: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const courseAPI = apiGateway.injectEndpoints({
  endpoints: (build) => ({
    createCourse: build.mutation<ICourseResponse, ICourse>({
      query: (course) => ({
        actionName: COURSE_ACTIONS.CREATE_COURSE,
        methodType: METHOD.POST,
        body: course,
      }),
    }),
  }),
});
export const { useCreateCourseMutation } = courseAPI;
