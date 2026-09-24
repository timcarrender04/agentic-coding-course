# Agentic Coding Course

A self-paced, competency-based program that takes a beginner from "what is an IDE?" to
shipping a full-stack application with AI-assisted development. **3 phases × 6 weeks
(18-week suggested pace) · 7 modules · 70 hands-on labs**, one verifiable artifact per lesson.

- **Syllabus & lab catalog:** [`docs/course-packet.md`](./docs/course-packet.md) (PDF in [`marketing/pdf/`](./marketing/pdf/))
- **Self-paced D2L delivery plan:** [`docs/COURSE-PHASES-D2L.md`](./docs/COURSE-PHASES-D2L.md)
- **Instructor-led calendar:** [`docs/COURSE-SCHEDULE.md`](./docs/COURSE-SCHEDULE.md)
- **Marketing assets:** [`marketing/`](./marketing/) (banners, welcome packet, PDFs)

## The stack

- **IDE:** Visual Studio Code + the **Continue.dev** extension (free, open source)
- **AI inference:** the college's **shared vLLM endpoint** — 2× NVIDIA RTX A6000 (~96 GB),
  serving **Llama 3.1 8B** (autocomplete) and **Llama 3.3 70B** (chat / edit / agent),
  reached over the internal network with a single shared key
- **Also taught:** Linux/Ubuntu terminal, Docker, FastAPI, PostgreSQL/SQLAlchemy, Git & GitHub, HeroUI

## Machine prerequisite

A laptop running **Windows 10/11 with WSL2 (Ubuntu)** or **macOS** (a native Linux laptop
also works). Chromebooks and tablets are not supported.

## Structure

The course is organized into three phase folders; module numbering (`00`–`06`) runs
continuously across them.

| Phase | Folder | Weeks | Modules |
|---|---|---|---|
| **1 — Foundations** | [`phase-1-foundations/`](./phase-1-foundations/) | 1–6 | 00 VS Code · 01 Ubuntu Terminal · 02 Docker |
| **2 — Building Real Apps** | [`phase-2-building-real-apps/`](./phase-2-building-real-apps/) | 7–12 | 03 FastAPI · 04 Git & GitHub |
| **3 — AI-Assisted Development** | [`phase-3-ai-assisted-development/`](./phase-3-ai-assisted-development/) | 13–18 | 05 Continue.dev + vLLM · 06 HeroUI Frontend |

Each module ships with lessons (`NN-*.md`), a `README.md`, and instructor-only
`INSTRUCTOR-NOTES.md`. Entry `setup-check` / `prerequisites-check` lessons gate module entry;
each module's `final-checkpoint` is a phase-gate that must be passed to advance.
