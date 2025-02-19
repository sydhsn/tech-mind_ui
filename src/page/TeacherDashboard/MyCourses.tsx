import React, { useEffect } from "react";
import { ICourse, useLazyGetMyCoursesQuery } from "../../services/courseAPI";
import { useAuth } from "../../components/AuthProvider";
import CourseCard from "../../components/CourseCard";

const MyCourses: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = React.useState<ICourse[]>([]);

  // api call to get courses create by the teacher
  const [
    getMyCourse,
    { data: myCourses, isLoading, error, isSuccess: myCoursesSuccess },
  ] = useLazyGetMyCoursesQuery();

  console.log(myCourses);
  console.log(isLoading);
  console.log(error);

  useEffect(() => {
    getMyCourse({
      userId: user?.id ?? "",
    });
  }, []);

  useEffect(() => {
    if (myCoursesSuccess) {
      setCourses(myCourses);
    }
  }, [myCoursesSuccess]);

  console.log(courses);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">My Courses</h2>
      <p className="text-gray-400 mt-2">Manage your courses here.</p>
      <div>
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
