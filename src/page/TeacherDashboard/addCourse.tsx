import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "../../services/courseAPI";
import LectureTab from "./course/lecture/LectureTab";
import CourseTab from "./course/CourseTab";
import { useAuth } from "../../components/AuthProvider";

interface AddCourseProps {
  id?: string | null;
}

const AddCourse: React.FC<AddCourseProps> = ({ id }) => {
  const { user } = useAuth();
  const [courseId, setCourseId] = useState<string | null>(id || null);
  const [activeTab, setActiveTab] = useState<"course" | "lectures">(
    id ? "course" : "course" // Default to "course" tab
  );

  const [createCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();

  // Handle saving or updating the course
  const handleSaveCourse = async (courseData: any) => {
    try {
      if (courseId) {
        // Update existing course
        const response = await updateCourse({
          id: courseId,
          course: {
            ...courseData,
            creator: user?.id,
          },
        }).unwrap();
        toast.success("Course updated successfully!");
      } else {
        // Create new course
        const response = await createCourse(courseData).unwrap();
        setCourseId(response?._id ?? ""); // Set the course ID after saving
        setActiveTab("lectures"); // Switch to the Lecture Tab
        toast.success("Course saved successfully!");
      }
    } catch (error) {
      toast.error("Failed to save/update course. Please try again.");
    }
  };

  // Set the active tab to "course" if editing an existing course
  useEffect(() => {
    if (id) {
      setActiveTab("course");
    }
  }, [id]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      {/* Tabs for Course and Lectures */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "course"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => setActiveTab("course")}
        >
          Course Details
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "lectures"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => setActiveTab("lectures")}
          disabled={!courseId} // Disable Lecture Tab if course is not saved
        >
          Lectures
        </button>
      </div>

      {/* Render Active Tab */}
      {activeTab === "course" && (
        <CourseTab
          courseId={courseId ?? undefined}
          onSaveCourse={handleSaveCourse}
        />
      )}
      {activeTab === "lectures" && <LectureTab courseId={courseId} />}
    </div>
  );
};

export default AddCourse;
