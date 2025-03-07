import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { fetchLectures } from "./fetchLecture";

const StudentDashboard: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
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
  }

  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completedLectures, setCompletedLectures] = useState<Set<string>>(
    new Set()
  );

  // Fetch lectures by courseId
  useEffect(() => {
    console.log("Course ID:", courseId); // Debugging
    const loadLectures = async () => {
      if (!courseId) {
        setError("Course ID is not defined.");
        setLoading(false);
        return;
      }
      try {
        const data = await fetchLectures(courseId);
        console.log("Fetched Lectures:", data); // Debugging
        setLectures(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch lectures. Please try again later.");
        setLoading(false);
      }
    };

    loadLectures();
  }, [courseId]);

  // Handle video progress
  interface ProgressState {
    playedSeconds: number;
  }

  const handleProgress = (state: ProgressState) => {
    setPlayedSeconds(state.playedSeconds);
  };

  // Check if the current video is completed
  useEffect(() => {
    if (lectures.length > 0) {
      const currentLecture = lectures[currentLectureIndex];
      if (playedSeconds >= currentLecture.duration) {
        // Mark the current lecture as completed
        setCompletedLectures((prev) => new Set(prev).add(currentLecture._id));

        if (currentLectureIndex < lectures.length - 1) {
          // Move to the next lecture
          setCurrentLectureIndex(currentLectureIndex + 1);
          setPlayedSeconds(0);
        } else {
          // Course completed
          alert("Congratulations! You have completed the course.");
          setIsPlaying(false);
        }
      }
    }
  }, [playedSeconds, currentLectureIndex, lectures]);

  // Prevent jumping to future lectures
  const handleLectureClick = (index: number) => {
    if (
      index > currentLectureIndex &&
      !completedLectures.has(lectures[index]._id)
    ) {
      alert(
        "Please complete the current lecture before moving to the next one."
      );
      return;
    }
    setCurrentLectureIndex(index);
    setPlayedSeconds(0);
  };

  // Calculate progress percentage for a lecture
  const getLectureProgress = (lectureId: string) => {
    if (lectureId === lectures[currentLectureIndex]._id) {
      return (playedSeconds / lectures[currentLectureIndex].duration) * 100;
    }
    return completedLectures.has(lectureId) ? 100 : 0;
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (lectures.length === 0) {
    return (
      <div className="text-center text-white">
        No lectures found for this course.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Course Lectures</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Lecture {lectures[currentLectureIndex].lectureTitle}
              </h2>
              <ReactPlayer
                url={lectures[currentLectureIndex].videoInfo.videoUrl}
                playing={isPlaying}
                onProgress={handleProgress}
                controls={true}
                width="100%"
                height="400px"
              />
              <div className="mt-4">
                <p>
                  Progress: {Math.round(playedSeconds)} /{" "}
                  {lectures[currentLectureIndex].duration} seconds
                </p>
                <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${
                        (playedSeconds /
                          lectures[currentLectureIndex].duration) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Lecture List Section */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Lecture List</h2>
            <ul>
              {lectures?.map((lecture, index) => {
                const progress = getLectureProgress(lecture._id);
                const isCompleted = completedLectures.has(lecture._id);
                return (
                  <li
                    key={lecture._id}
                    className={`p-2 cursor-pointer ${
                      index === currentLectureIndex
                        ? "bg-blue-500 text-white"
                        : isCompleted
                        ? "bg-green-500 text-white"
                        : "hover:bg-gray-700"
                    } rounded-md mb-2 ${
                      index > currentLectureIndex && !isCompleted
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handleLectureClick(index)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{lecture.lectureTitle}</span>
                      <div className="flex items-center">
                        {isCompleted ? (
                          <span className="text-white ml-2">✔️</span>
                        ) : (
                          <div
                            className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center"
                            style={{
                              background: `conic-gradient(
                                #3b82f6 ${progress}%,
                                transparent ${progress}% 100%
                              )`,
                            }}
                          >
                            {progress > 0 && (
                              <span className="text-xs text-white">
                                {Math.round(progress)}%
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
