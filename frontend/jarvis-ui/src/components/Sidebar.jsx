import React, { useState } from "react";
import {
  Menu,
  Terminal,
  BrainCircuit,
  Radio,
  Settings,
  Zap,
  HardDrive,
  MessageSquare,
  Home,
} from "lucide-react";

export default function Sidebar({
  activeNav,
  setActiveNav,
  onOpenMemory,
  onOpenSettings,
  onOpenSystemActions,
  onOpenVoice,
  onGoHome,
  isBackendConnected,
}) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      id: "home",
      label: "Landing Showcase",
      icon: Home,
      onClick: onGoHome,
    },
    {
      id: "chat",
      label: "Live Conversation",
      icon: MessageSquare,
      onClick: () => {
        setActiveNav("chat");
        onOpenVoice();
      },
    },
    {
      id: "voice",
      label: "Voice Assistant",
      icon: Radio,
      badge: "Speech",
      onClick: () => {
        setActiveNav("voice");
        onOpenVoice();
      },
    },
    {
      id: "memory",
      label: "Memory Vault",
      icon: BrainCircuit,
      badge: "SQLite",
      onClick: () => {
        setActiveNav("memory");
        onOpenMemory();
      },
    },
    {
      id: "system",
      label: "System Actions",
      icon: Terminal,
      badge: "Mac OS",
      onClick: () => {
        setActiveNav("system");
        onOpenSystemActions();
      },
    },
    {
      id: "settings",
      label: "Voice & Settings",
      icon: Settings,
      onClick: () => {
        setActiveNav("settings");
        onOpenSettings();
      },
    },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Brand Header Card */}
      <div className="sidebar-brand-card" onClick={onGoHome} title="Return to Landing Page">
        <div className="brand-info">
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "8px",
              background: "linear-gradient(135deg, #38bdf8, #2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)",
            }}
          >
            <Zap size={16} color="#ffffff" />
          </div>
          {!collapsed && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="brand-title">JARVIS AI</span>
              <span style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 500 }}>
                Autonomous Engine
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          className="sidebar-toggle-btn"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          onClick={(e) => {
            e.stopPropagation();
            setCollapsed(!collapsed);
          }}
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="sidebar-nav" style={{ marginTop: 8 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={item.onClick}
              title={item.label}
            >
              <div className="nav-item-icon">
                <Icon size={18} />
              </div>
              {!collapsed && (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  {item.label}
                  {item.badge && (
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "999px",
                        background:
                          item.badge === "Speech"
                            ? "linear-gradient(135deg, #0284c7, #38bdf8)"
                            : item.badge === "SQLite"
                            ? "linear-gradient(135deg, #9333ea, #c084fc)"
                            : "linear-gradient(135deg, #059669, #34d399)",
                        color: "white",
                        marginLeft: "auto",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status Pill Card in Bottom */}
      {!collapsed && (
        <div
          style={{
            marginTop: "auto",
            padding: "14px",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid var(--glass-border)",
            borderRadius: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", fontWeight: 700 }}>
              <HardDrive size={14} color="#2563eb" />
              <span>System Status</span>
            </div>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: isBackendConnected ? "#10b981" : "#f59e0b",
                boxShadow: isBackendConnected
                  ? "0 0 8px rgba(16, 185, 129, 0.6)"
                  : "0 0 8px rgba(245, 158, 11, 0.6)",
              }}
            />
          </div>

          <div style={{ fontSize: "0.72rem", color: "#64748b", lineHeight: 1.4 }}>
            Backend: <strong>{isBackendConnected ? "127.0.0.1:8000 (Live)" : "Standalone"}</strong><br />
            Memory: <strong>SQLite DB</strong><br />
            Wake Word: <strong>"Hey Jarvis"</strong>
          </div>
        </div>
      )}
    </aside>
  );
}
