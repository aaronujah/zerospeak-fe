import { FlashCard, FlashCardDeck, FlashCardStats } from "@/types/flashcards";

// Helper function to create a date string for next review
const getNextReviewDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const basicVocabularyCards: FlashCard[] = [
  {
    id: "card-1",
    front: "Hello",
    back: "Hola",
    hint: "Common greeting",
    tags: ["greetings", "basic"],
    difficulty: "easy",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: getNextReviewDate(1),
  },
  {
    id: "card-2",
    front: "Thank you",
    back: "Gracias",
    hint: "Expression of gratitude",
    tags: ["courtesy", "basic"],
    difficulty: "easy",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: getNextReviewDate(1),
  },
  {
    id: "card-3",
    front: "House",
    back: "Casa",
    hint: "A place where people live",
    tags: ["nouns", "home"],
    difficulty: "easy",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    interval: 2,
    repetition: 1,
    easeFactor: 2.5,
    nextReview: getNextReviewDate(2),
    lastReviewed: "2024-01-15T00:00:00Z",
  },
  {
    id: "card-4",
    front: "Water",
    back: "Agua",
    hint: "Essential liquid for life",
    tags: ["nouns", "drinks"],
    difficulty: "easy",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    interval: 4,
    repetition: 2,
    easeFactor: 2.6,
    nextReview: getNextReviewDate(4),
    lastReviewed: "2024-01-18T00:00:00Z",
  },
  {
    id: "card-5",
    front: "Good morning",
    back: "Buenos días",
    hint: "Morning greeting",
    tags: ["greetings", "time"],
    difficulty: "medium",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: getNextReviewDate(1),
  },
];

const grammarCards: FlashCard[] = [
  {
    id: "grammar-1",
    front: "I am (permanent characteristic)",
    back: "Soy",
    hint: "Use SER for permanent states",
    tags: ["verbs", "ser-estar", "grammar"],
    difficulty: "medium",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: getNextReviewDate(1),
  },
  {
    id: "grammar-2",
    front: "I am (temporary state/location)",
    back: "Estoy",
    hint: "Use ESTAR for temporary states and locations",
    tags: ["verbs", "ser-estar", "grammar"],
    difficulty: "medium",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: getNextReviewDate(1),
  },
  {
    id: "grammar-3",
    front: "The book (masculine)",
    back: "El libro",
    hint: "Masculine nouns use 'el'",
    tags: ["articles", "gender", "grammar"],
    difficulty: "easy",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    interval: 3,
    repetition: 2,
    easeFactor: 2.7,
    nextReview: getNextReviewDate(3),
    lastReviewed: "2024-01-20T00:00:00Z",
  },
  {
    id: "grammar-4",
    front: "The table (feminine)",
    back: "La mesa",
    hint: "Feminine nouns use 'la'",
    tags: ["articles", "gender", "grammar"],
    difficulty: "easy",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    interval: 3,
    repetition: 2,
    easeFactor: 2.7,
    nextReview: getNextReviewDate(3),
    lastReviewed: "2024-01-20T00:00:00Z",
  },
];

const phrasesCards: FlashCard[] = [
  {
    id: "phrase-1",
    front: "How are you?",
    back: "¿Cómo estás?",
    hint: "Casual way to ask about someone's state",
    tags: ["questions", "greetings", "casual"],
    difficulty: "medium",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: getNextReviewDate(1),
  },
  {
    id: "phrase-2",
    front: "Excuse me / Sorry",
    back: "Perdón / Disculpe",
    hint: "Used to apologize or get attention",
    tags: ["courtesy", "apologies"],
    difficulty: "medium",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    interval: 2,
    repetition: 1,
    easeFactor: 2.5,
    nextReview: getNextReviewDate(2),
    lastReviewed: "2024-01-19T00:00:00Z",
  },
  {
    id: "phrase-3",
    front: "Where is the bathroom?",
    back: "¿Dónde está el baño?",
    hint: "Essential question for travelers",
    tags: ["questions", "travel", "locations"],
    difficulty: "hard",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: getNextReviewDate(1),
  },
];

