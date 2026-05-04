# Module 06: HeroUI Frontend

See [`../COURSE-SCHEDULE.md`](../COURSE-SCHEDULE.md) for the full 8-week, 16-session calendar. This module is taught in **session 12**.

This module builds a real **Next.js + HeroUI** frontend against the FastAPI backend you wrote in Module 03. You'll use **Continue.dev** with your local Ollama (Module 05) to scaffold and extend it. By the end you'll have an `items` page that lists items from your API and lets you create new ones from a form — a complete full-stack slice.

## What you'll be able to do at the end of this module

- Install Node.js with nvm and confirm `node`, `npm`, `npx` are on your PATH
- Initialize a HeroUI starter project with Next.js + Tailwind pre-configured
- Run a Next.js dev server with hot reload
- Drop in HeroUI components (`Button`, `Input`, `Card`, `Navbar`)
- Enable CORS in your FastAPI backend so the frontend can call it from a browser
- Fetch items from `http://localhost:8000/items` and render them on a page
- Build a form that POSTs new items to the API
- Use Continue.dev's agent mode to extend the frontend with a new feature
- Ship the change through a Gitea PR (Module 04 workflow)

## Prerequisites

- **Modules 00–05** complete. You should have:
  - Cursor + Continue.dev pointed at local Ollama (Module 05)
  - FastAPI app running at `~/docker-course/fastapi-app/` with Docker Compose (Module 03)
  - Gitea push working (Module 04)
- ~2 GB of free disk space (`node_modules` is heavy)
- Your FastAPI Docker Compose stack will need to be running for lessons 04 onward

## Lessons

| # | File | Title | Est. Time |
|---|------|-------|-----------|
| 00 | [00-prerequisites-check.md](00-prerequisites-check.md) | Prerequisites Check | ~5 min |
| 01 | [01-install-nodejs.md](01-install-nodejs.md) | Install Node.js with nvm | ~10 min |
| 02 | [02-init-heroui-app.md](02-init-heroui-app.md) | Init the HeroUI App | ~15 min |
| 03 | [03-tour-and-first-component.md](03-tour-and-first-component.md) | Tour + First Component | ~15 min |
| 04 | [04-cors-and-fetch-items.md](04-cors-and-fetch-items.md) | CORS + Fetch Items | ~25 min |
| 05 | [05-create-item-form.md](05-create-item-form.md) | Create-Item Form | ~20 min |
| 06 | [06-extend-with-continue.md](06-extend-with-continue.md) | Extend with Continue.dev | ~20 min |
| 07 | [07-final-checkpoint.md](07-final-checkpoint.md) | Final Checkpoint | ~20 min |

**Total estimated time: ~2h 10m** — fits one 2-hour session with breaks tight; the final checkpoint can spill to homework.

## What's next

Module 07 introduces tool use and agents at the API level — building on the same stack (FastAPI backend + HeroUI frontend + local Ollama).
