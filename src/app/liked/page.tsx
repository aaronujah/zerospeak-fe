"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ContentCard from "@/components/feed/ContentCard";
import { ContentSkeletonGrid } from "@/components/feed/ContentSkeleton";
import { ContentItem } from "@/types/content";
import { fetchLikedContent } from "@/lib/mockData";

export default function LikedPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Load initial content
  useEffect(() => {
    loadContent(0, true);
  }, []);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadContent(page + 1);
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
  }, [hasMore, loading, page]);

  const loadContent = async (pageNum: number, reset = false) => {
    if (loading && !reset) return;

    setLoading(true);

    try {
      const newItems = await fetchLikedContent(pageNum, 12);

      setContent((prev) => (reset ? newItems : [...prev, ...newItems]));
      setLoading(false);
      setHasMore(newItems.length === 12);
      setPage(pageNum);
    } catch (error) {
      console.error("Error loading liked content:", error);
      setLoading(false);
    }
  };

  const handleLike = useCallback((contentId: string) => {
    setContent(
      (prev) =>
        prev
          .map((item) =>
            item.id === contentId
              ? {
                  ...item,
                  isLiked: !item.isLiked,
                  likes: item.isLiked ? item.likes - 1 : item.likes + 1,
                }
              : item
          )
          .filter((item) => item.isLiked) // Remove from liked list if unliked
    );
  }, []);

  const handleBookmark = useCallback((contentId: string) => {
    setContent((prev) =>
      prev.map((item) =>
        item.id === contentId
          ? { ...item, isBookmarked: !item.isBookmarked }
          : item
      )
    );
  }, []);

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Liked Content ❤️
            </h1>
            <p className="text-slate-600">
              Your favorite Spanish learning content
            </p>
          </div>

          {/* Content Grid */}
          {content.length === 0 && loading ? (
            <ContentSkeletonGrid count={12} />
          ) : (
            <>
              {content.length === 0 ? (
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No liked content yet
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Start liking content from your feed to see it here
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {content.map((item) => (
                      <ContentCard
                        key={item.id}
                        content={item}
                        onLike={handleLike}
                        onBookmark={handleBookmark}
                      />
                    ))}
                  </div>

                  {/* Loading indicator for infinite scroll */}
                  {loading && (
                    <div className="mt-8">
                      <ContentSkeletonGrid count={4} />
                    </div>
                  )}

                  {/* Intersection target for infinite scroll */}
                  <div ref={loadingRef} className="h-4" />

                  {/* End of results indicator */}
                  {!hasMore && content.length > 0 && (
                    <div className="text-center py-8">
                      <p className="text-slate-500">
                        You&apos;ve reached the end of your liked content
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
