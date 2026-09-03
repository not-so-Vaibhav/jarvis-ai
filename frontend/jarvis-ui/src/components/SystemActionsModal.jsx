import React, { useState } from "react";
import {
  X,
  Terminal,
  FolderTree,
  Search,
  ExternalLink,
  Play,
} from "lucide-react";

export default function SystemActionsModal({ isOpen, onClose, onRunCommand }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [appName, setAppName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "600px" }}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, #10b981, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Terminal size={18} />
            </div>
            <div>
              <span>Mac System Actions</span>
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                Local Python OS Automations (backend/actions.py)
              </span>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Action Blocks */}
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Action 1: List Files */}
          <div style={{ background: "#f8fafc", padding: "14px 16px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FolderTree size={18} color="#3b82f6" />
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>List Workspace Files</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Inspect current files in the project workspace</div>
                </div>
              </div>
              <button
                type="button"
                className="search-space-btn"
                style={{ borderRadius: "10px", padding: "6px 14px", fontSize: "0.8rem" }}
                onClick={() => {
                  onRunCommand("list files");
                  onClose();
                }}
              >
                <Play size={13} />
                <span>Execute</span>
              </button>
            </div>
          </div>

          {/* Action 2: Search File */}
          <div style={{ background: "#f8fafc", padding: "14px 16px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Search size={18} color="#10b981" />
              <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>Search File by Name</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                placeholder="e.g. actions.py, main.py, package.json..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  fontSize: "0.85rem",
                  outline: "none",
                }}
              />
              <button
                type="button"
                className="search-space-btn"
                style={{ background: "#10b981", borderRadius: "10px", padding: "6px 14px", fontSize: "0.8rem" }}
                disabled={!searchQuery.trim()}
                onClick={() => {
                  onRunCommand(`search file ${searchQuery.trim()}`);
                  onClose();
                }}
              >
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Action 3: Open App */}
          <div style={{ background: "#f8fafc", padding: "14px 16px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <ExternalLink size={18} color="#f59e0b" />
              <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>Launch Mac Application</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                placeholder="e.g. Notes, Terminal, Google Chrome, Calculator..."
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                style={{
                  flex: 1,
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  fontSize: "0.85rem",
                  outline: "none",
                }}
              />
              <button
                type="button"
                className="search-space-btn"
                style={{ background: "#f59e0b", borderRadius: "10px", padding: "6px 14px", fontSize: "0.8rem" }}
                disabled={!appName.trim()}
                onClick={() => {
                  onRunCommand(`open app ${appName.trim()}`);
                  onClose();
                }}
              >
                <span>Launch</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
