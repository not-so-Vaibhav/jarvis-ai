import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Send,
  Brain,
  Terminal,
  Search,
  FolderTree,
  Zap,
} from "lucide-react";
import { CATEGORIES } from "../constants/categoriesData";

export default function PromptBar({
  activeCategory,
  onSendMessage,
  listening,
  onToggleListening,
}) {
  const [inputText, setInputText] = useState("");

  const currentCategory =
    CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const messageToSend = inputText.trim() || currentCategory.suggestions[0];
    if (!messageToSend) return;

    onSendMessage(messageToSend);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChipAction = (action) => {
    switch (action) {
      case "list-files":
        onSendMessage("list files");
        break;
      case "recall-memory":
        onSendMessage("what do you remember");
        break;
      case "search-file":
        setInputText("search file ");
        break;
      case "open-app":
        setInputText("open app ");
        break;
      case "remember":
        setInputText("remember ");
        break;
      default:
        break;
    }
  };

  return (
    <div className="prompt-section">
      {/* Top Banner Row */}
      <div className="prompt-top-banner">
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#1e2229", fontSize: "0.82rem" }}>
          <Zap size={14} color="#2563eb" />
          <span>JARVIS Neural Core v2.6</span>
        </div>
        <div className="powered-by-badge">
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: listening ? "#ef4444" : "#10b981",
              boxShadow: listening ? "0 0 8px rgba(239, 68, 68, 0.8)" : "none",
            }}
          />
          <span>{listening ? "Listening for speech..." : 'Wake word: "Hey Jarvis"'}</span>
        </div>
      </div>

      {/* Main Floating Input Card */}
      <form className="prompt-input-card" onSubmit={handleSubmit}>
        <div className="prompt-input-row">
          {/* Text Input */}
          <textarea
            className="prompt-textarea-input"
            placeholder={`| ${currentCategory.placeholder}`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />

          {/* Right Action Buttons */}
          <div className="prompt-action-buttons-right">
            {/* Mic Voice Button */}
            <button
              type="button"
              className={`mic-voice-btn ${listening ? "listening" : ""}`}
              onClick={onToggleListening}
              title={listening ? "Listening... (Click to stop)" : "Speak to JARVIS (Say 'Hey Jarvis')"}
            >
              {listening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              className="send-prompt-btn"
              title="Send message (Enter)"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* Quick Action Chips inside Input */}
        <div className="prompt-chips-row">
          <button
            type="button"
            className="prompt-chip dark"
            onClick={() => handleChipAction("list-files")}
            title="Execute 'list files' on your local workspace"
          >
            <FolderTree size={13} color="#38bdf8" />
            <span>List Files</span>
          </button>

          <button
            type="button"
            className="prompt-chip"
            onClick={() => handleChipAction("recall-memory")}
            title="Recall all facts stored in SQLite memory"
          >
            <Brain size={13} color="#a855f7" />
            <span>What do you remember?</span>
          </button>

          <button
            type="button"
            className="prompt-chip"
            onClick={() => handleChipAction("remember")}
            title="Save a new memory to SQLite"
          >
            <Zap size={13} color="#f59e0b" />
            <span>Remember...</span>
          </button>

          <button
            type="button"
            className="prompt-chip"
            onClick={() => handleChipAction("search-file")}
            title="Search for a file on your system"
          >
            <Search size={13} color="#10b981" />
            <span>Search File</span>
          </button>

          <button
            type="button"
            className="prompt-chip"
            onClick={() => handleChipAction("open-app")}
            title="Launch an application on Mac"
          >
            <Terminal size={13} color="#ef4444" />
            <span>Open App</span>
          </button>
        </div>
      </form>
    </div>
  );
}
