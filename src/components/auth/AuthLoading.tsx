"use client";

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Loading Zerospeak
        </h2>
        <p className="text-slate-600">
          Please wait while we verify your authentication...
        </p>
      </div>
    </div>
  );
}
