import { useLazyGetAllPublishedCoursesQuery } from "@/services/courseAPI";
import { ICourse } from "@/types/AddCourse";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PublishedCourses() {
  const navigate = useNavigate();
  const [publishedCourse, setPublishedCourse] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // API call to get courses
  const [fetchAllCourse, { data: coursesData, isSuccess: isCourseSuccess }] =
    useLazyGetAllPublishedCoursesQuery();

  useEffect(() => {
    fetchAllCourse()
      .unwrap()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (isCourseSuccess && coursesData) {
      setPublishedCourse(coursesData);
    }
  }, [isCourseSuccess, coursesData]);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="rounded-lg overflow-hidden shadow-xl animate-pulse bg-gray-800 border border-gray-700">
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

  // Handle course details page by course id
  const handleCourseDetails = (courseId: string) => () => {
    navigate(`/home/course-details/${courseId}`);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-100 mb-12">
          Explore Our Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Show skeleton loader while loading */}
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}

          {/* Show courses if data is loaded and available */}
          {!isLoading &&
            publishedCourse.map((course) => (
              <div
                key={course._id}
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
              >
                <img
                  src={course.courseThumbnail}
                  alt={`Thumbnail for ${course.courseTitle}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-3">
                    {course.courseTitle}
                  </h2>
                  <p className="text-gray-300 mb-3 text-sm">
                    {course.subTitle}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-xs bg-gray-700 px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="text-gray-400 text-xs bg-gray-700 px-2 py-1 rounded-full">
                      {course.courseLevel}
                    </span>
                  </div>
                  <p className="text-gray-200 text-lg font-semibold mb-3">
                    ${course.coursePrice}
                  </p>
                  <button
                    onClick={
                      course._id ? handleCourseDetails(course._id) : undefined
                    }
                    className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg mt-3 hover:from-blue-600 hover:to-purple-700 transition-all text-sm font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}

          {/* Show "No records found" if no courses are available */}
          {!isLoading && publishedCourse.length === 0 && (
            <div className="text-center text-gray-300 col-span-full py-12">
              <div className="text-2xl font-bold mb-4">No Courses Found</div>
              <p className="text-gray-400">
                It looks like there are no courses available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
