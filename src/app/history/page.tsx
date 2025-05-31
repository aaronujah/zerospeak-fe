"use client";

import { useState, useEffect } from "react";
import { UserActivity, ActivityFilters, ActivityType } from "@/types/activity";
import { getFilteredActivities } from "@/lib/mockActivities";
import { Button } from "@/components/ui/Button";
import AppLayout from "@/components/layout/AppLayout";

const categoryColors = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  pink: "bg-pink-50 text-pink-700 border-pink-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

const activityTypeLabels = {
  lesson_completed: "Lesson Completed",
  flashcard_studied: "Flashcard Study",
  journal_entry: "Journal Entry",
  content_viewed: "Content Viewed",
};

export default function HistoryPage() {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("");

  useEffect(() => {
    const loadActivities = () => {
      setLoading(true);

      const filters: ActivityFilters = {};

      if (selectedType) {
        filters.type = [selectedType as ActivityType];
      }

      if (selectedDateRange) {
        const now = new Date();
        let startDate: Date;

        switch (selectedDateRange) {
          case "today":
            startDate = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate()
            );
            break;
          case "week":
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case "month":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
          default:
            startDate = new Date(0); // All time
        }

        if (selectedDateRange !== "all") {
          filters.dateRange = {
            start: startDate,
            end: now,
          };
        }
      }

      if (searchQuery) {
        filters.search = searchQuery;
      }

      const filteredActivities = getFilteredActivities(filters);
      setActivities(filteredActivities);
      setLoading(false);
    };

    loadActivities();
  }, [searchQuery, selectedType, selectedDateRange]);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  const formatDate = (timestamp: Date) => {
    return timestamp.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("");
    setSelectedDateRange("");
  };

  const hasActiveFilters = searchQuery || selectedType || selectedDateRange;

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-200 rounded w-1/4"></div>
              <div className="h-12 bg-slate-200 rounded"></div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Learning History
            </h1>
            <p className="text-slate-600">
              Track your recent activities and learning progress
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            {/* Search Bar and Activity Type Filter */}
            <div className="flex items-center space-x-4">
              {/* Search Bar with Integrated Button */}
              <div className="w-96 relative">
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-3 pr-24 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:placeholder-slate-500 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
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
                  <button className="m-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center">
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

              {/* Activity Type Filter */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all appearance-none bg-no-repeat bg-right bg-white ${
                    selectedType
                      ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: "2.5rem",
                  }}
                >
                  <option value="">Activity Type</option>
                  {Object.entries(activityTypeLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div className="relative">
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all appearance-none bg-no-repeat bg-right bg-white ${
                    selectedDateRange
                      ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: "2.5rem",
                  }}
                >
                  <option value="">Date Range</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="all">All Time</option>
                </select>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 text-slate-600 hover:text-slate-800 border border-slate-200 hover:border-slate-300 rounded-xl transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Activities Timeline */}
          <div className="space-y-4">
            {activities.length === 0 ? (
              <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No activities found
                </h3>
                <p className="text-slate-600 mb-4">
                  {hasActiveFilters
                    ? "Try adjusting your filters to see more activities."
                    : "Your learning activities will appear here as you use the app."}
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl border ${
                        categoryColors[activity.color]
                      }`}
                    >
                      {activity.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-slate-900 mb-1">
                            {activity.title}
                          </h3>
                          <p className="text-slate-600 mb-3">
                            {activity.description}
                          </p>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
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
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {formatTimeAgo(activity.timestamp)}
                            </span>

                            <span className="flex items-center gap-1">
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
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {formatDate(activity.timestamp)}
                            </span>

                            {activity.metadata?.timeSpent && (
                              <span className="flex items-center gap-1">
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
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                                {activity.metadata.timeSpent} min
                              </span>
                            )}

                            {activity.metadata?.score && (
                              <span className="flex items-center gap-1">
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
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                  />
                                </svg>
                                {activity.metadata.score}%
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Activity Type badge */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full border ${
                              categoryColors[activity.color]
                            }`}
                          >
                            {activityTypeLabels[activity.type]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load more button (for future pagination) */}
          {activities.length > 0 && activities.length % 20 === 0 && (
            <div className="mt-8 text-center">
              <Button variant="outline">Load More Activities</Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
