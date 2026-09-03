import React from "react";
import confetti from "canvas-confetti";

export default function HeroSection({ onOrbClick }) {
  const handleOrbClick = (e) => {
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 45,
        spread: 70,
        origin: { x, y },
        colors: ["#38bdf8", "#2563eb", "#818cf8", "#c084fc", "#60a5fa"],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }

    if (onOrbClick) onOrbClick();
  };

  return (
    <section className="hero-section">
      {/* 3D Iridescent Holographic Arc Reactor Orb */}
      <div
        className="hero-orb-wrapper"
        onClick={handleOrbClick}
        title="Click to activate JARVIS Neural Voice Engine"
      >
        <div className="hero-orb-glow" />
        <div className="hero-orb" />
      </div>

      {/* Main Headlines */}
      <h1 className="hero-title">Welcome to JARVIS AI</h1>
      <h2 className="hero-subtitle">Your Intelligent Autonomous AI Assistant</h2>
    </section>
  );
}
