# Lesson 00: Setup Check

**By the end, you will have confirmed your environment is ready for Docker installation.**

⏱ ~5 minutes

```instructor
Say: "Quick checks before we install Docker — Linux confirmed, your Module 01 working directory exists, your network can reach Docker Hub."
Mention: "If `cat ~/docker-course/notes/notes.txt` is empty, they did NOT finish Module 01 even if they say they did. Send them back to lesson 11 before continuing."
Pause: After they confirm the notes file has entries from at least 5 lessons. That's the real proof of readiness, not a self-report.
Say: "You're done when every command in this file runs without errors. If anything fails, fix it now — install will magnify any gap."
```

---

**1.** Open Cursor and connect to your Ubuntu environment (WSL or SSH from Module 00).

**2.** Open the integrated terminal (`` Ctrl+` ``).

**3.** Confirm you're in Linux.
```bash
uname -s
```
```
Linux
```

**4.** Confirm you have `sudo`.
```bash
sudo whoami
```
```
root
```
(After your password.)

**5.** Confirm Module 01's prereq packages are installed.
```bash
which curl gpg
```
```
/usr/bin/curl
/usr/bin/gpg
```

**6.** Confirm Module 01's notes file exists.
```bash
ls -la ~/docker-course/notes/notes.txt
```
You should see the file. If you don't, you didn't finish Module 01 — go back and finish it before continuing.

**7.** Confirm Docker is **not** already installed.
```bash
which docker
```
(No output expected — we're about to install it. If output appears, raise your hand. We need to know what's there before we install on top of it.)

**8.** Confirm you have internet (Docker downloads will need it).
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://hub.docker.com
```
```
200
```
(Or `301`/`302` — anything 2xx or 3xx means you can reach Docker Hub.)

**9.** Confirm at least 2 GB of free disk space.
```bash
df -h ~ | tail -n 1
```
Look at the "Avail" column — it should be at least 2G.

---

## Checkpoint

```bash
sudo whoami && which curl gpg && ls ~/docker-course/notes/notes.txt
```
You should see `root`, two `/usr/bin/...` lines, and the path to your notes file.

---

**Next up:** [01-install-docker.md](01-install-docker.md) — Install Docker Engine