export const mockFlashCardDecks: FlashCardDeck[] = [
  {
    id: "deck-vocabulary-basic",
    name: "Basic Vocabulary",
    description: "Essential Spanish words for beginners",
    category: "vocabulary",
    level: "beginner",
    cards: basicVocabularyCards,
    isDefault: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-22T00:00:00Z",
    totalCards: basicVocabularyCards.length,
    newCards: basicVocabularyCards.filter((card) => card.repetition === 0)
      .length,
    learningCards: basicVocabularyCards.filter(
      (card) => card.repetition > 0 && card.repetition < 3
    ).length,
    reviewCards: basicVocabularyCards.filter(
      (card) => card.repetition >= 3 && card.interval < 21
    ).length,
    masteredCards: basicVocabularyCards.filter((card) => card.interval >= 21)
      .length,
  },
  {
    id: "deck-grammar-fundamentals",
    name: "Grammar Fundamentals",
    description: "Core Spanish grammar concepts and rules",
    category: "grammar",
    level: "beginner",
    cards: grammarCards,
    isDefault: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-22T00:00:00Z",
    totalCards: grammarCards.length,
    newCards: grammarCards.filter((card) => card.repetition === 0).length,
    learningCards: grammarCards.filter(
      (card) => card.repetition > 0 && card.repetition < 3
    ).length,
    reviewCards: grammarCards.filter(
      (card) => card.repetition >= 3 && card.interval < 21
    ).length,
    masteredCards: grammarCards.filter((card) => card.interval >= 21).length,
  },
  {
    id: "deck-phrases-survival",
    name: "Survival Phrases",
    description: "Essential phrases for Spanish-speaking countries",
    category: "phrases",
    level: "intermediate",
    cards: phrasesCards,
    isDefault: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-22T00:00:00Z",
    totalCards: phrasesCards.length,
    newCards: phrasesCards.filter((card) => card.repetition === 0).length,
    learningCards: phrasesCards.filter(
      (card) => card.repetition > 0 && card.repetition < 3
    ).length,
    reviewCards: phrasesCards.filter(
      (card) => card.repetition >= 3 && card.interval < 21
    ).length,
    masteredCards: phrasesCards.filter((card) => card.interval >= 21).length,
  },
  {
    id: "deck-culture-customs",
    name: "Culture & Customs",
    description:
      "Cultural knowledge and customs from Spanish-speaking countries",
    category: "culture",
    level: "intermediate",
    cards: [], // Empty for now, can be populated later
    isDefault: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-22T00:00:00Z",
    totalCards: 0,
    newCards: 0,
    learningCards: 0,
    reviewCards: 0,
    masteredCards: 0,
  },
];

// Dynamic storage for user-created decks (in a real app, this would be in a database)
let dynamicDecks: FlashCardDeck[] = [];

export const addDynamicDeck = (deck: FlashCardDeck): void => {
  dynamicDecks.push(deck);
};

export const updateDynamicDeck = (deck: FlashCardDeck): void => {
  const index = dynamicDecks.findIndex((d) => d.id === deck.id);
  if (index !== -1) {
    dynamicDecks[index] = deck;
  }
};

export const getAllDecks = (): FlashCardDeck[] => {
  return [...mockFlashCardDecks, ...dynamicDecks];
};

export const fetchFlashCardDecks = async (): Promise<FlashCardDeck[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getAllDecks();
};

export const fetchFlashCardDeckById = async (
  id: string
): Promise<FlashCardDeck | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  const allDecks = getAllDecks();
  return allDecks.find((deck) => deck.id === id) || null;
};

export const getFlashCardStats = async (): Promise<FlashCardStats> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const allDecks = getAllDecks();
  const totalCards = allDecks.reduce((sum, deck) => sum + deck.totalCards, 0);
  const deckStats: FlashCardStats["deckStats"] = {};

  allDecks.forEach((deck) => {
    deckStats[deck.id] = {
      name: deck.name,
      totalCards: deck.totalCards,
      masteredCards: deck.masteredCards,
      accuracy:
        deck.totalCards > 0 ? (deck.masteredCards / deck.totalCards) * 100 : 0,
      lastStudied: "2024-01-22",
    };
  });

  return {
    totalDecks: allDecks.length,
    totalCards,
    cardsStudiedToday: 15,
    studyStreak: 7,
    averageAccuracy: 82,
    totalStudyTime: 145, // minutes
    deckStats,
  };
};
