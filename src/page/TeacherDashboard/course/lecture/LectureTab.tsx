import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  useSaveLectureToCourseMutation,
  useLazyGetLecturesByCourseIdQuery,
  useUpdateLectureMutation,
  useDeleteLectureMutation,
} from "../../../../services/leactureAPI";
import LectureForm from "./LectureForm";
import LectureList from "./LectureList";

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
  publicId?: string;
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
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null); // Store selected lecture
  const [saveLectures] = useSaveLectureToCourseMutation();
  const [updateLecture] = useUpdateLectureMutation();
  const [deleteLecture] = useDeleteLectureMutation();
  const [fetchLectures, { data: lectures, isLoading: isLecturesLoading }] =
    useLazyGetLecturesByCourseIdQuery();

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
        await updateLecture({
          lectureId: editLectureId,
          lectureTitle: data.lectureTitle.trim(),
          isPreviewFree: data.isPreviewFree,
          publicId: data.publicId,
        }).unwrap();
        toast.success("Lecture updated successfully!");
      } else {
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
        fetchLectures(courseId);
      }
    } catch (error) {
      console.error("Error saving/updating lecture:", error);
      toast.error("Failed to save/update lecture. Please try again.");
    }
  };

  const handleEditLecture = (lecture: Lecture) => {
    setSelectedLecture(lecture); // Set selected lecture
    setEditLectureId(lecture._id);
    setValue("lectureTitle", lecture.lectureTitle);
    setValue("isPreviewFree", lecture.isPreviewFree);
    setValue("publicId", lecture.publicId ?? "");
  };

  const handleDeleteLecture = async (lectureId: string) => {
    try {
      await deleteLecture(lectureId).unwrap();
      toast.success("Lecture deleted successfully!");
      if (courseId) {
        fetchLectures(courseId);
      }
    } catch (error) {
      console.error("Error deleting lecture:", error);
      toast.error("Failed to delete lecture. Please try again.");
    }
  };

  const handleReset = () => {
    reset();
    setEditLectureId(null);
    setSelectedLecture(null); // Reset selected lecture
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Lectures</h2>
      <LectureForm
        onSubmit={onSubmit}
        onReset={handleReset}
        isUploading={isUploading}
        editLectureId={editLectureId}
        register={register}
        errors={errors}
        isValid={isValid}
        handleSubmit={handleSubmit}
        defaultValues={
          editLectureId && selectedLecture
            ? {
                lectureTitle: selectedLecture.lectureTitle,
                publicId: selectedLecture.publicId ?? "", // Ensure publicId is mapped
                isPreviewFree: selectedLecture.isPreviewFree,
              }
            : undefined
        }
      />
      <LectureList
        lectures={lectures?.lectures || []}
        isLecturesLoading={isLecturesLoading}
        onEditLecture={handleEditLecture}
        onDeleteLecture={handleDeleteLecture}
      />
    </div>
  );
};

export default LectureTab;
