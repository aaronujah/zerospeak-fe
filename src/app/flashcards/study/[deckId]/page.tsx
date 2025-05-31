"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AppLayout from "@/components/layout/AppLayout";
import { FlashCard, FlashCardDeck, ReviewResult } from "@/types/flashcards";
import { fetchFlashCardDeckById } from "@/lib/mockFlashcards";

interface StudySession {
  cardsStudied: number;
  correctAnswers: number;
  startTime: Date;
}

export default function StudyPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.deckId as string;

  const [deck, setDeck] = useState<FlashCardDeck | null>(null);
  const [currentCards, setCurrentCards] = useState<FlashCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<StudySession>({
    cardsStudied: 0,
    correctAnswers: 0,
    startTime: new Date(),
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    loadDeck();
  }, [deckId]);

  const loadDeck = async () => {
    try {
      const fetchedDeck = await fetchFlashCardDeckById(deckId);
      if (!fetchedDeck) {
        router.push("/flashcards");
        return;
      }

      setDeck(fetchedDeck);

      // Get cards that need review (new, learning, or due for review)
      const studyCards = fetchedDeck.cards.filter((card) => {
        const now = new Date();
        const nextReview = new Date(card.nextReview);
        return card.repetition === 0 || nextReview <= now;
      });

      if (studyCards.length === 0) {
        // No cards to study, show completion immediately
        setIsComplete(true);
      } else {
        setCurrentCards(studyCards);
      }
    } catch (error) {
      console.error("Failed to load deck:", error);
      router.push("/flashcards");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentCard = () => {
    if (currentCards.length === 0 || currentCardIndex >= currentCards.length) {
      return null;
    }
    return currentCards[currentCardIndex];
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleDifficultySelect = (difficulty: ReviewResult["difficulty"]) => {
    const currentCard = getCurrentCard();
    if (!currentCard) return;

    // Update session stats
    const newSession = {
      ...session,
      cardsStudied: session.cardsStudied + 1,
      correctAnswers:
        session.correctAnswers +
        (difficulty === "good" || difficulty === "easy" ? 1 : 0),
    };
    setSession(newSession);

    // Move to next card or complete session
    if (currentCardIndex + 1 >= currentCards.length) {
      setIsComplete(true);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const handleFinishSession = () => {
    router.push("/flashcards");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "again":
        return "bg-red-500 hover:bg-red-600";
      case "hard":
        return "bg-orange-500 hover:bg-orange-600";
      case "good":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "easy":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-slate-500 hover:bg-slate-600";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "again":
        return "Again";
      case "hard":
        return "Hard";
      case "good":
        return "Good";
      case "easy":
        return "Easy";
      default:
        return difficulty;
    }
  };

  const getSessionAccuracy = () => {
    if (session.cardsStudied === 0) return 0;
    return Math.round((session.correctAnswers / session.cardsStudied) * 100);
  };

  const getSessionDuration = () => {
    const now = new Date();
    const diffMs = now.getTime() - session.startTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    return diffMins < 1 ? "< 1 min" : `${diffMins} min`;
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading deck...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!deck) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Deck not found
            </h2>
            <p className="text-slate-600 mb-4">
              The requested deck could not be found.
            </p>
            <button
              onClick={() => router.push("/flashcards")}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Back to Flashcards
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const currentCard = getCurrentCard();

  if (isComplete || !currentCard) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Study Session Complete!
            </h2>
            <p className="text-slate-600 mb-6">
              Great job studying {deck.name}
            </p>

            {/* Session Summary */}
            <div className="bg-slate-50 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Cards Studied:</span>
                <span className="font-medium">{session.cardsStudied}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Accuracy:</span>
                <span className="font-medium">{getSessionAccuracy()}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Duration:</span>
                <span className="font-medium">{getSessionDuration()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleFinishSession}
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Back to Flashcards
              </button>
              <button
                onClick={loadDeck}
                className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Study Again
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push("/flashcards")}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {deck.name}
                </h1>
                <p className="text-slate-600">
                  Card {currentCardIndex + 1} of {currentCards.length}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="text-right">
              <div className="text-sm text-slate-600 mb-1">Progress</div>
              <div className="w-32 bg-slate-200 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(currentCardIndex / currentCards.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Flashcard */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6 min-h-[400px] flex flex-col justify-center">
            <div className="text-center">
              {/* Card Front */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  {currentCard.front}
                </h2>
                {currentCard.hint && !showAnswer && (
                  <p className="text-slate-500 italic">
                    Hint: {currentCard.hint}
                  </p>
                )}
              </div>

              {/* Card Back (shown after clicking Show Answer) */}
              {showAnswer && (
                <div className="border-t border-slate-200 pt-8">
                  <h3 className="text-2xl font-semibold text-emerald-600 mb-4">
                    {currentCard.back}
                  </h3>
                  {currentCard.hint && (
                    <p className="text-slate-500 text-sm mb-4">
                      Hint: {currentCard.hint}
                    </p>
                  )}
                  {currentCard.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                      {currentCard.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            {!showAnswer ? (
              <button
                onClick={handleShowAnswer}
                className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Show Answer
              </button>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
                {(["again", "hard", "good", "easy"] as const).map(
                  (difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => handleDifficultySelect(difficulty)}
                      className={`px-4 py-3 text-white rounded-lg transition-colors font-medium ${getDifficultyColor(
                        difficulty
                      )}`}
                    >
                      {getDifficultyText(difficulty)}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Session Stats */}
          <div className="mt-8 bg-white rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-slate-900">
                  {session.cardsStudied}
                </div>
                <div className="text-xs text-slate-500">Cards Studied</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">
                  {getSessionAccuracy()}%
                </div>
                <div className="text-xs text-slate-500">Accuracy</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">
                  {getSessionDuration()}
                </div>
                <div className="text-xs text-slate-500">Duration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
