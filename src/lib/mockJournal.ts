import {
  JournalEntry,
  JournalPrompt,
  JournalStats,
  JournalFilters,
} from "@/types/journal";

// Helper function to calculate reading time (avg 200 words per minute)
const calculateReadingTime = (wordCount: number): number => {
  return Math.max(1, Math.round(wordCount / 200));
};

// Helper function to count words
const countWords = (text: string): number => {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
};

export const mockJournalPrompts: JournalPrompt[] = [
  {
    id: "prompt-1",
    title: "Daily Reflection",
    question:
      "¿Cómo te sientes hoy con tu progreso en español? Describe tu día usando al menos 5 palabras nuevas que hayas aprendido.",
    category: "daily",
    level: "beginner",
    language: "spanish",
    tags: ["daily", "feelings", "vocabulary"],
    example:
      "Hoy me siento muy emocionado porque aprendí nuevas palabras como 'entusiasmado', 'progreso', y 'desafío'...",
  },
  {
    id: "prompt-2",
    title: "Cultural Discovery",
    question:
      "What aspect of Spanish or Latin American culture surprised you this week? How does it compare to your own culture?",
    category: "culture",
    level: "intermediate",
    language: "english",
    tags: ["culture", "comparison", "discovery"],
    example:
      "This week I learned about the concept of 'sobremesa' - the time spent chatting after a meal...",
  },
  {
    id: "prompt-3",
    title: "Vocabulary Challenge",
    question:
      "Escribe una historia corta usando 10 palabras nuevas que hayas aprendido esta semana. ¿Puedes crear conexiones entre ellas?",
    category: "vocabulary",
    level: "intermediate",
    language: "spanish",
    tags: ["vocabulary", "storytelling", "practice"],
    example:
      "En la biblioteca encontré un libro fascinante sobre la historia de México...",
  },
  {
    id: "prompt-4",
    title: "Learning Goals",
    question:
      "What are your Spanish learning goals for next month? Break them down into specific, measurable objectives.",
    category: "goals",
    level: "beginner",
    language: "english",
    tags: ["goals", "planning", "motivation"],
    example:
      "Next month I want to: 1) Learn 50 new vocabulary words, 2) Complete 2 grammar lessons...",
  },
  {
    id: "prompt-5",
    title: "Conversation Practice",
    question:
      "Imagina que estás hablando con un amigo español. Describe tu rutina matutina usando el presente y vocabulario de actividades diarias.",
    category: "practice",
    level: "beginner",
    language: "spanish",
    tags: ["conversation", "routine", "present-tense"],
    example:
      "Buenos días, amigo. Te voy a contar sobre mi rutina matutina. Primero, me despierto a las siete...",
  },
  {
    id: "prompt-6",
    title: "Learning Reflection",
    question:
      "What was your biggest challenge in Spanish this week? How did you overcome it or what strategies will you try?",
    category: "reflection",
    level: "intermediate",
    language: "english",
    tags: ["challenges", "strategies", "growth"],
    example:
      "My biggest challenge this week was understanding the subjunctive mood...",
  },
];

