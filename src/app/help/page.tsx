"use client";

import AppLayout from "@/components/layout/AppLayout";

export default function HelpPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-2xl mb-4">
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Help & Support
            </h1>
            <p className="text-slate-600 mb-8">
              Get help with your language learning journey
            </p>
            <div className="bg-indigo-50 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-indigo-800">
                Coming soon! Find answers to common questions and get support
                for your ALG journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
