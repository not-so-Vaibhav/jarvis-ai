import React from "react";
import { X, Settings, Volume2, Globe, Sparkles, Sliders, Shield } from "lucide-react";

export default function SettingsModal({
  isOpen,
  onClose,
  backendUrl,
  setBackendUrl,
  voiceRate,
  setVoiceRate,
  voicePitch,
  setVoicePitch,
  speakEnabled,
  setSpeakEnabled,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "560px" }}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, #1e2229, #475569)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Settings size={20} />
            </div>
            <span>Settings & Preferences</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Backend URL */}
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", fontWeight: 600, marginBottom: 6 }}>
              <Globe size={15} color="#3b82f6" />
              <span>FastAPI Backend URL</span>
            </label>
            <input
              type="text"
              className="search-input-field"
              style={{
                width: "100%",
                background: "#f8fafc",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderRadius: "12px",
                padding: "8px 14px",
                fontSize: "0.9rem",
              }}
              value={backendUrl}
              onChange={(e) => setBackendUrl(e.target.value)}
              placeholder="http://127.0.0.1:8000/jarvis"
            />
            <span style={{ fontSize: "0.72rem", color: "#64748b", marginTop: 4, display: "block" }}>
              Target endpoint for local Ollama & Jarvis memory actions.
            </span>
          </div>

          {/* Voice Output Toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#f8fafc", borderRadius: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Volume2 size={18} color="#a855f7" />
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 600 }}>Speech Synthesis Audio</div>
                <div style={{ fontSize: "0.74rem", color: "#64748b" }}>Read Jarvis responses out loud via browser speech engine</div>
              </div>
            </div>
            <input
              type="checkbox"
              style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#a855f7" }}
              checked={speakEnabled}
              onChange={(e) => setSpeakEnabled(e.target.checked)}
            />
          </div>

          {/* Voice Controls: Rate & Pitch */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 600, marginBottom: 4 }}>
                <span>Voice Speech Rate</span>
                <span>{voiceRate}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={voiceRate}
                onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "#3b82f6" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 600, marginBottom: 4 }}>
                <span>Voice Speech Pitch</span>
                <span>{voicePitch}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={voicePitch}
                onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "#a855f7" }}
              />
            </div>
          </div>

          {/* Security / Engine info */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#f1f5f9", borderRadius: "12px", fontSize: "0.78rem", color: "#475569" }}>
            <Shield size={16} color="#10b981" />
            <span>Local privacy mode enabled. All memory and voice inputs are processed locally on your device.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
