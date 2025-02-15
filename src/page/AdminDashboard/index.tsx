import React from "react";

const AdminDashboard: React.FC = () => {
  const stats = {
    totalUsers: 120,
    totalCourses: 45,
    activeTeachers: 12,
    activeStudents: 85,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-xl font-semibold capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </h2>
            <p className="text-2xl font-bold mt-2">{value}</p>
          </div>
        ))}
      </div>
      <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Manage Users
      </button>
    </div>
  );
};

export default AdminDashboard;
