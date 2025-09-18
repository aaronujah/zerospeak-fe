"use client";

import { useState, useRef, useEffect } from "react";
import { ContentItem } from "@/types/content";
// Utility function for formatting duration
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

interface MediaPlayerProps {
  content: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MediaPlayer({
  content,
  isOpen,
  onClose,
}: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case " ":
          e.preventDefault();
          togglePlay();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const togglePlay = () => {
    const mediaElement =
      content?.type === "video" ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    if (isPlaying) {
      mediaElement.pause();
    } else {
      mediaElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const mediaElement =
      content?.type === "video" ? videoRef.current : audioRef.current;
    if (mediaElement) {
      setCurrentTime(mediaElement.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mediaElement =
      content?.type === "video" ? videoRef.current : audioRef.current;
    if (mediaElement) {
      const newTime = parseFloat(e.target.value);
      mediaElement.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{content.creator.avatar}</div>
            <div>
              <h2 className="font-semibold text-slate-900">{content.title}</h2>
              <p className="text-sm text-slate-600">{content.creator.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Media Content */}
        <div className="relative">
          {content.type === "video" ? (
            <div className="relative bg-black">
              <video
                ref={videoRef}
                className="w-full aspect-video"
                poster={content.thumbnail}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={content.url} type="video/mp4" />
                {content.subtitles?.map((subtitle) => (
                  <track
                    key={subtitle.language}
                    kind="subtitles"
                    src={subtitle.url}
                    srcLang={subtitle.language.toLowerCase()}
                    label={subtitle.language}
                    default={subtitle.language === "Spanish"}
                  />
                ))}
                Your browser does not support the video tag.
              </video>

              {/* Video overlay message */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-xl mb-2">Demo Video Player</p>
                  <p className="text-sm opacity-75">
                    In a real app, this would play: {content.title}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {content.type === "audio"
                    ? "🎵"
                    : content.type === "podcast"
                    ? "🎙️"
                    : "📚"}
                </div>
                <h3 className="text-xl font-semibold text-emerald-900 mb-2">
                  {content.title}
                </h3>
                <p className="text-emerald-700">Demo Audio Player</p>
                <p className="text-sm text-emerald-600 mt-2">
                  In a real app, this would play the audio content
                </p>
              </div>
              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source
                  src={content.audioUrl || content.url}
                  type="audio/mpeg"
                />
                Your browser does not support the audio tag.
              </audio>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 space-y-4">
          {/* Progress bar */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={content.duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-slate-500">
              <span>{formatDuration(Math.floor(currentTime))}</span>
              <span>{formatDuration(content.duration)}</span>
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-12 h-12 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
            >
              {isPlaying ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {content.type === "video" && (
              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showSubtitles
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Subtitles
              </button>
            )}
          </div>

          {/* Content info */}
          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-600 mb-3">{content.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-slate-500">
                <span>{content.views.toLocaleString()} views</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    content.level === "beginner"
                      ? "bg-green-100 text-green-800"
                      : content.level === "intermediate"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {content.level}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {content.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
