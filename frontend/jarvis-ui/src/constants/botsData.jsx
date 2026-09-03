import React from "react";

export const OFFICIAL_BOTS = [
  {
    id: "ollama-ai",
    name: "Ollama Phi AI",
    badgeColor: "#2563eb",
    bgColor: "rgba(219, 234, 254, 0.8)",
    badgeText: "Local LLM",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="4" />
        <circle cx="9" cy="10" r="1.5" fill="#2563eb" />
        <circle cx="15" cy="10" r="1.5" fill="#2563eb" />
        <path d="M8 15h8" />
      </svg>
    ),
    description: "Private local inference running directly via Ollama",
    actionCommand: "What are the core capabilities of JARVIS AI?",
  },
  {
    id: "sqlite-memory",
    name: "SQLite Memory",
    badgeColor: "#a855f7",
    bgColor: "rgba(243, 232, 255, 0.8)",
    badgeText: "Persistent",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    description: "Recalls your stored preferences, facts, and notes",
    actionCommand: "what do you remember",
  },
  {
    id: "file-system",
    name: "File Explorer",
    badgeColor: "#10b981",
    bgColor: "rgba(209, 250, 229, 0.8)",
    badgeText: "System Tool",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      </svg>
    ),
    description: "Lists directory contents and searches files on your Mac",
    actionCommand: "list files",
  },
  {
    id: "app-launcher",
    name: "App Launcher",
    badgeColor: "#f59e0b",
    bgColor: "rgba(254, 243, 199, 0.8)",
    badgeText: "Mac Automation",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 14 4-4" />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      </svg>
    ),
    description: "Launches installed Mac apps (Terminal, Notes, Chrome, etc.)",
    actionCommand: "open app Notes",
  },
];
