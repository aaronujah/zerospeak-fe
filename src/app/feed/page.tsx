"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ContentCard from "@/components/feed/ContentCard";
import SearchAndFilters from "@/components/feed/SearchAndFilters";
import { ContentSkeletonGrid } from "@/components/feed/ContentSkeleton";
import { ContentItem, FeedState } from "@/types/content";
import { useContent } from "@/hooks/useContent";

export default function FeedPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    type?: string;
    level?: string;
    topics?: string[];
  }>({});

  // Use API hooks for live data
  const {
    data: content,
    loading,
    error,
    refetch,
  } = useContent(
    filters.type,
    filters.level,
    "es" // Default to Spanish
  );

  // Filter and search content when filters or search query change
  const filteredItems = (content || []).filter((item) => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchLower));

      if (!matchesSearch) return false;
    }

    // Type filter
    if (filters.type && item.type !== filters.type) {
      return false;
    }

    // Level filter
    if (filters.level && item.level !== filters.level) {
      return false;
    }

    // Topics filter
    if (filters.topics && filters.topics.length > 0) {
      const hasMatchingTopic = filters.topics.some((topic) =>
        item.tags.includes(topic)
      );
      if (!hasMatchingTopic) return false;
    }

    return true;
  });

  // No need for intersection observer or loadContent since we're using API hooks

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleLike = useCallback((contentId: string) => {
    // TODO: Implement like functionality with API
    console.log("Like content:", contentId);
  }, []);

  const handleBookmark = useCallback((contentId: string) => {
    // TODO: Implement bookmark functionality with API
    console.log("Bookmark content:", contentId);
  }, []);

  const hasActiveFilters =
    searchQuery ||
    filters.type ||
    filters.level ||
    (filters.topics && filters.topics.length > 0);

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Search and Filters */}
          <SearchAndFilters
            filters={filters}
            searchQuery={searchQuery}
            onFiltersChange={handleFiltersChange}
            onSearchChange={handleSearchChange}
          />

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">
                Error loading content: {error.message}
              </p>
              <button
                onClick={() => refetch()}
                className="mt-2 text-red-600 hover:text-red-700 font-medium"
              >
                Try again
              </button>
            </div>
          )}

          {/* Content Grid */}
          {loading ? (
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
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
