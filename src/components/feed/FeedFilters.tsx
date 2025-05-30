"use client";

import { useState } from "react";
import { ContentItem } from "@/types/content";

interface FeedFiltersProps {
  filters: {
    type?: ContentItem["type"];
    level?: ContentItem["level"];
    topics?: string[];
  };
  onFiltersChange: (filters: {
    type?: ContentItem["type"];
    level?: ContentItem["level"];
    topics?: string[];
  }) => void;
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

const levels: { value: ContentItem["level"]; label: string; color: string }[] =
  [
    {
      value: "beginner",
      label: "Beginner",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    {
      value: "advanced",
      label: "Advanced",
      color: "bg-red-100 text-red-800 border-red-200",
    },
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

export default function FeedFilters({
  filters,
  onFiltersChange,
}: FeedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTypeChange = (type: ContentItem["type"]) => {
    onFiltersChange({
      ...filters,
      type: filters.type === type ? undefined : type,
    });
  };

  const handleLevelChange = (level: ContentItem["level"]) => {
    onFiltersChange({
      ...filters,
      level: filters.level === level ? undefined : level,
    });
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
  };

  const hasActiveFilters =
    filters.type ||
    filters.level ||
    (filters.topics && filters.topics.length > 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold text-slate-900">Filters</h3>
          {hasActiveFilters && (
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <svg
              className={`w-5 h-5 transition-transform ${
                isExpanded ? "rotate-180" : ""
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
        </div>
      </div>

      {/* Quick filters - always visible */}
      <div className="space-y-4">
        {/* Content Type */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Content Type
          </label>
          <div className="flex flex-wrap gap-2">
            {contentTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleTypeChange(type.value)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
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
        </div>

        {/* Level */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Difficulty Level
          </label>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level.value}
                onClick={() => handleLevelChange(level.value)}
                className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                  filters.level === level.value
                    ? level.color
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Topics
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTopicToggle(topic)}
                  className={`px-3 py-2 rounded-lg border text-sm transition-all ${
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
        </div>
      )}
    </div>
  );
}
