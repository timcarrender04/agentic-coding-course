# Agentic Coding Course — Schedule

**Format:** 8 weeks × 2 sessions/week × 2 hours/session (6:00 PM – 8:00 PM)
**Total class time:** 32 hours across 16 sessions

## Per-session shape (every session)

| Time | Block |
|---|---|
| 6:00 – 6:10 | Arrive, recap last session, day's goal |
| 6:10 – 6:55 | Block 1 (lessons / drills) |
| 6:55 – 7:05 | Break |
| 7:05 – 7:50 | Block 2 (lessons / drills) |
| 7:50 – 8:00 | Wrap-up, Q&A, homework / preview next session |

Effective instruction time per session: ~1h 30m. Plan content to that, not to the full 2 hours.

## Schedule overview

| Week | Session | Module | Title | Status |
|---|---|---|---|---|
| 1 | 1 | 00 | Cursor Walkthrough — IDE, UI, terminal, extensions | **authored** |
| 1 | 2 | 00 + 01 | Cursor remote (WSL/SSH) + Terminal pt 1 | **authored** |
| 2 | 3 | 01 | Terminal pt 2 + final checkpoint | **authored** |
| 2 | 4 | 02 | Docker installation + first containers | **authored** |
| 3 | 5 | 03 | FastAPI pt 1 — venv, install, hello world, params (lessons 00–04) | **authored** |
| 3 | 6 | 03 | FastAPI pt 2 — Pydantic, routers, DI, Docker (lessons 05–08) | **authored** |
| 4 | 7 | 03 | FastAPI pt 3 — Compose+Postgres, SQLAlchemy, errors, capstone (lessons 09–12) | **authored** |
| 4 | 8 | 04 | Git pt 1 — config, commits, diff, log, branches, undo (lessons 00–06) | **authored** |
| 5 | 9 | 04 | Git pt 2 — Gitea, SSH, push, clone, PRs (lessons 07–11) | **authored** |
| 5 | 10 | 05 | Local GPU + Continue.dev pt 1 — Ollama (Docker Compose), model pull, Continue install/config (lessons 00–04) | **authored** |
| 6 | 11 | 05 | Local GPU + Continue.dev pt 2 — chat, autocomplete, edit, agent mode (lessons 05–09) | **authored** |
| 6 | 12 | 06 | HeroUI frontend — Node, init app, fetch FastAPI, build with Continue (lessons 00–07) | **authored** |
| 7 | 13 | 07 | Intro to agents — tool use concept | TBD |
| 7 | 14 | 07 | Tool calling against the local model + custom tools | TBD |
| 8 | 15 | 08 | MCP servers — using and writing one | TBD |
| 8 | 16 | 08 | Capstone project + demos | TBD |

> "TBD" means the module is **proposed** — no lesson files exist yet. Sessions 8–16 are a draft outline for you to revise before authoring.
> Module 03 (FastAPI) was scoped large and now spans **3 sessions** instead of the originally proposed 2. The remaining curriculum was compressed accordingly to still fit 16 sessions.

---

## Session 1 (Week 1, Session 1) — Module 00 part 1

**Goal:** Cursor installed; UI, terminal, and extensions understood.

