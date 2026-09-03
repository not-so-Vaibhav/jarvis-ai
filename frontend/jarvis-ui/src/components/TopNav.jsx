import React from "react";
import { Search, Volume2, VolumeX, Home } from "lucide-react";

export default function TopNav({
  searchTerm,
  setSearchTerm,
  onSearchSubmit,
  onOpenVoice,
  onGoHome,
  speakEnabled,
  setSpeakEnabled,
  isBackendConnected,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      onSearchSubmit(searchTerm.trim());
      setSearchTerm("");
    }
  };

  return (
    <header className="top-nav">
      {/* Search & Command Input Pill */}
      <div className="search-pill-container">
        <Search size={18} color="#94a3b8" />
        <input
          type="text"
          className="search-input-field"
          placeholder='Ask JARVIS or run: "list files", "remember...", "open app Notes"...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="search-space-btn"
          onClick={() => {
            if (searchTerm.trim()) {
              onSearchSubmit(searchTerm.trim());
              setSearchTerm("");
            } else {
              onOpenVoice();
            }
          }}
          title="Run command or speak"
        >
          <span>Run</span>
        </button>
      </div>

      {/* Right Action Group */}
      <div className="top-nav-actions">
        {/* Return to Landing Button */}
        <button
          type="button"
          className="frosted-circle-btn"
          onClick={onGoHome}
          title="Return to Landing Showcase"
        >
          <Home size={18} color="#475569" />
        </button>

        {/* Backend Status indicator */}
        <div
          title={isBackendConnected ? "Connected to Local FastAPI Engine (localhost:8000)" : "Connecting to Local Backend..."}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.78rem",
            fontWeight: 600,
            padding: "6px 14px",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.75)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(12px)",
            color: isBackendConnected ? "#15803d" : "#b45309",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isBackendConnected ? "#22c55e" : "#f59e0b",
              boxShadow: isBackendConnected
                ? "0 0 8px rgba(34, 197, 94, 0.6)"
                : "0 0 8px rgba(245, 158, 11, 0.6)",
            }}
          />
          <span>{isBackendConnected ? "FastAPI :8000" : "Standalone"}</span>
        </div>

        {/* Speech Audio Toggle */}
        <button
          type="button"
          className="frosted-circle-btn"
          onClick={() => setSpeakEnabled(!speakEnabled)}
          title={speakEnabled ? "Voice Speech Output: ON" : "Voice Speech Output: OFF"}
        >
          {speakEnabled ? <Volume2 size={18} color="#2563eb" /> : <VolumeX size={18} color="#94a3b8" />}
        </button>

        {/* User Profile Badge for Vaibhav */}
        <div
          className="user-profile-badge"
          title="JARVIS Administrator"
        >
          <div
            className="user-avatar-img"
            style={{
              background: "linear-gradient(135deg, #2563eb, #38bdf8)",
            }}
          >
            <span>V</span>
          </div>
          <div className="user-meta-info">
            <span className="user-display-name">Vaibhav</span>
            <span className="user-handle">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
