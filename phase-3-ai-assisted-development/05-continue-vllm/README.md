# Module 05: Continue.dev + Shared vLLM Endpoint

See [`../COURSE-SCHEDULE.md`](../../docs/COURSE-SCHEDULE.md) for the full 8-week, 16-session calendar. This module spans **sessions 10 and 11**.

This is the agentic-coding payoff module. You'll connect **VS Code** to the college's **shared vLLM inference endpoint** — a single server with **2× NVIDIA RTX A6000** serving **Llama** models over an OpenAI-compatible API — install **Continue.dev**, and drill the four core agentic features — **chat**, **autocomplete**, **inline edit**, and **agent mode** — against the FastAPI repo you built in Module 03 and committed to GitHub in Module 04.

> **The "free + college-hosted" stack.** VS Code (the editor you installed in Module 00) + Continue.dev (free, open-source AI extension) + the college's shared vLLM endpoint (Llama 3.3 70B for chat/edit/agent, Llama 3.1 8B for autocomplete). No cloud bills, no usage caps, no per-student GPU — you point the editor at one shared campus server. The prompts stay inside the college network.

## What you'll be able to do at the end of this module

- Explain the shared inference endpoint — 2× RTX A6000 (~96 GB), vLLM, OpenAI-compatible — and which model serves which role
- `curl` the endpoint's `/v1/models` and `/v1/chat/completions` routes with the shared key
- Install Continue.dev in VS Code and point it at the shared endpoint
- Chat with the 70B model about files in your repo using `@file`, `@codebase`, `@diff`, `@terminal`
- Get tab-autocomplete suggestions while typing (from the fast 8B model)
- Highlight code and ask the 70B to edit it inline (`Ctrl+I`)
- Use **agent mode** — let the 70B run shell commands, read files, and make multi-file changes against your FastAPI repo

## Prerequisites

- **Modules 00–04** complete. You should have:
  - VS Code installed (Module 00)
  - Ubuntu terminal fluency (Module 01)
  - Docker working (Module 02)
  - FastAPI repo at `~/docker-course/fastapi-app/` (Module 03)
  - Git + GitHub workflow (Module 04)
- The **Continue.dev** VS Code extension (installed in lesson 00 or 04).
- **Network access to the shared endpoint** at `http://gpu.college.local:8000/v1` (or the Tailscale IP your instructor provides). On the campus LAN this is direct; off-campus you'll need Tailscale/VPN.
- The **shared API key** (`sk-college-shared`) from your instructor — or confirmation that no key is required on the campus network.

> **No local GPU required.** You do **not** run a model on your machine — there's nothing to install beyond the editor and extension, no drivers, no CUDA, no `nvidia-smi`. The GPUs live in the college server. Your only local dependency is being able to reach the endpoint over the network.
>
> **Remote / SSH students:** if your VS Code is attached via **Remote — SSH** or **Remote — WSL**, the Continue extension host (and its `~/.continue/config.yaml`) lives on that remote machine. The `apiBase` is the same college endpoint regardless — no port forwarding needed, just network reachability from wherever the extension host runs.

## Models served

| Role in Continue | Model | vLLM model id | Status |
|---|---|---|---|
| Autocomplete | Llama 3.1 8B Instruct | `meta-llama/Llama-3.1-8B-Instruct` | live now |
| Chat / edit / agent | Llama 3.3 70B Instruct | `meta-llama/Llama-3.3-70B-Instruct` | coming online (tensor-parallel across both A6000s) |

Both are Meta/Llama models — US-origin and permissively licensed, satisfying the course's no-China-origin-models policy.

## Lessons

| # | File | Title | Est. Time |
|---|------|-------|-----------|
| 00 | [00-prerequisites-check.md](00-prerequisites-check.md) | Prerequisites Check | ~5 min |
| 01 | [01-the-inference-endpoint.md](01-the-inference-endpoint.md) | The Inference Endpoint | ~15 min |
| 02 | [02-connect-to-endpoint.md](02-connect-to-endpoint.md) | Connect to the Endpoint | ~15 min |
| 03 | [03-explore-the-models.md](03-explore-the-models.md) | Explore the Models | ~20 min |
| 04 | [04-install-and-configure-continue.md](04-install-and-configure-continue.md) | Install + Configure Continue.dev | ~25 min |
| 05 | [05-chat.md](05-chat.md) | Chat | ~20 min |
| 06 | [06-autocomplete.md](06-autocomplete.md) | Autocomplete | ~15 min |
| 07 | [07-inline-edit.md](07-inline-edit.md) | Inline Edit | ~15 min |
| 08 | [08-agent-mode.md](08-agent-mode.md) | Agent Mode | ~25 min |
| 09 | [09-final-checkpoint.md](09-final-checkpoint.md) | Final Checkpoint | ~20 min |

**Total estimated time: ~2h 55m** across 2 sessions.

## Server-side reference

The [`vllm/docker-compose.yml`](vllm/docker-compose.yml) in this folder is the **server** configuration that runs the shared endpoint — provided for reference only. **Students do not run it.** It shows how vLLM serves the two Llama models tensor-parallel across the two A6000s.

## What's next

Module 06 uses the same setup to drill effective prompting and refactoring patterns. Nothing to keep running locally — Modules 06, 07, and 08 all assume VS Code + Continue.dev pointed at the shared vLLM endpoint.
