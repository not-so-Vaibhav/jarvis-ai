import os
import subprocess

BASE_DIR = os.path.expanduser("~")  # Home directory

def list_files(path="~"):
    path = os.path.expanduser(path)
    if not os.path.isdir(path):
        return "That directory does not exist."
    return "\n".join(os.listdir(path))

def open_file(path):
    path = os.path.expanduser(path)
    if not os.path.exists(path):
        return "That file does not exist."
    subprocess.run(["open", path])
    return f"Opened {path}"

def open_app(app_name):
    subprocess.run(["open", "-a", app_name])
    return f"Opened application: {app_name}"

def search_file(filename, path="~"):
    path = os.path.expanduser(path)
    matches = []
    for root, _, files in os.walk(path):
        if filename in files:
            matches.append(os.path.join(root, filename))
        if len(matches) >= 5:
            break
    return "\n".join(matches) if matches else "No matching files found."
