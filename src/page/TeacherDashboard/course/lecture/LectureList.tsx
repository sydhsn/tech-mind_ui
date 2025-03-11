import React from "react";
import { Edit2, Trash2 } from "lucide-react"; // Import icons from lucide-react

interface Lecture {
  _id: string;
  lectureTitle: string;
  courseId: string;
  videoInfo: {
    videoUrl: string;
    publicId: string;
  };
  duration: number;
  isPreviewFree: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LectureListProps {
  lectures: Lecture[];
  isLecturesLoading: boolean;
  onEditLecture: (lecture: Lecture) => void;
  onDeleteLecture: (lectureId: string) => void;
}

const LectureList: React.FC<LectureListProps> = ({
  lectures,
  isLecturesLoading,
  onEditLecture,
  onDeleteLecture,
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">
        Existing Lectures
      </h3>
      {isLecturesLoading ? (
        <div className="text-center text-white">Loading lectures...</div>
      ) : lectures && lectures.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-lg">
            {/* Table Header */}
            <thead className="bg-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Lecture Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Course ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Public ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Duration (mins)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Preview Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-gray-600">
              {lectures.map((lecture) => (
                <tr
                  key={lecture._id}
                  className="hover:bg-gray-650 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {lecture.lectureTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {lecture.courseId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {lecture.videoInfo.publicId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {lecture.duration} mins
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        lecture.isPreviewFree
                          ? "bg-green-500/20 text-green-500"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-4">
                      {/* Edit Icon */}
                      <button
                        onClick={() => onEditLecture(lecture)}
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      {/* Delete Icon */}
                      <button
                        onClick={() => onDeleteLecture(lecture._id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400">No lectures found for this course.</p>
      )}
    </div>
  );
};

export default LectureList;
