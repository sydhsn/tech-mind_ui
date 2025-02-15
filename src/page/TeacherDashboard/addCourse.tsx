import React from "react";

const AddCourse: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">Add New Course</h2>
      <p className="text-gray-400 mt-2">
        Fill in the details to create a new course.
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit
      </button>
    </div>
  );
};

export default AddCourse;
