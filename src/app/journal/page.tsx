"use client";

import AppLayout from "@/components/layout/AppLayout";

export default function JournalPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-4">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Learning Journal
            </h1>
            <p className="text-slate-600 mb-8">
              Reflect on your language acquisition journey
            </p>
            <div className="bg-orange-50 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-orange-800">
                Coming soon! Record your thoughts, insights, and breakthroughs
                as you naturally acquire language.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
