# Instructor Notes — Module 05: Local GPU + Continue.dev

## TODO before class

- [ ] **Decide the GPU strategy** for the cohort:
  1. **Each student has a local NVIDIA GPU** on their laptop. Cleanest experience. Lesson 01 verifies; if a student lacks a GPU, fall back to option 2 or 3.
  2. **Course-provided GPU server** that students SSH into (Module 00 lesson 06's host, but with a GPU). Ollama runs in Docker Compose **on the remote**; Continue (Remote-SSH) uses `localhost:11434` on that remote. For a rare "IDE local, Ollama on LAN" setup, publish host port 11434 and set `apiBase` to the GPU host's IP.
  3. **Pair students** so one with a GPU drives, the other watches. Last resort.
- [ ] **Pre-pull Ollama models** on the classroom mirror or one fast machine if bandwidth is tight. `qwen2.5-coder:7b` is ~4.7 GB. With many students pulling, avoid everyone hitting the public registry at once. On a prep host: `cd ~/docker-course/ollama && docker compose up -d && docker compose exec -T ollama ollama pull qwen2.5-coder:7b` (and the autocomplete model).
- [ ] **Confirm NVIDIA Container Toolkit** is documented for your cohort (lesson 02). Host `nvidia-smi` alone does not prove Docker can see the GPU. **Windows-side NVIDIA driver** must be current for WSL2.
- [ ] **Verify your own setup end to end** the day before. Continue's config schema has changed several times; make sure the config in lesson 04 still works on the latest extension version.

## General Tips

- **Latency is the giveaway.** First chat response from Ollama takes 5–15 seconds (model load + KV cache warm-up). Subsequent responses stream at tens of tokens/second on a modern GPU. If a student says "it feels slow," check `nvidia-smi` while they're prompting — if the GPU is under load, it's working.
- **Context windows matter.** Default context for Qwen 2.5 Coder is 32k tokens. Cursor/Continue's `@codebase` provider can blow through that on large repos. Tell students to keep `@codebase` for "find me where X happens" questions, not "rewrite all of X."
- **Hallucinations on small models are real.** Qwen 2.5 Coder 7B is good but not GPT-4. It will sometimes invent function names. Drill students to **read every diff** before accepting it — Continue makes you accept changes explicitly anyway.
- **The agent mode lesson (08) is where students fall in love with this.** Make sure session 2 has time for it. It's also where things break — agent mode plus a small model can lead to sad loops. Lesson 08 calls out the failure modes.

## Where Students Get Stuck (in priority order)

### #1 — `nvidia-smi: command not found` (or no GPU listed)
- **Native Ubuntu:** they don't have the driver installed. Lesson 01 covers `sudo ubuntu-drivers autoinstall`.
- **WSL2:** they're missing the Windows-side driver, OR they're on an old WSL kernel. `wsl --update` from PowerShell + a recent driver fixes this 90% of the time.
- **SSH:** they connected to the wrong host (no GPU). Sanity-check the hostname.

### #2 — Ollama container not responding
- Symptom: `curl http://localhost:11434` connection refused, or `docker compose exec ollama ollama list` fails.
- Fix: `cd ~/docker-course/ollama && docker compose ps` — if not **Up**, run `docker compose up -d`. Check logs: `docker compose logs ollama --tail 50`. If `docker compose up` fails on **GPU / nvidia**, install **NVIDIA Container Toolkit** and restart Docker (lesson 02).

### #3 — Continue can't reach Ollama
- Symptom: chat returns "Failed to fetch" or "ECONNREFUSED."
- Causes: Compose stack not running; wrong `apiBase`; split-host networking (IDE and Ollama on different machines without the right URL).
- Fix: On the machine where Continue runs, `curl -s http://localhost:11434` must print `Ollama is running`. Adjust `apiBase` in `~/.continue/config.yaml` to match (Remote-SSH: usually still `http://localhost:11434` on the remote).

### #4 — Wrong model role assignments in Continue config
- Symptom: autocomplete is using the 7B chat model (slow), or chat is using the 1.5B base model (incoherent).
- Fix: lesson 04 walks through `roles:` — chat/edit/apply on the 7B, autocomplete on the 1.5B-base. Mismatched roles is the most common config error.

### #5 — Tab autocomplete not appearing
- Symptom: typing in a `.py` file produces no ghost-text suggestions.
- Causes: extension disabled for the file type, autocomplete model not pulled, autocomplete role not assigned, or another extension stealing the shortcut.
- Fix: open the Continue panel, look for errors at the bottom. `docker compose exec -T ollama ollama list` (from `~/docker-course/ollama`) to confirm the autocomplete model is present.

### #6 — Agent mode runs the wrong commands
- Symptom: agent mode tries to `rm -rf` something, or runs commands in the wrong directory.
- Fix: Continue's agent mode requires you to **approve each tool call**. Tell students to read the prompt before clicking "Run." Lesson 08 makes this an explicit drill.

### #7 — VRAM OOM
- Symptom: `cudaMalloc failed: out of memory` in Ollama logs (`docker compose logs ollama`).
- Fix: a smaller model. `docker compose exec -T ollama ollama pull qwen2.5-coder:3b` (or `:1.5b`) and update `~/.continue/config.yaml`. Lesson 03 lists alternatives by VRAM tier.

## Common Error Messages Cheat Sheet

| Error | Cause | Fix |
|---|---|---|
| `nvidia-smi: command not found` | driver missing | lesson 01 |
| `could not select device driver` / GPU errors from `docker compose up` | NVIDIA Container Toolkit missing/misconfigured | lesson 02 + NVIDIA install guide |
| `Error: connection refused` from `curl localhost:11434` | Compose stack down | `cd ~/docker-course/ollama && docker compose up -d` |
| `Error: model 'X' not found` | model not pulled | `docker compose exec -T ollama ollama pull X` |
| `Failed to fetch` in Continue | Continue can't reach Ollama | check stack is up, `apiBase` in config |
| `cudaMalloc failed` | VRAM OOM | smaller model |
| `Continue: configuration not loaded` | YAML syntax error | check indentation, rerun |
| Tab autocomplete missing | model role wrong, extension disabled | check Continue panel |

## Suggested Schedule (2 × 2-hour sessions)

| Session | Lessons | Notes |
|---|---|---|
| 1 (S10) | 00 – 04 | GPU verified, Ollama container running, models pulled, Continue installed and chatting. End with first successful chat. |
| 2 (S11) | 05 – 09 | Drill the four agentic features. Final checkpoint is a small feature shipped through agent mode + a Gitea PR (calls back to Module 04). |

## Q&A Pause Points

- After lesson 04 (first chat — celebrate the moment, then take questions)
- After lesson 06 (autocomplete is the most subtle to "get")
- After lesson 08 (agent mode is wow + scary; let them ask)
- After lesson 09 (wrap-up, preview Module 06)
