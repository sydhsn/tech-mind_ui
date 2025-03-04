import React from "react";
import ReactPlayer from "react-player"; // Import react-player
import { faker } from "@faker-js/faker";

const CourseDetailsPage: React.FC = () => {
  // Course object
  const course = {
    _id: "67b5e8e7ef61ba264b68bd9f",
    courseTitle: "Java Development: From Beginner to Advanced",
    subTitle: "Build dynamic, scalable web applications from scratch",
    description:
      "<p>Java Development: From Beginner to Advanced Build dynamic, scalable web applications from scratch</p>",
    category: "Programming",
    courseLevel: "Beginner",
    coursePrice: 2000,
    courseThumbnail:
      "https://res.cloudinary.com/dadarbazaar/image/upload/v1740500495/user_profiles/yyyhrtzqhe24ktj9znjh.png",
    videoUrl: "https://youtu.be/hRnMYMzatho?si=QfbgZss-b_tzdG2q", // Add video URL for testing
    enrolledStudents: [],
    lectures: ["67ba083bfa714336efb925e1", "67bf3096545cc996e7de7ef3"],
    creator: "67a88656fd8e7e0057295b41",
    isPublished: true,
    createdAt: "2025-02-19T14:21:27.081Z",
    updatedAt: "2025-03-04T16:41:00.173Z",
    __v: 2,
  };

  // Faker data for instructor and reviews
  const instructor = {
    name: faker.person.fullName(),
    bio: faker.lorem.paragraph(),
    image: faker.image.avatar(),
  };

  const reviews = [
    {
      id: 1,
      studentName: faker.person.fullName(),
      rating: "⭐️⭐️⭐️⭐️⭐️",
      review: faker.lorem.sentences(2),
      image: faker.image.avatar(),
    },
    {
      id: 2,
      studentName: faker.person.fullName(),
      rating: "⭐️⭐️⭐️⭐️⭐️",
      review: faker.lorem.sentences(2),
      image: faker.image.avatar(),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start">
            {/* Left Side: Course Details */}
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{course.courseTitle}</h1>
              <p className="text-gray-300 mb-6">{course.subTitle}</p>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-yellow-400">⭐️⭐️⭐️⭐️⭐️</span>
                <span className="text-gray-300">4.7 (15,000 ratings)</span>
              </div>
              <p className="text-gray-300 mb-6">Created by {instructor.name}</p>
              <div className="flex space-x-4">
                <button className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-all">
                  Enroll Now
                </button>
                <button className="bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all">
                  Add to Wishlist
                </button>
              </div>
            </div>

            {/* Right Side: Thumbnail/Video Preview */}
            <div className="w-full md:w-1/3 mx-auto md:mx-0 md:float-right md:ml-6 md:top-32 md:mt-32 mt-5">
              <div className="relative w-full h-64 bg-gray-700 rounded-lg overflow-hidden shadow-2xl">
                {/* Video Player or Thumbnail */}
                {course.videoUrl ? (
                  <ReactPlayer
                    url={course.videoUrl} // Video URL
                    width="100%"
                    height="100%"
                    controls={true} // Show video controls
                    light={course.courseThumbnail} // Show thumbnail before playing
                    playing={false} // Autoplay disabled
                    className="react-player"
                  />
                ) : (
                  <img
                    src={course.courseThumbnail}
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ul className="list-disc list-inside text-gray-700">
            <li>Master Java fundamentals</li>
            <li>Build real-world projects</li>
            <li>Understand Object-Oriented Programming</li>
          </ul>
          <ul className="list-disc list-inside text-gray-700">
            <li>Learn Spring Framework</li>
            <li>Work with databases and APIs</li>
            <li>Debug and optimize your code</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Section 1: Introduction</h3>
          </div>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Section 2: Java Basics</h3>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold">Section 3: Advanced Java</h3>
          </div>
        </div>
      </div>

      {/* Instructor Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Instructor</h2>
          <div className="flex items-center space-x-6">
            <img
              src={instructor.image}
              alt="Instructor"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{instructor.name}</h3>
              <p className="text-gray-600">Senior Software Engineer</p>
              <p className="text-gray-600 mt-2">{instructor.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={review.image}
                  alt="Student"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {review.studentName}
                  </h3>
                  <span className="text-yellow-400">{review.rating}</span>
                </div>
              </div>
              <p className="text-gray-700">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
