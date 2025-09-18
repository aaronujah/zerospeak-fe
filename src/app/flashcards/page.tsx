"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/layout/AppLayout";
import AuthGuard from "@/components/auth/AuthGuard";
import AuthLoading from "@/components/auth/AuthLoading";
import { FlashCardDeck } from "@/types/flashcards";
import {
  useFlashcardDecks,
  useCreateFlashcardDeck,
} from "@/hooks/useFlashcards";

const DeckCard = ({ deck }: { deck: FlashCardDeck }) => {
  const router = useRouter();

  const categoryIcons = {
    vocabulary: "📚",
    grammar: "🔤",
    phrases: "💬",
    culture: "🎭",
    custom: "⭐",
  };

  const handleStudyDeck = () => {
    router.push(`/flashcards/study/${deck.id}`);
  };

  const handleBrowseDeck = () => {
    router.push(`/flashcards/browse/${deck.id}`);
  };

  const getDueCards = () => {
    return (
      (deck.newCards || 0) + (deck.learningCards || 0) + (deck.reviewCards || 0)
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{categoryIcons[deck.category]}</div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-slate-900">{deck.title}</h3>
          </div>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          {deck.isDefault && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Default
            </span>
          )}
        </div>
      </div>

      {/* Description spanning full width */}
      <p className="text-sm text-slate-600 mb-4 flex-grow">
        {deck.description}
      </p>

      {/* Progress Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">
            {deck.newCards || 0}
          </div>
          <div className="text-xs text-slate-500">New</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600">
            {deck.learningCards || 0}
          </div>
          <div className="text-xs text-slate-500">Learning</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-600">
            {deck.reviewCards || 0}
          </div>
          <div className="text-xs text-slate-500">Review</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-emerald-600">
            {deck.masteredCards || 0}
          </div>
          <div className="text-xs text-slate-500">Mastered</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Progress</span>
          <span>
            {deck.totalCards > 0
              ? `${Math.round(
                  ((deck.masteredCards || 0) / deck.totalCards) * 100
                )}%`
              : "0%"}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{
              width:
                deck.totalCards > 0
                  ? `${((deck.masteredCards || 0) / deck.totalCards) * 100}%`
                  : "0%",
            }}
          ></div>
        </div>
      </div>

      {/* Actions - Always at bottom */}
      <div className="flex space-x-2 mt-auto">
        {deck.totalCards > 0 ? (
          <>
            <button
              onClick={handleStudyDeck}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                getDueCards() > 0
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
            >
              {getDueCards() > 0 ? `Study (${getDueCards()})` : "Review"}
            </button>
            <button
              onClick={handleBrowseDeck}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Browse
            </button>
          </>
        ) : (
          <>
            <div className="flex-1 py-2 px-4 rounded-lg bg-slate-100 text-slate-500 text-center">
              No cards available
            </div>
            <button
              onClick={handleBrowseDeck}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Browse
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  color: string;
}) => (
  <div className={`bg-white rounded-xl p-4 border ${color}`}>
    <div className="flex items-center justify-between mb-3">
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${
          color.includes("emerald")
            ? "bg-emerald-100"
            : color.includes("blue")
            ? "bg-blue-100"
            : color.includes("purple")
            ? "bg-purple-100"
            : "bg-orange-100"
        }`}
      >
        <span className="text-xl">{icon}</span>
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-xl font-bold text-slate-900">{value}</p>
      <p className="text-xs font-medium text-slate-600">{title}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  </div>
);

function FlashcardsContent() {
  const [showImportModal, setShowImportModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Use API hooks
  const { data: decks, loading, error, refetch } = useFlashcardDecks();
  const { mutate: createDeck, loading: creating } = useCreateFlashcardDeck();

  // Form states for create deck
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    languageId: "es", // Default to Spanish
    difficultyLevel: 1,
    tags: [] as string[],
  });
  const [formErrors, setFormErrors] = useState<{
    title?: string;
    languageId?: string;
  }>({});

  const handleImportDeck = () => {
    setShowImportModal(true);
  };

  const handleCreateDeck = () => {
    setShowCreateModal(true);
    // Reset form when opening modal
    setCreateForm({
      title: "",
      description: "",
      languageId: "es",
      difficultyLevel: 1,
      tags: [],
    });
    setFormErrors({});
  };

  const validateCreateForm = () => {
    const errors: { title?: string; languageId?: string } = {};

    if (!createForm.title.trim()) {
      errors.title = "Deck title is required";
    }

    if (!createForm.languageId) {
      errors.languageId = "Language is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async () => {
    if (!validateCreateForm()) {
      return;
    }

    try {
      await createDeck({
        title: createForm.title.trim(),
        description: createForm.description.trim() || "No description provided",
        languageId: createForm.languageId,
        difficultyLevel: createForm.difficultyLevel,
        tags: createForm.tags,
      });

      // Close modal and reset form
      setShowCreateModal(false);
      setCreateForm({
        title: "",
        description: "",
        languageId: "es",
        difficultyLevel: 1,
        tags: [],
      });
      setFormErrors({});

      // Refetch decks to show the new one
      refetch();
    } catch (error) {
      console.error("Failed to create deck:", error);
    }
  };

  const handleFormChange = (
    field: keyof typeof createForm,
    value: string | number
  ) => {
    setCreateForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-slate-200 rounded w-64"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    Flashcards
                  </h1>
                  <p className="text-slate-600 mt-1">
                    Master Spanish with spaced repetition learning
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleImportDeck}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  <span>Import Deck</span>
                </button>
                <button
                  onClick={handleCreateDeck}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Create Deck</span>
                </button>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">
                Error loading flashcards: {error.message}
              </p>
              <button
                onClick={() => refetch()}
                className="mt-2 text-red-600 hover:text-red-700 font-medium"
              >
                Try again
              </button>
            </div>
          )}

          {/* Deck Grid */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Your Decks
            </h2>
            {decks && decks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks.map((deck) => (
                  <DeckCard key={deck.id} deck={deck} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No decks found
                </h3>
                <p className="text-slate-600 mb-4">
                  Create your first deck or import existing ones to get started.
                </p>
                <button
                  onClick={handleImportDeck}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Import a deck
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50">
          {/* Invisible backdrop */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setShowImportModal(false)}
          ></div>
          <div className="flex min-h-full items-center justify-center p-4 pointer-events-none">
            <div
              className="relative transform overflow-hidden rounded-lg bg-white border border-gray-200 px-4 pt-5 pb-4 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <svg
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Import Deck
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Upload an Anki deck file (.apkg) or paste deck data to
                      import your flashcards.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose file
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept=".apkg,.csv,.json"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          APKG, CSV, JSON up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:col-start-2 sm:text-sm"
                    >
                      Import
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowImportModal(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Deck Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50">
          {/* Invisible backdrop */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setShowCreateModal(false)}
          ></div>
          <div className="flex min-h-full items-center justify-center p-4 pointer-events-none">
            <div
              className="relative transform overflow-hidden rounded-lg bg-white border border-gray-200 px-4 pt-5 pb-4 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <svg
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Create New Deck
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Create a new flashcard deck to start adding your own
                      cards.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deck Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter deck title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={createForm.title}
                      onChange={(e) =>
                        handleFormChange("title", e.target.value)
                      }
                    />
                    {formErrors.title && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.title}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter deck description..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={createForm.description}
                      onChange={(e) =>
                        handleFormChange("description", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={createForm.languageId}
                      onChange={(e) =>
                        handleFormChange("languageId", e.target.value)
                      }
                    >
                      <option value="es">🇪🇸 Spanish</option>
                      <option value="fr">🇫🇷 French</option>
                      <option value="de">🇩🇪 German</option>
                      <option value="it">🇮🇹 Italian</option>
                      <option value="pt">🇵🇹 Portuguese</option>
                      <option value="ja">🇯🇵 Japanese</option>
                      <option value="ko">🇰🇷 Korean</option>
                      <option value="zh">🇨🇳 Chinese</option>
                    </select>
                    {formErrors.languageId && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.languageId}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={createForm.difficultyLevel}
                      onChange={(e) =>
                        handleFormChange(
                          "difficultyLevel",
                          parseInt(e.target.value)
                        )
                      }
                    >
                      <option value={1}>1 - Easy</option>
                      <option value={2}>2 - Easy-Medium</option>
                      <option value={3}>3 - Medium</option>
                      <option value={4}>4 - Medium-Hard</option>
                      <option value={5}>5 - Hard</option>
                    </select>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:col-start-2 sm:text-sm"
                      onClick={handleCreateSubmit}
                      disabled={creating}
                    >
                      {creating ? "Creating..." : "Create Deck"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default function FlashcardsPage() {
  return (
    <AuthGuard fallback={<AuthLoading />}>
      <FlashcardsContent />
    </AuthGuard>
  );
}
