import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  useSaveLectureToCourseMutation,
  useLazyGetLecturesByCourseIdQuery,
  //useUpdateLectureMutation,
  //useDeleteLectureMutation,
} from "../../../../services/leactureAPI";
import { Button } from "../../../../components/ui/button";

interface LectureTabProps {
  courseId: string | null;
}

interface LectureFormData {
  lectureTitle: string;
  isPreviewFree: boolean;
  publicId: string;
}

interface Lecture {
  _id: string;
  lectureTitle: string;
  isPreviewFree: boolean;
  publicId: string;
}

const lectureSchema = yup.object().shape({
  lectureTitle: yup.string().required("Lecture Title is required"),
  isPreviewFree: yup.boolean().default(false),
  publicId: yup.string().required("Public ID is required"),
});

const LectureTab: React.FC<LectureTabProps> = ({ courseId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<LectureFormData>({
    resolver: yupResolver<LectureFormData>(lectureSchema),
    defaultValues: {
      lectureTitle: "",
      isPreviewFree: false,
      publicId: "",
    },
    mode: "onChange",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [editLectureId, setEditLectureId] = useState<string | null>(null);
  const [saveLectures] = useSaveLectureToCourseMutation();
  //const [updateLecture] = useUpdateLectureMutation();
  //const [deleteLecture] = useDeleteLectureMutation();
  const [fetchLectures, { data: lectures, isLoading: isLecturesLoading }] =
    useLazyGetLecturesByCourseIdQuery();

  // Fetch existing lectures when the component mounts or courseId changes
  useEffect(() => {
    if (courseId) {
      fetchLectures(courseId);
    }
  }, [courseId, fetchLectures]);

  const onSubmit: SubmitHandler<LectureFormData> = async (data) => {
    if (!data.publicId) {
      toast.error("Please upload a video and provide the Public ID.");
      return;
    }

    try {
      setIsUploading(true);
      if (editLectureId) {
        // Update existing lecture
        /* await updateLecture({
          lectureId: editLectureId,
          lectureTitle: data.lectureTitle.trim(),
          isPreviewFree: data.isPreviewFree,
          publicId: data.publicId,
        }).unwrap(); */
        toast.success("Lecture updated successfully!");
      } else {
        // Save new lecture
        await saveLectures({
          courseId: courseId ?? "",
          lectureTitle: data.lectureTitle.trim(),
          isPreviewFree: data.isPreviewFree,
          publicId: data.publicId,
        }).unwrap();
        toast.success("Lecture saved successfully!");
      }
      setIsUploading(false);
      handleReset();
      if (courseId) {
        fetchLectures(courseId); // Refetch lectures
      }
    } catch (error) {
      console.error("Error saving/updating lecture:", error);
      toast.error("Failed to save/update lecture. Please try again.");
    }
  };

  const handleEditLecture = (lecture: Lecture) => {
    setValue("lectureTitle", lecture.lectureTitle);
    setValue("isPreviewFree", lecture.isPreviewFree);
    setValue("publicId", lecture.publicId);
    setEditLectureId(lecture._id);
  };

  const handleDeleteLecture = async (lectureId: string) => {
    try {
      //await deleteLecture(lectureId).unwrap();
      toast.success("Lecture deleted successfully!");
      if (courseId) {
        fetchLectures(courseId); // Refetch lectures
      }
    } catch (error) {
      console.error("Error deleting lecture:", error);
      toast.error("Failed to delete lecture. Please try again.");
    }
  };

  const handleReset = () => {
    reset();
    setEditLectureId(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Lectures</h2>

      {/* Existing Lectures */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4">
          Existing Lectures
        </h3>
        {isLecturesLoading ? (
          <div className="text-center text-white">Loading lectures...</div>
        ) : lectures && lectures?.lectures?.length > 0 ? (
          <ul className="space-y-4">
            {lectures?.lectures?.map((lecture: Lecture) => (
              <li
                key={lecture._id}
                className="p-4 bg-gray-700 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h4 className="text-lg font-medium text-white">
                    {lecture.lectureTitle}
                  </h4>
                  <p className="text-sm text-gray-400">
                    Public ID: {lecture.publicId}
                  </p>
                  <span
                    className={`text-sm ${
                      lecture.isPreviewFree ? "text-green-500" : "text-gray-400"
                    }`}
                  >
                    {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleEditLecture(lecture)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteLecture(lecture._id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No lectures found for this course.</p>
        )}
      </div>

      {/* Add/Edit Lecture Form */}
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
              {...register("isPreviewFree")}
            />
            <label className="text-sm font-medium text-white">
              Free Preview
            </label>
          </div>

          {/* Save/Update Lecture Button */}
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={!isValid || isUploading}
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
              onClick={handleReset}
            >
              Cancel
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LectureTab;
