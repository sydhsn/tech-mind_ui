import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSaveLectureToCourseMutation } from "../../../../services/leactureAPI";
import { Button } from "../../../../components/ui/button";

interface LectureTabProps {
  courseId: string | null;
}

interface LectureFormData {
  lectureTitle: string;
  isPreviewFree: boolean;
  publicId: string; // Replaced assetsId with publicId
}

const lectureSchema = yup.object().shape({
  lectureTitle: yup.string().required("Lecture Title is required"),
  isPreviewFree: yup.boolean().default(false),
  publicId: yup.string().required("Public ID is required"), // Validate publicId
});

const LectureTab: React.FC<LectureTabProps> = ({ courseId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<LectureFormData>({
    resolver: yupResolver<LectureFormData>(lectureSchema),
    defaultValues: {
      lectureTitle: "",
      isPreviewFree: false,
      publicId: "", // Initialize publicId
    },
    mode: "onChange",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [saveLectures] = useSaveLectureToCourseMutation();

  const onSubmit: SubmitHandler<LectureFormData> = async (data) => {
    if (!data.publicId) {
      toast.error("Please upload a video and provide the Public ID.");
      return;
    }

    try {
      setIsUploading(true);
      await saveLectures({
        courseId: courseId ?? "",
        lectureTitle: data.lectureTitle.trim(),
        isPreviewFree: data.isPreviewFree,
        publicId: data.publicId, // Pass publicId to the API
      }).unwrap();
      setIsUploading(false);
      handleReset();
      toast.success("Lecture saved successfully!");
    } catch (error) {
      console.error("Error saving lecture:", error);
      toast.error("Failed to save lecture. Please try again.");
    }
  };

  const handleReset = () => {
    setValue("lectureTitle", "");
    setValue("isPreviewFree", false);
    setValue("publicId", "");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Lectures</h2>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleReset}
      >
        {/* Lecture Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Lecture Title
          </label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter lecture title"
            {...register("lectureTitle")}
          />
          {errors.lectureTitle && (
            <p className="text-red-500 text-sm">
              {errors.lectureTitle.message}
            </p>
          )}
        </div>

        {/* Public ID Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Public ID (from Cloudinary)
          </label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter Public ID (e.g., lecture_videos/your-video-id)"
            {...register("publicId")}
          />
          {errors.publicId && (
            <p className="text-red-500 text-sm">{errors.publicId.message}</p>
          )}
        </div>

        {/* Free Preview Toggle */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" {...register("isPreviewFree")} />
          <label className="text-sm font-medium text-white">Free Preview</label>
        </div>

        {/* Save Lecture Button */}
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={!isValid || isUploading}
        >
          {isUploading ? "Saving..." : "Save Lecture"}
        </Button>
      </form>
    </div>
  );
};

export default LectureTab;
