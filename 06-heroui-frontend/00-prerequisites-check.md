# Lesson 00: Prerequisites Check

**By the end, you will have confirmed Modules 03–05 still work and that you don't already have Node.js installed in a conflicting way.**

⏱ ~5 minutes

---

**1.** Open Cursor connected to your dev environment. Open the integrated terminal.

**2.** Confirm the FastAPI Compose stack still starts.
```bash
cd ~/docker-course/fastapi-app
docker compose up -d
sleep 3
curl -s http://localhost:8000 | python3 -m json.tool
```
You should see `{"hello":"fastapi"}` (or whatever you renamed it).

**3.** Confirm Continue.dev is wired to local Ollama. Open the Continue side bar and send the message:
```
Reply with the single word: ready
```
You should get `ready` back within ~10 seconds. If not, see Module 05 lesson 04.

**4.** Confirm Gitea is reachable.
```bash
git -C ~/docker-course/fastapi-app remote -v
```
Should show your Gitea origin URL.

**5.** Check whether Node.js is already installed (we want to use **nvm** to manage versions cleanly — a system-installed Node can interfere).
```bash
which node npm 2>&1
```

**6. If you see `/usr/bin/node` or similar**, you have a system Node. That's not a blocker but flag it to the instructor — we'll prefer the nvm-managed one in lesson 01.

**7. If you see `which: no node in (...)`**, perfect — clean slate.

**8.** Log this check.
```bash
echo "Module 06 prereq check: passed $(date -Iseconds)" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- The FastAPI stack from Module 03 must be running for lesson 04 onward. Easiest: leave it up for the whole module.
- The Ollama Compose stack from Module 05 should also be running so Continue.dev works.

---

## Checkpoint

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000
```
Should print `200`.

```bash
docker compose -f ~/docker-course/fastapi-app/docker-compose.yml ps --status=running | tail -n +2 | wc -l
```
Should print `2` (api + db running).

---

**Next up:** [01-install-nodejs.md](01-install-nodejs.md) — Install Node.js with nvm
