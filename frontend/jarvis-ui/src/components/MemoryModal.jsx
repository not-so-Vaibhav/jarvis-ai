import React, { useState } from "react";
import {
  X,
  Brain,
  Plus,
  Trash2,
  Search,
  Sparkles,
  Check,
  Bookmark,
} from "lucide-react";

export default function MemoryModal({
  isOpen,
  onClose,
  memories,
  onAddMemory,
  onDeleteMemory,
}) {
  const [newMemory, setNewMemory] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  if (!isOpen) return null;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newMemory.trim()) return;
    onAddMemory(newMemory.trim());
    setNewMemory("");
  };

  const filtered = memories.filter((m) =>
    m.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "600px", height: "550px" }}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Brain size={20} />
            </div>
            <div>
              <span>JARVIS Memory Vault</span>
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                Persistent SQLite Memory & Knowledge Base
              </span>
            </div>
          </div>

          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14, flex: 1, overflow: "hidden" }}>
          {/* Add Memory Form */}
          <form onSubmit={handleAdd} style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              className="search-input-field"
              style={{
                background: "#f8fafc",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderRadius: "14px",
                padding: "8px 14px",
                fontSize: "0.9rem",
              }}
              placeholder="e.g. My favorite framework is React with Tailwind..."
              value={newMemory}
              onChange={(e) => setNewMemory(e.target.value)}
            />
            <button
              type="submit"
              className="search-space-btn"
              style={{ background: "#a855f7", borderRadius: "14px" }}
              disabled={!newMemory.trim()}
            >
              <Plus size={16} />
              <span>Remember</span>
            </button>
          </form>

          {/* Search Filter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#f1f5f9",
              borderRadius: "12px",
              padding: "6px 12px",
            }}
          >
            <Search size={14} color="#94a3b8" />
            <input
              type="text"
              placeholder="Filter memories..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "0.85rem",
                width: "100%",
              }}
            />
          </div>

          {/* List */}
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, paddingRight: 4 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", color: "#94a3b8", padding: "30px 0", fontSize: "0.9rem" }}>
                <Bookmark size={32} style={{ opacity: 0.4, marginBottom: 8 }} />
                <p>No saved memories found.</p>
                <p style={{ fontSize: "0.78rem" }}>Say "Hey Jarvis, remember [info]" or add one above!</p>
              </div>
            ) : (
              filtered.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    borderRadius: "14px",
                    fontSize: "0.88rem",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Sparkles size={14} color="#a855f7" />
                    <span>{item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteMemory(item)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#ef4444",
                      cursor: "pointer",
                      padding: 4,
                      opacity: 0.7,
                    }}
                    title="Delete Memory"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
