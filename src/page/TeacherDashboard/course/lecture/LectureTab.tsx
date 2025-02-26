import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSaveLectureToCourseMutation } from "../../../../services/leactureAPI";

interface LectureTabProps {
  courseId: string | null;
}

interface LectureFormData {
  lectureTitle: string;
  isPreviewFree: boolean;
  videoFile?: any;
}

const lectureSchema = yup.object().shape({
  lectureTitle: yup.string().required("Lecture Title is required"),
  isPreviewFree: yup.boolean().default(false),
  videoFile: yup
    .mixed()
    .nullable()
    .test("file-or-undefined", "Video File is required", (value) => {
      return value === undefined || value instanceof File;
    })
    .required("Video File is required"),
});

const LectureTab: React.FC<LectureTabProps> = ({ courseId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LectureFormData>({
    resolver: yupResolver<LectureFormData>(lectureSchema),
    defaultValues: {
      lectureTitle: "",
      isPreviewFree: false,
      videoFile: undefined,
    },
  });

  const [isUploading, setIsUploading] = useState(false);
  const [saveLectures] = useSaveLectureToCourseMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log("Selected File:", file);
      setValue("videoFile", file, { shouldValidate: true }); // Store File object
    }
  };

  const onSubmit: SubmitHandler<LectureFormData> = async (data) => {
    if (!data.videoFile) {
      toast.error("Please upload a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("lectureTitle", data.lectureTitle.trim()); // Correct key
    formData.append("isPreviewFree", String(data.isPreviewFree)); // Convert boolean to string
    formData.append("videoFile", data.videoFile); // Append the file directly

    console.log("Submitting FormData:");

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      await saveLectures({
        courseId: courseId ?? "",
        formData, // Send FormData directly
      }).unwrap();
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

        {/* Video Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Upload Video
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
            accept="video/*"
            disabled={isUploading}
          />
        </div>

        {/* Free Preview Toggle */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" {...register("isPreviewFree")} />
          <label className="text-sm font-medium text-white">Free Preview</label>
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
