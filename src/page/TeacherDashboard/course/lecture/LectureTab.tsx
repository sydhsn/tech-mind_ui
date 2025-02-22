import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  useSaveLectureToCourseMutation,
  useUploadVideoMutation,
} from "../../../../services/leactureAPI";

interface LectureTabProps {
  courseId?: string | null;
}

interface LectureFormData {
  lectureTitle: string;
  videoInfo: {
    videoUrl: string;
    publicId: string;
  };
  duration: number;
  isPreviewFree: boolean;
}

const lectureSchema = yup.object().shape({
  lectureTitle: yup.string().required("Lecture Title is required"),
  videoInfo: yup.object().shape({
    videoUrl: yup.string().required("Video File is required"),
    publicId: yup.string().required("Public ID is required"),
  }),
  duration: yup.number().required("Duration is required").min(0),
  isPreviewFree: yup
    .boolean()
    .default(false)
    .required("Free Preview is required"),
});

const LectureTab: React.FC<LectureTabProps> = ({ courseId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LectureFormData>({
    resolver: yupResolver(lectureSchema),
  });

  const [uploadVideo] = useUploadVideoMutation();
  const [isUploading, setIsUploading] = useState(false);
  const [saveLectures] = useSaveLectureToCourseMutation();

  const handleVideoUpload = async (file: File) => {
    if (!courseId || !file) {
      toast.error("Course ID or file is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("courseId", courseId);

    setIsUploading(true);

    try {
      const response = await uploadVideo(formData).unwrap();
      const { videoUrl, publicId, duration } = response;

      setValue("videoInfo.videoUrl", videoUrl);
      setValue("videoInfo.publicId", publicId);
      setValue("duration", duration);

      toast.success("Video uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload video:", error);
      toast.error("Failed to upload video. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleVideoUpload(file);
    }
  };

  const onSubmit: SubmitHandler<LectureFormData> = async (data) => {
    if (!courseId) {
      toast.error("Course ID is missing.");
      return;
    }

    // Construct the payload as a single object
    const payload = {
      lectureTitle: data.lectureTitle,
      videoFile: data.videoInfo.videoUrl, // Add this line
      publicId: data.videoInfo.publicId,
      duration: data.duration,
      isPreviewFree: data.isPreviewFree,
    };

    console.log("Form data being submitted:", payload); // Log the payload

    try {
      // Send a single object
      await saveLectures({ courseId, lectures: [payload] }).unwrap();
      toast.success("Lecture saved successfully!");
    } catch (error) {
      console.error("Error saving lecture:", error);
      toast.error("Failed to save lecture. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Lectures</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Lecture Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Lecture Title
          </label>
          <input
            type="text"
            {...register("lectureTitle")}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter lecture title"
          />
          {errors.lectureTitle && (
            <p className="text-red-500 text-sm">
              {errors.lectureTitle.message}
            </p>
          )}
        </div>

        {/* Video File */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Video File
          </label>
          <input
            type="file"
            {...register("videoInfo.videoUrl", {
              required: "Video file is required",
            })}
            onChange={handleFileChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
            accept="video/*"
            disabled={isUploading}
          />
          {errors.videoInfo?.videoUrl && (
            <p className="text-red-500 text-sm">
              {errors.videoInfo?.videoUrl.message}
            </p>
          )}
          {isUploading && (
            <p className="text-blue-500 text-sm">Uploading video...</p>
          )}
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Duration (seconds)
          </label>
          <input
            type="number"
            {...register("duration")}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter duration"
            disabled
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )}
        </div>

        {/* Public ID */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Public ID
          </label>
          <input
            type="text"
            {...register("videoInfo.publicId")}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter public ID"
            disabled
          />
          {errors.videoInfo?.publicId && (
            <p className="text-red-500 text-sm">
              {errors.videoInfo?.publicId.message}
            </p>
          )}
        </div>

        {/* Free Preview */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Free Preview
          </label>
          <input
            type="checkbox"
            {...register("isPreviewFree")}
            className="w-4 h-4"
          />
          {errors.isPreviewFree && (
            <p className="text-red-500 text-sm">
              {errors.isPreviewFree.message}
            </p>
          )}
        </div>

        {/* Save Lecture Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isUploading}
        >
          Save Lecture
        </button>
      </form>
    </div>
  );
};

export default LectureTab;
