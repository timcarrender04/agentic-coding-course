# Instructor Notes — Module 03: FastAPI

## TODO before class

- [ ] Pre-pull `python:3.12-slim` and `postgres:16` on the classroom network so the first `docker pull` doesn't bottleneck on bandwidth: `docker pull python:3.12-slim postgres:16`.
- [ ] Verify every student finished Module 02 — `docker run hello-world` must work without sudo. If they haven't, run them through Module 02 lesson 01 first.
- [ ] Pre-write `~/docker-course/fastapi-app/.solutions-checked` empty file on the instructor machine so you can demo "this is what the solutions folder is for" without making it a temptation.
- [ ] Decide your pacing — this module is ~5.5h of content across 3 sessions. Suggest: lessons 00-04 in session 1, lessons 05-08 in session 2, lessons 09-12 in session 3.

## General Tips

- **Hot reload is the dopamine.** From lesson 03 onward, students should never type something without then watching `/docs` or `curl` reflect it. The "edit-save-refresh-see" loop is what makes the module fun. If a student isn't getting that loop, find out why before moving on.
- **Both verification methods, every time.** Curl AND Swagger. Don't let students skip Swagger because curl worked — Swagger is the FastAPI superpower they'll lean on for the rest of the course.
- **No copy-paste.** Same rule as Modules 01 and 02. Catch students mid-paste and call them out kindly. The `solutions/` folder exists for verification *after* they type, not for shortcuts.
- **The cumulative app matters.** By lesson 12 the project should be ~10 files in `~/docker-course/fastapi-app/`. If a student loses their files mid-module (deleted, broken venv), point them at the matching `solutions/NN-solution.md` to rebuild *just enough* to keep going.

## Where Students Get Stuck (in priority order)

### #1 — Forgetting to activate the venv (every lesson)
- Symptom: `ModuleNotFoundError: No module named 'fastapi'` or `pip install` writing to system Python.
- Fix: prompt should start with `(.venv) ` before the `$`. If it doesn't: `cd ~/docker-course/fastapi-app && source .venv/bin/activate`.
- This will happen every single time a student opens a new terminal. Drill it loudly in lesson 01.

### #2 — Forgetting `--host 0.0.0.0` inside Docker (lesson 08+)
- Symptom: container starts, `curl http://localhost:8000` returns "connection reset" or hangs.
- Reason: uvicorn's default `127.0.0.1` only listens on the **container's** loopback, not the host-mapped port. Need `0.0.0.0`.
- Drill it explicitly in lesson 08 step where they write the `CMD`.

### #3 — Postgres connection strings (lesson 09+)
- Symptom: `psycopg2.OperationalError: could not connect to server` or "connection refused."
- Reasons (in order): wrong hostname (use the service name `db`, not `localhost`), wrong port (5432 inside the network, not 5433 if mapped), wrong password, db not yet ready when api starts.
- Last one is the trickiest — Compose has `depends_on` but doesn't wait for postgres to be **ready**, just **started**. Lesson 09 covers a small `wait-for-db` workaround or a healthcheck.

### #4 — Forgetting `Content-Type: application/json` on curl POSTs (lesson 05+)
- Symptom: `422 Unprocessable Entity` even when the JSON looks right.
- Fix: `-H "Content-Type: application/json"`. Drill it.

### #5 — Port 8000 already in use
- Symptom: `[Errno 98] Address already in use` or `Bind for 0.0.0.0:8000 failed: port is already allocated`.
- Reason: a previous `uvicorn` is still running, or a previous `docker run` left a container running.
- Fix: `lsof -i :8000` to find the process, or `docker ps` to find the container. `pkill uvicorn` is the nuclear option.

### #6 — Pydantic v2 vs v1 syntax
- `Optional[str]` vs `str | None` — both work in Pydantic v2. The lessons use `str | None` because it's cleaner. If a student googles older tutorials, they'll see `Optional` — that's also fine.
- `model_config` vs `class Config` — same thing in v2. Lessons use v2 style.

### #7 — Tabs vs spaces in Python files
- Mixing them throws `IndentationError`. Cursor defaults to spaces — confirm in the bottom-right status bar of the editor.

## Common Error Messages Cheat Sheet

| Error | Most likely cause | Fix |
|---|---|---|
| `ModuleNotFoundError: No module named 'fastapi'` | venv not activated | `source .venv/bin/activate` |
| `[Errno 98] Address already in use` | another process on port 8000 | `lsof -i :8000` then kill it |
| `422 Unprocessable Entity` | request body doesn't match Pydantic model | look at the response body — FastAPI tells you which field |
| `Connection refused` (curl to container) | uvicorn bound to 127.0.0.1 instead of 0.0.0.0 | fix the `CMD` in Dockerfile |
| `psycopg2.OperationalError: connection refused` | wrong host (should be service name `db`), or db not ready | check connection string + healthcheck |
| `relation "items" does not exist` | tables not created | did you call `Base.metadata.create_all(bind=engine)` on startup? |
| `Method Not Allowed` (405) | wrong HTTP verb (e.g. GET on a POST route) | check the route decorator |
| `Not Found` (404 from FastAPI) | wrong path | check trailing slash, prefix on the router |
| `IndentationError` | mixing tabs and spaces | reformat with spaces |

## Lessons That Always Run Long

- **Lesson 09 (Compose + Postgres).** First time students juggle two services + a network. Plan for 50-60 min, not 40.
- **Lesson 10 (SQLAlchemy).** Engine + session + model + migrating endpoints — lots of moving parts. Plan for 60 min and have a fallback to push some endpoints to lesson 11.

## Suggested Schedule (3 × 2-hour sessions)

| Session | Lessons | Notes |
|---|---|---|
| 1 | 00 – 04 | Foundations + first server. End with a working hello-world hot-reloading. |
| 2 | 05 – 08 | Real API with bodies, structure, DI, then containerized. End with `docker run` of their own image. |
| 3 | 09 – 12 | Compose + Postgres + SQLAlchemy + capstone. The hardest session — pad with breaks. |

## Q&A Pause Points

- After lesson 03 (the "it's alive" moment — let them celebrate)
- After lesson 05 (Pydantic is a new mental model)
- After lesson 09 (Compose is a paradigm shift from single containers)
- After lesson 12 (wrap-up; preview Module 04)
