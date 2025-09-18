"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/layout/AppLayout";
import { Lesson } from "@/types/lessons";
import { useLessons } from "@/hooks/useLessons";

const LessonCard = ({ lesson }: { lesson: Lesson }) => {
  const router = useRouter();

  const handleLessonClick = () => {
    if (!lesson.isLocked) {
      router.push(`/lesson/${lesson.id}`);
    }
  };

  const typeIcons = {
    grammar: "📚",
    alphabet: "🔤",
    phonetics: "🔊",
    vocabulary: "💬",
    conversation: "🗣️",
  };

  const levelColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  const contentTypeColors = {
    video: "bg-red-100 text-red-700",
    audio: "bg-purple-100 text-purple-700",
    article: "bg-blue-100 text-blue-700",
    interactive: "bg-emerald-100 text-emerald-700",
  };

  const contentTypeIcons = {
    video: "🎥",
    audio: "🎵",
    article: "📄",
    interactive: "💫",
  };

  return (
    <div
      className={`border rounded-lg p-4 hover:shadow-md transition-shadow h-full flex flex-col ${
        lesson.isLocked
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:border-emerald-300"
      }`}
      onClick={handleLessonClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{typeIcons[lesson.type]}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <span>{lesson.duration} min</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  contentTypeColors[lesson.contentType]
                }`}
              >
                {contentTypeIcons[lesson.contentType]} {lesson.contentType}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              levelColors[lesson.level]
            }`}
          >
            {lesson.level}
          </span>
          {lesson.isLocked && <span className="text-gray-400">🔒</span>}
          {lesson.isCompleted && <span className="text-green-500">✅</span>}
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3 flex-grow">
        {lesson.description}
      </p>

      {!lesson.isLocked && (
        <button
          className={`w-full py-2 rounded-lg transition-colors mt-auto ${
            lesson.isCompleted
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          {lesson.isCompleted ? "Review Lesson" : "Start Lesson"}
        </button>
      )}
    </div>
  );
};

const LessonSkeleton = () => (
  <div className="border rounded-lg p-4 animate-pulse">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded"></div>
        <div>
          <div className="h-5 bg-gray-200 rounded w-32 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
    </div>
    <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
    <div className="h-10 bg-gray-200 rounded w-full"></div>
  </div>
);

export default function LessonPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  // Use API hooks
  const {
    data: lessons,
    loading,
    error,
    refetch,
  } = useLessons(
    "es", // Default to Spanish
    levelFilter === "all" ? undefined : levelFilter
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  const levels: { value: string; label: string; icon: string }[] = [
    { value: "beginner", label: "Beginner", icon: "🌱" },
    { value: "intermediate", label: "Intermediate", icon: "⚡" },
    { value: "advanced", label: "Advanced", icon: "🚀" },
  ];

  const types: { value: string; label: string; icon: string }[] = [
    { value: "grammar", label: "Grammar", icon: "📚" },
    { value: "alphabet", label: "Alphabet", icon: "🔤" },
    { value: "phonetics", label: "Phonetics", icon: "🔊" },
    { value: "vocabulary", label: "Vocabulary", icon: "💬" },
    { value: "conversation", label: "Conversation", icon: "🗣️" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLevelDropdownOpen(false);
      }
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTypeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLevelChange = (level: string) => {
    setLevelFilter(levelFilter === level ? "all" : level);
    setIsLevelDropdownOpen(false);
  };

  const handleTypeChange = (type: string) => {
    setTypeFilter(typeFilter === type ? "all" : type);
    setIsTypeDropdownOpen(false);
  };

  // Group lessons by type
  const lessonsByType = (lessons || []).reduce((acc, lesson) => {
    if (!acc[lesson.type]) acc[lesson.type] = [];
    acc[lesson.type].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  const typeLabels = {
    grammar: "Grammar",
    alphabet: "Alphabet & Pronunciation",
    phonetics: "Phonetics",
    vocabulary: "Vocabulary",
    conversation: "Conversation Practice",
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-xl">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Lessons</h1>
                <p className="text-slate-600 mt-1">
                  Master Spanish with structured lessons in grammar,
                  pronunciation, and conversation
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mb-6">
              {/* Type Filter - Same Style as Difficulty Filter */}
              <div className="relative" ref={typeDropdownRef}>
                <button
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all ${
                    typeFilter !== "all"
                      ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span>
                    {typeFilter !== "all"
                      ? `${types.find((t) => t.value === typeFilter)?.icon} ${
                          types.find((t) => t.value === typeFilter)?.label
                        }`
                      : "Lesson Type"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isTypeDropdownOpen ? "rotate-180" : ""
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

                {isTypeDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-10">
                    <div className="py-1">
                      {types.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => handleTypeChange(type.value)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-2 ${
                            typeFilter === type.value
                              ? "bg-emerald-100 text-emerald-800"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{type.icon}</span>
                          <span>{type.label}</span>
                        </button>
                      ))}
                      {typeFilter !== "all" && (
                        <>
                          <div className="border-t border-slate-200 my-1"></div>
                          <button
                            onClick={() => handleTypeChange(typeFilter)}
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

              {/* Level Filter - Feed Style Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLevelDropdownOpen(!isLevelDropdownOpen)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all ${
                    levelFilter !== "all"
                      ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span>
                    {levelFilter !== "all"
                      ? `${levels.find((l) => l.value === levelFilter)?.icon} ${
                          levels.find((l) => l.value === levelFilter)?.label
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
                            levelFilter === level.value
                              ? "bg-emerald-100 text-emerald-800"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{level.icon}</span>
                          <span>{level.label}</span>
                        </button>
                      ))}
                      {levelFilter !== "all" && (
                        <>
                          <div className="border-t border-slate-200 my-1"></div>
                          <button
                            onClick={() => handleLevelChange(levelFilter)}
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

              {/* Clear Filters Button */}
              {(typeFilter !== "all" || levelFilter !== "all") && (
                <button
                  onClick={() => {
                    setTypeFilter("all");
                    setLevelFilter("all");
                  }}
                  className="px-4 py-3 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Clear all
                </button>
              )}

              {/* Results Count */}
              <div className="ml-auto">
                <span className="text-sm text-slate-500">
                  {lessons?.length || 0} lesson
                  {(lessons?.length || 0) !== 1 ? "s" : ""} found
                </span>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">
                Error loading lessons: {error.message}
              </p>
              <button
                onClick={() => refetch()}
                className="mt-2 text-red-600 hover:text-red-700 font-medium"
              >
                Try again
              </button>
            </div>
          )}

          {/* Lesson Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <LessonSkeleton key={i} />
              ))}
            </div>
          ) : typeFilter === "all" ? (
            // Group by type when showing all
            <div className="space-y-8">
              {Object.entries(lessonsByType).map(([type, typeLessons]) => (
                <div key={type}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>
                      {type === "grammar"
                        ? "📚"
                        : type === "alphabet"
                        ? "🔤"
                        : type === "phonetics"
                        ? "🔊"
                        : type === "vocabulary"
                        ? "💬"
                        : "🗣️"}
                    </span>
                    {typeLabels[type as keyof typeof typeLabels]}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {typeLessons.map((lesson) => (
                      <LessonCard key={lesson.id} lesson={lesson} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Simple grid when filtering by type
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(lessons || []).map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && (!lessons || lessons.length === 0) && (
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No lessons found
              </h3>
              <p className="text-slate-600 mb-4">
                Try adjusting your filters to see more lessons.
              </p>
              <button
                onClick={() => {
                  setTypeFilter("all");
                  setLevelFilter("all");
                }}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
