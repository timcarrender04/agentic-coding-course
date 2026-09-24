# Agentic Coding Course — Phased, Self-Paced Plan for D2L Brightspace

**Supersedes the calendar in [`COURSE-SCHEDULE.md`](./COURSE-SCHEDULE.md)** (which remains as the original instructor-led, session-by-session detail). This document describes the **hybrid, self-learning-first D2L delivery**: 3 phases × 6 weeks, a short instructor video + a lab for every learning object, and two live instruction blocks per week (**Monday and Wednesday, 6:00–8:00 PM**).

The same 7 authored modules (00–06, 70 lessons) are **re-paced**. Two stack changes run through them: the IDE is now **Visual Studio Code** (not Cursor), and Module 05 targets the **shared college vLLM endpoint** (2× RTX A6000) instead of a per-student local GPU + Ollama (see Part 4).

---

## Part 1 — Delivery model

### Four pillars

1. **Self-paced content, self-learning first.** Students move through the course on their own. Progression is gated by completing labs, not by attendance.
2. **A short video for every learning object.** Each lesson opens with a **2–3 minute concept-intro video**: the instructor's cloned voice (Fish Audio) reading a script from the repo, over a matching screen recording. Scripts live in each module's `video-scripts/` folder; format and TTS conventions are in [`phase-1-foundations/VIDEO-SCRIPTS.md`](../phase-1-foundations/VIDEO-SCRIPTS.md). Watch the video → do the lesson → submit the lab.
3. **A lab for every learning object.** Each lesson `.md` is one *learning object* and ships with a paired, hands-on **lab** (a `## Lab` section in the lesson: Objective → Task → Submit → Pass criteria → Unlocks) that produces a verifiable artifact.
4. **Two live instruction blocks per week (support, not a gate).** **Monday and Wednesday, 6:00–8:00 PM**, run by the instructor: Monday introduces the week's objects, Wednesday is a lab clinic. A student who is ahead or behind still advances.

### Machine prerequisite (required to enroll)

A laptop running **Windows 10/11 with WSL2 (Ubuntu)** or **macOS**. The course lives in a Linux/Unix shell throughout — Windows students get that through WSL (set up in Module 00), Mac students use the built-in terminal. Chromebooks and tablets are **not** supported. All coursework runs against the college's **internal** shared server; Windows students may alternatively work entirely over SSH into it (Module 00, lesson 06).

### Suggested pace, not fixed sessions

The 18-week / 3-phase tables in Part 2 are a **recommended pace**. They tell a student roughly where to be each week and set the focus for that week's Zoom. They do **not** lock content — anyone can move faster or slower.

### The learning-object pattern (apply to every learning object)

