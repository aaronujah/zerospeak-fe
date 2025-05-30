"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ContentCard from "@/components/feed/ContentCard";
import SearchAndFilters from "@/components/feed/SearchAndFilters";
import { ContentSkeletonGrid } from "@/components/feed/ContentSkeleton";
import { ContentItem, FeedState } from "@/types/content";
import { fetchFeedContent } from "@/lib/mockData";

export default function FeedPage() {
  const [feedState, setFeedState] = useState<FeedState>({
    items: [],
    loading: true,
    hasMore: true,
    page: 0,
    filters: {},
  });

  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Load initial content
  useEffect(() => {
    loadContent(0, true);
  }, []);

  // Filter and search content when filters or search query change
  useEffect(() => {
    const filtered = feedState.items.filter((item) => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.creator.name.toLowerCase().includes(searchLower) ||
          item.topics.some((topic) =>
            topic.toLowerCase().includes(searchLower)
          );

        if (!matchesSearch) return false;
      }

      // Type filter
      if (feedState.filters.type && item.type !== feedState.filters.type) {
        return false;
      }

      // Level filter
      if (feedState.filters.level && item.level !== feedState.filters.level) {
        return false;
      }

      // Topics filter
      if (feedState.filters.topics && feedState.filters.topics.length > 0) {
        const hasMatchingTopic = feedState.filters.topics.some((topic) =>
          item.topics.includes(topic)
        );
        if (!hasMatchingTopic) return false;
      }

      return true;
    });
    setFilteredItems(filtered);
  }, [feedState.items, feedState.filters, searchQuery]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          feedState.hasMore &&
          !feedState.loading
        ) {
          loadContent(feedState.page + 1);
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
  }, [feedState.hasMore, feedState.loading, feedState.page]);

  const loadContent = async (page: number, reset = false) => {
    if (feedState.loading && !reset) return;

    setFeedState((prev) => ({ ...prev, loading: true }));

    try {
      const newItems = await fetchFeedContent(page, 12);

      setFeedState((prev) => ({
        ...prev,
        items: reset ? newItems : [...prev.items, ...newItems],
        loading: false,
        hasMore: newItems.length === 12, // If we get less than 12, we've reached the end
        page,
      }));
    } catch (error) {
      console.error("Error loading content:", error);
      setFeedState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleFiltersChange = useCallback(
    (newFilters: typeof feedState.filters) => {
      setFeedState((prev) => ({ ...prev, filters: newFilters }));
    },
    []
  );

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleLike = useCallback((contentId: string) => {
    setFeedState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === contentId
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            }
          : item
      ),
    }));
  }, []);

  const handleBookmark = useCallback((contentId: string) => {
    setFeedState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === contentId
          ? { ...item, isBookmarked: !item.isBookmarked }
          : item
      ),
    }));
  }, []);

  const hasActiveFilters =
    searchQuery ||
    feedState.filters.type ||
    feedState.filters.level ||
    (feedState.filters.topics && feedState.filters.topics.length > 0);

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Search and Filters */}
          <SearchAndFilters
            filters={feedState.filters}
            searchQuery={searchQuery}
            onFiltersChange={handleFiltersChange}
            onSearchChange={handleSearchChange}
          />

          {/* Content Grid */}
          {feedState.items.length === 0 && feedState.loading ? (
            <ContentSkeletonGrid count={12} />
          ) : (
            <>
              {filteredItems.length === 0 && hasActiveFilters ? (
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No content found
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Try adjusting your search or filters to see more content.
                  </p>
                  <button
                    onClick={() => {
                      handleFiltersChange({});
                      handleSearchChange("");
                    }}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((content) => (
                    <ContentCard
                      key={content.id}
                      content={content}
                      onLike={handleLike}
                      onBookmark={handleBookmark}
                    />
                  ))}
                </div>
              )}

              {/* Loading indicator for infinite scroll */}
              {feedState.hasMore && (
                <div ref={loadingRef} className="mt-8">
                  {feedState.loading && <ContentSkeletonGrid count={6} />}
                </div>
              )}

              {/* End of content message */}
              {!feedState.hasMore && feedState.items.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-500">
                    You&apos;ve reached the end! Check back later for new
                    content.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
