export interface ICreator {
  name: string;
  email: string;
  bio?: string;
  password: string;
  role: string;
  enrolledCourses?: string[];
  teachingCourses?: string[];
  profilePhoto?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface ICourse {
  _id?: string;
  userId: string;
  courseTitle: string;
  courseTitleUrl?: string;
  subTitle?: string;
  description?: string;
  category?: string;
  courseLevel: string; // Required
  coursePrice?: number;
  courseThumbnail?: string;
  enrolledStudents?: string[];
  isPreviewFree?: boolean;
  lectures?: Lecture[];
  duration?: number;
  creator?: ICreator; // Updated to match ICreator type
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Define Lecture Interface
export interface Lecture {
  lectureTitle: string;
  videoFile: string;
  duration: number;
  publicId: string;
  isPreviewFree: boolean;
}
