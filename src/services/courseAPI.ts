import { COURSE_ACTIONS, METHOD } from "../page/constants";
import { ICourse, Lecture } from "../types/AddCourse";
import { apiGateway } from "./apiGateway";

export interface IGetMyCourses {
  userId: string;
}

export interface ISaveLectures {
  courseId: string;
  lectures: Lecture[];
}

const courseAPI = apiGateway.injectEndpoints({
  endpoints: (build) => ({
    // Create a new course
    createCourse: build.mutation<ICourse, ICourse>({
      query: (course) => ({
        actionName: COURSE_ACTIONS.CREATE_COURSE,
        methodType: METHOD.POST,
        body: course,
      }),
    }),

    // Get courses created by a specific user
    getMyCourses: build.query<ICourse[], IGetMyCourses>({
      query: (creator) => ({
        actionName: `${COURSE_ACTIONS.GET_MY_COURSES}/${creator?.userId}`,
        methodType: METHOD.GET,
      }),
    }),

    // Find a course by its ID
    findCourseById: build.query<ICourse, string>({
      query: (courseId) => ({
        actionName: `${COURSE_ACTIONS.COURSE_BY_ID}/${courseId}`,
        methodType: METHOD.GET,
      }),
    }),

    // Update an existing course
    updateCourse: build.mutation<ICourse, { id: string; course: ICourse }>({
      query: ({ id, course }) => ({
        actionName: `${COURSE_ACTIONS.COURSE_BY_ID}/${id}`,
        methodType: METHOD.PUT,
        body: course,
      }),
    }),

    // Save lectures for a course
    saveLectures: build.mutation<void, ISaveLectures>({
      query: ({ courseId, lectures }) => ({
        actionName: `${COURSE_ACTIONS.COURSE_BY_ID}/${courseId}/lectures`,
        methodType: METHOD.POST,
        body: lectures,
      }),
    }),

    // publish course by id
    publishCourse: build.mutation<
      void,
      {
        courseId: string;
        creator: string;
      }
    >({
      query: ({ courseId, creator }) => (
        console.log("courseId", courseId),
        console.log("creator", creator),
        {
          actionName: `${COURSE_ACTIONS.COURSE_BY_ID}/publish/${courseId}`,
          methodType: METHOD.PUT,
          body: { creator },
        }
      ),
    }),
  }),
});

// Export hooks for API endpoints
export const {
  useCreateCourseMutation,
  useLazyGetMyCoursesQuery,
  useLazyFindCourseByIdQuery,
  useUpdateCourseMutation,
  useSaveLecturesMutation,
  usePublishCourseMutation,
} = courseAPI;
