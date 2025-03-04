import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useCreateCourseMutation,
  usePublishCourseMutation,
  useUpdateCourseMutation,
} from "../../services/courseAPI";
import LectureTab from "./course/lecture/LectureTab";
import CourseTab from "./course/CourseTab";
import { useAuth } from "../../components/AuthProvider";
import { Button } from "../../components/ui/button";
import { useParams } from "react-router-dom";
import { useLazyCheckCourseHasLectureQuery } from "@/services/leactureAPI";

const AddCourse: React.FC = () => {
  const { courseId } = useParams<{ courseId?: string }>(); // Get courseId from URL
  const { user } = useAuth();
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(
    courseId || null
  );
  const [activeTab, setActiveTab] = useState<"course" | "lectures">("course");
  const [hasLectures, setHasLectures] = useState(false);

  const [createCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [checkHasLecture] = useLazyCheckCourseHasLectureQuery();
  const [publishCourse] = usePublishCourseMutation();

  // Handle saving or updating the course
  const handleSaveCourse = async (courseData: any) => {
    try {
      if (currentCourseId) {
        // Update existing course
        const response = await updateCourse({
          id: currentCourseId,
          course: {
            ...courseData,
            creator: user?.id,
          },
        }).unwrap();
        console.log(response);
        toast.success("Course updated successfully!");
      } else {
        // Create new course
        const response = await createCourse(courseData).unwrap();
        setCurrentCourseId(response?._id ?? ""); // Set courseId after saving
        setActiveTab("lectures"); // Switch to Lecture Tab
        toast.success("Course saved successfully!");
      }
    } catch (error) {
      toast.error("Failed to save/update course. Please try again.");
    }
  };

  // Set courseId state if coming from edit mode
  useEffect(() => {
    if (courseId) {
      setCurrentCourseId(courseId);
      setActiveTab("course");
    }
  }, [courseId]);

  // Fetch if course has lectures
  useEffect(() => {
    if (currentCourseId) {
      checkHasLecture(currentCourseId)
        .unwrap()
        .then((response) => {
          setHasLectures(response.hasLectures);
        })
        .catch((error) => {
          console.error("Error checking lectures:", error);
        });
    }
  }, [currentCourseId]);

  // handle publish course
  const handlePublishCourse = () => {
    if (!currentCourseId) return;
    if (!user) {
      toast.error("Please login to publish the course.");
      return;
    }
    publishCourse({
      courseId: currentCourseId,
      creator: user?.id ?? "",
    })
      .unwrap()
      .then(() => {
        toast.success("Course published successfully!");
      })
      .catch((error) => {
        console.error("Error publishing course:", error);
        toast.error("Failed to publish course. Please try again.");
      });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      {/* Tabs for Course and Lectures */}
      <div className="flex space-x-4 mb-6">
        <Button
          className={`px-4 py-2 rounded ${
            activeTab === "course"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => setActiveTab("course")}
        >
          Course Details
        </Button>
        <Button
          className={`px-4 py-2 rounded ${
            activeTab === "lectures"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => setActiveTab("lectures")}
          disabled={!currentCourseId} // Disable Lectures tab if course is not saved
        >
          Lectures
        </Button>
        {hasLectures && (
          <div className="ml-auto">
            <Button onClick={handlePublishCourse}>Publish Course</Button>
          </div>
        )}
      </div>

      {/* Render Active Tab */}
      {activeTab === "course" && (
        <CourseTab
          courseId={currentCourseId ?? undefined}
          onSaveCourse={handleSaveCourse}
        />
      )}
      {activeTab === "lectures" && <LectureTab courseId={currentCourseId} />}
    </div>
  );
};

export default AddCourse;
