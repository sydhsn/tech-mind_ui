import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useAuth } from "../../../components/AuthProvider";

interface CourseTabProps {
  courseId?: string;
  onSaveCourse: (courseData: any) => void;
}

// Yup validation schema
const courseSchema = yup.object().shape({
  courseTitle: yup.string().required("Course Title is required"),
  subTitle: yup.string().required("Subtitle is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  courseLevel: yup.string().required("Level is required"),
  coursePrice: yup.number().required("Price is required").min(0),
  courseThumbnail: yup.string().required("Thumbnail is required"),
});

const CourseTab: React.FC<CourseTabProps> = ({ courseId, onSaveCourse }) => {
  const { user } = useAuth();
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(!!courseId);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courseSchema),
  });

  // Fetch course data if editing
  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}courses/${courseId}`
          );
          const courseData = response.data;

          // Populate form fields with existing data
          setValue("courseTitle", courseData.courseTitle);
          setValue("subTitle", courseData.subTitle);
          setValue("description", courseData.description);
          setValue("category", courseData.category);
          setValue("courseLevel", courseData.courseLevel);
          setValue("coursePrice", courseData.coursePrice);
          setValue("courseThumbnail", courseData.courseThumbnail);
          setThumbnailUrl(courseData.courseThumbnail);
        } catch (error) {
          console.error("Failed to fetch course data:", error);
        }
      };
      fetchCourse();
    }
  }, [courseId, setValue]);

  const onSubmit: SubmitHandler<any> = (data) => {
    // Include the uploaded thumbnail URL in the form data
    data.courseThumbnail = thumbnailUrl;
    data.creator = user?.id;
    onSaveCourse(data); // Call the save/update course handler
  };

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}courses/upload-thumbnail`,
          formData
        );

        // Store the uploaded URL
        setThumbnailUrl(response.data.secure_url);
        setValue("courseThumbnail", response.data.secure_url); // Update form value
        trigger("courseThumbnail"); // Revalidate the field
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        {isEditing ? "Edit Course" : "Add Course"}
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Course Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Course Title
          </label>
          <input
            type="text"
            {...register("courseTitle")}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter course title"
          />
          {errors.courseTitle && (
            <p className="text-red-500 text-sm">{errors.courseTitle.message}</p>
          )}
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Subtitle
          </label>
          <input
            type="text"
            {...register("subTitle")}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter subtitle"
          />
          {errors.subTitle && (
            <p className="text-red-500 text-sm">{errors.subTitle.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Category
          </label>
          <select
            {...register("category")}
            className="w-full p-2 bg-gray-700 text-white rounded"
          >
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Business">Business</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Level */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Level</label>
          <select
            {...register("courseLevel")}
            className="w-full p-2 bg-gray-700 text-white rounded"
          >
            <option value="Beginner">Beginner</option>
            <option value="Medium">Medium</option>
            <option value="Advance">Advance</option>
          </select>
          {errors.courseLevel && (
            <p className="text-red-500 text-sm">{errors.courseLevel.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Price</label>
          <input
            type="number"
            {...register("coursePrice")}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter price"
          />
          {errors.coursePrice && (
            <p className="text-red-500 text-sm">{errors.coursePrice.message}</p>
          )}
        </div>

        {/* Thumbnail File Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Thumbnail
          </label>
          <input
            type="file"
            className="w-full p-2 bg-gray-700 text-white rounded"
            onChange={handleThumbnailUpload}
            accept="image/*"
          />
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="Thumbnail Preview"
              className="w-32 h-32 object-cover rounded mt-2"
            />
          )}
          {!thumbnailUrl && errors.courseThumbnail && (
            <p className="text-red-500 text-sm">
              {errors.courseThumbnail.message}
            </p>
          )}
        </div>

        {/* Save/Update Course Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Course" : "Save Course"}
        </button>
      </form>
    </div>
  );
};

export default CourseTab;
