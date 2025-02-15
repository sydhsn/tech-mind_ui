import { faker } from "@faker-js/faker";

// Generate mock course data using Faker
const mockCourses = [
  {
    _id: "1",
    courseTitle: "Advanced React",
    subTitle: "Master React and Build Scalable Applications",
    description:
      "This course covers advanced concepts of React, including hooks, context, performance optimization, and more.",
    category: "Web Development",
    courseLevel: "Advanced",
    coursePrice: 199,
    courseThumbnail: faker.image.url({
      width: 150,
      height: 150,
    }), // Correct method for image
    enrolledStudents: [],
    lectures: [],
    creator: "1",
    isPublished: true,
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-01T10:00:00Z",
  },
  {
    _id: "2",
    courseTitle: "Introduction to JavaScript",
    subTitle: "Learn the basics of JavaScript programming",
    description:
      "This course is designed for beginners who want to learn JavaScript from scratch.",
    category: "Programming",
    courseLevel: "Beginner",
    coursePrice: 49,
    courseThumbnail: faker.image.url({
      width: 150,
      height: 150,
    }), // Correct method for image
    enrolledStudents: [],
    lectures: [],
    creator: "2",
    isPublished: true,
    createdAt: "2025-01-05T10:00:00Z",
    updatedAt: "2025-01-05T10:00:00Z",
  },
  {
    _id: "3",
    courseTitle: "Full Stack Development with Node.js",
    subTitle: "Build Full Stack Applications Using Node.js and MongoDB",
    description:
      "Learn to build full-stack web applications with Node.js, Express, and MongoDB.",
    category: "Web Development",
    courseLevel: "Medium",
    coursePrice: 149,
    courseThumbnail: faker.image.url({
      width: 150,
      height: 150,
    }), // Correct method for image
    enrolledStudents: [],
    lectures: [],
    creator: "3",
    isPublished: true,
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z",
  },
  {
    _id: "4",
    courseTitle: "Python for Data Science",
    subTitle: "Learn Python Programming for Data Science and Machine Learning",
    description:
      "This course covers Python programming, data analysis, and machine learning techniques.",
    category: "Data Science",
    courseLevel: "Beginner",
    coursePrice: 99,
    courseThumbnail: faker.image.url({
      width: 150,
      height: 150,
    }), // Correct method for image
    enrolledStudents: [],
    lectures: [],
    creator: "4",
    isPublished: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
  },
  {
    _id: "5",
    courseTitle: "Machine Learning Basics",
    subTitle: "Understand the fundamentals of Machine Learning",
    description:
      "An introductory course to machine learning concepts and algorithms.",
    category: "Data Science",
    courseLevel: "Medium",
    coursePrice: 149,
    courseThumbnail: faker.image.url({
      width: 150,
      height: 150,
    }), // Correct method for image
    enrolledStudents: [],
    lectures: [],
    creator: "5",
    isPublished: true,
    createdAt: "2025-01-20T10:00:00Z",
    updatedAt: "2025-01-20T10:00:00Z",
  },
];

export default function PublishedCourses() {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-100 mb-12">
          Published Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {mockCourses.map((course) => (
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
                <button className="bg-gray-600 cursor-pointer text-white py-2 px-6 rounded-lg mt-4 hover:bg-gray-500 transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
