import {
  UserActivity,
  ActivityType,
  ActivityFilters,
  ActivityStats,
} from "@/types/activity";

// Generate timestamps for the last 30 days
const generateRecentDate = (daysAgo: number, hoursAgo: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  return date;
};

export const mockActivities: UserActivity[] = [
  {
    id: "1",
    type: "lesson_completed",
    title: "Completed Spanish Greetings",
    description: "Finished lesson on basic Spanish greetings and introductions",
    timestamp: generateRecentDate(0, 2),
    metadata: {
      lessonId: "1",
      lessonTitle: "Spanish Greetings",
      score: 95,
      timeSpent: 25,
    },
    icon: "📚",
    color: "emerald",
  },
  {
    id: "2",
    type: "flashcard_studied",
    title: "Studied Vocabulary Deck",
    description: 'Reviewed 25 cards from "Common Spanish Verbs" deck',
    timestamp: generateRecentDate(0, 4),
    metadata: {
      deckId: "1",
      deckName: "Common Spanish Verbs",
      cardsStudied: 25,
      timeSpent: 15,
    },
    icon: "🃏",
    color: "blue",
  },
  {
    id: "3",
    type: "journal_entry",
    title: "New Journal Entry",
    description: "Wrote about daily routine in Spanish and English",
    timestamp: generateRecentDate(1, 3),
    metadata: {
      entryId: "1",
      wordsWritten: 156,
      timeSpent: 12,
    },
    icon: "📝",
    color: "orange",
  },
  {
    id: "4",
    type: "content_viewed",
    title: "Explored Spanish Culture",
    description: "Read article about traditional Spanish festivals",
    timestamp: generateRecentDate(3, 2),
    metadata: {
      contentId: "12",
      contentTitle: "Traditional Spanish Festivals",
      timeSpent: 8,
    },
    icon: "🎭",
    color: "pink",
  },
  {
    id: "5",
    type: "lesson_completed",
    title: "Completed Past Tense Lesson",
    description: "Mastered Spanish past tense conjugations",
    timestamp: generateRecentDate(3, 6),
    metadata: {
      lessonId: "5",
      lessonTitle: "Spanish Past Tense",
      score: 88,
      timeSpent: 35,
    },
    icon: "📚",
    color: "emerald",
  },
  {
    id: "6",
    type: "flashcard_studied",
    title: "Morning Study Session",
    description: 'Reviewed 18 cards from "Spanish Numbers" deck',
    timestamp: generateRecentDate(4, 10),
    metadata: {
      deckId: "2",
      deckName: "Spanish Numbers",
      cardsStudied: 18,
      timeSpent: 10,
    },
    icon: "🃏",
    color: "blue",
  },
  {
    id: "7",
    type: "journal_entry",
    title: "Weekly Reflection",
    description: "Reflected on learning progress and set new goals",
    timestamp: generateRecentDate(5, 4),
    metadata: {
      entryId: "3",
      wordsWritten: 203,
      timeSpent: 18,
    },
    icon: "📝",
    color: "orange",
  },
  {
    id: "8",
    type: "content_viewed",
    title: "Grammar Reference",
    description: "Studied Spanish subjunctive mood rules",
    timestamp: generateRecentDate(7, 3),
    metadata: {
      contentId: "18",
      contentTitle: "Spanish Subjunctive Mood",
      timeSpent: 15,
    },
    icon: "📖",
    color: "pink",
  },
];

// Dynamic storage for new activities
const dynamicActivities: UserActivity[] = [];

export const addActivity = (
  activity: Omit<UserActivity, "id" | "timestamp">
) => {
  const newActivity: UserActivity = {
    ...activity,
    id: `dynamic_${Date.now()}`,
    timestamp: new Date(),
  };
  dynamicActivities.push(newActivity);
  return newActivity;
};

export const getAllActivities = (): UserActivity[] => {
  return [...mockActivities, ...dynamicActivities].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );
};

export const getFilteredActivities = (
  filters: ActivityFilters
): UserActivity[] => {
  let activities = getAllActivities();

  if (filters.type && filters.type.length > 0) {
    activities = activities.filter((activity) =>
      filters.type!.includes(activity.type)
    );
  }

  if (filters.dateRange) {
    activities = activities.filter((activity) => {
      const activityDate = activity.timestamp;
      return (
        activityDate >= filters.dateRange!.start &&
        activityDate <= filters.dateRange!.end
      );
    });
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    activities = activities.filter(
      (activity) =>
        activity.title.toLowerCase().includes(searchLower) ||
        activity.description.toLowerCase().includes(searchLower)
    );
  }

  return activities;
};

export const getActivityStats = (): ActivityStats => {
  const activities = getAllActivities();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const todayActivities = activities.filter(
    (activity) => activity.timestamp >= todayStart
  );
  const weekActivities = activities.filter(
    (activity) => activity.timestamp >= weekStart
  );

  // Count activity types
  const typeCounts: Record<ActivityType, number> = {
    lesson_completed: 0,
    flashcard_studied: 0,
    journal_entry: 0,
    content_viewed: 0,
  };

  activities.forEach((activity) => {
    typeCounts[activity.type]++;
  });

  const topActivity = Object.entries(typeCounts).reduce((a, b) =>
    typeCounts[a[0] as ActivityType] > typeCounts[b[0] as ActivityType] ? a : b
  )[0] as ActivityType;

  // Calculate learning streak (consecutive days with learning activities)
  const learningActivities = activities.filter((activity) =>
    ["lesson_completed", "flashcard_studied", "journal_entry"].includes(
      activity.type
    )
  );

  let streak = 0;
  let currentDate = new Date(todayStart);

  while (streak < 30) {
    // Max 30 days to check
    const dayStart = new Date(currentDate);
    const dayEnd = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

    const hasLearningActivity = learningActivities.some(
      (activity) =>
        activity.timestamp >= dayStart && activity.timestamp < dayEnd
    );

    if (hasLearningActivity) {
      streak++;
      currentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    } else {
      break;
    }
  }

  return {
    totalActivities: activities.length,
    todayActivities: todayActivities.length,
    thisWeekActivities: weekActivities.length,
    topActivity,
    learningStreak: streak,
  };
};
