from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess

# memory helpers
from memory import save_memory, get_all_memory

# system actions (optional, already built by you)
from actions import list_files, open_file, open_app, search_file

app = FastAPI()

# =========================
# CORS (VERY IMPORTANT)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Request schema
# =========================
class UserInput(BaseModel):
    message: str


# =========================
# JARVIS endpoint
# =========================
@app.post("/jarvis")
def jarvis(input: UserInput):
    user_message = input.message.strip()
    lower = user_message.lower()

    # -------------------------
    # MEMORY : SAVE
    # -------------------------
    if lower.startswith("remember"):
        content = user_message.replace("remember", "", 1).strip()
        saved = save_memory(content)

        if saved:
            return {"reply": "Got it. I will remember that."}
        else:
            return {"reply": "I already remember that."}

    # -------------------------
    # MEMORY : RECALL
    # -------------------------
    if "what do you remember" in lower or "recall" in lower:
        memories = get_all_memory()
        if not memories:
            return {"reply": "I don't remember anything yet."}

        text = "Here’s what I remember:\n"
        for m in memories:
            text += f"- {m}\n"

        return {"reply": text}

    # -------------------------
    # SYSTEM ACTIONS (optional)
    # -------------------------
    if lower.startswith("list files"):
        return {"reply": list_files()}

    if lower.startswith("open file"):
        return {"reply": open_file(user_message)}

    if lower.startswith("open app"):
        return {"reply": open_app(user_message)}

    if lower.startswith("search file"):
        return {"reply": search_file(user_message)}

    # -------------------------
    # AI RESPONSE (OLLAMA)
    # -------------------------
    try:
        result = subprocess.run(
            ["ollama", "run", "phi"],
            input=f"You are JARVIS, a helpful AI assistant.\nUser: {user_message}\nJARVIS:",
            text=True,
            capture_output=True,
            timeout=60
        )

        reply = result.stdout.strip()

        if not reply:
            return {"reply": "I didn't get a response. Please try again."}

        return {"reply": reply}

    except Exception as e:
        return {"reply": f"Error talking to local AI: {str(e)}"}
