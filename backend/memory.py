import sqlite3

conn = sqlite3.connect("jarvis_memory.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS memory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT UNIQUE
)
""")

conn.commit()

def save_memory(text: str):
    try:
        cursor.execute("INSERT INTO memory (content) VALUES (?)", (text,))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False

def get_all_memory():
    cursor.execute("SELECT content FROM memory")
    return [row[0] for row in cursor.fetchall()]
