"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { useUserLanguage } from "@/lib/userLanguageContext";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession();
  const {
    userLanguages,
    currentLanguage,
    setCurrentLanguage,
    getUserLanguageInfo,
  } = useUserLanguage();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const currentLangInfo = getUserLanguageInfo(currentLanguage);

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
    // In a real app, you would save this to user preferences/backend
    console.log("Current learning language changed to:", languageCode);
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-6">
      {/* Mobile menu button */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>

        <h1 className="ml-2 text-xl font-semibold text-slate-900 lg:hidden">
          Zerospeak
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Language Selector - only show if user has multiple languages */}
        {userLanguages.length > 1 && (
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="p-2 flex items-center space-x-2"
            >
              <span className="text-lg">{currentLangInfo?.flag}</span>
              <span className="hidden sm:block text-sm font-medium text-slate-700">
                {currentLangInfo?.name}
              </span>
              <svg
                className={`w-4 h-4 text-slate-500 transition-transform ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
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
            </Button>

            {/* Language Dropdown - only show user's languages */}
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                <div className="px-3 py-2 text-xs font-medium text-slate-500 border-b border-slate-100">
                  Currently Learning
                </div>
                {userLanguages.map((languageCode) => {
                  const language = getUserLanguageInfo(languageCode);
                  if (!language) return null;

                  return (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm text-left hover:bg-slate-50 transition-colors ${
                        currentLanguage === language.code
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-slate-700"
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                      {currentLanguage === language.code && (
                        <svg
                          className="w-4 h-4 text-emerald-600 ml-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Show current language even if only one */}
        {userLanguages.length === 1 && (
          <div className="flex items-center space-x-2 px-2">
            <span className="text-lg">{currentLangInfo?.flag}</span>
            <span className="hidden sm:block text-sm font-medium text-slate-700">
              {currentLangInfo?.name}
            </span>
          </div>
        )}

        {/* User menu - desktop only */}
        <div className="hidden lg:flex items-center space-x-3">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 font-medium text-sm">
                {session?.user?.name?.charAt(0) || "U"}
              </span>
            </div>
          )}
          <span className="text-sm font-medium text-slate-700">
            {session?.user?.name || "User"}
          </span>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isLanguageDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLanguageDropdownOpen(false)}
        />
      )}
    </header>
  );
}