| Field | Content |
|---|---|
| **Video** | A 2–3 min concept intro (Fish Audio narration from `video-scripts/<lesson>.md`) posted at the top of the D2L Topic. Sets up the lesson; never replaces it. |
| **Objective** | The one thing this object teaches (from the lesson's title / first steps). |
| **Lab task** | Do it for real — run the commands on your machine, build the thing, or exercise the shared model. Seeded by the lesson's existing `code`/drill/`checkpoint` steps. |
| **Submit** | A verifiable artifact: screenshot, pasted command output, a repo/commit link, or an auto-checked quiz. |
| **Unlocks** | Completion releases the next object (D2L Release Conditions + completion tracking). |

Labs are authored as a `## Lab` section at the end of each lesson `.md` (Objective / Task / Submit / Pass criteria / Unlocks) — **Phase 1's 27 are authored**; Modules 03–06 follow the same pattern.

- `setup-check` / `prerequisites-check` lessons → entry **Checklists** for their module.
- `final-checkpoint` lessons → **phase-gate** labs (must pass to enter the next module/phase).

### Weekly live-block rhythm (Mon + Wed, 6:00–8:00 PM)

**Monday — instruction block** (introduces the week's objects):

1. **Recap (10 min)** — where the suggested pace puts everyone; how this week's objects connect.
2. **Instruction (60–70 min)** — the instructor teaches the week's concepts, riffing on the per-object videos with live demos (the videos are the trailer; Monday is the feature).
3. **Kick off the labs (20–30 min)** — walk the first lab of the week end to end; students start theirs in the room.

**Wednesday — lab clinic** (unblocks the week's labs):

1. **Common sticking points (30 min)** — the lab steps people got stuck on since Monday; live fixes.
2. **Working time with help (60 min)** — students drive their own labs; instructor circulates (or screen-shares fixes if remote).
3. **Open Q&A + preview (15–20 min)** — anything, including students ahead/behind the suggested pace; preview next week.

> Record both blocks and post them as D2L Topics so self-paced students who miss one stay unblocked.

---

## Part 2 — Suggested 18-week / 3-phase pace

Lesson counts per module: 00 = 8, 01 = 12, 02 = 7, 03 = 13, 04 = 12, 05 = 10, 06 = 8 (**70 total**). **Each listed lesson = one learning object = one lab.**

### Phase 1 — Foundations (weeks 1–6) · Modules 00, 01, 02 · 27 objects

| Week | Module | Lessons / Labs | Focus |
|---|---|---|---|
| 1 | 00 | 00–04 | IDE concept, VS Code install/tour, integrated terminal, extensions |
| 2 | 00 → 01 | 00:05–07, 01:00–01 | WSL/SSH remote, Module 00 phase-gate; terminal setup + `pwd/ls/cd` |
| 3 | 01 | 02–06 | Making things, looking inside files, sudo/apt, installing software, permissions |
| 4 | 01 | 07–11 | Networking, processes/services, pipes/grep, users/groups, phase-gate |
| 5 | 02 | 00–03 | Docker setup-check, install, hello-world, nginx |
| 6 | 02 | 04–06 | Images/containers, VS Code Docker sidebar, phase-gate + buffer |

#### Phase 1 live-block calendar (six weeks · Mon instruction / Wed lab clinic, 6:00–8:00 PM)

| Week | Monday — instruction block | Wednesday — lab clinic |
|---|---|---|
| 1 | Course kickoff; editor vs terminal vs IDE; VS Code install, UI tour, integrated terminal (00:00–02) | Clinic on labs 00:00–04 — extension installs (Python, Docker), marketplace/firewall issues; homework: Windows students pre-install WSL (reboot at home, not in class) |
| 2 | Remote connections: WSL for Windows, SSH to the college server for everyone (00:05–06); walk the Module 00 phase-gate live | Clinic — gate submissions (00:07 screenshot), key/permission errors, green-indicator confusion; start terminal labs 01:00–01 (`pwd`/`ls`/`cd`) |
| 3 | Terminal core: making things, reading/editing files, sudo + apt, installing software, permissions (01:02–06) | Clinic — `rm -r` fear, nano/less exit keys, `chmod`/`chown` drills; permissions is the week's sticking point, budget most of the clinic for it |
| 4 | Terminal advanced: networking, processes/services, pipes/grep, users/groups (01:07–10); demo the intentional `usermod` failure | Clinic + **Module 01 phase-gate** (01:11) — timed, no-help run; redo-the-lesson triage for anyone who fails a section |
| 5 | Docker: what it is, Engine install from the apt repo, hello-world, nginx on port 8080 (02:00–03) | Clinic — WSL `systemctl` vs `service docker start`, docker-group logout/`newgrp`, port-forward paths (Windows browser / Ports tab / native) |
| 6 | Images vs containers, cleanup, VS Code Docker sidebar (02:04–05); walk the Phase 1 gate end to end | **Phase 1 gate clinic** (02:06) + buffer — screenshot submissions, catch-up for anyone behind; preview Phase 2 (FastAPI) |

### Phase 2 — Building real apps (weeks 7–12) · Modules 03, 04 · 25 objects

| Week | Module | Lessons / Labs | Focus |
|---|---|---|---|
| 7 | 03 | 00–04 | Prereqs, Python env, install FastAPI, hello world, path/query params |
| 8 | 03 | 05–08 | Pydantic request bodies, routers, dependencies/injection, containerizing |
| 9 | 03 | 09–12 | Compose + Postgres, SQLAlchemy, error handling, phase-gate |
| 10 | 04 | 00–04 | Prereqs, git config, init/first commit, status/add/commit, diff/log |
| 11 | 04 | 05–09 | Branches, undoing things, GitHub + SSH, pushing, cloning/pulling |
| 12 | 04 | 10–11 | Pull requests, phase-gate + buffer |

#### Phase 2 live-block calendar (six weeks · Mon instruction / Wed lab clinic, 6:00–8:00 PM)

| Week | Monday — instruction block | Wednesday — lab clinic |
|---|---|---|
| 7 | Phase 2 kickoff: what an API is; Python venv, install FastAPI, hello world, path/query params (03:00–04) | Clinic on labs 03:00–04 — forgotten venv activation (the module's #1 recurring failure), port 8000 already in use, tabs-vs-spaces errors |
| 8 | Pydantic request bodies, multiple routes/routers, dependency injection, containerizing the API (03:05–08) | Clinic — curl POSTs missing `Content-Type: application/json`, Pydantic v2 vs v1 syntax, forgetting `--host 0.0.0.0` inside Docker |
| 9 | Compose + Postgres, SQLAlchemy models, error handling + status codes (03:09–11); walk the Module 03 capstone live | **Module 03 phase-gate** (03:12) clinic — Postgres connection strings, compose networking; `solutions/` write-ups exist for lessons 10 and 12 |
| 10 | Git mental model: config, init + first commit, status/add/commit, diff and log (04:00–04) | Clinic — staging before commit (the module's #1), reading `git status` calmly, diff/log navigation |
| 11 | Branches, undoing things, GitHub account + SSH keys, pushing to a public repo, cloning/pulling (04:05–09) | Clinic — SSH key auth failures, detached HEAD, pushing without upstream / to the wrong branch, `pull` blocked by uncommitted changes |
| 12 | Pull requests end to end on GitHub (04:10) — including a PR on a classmate's public repo (cross-sharing); walk the Phase 2 gate live | **Phase 2 gate clinic** (04:11) + buffer — live merge-conflict resolution, catch-up; preview Phase 3 (Continue.dev on the shared vLLM endpoint) |

**Module 04 — "replace" detail:** the remote is now **public GitHub** instead of self-hosted Gitea, so students can **cross-share** — browse, clone, and open PRs on classmates' public repos — and the college has no git server to operate. Lessons 04/07–10 (account + SSH, pushing, cloning/pulling, PRs) are re-authored against github.com; lessons 04/00–06 (local git) are unchanged, and the downstream references in Modules 05–06 are updated. The instructor publishes two baseline repos (scaffolds in `tools/github-baseline/`): **course-items-api**, a template with the reference FastAPI project, and **course-pr-practice**, the hub every student forks to land a PR and review a classmate's. New prerequisite: a free github.com account. Only the basic course lab projects go on public GitHub — standard exercises anyone could build (hello-world FastAPI routes, course drills) — so there is no IP concern.

### Phase 3 — AI-assisted development (weeks 13–18) · Modules 05, 06 · 18 objects

| Week | Module | Lessons / Labs | Focus |
|---|---|---|---|
| 13 | 05 | 00–03 *(re-authored)* | **Meet the shared vLLM endpoint, point Continue.dev at it, verify chat** (replaces GPU-verify / install-Ollama / pull-models) |
| 14 | 05 | 04–06 | Configure Continue against the endpoint, chat, autocomplete |
| 15 | 05 | 07–09 | Inline edit, agent mode, phase-gate |
| 16 | 06 | 00–03 | Prereqs, install Node, init HeroUI app, tour + first component |
| 17 | 06 | 04–07 | CORS + fetch items, create-item form, extend with Continue, phase-gate |
| 18 | — | **capstone lab** | Combine FastAPI + HeroUI + Continue against the shared model; demo at the final Zoom |

**Module 05 — "replace" detail:** lessons 05/00–04 (local GPU verify, Ollama install, model pull, local Continue config) are **re-authored** to target the shared endpoint (endpoint URL + shared key, no per-student token). Lessons 05/05–09 (chat / autocomplete / inline edit / agent mode / checkpoint) are pedagogically unchanged — only the backend connection differs (openai provider → vLLM instead of Ollama). The lesson count (10) and week span (13–15) are preserved.

---

## Part 3 — D2L Brightspace mapping

| Course concept | D2L Brightspace construct |
|---|---|
| Phase (×3) | **Unit** (top-level Content container) |
| Week (×6 per phase) | **Module/Lesson** sub-container — a suggested-pace grouping |
| Learning object (lesson `.md`) | **Topic** (HTML content) **+ paired Lab**, with the object's 2–3 min video embedded at the top |
| Per-object video script (`video-scripts/*.md`) | Source for the Fish Audio recording; the rendered video is embedded in the Topic (scripts themselves stay in the repo) |
| Lab submission / verification | **Assignment (Dropbox)** for an artifact, or **Quiz** for an auto-check — one per object |
| `setup-check` / `prerequisites-check` lesson | **Checklist** (module entry gate) |
| `final-checkpoint` lesson | **Phase-gate Quiz/Assignment** (required to advance) |
| Self-paced progression | **Release Conditions** + **completion tracking** — next object unlocks when the prior lab is complete |
| `instructor`-fenced blocks in lessons | **Excluded** from student Topics (instructor-only; keep in repo, strip on export) |
| Mon/Wed live blocks (6–8 PM) | **Calendar events** + **Announcements**; each recording is posted as a Topic |
| Shared vLLM endpoint URL + key | Released D2L content item posted to the cohort (see Part 4) |

**Getting content into D2L — two paths:**

- **Manual build** — create Units/Modules/Topics in the D2L Content tool and paste HTML rendered from each lesson `.md`. Simplest for a first cohort; recommended to start.
- **IMS Common Cartridge import** — package the course as a `.imscc` and import it. Worth it once the structure is stable and reused across cohorts. *(Building the exporter is out of scope here.)*

---

## Part 4 — Shared vLLM infrastructure (owned)

The college runs **one shared inference server** that every student connects to from Continue.dev (and, later, their own API code). It replaces the per-student local GPU + Ollama setup. **The hardware is owned and already in place — this is no longer a procurement decision.** Target concurrency: **~16–30 students**.

### The server

- **Hardware:** 2× **NVIDIA RTX A6000** (48 GB each, **~96 GB** aggregate VRAM), single node.
- **Serving:** **vLLM**, OpenAI-compatible API with continuous batching. The large model runs **tensor-parallel across both A6000s** (`--tensor-parallel-size 2`).
- **Access:** students point Continue.dev at the shared endpoint over the **campus network / Tailscale** using a **single shared API key**. No per-student tokens, no LiteLLM proxy to operate.

### Architecture (reinforces Module 02)

```
Student (Continue.dev / API code)
        │  HTTP over campus network / Tailscale, shared key
        ▼
  vLLM (OpenAI-compatible API, continuous batching, --tensor-parallel-size 2)
        ▼
  2× NVIDIA RTX A6000 (48 GB each, ~96 GB)
```

- **vLLM** serves an OpenAI-compatible endpoint (`/v1`); its continuous batching suits the bursty, spread-out load of self-paced students.
- ~16–30 IDE users are **bursty** (mostly idle between requests), so batching serves them comfortably. The 8B autocomplete model keeps ghost-text latency low; the 70B handles chat/edit/agent when the request warrants it.
- The endpoint threads through Module 03 (what an API endpoint is), Module 05, and any future agents/MCP work.

### Models served — US-origin, no China-origin models

> **Constraint:** Qwen is excluded; treated as a China-origin restriction, so DeepSeek, Yi, GLM/ChatGLM, InternLM, etc. are also avoided. Both models below are Meta/US-origin and satisfy this. **Confirm the exact policy with the college.**

| Use in Continue | Model | Origin / License | Status |
|---|---|---|---|
| Autocomplete (only) | **Llama 3.1 8B Instruct** (`meta-llama/Llama-3.1-8B-Instruct`) | Meta (US) / Llama Community | Live now |
| Chat / inline edit / agent | **Llama 3.3 70B Instruct** (`meta-llama/Llama-3.3-70B-Instruct`, quantized, tensor-parallel across both A6000s) | Meta (US) / Llama Community | Coming online |

> **Serving note:** vLLM runs one model per process, so the 8B and 70B are served as **two vLLM instances** (e.g. two ports) behind the shared base URL; students select each by name in Continue via the `roles:` field. The 70B is quantized (e.g. AWQ/FP8) to fit tensor-parallel within ~96 GB.

---

## Open decisions

- [x] **Live session days/time (decided 2026-07-10):** Monday + Wednesday, 6:00–8:00 PM (instruction block + lab clinic). Start date still open.
- [ ] **Lab grading:** completion-only (pass/done) vs. graded? Affects D2L gradebook setup.
- [ ] **Endpoint distribution:** how the shared endpoint URL + key reach students (released D2L content item).
- [ ] **Network access:** campus-network-only vs. Tailscale for off-campus students.
- [ ] **70B rollout:** confirm the 70B is loaded and stable before Phase 3 opens; interim fallback (8B for chat) if not.
- [ ] **Confirm the model-origin policy** (is the exclusion China-origin specifically, or a named allowlist?) — Llama satisfies the current reading.
- [ ] Confirm whether to deliver via **manual D2L build** or **Common Cartridge** for cohort 1.

## Follow-up work (not in this plan)

- Author the **per-objective labs** using the Part 1 template — **done for Phase 1** (27 `## Lab` sections in the Module 00–02 lessons); Modules 03–06 (43 labs) remain.
- ~~Re-author Module 04 for public GitHub~~ — **done 2026-07-10**: lessons 04/07–10 re-authored against github.com, downstream Phase 3 references updated, directory renamed to `04-git-github/`, and two instructor baseline repos scaffolded in [`tools/github-baseline/`](../tools/github-baseline/) (`course-items-api` template + `course-pr-practice` cross-sharing hub) — publish them under the instructor's GitHub account before Module 04 opens.
- Author the **per-object video scripts** — **done for Phase 1** (27 scripts in `video-scripts/` folders, conventions in `phase-1-foundations/VIDEO-SCRIPTS.md`); Modules 03–06 remain. Instructor records them with Fish Audio.
- Optionally build a **D2L Common Cartridge exporter** and add `phase`/`week` metadata to the `Module` type in `insturctor-board/lib/curriculum.ts`.
- Keep the shared vLLM server patched and the 70B service monitored (this doc specifies the design + how students connect, not day-to-day ops).
