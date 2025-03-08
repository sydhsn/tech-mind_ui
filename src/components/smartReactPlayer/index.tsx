import React, { useEffect, useRef, useState } from "react";

interface ProgressRequest {
  userId?: string;
  courseId?: string;
  playedSeconds: number;
  lectureId?: string;
}

interface SmartReactPlayerProps {
  src: string;
  disableSeeking?: boolean;
  enableControls?: boolean;
  initialProgress?: number;
  onDurationChange?: (duration: number) => void;
  onTimeUpdate?: (currentTime: number) => void;
  userId?: string;
  courseId?: string;
  lectureId?: string;
  saveUserProgress?: (request: ProgressRequest) => Promise<void>;
}

const SmartReactPlayer: React.FC<SmartReactPlayerProps> = ({
  src,
  disableSeeking = false,
  enableControls = true,
  initialProgress = 0,
  onDurationChange,
  onTimeUpdate,
  userId,
  courseId,
  lectureId,
  saveUserProgress,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentTimeRef = useRef<number>(initialProgress);
  const [duration, setDuration] = useState<number>(0);

  const localStorageKey = `progress_${userId}_${courseId}_${lectureId}`;

  const saveProgressToLocalStorage = (currentTime: number) => {
    localStorage.setItem(localStorageKey, JSON.stringify({ currentTime }));
  };

  const getProgressFromLocalStorage = () => {
    const progress = localStorage.getItem(localStorageKey);
    return progress ? JSON.parse(progress).currentTime : initialProgress;
  };

  const saveProgressToBackend = async (currentTime: number) => {
    if (!saveUserProgress || !userId || !courseId) return;

    try {
      await saveUserProgress({
        userId,
        courseId,
        playedSeconds: currentTime,
        lectureId,
      });
      console.log("Progress saved to backend:", currentTime);
    } catch (error) {
      console.error("Error saving progress to backend:", error);
    }
  };

  const handleExitOrStop = () => {
    const currentTime = currentTimeRef.current;
    saveProgressToBackend(currentTime);
    localStorage.removeItem(localStorageKey);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      currentTimeRef.current = currentTime;
      onTimeUpdate?.(currentTime);
      saveProgressToLocalStorage(currentTime);
    };

    const handlePause = () => handleExitOrStop();
    const handleBeforeUnload = () => handleExitOrStop();

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("pause", handlePause);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("pause", handlePause);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [onTimeUpdate, userId, courseId, lectureId, saveUserProgress]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadProgress = () => {
      const progress = getProgressFromLocalStorage();
      video.currentTime = progress;
      currentTimeRef.current = progress;
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      onDurationChange?.(video.duration);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    loadProgress();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [onDurationChange]);

  const handleSeeking = () => {
    if (disableSeeking && videoRef.current) {
      videoRef.current.currentTime = currentTimeRef.current;
    }
  };

  return (
    <div className="smart-react-player">
      <video
        ref={videoRef}
        src={src}
        controls={enableControls}
        onSeeking={handleSeeking}
        preload="metadata"
        className="w-full h-auto max-w-full"
      />
      <div className="video-info">
        <span>
          Time: {currentTimeRef.current.toFixed(2)}s / {duration.toFixed(2)}s
        </span>
      </div>
    </div>
  );
};

export default SmartReactPlayer;
