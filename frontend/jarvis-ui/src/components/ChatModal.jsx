import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";

export default function ChatModal({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  listening,
  onToggleListening,
  activeBot,
  speakEnabled,
  setSpeakEnabled,
}) {
  const [inputText, setInputText] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-card"
        onClick={(e) => e.stopPropagation()}
        style={{ height: "650px" }}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, #a855f7, #38bdf8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Bot size={20} />
            </div>
            <div>
              <span style={{ fontSize: "1.1rem" }}>
                {activeBot ? activeBot.name : "JARVIS Assistant"}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                {activeBot ? activeBot.description : "Voice & System Command Engine"}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Voice Speech Synthesis Toggle */}
            <button
              type="button"
              className="frosted-circle-btn"
              style={{ width: 36, height: 36 }}
              onClick={() => setSpeakEnabled(!speakEnabled)}
              title={speakEnabled ? "Voice Speech Playback: ON" : "Voice Speech Playback: OFF"}
            >
              {speakEnabled ? <Volume2 size={16} color="#3b82f6" /> : <VolumeX size={16} color="#94a3b8" />}
            </button>

            {/* Close */}
            <button type="button" className="modal-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="chat-messages-container">
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble ${m.from}`}>
              <div className="chat-bubble-header">
                {m.from === "user" ? (
                  <>
                    <User size={13} />
                    <span>You</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={13} color="#a855f7" />
                    <span>{m.botName || "JARVIS"}</span>
                  </>
                )}
                <button
                  type="button"
                  style={{
                    marginLeft: "auto",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    opacity: 0.6,
                    color: "inherit",
                    padding: 2,
                  }}
                  onClick={() => handleCopy(m.text, i)}
                  title="Copy message"
                >
                  {copiedIndex === i ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>

              <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer Input Bar */}
        <form className="chat-controls-bar" onSubmit={handleSubmit}>
          <button
            type="button"
            className={`mic-voice-btn ${listening ? "listening" : ""}`}
            style={{ width: 38, height: 38 }}
            onClick={onToggleListening}
            title={listening ? "Listening... click to stop" : "Say 'Hey Jarvis' or click mic"}
          >
            {listening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          <input
            type="text"
            className="search-input-field"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderRadius: "999px",
              padding: "10px 16px",
            }}
            placeholder="Type your message or system command (e.g. remember..., list files)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            type="submit"
            className="send-prompt-btn"
            style={{ width: 38, height: 38 }}
            disabled={!inputText.trim()}
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
