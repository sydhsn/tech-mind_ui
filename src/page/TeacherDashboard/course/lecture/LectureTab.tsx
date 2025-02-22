import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
/* import { useSaveLecturesMutation } from "../../services/courseAPI"; */

interface LectureTabProps {
  courseId?: string | null;
}

// Yup validation schema for lectures
const lectureSchema = yup.object().shape({
  lectureTitle: yup.string().required("Lecture Title is required"),
  videoFile: yup.mixed().required("Video File is required"),
  duration: yup.number().required("Duration is required").min(0),
  publicId: yup.string().required("Public ID is required"),
  isPreviewFree: yup.boolean().required("Free Preview is required"),
});

const LectureTab: React.FC<LectureTabProps> = ({ courseId }) => {
  //const [saveLectures] = useSaveLecturesMutation();
  console.log(courseId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(lectureSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      console.log(data);
      //await saveLectures({ courseId, lectures: [data] }).unwrap();
      toast.success("Lecture saved successfully!");
    } catch (error) {
      toast.error("Failed to save lecture. Please try again.");
      console.error("Error saving lecture:", error);
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
            {...register("videoFile")}
            className="w-full p-2 bg-gray-700 text-white rounded"
            accept="video/*"
          />
          {errors.videoFile && (
            <p className="text-red-500 text-sm">{errors.videoFile.message}</p>
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
            {...register("publicId")}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter public ID"
          />
          {errors.publicId && (
            <p className="text-red-500 text-sm">{errors.publicId.message}</p>
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
        >
          Save Lecture
        </button>
      </form>
    </div>
  );
};

export default LectureTab;
