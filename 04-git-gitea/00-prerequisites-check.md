# Lesson 00: Prerequisites Check

**By the end, you will have confirmed Git is installed and your Module 03 FastAPI project still exists.**

⏱ ~5 minutes

---

**1.** Open Cursor and connect to your Ubuntu environment. Open the integrated terminal.

**2.** Confirm Git is installed (Module 01 lesson 5 installed it).
```bash
git --version
```
```
git version 2.34.1
```
(Any 2.x is fine.)

**3.** Confirm your FastAPI project from Module 03 is still there.
```bash
ls ~/docker-course/fastapi-app/main.py
```
You should see the path printed. If not, you skipped Module 03 — go back.

**4.** Confirm there's no existing `.git` directory in the project (we want to start clean).
```bash
ls -la ~/docker-course/fastapi-app/.git 2>&1 | head -n 1
```
You should see `ls: cannot access ...` — meaning no repo yet. **If a `.git` directory already exists, raise your hand** before continuing. We need to know what's there.

**5.** Confirm `~/docker-course/notes/notes.txt` exists.
```bash
ls ~/docker-course/notes/notes.txt
```

**6.** Log this check.
```bash
echo "Module 04 prereq check: passed $(date -Iseconds)" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- If `git --version` fails, run `sudo apt install -y git`.
- If `~/docker-course/fastapi-app/` is missing or empty, you'll have to redo Module 03 first. There's no shortcut.

---

## Checkpoint

```bash
git --version
```
Should print a version.

```bash
ls ~/docker-course/fastapi-app/
```
Should list `main.py`, `routers/`, `requirements.txt`, etc.

---

**Next up:** [01-git-config.md](01-git-config.md) — Tell Git who you are
