"use client";

import AppLayout from "@/components/layout/AppLayout";

export default function ProgressPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-4">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Progress Tracking
            </h1>
            <p className="text-slate-600 mb-8">
              Monitor your natural language acquisition journey
            </p>
            <div className="bg-purple-50 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-purple-800">
                Coming soon! Track your listening hours, comprehension growth,
                and learning milestones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
