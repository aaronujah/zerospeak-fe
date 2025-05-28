"use client";

import AppLayout from "@/components/layout/AppLayout";

export default function LibraryPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Content Library
            </h1>
            <p className="text-slate-600 mb-8">
              Browse all available comprehensible input content
            </p>
            <div className="bg-blue-50 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-blue-800">
                Coming soon! Browse stories, videos, and audio content by topic
                and level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
