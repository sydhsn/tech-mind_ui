const mockLectures = [
  {
    _id: "65f8e8b8f1a2c4d5e8f8b8b8",
    lectureTitle: "Introduction to React",
    courseId: "67b931c49560112942b875bc", // Updated to match the URL courseId
    videoInfo: {
      videoUrl: "https://youtu.be/vzyzjqy1I5k?si=_rXHRDW_-NS7gfKJ",
      publicId: "video1",
    },
    duration: 300,
    isPreviewFree: true,
  },
  {
    _id: "65f8e8b8f1a2c4d5e8f8b8b9",
    lectureTitle: "React Components",
    courseId: "67b931c49560112942b875bc", // Updated to match the URL courseId
    videoInfo: {
      videoUrl: "https://youtu.be/3-s7G1UINek?si=AADfHM8DR-2Z4e4p",
      publicId: "video2",
    },
    duration: 400,
    isPreviewFree: false,
  },
];

export const fetchLectures = async (courseId: string) => {
  try {
    // Simulate an API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Filter mock lectures by courseId
    const filteredLectures = mockLectures.filter(
      (lecture) => lecture.courseId === courseId
    );
    console.log("Filtered Lectures:", filteredLectures); // Debugging
    return filteredLectures;
  } catch (error) {
    console.error("Failed to fetch lectures:", error);
    return [];
  }
};
