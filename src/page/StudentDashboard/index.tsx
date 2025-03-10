import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "react-toastify";
import {
  useLazyGetLecturesByCourseIdQuery,
  useGetUserProgressQuery,
  useSaveProgressMutation,
} from "@/services/leactureAPI";
import SmartReactPlayer from "@/components/smartReactPlayer";

interface Lecture {
  _id: string;
  lectureTitle: string;
  videoInfo: {
    videoUrl: string;
    publicId?: string;
  };
  duration: number;
}

const COMMENTS = [
  {
    id: 1,
    name: "Alice",
    time: "2 hours ago",
    text: "This lecture was very informative!",
  },
  {
    id: 2,
    name: "Bob",
    time: "5 hours ago",
    text: "Great explanation of state management.",
  },
  {
    id: 3,
    name: "Charlie",
    time: "1 day ago",
    text: "The video quality is excellent.",
  },
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { courseId } = useParams<{ courseId: string }>();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState<number>(0);
  const [completedLectures, setCompletedLectures] = useState<Set<string>>(
    new Set()
  );
  const [comment, setComment] = useState("");

  const [fetchLecturesByCourseId] = useLazyGetLecturesByCourseIdQuery();
  const [saveProgressMutation] = useSaveProgressMutation();
  const { data: userProgress, isLoading: isProgressLoading } =
    useGetUserProgressQuery(
      { userId: user?.id ?? "", courseId: courseId ?? "" },
      { skip: !user?.id || !courseId }
    );

  // Fetch lectures by courseId
  useEffect(() => {
    const loadLectures = async () => {
      if (!courseId) return;
      try {
        const data = await fetchLecturesByCourseId(courseId).unwrap();
        setLectures(data.lectures || []);
      } catch (err) {
        toast.error("Failed to fetch lectures. Please try again later.");
      }
    };

    loadLectures();
  }, [courseId, fetchLecturesByCourseId]);

  // Restore user progress
  useEffect(() => {
    if (userProgress && lectures.length > 0) {
      const progressData = userProgress.progress?.[0];
      if (progressData) {
        const lastWatchedLecture = lectures.find(
          (lecture) => lecture._id === progressData.lectureId
        );
        if (lastWatchedLecture) {
          const lectureIndex = lectures.indexOf(lastWatchedLecture);
          setCurrentLectureIndex(lectureIndex);
          setPlayedSeconds(progressData.playedSeconds);
        }
      }
    }
  }, [userProgress, lectures]);

  // Memoized saveUserProgress function
  const saveUserProgress = useCallback(
    async (request: { playedSeconds?: number }) => {
      if (!user?.id || !courseId) {
        throw new Error("User ID or Course ID is missing");
      }
      try {
        await saveProgressMutation({
          userId: user.id,
          courseId,
          lectureId: lectures[currentLectureIndex]._id,
          playedSeconds: request?.playedSeconds ?? 0,
        }).unwrap();
      } catch (error) {
        console.error("Failed to save progress:", error);
        throw error;
      }
    },
    [user?.id, courseId, lectures, currentLectureIndex, saveProgressMutation]
  );

  // Memoized video URL
  const videoUrl = useMemo(
    () => lectures[currentLectureIndex]?.videoInfo?.videoUrl,
    [lectures, currentLectureIndex]
  );

  // Check if all lectures are completed
  const allLecturesCompleted = completedLectures.size === lectures.length;

  // Memoized lecture progress calculation
  const getLectureProgress = useCallback(
    (lectureId: string) => {
      if (lectureId === lectures[currentLectureIndex]._id) {
        return (playedSeconds / lectures[currentLectureIndex].duration) * 100;
      }
      return completedLectures.has(lectureId) || allLecturesCompleted ? 100 : 0;
    },
    [
      currentLectureIndex,
      lectures,
      playedSeconds,
      completedLectures,
      allLecturesCompleted,
    ]
  );

  // Handle lecture completion
  useEffect(() => {
    if (duration > 0 && playedSeconds >= duration) {
      // Mark the current lecture as completed
      setCompletedLectures((prev) =>
        new Set(prev).add(lectures[currentLectureIndex]._id)
      );

      // Move to the next lecture if available
      if (currentLectureIndex < lectures.length - 1) {
        setCurrentLectureIndex(currentLectureIndex + 1);
        setPlayedSeconds(0); // Reset playedSeconds for the next lecture
      } else {
        toast.success("You have completed all lectures!");
      }
    }
  }, [playedSeconds, duration, currentLectureIndex, lectures]);

  // Handle lecture navigation
  const handleLectureClick = useCallback(
    (index: number) => {
      if (
        index > currentLectureIndex &&
        !completedLectures.has(lectures[currentLectureIndex]._id)
      ) {
        toast.error(
          "Please complete the current lecture before moving to the next one."
        );
        return;
      }
      setCurrentLectureIndex(index);
      setPlayedSeconds(0);
    },
    [currentLectureIndex, completedLectures, lectures]
  );

  // Handle comment submission
  const handleCommentSubmit = useCallback(() => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    console.log("Comment submitted:", comment);
    setComment("");
    toast.success("Comment submitted successfully!");
  }, [comment]);

  // Disable right-click and keyboard shortcuts
  const handleDisableDownload = (
    event: React.MouseEvent | React.KeyboardEvent
  ) => {
    event.preventDefault();
    toast.info("Downloading videos is not allowed.");
  };

  if (isProgressLoading || !lectures.length) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Course Lectures</h1>

        {/* Video and Lecture List Container */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video Player Section */}
          <div className="lg:w-2/3 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Lecture {lectures[currentLectureIndex].lectureTitle}
            </h2>
            <div
              className="relative h-[400px] rounded-lg"
              onContextMenu={handleDisableDownload} // Disable right-click
              onKeyDown={handleDisableDownload} // Disable keyboard shortcuts
              draggable={false} // Disable drag-and-drop
            >
              <SmartReactPlayer
                src={videoUrl}
                initialProgress={playedSeconds}
                onDurationChange={setDuration}
                onTimeUpdate={setPlayedSeconds}
                enableControls={true}
                userId={user?.id}
                courseId={courseId}
                lectureId={lectures[currentLectureIndex]._id}
                saveUserProgress={saveUserProgress}
              />
            </div>
            <div className="mt-4">
              <p>
                Progress: {Math.round(playedSeconds)} / {duration.toFixed(2)}{" "}
                seconds
              </p>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(playedSeconds / duration) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Lecture List Section */}
          <div className="lg:w-1/3 bg-gray-800 p-4 rounded-lg min-h-[400px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Lecture List</h2>
            <ul>
              {lectures.map((lecture, index) => {
                const progress = getLectureProgress(lecture._id);
                const isCompleted =
                  completedLectures.has(lecture._id) || allLecturesCompleted;
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

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Comments</h3>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="space-y-4">
              {/* Example Comments */}
              {COMMENTS.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {comment.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{comment.name}</span>
                      <span className="text-sm text-gray-400">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-1">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Section */}
            <div className="mt-6">
              <textarea
                className="w-full p-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleCommentSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
