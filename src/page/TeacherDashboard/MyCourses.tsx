import React, { useEffect } from "react";
import { useAuth } from "../../components/AuthProvider";
import CourseCard from "../../components/CourseCard";
import { useLazyGetMyCoursesQuery } from "../../services/courseAPI";
import { ICourse } from "../../types/AddCourse";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useEditCourse } from "../../Context/editCourseContext";

const MyCourses: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const { editCourse } = useEditCourse();
  const navigate = useNavigate();

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

  const handleAddCourse = () => {
    navigate("/teacher-dashboard/add-course");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        {/* Left Section: Heading & Description */}
        <div>
          <h2 className="text-xl font-semibold text-white">My Courses</h2>
          <p className="text-gray-400">Manage your courses here.</p>
        </div>

        {/* Right Section: Add Course Button */}
        <Button
          variant="outline"
          onClick={handleAddCourse}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Course
        </Button>
      </div>

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
              onClick={() => editCourse(course._id!)}
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
