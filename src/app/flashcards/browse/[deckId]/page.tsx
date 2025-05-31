"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import AppLayout from "@/components/layout/AppLayout";
import { FlashCard, FlashCardDeck } from "@/types/flashcards";
import {
  fetchFlashCardDeckById,
  updateDynamicDeck,
} from "@/lib/mockFlashcards";

const CardItem = ({ card, index }: { card: FlashCard; index: number }) => {
  const [showBack, setShowBack] = useState(false);

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  const getStatusColor = () => {
    if (card.repetition === 0) return "bg-blue-100 text-blue-800";
    if (card.repetition < 3) return "bg-orange-100 text-orange-800";
    if (card.interval < 21) return "bg-yellow-100 text-yellow-800";
    return "bg-emerald-100 text-emerald-800";
  };

  const getStatusText = () => {
    if (card.repetition === 0) return "New";
    if (card.repetition < 3) return "Learning";
    if (card.interval < 21) return "Review";
    return "Mastered";
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="text-sm text-slate-500">Card {index + 1}</div>
        <div className="flex space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
          >
            {getStatusText()}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              difficultyColors[card.difficulty]
            }`}
          >
            {card.difficulty}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Front */}
        <div>
          <div className="text-xs font-medium text-slate-500 mb-1">FRONT</div>
          <div className="text-lg font-semibold text-slate-900">
            {card.front}
          </div>
        </div>

        {/* Back */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs font-medium text-slate-500">BACK</div>
            <button
              onClick={() => setShowBack(!showBack)}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
            >
              {showBack ? "Hide" : "Show"}
            </button>
          </div>
          {showBack && (
            <div className="text-lg font-semibold text-emerald-600">
              {card.back}
            </div>
          )}
        </div>

        {/* Hint */}
        {card.hint && (
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">HINT</div>
            <div className="text-sm text-slate-600 italic">{card.hint}</div>
          </div>
        )}

        {/* Tags */}
        {card.tags.length > 0 && (
          <div>
            <div className="text-xs font-medium text-slate-500 mb-2">TAGS</div>
            <div className="flex flex-wrap gap-1">
              {card.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="pt-2 border-t border-slate-100">
          <div className="grid grid-cols-3 gap-4 text-xs text-slate-500">
            <div>
              <div className="font-medium">Reviews</div>
              <div>{card.repetition}</div>
            </div>
            <div>
              <div className="font-medium">Interval</div>
              <div>{card.interval} days</div>
            </div>
            <div>
              <div className="font-medium">Next Review</div>
              <div>{new Date(card.nextReview).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BrowsePage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.deckId as string;

  const [deck, setDeck] = useState<FlashCardDeck | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("order");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  // Form states for add card
  const [addCardForm, setAddCardForm] = useState({
    front: "",
    back: "",
    hint: "",
    tags: "",
  });
  const [cardFormErrors, setCardFormErrors] = useState<{
    front?: string;
    back?: string;
  }>({});

  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions = [
    { value: "all", label: "All Cards", icon: "🃏" },
    { value: "new", label: "New", icon: "🔵" },
    { value: "learning", label: "Learning", icon: "🟠" },
    { value: "review", label: "Review", icon: "🟡" },
    { value: "mastered", label: "Mastered", icon: "🟢" },
  ];

  const sortOptions = [
    { value: "order", label: "Original Order", icon: "📋" },
    { value: "front", label: "Front (A-Z)", icon: "🔤" },
    { value: "difficulty", label: "Difficulty", icon: "📊" },
    { value: "repetition", label: "Most Reviewed", icon: "🔄" },
    { value: "interval", label: "Longest Interval", icon: "⏱️" },
  ];

  useEffect(() => {
    loadDeck();
  }, [deckId]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadDeck = async () => {
    try {
      const fetchedDeck = await fetchFlashCardDeckById(deckId);
      if (!fetchedDeck) {
        router.push("/flashcards");
        return;
      }
      setDeck(fetchedDeck);
    } catch (error) {
      console.error("Failed to load deck:", error);
      router.push("/flashcards");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = () => {
    setShowAddCardModal(true);
    // Reset form when opening modal
    setAddCardForm({
      front: "",
      back: "",
      hint: "",
      tags: "",
    });
    setCardFormErrors({});
  };

  const validateCardForm = () => {
    const errors: { front?: string; back?: string } = {};

    if (!addCardForm.front.trim()) {
      errors.front = "Front text is required";
    }

    if (!addCardForm.back.trim()) {
      errors.back = "Back text is required";
    }

    setCardFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCardSubmit = () => {
    if (!validateCardForm() || !deck) {
      return;
    }

    // Create new card object
    const newCard: FlashCard = {
      id: `card-${Date.now()}`,
      front: addCardForm.front.trim(),
      back: addCardForm.back.trim(),
      hint: addCardForm.hint.trim() || undefined,
      tags: addCardForm.tags.trim()
        ? addCardForm.tags.split(",").map((tag) => tag.trim())
        : [],
      difficulty: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      interval: 1,
      repetition: 0,
      easeFactor: 2.5,
      nextReview: new Date().toISOString(),
    };

    // Update deck with new card
    const updatedDeck = {
      ...deck,
      cards: [...deck.cards, newCard],
      totalCards: deck.totalCards + 1,
      newCards: deck.newCards + 1,
      updatedAt: new Date().toISOString(),
    };

    // Update dynamic storage if this is a user-created deck
    if (!deck.isDefault) {
      updateDynamicDeck(updatedDeck);
    }

    setDeck(updatedDeck);

    // Close modal and reset form
    setShowAddCardModal(false);
    setAddCardForm({
      front: "",
      back: "",
      hint: "",
      tags: "",
    });
    setCardFormErrors({});
  };

  const handleCardFormChange = (
    field: keyof typeof addCardForm,
    value: string
  ) => {
    setAddCardForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (cardFormErrors[field as keyof typeof cardFormErrors]) {
      setCardFormErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSearch = () => {
    // Search is handled in real-time, no action needed
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleStatusChange = (status: string) => {
    setFilterStatus(filterStatus === status ? "all" : status);
    setIsStatusDropdownOpen(false);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setIsSortDropdownOpen(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setSortBy("order");
  };

  const hasActiveFilters =
    searchTerm || filterStatus !== "all" || sortBy !== "order";

  const getFilteredAndSortedCards = () => {
    if (!deck) return [];

    const filtered = deck.cards.filter((card) => {
      const matchesSearch =
        card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.back.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "new" && card.repetition === 0) ||
        (filterStatus === "learning" &&
          card.repetition > 0 &&
          card.repetition < 3) ||
        (filterStatus === "review" &&
          card.repetition >= 3 &&
          card.interval < 21) ||
        (filterStatus === "mastered" && card.interval >= 21);

      return matchesSearch && matchesStatus;
    });

    // Sort cards
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "front":
          return a.front.localeCompare(b.front);
        case "difficulty":
          return a.difficulty.localeCompare(b.difficulty);
        case "repetition":
          return b.repetition - a.repetition;
        case "interval":
          return b.interval - a.interval;
        default: // order
          return a.front.localeCompare(b.front); // fallback to alphabetical
      }
    });

    return filtered;
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

  const filteredCards = getFilteredAndSortedCards();

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
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
                <p className="text-slate-600">Browse all cards in this deck</p>
              </div>
            </div>
            <div className="flex space-x-3">
              {/* Only show Add Card button for non-default decks */}
              {!deck.isDefault && (
                <button
                  onClick={handleAddCard}
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Add Card</span>
                </button>
              )}
              <button
                onClick={() => router.push(`/flashcards/study/${deck.id}`)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Start Studying
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            {/* Search Bar with Integrated Button */}
            <div className="w-96 relative">
              {isSearchFocused && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              )}
              <input
                type="text"
                placeholder={isSearchFocused ? "" : "Search cards..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`block w-full ${
                  isSearchFocused ? "pl-10" : "pl-3"
                } pr-24 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:placeholder-slate-500 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="p-1 mr-1 text-slate-400 hover:text-slate-600 rounded"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                <button
                  onClick={handleSearch}
                  className="m-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center"
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative" ref={statusDropdownRef}>
              <button
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all ${
                  filterStatus !== "all"
                    ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <span>
                  {filterStatus !== "all"
                    ? `${
                        statusOptions.find((s) => s.value === filterStatus)
                          ?.icon
                      } ${
                        statusOptions.find((s) => s.value === filterStatus)
                          ?.label
                      }`
                    : "Status"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isStatusDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isStatusDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-10">
                  <div className="py-1">
                    {statusOptions.map((status) => (
                      <button
                        key={status.value}
                        onClick={() => handleStatusChange(status.value)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-2 ${
                          filterStatus === status.value
                            ? "bg-emerald-100 text-emerald-800"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{status.icon}</span>
                        <span>{status.label}</span>
                      </button>
                    ))}
                    {filterStatus !== "all" && (
                      <>
                        <div className="border-t border-slate-200 my-1"></div>
                        <button
                          onClick={() => handleStatusChange(filterStatus)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-500 hover:bg-slate-50"
                        >
                          Clear selection
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative" ref={sortDropdownRef}>
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all ${
                  sortBy !== "order"
                    ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <span>
                  {sortBy !== "order"
                    ? `${sortOptions.find((s) => s.value === sortBy)?.icon} ${
                        sortOptions.find((s) => s.value === sortBy)?.label
                      }`
                    : "Sort by"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isSortDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isSortDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-10">
                  <div className="py-1">
                    {sortOptions.map((sort) => (
                      <button
                        key={sort.value}
                        onClick={() => handleSortChange(sort.value)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-2 ${
                          sortBy === sort.value
                            ? "bg-emerald-100 text-emerald-800"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{sort.icon}</span>
                        <span>{sort.label}</span>
                      </button>
                    ))}
                    {sortBy !== "order" && (
                      <>
                        <div className="border-t border-slate-200 my-1"></div>
                        <button
                          onClick={() => handleSortChange("order")}
                          className="w-full text-left px-4 py-2 text-sm text-slate-500 hover:bg-slate-50"
                        >
                          Clear selection
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Clear All Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                Clear all
              </button>
            )}

            {/* Results Count */}
            <div className="ml-auto">
              <span className="text-sm text-slate-600">
                Showing {filteredCards.length} of {deck.totalCards} cards
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card, index) => (
                <CardItem key={card.id} card={card} index={index} />
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
                No cards found
              </h3>
              <p className="text-slate-600 mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={clearFilters}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 z-50">
          {/* Invisible backdrop */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setShowAddCardModal(false)}
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
                    Add New Card
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Add a new flashcard to the &ldquo;{deck?.name}&rdquo;
                      deck.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Front (Question)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the front side of the card..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={addCardForm.front}
                      onChange={(e) =>
                        handleCardFormChange("front", e.target.value)
                      }
                    />
                    {cardFormErrors.front && (
                      <p className="text-red-500 text-xs mt-1">
                        {cardFormErrors.front}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Back (Answer)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the back side of the card..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={addCardForm.back}
                      onChange={(e) =>
                        handleCardFormChange("back", e.target.value)
                      }
                    />
                    {cardFormErrors.back && (
                      <p className="text-red-500 text-xs mt-1">
                        {cardFormErrors.back}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hint (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter a helpful hint..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={addCardForm.hint}
                      onChange={(e) =>
                        handleCardFormChange("hint", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter tags separated by commas..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={addCardForm.tags}
                      onChange={(e) =>
                        handleCardFormChange("tags", e.target.value)
                      }
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Example: basic, grammar, verbs
                    </p>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:col-start-2 sm:text-sm"
                      onClick={handleCardSubmit}
                    >
                      Add Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddCardModal(false)}
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
