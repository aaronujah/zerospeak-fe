export interface ContentItem {
  id: string;
  type: "video" | "audio" | "story" | "podcast";
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  level: "beginner" | "intermediate" | "advanced";
  language: string;
  topics: string[];
  url: string;
  audioUrl?: string; // for videos with separate audio
  transcript?: string;
  createdAt: string;
  views: number;
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  subtitles?: {
    language: string;
    url: string;
  }[];
}

export interface FeedState {
  items: ContentItem[];
  loading: boolean;
  hasMore: boolean;
  page: number;
  filters: {
    type?: ContentItem["type"];
    level?: ContentItem["level"];
    topics?: string[];
  };
}
