import { useLazyGetAllPublishedCoursesQuery } from "@/services/courseAPI";
import { ICourse } from "@/types/AddCourse";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PublishedCourses() {
  const navigate = useNavigate();
  const [publishedCourse, setPublishedCourse] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  // API call to get courses
  const [fetchAllCourse, { data: coursesData, isSuccess: isCourseSuccess }] =
    useLazyGetAllPublishedCoursesQuery();

  useEffect(() => {
    fetchAllCourse()
      .unwrap()
      .then(() => setIsLoading(false)) // Stop loading on success
      .catch(() => setIsLoading(false)); // Stop loading on error
  }, []);

  useEffect(() => {
    if (isCourseSuccess && coursesData) {
      setPublishedCourse(coursesData);
    }
  }, [isCourseSuccess, coursesData]);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl animate-pulse">
      <div className="w-full h-56 bg-gray-700 rounded-t-lg"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-700 rounded w-full mt-4"></div>
      </div>
    </div>
  );

  // handle course details page by course id
  const handleCousreDetails = (courseId: string) => () => {
    navigate(`/course-details/${courseId}`);
  };

  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-100 mb-12">
          Published Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Show skeleton loader while loading */}
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}

          {/* Show courses if data is loaded and available */}
          {!isLoading &&
            publishedCourse.map((course) => (
              <div
                key={course._id}
                className="bg-gray-800 hover:bg-gray-700 transition-all rounded-lg overflow-hidden shadow-xl transform hover:scale-105"
              >
                <img
                  src={course.courseThumbnail}
                  alt={`Thumbnail for ${course.courseTitle}`}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {course.courseTitle}
                  </h2>
                  <p className="text-gray-300 mb-4">{course.subTitle}</p>
                  <p className="text-gray-400 text-sm">{course.category}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    {course.courseLevel}
                  </p>
                  <p className="text-gray-200 text-lg font-semibold mb-4">
                    ${course.coursePrice}
                  </p>
                  <button
                    onClick={
                      course._id ? handleCousreDetails(course._id) : undefined
                    }
                    className="bg-gray-600 cursor-pointer text-white py-2 px-6 rounded-lg mt-4 hover:bg-gray-500 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}

          {/* Show "No records found" if no courses are available */}
          {!isLoading && publishedCourse.length === 0 && (
            <div className="text-center text-gray-300 col-span-full">
              No courses available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
