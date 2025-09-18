"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import AuthGuard from "@/components/auth/AuthGuard";
import AuthLoading from "@/components/auth/AuthLoading";
import { useProgress } from "@/hooks/useProgress";
import { useUserActivities } from "@/hooks/useUsers";
import { useUserAchievements } from "@/hooks/useUsers";

interface ProgressStats {
  totalLessons: number;
  completedLessons: number;
  completionRate: number;
  totalStudyTime: number;
  currentStreak: number;
  longestStreak: number;
  lessonsByType: {
    [key: string]: {
      total: number;
      completed: number;
      completionRate: number;
    };
  };
  lessonsByLevel: {
    [key: string]: {
      total: number;
      completed: number;
      completionRate: number;
    };
  };
}

const achievements = [
  {
    id: "first_lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    unlocked: true,
    unlockedAt: "2024-01-15",
  },
  {
    id: "grammar_master",
    title: "Grammar Foundation",
    description: "Complete 5 grammar lessons",
    icon: "📚",
    unlocked: true,
    unlockedAt: "2024-01-20",
  },
  {
    id: "alphabet_expert",
    title: "Alphabet Expert",
    description: "Master all alphabet lessons",
    icon: "🔤",
    unlocked: true,
    unlockedAt: "2024-01-18",
  },
  {
    id: "conversation_starter",
    title: "Conversation Starter",
    description: "Complete your first conversation lesson",
    icon: "💬",
    unlocked: true,
    unlockedAt: "2024-01-22",
  },
  {
    id: "week_streak",
    title: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "vocabulary_builder",
    title: "Vocabulary Builder",
    description: "Complete 10 vocabulary lessons",
    icon: "📖",
    unlocked: false,
    unlockedAt: null,
  },
];

const recentActivity = [
  {
    date: "2024-01-22",
    action: "Completed lesson",
    lesson: "Basic Greetings and Introductions",
    type: "conversation",
    duration: 18,
  },
  {
    date: "2024-01-21",
    action: "Completed lesson",
    lesson: "Essential Daily Vocabulary",
    type: "vocabulary",
    duration: 15,
  },
  {
    date: "2024-01-20",
    action: "Completed lesson",
    lesson: "Vowels: A, E, I, O, U",
    type: "alphabet",
    duration: 18,
  },
  {
    date: "2024-01-19",
    action: "Completed lesson",
    lesson: "Spanish Alphabet Overview",
    type: "alphabet",
    duration: 12,
  },
  {
    date: "2024-01-18",
    action: "Completed lesson",
    lesson: "Articles: El, La, Los, Las",
    type: "grammar",
    duration: 20,
  },
];

const ProgressCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  color: string;
}) => (
  <div className={`bg-white rounded-xl p-6 border border-slate-200 ${color}`}>
    <div className="flex items-center justify-between mb-4">
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${
          color.includes("emerald")
            ? "bg-emerald-100"
            : color.includes("blue")
            ? "bg-blue-100"
            : color.includes("purple")
            ? "bg-purple-100"
            : "bg-orange-100"
        }`}
      >
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm font-medium text-slate-600">{title}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  </div>
);

const TypeProgressBar = ({
  type,
  stats,
  icon,
}: {
  type: string;
  stats: { total: number; completed: number; completionRate: number };
  icon: string;
}) => (
  <div className="bg-white rounded-lg p-4 border border-slate-200">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{icon}</span>
        <span className="font-medium text-slate-900 capitalize">{type}</span>
      </div>
      <span className="text-sm text-slate-500">
        {stats.completed}/{stats.total}
      </span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
      <div
        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${stats.completionRate}%` }}
      ></div>
    </div>
    <p className="text-xs text-slate-500">
      {stats.completionRate.toFixed(0)}% complete
    </p>
  </div>
);

