import React from "react";
import { ICourse } from "../../types/AddCourse";

interface CourseCardProps {
  course: ICourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Thumbnail */}
      <div className="h-40 bg-gray-600 flex items-center justify-center">
        {course.courseThumbnail ? (
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">No Thumbnail</span>
        )}
      </div>

      {/* Course Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">
          {course.courseTitle}
        </h3>
        <p className="text-sm text-gray-400 mt-2">{course.subTitle}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {course.courseLevel} Level
          </span>
          <span className="text-sm text-gray-400">${course.coursePrice}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