export const mockJournalEntries: JournalEntry[] = [
  {
    id: "entry-1",
    title: "Mi primera semana con ZeroSpeak",
    content:
      "¡Hola! Estoy muy emocionado de comenzar mi viaje de aprendizaje de español. Esta primera semana ha sido increíble. He aprendido muchas palabras nuevas como 'emocionado', 'viaje', 'increíble', y 'aprendizaje'. Me gusta mucho la aplicación ZeroSpeak porque es muy interactiva y divertida. Cada día practico vocabulario y escucho audios. Mi meta es hablar español con fluidez en un año. ¡Espero lograrlo!",
    mood: "excited",
    tags: ["first-week", "goals", "vocabulary", "motivation"],
    language: "spanish",
    wordCount: 68,
    readingTime: 1,
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
    prompt: mockJournalPrompts[0],
    studySession: {
      duration: 45,
      activities: ["vocabulary", "listening", "flashcards"],
      wordsLearned: 12,
      lessonsCompleted: 2,
    },
  },
  {
    id: "entry-2",
    title: "Cultural Shock: The Concept of Time",
    content:
      "Today I learned something fascinating about Spanish culture that really surprised me. The concept of time is so different! I discovered that in many Spanish-speaking countries, being 15-30 minutes late is not only acceptable but often expected. This is such a contrast to my culture where punctuality is highly valued. I also learned about 'hora española' or 'Spanish time' which refers to this more relaxed approach to scheduling. It makes me think about how language and culture are so interconnected. When I eventually visit Spain or Latin America, I'll need to adjust my mindset about time. This cultural awareness is making me appreciate the language learning journey even more.",
    mood: "confident",
    tags: ["culture", "time", "spain", "mindset"],
    language: "english",
    wordCount: 134,
    readingTime: 1,
    createdAt: "2024-01-18T15:45:00Z",
    updatedAt: "2024-01-18T15:45:00Z",
    prompt: mockJournalPrompts[1],
    reflection: {
      whatLearned: "Cultural differences in time perception",
      challenges: "Understanding cultural nuances beyond language",
      improvements: "Better cultural awareness",
      goals: "Learn more about cultural practices",
    },
  },
  {
    id: "entry-3",
    title: "Día difícil con el subjuntivo",
    content:
      "Hoy fue un día difícil. Estoy estudiando el modo subjuntivo y es muy complicado para mí. No entiendo cuándo debo usarlo. Las reglas parecen contradictorias. Por ejemplo, '¿Por qué digo 'Espero que tengas un buen día' y no 'Espero que tienes un buen día'?' Me siento frustrado porque pensé que estaba progresando bien. Pero mi profesora me dijo que es normal sentirse así con el subjuntivo. Voy a practicar más y ser paciente conmigo mismo. Mañana intentaré de nuevo.",
    mood: "frustrated",
    tags: ["subjunctive", "grammar", "difficulty", "patience"],
    language: "spanish",
    wordCount: 89,
    readingTime: 1,
    createdAt: "2024-01-16T20:15:00Z",
    updatedAt: "2024-01-16T20:15:00Z",
    reflection: {
      whatLearned: "Subjunctive mood rules",
      challenges: "Understanding when to use subjunctive",
      improvements: "Need more practice with examples",
      goals: "Master basic subjunctive patterns",
    },
  },
  {
    id: "entry-4",
    title: "My Monthly Goals for February",
    content:
      "After a month of consistent study, I'm feeling ready to set some ambitious but achievable goals for February. Here's what I want to accomplish:\n\n1. Vocabulary: Learn 60 new words (15 per week)\n2. Grammar: Master the preterite vs imperfect tenses\n3. Listening: Complete 8 podcast episodes on ZeroSpeak\n4. Speaking: Have at least 4 conversation practice sessions\n5. Reading: Finish one short story in Spanish\n6. Writing: Write in my journal 5 times per week\n\nI think these goals are realistic based on my progress so far. The key is consistency rather than intensity. I've learned that studying 30 minutes daily is better than cramming for 3 hours once a week. ¡Vámonos!",
    mood: "confident",
    tags: ["goals", "planning", "vocabulary", "grammar", "consistency"],
    language: "english",
    wordCount: 142,
    readingTime: 1,
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
    prompt: mockJournalPrompts[3],
  },
  {
    id: "entry-5",
    title: "Conversación imaginaria con Miguel",
    content:
      "¡Hola Miguel! ¿Cómo estás? Te voy a contar sobre mi rutina matutina. Primero, me despierto a las seis y media de la mañana. Después, me ducho y me cepillo los dientes. Luego desayuno cereales con leche y tomo café. A las siete y media salgo de casa para ir al trabajo. Durante el camino, escucho podcasts en español para practicar. Llego a la oficina a las ocho. ¿Y tú? ¿A qué hora te levantas? ¿Qué desayunas? Me gustaría conocer tu rutina también. ¡Espero tu respuesta!",
    mood: "neutral",
    tags: ["conversation", "routine", "daily-activities", "practice"],
    language: "spanish",
    wordCount: 98,
    readingTime: 1,
    createdAt: "2024-01-14T12:30:00Z",
    updatedAt: "2024-01-14T12:30:00Z",
    prompt: mockJournalPrompts[4],
  },
  {
    id: "entry-6",
    title: "Breakthrough with Listening Comprehension",
    content:
      "Today was amazing! I had a major breakthrough with listening comprehension. For the first time, I watched a 10-minute Spanish YouTube video about cooking and understood about 70% without subtitles. Six months ago, I would have understood maybe 10%. The speaker was talking about making paella, and I caught words like 'ingredientes', 'camarones', 'azafrán', and 'arroz'. \n\nWhat really helped was that I've been following the advice to listen to content slightly above my level regularly, even if I don't understand everything. My brain has been getting used to the rhythm and sounds of Spanish. I also realized that context helps enormously - when someone is cooking and holding tomatoes, 'tomates' becomes obvious even if you don't catch it clearly.\n\nThis gives me so much confidence to keep pushing forward. Next goal: understand 80% of a 15-minute video!",
    mood: "excited",
    tags: ["listening", "breakthrough", "youtube", "cooking", "confidence"],
    language: "english",
    wordCount: 159,
    readingTime: 1,
    createdAt: "2024-01-12T19:45:00Z",
    updatedAt: "2024-01-12T19:45:00Z",
    reflection: {
      whatLearned: "Listening comprehension strategies",
      challenges: "Understanding fast native speech",
      improvements: "70% comprehension without subtitles",
      goals: "Reach 80% comprehension on longer videos",
    },
  },
];

// Dynamic storage for new entries
let dynamicEntries: JournalEntry[] = [];

export const addJournalEntry = (entry: JournalEntry): void => {
  dynamicEntries.push(entry);
};

