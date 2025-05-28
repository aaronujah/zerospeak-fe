"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export default function OnboardingCompletePage() {
  const { data: session } = useSession();
  const [countdown, setCountdown] = useState(3);
  const [isCompleting, setIsCompleting] = useState(true);

  useEffect(() => {
    const completeOnboarding = async () => {
      if (session?.user) {
        // Mark onboarding as complete in localStorage for immediate effect
        localStorage.setItem("onboardingComplete", "true");
        localStorage.setItem("onboardingCompletedAt", new Date().toISOString());

        // Small delay to show the completion message
        setTimeout(() => {
          setIsCompleting(false);
        }, 1500);
      }
    };

    completeOnboarding();
  }, [session]);

  useEffect(() => {
    if (!isCompleting) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Force navigation to dashboard
            window.location.href = "/dashboard";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isCompleting]);

  const handleGoToDashboard = () => {
    // Force navigation to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 border border-slate-100">
          {/* Success Animation */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500 rounded-full mb-8 animate-pulse">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            🎉 Welcome to Zerospeak!
          </h1>

          <p className="text-xl text-slate-600 mb-8">
            Your personalized language learning journey is ready to begin!
          </p>

          <div className="bg-emerald-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">
              What happens next?
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="space-y-3 text-emerald-800">
                <div className="flex items-start space-x-3">
                  <span className="text-emerald-500 mt-1">📱</span>
                  <p>
                    <strong>Daily Feed:</strong> Personalized content based on
                    your interests
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-emerald-500 mt-1">🎯</span>
                  <p>
                    <strong>Progress Tracking:</strong> Watch your comprehension
                    grow naturally
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-emerald-800">
                <div className="flex items-start space-x-3">
                  <span className="text-emerald-500 mt-1">📚</span>
                  <p>
                    <strong>Rich Content:</strong> Stories, videos, and audio at
                    your level
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-emerald-500 mt-1">🌱</span>
                  <p>
                    <strong>Natural Growth:</strong> No pressure, just pure
                    comprehensible input
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Remember the ALG Way
            </h3>
            <p className="text-blue-800">
              Trust the process. Your brain is designed to acquire language
              naturally through understanding. There&apos;s no rush - every
              minute of comprehensible input counts!
            </p>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              onClick={handleGoToDashboard}
              className="w-full sm:w-auto"
              disabled={isCompleting}
            >
              {isCompleting ? "Completing setup..." : "Start Learning Now"}
            </Button>

            <p className="text-sm text-slate-500">
              {isCompleting
                ? "Finalizing your setup..."
                : `Redirecting to your dashboard in ${countdown} seconds...`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