function ProgressContent() {
  // Use API hooks for live data
  const {
    data: progress,
    loading: progressLoading,
    error: progressError,
  } = useProgress();
  const { data: activities, loading: activitiesLoading } = useUserActivities();
  const { data: achievements, loading: achievementsLoading } =
    useUserAchievements();

  const loading = progressLoading || activitiesLoading || achievementsLoading;

  // No need for calculateProgressStats since we're using API data

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-slate-200 rounded w-64"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (progressError) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <p className="text-red-600">
                Error loading progress data: {progressError.message}
              </p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  const typeIcons = {
    grammar: "📚",
    alphabet: "🔤",
    phonetics: "🔊",
    vocabulary: "💬",
    conversation: "🗣️",
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Progress</h1>
                <p className="text-slate-600 mt-1">
                  Track your Spanish learning journey and achievements
                </p>
              </div>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ProgressCard
              title="Immersion Time"
              value={`${progress?.timeSpent || 0}min`}
              subtitle="Total time spent in immersion"
              icon="⏱️"
              color="border-blue-200"
            />
            <ProgressCard
              title="Lessons Completed"
              value={progress?.completedLessons || 0}
              subtitle={`${progress?.completionRate || 0}% of total lessons`}
              icon="✅"
              color="border-emerald-200"
            />
            <ProgressCard
              title="Current Streak"
              value={`${progress?.streak || 0} days`}
              subtitle="Keep it going!"
              icon="🔥"
              color="border-orange-200"
            />
            <ProgressCard
              title="Total Hours"
              value={`${progress?.totalTimeSpent || 0}h`}
              subtitle="Personal best"
              icon="🏆"
              color="border-purple-200"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress by Type */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Progress by Lesson Type
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {progress?.lessonsByType ? (
                    Object.entries(progress.lessonsByType).map(
                      ([type, typeStats]) => (
                        <TypeProgressBar
                          key={type}
                          type={type}
                          stats={typeStats}
                          icon={
                            typeIcons[type as keyof typeof typeIcons] || "📚"
                          }
                        />
                      )
                    )
                  ) : (
                    <div className="col-span-2 text-center py-8 text-slate-500">
                      No progress data available
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Recent Activity
                </h2>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="divide-y divide-slate-200">
                    {activities && activities.length > 0 ? (
                      activities.slice(0, 5).map((activity, index) => (
                        <div
                          key={activity.id}
                          className="p-4 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <span className="text-lg">📚</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900">
                                {activity.description}
                              </p>
                              <p className="text-xs text-slate-500">
                                {new Date(
                                  activity.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                {activity.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-500">
                        No recent activity
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements && achievements.length > 0 ? (
                  achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border transition-all ${
                        achievement.isUnlocked
                          ? "bg-white border-emerald-200 shadow-sm"
                          : "bg-slate-50 border-slate-200 opacity-60"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`text-2xl ${
                            achievement.isUnlocked ? "" : "grayscale"
                          }`}
                        >
                          {achievement.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-medium ${
                              achievement.isUnlocked
                                ? "text-slate-900"
                                : "text-slate-500"
                            }`}
                          >
                            {achievement.title}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">
                            {achievement.description}
                          </p>
                          {achievement.isUnlocked && achievement.unlockedAt && (
                            <p className="text-xs text-emerald-600 mt-2">
                              Unlocked{" "}
                              {new Date(
                                achievement.unlockedAt
                              ).toLocaleDateString()}
                            </p>
                          )}
                          {!achievement.isUnlocked && (
                            <p className="text-xs text-slate-400 mt-2">
                              Locked
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    No achievements available
                  </div>
                )}
              </div>

              {/* Level Progress */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Progress by Level
                </h2>
                <div className="space-y-3">
                  {progress?.lessonsByLevel ? (
                    Object.entries(progress.lessonsByLevel).map(
                      ([level, levelStats]) => (
                        <div
                          key={level}
                          className="bg-white rounded-lg p-4 border border-slate-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-slate-900 capitalize flex items-center space-x-2">
                              <span>
                                {level === "beginner"
                                  ? "🌱"
                                  : level === "intermediate"
                                  ? "⚡"
                                  : "🚀"}
                              </span>
                              <span>{level}</span>
                            </span>
                            <span className="text-sm text-slate-500">
                              {levelStats.completed}/{levelStats.total}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${levelStats.completionRate}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {levelStats.completionRate.toFixed(0)}% complete
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      No level progress data available
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

export default function ProgressPage() {
  return (
    <AuthGuard fallback={<AuthLoading />}>
      <ProgressContent />
    </AuthGuard>
  );
}