export const updateJournalEntry = (entry: JournalEntry): void => {
  const index = dynamicEntries.findIndex((e) => e.id === entry.id);
  if (index !== -1) {
    dynamicEntries[index] = entry;
  } else {
    // Update in mock data
    const mockIndex = mockJournalEntries.findIndex((e) => e.id === entry.id);
    if (mockIndex !== -1) {
      mockJournalEntries[mockIndex] = entry;
    }
  }
};

export const deleteJournalEntry = (id: string): void => {
  dynamicEntries = dynamicEntries.filter((e) => e.id !== id);
  const mockIndex = mockJournalEntries.findIndex((e) => e.id === id);
  if (mockIndex !== -1) {
    mockJournalEntries.splice(mockIndex, 1);
  }
};

export const getAllJournalEntries = (): JournalEntry[] => {
  return [...mockJournalEntries, ...dynamicEntries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const fetchJournalEntries = async (
  filters?: JournalFilters
): Promise<JournalEntry[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let entries = getAllJournalEntries();

  if (!filters) return entries;

  // Apply filters
  if (filters.mood) {
    entries = entries.filter((entry) => entry.mood === filters.mood);
  }

  if (filters.language) {
    entries = entries.filter((entry) => entry.language === filters.language);
  }

  if (filters.tags && filters.tags.length > 0) {
    entries = entries.filter((entry) =>
      filters.tags!.some((tag) => entry.tags.includes(tag))
    );
  }

  if (filters.promptCategory) {
    entries = entries.filter(
      (entry) => entry.prompt?.category === filters.promptCategory
    );
  }

  if (filters.dateRange) {
    const start = new Date(filters.dateRange.start);
    const end = new Date(filters.dateRange.end);
    entries = entries.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return entryDate >= start && entryDate <= end;
    });
  }

  // Apply sorting
  entries.sort((a, b) => {
    switch (filters.sortBy) {
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "wordCount":
        return b.wordCount - a.wordCount;
      case "mood":
        const moodOrder = {
          excited: 5,
          confident: 4,
          neutral: 3,
          frustrated: 2,
          tired: 1,
        };
        return moodOrder[b.mood] - moodOrder[a.mood];
      case "newest":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  return entries;
};

export const fetchJournalEntryById = async (
  id: string
): Promise<JournalEntry | null> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return getAllJournalEntries().find((entry) => entry.id === id) || null;
};

export const fetchJournalPrompts = async (
  category?: string,
  level?: string
): Promise<JournalPrompt[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  let prompts = [...mockJournalPrompts];

  if (category && category !== "all") {
    prompts = prompts.filter((prompt) => prompt.category === category);
  }

  if (level && level !== "all") {
    prompts = prompts.filter((prompt) => prompt.level === level);
  }

  return prompts;
};

export const getJournalStats = async (): Promise<JournalStats> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const entries = getAllJournalEntries();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate streaks
  const sortedEntries = entries.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Simple streak calculation (consecutive days with entries)
  const today = new Date();
  let checkDate = new Date(today);

  for (let i = 0; i < 30; i++) {
    // Check last 30 days
    const hasEntry = entries.some((entry) => {
      const entryDate = new Date(entry.createdAt);
      return entryDate.toDateString() === checkDate.toDateString();
    });

    if (hasEntry) {
      if (i === 0 || tempStreak > 0) {
        tempStreak++;
        if (i === 0) currentStreak = tempStreak;
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      if (i === 0) currentStreak = 0;
      tempStreak = 0;
    }

    checkDate.setDate(checkDate.getDate() - 1);
  }

  // Entries this month
  const entriesThisMonth = entries.filter((entry) => {
    const entryDate = new Date(entry.createdAt);
    return (
      entryDate.getMonth() === currentMonth &&
      entryDate.getFullYear() === currentYear
    );
  }).length;

  // Words this month
  const wordsThisMonth = entries
    .filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return (
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, entry) => sum + entry.wordCount, 0);

  // Average mood (convert to numeric)
  const moodValues = {
    excited: 5,
    confident: 4,
    neutral: 3,
    frustrated: 2,
    tired: 1,
  };
  const averageMood =
    entries.length > 0
      ? entries.reduce((sum, entry) => sum + moodValues[entry.mood], 0) /
        entries.length
      : 3;

  // Top tags
  const tagCounts: { [key: string]: number } = {};
  entries.forEach((entry) => {
    entry.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const topTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Favorite prompts
  const promptCounts: { [key: string]: number } = {};
  entries.forEach((entry) => {
    if (entry.prompt) {
      promptCounts[entry.prompt.id] = (promptCounts[entry.prompt.id] || 0) + 1;
    }
  });

  const favoritePrompts = Object.entries(promptCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([promptId]) => promptId);

  return {
    totalEntries: entries.length,
    totalWords: entries.reduce((sum, entry) => sum + entry.wordCount, 0),
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
    averageMood,
    entriesThisMonth,
    wordsThisMonth,
    favoritePrompts,
    topTags,
    progressMetrics: {
      vocabularyGrowth: 85, // Mock percentage
      confidenceLevel: Math.round(averageMood * 20), // Convert to percentage
      consistencyScore: Math.min(100, currentStreak * 10), // Mock score
    },
  };
};
