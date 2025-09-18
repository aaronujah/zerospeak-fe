"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import AppLayout from "@/components/layout/AppLayout";
import AuthGuard from "@/components/auth/AuthGuard";
import AuthLoading from "@/components/auth/AuthLoading";
import { Button } from "@/components/ui/Button";
import { useUserLanguage, availableLanguages } from "@/lib/userLanguageContext";
import {
  useCurrentUser,
  useUpdateUser,
  useUserLanguages,
  useAddUserLanguage,
  useRemoveUserLanguage,
} from "@/hooks/useUsers";

interface SettingsState {
  profile: {
    name: string;
    email: string;
    bio: string;
  };
  learning: {
    level: "beginner" | "intermediate" | "advanced";
    dailyGoal: number;
    autoplay: boolean;
    subtitles: boolean;
  };
  interface: {
    theme: "light" | "dark" | "system";
    language: "en" | "es";
  };
}

function SettingsContent() {
  const { data: session } = useSession();
  const { userLanguages, setUserLanguages } = useUserLanguage();
  const [activeTab, setActiveTab] = useState("profile");

  // Use API hooks for live data
  const { data: user, loading: userLoading } = useCurrentUser();
  const { data: userLanguagesData, loading: languagesLoading } =
    useUserLanguages();
  const { mutate: updateUser, loading: updating } = useUpdateUser();
  const { mutate: addUserLanguage, loading: addingLanguage } =
    useAddUserLanguage();
  const { mutate: removeUserLanguage, loading: removingLanguage } =
    useRemoveUserLanguage();

  const [settings, setSettings] = useState<SettingsState>({
    profile: {
      name: user?.name || session?.user?.name || "",
      email: user?.email || session?.user?.email || "",
      bio: user?.bio || "",
    },
    learning: {
      level: "intermediate",
      dailyGoal: user?.dailyGoal || 15,
      autoplay: true,
      subtitles: true,
    },
    interface: {
      theme: "system",
      language: "en",
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [languageToRemove, setLanguageToRemove] = useState<string | null>(null);
  const [languageToAdd, setLanguageToAdd] = useState<string | null>(null);
  const [showAddConfirm, setShowAddConfirm] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const tabs = [
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "learning", name: "Learning", icon: "📚" },
    { id: "interface", name: "Interface", icon: "🎨" },
  ];

  const updateSetting = (
    section: keyof SettingsState,
    key: string,
    value: string | number | boolean | string[]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const initiateAddLanguage = (languageCode: string) => {
    if (!userLanguages.includes(languageCode)) {
      setLanguageToAdd(languageCode);
      setShowAddConfirm(true);
    }
  };

  const confirmAddLanguage = async () => {
    if (languageToAdd && user?.id) {
      try {
        await addUserLanguage({
          languageId: languageToAdd,
          proficiencyLevel: "beginner",
          isPrimary: false,
        });
        const newLanguages = [...userLanguages, languageToAdd];
        setUserLanguages(newLanguages);
        setShowAddConfirm(false);
        setLanguageToAdd(null);
      } catch (error) {
        console.error("Failed to add language:", error);
      }
    }
  };

  const initiateRemoveLanguage = (languageCode: string) => {
    setLanguageToRemove(languageCode);
    setShowRemoveConfirm(true);
  };

  const confirmRemoveLanguage = async () => {
    if (languageToRemove && user?.id) {
      try {
        await removeUserLanguage(user.id, languageToRemove);
        const newLanguages = userLanguages.filter(
          (lang) => lang !== languageToRemove
        );
        setUserLanguages(newLanguages);
        setShowRemoveConfirm(false);
        setLanguageToRemove(null);
      } catch (error) {
        console.error("Failed to remove language:", error);
      }
    }
  };

  const cancelLanguageAction = () => {
    setShowAddConfirm(false);
    setShowRemoveConfirm(false);
    setLanguageToAdd(null);
    setLanguageToRemove(null);
  };

  const handleSave = async () => {
    if (!user?.id) return;

    setIsSaving(true);
    try {
      await updateUser({
        name: settings.profile.name,
        email: settings.profile.email,
        dailyGoal: settings.learning.dailyGoal,
      });
      console.log("Settings saved:", settings);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">
                Profile Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) =>
                      updateSetting("profile", "name", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) =>
                      updateSetting("profile", "email", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={settings.profile.bio}
                    onChange={(e) =>
                      updateSetting("profile", "bio", e.target.value)
                    }
                    rows={3}
                    placeholder="Tell us about your Spanish learning journey..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-medium text-slate-900 mb-4">
                Account Actions
              </h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full sm:w-auto">
                  Change Password
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-red-600 border-red-300 hover:bg-red-50"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        );

      case "learning":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">
                Learning Preferences
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Current Level
                  </label>
                  <select
                    value={settings.learning.level}
                    onChange={(e) =>
                      updateSetting("learning", "level", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="beginner">🌱 Beginner</option>
                    <option value="intermediate">⚡ Intermediate</option>
                    <option value="advanced">🚀 Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Daily Learning Goal (minutes)
                  </label>
                  <select
                    value={settings.learning.dailyGoal}
                    onChange={(e) =>
                      updateSetting(
                        "learning",
                        "dailyGoal",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">
                Languages You&apos;re Studying
              </h3>
              <div className="space-y-4">
                {/* Current Languages */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Current Languages
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {userLanguages.map((language) => {
                      const langInfo = availableLanguages.find(
                        (l) => l.code === language
                      );
                      return (
                        <div
                          key={language}
                          className="flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm"
                        >
                          <span className="mr-1">{langInfo?.flag}</span>
                          <span className="mr-2">
                            {langInfo?.name || language}
                          </span>
                          {userLanguages.length > 1 && (
                            <button
                              onClick={() => initiateRemoveLanguage(language)}
                              className="text-emerald-600 hover:text-emerald-800 ml-1"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Add New Language */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Add New Language
                  </label>
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        initiateAddLanguage(e.target.value);
                        e.target.value = "";
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select a language to add...</option>
                    {availableLanguages
                      .filter((lang) => !userLanguages.includes(lang.code))
                      .map((language) => (
                        <option key={language.code} value={language.code}>
                          {language.flag} {language.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">
                Content Preferences
              </h3>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.learning.autoplay}
                    onChange={(e) =>
                      updateSetting("learning", "autoplay", e.target.checked)
                    }
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-sm text-slate-700">
                    Autoplay next content item
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.learning.subtitles}
                    onChange={(e) =>
                      updateSetting("learning", "subtitles", e.target.checked)
                    }
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-sm text-slate-700">
                    Show subtitles by default
                  </span>
                </label>
              </div>
            </div>
          </div>
        );

      case "interface":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">
                Interface Preferences
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Theme
                  </label>
                  <select
                    value={settings.interface.theme}
                    onChange={(e) =>
                      updateSetting("interface", "theme", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="light">☀️ Light</option>
                    <option value="dark">🌙 Dark</option>
                    <option value="system">🖥️ System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    App Language
                  </label>
                  <select
                    value={settings.interface.language}
                    onChange={(e) =>
                      updateSetting("interface", "language", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="en">🇺🇸 English</option>
                    <option value="es">🇪🇸 Español</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
            <p className="text-slate-600">
              Manage your account and learning preferences
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span className="mr-3 text-lg">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                {renderTabContent()}

                {/* Save Button */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving || updating}
                    className="w-full sm:w-auto"
                  >
                    {isSaving || updating ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Language Confirmation Modal */}
      {showAddConfirm && languageToAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Add{" "}
              {availableLanguages.find((l) => l.code === languageToAdd)?.flag}{" "}
              {availableLanguages.find((l) => l.code === languageToAdd)?.name}?
            </h3>
            <p className="text-slate-600 mb-4">
              This will add{" "}
              {availableLanguages.find((l) => l.code === languageToAdd)?.name}{" "}
              to your learning languages. You&apos;ll start seeing{" "}
              {availableLanguages.find((l) => l.code === languageToAdd)?.name}{" "}
              content in your feed and lessons.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={confirmAddLanguage}
                className="flex-1"
                disabled={addingLanguage}
              >
                {addingLanguage ? "Adding..." : "Add Language"}
              </Button>
              <Button
                onClick={cancelLanguageAction}
                variant="outline"
                className="flex-1"
                disabled={addingLanguage}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Language Confirmation Modal */}
      {showRemoveConfirm && languageToRemove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Remove{" "}
              {
                availableLanguages.find((l) => l.code === languageToRemove)
                  ?.flag
              }{" "}
              {
                availableLanguages.find((l) => l.code === languageToRemove)
                  ?.name
              }
              ?
            </h3>
            <p className="text-slate-600 mb-4">
              This will remove{" "}
              {
                availableLanguages.find((l) => l.code === languageToRemove)
                  ?.name
              }{" "}
              from your learning languages. Your progress data will be
              preserved, but you won&apos;t see{" "}
              {
                availableLanguages.find((l) => l.code === languageToRemove)
                  ?.name
              }{" "}
              content anymore.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={confirmRemoveLanguage}
                variant="outline"
                className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                disabled={removingLanguage}
              >
                {removingLanguage ? "Removing..." : "Remove Language"}
              </Button>
              <Button
                onClick={cancelLanguageAction}
                className="flex-1"
                disabled={removingLanguage}
              >
                Keep Language
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default function SettingsPage() {
  return (
    <AuthGuard fallback={<AuthLoading />}>
      <SettingsContent />
    </AuthGuard>
  );
}
