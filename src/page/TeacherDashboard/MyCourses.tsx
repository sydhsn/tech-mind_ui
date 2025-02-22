import React, { useEffect } from "react";
import { useAuth } from "../../components/AuthProvider";
import CourseCard from "../../components/CourseCard";
import { useLazyGetMyCoursesQuery } from "../../services/courseAPI";
import { ICourse } from "../../types/AddCourse";

interface MyCoursesProps {
  onEditCourse: (courseId: string) => void;
}

const MyCourses: React.FC<MyCoursesProps> = ({ onEditCourse }) => {
  const { user } = useAuth();
  const [courses, setCourses] = React.useState<ICourse[]>([]);

  // API call to get courses created by the teacher
  const [
    getMyCourse,
    { data: myCoursesResponse, isLoading, error, isSuccess: myCoursesSuccess },
  ] = useLazyGetMyCoursesQuery();

  useEffect(() => {
    if (user?.id) {
      getMyCourse({
        userId: user?.id,
      });
    }
  }, [user]);

  useEffect(() => {
    if (myCoursesSuccess && myCoursesResponse) {
      setCourses(myCoursesResponse ?? []);
    }
  }, [myCoursesSuccess, myCoursesResponse]);

  // Safely handle the error and convert it to a ReactNode
  const renderError = (): React.ReactNode => {
    if (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        return (error as { message: string }).message;
      }
      return "Failed to load courses. Please try again.";
    }
    return null;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white">My Courses</h2>
      <p className="text-gray-400 mt-2">Manage your courses here.</p>

      {/* Display error message if there's an error */}
      <>{error && <div className="text-red-500 mt-4">{renderError()}</div>}</>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center text-gray-400 mt-6">Loading...</div>
      )}

      {/* Responsive Grid Layout */}
      {!isLoading && courses?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => onEditCourse(course._id!)}
              className="cursor-pointer"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      )}

      {/* No Courses State */}
      {!isLoading && courses?.length === 0 && (
        <div className="text-center text-gray-400 mt-6">No courses found.</div>
      )}
    </div>
  );
};

export default MyCourses;
