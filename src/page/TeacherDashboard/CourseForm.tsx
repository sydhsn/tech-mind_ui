import React from "react";
import { Button } from "../../components/ui/button";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import { Save } from "lucide-react"; // Import the Save icon

type Course = {
  courseTitle: string;
  subTitle: string;
  description: string;
  category: string;
  courseLevel: string;
  coursePrice: number;
  courseThumbnail: string;
};

const CourseForm = ({
  courseData,
  errors,
  handleCourseChange,
  handleSaveCourse,
}: {
  courseData: Course;
  errors: { [key: string]: string };
  handleCourseChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSaveCourse: () => void;
}) => (
  <form className="space-y-4">
    <InputField
      label="Course Title"
      name="courseTitle"
      value={courseData.courseTitle}
      onChange={handleCourseChange}
      error={errors.courseTitle}
      required
    />
    <InputField
      label="Subtitle"
      name="subTitle"
      value={courseData.subTitle}
      onChange={handleCourseChange}
      error={errors.subTitle}
      required
    />
    <InputField
      label="Description"
      name="description"
      value={courseData.description}
      onChange={handleCourseChange}
      type="textarea"
      error={errors.description}
      required
    />
    <SelectField
      label="Category"
      name="category"
      value={courseData.category}
      onChange={handleCourseChange}
      options={[
        { value: "Programming", label: "Programming" },
        { value: "Design", label: "Design" },
        { value: "Marketing", label: "Marketing" },
        { value: "Business", label: "Business" },
        { value: "Photography", label: "Photography" },
        { value: "Music", label: "Music" },
        { value: "Health & Fitness", label: "Health & Fitness" },
        { value: "Personal Development", label: "Personal Development" },
        { value: "Language", label: "Language" },
      ]}
      error={errors.category}
      required
    />
    <SelectField
      label="Level"
      name="courseLevel"
      value={courseData.courseLevel}
      onChange={handleCourseChange}
      options={[
        { value: "Beginner", label: "Beginner" },
        { value: "Intermediate", label: "Intermediate" },
        { value: "Advanced", label: "Advanced" },
      ]}
      error={errors.courseLevel}
      required
    />
    <InputField
      label="Price"
      name="coursePrice"
      value={courseData.coursePrice}
      onChange={handleCourseChange}
      type="number"
      error={errors.coursePrice}
      required
    />
    <InputField
      label="Thumbnail URL"
      name="courseThumbnail"
      value={courseData.courseThumbnail}
      onChange={handleCourseChange}
      error={errors.courseThumbnail}
      required
    />
    <Button
      variant="outline"
      onClick={handleSaveCourse}
      className="border-white text-white hover:bg-gray-700 cursor-pointer flex items-center gap-2"
    >
      <Save className="w-5 h-5" /> {/* Save Icon */}
      Save Course
    </Button>
  </form>
);

export default CourseForm;
