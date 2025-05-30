"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import AppLayout from "@/components/layout/AppLayout";
import { Lesson } from "@/types/lessons";
import { fetchLessonById, fetchLessons } from "@/lib/mockLessons";

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [relatedLessons, setRelatedLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadLesson();
  }, [params.id]);

  useEffect(() => {
    loadRelatedLessons();
  }, [lesson, typeFilter]);

  const loadLesson = async () => {
    if (!params.id || typeof params.id !== "string") return;

    setLoading(true);
    try {
      const fetchedLesson = await fetchLessonById(params.id);
      setLesson(fetchedLesson);
    } catch (error) {
      console.error("Failed to fetch lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedLessons = async () => {
    if (!lesson) return;

    try {
      const allLessons = await fetchLessons(
        typeFilter === "all" ? undefined : typeFilter
      );
      const related = allLessons.filter((l) => l.id !== lesson.id).slice(0, 15);
      setRelatedLessons(related);
    } catch (error) {
      console.error("Failed to fetch related lessons:", error);
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

  const contentTypeIcons = {
    video: "🎥",
    audio: "🎵",
    article: "📄",
    interactive: "💫",
  };

  const renderContentArea = () => {
    if (!lesson) return null;

    switch (lesson.contentType) {
      case "video":
        return (
          <div className="bg-black rounded-xl overflow-hidden mb-4">
            <div className="aspect-video relative">
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎥</div>
                  <h3 className="text-xl font-semibold mb-2">Video Lesson</h3>
                  <p className="text-gray-300 mb-4">
                    Video player would be here
                  </p>
                  <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 mx-auto">
                    ▶️ Play Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "audio":
        return (
          <div className="bg-black rounded-xl overflow-hidden mb-4">
            <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                  ▶️ Play Audio
                </button>
              </div>
            </div>
          </div>
        );

      case "article":
        return (
          <div className="bg-white rounded-xl border mb-4 overflow-hidden">
            {lesson.articleContent?.images &&
              lesson.articleContent.images.length > 0 && (
                <div className="mb-6">
                  <img
                    src={lesson.articleContent.images[0].url}
                    alt={lesson.articleContent.images[0].alt}
                    className="w-full h-64 object-cover"
                  />
                  {lesson.articleContent.images[0].caption && (
                    <p className="text-sm text-gray-600 mt-2 px-6 italic">
                      {lesson.articleContent.images[0].caption}
                    </p>
                  )}
                </div>
              )}
            <div className="px-6 pb-6">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: lesson.articleContent?.content || "",
                }}
              />
              {lesson.articleContent?.images &&
                lesson.articleContent.images.length > 1 && (
                  <div className="mt-8 space-y-6">
                    {lesson.articleContent.images
                      .slice(1)
                      .map((image, index) => (
                        <div key={index} className="text-center">
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-48 object-cover rounded-lg mx-auto"
                          />
                          {image.caption && (
                            <p className="text-sm text-gray-600 mt-2 italic">
                              {image.caption}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                )}
            </div>
          </div>
        );

      case "interactive":
        return (
          <div className="bg-black rounded-xl overflow-hidden mb-4">
            <div className="aspect-video bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <div className="text-4xl">💫</div>
                </div>
                <button className="px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                  🚀 Start Interactive Lesson
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const checkScrollArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScrollArrows();
  }, [typeFilter]);

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading lesson...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!lesson) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Lesson not found
            </h2>
            <p className="text-slate-600 mb-4">
              The lesson you&apos;re looking for doesn&apos;t exist.
            </p>
            <button
              onClick={() => router.push("/lesson")}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (lesson.isLocked) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Lesson Locked
            </h2>
            <p className="text-slate-600 mb-4">
              Complete previous lessons to unlock this one.
            </p>
            <button
              onClick={() => router.push("/lesson")}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content Area */}
            <div className="flex-1">
              {/* Content Area - Dynamic based on content type */}
              {renderContentArea()}

              {/* Lesson Info */}
              <div className="bg-white rounded-xl p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{typeIcons[lesson.type]}</span>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      {lesson.title}
                    </h1>
                    <div className="flex items-center gap-4 mt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          levelColors[lesson.level]
                        }`}
                      >
                        {lesson.level}
                      </span>
                      <span className="text-slate-600">
                        {lesson.duration} min
                      </span>
                      <span className="text-slate-600 capitalize">
                        {lesson.type}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600">
                        {contentTypeIcons[lesson.contentType]}
                        <span className="capitalize">{lesson.contentType}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-700 text-lg mb-6">
                  {lesson.description}
                </p>

                {/* Lesson Content Sections - Only show for non-article lessons */}
                {lesson.contentType !== "article" && (
                  <div className="space-y-6 border-t pt-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        Lesson Overview
                      </h2>
                      <p className="text-slate-600 leading-relaxed">
                        This lesson will teach you {lesson.title.toLowerCase()}.
                        You&apos;ll learn key concepts and practice with
                        interactive exercises.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        What You&apos;ll Learn
                      </h2>
                      <ul className="space-y-2 text-slate-600">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Core concepts and principles</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Practical examples and usage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Interactive exercises</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Real-world applications</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Practice Exercises Section */}
                {lesson.exercises && lesson.exercises.length > 0 && (
                  <div className="border-t pt-6 mt-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Practice Exercises
                    </h2>
                    <p className="text-slate-600 mb-4">
                      This lesson includes {lesson.exercises.length} interactive
                      exercises to reinforce your learning.
                    </p>
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                      Start Exercises
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6 pt-6 border-t">
                  <button className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold">
                    {lesson.isCompleted ? "Review Again" : "Complete Lesson"}
                  </button>
                  <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                    Save for Later
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - Lessons */}
            <div className="lg:w-96">
              <div className="bg-white rounded-xl p-4 h-[calc(100vh-8rem)] flex flex-col">
                <h3 className="font-semibold text-slate-900 mb-4">Lessons</h3>

                {/* Type Filter */}
                <div className="mb-4 relative">
                  {/* Left Arrow */}
                  {showLeftArrow && (
                    <button
                      onClick={scrollLeft}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-slate-50 transition-colors"
                      style={{ marginLeft: "-12px" }}
                    >
                      <svg
                        className="w-4 h-4 text-slate-600"
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

                  {/* Right Arrow */}
                  {showRightArrow && (
                    <button
                      onClick={scrollRight}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-slate-50 transition-colors"
                      style={{ marginRight: "-12px" }}
                    >
                      <svg
                        className="w-4 h-4 text-slate-600"
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

                  <div
                    ref={scrollContainerRef}
                    className="flex space-x-2 overflow-x-auto scrollbar-hide"
                    onScroll={checkScrollArrows}
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    <button
                      onClick={() => setTypeFilter("all")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        typeFilter === "all"
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      All Types
                    </button>
                    <button
                      onClick={() => setTypeFilter("grammar")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        typeFilter === "grammar"
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      📚 Grammar
                    </button>
                    <button
                      onClick={() => setTypeFilter("alphabet")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        typeFilter === "alphabet"
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      🔤 Alphabet
                    </button>
                    <button
                      onClick={() => setTypeFilter("phonetics")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        typeFilter === "phonetics"
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      🔊 Phonetics
                    </button>
                    <button
                      onClick={() => setTypeFilter("vocabulary")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        typeFilter === "vocabulary"
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      💬 Vocabulary
                    </button>
                    <button
                      onClick={() => setTypeFilter("conversation")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        typeFilter === "conversation"
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      🗣️ Conversation
                    </button>
                  </div>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {relatedLessons.map((relatedLesson) => (
                    <div
                      key={relatedLesson.id}
                      onClick={() => router.push(`/lesson/${relatedLesson.id}`)}
                      className={`flex space-x-3 p-2 rounded-lg transition-colors ${
                        relatedLesson.isLocked
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-slate-50 cursor-pointer"
                      }`}
                    >
                      <div className="w-16 h-12 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">
                          {typeIcons[relatedLesson.type]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-slate-900 line-clamp-2 mb-1">
                          {relatedLesson.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
                          <span
                            className={`px-2 py-1 rounded-full ${
                              levelColors[relatedLesson.level]
                            }`}
                          >
                            {relatedLesson.level}
                          </span>
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full capitalize">
                            {relatedLesson.type}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <span>{relatedLesson.duration} min</span>
                          {relatedLesson.isLocked && <span>🔒</span>}
                          {relatedLesson.isCompleted && <span>✅</span>}
                        </div>
                      </div>
                    </div>
                  ))}

                  {relatedLessons.length === 0 && (
                    <div className="py-8 text-center">
                      <p className="text-sm text-slate-500">No lessons found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
