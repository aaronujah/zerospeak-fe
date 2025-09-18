"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import AuthGuard from "@/components/auth/AuthGuard";
import AuthLoading from "@/components/auth/AuthLoading";
import { JournalEntry, JournalFilters, JournalPrompt } from "@/types/journal";
import {
  useJournalEntries,
  useJournalPrompts,
  useCreateJournalEntry,
  useUpdateJournalEntry,
  useDeleteJournalEntry,
} from "@/hooks/useJournal";

const EntryCard = ({
  entry,
  onEdit,
  onDelete,
}: {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
}) => {
  const [showFull, setShowFull] = useState(false);
  const maxPreviewLength = 200;
  const needsTruncation = entry.content.length > maxPreviewLength;

  const getLanguageColor = () => {
    switch (entry.languageId) {
      case "es":
        return "bg-orange-100 text-orange-800";
      case "en":
        return "bg-blue-100 text-blue-800";
      case "fr":
        return "bg-purple-100 text-purple-800";
      case "de":
        return "bg-yellow-100 text-yellow-800";
      case "it":
        return "bg-green-100 text-green-800";
      case "pt":
        return "bg-red-100 text-red-800";
      case "ja":
        return "bg-pink-100 text-pink-800";
      case "ko":
        return "bg-indigo-100 text-indigo-800";
      case "zh":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLanguageName = () => {
    switch (entry.languageId) {
      case "es":
        return "Spanish";
      case "en":
        return "English";
      case "fr":
        return "French";
      case "de":
        return "German";
      case "it":
        return "Italian";
      case "pt":
        return "Portuguese";
      case "ja":
        return "Japanese";
      case "ko":
        return "Korean";
      case "zh":
        return "Chinese";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 truncate">
            {entry.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {new Date(entry.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(entry)}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor()}`}
        >
          {getLanguageName()}
        </span>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
          {entry.wordCount || 0} words
        </span>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
          {entry.readingTime || 0} min read
        </span>
      </div>

      <div className="prose prose-sm max-w-none mb-4">
        <p className="text-slate-700 whitespace-pre-wrap">
          {needsTruncation && !showFull
            ? `${entry.content.substring(0, maxPreviewLength)}...`
            : entry.content}
        </p>
        {needsTruncation && (
          <button
            onClick={() => setShowFull(!showFull)}
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mt-2"
          >
            {showFull ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {entry.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {entry.prompt && (
        <div className="bg-slate-50 rounded-lg p-3 mb-4">
          <div className="text-xs font-medium text-slate-500 mb-1">PROMPT</div>
          <div className="text-sm text-slate-700">{entry.prompt.title}</div>
        </div>
      )}

      {entry.studySession && (
        <div className="bg-emerald-50 rounded-lg p-3">
          <div className="text-xs font-medium text-emerald-700 mb-2">
            STUDY SESSION
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-emerald-600">
            <div>{entry.studySession.duration || 0} min</div>
            <div>{entry.studySession.wordsLearned || 0} words</div>
            <div>{entry.studySession.lessonsCompleted || 0} lessons</div>
          </div>
        </div>
      )}
    </div>
  );
};

function JournalContent() {
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [showPromptsModal, setShowPromptsModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  // Use API hooks
  const { data: entries, loading, error, refetch } = useJournalEntries();
  const { data: prompts } = useJournalPrompts();
  const { mutate: createEntry, loading: creating } = useCreateJournalEntry();
  const { mutate: updateEntry, loading: updating } = useUpdateJournalEntry();
  const { mutate: deleteEntry, loading: deleting } = useDeleteJournalEntry();

  // Filters
  const [filters] = useState<JournalFilters>({
    sortBy: "newest",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // New entry form
  const [newEntryForm, setNewEntryForm] = useState({
    title: "",
    content: "",
    languageId: "es", // Default to Spanish
    tags: "",
    promptId: "",
  });

  const [formErrors, setFormErrors] = useState<{
    title?: string;
    content?: string;
  }>({});

  // No need for useEffect since hooks handle loading automatically

  const handleNewEntry = () => {
    setShowNewEntryModal(true);
    setEditingEntry(null);
    setNewEntryForm({
      title: "",
      content: "",
      languageId: "es",
      tags: "",
      promptId: "",
    });
    setFormErrors({});
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setNewEntryForm({
      title: entry.title,
      content: entry.content,
      languageId: entry.languageId || "es",
      tags: entry.tags.join(", "),
      promptId: entry.prompt?.id || "",
    });
    setShowNewEntryModal(true);
    setFormErrors({});
  };

  const handleDeleteEntry = async (id: string) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      try {
        await deleteEntry(id);
        refetch(); // Refresh the entries list
      } catch (error) {
        console.error("Failed to delete entry:", error);
      }
    }
  };

  const validateForm = () => {
    const errors: { title?: string; content?: string } = {};

    if (!newEntryForm.title.trim()) {
      errors.title = "Title is required";
    }

    if (!newEntryForm.content.trim()) {
      errors.content = "Content is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitEntry = async () => {
    if (!validateForm()) return;

    const entryData = {
      title: newEntryForm.title.trim(),
      content: newEntryForm.content.trim(),
      languageId: newEntryForm.languageId,
      tags: newEntryForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isPublic: false, // Default to private
    };

    try {
      if (editingEntry) {
        await updateEntry({ id: editingEntry.id, data: entryData });
      } else {
        await createEntry(entryData);
      }

      setShowNewEntryModal(false);
      refetch(); // Refresh the entries list
    } catch (error) {
      console.error("Failed to save entry:", error);
    }
  };

  const filteredEntries = (entries || []).filter((entry) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      entry.title.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your journal...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 rounded-xl">
                  <svg
                    className="w-6 h-6 text-white"
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
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    Learning Journal
                  </h1>
                  <p className="text-slate-600 mt-1">
                    Reflect on your Spanish learning journey
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPromptsModal(true)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <span>Writing Prompts</span>
                </button>
                <button
                  onClick={handleNewEntry}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>New Entry</span>
                </button>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">
                Error loading journal: {error.message}
              </p>
              <button
                onClick={() => refetch()}
                className="mt-2 text-red-600 hover:text-red-700 font-medium"
              >
                Try again
              </button>
            </div>
          )}

          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search entries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Entries Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Recent Entries
              </h2>
              <span className="text-sm text-slate-600">
                Showing {filteredEntries.length} of {entries?.length || 0}{" "}
                entries
              </span>
            </div>

            {filteredEntries.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEntries.map((entry) => (
                  <EntryCard
                    key={entry.id}
                    entry={entry}
                    onEdit={handleEditEntry}
                    onDelete={handleDeleteEntry}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
                  <svg
                    className="w-8 h-8 text-slate-400"
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
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No entries found
                </h3>
                <p className="text-slate-600 mb-4">
                  {searchQuery
                    ? "Try adjusting your search."
                    : "Start your learning journal today!"}
                </p>
                <button
                  onClick={handleNewEntry}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Write your first entry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New/Edit Entry Modal */}
      {showNewEntryModal && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 cursor-pointer"
            onClick={() => setShowNewEntryModal(false)}
          ></div>
          <div className="flex min-h-full items-center justify-center p-4 pointer-events-none">
            <div
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {editingEntry ? "Edit Entry" : "New Journal Entry"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Share your thoughts and reflections on your Spanish learning
                  journey.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Give your entry a title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    value={newEntryForm.title}
                    onChange={(e) =>
                      setNewEntryForm({
                        ...newEntryForm,
                        title: e.target.value,
                      })
                    }
                  />
                  {formErrors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    rows={12}
                    placeholder="Write about your learning experience, challenges, breakthroughs, or anything else..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 resize-none"
                    value={newEntryForm.content}
                    onChange={(e) =>
                      setNewEntryForm({
                        ...newEntryForm,
                        content: e.target.value,
                      })
                    }
                  />
                  {formErrors.content && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.content}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    value={newEntryForm.languageId}
                    onChange={(e) =>
                      setNewEntryForm({
                        ...newEntryForm,
                        languageId: e.target.value,
                      })
                    }
                  >
                    <option value="es">🇪🇸 Spanish</option>
                    <option value="en">🇺🇸 English</option>
                    <option value="fr">🇫🇷 French</option>
                    <option value="de">🇩🇪 German</option>
                    <option value="it">🇮🇹 Italian</option>
                    <option value="pt">🇵🇹 Portuguese</option>
                    <option value="ja">🇯🇵 Japanese</option>
                    <option value="ko">🇰🇷 Korean</option>
                    <option value="zh">🇨🇳 Chinese</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="vocabulary, grammar, culture (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    value={newEntryForm.tags}
                    onChange={(e) =>
                      setNewEntryForm({ ...newEntryForm, tags: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Writing Prompt (Optional)
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    value={newEntryForm.promptId}
                    onChange={(e) =>
                      setNewEntryForm({
                        ...newEntryForm,
                        promptId: e.target.value,
                      })
                    }
                  >
                    <option value="">No prompt</option>
                    {prompts.map((prompt) => (
                      <option key={prompt.id} value={prompt.id}>
                        {prompt.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowNewEntryModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitEntry}
                    disabled={creating || updating}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50"
                  >
                    {creating || updating
                      ? "Saving..."
                      : editingEntry
                      ? "Update Entry"
                      : "Save Entry"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Writing Prompts Modal */}
      {showPromptsModal && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 cursor-pointer"
            onClick={() => setShowPromptsModal(false)}
          ></div>
          <div className="flex min-h-full items-center justify-center p-4 pointer-events-none">
            <div
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6 pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Writing Prompts
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get inspired with these writing prompts to help you reflect on
                  your learning journey.
                </p>
              </div>

              <div className="grid gap-4">
                {(prompts || []).map((prompt) => (
                  <div key={prompt.id} className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-slate-900">
                        {prompt.title}
                      </h4>
                      <div className="flex space-x-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            prompt.category === "daily"
                              ? "bg-blue-100 text-blue-800"
                              : prompt.category === "culture"
                              ? "bg-purple-100 text-purple-800"
                              : prompt.category === "vocabulary"
                              ? "bg-green-100 text-green-800"
                              : prompt.category === "goals"
                              ? "bg-yellow-100 text-yellow-800"
                              : prompt.category === "practice"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {prompt.category}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            prompt.level === "beginner"
                              ? "bg-green-100 text-green-800"
                              : prompt.level === "intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {prompt.level}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-700 mb-3">{prompt.prompt}</p>
                    {prompt.example && (
                      <div className="text-sm text-slate-500 italic">
                        Example: {prompt.example}
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setNewEntryForm({
                          ...newEntryForm,
                          promptId: prompt.id,
                        });
                        setShowPromptsModal(false);
                        setShowNewEntryModal(true);
                      }}
                      className="mt-3 text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Use this prompt →
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t mt-6">
                <button
                  type="button"
                  onClick={() => setShowPromptsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default function JournalPage() {
  return (
    <AuthGuard fallback={<AuthLoading />}>
      <JournalContent />
    </AuthGuard>
  );
}
