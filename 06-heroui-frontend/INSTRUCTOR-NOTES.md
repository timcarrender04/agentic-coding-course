# Instructor Notes — Module 06: HeroUI Frontend

## TODO before class

- [ ] **Run `heroui-cli init` end-to-end on your own machine the day before.** The HeroUI CLI changes prompts and defaults occasionally; lesson 02 assumes a specific flow.
- [ ] **Pre-install Node.js + nvm** on a backup laptop in case a student's `nvm install` fails on the classroom network.
- [ ] **Verify Module 03's FastAPI Compose stack still starts** for every student. `docker compose up -d` from `~/docker-course/fastapi-app/` should give them `{"hello":"fastapi"}` on `:8000`. The frontend is useless without it.
- [ ] **Decide port handling for SSH-to-remote students.** If they're SSH'd into a remote machine via Cursor's Remote-SSH, Cursor auto-forwards port 8000. They'll need port 3000 forwarded too — Cursor does this automatically when Next.js prints the URL, but flag it.
- [ ] **Pre-pull the HeroUI starter dependencies** on the classroom mirror if your network is tight. First `npm install` after `heroui-cli init` is ~150 MB.

## General Tips

- **Hot reload in Next.js is the dopamine** for this module, same role as `--reload` in FastAPI. From lesson 03 forward, students should never type code without watching the browser tab refresh. If a student isn't getting that loop, find out why.
- **Tailwind classes look insane.** "Why is everything `flex flex-col gap-4 p-6 bg-gray-100`?" is the most common beginner reaction. It is what it is — HeroUI ships Tailwind. Tell students they don't need to memorize Tailwind today; they need to recognize it and trust the components.
- **The frontend talks to FastAPI over HTTP.** `localhost:8000` from the browser. Module 03 muscle memory carries: same routes, same JSON, same Swagger docs. The frontend just makes the calls.
- **CORS is the most-confusing-bug-of-the-day.** Lesson 04 explicitly wires CORS in FastAPI; do not skip it. Without it, every fetch fails with a generic browser error.

## Where Students Get Stuck (in priority order)

### #1 — `nvm` not found in new terminals
- Symptom: student opens a new terminal, runs `node --version`, sees `command not found`.
- Cause: `nvm` is a shell function loaded by `.bashrc`/`.zshrc`. New terminals haven't sourced it OR `nvm install` happened in a terminal where the shell init wasn't finished.
- Fix: open a fresh terminal (close+reopen), or run `source ~/.bashrc`.

### #2 — CORS errors in the browser console
- Symptom: fetch to `http://localhost:8000/items` returns "blocked by CORS policy" in the browser console; in the network tab the request is "OPTIONS preflight failed" or no response at all.
- Cause: FastAPI doesn't have CORS middleware enabled.
- Fix: lesson 04 walks through adding `CORSMiddleware`. **Do not skip.**

### #3 — Mixed up frontend port and backend port
- Symptom: student opens `localhost:8000` and sees `{"hello":"fastapi"}` instead of the Next.js page; or opens `localhost:3000` and sees a "connection refused" because Next.js isn't running.
- Fix: 8000 = backend (FastAPI). 3000 = frontend (Next.js). Both must be running.

### #4 — `heroui-cli init` complaints about pnpm/yarn/npm
- Symptom: HeroUI's CLI may prefer a particular package manager (pnpm at one point). If the student has only `npm`, the CLI prompts but the prompt is buried.
- Fix: pick `npm` when prompted. The lessons use `npm` consistently.

### #5 — Next.js build errors after editing a server component
- Symptom: red screen in browser saying "You're importing a component that needs `useState`. It only works in a Client Component but none of its parents are marked with `\"use client\"`".
- Cause: Next.js 13+ defaults pages to **server components**. Anything with hooks (useState, useEffect) needs `"use client"` at the very top.
- Fix: lessons 04+ tell students to add `"use client"` as line 1. Some students will skip it. Watch for this.

### #6 — Module 05 (Continue.dev) not actually used
- The whole point of building this with Continue.dev is to drill agentic coding. Some students will type everything by hand and skip Continue. **Push them to use it** — chat for "how do I write this", inline edit for "change this thing", agent mode for "add this feature." The course's value is the integration, not the components.

## Common Error Messages Cheat Sheet

| Error | Cause | Fix |
|---|---|---|
| `command not found: nvm` | new shell hasn't sourced .bashrc | reopen terminal |
| `command not found: node` | nvm installed Node but didn't activate it | `nvm use --lts` |
| `Access to fetch at ... has been blocked by CORS policy` | FastAPI CORS middleware missing | lesson 04 |
| `Hydration failed because the initial UI does not match` | server/client mismatch | mark component `"use client"` |
| `EADDRINUSE: address already in use :::3000` | another Next.js dev server running | `pkill -f "next dev"` or use 3001 |
| `Cannot find module '@heroui/react'` | `npm install` was skipped | `cd <app> && npm install` |
| `connect ECONNREFUSED 127.0.0.1:8000` | FastAPI backend isn't running | `cd ~/docker-course/fastapi-app && docker compose up -d` |

## Suggested Schedule (1 × 2-hour session)

| Block | Lessons | Duration |
|---|---|---|
| Recap + setup + Node install | 00 + 01 | 20 min |
| Init HeroUI + tour | 02 + 03 | 30 min |
| Break | — | 10 min |
| CORS + fetch + form | 04 + 05 | 45 min |
| Continue.dev extends + checkpoint | 06 + 07 | 30 min |

If running long, push the final checkpoint to homework.

## Q&A Pause Points

- After lesson 03 (the dev server is up — let them celebrate)
- After lesson 04 (CORS + fetch is genuinely tricky for beginners)
- After lesson 06 (using the agent against a frontend codebase is a different feeling than against the backend)
- After lesson 07 (wrap-up, preview Module 07)
