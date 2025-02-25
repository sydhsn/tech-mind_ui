import { apiGateway } from "./apiGateway";
import { LECTURE_ACTIONS, METHOD } from "../page/constants";

// Define the response interface for the video upload
interface UploadVideoResponse {
  videoUrl: string;
}

// Define the request interface for the video upload
export interface UploadVideoRequest {
  video: File;
  courseId: string;
}

interface CreateLecture {
  lectureTitle: string; // Ensure it's always a string,
  videoFile: string;
  isPreviewFree: boolean;
}
// Define your types
interface SaveLectureRequest {
  courseId: string;
  lectures: CreateLecture[]; // Adjust this type based on your actual lecture data structure
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
      query: ({ courseId, lectures }) => {
        console.log("Sending request data:", JSON.stringify({ lectures }));

        return {
          actionName: `${LECTURE_ACTIONS.LECTURES}/${courseId}`, // Include courseId in the URL
          methodType: METHOD.POST,
          body: lectures,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        };
      },
    }),
  }),
});

export const { useUploadVideoMutation, useSaveLectureToCourseMutation } =
  lectureAPI;
