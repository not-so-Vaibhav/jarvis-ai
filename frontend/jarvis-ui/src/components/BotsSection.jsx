import React from "react";
import { OFFICIAL_BOTS } from "../constants/botsData";

export default function BotsSection({ onSelectBot }) {
  return (
    <section className="bots-section" style={{ maxWidth: "800px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px" }}>
        <h3 className="bots-section-title">Core System Engines</h3>
        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>
          {OFFICIAL_BOTS.length} Built-in Engines
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "14px",
          marginTop: "8px",
        }}
      >
        {OFFICIAL_BOTS.map((bot) => (
          <div
            key={bot.id}
            onClick={() => onSelectBot(bot)}
            style={{
              background: "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "20px",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)",
            }}
            className="jarvis-engine-card"
            title={`Click to run ${bot.name} action`}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "14px",
                  background: bot.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {bot.icon}
              </div>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.9)",
                  color: bot.badgeColor,
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                }}
              >
                {bot.badgeText}
              </span>
            </div>

            <div>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-main)" }}>
                {bot.name}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "3px", lineHeight: 1.3 }}>
                {bot.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
