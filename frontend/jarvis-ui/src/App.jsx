import { useEffect, useRef, useState } from "react";
import "./index.css";

export default function App() {
  const [messages, setMessages] = useState([
    { from: "jarvis", text: "JARVIS online. Say 'Hey Jarvis'." }
  ]);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

  // 🔊 Speak function
  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    synth.cancel();
    synth.speak(utterance);
  };

  // 🎤 Init Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript
          .trim()
          .toLowerCase();

      console.log("Heard:", transcript);

      // 🧠 Wake word
      if (transcript.includes("hey jarvis")) {
        speak("Yes?");
        setMessages((m) => [...m, { from: "jarvis", text: "Yes?" }]);
        return;
      }

      // 🧠 Normal command → backend
      sendToJarvis(transcript);
    };

    recognition.onerror = (err) => {
      console.error("Mic error:", err);
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  // 🚀 Start listening
  const startListening = () => {
    recognitionRef.current?.start();
    setListening(true);
  };

  // 🛑 Stop listening
  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  // 🌐 Send to FastAPI (Gemini backend)
  const sendToJarvis = async (text) => {
    setMessages((m) => [...m, { from: "user", text }]);

    try {
      const res = await fetch("http://127.0.0.1:8000/jarvis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      const reply = data.reply || "I didn't understand that.";

      setMessages((m) => [...m, { from: "jarvis", text: reply }]);
      speak(reply);
    } catch (err) {
      console.error(err);
      speak("Connection error.");
      setMessages((m) => [...m, { from: "jarvis", text: "Connection error." }]);
    }
  };

  return (
    <div className="app">
      <h1>JARVIS</h1>

      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className={m.from}>
            {m.text}
          </div>
        ))}
      </div>

      <button onClick={listening ? stopListening : startListening}>
        {listening ? "Stop Listening" : "Say 'Hey Jarvis'"}
      </button>
    </div>
  );
}
