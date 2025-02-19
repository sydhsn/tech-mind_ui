import { Button } from "../../components/ui/button"; // Adjust the import based on your project structure
import { ICourse } from "../../services/courseAPI";

interface CourseCardProps {
  course: ICourse;
}

const CourseCard = ({ course }: CourseCardProps) => {
  //const navigate = useNavigate();

  // Handle "Manage" button click
  const handleManageClick = () => {
    // Navigate to the lecture management page with the course ID
    //navigate(`/manage-lectures/${course._id}`);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-md mx-auto">
      {/* Course Thumbnail */}
      <img
        src={course.courseThumbnail}
        alt={course.courseTitle}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      {/* Course Title */}
      <h2 className="text-xl font-semibold mb-2">{course.courseTitle}</h2>

      {/* Course Subtitle */}
      <p className="text-gray-400 mb-2">{course.subTitle}</p>

      {/* Course Category */}
      <p className="text-sm text-gray-400 mb-2">Category: {course.category}</p>

      {/* Course Price */}
      <p className="text-sm text-gray-400 mb-4">
        Price: ${course.coursePrice === 0 ? "Free" : course.coursePrice}
      </p>

      {/* Manage Button */}
      <Button
        onClick={handleManageClick}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
      >
        Manage Lectures
      </Button>
    </div>
  );
};

export default CourseCard;
