# Lesson 00: Prerequisites Check

**By the end, you will have confirmed every piece of Modules 00–04 still works.**

⏱ ~5 minutes

```instructor
Say: "Quick check that everything from Modules 00-04 still works. We're about to add a local LLM stack on top — anything broken now will compound."
Mention: "Most importantly: Compose works without sudo, your FastAPI repo still hot-reloads, and you can SSH-push to Gitea. Any of those failing means we fix it before pulling models."
Pause: After all checks pass. Anyone failing — pair them with a working neighbor and have them follow along while you investigate.
Say: "You're done when every command in this file passes. We do not start lesson 01 until everyone is at this checkpoint."
```

---

**1.** Open Cursor connected to your dev environment (WSL or SSH from Module 00). Open the integrated terminal.

**2.** Quick fire — confirm each Module's deliverable.

```bash
git --version
```
(Module 04 — should print 2.x.)

```bash
docker --version && docker compose version
```
(Module 02 — should print Docker + Compose versions.)

```bash
ls ~/docker-course/fastapi-app/main.py
```
(Module 03 — should print the path.)

```bash
git -C ~/docker-course/fastapi-app remote -v
```
(Module 04 — should print your Gitea origin URL.)

**3.** Confirm the FastAPI stack still starts.
```bash
cd ~/docker-course/fastapi-app
docker compose up -d
sleep 3
curl -s http://localhost:8000 | python3 -m json.tool
```
You should see `{"hello": "fastapi"}` (or whatever you renamed it to).

**4.** Stop it for now — we'll come back to it in lesson 05.
```bash
docker compose down
```

**5.** Log it.
```bash
echo "Module 05 prereq check: passed $(date -Iseconds)" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- If any Module check fails, do not push forward. Local-LLM debugging is hard enough without other modules being broken. Fix the upstream module first.

---

## Checkpoint

```bash
git --version && docker --version && ls ~/docker-course/fastapi-app/main.py
```
Should print three things, no errors.

---

**Next up:** [01-verify-gpu.md](01-verify-gpu.md) — Make sure your GPU is visible
