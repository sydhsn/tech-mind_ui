import React from "react";

const TeacherDashboard: React.FC = () => {
  const teacherCourses = [
    { id: 1, title: "React for Beginners", students: 25 },
    { id: 2, title: "Node.js & Express", students: 18 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
      <button className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        + Add New Course
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teacherCourses.map((course) => (
          <div key={course.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-400 mt-2">
              Students Enrolled: {course.students}
            </p>
            <button className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
              Manage Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
