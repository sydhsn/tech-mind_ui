import { apiGateway } from "./apiGateway";
import { LECTURE_ACTIONS, METHOD, PROGRESS_ACTIONS } from "../page/constants";

// Define your types
interface SaveLectureRequest {
  courseId: string;
  lectureTitle: string;
  isPreviewFree: boolean;
  publicId: string; // Add assetsId
}

interface SaveLectureResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface HasLectureResponse {
  hasLectures: true;
}

// Define the type for save progress request
interface SaveProgressRequest {
  userId: string;
  courseId: string;
  lectureId: string;
  playedSeconds: number;
}

interface SaveProgressResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Define the type for get user progress request
interface GetUserProgressRequest {
  userId: string;
  courseId: string;
}

interface ProgressItem {
  lectureId: string;
  playedSeconds: number;
}

interface GetUserProgressResponse {
  lectureId: string;
  playedSeconds: number;
  progress: ProgressItem[] | undefined;
}

const lectureAPI = apiGateway.injectEndpoints({
  endpoints: (build) => ({
    // Save lecture to course mutation
    saveLectureToCourse: build.mutation<
      SaveLectureResponse,
      SaveLectureRequest
    >({
      query: ({ courseId, lectureTitle, isPreviewFree, publicId }) => {
        return {
          actionName: `${LECTURE_ACTIONS.LECTURES}/${courseId}`, // Include courseId in the URL
          methodType: METHOD.POST,
          body: { lectureTitle, isPreviewFree, publicId }, // Send JSON data
          headers: {
            "Content-Type": "application/json", // Use JSON instead of multipart/form-data
          },
        };
      },
    }),

    // Update lecture mutation
    updateLecture: build.mutation<
      SaveLectureResponse,
      {
        lectureId: string;
        lectureTitle: string;
        isPreviewFree: boolean;
        publicId: string;
      }
    >({
      query: ({ lectureId, lectureTitle, isPreviewFree, publicId }) => {
        return {
          actionName: `${LECTURE_ACTIONS.LECTURES}/${lectureId}`,
          methodType: METHOD.PUT,
          body: { lectureTitle, isPreviewFree, publicId },
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    // Delete lecture mutation
    deleteLecture: build.mutation<SaveLectureResponse, string>({
      query: (lectureId) => {
        return {
          actionName: `${LECTURE_ACTIONS.LECTURES}/${lectureId}`,
          methodType: METHOD.DELETE,
        };
      },
    }),

    // Check if course has lectures
    checkCourseHasLecture: build.query<HasLectureResponse, string>({
      query: (courseId) => {
        return {
          actionName: `${LECTURE_ACTIONS.LECTURES}/${courseId}/has-lectures`,
          methodType: METHOD.GET,
        };
      },
    }),

    // Get lectures based on courseId
    getLecturesByCourseId: build.query<{ lectures: any[] }, string>({
      query: (courseId) => {
        return {
          actionName: `${LECTURE_ACTIONS.LECTURES}/${courseId}`, // courseId
          methodType: METHOD.GET,
        };
      },
    }),

    // Save progress mutation
    saveProgress: build.mutation<SaveProgressResponse, SaveProgressRequest>({
      query: (progressData) => {
        return {
          actionName: `${PROGRESS_ACTIONS.SAVE_PROGRESS}`,
          methodType: METHOD.POST,
          body: progressData,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    // Get user progress query
    getUserProgress: build.query<
      GetUserProgressResponse,
      GetUserProgressRequest
    >({
      query: ({ userId, courseId }) => {
        return {
          actionName: `${PROGRESS_ACTIONS.SAVE_PROGRESS}/${userId}/${courseId}`,
          methodType: METHOD.GET,
        };
      },
    }),
  }),
});

export const {
  useSaveLectureToCourseMutation,
  useUpdateLectureMutation,
  useDeleteLectureMutation,
  useLazyCheckCourseHasLectureQuery,
  useLazyGetLecturesByCourseIdQuery,
  useSaveProgressMutation,
  useGetUserProgressQuery,
} = lectureAPI;
