import React from "react";

const EditLecture: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Edit Lecture</h2>
      <form className="space-y-4">
        {/* Lecture Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Lecture Title
          </label>
          <input
            type="text"
            name="lectureTitle"
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter lecture title"
          />
        </div>

        {/* Video URL */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Video URL
          </label>
          <input
            type="text"
            name="videoUrl"
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter video URL"
          />
        </div>

        {/* Video File */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Video File
          </label>
          <input
            type="file"
            name="videoFile"
            className="w-full p-2 bg-gray-700 text-white rounded"
            accept="video/*"
          />
        </div>

        {/* Update Lecture Button */}
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Lecture
        </button>
      </form>
    </div>
  );
};

export default EditLecture;