| Time | Lesson | Content |
|---|---|---|
| 6:00 – 6:10 | — | Welcome, course overview, set expectations |
| 6:10 – 6:25 | 00-what-is-an-ide | IDE concept + install Cursor |
| 6:25 – 6:40 | 01-cursor-tour | UI tour, command palette, settings |
| 6:40 – 6:50 | 02-integrated-terminal | Open the terminal, editor vs terminal |
| 6:50 – 7:00 | — | **Break** |
| 7:00 – 7:15 | 03-extensions-overview | Marketplace, install Python extension |
| 7:15 – 7:25 | 04-docker-extension | Install Docker extension (sidebar will be empty — that's fine) |
| 7:25 – 7:50 | — | Buffer / Q&A / help students who fell behind |
| 7:50 – 8:00 | — | Preview session 2 (WSL/SSH); homework: come with WSL pre-installed if Windows |

**Why split here:** WSL install can require a reboot — better to do it at home before session 2 than burn class time on it.

## Session 2 (Week 1, Session 2) — Module 00 part 2 + Module 01 start

**Goal:** Connected to WSL or SSH; first half of terminal drills done.

| Time | Lesson | Content |
|---|---|---|
| 6:00 – 6:10 | — | Recap; verify everyone has Cursor + extensions from session 1 |
| 6:10 – 6:30 | 00 / 05-wsl-connection | Windows students: connect to WSL |
| 6:30 – 6:50 | 00 / 06-ssh-remote | All students: connect to instructor SSH host |
| 6:50 – 7:00 | 00 / 07-final-checkpoint | Module 00 self-test — submit screenshot |
| 7:00 – 7:10 | — | **Break** |
| 7:10 – 7:25 | 01 / 00-setup-check + 01-where-am-i | Setup check + pwd/ls/cd drills |
| 7:25 – 7:40 | 01 / 02-making-things | mkdir, touch, mv, cp, rm |
| 7:40 – 7:55 | 01 / 03-looking-inside-files | cat, less, tail, nano |
| 7:55 – 8:00 | — | Wrap-up; preview pt 2 (sudo, permissions, networking) |

## Session 3 (Week 2, Session 1) — Module 01 part 2

**Goal:** Terminal drills complete; final checkpoint passed.

| Time | Lesson | Content |
|---|---|---|
| 6:00 – 6:10 | — | Recap; quick re-drill of cd/ls for warm-up |
| 6:10 – 6:25 | 01 / 04-sudo-and-updates | sudo, apt update/upgrade |
| 6:25 – 6:35 | 01 / 05-installing-software | apt install |
| 6:35 – 6:55 | 01 / 06-permissions-drills | chmod, chown, rwx |
| 6:55 – 7:05 | — | **Break** |
| 7:05 – 7:20 | 01 / 07-networking-drills | ping, dig, curl |
| 7:20 – 7:35 | 01 / 08-processes-and-services | ps, top, systemctl |
| 7:35 – 7:55 | 01 / 09-pipes-and-grep + 10-user-and-group-setup | Pipes, grep, users/groups |
| 7:55 – 8:00 | — | **Final checkpoint (lesson 11) is take-home** — students submit before session 4 |

**Note:** Module 01's `INSTRUCTOR-NOTES.md` budgets a 2.5h session for itself. Splitting across two 2-hour sessions gives more breathing room and lets the final checkpoint be done at home with the instructor available for follow-up at the start of session 4.

---

## Sessions 4–16 (proposed, not yet authored)

These are a draft curriculum to fill the remaining ~26 hours. Revise before authoring lesson content.


### Module 04 — Python + AI-assisted scripting (2 sessions)
- **S7:** `python3`, `pip`, `venv` vs `uv`, package installation, why isolation matters.
- **S8:** Write a small script (e.g. parse a CSV, hit an API) using Cursor's tab-complete. First taste of AI assist.

### Module 05 — Local GPU + Continue.dev (2 sessions)
- **S10:** Run Ollama with Docker Compose, pull a coding model (Qwen 2.5 Coder 7B or similar), install Continue.dev in Cursor, point it at Ollama, verify chat works.
- **S11:** Chat / autocomplete / edit / agent mode in Continue. Drill them against the FastAPI repo from Module 03.

> **Why this stack:** Cursor as IDE (free download, paid AI features skipped) + Continue.dev (free, OSS extension that works in Cursor since Cursor is a VS Code fork) + Ollama in Docker Compose (GPU via NVIDIA Container Toolkit) + a local NVIDIA GPU. No cloud costs, no usage limits, models stay on your machine.

### Module 06 — Reading & changing code with AI (1 session)
- **S12:** Use Continue.dev to explore the FastAPI repo. `@` references, ask for explanations, refactor a function, ask the model to write a test, review what it produced.

### Module 07 — Agents & tool use (2 sessions)
- **S13:** Concept: an LLM that can call tools. Show Claude/Cursor doing it. Why it changes everything.
- **S14:** Hands-on: call the Claude API, define a tool, watch the model decide to use it.

### Module 08 — MCP + Capstone (2 sessions)
- **S15:** What MCP is. Connect Cursor to an existing MCP server. Write a tiny custom one.
- **S16:** Capstone: each student builds a small agentic tool (script that uses Claude + a couple of tools) and demos it.

---

## Open decisions for the instructor

- [ ] Confirm the curriculum draft above (or hand back a revised one) before I author Modules 02–08.
- [ ] Pick the two weekdays (e.g. Tue/Thu) and a start date — fill them into the schedule.
- [ ] Decide how the take-home final checkpoints are graded / submitted.
- [ ] Pick the instructor SSH host(s) for sessions 2 onward (referenced in Module 00 lesson 06).
- [ ] Decide whether to require a specific laptop spec / OS, or support BYO + WSL.

## Why this pacing works

- Sessions 1–3 are paced so no individual session runs over 1h 30m of instruction. Module 01's authored time (2.5h) was generous because it's typing drills with no break; splitting it across 2 sessions converts spare time into "students who fell behind catch up."
- Modules 02–08 each fit cleanly in 1–2 sessions. Pairing related sessions in the same week (S5+S6 git, S9+S10 AI, etc.) keeps momentum.
- The capstone (S16) is the only session without new content — students apply everything from the prior 15 sessions.
