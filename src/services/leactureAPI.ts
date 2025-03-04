import { apiGateway } from "./apiGateway";
import { LECTURE_ACTIONS, METHOD } from "../page/constants";

// Define your types
interface SaveLectureRequest {
  courseId: string;
  formData: FormData; // Use FormData instead of lectures array
}

interface SaveLectureResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface HasLectureResponse {
  hasLectures: true;
}

const lectureAPI = apiGateway.injectEndpoints({
  endpoints: (build) => ({
    // Save lecture to course mutation
    saveLectureToCourse: build.mutation<
      SaveLectureResponse,
      SaveLectureRequest
    >({
      query: ({ courseId, formData }) => {
        return {
          actionName: `${LECTURE_ACTIONS.LECTURES}/${courseId}`, // Include courseId in the URL
          methodType: METHOD.POST,
          body: formData, // Send FormData directly
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
    checkCourseHasLecture: build.query<HasLectureResponse, string>({
      query: (courseId) => {
        return {
          actionName: `${LECTURE_ACTIONS.LECTURES}/${courseId}/has-lectures`,
          methodType: METHOD.GET,
        };
      },
    }),
  }),
});

export const {
  useSaveLectureToCourseMutation,
  useLazyCheckCourseHasLectureQuery,
} = lectureAPI;
