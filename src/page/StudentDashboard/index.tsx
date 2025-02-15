import React from "react";

const StudentDashboard: React.FC = () => {
  const courses = [
    { id: 1, title: "React for Beginners", progress: 60 },
    { id: 2, title: "Node.js & Express", progress: 30 },
    { id: 3, title: "Advanced JavaScript", progress: 80 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-400 mt-2">Progress: {course.progress}%</p>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
