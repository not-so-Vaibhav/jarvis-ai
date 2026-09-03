import {
  Mic,
  Terminal,
  Brain,
} from "lucide-react";

export const CATEGORIES = [
  {
    id: "chat",
    label: "Voice & Chat",
    icon: Mic,
    iconColor: "#38bdf8",
    placeholder: 'Say "Hey Jarvis" or type any question...',
    suggestions: [
      "What can you help me with today?",
      "Explain how quantum computing works",
      "Give me a quick productivity summary",
    ],
  },
  {
    id: "memory",
    label: "Memory Vault",
    icon: Brain,
    iconColor: "#a855f7",
    placeholder: 'Type "remember [fact]" or "what do you remember"...',
    suggestions: [
      "what do you remember",
      "remember my name is Vaibhav",
      "remember my favorite stack is React and FastAPI",
    ],
  },
  {
    id: "system",
    label: "System Actions",
    icon: Terminal,
    iconColor: "#10b981",
    placeholder: 'Type "list files", "search file <name>", or "open app <name>"...',
    suggestions: [
      "list files",
      "search file actions.py",
      "open app Notes",
    ],
  },
];
