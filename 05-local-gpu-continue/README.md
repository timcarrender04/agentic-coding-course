# Module 05: Local GPU + Continue.dev

See [`../COURSE-SCHEDULE.md`](../COURSE-SCHEDULE.md) for the full 8-week, 16-session calendar. This module spans **sessions 10 and 11**.

This is the agentic-coding payoff module. You'll set up a **local LLM** running on your **NVIDIA GPU** via **Ollama in Docker Compose**, install **Continue.dev** in Cursor, and drill the four core agentic features — **chat**, **autocomplete**, **inline edit**, and **agent mode** — against the FastAPI repo you built in Module 03 and committed to Gitea in Module 04.

> **The "free + local" stack.** Cursor (the IDE you installed in Module 00, sign-in skipped) + Continue.dev (free open-source extension that works in any VS Code fork including Cursor) + Ollama (official container, run with Docker Compose) + a local NVIDIA GPU. No cloud bills, no usage caps, no data leaves your machine.

## What you'll be able to do at the end of this module

- Verify your NVIDIA GPU is visible from inside your dev environment (native, WSL, or SSH-to-GPU-host)
- Run Ollama in Docker Compose and pull a coding model (Qwen 2.5 Coder)
- Test the model from the command line with `docker compose exec … ollama run`
- Install Continue.dev in Cursor and point it at your local Ollama
- Chat with the model about files in your repo using `@file`, `@codebase`, `@diff`, `@terminal`
- Get tab-autocomplete suggestions while typing (FIM completion via a small base model)
- Highlight code and ask the model to edit it inline (`Ctrl+I`)
- Use **agent mode** — let the model run shell commands, read files, and make multi-file changes against your FastAPI repo

## Prerequisites

- **Modules 00–04** complete. You should have:
  - Cursor installed (Module 00)
  - Ubuntu terminal fluency (Module 01)
  - Docker working (Module 02)
  - **NVIDIA Container Toolkit** installed so Docker can pass your GPU into containers (lesson 02 — required for the `gpus: all` Compose service)
  - FastAPI repo at `~/docker-course/fastapi-app/` (Module 03)
  - Git + Gitea workflow (Module 04)
- An **NVIDIA GPU** with at least **8 GB VRAM** (works on RTX 3060/12GB, 4060/8GB, 4070, 4080, 4090, A4000+, etc.). Lower VRAM is doable with smaller models — see lesson 03.
- Up-to-date NVIDIA driver (verified in lesson 01).
- ~10 GB of free disk space (model files).

> **WSL2 students:** GPU passthrough requires the Windows-side NVIDIA driver to be installed (Game Ready or Studio). The CUDA libraries inside WSL come along for the ride. Lesson 01 verifies this.
> **SSH-to-GPU-host students:** the instructor provisions a remote machine with the GPU; you stay connected to it via Cursor's Remote-SSH (Module 00 lesson 06). The Ollama Compose stack runs on that remote host; your IDE session stays local (or attached to that host via SSH).

## Lessons

| # | File | Title | Est. Time |
|---|------|-------|-----------|
| 00 | [00-prerequisites-check.md](00-prerequisites-check.md) | Prerequisites Check | ~5 min |
| 01 | [01-verify-gpu.md](01-verify-gpu.md) | Verify Your GPU | ~15 min |
| 02 | [02-install-ollama.md](02-install-ollama.md) | Run Ollama (Docker Compose) | ~15 min |
| 03 | [03-pull-and-test-models.md](03-pull-and-test-models.md) | Pull and Test Models | ~20 min |
| 04 | [04-install-and-configure-continue.md](04-install-and-configure-continue.md) | Install + Configure Continue.dev | ~25 min |
| 05 | [05-chat.md](05-chat.md) | Chat | ~20 min |
| 06 | [06-autocomplete.md](06-autocomplete.md) | Autocomplete | ~15 min |
| 07 | [07-inline-edit.md](07-inline-edit.md) | Inline Edit | ~15 min |
| 08 | [08-agent-mode.md](08-agent-mode.md) | Agent Mode | ~25 min |
| 09 | [09-final-checkpoint.md](09-final-checkpoint.md) | Final Checkpoint | ~20 min |

**Total estimated time: ~2h 55m** across 2 sessions.

## What's next

Module 06 uses the same setup to drill effective prompting and refactoring patterns. Keep the `~/docker-course/ollama` Compose stack — Modules 06, 07, and 08 all assume local Ollama + Continue.dev is working.
