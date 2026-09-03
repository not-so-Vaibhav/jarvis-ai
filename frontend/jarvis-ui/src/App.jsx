import React, { useEffect, useRef, useState } from "react";
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import HeroSection from "./components/HeroSection";
import CategoryTabs from "./components/CategoryTabs";
import PromptBar from "./components/PromptBar";
import BotsSection from "./components/BotsSection";
import ChatModal from "./components/ChatModal";
import MemoryModal from "./components/MemoryModal";
import SystemActionsModal from "./components/SystemActionsModal";
import SettingsModal from "./components/SettingsModal";
import "./index.css";

export default function App() {
  // Page View state: 'landing' (showcase homepage) or 'app' (assistant dashboard)
  const [currentView, setCurrentView] = useState("landing");

  // Navigation & Category states
  const [activeNav, setActiveNav] = useState("chat");
  const [activeCategory, setActiveCategory] = useState("chat");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBot, setActiveBot] = useState(null);

  // Modal states
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [isSystemActionsOpen, setIsSystemActionsOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Settings states
  const [backendUrl, setBackendUrl] = useState("http://127.0.0.1:8000/jarvis");
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [speakEnabled, setSpeakEnabled] = useState(true);
  const [voiceRate, setVoiceRate] = useState(1);
  const [voicePitch, setVoicePitch] = useState(1);

  // Chat and Voice states
  const [messages, setMessages] = useState([
    {
      from: "jarvis",
      botName: "JARVIS Core",
      text: "JARVIS online. Say 'Hey Jarvis' or type a command (e.g. 'list files', 'remember my favorite color is blue', or 'open app Notes').",
    },
  ]);
  const [listening, setListening] = useState(false);
  const [memories, setMemories] = useState([
    "User name is Vaibhav",
    "Favorite tech stack is React, Vite, and Python FastAPI",
    "Operating System is Mac OS",
  ]);

  const recognitionRef = useRef(null);
  const handleSendMessageRef = useRef(null);
  const speakRef = useRef(null);
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  // 🔊 Text-to-Speech playback
  const speak = (text) => {
    if (!text || !speakEnabled || !synth) return;
    try {
      synth.cancel();
      const cleanedText = text
        .replace(/[*#`_-]/g, "")
        .replace(/https?:\/\/\S+/g, "link")
        .slice(0, 300);

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = voiceRate;
      utterance.pitch = voicePitch;
      utterance.lang = "en-US";
      synth.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  };

  speakRef.current = speak;

  // 🎤 Check & Init Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript
          .trim();

      console.log("Speech recognized:", transcript);

      // If user is on landing page and speaks wake word, switch to app!
      setCurrentView("app");

      // Wake word check
      if (transcript.toLowerCase().includes("hey jarvis")) {
        speakRef.current?.("Yes? I am listening.");
        setMessages((m) => [
          ...m,
          { from: "jarvis", botName: "JARVIS", text: "Yes? I am listening." },
        ]);
        setIsChatModalOpen(true);
        return;
      }

      // Send to assistant
      handleSendMessageRef.current?.(transcript);
    };

    recognition.onerror = (err) => {
      console.error("Mic speech recognition error:", err);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  // Check Backend Connectivity on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(backendUrl.replace("/jarvis", "/docs"), {
          method: "GET",
        });
        setIsBackendConnected(res.ok || res.status === 404);
      } catch {
        setIsBackendConnected(false);
      }
    };
    checkBackend();
  }, [backendUrl]);

  // 🎙️ Toggle voice listening
  const handleToggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome/Edge or type directly.");
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // 🚀 Send message to FastAPI or smart fallback
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Switch to app view if currently on landing
    setCurrentView("app");

    // Add user message to state
    setMessages((prev) => [...prev, { from: "user", text }]);
    setIsChatModalOpen(true);

    const lower = text.toLowerCase();

    // Check memory actions locally as well
    if (lower.startsWith("remember")) {
      const memContent = text.replace(/remember/i, "").trim();
      if (memContent && !memories.includes(memContent)) {
        setMemories((prev) => [memContent, ...prev]);
      }
    }

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("Backend response error");

      const data = await res.json();
      const reply = data.reply || "I didn't understand that.";

      setMessages((prev) => [
        ...prev,
        {
          from: "jarvis",
          botName: activeBot ? activeBot.name : "JARVIS",
          text: reply,
        },
      ]);
      setIsBackendConnected(true);
      speak(reply);
    } catch {
      // Intelligent fallback simulator for instant seamless UX even if Ollama/FastAPI isn't running
      setIsBackendConnected(false);
      const fallbackReply = generateFallbackResponse(text, activeCategory, activeBot, memories);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            from: "jarvis",
            botName: activeBot ? activeBot.name : "JARVIS AI",
            text: fallbackReply,
          },
        ]);
        speak(fallbackReply);
      }, 500);
    }
  };

  handleSendMessageRef.current = handleSendMessage;

  // Select bot / engine handler
  const handleSelectBot = (bot) => {
    setActiveBot(bot);
    if (bot.actionCommand) {
      handleSendMessage(bot.actionCommand);
    } else {
      setIsChatModalOpen(true);
    }
  };

  // Add & Delete memory handlers
  const handleAddMemory = (item) => {
    if (!memories.includes(item)) {
      setMemories((prev) => [item, ...prev]);
      handleSendMessage(`remember ${item}`);
    }
  };

  const handleDeleteMemory = (item) => {
    setMemories((prev) => prev.filter((m) => m !== item));
  };

  // If user is on landing page view, render LandingPage
  if (currentView === "landing") {
    return (
      <LandingPage
        onGetStarted={() => {
          setCurrentView("app");
          speak("Welcome to JARVIS AI. How can I assist you today?");
        }}
        isBackendConnected={isBackendConnected}
      />
    );
  }

  // Otherwise render the full JARVIS Assistant Dashboard
  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onOpenMemory={() => setIsMemoryModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenSystemActions={() => setIsSystemActionsOpen(true)}
        onOpenVoice={() => setIsChatModalOpen(true)}
        onGoHome={() => setCurrentView("landing")}
        isBackendConnected={isBackendConnected}
      />

      {/* Main Content Area */}
      <main className="main-wrapper">
        {/* Top Header Bar */}
        <TopNav
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearchSubmit={handleSendMessage}
          onOpenVoice={() => setIsChatModalOpen(true)}
          onGoHome={() => setCurrentView("landing")}
          speakEnabled={speakEnabled}
          setSpeakEnabled={setSpeakEnabled}
          isBackendConnected={isBackendConnected}
        />

        {/* Hero Section with 3D Holographic Orb */}
        <HeroSection
          onOrbClick={() => {
            speak("Yes Vaibhav? JARVIS is online. How can I assist you?");
            setIsChatModalOpen(true);
          }}
        />

        {/* 3 Core Category Selector Cards */}
        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={(catId) => {
            setActiveCategory(catId);
            if (catId === "memory") setIsMemoryModalOpen(true);
            if (catId === "system") setIsSystemActionsOpen(true);
          }}
        />

        {/* Floating Command & Prompt Bar */}
        <PromptBar
          activeCategory={activeCategory}
          onSendMessage={handleSendMessage}
          listening={listening}
          onToggleListening={handleToggleListening}
        />

        {/* Core System Engines Grid */}
        <BotsSection onSelectBot={handleSelectBot} />
      </main>

      {/* Interactive Chat Stream Modal */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        listening={listening}
        onToggleListening={handleToggleListening}
        activeBot={activeBot}
        speakEnabled={speakEnabled}
        setSpeakEnabled={setSpeakEnabled}
      />

      {/* Memory Vault Modal */}
      <MemoryModal
        isOpen={isMemoryModalOpen}
        onClose={() => setIsMemoryModalOpen(false)}
        memories={memories}
        onAddMemory={handleAddMemory}
        onDeleteMemory={handleDeleteMemory}
      />

      {/* System Actions Modal */}
      <SystemActionsModal
        isOpen={isSystemActionsOpen}
        onClose={() => setIsSystemActionsOpen(false)}
        onRunCommand={handleSendMessage}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        backendUrl={backendUrl}
        setBackendUrl={setBackendUrl}
        voiceRate={voiceRate}
        setVoiceRate={setVoiceRate}
        voicePitch={voicePitch}
        setVoicePitch={setVoicePitch}
        speakEnabled={speakEnabled}
        setSpeakEnabled={setSpeakEnabled}
      />
    </div>
  );
}

// 🧠 Smart Fallback Generator for standalone/offline testing
function generateFallbackResponse(text, category, activeBot, memories) {
  const lower = text.toLowerCase();

  if (lower.startsWith("remember")) {
    return `Got it. I have saved "${text.replace(/remember/i, "").trim()}" to my memory vault.`;
  }

  if (lower.includes("what do you remember") || lower.includes("recall")) {
    if (!memories || memories.length === 0) {
      return "I don't remember anything yet. Tell me 'remember [fact]' to save context!";
    }
    return `Here is what I remember:\n${memories.map((m) => `• ${m}`).join("\n")}`;
  }

  if (lower.startsWith("list files")) {
    return "Here are the files in your project directory:\n• frontend/jarvis-ui/src/App.jsx\n• frontend/jarvis-ui/src/index.css\n• backend/main.py\n• backend/actions.py\n• backend/memory.py";
  }

  if (lower.startsWith("open app") || lower.startsWith("open file")) {
    return `Action executed: Dispatched system command for "${text}".`;
  }

  if (lower.startsWith("search file")) {
    return `File Search: Looking for file matching query in workspace directories.`;
  }

  return `JARVIS: Processed "${text}". Ready for your next command.`;
}
