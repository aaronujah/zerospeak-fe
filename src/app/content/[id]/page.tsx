"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import AppLayout from "@/components/layout/AppLayout";
import { ContentItem } from "@/types/content";
import { fetchFeedContent } from "@/lib/mockData";

export default function ContentPage() {
  const params = useParams();
  const router = useRouter();
  const [content, setContent] = useState<ContentItem | null>(null);
  const [recommendedContent, setRecommendedContent] = useState<ContentItem[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreRecommended, setHasMoreRecommended] = useState(true);
  const [recommendedPage, setRecommendedPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [allContentPool, setAllContentPool] = useState<ContentItem[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // In a real app, you'd fetch by ID. For now, we'll get from the feed and find by ID
        const allContent = await fetchFeedContent(0, 100); // Load more content for recommendations
        const foundContent = allContent.find((item) => item.id === params.id);

        if (foundContent) {
          setContent(foundContent);
          setIsLiked(foundContent.isLiked);
          setIsSaved(foundContent.isBookmarked);
          setLikeCount(foundContent.likes);

          // Store all content for recommendations
          const filteredContent = allContent.filter(
            (item) => item.id !== foundContent.id
          );
          setAllContentPool(filteredContent);

          // Load initial recommendations
          loadInitialRecommendations(foundContent, filteredContent);
        } else {
          router.push("/feed");
        }
      } catch (error) {
        console.error("Error loading content:", error);
        router.push("/feed");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadContent();
    }
  }, [params.id, router]);

  const loadInitialRecommendations = (
    currentContent: ContentItem,
    pool: ContentItem[]
  ) => {
    // Get similar content first, then others
    const similar = pool.filter(
      (item) =>
        item.topics.some((topic) => currentContent.topics.includes(topic)) ||
        item.level === currentContent.level ||
        item.type === currentContent.type
    );

    const others = pool.filter(
      (item) => !similar.some((s) => s.id === item.id)
    );

    const sortedPool = [...similar, ...others];
    const initial = sortedPool.slice(0, 10);

    setRecommendedContent(initial);
    setRecommendedPage(1);
    setHasMoreRecommended(sortedPool.length > 10);
  };

  const loadMoreRecommendations = useCallback(async () => {
    if (loadingMore || !hasMoreRecommended) return;

    setLoadingMore(true);

    try {
      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!content) return;

      // Get similar content first, then others
      const similar = allContentPool.filter(
        (item) =>
          item.topics.some((topic) => content.topics.includes(topic)) ||
          item.level === content.level ||
          item.type === content.type
      );

      const others = allContentPool.filter(
        (item) => !similar.some((s) => s.id === item.id)
      );

      const sortedPool = [...similar, ...others];
      const startIndex = recommendedPage * 10;
      const newRecommendations = sortedPool.slice(startIndex, startIndex + 10);

      if (newRecommendations.length > 0) {
        setRecommendedContent((prev) => [...prev, ...newRecommendations]);
        setRecommendedPage((prev) => prev + 1);
        setHasMoreRecommended(sortedPool.length > (recommendedPage + 1) * 10);
      } else {
        setHasMoreRecommended(false);
      }
    } catch (error) {
      console.error("Error loading more recommendations:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [
    loadingMore,
    hasMoreRecommended,
    content,
    allContentPool,
    recommendedPage,
  ]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreRecommended && !loadingMore) {
          loadMoreRecommendations();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMoreRecommended, loadingMore, loadMoreRecommendations]);

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4)
      return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"} ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12)
      return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading content...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!content) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Content not found
            </h2>
            <p className="text-slate-600 mb-4">
              The content you&apos;re looking for doesn&apos;t exist.
            </p>
            <button
              onClick={() => router.push("/feed")}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Back to Feed
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
              {/* Video/Audio Player */}
              <div className="bg-black rounded-xl overflow-hidden mb-4">
                {content.type === "video" ? (
                  <div className="aspect-video relative">
                    <img
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                      >
                        {isPlaying ? (
                          <svg
                            className="w-8 h-8 text-slate-800"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 4v16h4V4H6zM14 4v16h4V4h-4z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-8 h-8 text-slate-800 ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
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
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                      >
                        {isPlaying ? "Pause" : "Play"} Audio
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Info */}
              <div className="bg-white rounded-xl p-6 mb-4">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">
                  {content.title}
                </h1>

                {/* Creator and Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{content.creator.avatar}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-slate-900">
                          {content.creator.name}
                        </h3>
                        {content.creator.verified && (
                          <svg
                            className="w-5 h-5 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">Content Creator</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isLiked
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill={isLiked ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{likeCount.toLocaleString()}</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isSaved
                          ? "bg-emerald-500 text-white hover:bg-emerald-600"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill={isSaved ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      <span>{isSaved ? "Saved" : "Save"}</span>
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm text-slate-600 mb-4">
                  <span>{content.views.toLocaleString()} views</span>
                  <span>{formatRelativeTime(content.createdAt)}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getLevelColor(
                      content.level
                    )}`}
                  >
                    {content.level}
                  </span>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {content.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Description
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {content.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar - Recommended Content */}
            <div className="lg:w-96">
              <div className="bg-white rounded-xl p-4 h-[calc(100vh-8rem)] flex flex-col">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Recommended
                </h3>
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {recommendedContent.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => router.push(`/content/${item.id}`)}
                      className="flex space-x-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="relative w-24 h-16 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                          {Math.floor(item.duration / 60)}:
                          {String(item.duration % 60).padStart(2, "0")}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-slate-900 line-clamp-2 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 mb-1">
                          {item.creator.name}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <span>{item.views.toLocaleString()} views</span>
                          <span>•</span>
                          <span>{formatRelativeTime(item.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator for infinite scroll */}
                  {hasMoreRecommended && (
                    <div
                      ref={loadingRef}
                      className="py-4 flex items-center justify-center"
                    >
                      {loadingMore ? (
                        <div className="flex items-center space-x-2 text-slate-500">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
                          <span className="text-sm">Loading more...</span>
                        </div>
                      ) : (
                        <div className="h-4"></div>
                      )}
                    </div>
                  )}

                  {/* End message */}
                  {!hasMoreRecommended && recommendedContent.length > 10 && (
                    <div className="py-4 text-center">
                      <p className="text-sm text-slate-500">
                        You&apos;ve reached the end of recommendations
                      </p>
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
