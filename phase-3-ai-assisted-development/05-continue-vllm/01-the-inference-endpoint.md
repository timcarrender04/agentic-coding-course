# Lesson 01: The Inference Endpoint

**By the end, you will understand the shared inference endpoint the college runs — the hardware, the serving stack, the two models it hosts, and their roles — and you'll have confirmed your machine can reach it over the network.**

⏱ ~15 minutes of reading + one connectivity check

> You are **not** running a model on your laptop. The college hosts **one shared inference server** on the campus network. Every student's editor points at the same box. Today we learn what that box is and confirm you can reach it. We install and configure nothing locally beyond the editor.

```instructor
Say: "Nobody is running a model on their laptop this year. The college runs ONE shared server. Everyone's editor talks to the same endpoint over the campus network. Today is: what is that box, and can you reach it."
Mention: "This replaces the old 'each of you needs a GPU' setup. No nvidia-smi, no per-student VRAM math. If a student can't reach the URL, it's a network problem (Tailscale/LAN), not a driver problem."
Pause: After they run the reachability check. If it returns 000 or times out, it's network — check they're on the campus LAN or Tailscale, not a home connection.
Say: "You're done when they can describe the two models and their roles AND the reachability check returns an HTTP status (200 or 401 — both mean the box answered)."
```

---

## The box

- **One shared server**, hosted by the college. You connect to it over the campus network (LAN or Tailscale). It is **not** a per-student local GPU, and it is not something you install.
- **Hardware:** 2× **NVIDIA RTX A6000** — 48 GB VRAM each, **~96 GB aggregate**.
- **Serving software:** **vLLM**, exposing an **OpenAI-compatible** HTTP API. The two A6000s run **tensor-parallel** (`--tensor-parallel-size 2`) so a single large model can be split across both cards.
- **Auth:** a **single shared API key** (`sk-college-shared`), or no key at all on the campus network. There are no per-student tokens to request — everyone uses the same endpoint.

### The endpoint URL

```
http://gpu.college.local:8000/v1
```

Some teams may instead see a Tailscale IP for the same box, e.g.:

```
http://100.68.103.54:8000/v1
```

Both point at the same server. Use whichever your instructor gives you. The `/v1` suffix is the OpenAI-compatible API path — the same shape the OpenAI SDK and Continue.dev expect.

---

## The two models

The endpoint serves **two** Llama models, each with a distinct job:

| Role in Continue | Model | vLLM model id | Status |
|---|---|---|---|
| **Autocomplete only** (tab / ghost-text) | **Llama 3.1 8B Instruct** | `meta-llama/Llama-3.1-8B-Instruct` | **live now** |
| **Chat, inline edit, agent** (everything else) | **Llama 3.3 70B Instruct** | `meta-llama/Llama-3.3-70B-Instruct` | **coming online** — tensor-parallel across both A6000s (quantized, e.g. AWQ/FP8, to fit ~96 GB) |

**Two models, two roles.** Big models (70B) are smart but slower — perfect for chat, edits, and agent work where you wait a couple of seconds for a good answer. Small models (8B) are fast — perfect for tab autocomplete where you need a suggestion in milliseconds. You'll wire both into Continue in lesson 04, selecting each by name.

> **Why Llama?** Both are Meta's **Llama** models: US-origin and permissively licensed, which satisfies the course policy of **no China-origin models**. (An earlier draft config used a China-origin model in violation of that policy — Llama fixes it.) You don't choose model sizes by your own VRAM anymore; the shared box already hosts the right ones.

---

## Confirm you can reach it

You don't need the model list yet (that's lesson 02) — just prove the box answers.

**1.** From your dev environment's integrated terminal, ping the API path and print only the HTTP status code:
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://gpu.college.local:8000/v1/models
```
(If your instructor gave you the Tailscale IP instead, substitute it for `gpu.college.local`.)

**2.** Read the result:
   - **`200`** — the box answered and no key is required. 
   - **`401`** — the box answered but wants the shared key. **This still means success for this lesson** — you reached the server. You'll supply the key in lesson 02.
   - **`000` or a hang** — you did **not** reach the server. You're likely off the campus network. Connect to the LAN / start Tailscale, then retry. If it still fails, ask the instructor — they own the box.

**3.** Log it.
```bash
echo "Inference endpoint reachable: http://gpu.college.local:8000/v1 ($(date -Iseconds))" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Nothing to install here.** No CUDA, no drivers, no `nvidia-smi`, no local GPU. If you find yourself installing an inference engine on your laptop, stop — you've misread the module. The server is already running.
- **It's a network dependency now.** The endpoint has to be reachable. Off-campus? You need Tailscale (or the VPN your instructor specifies). A `000` status is a network problem, not a model problem.
- **Plain HTTP.** The URL is `http://…`, not `https://` — it's an internal campus service. That's expected.
- **The 70B may be "coming online."** If chat/edit later report the 70B isn't available yet, the 8B autocomplete model is still live. Confirm current status with your instructor.
- **Shared box, shared load.** Everyone in the cohort hits the same server. If responses feel slow during a busy lab, that's contention, not a broken setup.

---

## Checkpoint

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://gpu.college.local:8000/v1/models
```
Should print an HTTP status code (`200` or `401` — both mean the server answered). A `000` or a timeout means you can't reach the box; fix your network before lesson 02.

You should also be able to state, without looking: which model does **autocomplete** (Llama 3.1 8B) and which does **chat/edit/agent** (Llama 3.3 70B).

---

**Next up:** [02-connect-to-endpoint.md](02-connect-to-endpoint.md) — curl the shared endpoint and confirm the model list
