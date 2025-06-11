"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const availableLanguages: Language[] = [
  { code: "Spanish", name: "Spanish", flag: "🇪🇸" },
  { code: "French", name: "French", flag: "🇫🇷" },
  { code: "German", name: "German", flag: "🇩🇪" },
  { code: "Italian", name: "Italian", flag: "🇮🇹" },
  { code: "Portuguese", name: "Portuguese", flag: "🇵🇹" },
  { code: "Japanese", name: "Japanese", flag: "🇯🇵" },
  { code: "Korean", name: "Korean", flag: "🇰🇷" },
  { code: "Chinese", name: "Chinese", flag: "🇨🇳" },
  { code: "Arabic", name: "Arabic", flag: "🇸🇦" },
  { code: "Russian", name: "Russian", flag: "🇷🇺" },
];

interface UserLanguageContextType {
  userLanguages: string[];
  currentLanguage: string;
  setUserLanguages: (languages: string[]) => void;
  setCurrentLanguage: (language: string) => void;
  getUserLanguageInfo: (code: string) => Language | undefined;
}

const UserLanguageContext = createContext<UserLanguageContextType | undefined>(
  undefined
);

export function UserLanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userLanguages, setUserLanguages] = useState<string[]>(["Spanish"]);
  const [currentLanguage, setCurrentLanguage] = useState<string>("Spanish");

  // Ensure current language is always in user's language list
  useEffect(() => {
    if (!userLanguages.includes(currentLanguage) && userLanguages.length > 0) {
      setCurrentLanguage(userLanguages[0]);
    }
  }, [userLanguages, currentLanguage]);

  const getUserLanguageInfo = (code: string): Language | undefined => {
    return availableLanguages.find((lang) => lang.code === code);
  };

  return (
    <UserLanguageContext.Provider
      value={{
        userLanguages,
        currentLanguage,
        setUserLanguages,
        setCurrentLanguage,
        getUserLanguageInfo,
      }}
    >
      {children}
    </UserLanguageContext.Provider>
  );
}

export function useUserLanguage() {
  const context = useContext(UserLanguageContext);
  if (context === undefined) {
    throw new Error(
      "useUserLanguage must be used within a UserLanguageProvider"
    );
  }
  return context;
}
