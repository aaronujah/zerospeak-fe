export interface Language {
  id: string;
  name: string;
  code: string;
  flag: string;
  isAsianLanguage: boolean;
  isRightToLeft: boolean;
  displayInfo: string;
  createdAt: string;
  updatedAt: string;
}

export interface LanguageAnalytics {
  totalUsers: number;
  totalContent: number;
  totalLessons: number;
  totalFlashcards: number;
  topLanguages: Language[];
  growthRate: number;
  averageProgress: number;
}
