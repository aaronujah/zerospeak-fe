"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession();

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
        {/* Notifications */}
        <Button variant="ghost" className="p-2 relative">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-5 5v-5zM10.5 3.5a6 6 0 0 1 6 6v2l1.5 3h-15l1.5-3v-2a6 6 0 0 1 6-6z"
            />
          </svg>
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full text-xs text-white flex items-center justify-center">
            2
          </span>
        </Button>

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
    </header>
  );
}
