export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: "grammar" | "alphabet" | "phonetics" | "vocabulary" | "conversation";
  level: "beginner" | "intermediate" | "advanced";
  isCompleted: boolean;
  isLocked: boolean;
  contentType: "video" | "audio" | "article" | "interactive";
  videoUrl?: string;
  audioUrl?: string;
  articleContent?: {
    content: string;
    images?: {
      url: string;
      caption?: string;
      alt: string;
    }[];
  };
  exercises?: Exercise[];
  transcript?: string;
  order: number;
}

export interface Exercise {
  id: string;
  type: "multiple-choice" | "fill-blank" | "pronunciation" | "listening";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    name: string;
    avatar: string;
    bio: string;
    rating: number;
  };
  level: "beginner" | "intermediate" | "advanced";
  language: string;
  category: "grammar" | "alphabet" | "phonetics" | "complete";
  totalLessons: number;
  completedLessons: number;
  totalDuration: number; // in minutes
  rating: number;
  studentsEnrolled: number;
  price: number;
  isEnrolled: boolean;
  isFree: boolean;
  lessons: Lesson[];
  createdAt: string;
  lastUpdated: string;
}

export interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  currentLesson: string;
  progressPercentage: number;
  timeSpent: number; // in minutes
  lastAccessed: string;
}
