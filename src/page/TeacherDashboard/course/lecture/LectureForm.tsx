import React from "react";
import { SubmitHandler, UseFormRegister, FieldErrors } from "react-hook-form";
import { Button } from "../../../../components/ui/button";

interface LectureFormData {
  lectureTitle: string;
  isPreviewFree: boolean;
  publicId: string;
}

interface LectureFormProps {
  onSubmit: SubmitHandler<LectureFormData>;
  onReset: () => void;
  isUploading: boolean;
  editLectureId: string | null;
  register: UseFormRegister<LectureFormData>;
  errors: FieldErrors<LectureFormData>;
  isValid: boolean;
  handleSubmit: (
    onSubmit: SubmitHandler<LectureFormData>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  defaultValues?: LectureFormData; // Add defaultValues prop
}

const LectureForm: React.FC<LectureFormProps> = ({
  onSubmit,
  onReset,
  isUploading,
  editLectureId,
  register,
  errors,
  handleSubmit,
  defaultValues, // Use defaultValues prop
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">
        {editLectureId ? "Edit Lecture" : "Add New Lecture"}
      </h3>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Lecture Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Lecture Title
          </label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter lecture title"
            defaultValue={defaultValues?.lectureTitle} // Pre-fill with default value
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
            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Public ID (e.g., lecture_videos/your-video-id)"
            defaultValue={defaultValues?.publicId} // Pre-fill with default value
            {...register("publicId")}
          />
          {errors.publicId && (
            <p className="text-red-500 text-sm">{errors.publicId.message}</p>
          )}
        </div>

        {/* Free Preview Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
            defaultChecked={defaultValues?.isPreviewFree} // Pre-fill with default value
            {...register("isPreviewFree")}
          />
          <label className="text-sm font-medium text-white">Free Preview</label>
        </div>

        {/* Save/Update Lecture Button */}
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isUploading}
        >
          {isUploading
            ? "Saving..."
            : editLectureId
            ? "Update Lecture"
            : "Save Lecture"}
        </Button>

        {/* Reset Form Button */}
        {editLectureId && (
          <Button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-2"
            onClick={onReset}
          >
            Cancel
          </Button>
        )}
      </form>
    </div>
  );
};

export default LectureForm;
