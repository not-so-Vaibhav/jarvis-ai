import React, { useState } from "react";
import {
  Zap,
  ArrowRight,
  Mic,
  Brain,
  Terminal,
  Shield,
  Play,
  Cpu,
  CheckCircle2,
  Layers,
  Sparkles,
  Command,
  FolderTree,
  Volume2,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function LandingPage({ onGetStarted, isBackendConnected }) {
  const [activeDemoTab, setActiveDemoTab] = useState("voice");

  const handleLaunch = (e) => {
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 50,
        spread: 80,
        origin: { x, y },
        colors: ["#38bdf8", "#2563eb", "#818cf8", "#a855f7"],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }
    onGetStarted();
  };

  return (
    <div className="landing-page-wrapper">
      {/* Top Landing Navigation */}
      <header className="landing-navbar">
        <div className="landing-brand">
          <div className="landing-logo-box">
            <Zap size={18} color="#ffffff" />
          </div>
          <span className="landing-brand-name">JARVIS AI</span>
          <span className="landing-version-badge">v2.6 Core</span>
        </div>

        <nav className="landing-nav-links">
          <a href="#features" className="landing-nav-link">Features</a>
          <a href="#demo" className="landing-nav-link">Live Terminal</a>
          <a href="#architecture" className="landing-nav-link">Architecture</a>
          <a href="#memory" className="landing-nav-link">Memory Vault</a>
        </nav>

        <div className="landing-nav-actions">
          <div className="landing-status-pill">
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: isBackendConnected ? "#22c55e" : "#f59e0b",
                boxShadow: isBackendConnected
                  ? "0 0 8px rgba(34, 197, 94, 0.7)"
                  : "0 0 8px rgba(245, 158, 11, 0.7)",
              }}
            />
            <span>{isBackendConnected ? "Engine Online" : "Demo Mode"}</span>
          </div>

          <button
            type="button"
            className="landing-get-started-btn"
            onClick={handleLaunch}
          >
            <span>Get Started</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero-section">
        <div className="landing-announcement-chip">
          <Sparkles size={14} color="#38bdf8" />
          <span>Next-Gen Autonomous Assistant • Private & Local-First</span>
        </div>

        <h1 className="landing-main-title">
          The Future of Personal AI.<br />
          <span className="landing-gradient-text">Autonomous. Private. On Your Mac.</span>
        </h1>

        <p className="landing-hero-subtitle">
          JARVIS AI combines continuous hands-free voice recognition, persistent SQLite memory, and native Mac OS system automations — powered by local Ollama & FastAPI with zero cloud lock-in.
        </p>

        {/* Hero CTA Group */}
        <div className="landing-hero-cta-group">
          <button
            type="button"
            className="landing-primary-cta-btn"
            onClick={handleLaunch}
          >
            <Zap size={18} />
            <span>Get Started — Launch JARVIS</span>
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            className="landing-secondary-cta-btn"
            onClick={handleLaunch}
          >
            <Mic size={18} color="#2563eb" />
            <span>Say "Hey Jarvis"</span>
          </button>
        </div>

        {/* Interactive Holographic Core Preview Card */}
        <div className="landing-hero-mockup-card">
          <div className="mockup-header-bar">
            <div className="mockup-dots">
              <span className="mockup-dot red" />
              <span className="mockup-dot yellow" />
              <span className="mockup-dot green" />
            </div>
            <div className="mockup-header-title">jarvis-ai-core // status: active</div>
            <div className="mockup-header-badge">localhost:8000 (FastAPI)</div>
          </div>

          <div className="mockup-body">
            <div className="mockup-orb-column">
              <div className="landing-mini-orb" />
              <div className="mockup-pulse-ring" />
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1e293b", marginTop: 8 }}>
                Neural Arc Core
              </span>
              <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
                Listening for wake word
              </span>
            </div>

            <div className="mockup-terminal-column">
              <div className="terminal-line">
                <span className="terminal-prompt">&gt;</span>
                <span className="terminal-cmd">Hey Jarvis, what do you remember about me?</span>
              </div>
              <div className="terminal-response">
                <span className="terminal-tag">JARVIS:</span> Here is what I remember from your SQLite Vault:
                <br />• Name: <strong>Vaibhav</strong>
                <br />• Stack: <strong>React, Vite, Python FastAPI</strong>
                <br />• Operating System: <strong>Mac OS (Darwin ARM64)</strong>
              </div>

              <div className="terminal-line" style={{ marginTop: 10 }}>
                <span className="terminal-prompt">&gt;</span>
                <span className="terminal-cmd">list files</span>
              </div>
              <div className="terminal-response">
                <span className="terminal-tag">JARVIS:</span> Found 4 active workspace modules:
                <br />[OK] frontend/jarvis-ui (React 19 + Glassmorphism UI)
                <br />[OK] backend/main.py (FastAPI Server + Voice Dispatch)
                <br />[OK] backend/actions.py (Mac OS System Controller)
                <br />[OK] backend/jarvis_memory.db (SQLite Knowledge Base)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars Section */}
      <section id="features" className="landing-features-section">
        <div className="landing-section-header">
          <div className="landing-pill-tag">Core Architecture</div>
          <h2 className="landing-section-title">Built for Speed, Privacy & Power</h2>
          <p className="landing-section-desc">
            Everything you need for an authentic, seamless autonomous AI assistant running right on your workstation.
          </p>
        </div>

        <div className="landing-features-grid">
          {/* Feature 1 */}
          <div className="landing-feature-card">
            <div className="feature-icon-box blue">
              <Mic size={24} color="#2563eb" />
            </div>
            <h3 className="feature-card-title">Continuous Speech & Wake Word</h3>
            <p className="feature-card-desc">
              Speak naturally. JARVIS monitors for the "Hey Jarvis" wake word using the Web Speech API and responds with real-time SpeechSynthesis audio.
            </p>
            <div className="feature-card-badge">Web Speech API & TTS</div>
          </div>

          {/* Feature 2 */}
          <div className="landing-feature-card">
            <div className="feature-icon-box purple">
              <Brain size={24} color="#9333ea" />
            </div>
            <h3 className="feature-card-title">Persistent SQLite Memory Vault</h3>
            <p className="feature-card-desc">
              Tell JARVIS "remember [fact]" and recall it anytime. Backed by a local SQLite relational store that persists across sessions.
            </p>
            <div className="feature-card-badge">jarvis_memory.db</div>
          </div>

          {/* Feature 3 */}
          <div className="landing-feature-card">
            <div className="feature-icon-box green">
              <Terminal size={24} color="#059669" />
            </div>
            <h3 className="feature-card-title">Mac OS System Automations</h3>
            <p className="feature-card-desc">
              Execute real system operations: list project directory files, search deep folder trees, and launch desktop applications (Notes, Terminal, Chrome).
            </p>
            <div className="feature-card-badge">Native OS Controller</div>
          </div>

          {/* Feature 4 */}
          <div className="landing-feature-card">
            <div className="feature-icon-box amber">
              <Cpu size={24} color="#d97706" />
            </div>
            <h3 className="feature-card-title">100% Private On-Device LLM</h3>
            <p className="feature-card-desc">
              Integrates with Ollama (Phi, Llama 3) for private offline inference. Your prompts and private memories never leave your machine.
            </p>
            <div className="feature-card-badge">Local Ollama Engine</div>
          </div>
        </div>
      </section>

      {/* Interactive Live Terminal Showcase */}
      <section id="demo" className="landing-terminal-section">
        <div className="landing-section-header">
          <div className="landing-pill-tag">Interactive Preview</div>
          <h2 className="landing-section-title">Test Drive JARVIS Commands</h2>
          <p className="landing-section-desc">
            Click any command below to see how JARVIS executes instructions in real-time.
          </p>
        </div>

        <div className="interactive-demo-card">
          <div className="demo-tabs-row">
            <button
              type="button"
              className={`demo-tab-btn ${activeDemoTab === "voice" ? "active" : ""}`}
              onClick={() => setActiveDemoTab("voice")}
            >
              <Mic size={16} />
              <span>Voice / Wake Word</span>
            </button>
            <button
              type="button"
              className={`demo-tab-btn ${activeDemoTab === "memory" ? "active" : ""}`}
              onClick={() => setActiveDemoTab("memory")}
            >
              <Brain size={16} />
              <span>Memory Recall</span>
            </button>
            <button
              type="button"
              className={`demo-tab-btn ${activeDemoTab === "system" ? "active" : ""}`}
              onClick={() => setActiveDemoTab("system")}
            >
              <Terminal size={16} />
              <span>System Actions</span>
            </button>
          </div>

          <div className="demo-content-body">
            {activeDemoTab === "voice" && (
              <div className="demo-output-box">
                <div className="demo-user-msg">
                  <span className="demo-badge user">User (Voice)</span>
                  <span>"Hey Jarvis, explain quantum computing in simple terms."</span>
                </div>
                <div className="demo-jarvis-msg">
                  <span className="demo-badge jarvis">JARVIS AI</span>
                  <span>"Quantum computing uses quantum bits or qubits that can exist as 0, 1, or both simultaneously (superposition). This allows quantum computers to solve complex calculations exponentially faster than classical computers."</span>
                </div>
              </div>
            )}

            {activeDemoTab === "memory" && (
              <div className="demo-output-box">
                <div className="demo-user-msg">
                  <span className="demo-badge user">User</span>
                  <span>"what do you remember"</span>
                </div>
                <div className="demo-jarvis-msg">
                  <span className="demo-badge jarvis">JARVIS AI</span>
                  <span>"Here’s what I remember from SQLite:<br />- User is Vaibhav<br />- Laptop model: Mac OS<br />- Favorite stack: React + FastAPI + SQLite"</span>
                </div>
              </div>
            )}

            {activeDemoTab === "system" && (
              <div className="demo-output-box">
                <div className="demo-user-msg">
                  <span className="demo-badge user">User</span>
                  <span>"list files"</span>
                </div>
                <div className="demo-jarvis-msg">
                  <span className="demo-badge jarvis">JARVIS AI</span>
                  <span>"Workspace Files:<br />• backend/main.py<br />• backend/actions.py<br />• backend/memory.py<br />• frontend/jarvis-ui/src/App.jsx"</span>
                </div>
              </div>
            )}
          </div>

          <div className="demo-card-footer">
            <span>Ready to talk to your own JARVIS?</span>
            <button type="button" className="landing-primary-cta-btn" onClick={handleLaunch} style={{ padding: "8px 18px", fontSize: "0.85rem" }}>
              <span>Launch Live Assistant</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Tech Stack Bar */}
      <section id="architecture" className="landing-stack-section">
        <div className="landing-stack-title">Engineered with State-of-the-Art Technologies</div>
        <div className="landing-stack-grid">
          <div className="stack-item">
            <span className="stack-name">React 19</span>
            <span className="stack-role">UI Frontend</span>
          </div>
          <div className="stack-item">
            <span className="stack-name">Vite 7</span>
            <span className="stack-role">Lightning Build</span>
          </div>
          <div className="stack-item">
            <span className="stack-name">FastAPI</span>
            <span className="stack-role">Python Backend</span>
          </div>
          <div className="stack-item">
            <span className="stack-name">SQLite</span>
            <span className="stack-role">Persistent Memory</span>
          </div>
          <div className="stack-item">
            <span className="stack-name">Web Speech</span>
            <span className="stack-role">STT / TTS</span>
          </div>
          <div className="stack-item">
            <span className="stack-name">Ollama (Phi)</span>
            <span className="stack-role">Local LLM</span>
          </div>
        </div>
      </section>

      {/* Final Bottom Banner CTA */}
      <section className="landing-final-cta-section">
        <div className="final-cta-card">
          <div className="final-cta-glow" />
          <h2 className="final-cta-title">Ready to Experience JARVIS AI?</h2>
          <p className="final-cta-subtitle">
            Get instant access to hands-free voice commands, persistent memory recall, and local Mac OS automations.
          </p>

          <button
            type="button"
            className="landing-primary-cta-btn pulse"
            onClick={handleLaunch}
            style={{ fontSize: "1.1rem", padding: "16px 36px" }}
          >
            <Zap size={22} />
            <span>Get Started — Open Assistant</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-left">
          <div className="landing-logo-box" style={{ width: 22, height: 22 }}>
            <Zap size={13} color="#ffffff" />
          </div>
          <span>JARVIS AI • Developed by Vaibhav Bariyar</span>
        </div>

        <div className="footer-right">
          <span>Backend: http://127.0.0.1:8000</span>
          <span>•</span>
          <button type="button" onClick={handleLaunch} className="footer-link-btn">
            Open Dashboard
          </button>
        </div>
      </footer>
    </div>
  );
}
