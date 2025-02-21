import React, { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Button } from "../../components/ui/button";
import { PlusCircle, Save, Upload } from "lucide-react";
import {
  ICourse,
  useCreateCourseMutation,
  useLazyFindCourseByIdQuery,
  //useUpdateCourseMutation,
} from "../../services/courseAPI";
import { useAuth } from "../../components/AuthProvider";
import InputField from "../../components/ui/InputField";
import CheckboxField from "../../components/ui/CheckboxField";
import SelectField from "../../components/ui/SelectField";

interface AddCourseProps {
  id?: string;
}

// Define the Lecture type
type Lecture = {
  lectureTitle: string;
  videoUrl: string;
  publicId: string;
  isPreviewFree: boolean;
  duration: number;
};

const AddCourse = ({ id }: AddCourseProps) => {
  const { user } = useAuth();
  const [courseData, setCourseData] = useState<ICourse>({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "Beginner",
    coursePrice: 0,
    courseThumbnail: "",
    userId: user?.id ?? "",
    duration: 0,
    creator: user?.id ?? "",
  });

  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [errors] = useState<{ [key: string]: string }>({});
  const [courseId, setCourseId] = useState<string | null>(null);

  // APIs
  const [createCourse, { error: createCourseError }] =
    useCreateCourseMutation();
  //console.log("createCourseError", createCourseError);
  /*  const [updateCourse, { error: updateCourseError }] =
    useUpdateCourseMutation(); */

  //console.log("updateCourseError", updateCourseError);

  // Find course by ID
  const [
    findCourseById,
    {
      data: courseByIdData,
      error: findCourseByIdError,
      isSuccess: courseDataByIdSuccess,
    },
  ] = useLazyFindCourseByIdQuery();

  //console.log("findCourseByIdError", findCourseByIdError);

  // Handle course change
  const handleCourseChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle lecture change
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

  // Add a new lecture
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

  // Save or update course
  const handleSaveCourse = async () => {
    try {
      if (id) {
        // Update existing course
        //const response = await updateCourse({ id, ...courseData }).unwrap();
        //console.log("Course updated successfully!", response);
        //setCourseId(response?._id ?? null);
        alert("Course updated successfully!");
      } else {
        // Create new course
        const response = await createCourse(courseData).unwrap();
        console.log("Course saved successfully!", response);
        setCourseId(response?._id ?? null);
        alert("Course saved successfully! You can now add lectures.");
      }
    } catch (error) {
      console.error("Error saving/updating course:", error);
      alert("Failed to save/update course.");
    }
  };

  // Save lectures
  const handleSaveLectures = async () => {
    if (!courseId) {
      alert("Please save the course first.");
      return;
    }

    try {
      console.log("Lectures updated successfully!");
      alert("Lectures saved successfully!");
    } catch (error) {
      console.error("Error updating lectures:", error);
      alert("Failed to save lectures.");
    }
  };

  // Fetch course data if ID exists
  useEffect(() => {
    if (id) {
      findCourseById(id);
    }
  }, [id]);

  // Populate course data if fetched successfully
  useEffect(() => {
    if (courseDataByIdSuccess && courseByIdData) {
      setCourseData({
        ...courseByIdData,
        userId: user?.id ?? "",
        creator: user?.id ?? "",
      });
      setLectures([]);
    }
  }, [courseDataByIdSuccess, courseByIdData]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="w-full bg-gray-800 backdrop-blur-md rounded-lg">
        <div className="flex justify-end items-center mb-4">
          <Button
            variant="outline"
            onClick={() => alert("Publish course")}
            type="button"
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
            <h2 className="text-xl font-semibold">
              {id ? "Edit Course" : "Add Course"}
            </h2>
            <form className="space-y-4">
              <InputField
                label="Course Title"
                name="courseTitle"
                value={courseData.courseTitle ?? ""}
                onChange={handleCourseChange}
                error={errors.courseTitle}
                required
              />
              <InputField
                label="Subtitle"
                name="subTitle"
                value={courseData.subTitle ?? ""}
                onChange={handleCourseChange}
                error={errors.subTitle}
                required
              />
              <InputField
                label="Description"
                name="description"
                value={courseData.description ?? ""}
                onChange={handleCourseChange}
                type="textarea"
                error={errors.description}
                required
              />
              <SelectField
                label="Category"
                name="category"
                value={courseData.category ?? ""}
                onChange={handleCourseChange}
                options={[
                  { value: "Programming", label: "Programming" },
                  { value: "Design", label: "Design" },
                  { value: "Marketing", label: "Marketing" },
                  { value: "Business", label: "Business" },
                  { value: "Photography", label: "Photography" },
                  { value: "Music", label: "Music" },
                  { value: "Health & Fitness", label: "Health & Fitness" },
                  {
                    value: "Personal Development",
                    label: "Personal Development",
                  },
                  { value: "Language", label: "Language" },
                ]}
                error={errors.category}
                required
              />
              <SelectField
                label="Level"
                name="courseLevel"
                value={courseData.courseLevel ?? "Beginner"}
                onChange={handleCourseChange}
                options={[
                  { value: "Beginner", label: "Beginner" },
                  { value: "Medium", label: "Medium" },
                  { value: "Advance", label: "Advance" },
                ]}
                error={errors.courseLevel}
                required
              />
              <InputField
                label="Price"
                name="coursePrice"
                value={courseData.coursePrice ?? ""}
                onChange={handleCourseChange}
                type="number"
                error={errors.coursePrice}
                required
              />
              <InputField
                label="Thumbnail URL"
                name="courseThumbnail"
                value={courseData.courseThumbnail ?? ""}
                onChange={handleCourseChange}
                error={errors.courseThumbnail}
                required
              />
              <Button
                variant="outline"
                onClick={handleSaveCourse}
                type="button"
                className="border-white text-white hover:bg-gray-700 cursor-pointer flex items-center gap-2"
              >
                <Save className="w-5 h-5" /> {/* Save Icon */}
                {id ? "Update Course" : "Save Course"}
              </Button>
            </form>
          </Tabs.Content>

          <Tabs.Content value="lectures" className="space-y-4">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Lectures</h2>
              {lectures.map((lecture, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-lg">
                  <InputField
                    label="Lecture Title"
                    name="lectureTitle"
                    value={lecture.lectureTitle}
                    onChange={(e) => handleLectureChange(index, e)}
                    error={errors[`lectures[${index}].lectureTitle`]}
                  />
                  <InputField
                    label="Video URL"
                    name="videoUrl"
                    value={lecture.videoUrl}
                    onChange={(e) => handleLectureChange(index, e)}
                    error={errors[`lectures[${index}].videoUrl`]}
                  />
                  <InputField
                    label="Public ID"
                    name="publicId"
                    value={lecture.publicId}
                    onChange={(e) => handleLectureChange(index, e)}
                    error={errors[`lectures[${index}].publicId`]}
                  />
                  <InputField
                    label="Duration (in minutes)"
                    name="duration"
                    value={lecture.duration}
                    onChange={(e) => handleLectureChange(index, e)}
                    type="number"
                    error={errors[`lectures[${index}].duration`]}
                  />
                  <CheckboxField
                    label="Free Preview"
                    name="isPreviewFree"
                    checked={lecture.isPreviewFree}
                    onChange={(e) => handleLectureChange(index, e)}
                  />
                </div>
              ))}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={addLecture}
                  className="border-white text-white hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" /> {/* Add Lecture Icon */}
                  Add Lecture
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSaveLectures}
                  className="border-white text-white hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-5 h-5" /> {/* Save Lectures Icon */}
                  Save Lectures
                </Button>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default AddCourse;
