"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import AppLayout from "@/components/layout/AppLayout";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back, {session?.user?.name?.split(" ")[0] || "Learner"}!
              👋
            </h1>
            <p className="text-slate-600">
              Ready to continue your natural language acquisition journey?
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Today's Goal
                  </p>
                  <p className="text-2xl font-bold text-slate-900">15 min</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-600"
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
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">9 min completed</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Current Streak
                  </p>
                  <p className="text-2xl font-bold text-slate-900">7 days</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4">Keep it up! 🔥</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Hours
                  </p>
                  <p className="text-2xl font-bold text-slate-900">24.5h</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
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
              </div>
              <p className="text-xs text-slate-500 mt-4">Amazing progress!</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Today's Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Today's Comprehensible Input
                  </h2>
                  <p className="text-slate-600">
                    Personalized content based on your interests and level
                  </p>
                </div>

                <div className="p-6">
                  {/* Featured Content */}
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                          A Day at the Market
                        </h3>
                        <p className="text-slate-600 mb-3">
                          Follow Maria as she shops for fresh ingredients. Rich
                          visual context with everyday vocabulary.
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                          <span>📚 Story</span>
                          <span>⏱️ 8 minutes</span>
                          <span>🌱 Beginner</span>
                        </div>
                        <Button className="w-full sm:w-auto">
                          Start Watching
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Content List */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🏠</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">
                          Morning Routine
                        </h4>
                        <p className="text-sm text-slate-600">
                          Daily life vocabulary with visual cues
                        </p>
                      </div>
                      <div className="text-sm text-slate-500">5 min</div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🎭</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">
                          Cultural Traditions
                        </h4>
                        <p className="text-sm text-slate-600">
                          Learn about festivals and customs
                        </p>
                      </div>
                      <div className="text-sm text-slate-500">12 min</div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🌿</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">
                          Nature Walk
                        </h4>
                        <p className="text-sm text-slate-600">
                          Animals and plants with beautiful imagery
                        </p>
                      </div>
                      <div className="text-sm text-slate-500">7 min</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    Browse Library
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <svg
                      className="w-4 h-4 mr-2"
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
                    Open Journal
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <svg
                      className="w-4 h-4 mr-2"
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
                    View Progress
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Completed "Family Dinner"
                      </p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Added journal entry
                      </p>
                      <p className="text-xs text-slate-500">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        7-day streak achieved!
                      </p>
                      <p className="text-xs text-slate-500">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ALG Tip */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                <h3 className="text-lg font-semibold text-emerald-900 mb-2">
                  💡 ALG Tip
                </h3>
                <p className="text-sm text-emerald-800">
                  Don't worry if you don't understand everything. Your brain is
                  naturally acquiring patterns. Trust the process and enjoy the
                  journey!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
