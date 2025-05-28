"use client";

import AppLayout from "@/components/layout/AppLayout";

export default function FeedPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4">
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
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Daily Feed
            </h1>
            <p className="text-slate-600 mb-8">
              Your personalized comprehensible input feed
            </p>
            <div className="bg-emerald-50 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-emerald-800">
                Coming soon! This will be your daily personalized content feed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
