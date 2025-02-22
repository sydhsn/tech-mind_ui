import { apiGateway } from "./apiGateway";
import { LECTURE_ACTIONS, METHOD } from "../page/constants";
import { Lecture } from "../types/AddCourse";

// Define the response interface for the video upload
interface UploadVideoResponse {
  videoUrl: string;
  publicId: string;
  duration: number;
}

// Define the request interface for the video upload
export interface UploadVideoRequest {
  video: File;
  courseId: string;
}

// Define your types
interface SaveLectureRequest {
  courseId: string;
  lectures: Lecture[]; // Adjust this type based on your actual lecture data structure
}

interface SaveLectureResponse {
  success: boolean;
  message: string;
  data?: any; // Adjust this based on your actual response structure
}

const lectureAPI = apiGateway.injectEndpoints({
  endpoints: (build) => ({
    // Upload video mutation
    uploadVideo: build.mutation<UploadVideoResponse, FormData>({
      query: (formData) => ({
        actionName: `${LECTURE_ACTIONS.LECTURES}/${formData.get(
          "courseId"
        )}/upload-video`,
        methodType: METHOD.POST,
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      }),
    }),

    // Save lecture to course mutation
    saveLectureToCourse: build.mutation<
      SaveLectureResponse,
      SaveLectureRequest
    >({
      query: ({ courseId, lectures }) => ({
        actionName: `${LECTURE_ACTIONS.LECTURES}/${courseId}`, // Include courseId in the URL
        methodType: METHOD.POST,
        body: lectures, // Send lectures in the body
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),
  }),
});

export const { useUploadVideoMutation, useSaveLectureToCourseMutation } =
  lectureAPI;
