import React, { use, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import axios from "axios";
import * as Yup from "yup";
import { Button } from "../../components/ui/button";
import CourseForm from "./CourseForm";
import LecturesForm from "./LecturesForm";
import { Upload } from "lucide-react";
import { useCreateCourseMutation } from "../../services/courseAPI";
import { useAuth } from "../../components/AuthProvider";

// Define the Lecture type
type Lecture = {
  lectureTitle: string;
  videoUrl: string;
  publicId: string;
  isPreviewFree: boolean;
  duration: number;
};

// Yup validation schema for course data
const courseSchema = Yup.object().shape({
  courseTitle: Yup.string().required("Course title is required"),
  subTitle: Yup.string().required("Subtitle is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  courseLevel: Yup.string().required("Course level is required"),
  coursePrice: Yup.number()
    .min(0, "Price cannot be negative")
    .required("Course price is required"),
  courseThumbnail: Yup.string()
    .url("Invalid URL")
    .required("Thumbnail URL is required"),
  isPublished: Yup.boolean(),
});

// Yup validation schema for lecture data
const lectureSchema = Yup.object().shape({
  lectureTitle: Yup.string().required("Lecture title is required"),
  videoUrl: Yup.string().url("Invalid URL").required("Video URL is required"),
  publicId: Yup.string().required("Public ID is required"),
  isPreviewFree: Yup.boolean(),
  duration: Yup.number()
    .min(0, "Duration cannot be negative")
    .required("Duration is required"),
});

const AddCourse = () => {
  const { user } = useAuth();
  const [courseData, setCourseData] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "Beginner",
    coursePrice: 0,
    courseThumbnail: "",
    isPublished: false,
    isPreviewFree: false,
  });

  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [courseId, setCourseId] = useState<string | null>(null);

  // apis
  const [createCourse, { error: createCourseError, data: courseResponseData }] =
    useCreateCourseMutation();

  console.log(courseResponseData);
  console.log(createCourseError);

  const handleCourseChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleLectureChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    const updatedLectures = [...lectures];
    updatedLectures[index] = {
      ...updatedLectures[index],
      [name]: type === "checkbox" ? checked : value,
    };

    setLectures(updatedLectures);
  };

  const addLecture = () => {
    setLectures([
      ...lectures,
      {
        lectureTitle: "",
        videoUrl: "",
        publicId: "",
        isPreviewFree: false,
        duration: 0,
      },
    ]);
  };

  const validateCourseData = async () => {
    console.log("Validating course data...", courseData);
    try {
      await courseSchema.validate(courseData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  const validateLectureData = async (lecture: Lecture) => {
    try {
      await lectureSchema.validate(lecture, { abortEarly: false });
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  const handleSaveCourse = async () => {
    /* const isValid = await validateCourseData();
    if (!isValid) return;
 */
    try {
      const payload = {
        ...courseData,
        userId: user?.id,
        duration: 0,
        level: courseData.courseLevel,
        price: courseData.coursePrice,
        creator: user?.id || "defaultCreatorId",
      };
      const response = await createCourse(payload);
      console.log("Course created:", response.data);
      setCourseId(response?.data?._id ?? null);
      alert("Course saved successfully! You can now add lectures.");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to save course.");
    }
  };

  console.log("Course:", courseData);

  const handleSaveLectures = async () => {
    if (!courseId) {
      alert("Please save the course first.");
      return;
    }

    const isValid = await Promise.all(lectures.map(validateLectureData));
    if (!isValid.every((valid) => valid)) return;

    try {
      await axios.put(`/api/courses/${courseId}/lectures`, { lectures });
      console.log("Lectures updated successfully!");
      alert("Lectures saved successfully!");
    } catch (error) {
      console.error("Error updating lectures:", error);
      alert("Failed to save lectures.");
    }
  };

  const handlePublishCourse = async () => {
    if (!courseId || lectures.length === 0) {
      alert(
        "Please save the course and add at least one lecture before publishing."
      );
      return;
    }

    try {
      await axios.patch(`/api/courses/${courseId}/publish`, {
        isPublished: true,
      });
      alert("Course published successfully!");
    } catch (error) {
      console.error("Error publishing course:", error);
      alert("Failed to publish course.");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="w-full bg-gray-800 backdrop-blur-md rounded-lg">
        <div className="flex justify-end items-center mb-4">
          <Button
            variant="outline"
            onClick={handlePublishCourse}
            className="border-white text-white hover:bg-gray-700 cursor-pointer flex items-center gap-2"
            disabled={!courseId || lectures.length === 0}
          >
            <Upload className="w-5 h-5" /> {/* Publish Course Icon */}
            Publish Course
          </Button>
        </div>

        <Tabs.Root defaultValue="course" className="space-y-4">
          <Tabs.List className="flex border-b border-gray-200">
            <Tabs.Trigger
              value="course"
              className="px-4 cursor-pointer py-2 text-sm font-medium text-white hover:text-blue-500 data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 focus:outline-none"
            >
              Course Details
            </Tabs.Trigger>
            <Tabs.Trigger
              value="lectures"
              className="px-4 cursor-pointer py-2 text-sm font-medium text-white hover:text-blue-500 focus:outline-none data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              Lectures
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="course" className="space-y-4">
            <h2 className="text-xl font-semibold">Course Details</h2>
            <CourseForm
              courseData={courseData}
              errors={errors}
              handleCourseChange={handleCourseChange}
              handleSaveCourse={handleSaveCourse}
            />
          </Tabs.Content>

          <Tabs.Content value="lectures" className="space-y-4">
            <LecturesForm
              lectures={lectures}
              errors={errors}
              handleLectureChange={handleLectureChange}
              addLecture={addLecture}
              handleSaveLectures={handleSaveLectures}
            />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default AddCourse;
