"use client";

import { useState, useRef, useEffect } from "react";
import { ContentItem } from "@/types/content";

interface SearchAndFiltersProps {
  filters: {
    type?: ContentItem["type"];
    level?: ContentItem["level"];
    topics?: string[];
  };
  searchQuery: string;
  onFiltersChange: (filters: {
    type?: ContentItem["type"];
    level?: ContentItem["level"];
    topics?: string[];
  }) => void;
  onSearchChange: (query: string) => void;
}

const contentTypes: {
  value: ContentItem["type"];
  label: string;
  icon: string;
}[] = [
  { value: "video", label: "Videos", icon: "🎥" },
  { value: "audio", label: "Audio", icon: "🎵" },
  { value: "story", label: "Stories", icon: "📚" },
  { value: "podcast", label: "Podcasts", icon: "🎙️" },
];

const levels: { value: ContentItem["level"]; label: string; icon: string }[] = [
  { value: "beginner", label: "Beginner", icon: "🌱" },
  { value: "intermediate", label: "Intermediate", icon: "⚡" },
  { value: "advanced", label: "Advanced", icon: "🚀" },
];

const topics = [
  "Daily Life",
  "Travel",
  "Food",
  "Culture",
  "History",
  "Science",
  "Technology",
  "Art",
  "Music",
  "Sports",
  "Nature",
  "Business",
  "Health",
  "Education",
  "Entertainment",
  "News",
];

export default function SearchAndFilters({
  filters,
  searchQuery,
  onFiltersChange,
  onSearchChange,
}: SearchAndFiltersProps) {
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const topicsScrollRef = useRef<HTMLDivElement>(null);

  // Sync search input with search query when it changes externally
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLevelDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check scroll position and update arrow visibility
  const checkScrollArrows = () => {
    if (topicsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = topicsScrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Initial check and resize listener
  useEffect(() => {
    checkScrollArrows();
    const handleResize = () => checkScrollArrows();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check arrows when topics change
  useEffect(() => {
    setTimeout(checkScrollArrows, 100);
  }, [filters.topics]);

  const scrollTopics = (direction: "left" | "right") => {
    if (topicsScrollRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        direction === "left"
          ? topicsScrollRef.current.scrollLeft - scrollAmount
          : topicsScrollRef.current.scrollLeft + scrollAmount;

      topicsScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleSearch = () => {
    onSearchChange(searchInput.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLevelChange = (level: ContentItem["level"]) => {
    onFiltersChange({
      ...filters,
      level: filters.level === level ? undefined : level,
    });
    setIsLevelDropdownOpen(false);
  };

  const handleTopicToggle = (topic: string) => {
    const currentTopics = filters.topics || [];
    const newTopics = currentTopics.includes(topic)
      ? currentTopics.filter((t) => t !== topic)
      : [...currentTopics, topic];

    onFiltersChange({
      ...filters,
      topics: newTopics.length > 0 ? newTopics : undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
    onSearchChange("");
    setSearchInput("");
  };

  const hasActiveFilters =
    searchQuery ||
    filters.type ||
    filters.level ||
    (filters.topics && filters.topics.length > 0);

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar, Difficulty Dropdown, and Type Filters */}
      <div className="flex items-center space-x-4">
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
            placeholder={isSearchFocused ? "" : "Search"}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`block w-full ${
              isSearchFocused ? "pl-10" : "pl-3"
            } pr-24 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:placeholder-slate-500 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput("");
                  onSearchChange("");
                }}
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

        {/* Difficulty Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsLevelDropdownOpen(!isLevelDropdownOpen)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all ${
              filters.level
                ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            <span>
              {filters.level
                ? `${levels.find((l) => l.value === filters.level)?.icon} ${
                    levels.find((l) => l.value === filters.level)?.label
                  }`
                : "Difficulty"}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${
                isLevelDropdownOpen ? "rotate-180" : ""
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

          {isLevelDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-10">
              <div className="py-1">
                {levels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => handleLevelChange(level.value)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-2 ${
                      filters.level === level.value
                        ? "bg-emerald-100 text-emerald-800"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{level.icon}</span>
                    <span>{level.label}</span>
                  </button>
                ))}
                {filters.level && (
                  <>
                    <div className="border-t border-slate-200 my-1"></div>
                    <button
                      onClick={() => handleLevelChange(filters.level!)}
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

        {/* Content Type Filters */}
        <div className="flex space-x-2">
          {contentTypes.map((type) => (
            <button
              key={type.value}
              onClick={() =>
                onFiltersChange({
                  ...filters,
                  type: filters.type === type.value ? undefined : type.value,
                })
              }
              className={`flex items-center space-x-2 px-3 py-3 rounded-xl border transition-all whitespace-nowrap ${
                filters.type === type.value
                  ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <span>{type.icon}</span>
              <span className="text-sm">{type.label}</span>
            </button>
          ))}
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
      </div>

      {/* Topic Filters with Arrow Navigation */}
      <div className="flex items-center space-x-3">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scrollTopics("left")}
            className="flex-shrink-0 p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
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
        )}

        {/* Topics Container */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={topicsScrollRef}
            className="flex space-x-2 overflow-x-auto scrollbar-none"
            onScroll={checkScrollArrows}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicToggle(topic)}
                className={`px-3 py-2 rounded-lg border text-sm transition-all whitespace-nowrap flex-shrink-0 ${
                  filters.topics?.includes(topic)
                    ? "bg-blue-100 border-blue-300 text-blue-800"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scrollTopics("right")}
            className="flex-shrink-0 p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
