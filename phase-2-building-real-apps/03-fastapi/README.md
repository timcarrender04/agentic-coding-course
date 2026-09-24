# Module 03: FastAPI from Scratch

See [`../COURSE-SCHEDULE.md`](../COURSE-SCHEDULE.md) for the full 8-week, 16-session calendar. This module spans **multiple sessions** (it's longer than a single 2-hour block).

This module builds **one FastAPI application** from `python3 -m venv` to a containerized, Postgres-backed API. Every command and every line of code is typed by you — no copy-paste. By the end of lesson 12, the project sitting in `~/docker-course/fastapi-app/` is one you built line by line, not a starter someone gave you.

## What you'll be able to do at the end of this module

- Create and activate a Python virtual environment with `python3 -m venv`
- Install FastAPI + Uvicorn and freeze a `requirements.txt`
- Write FastAPI routes (GET, POST, DELETE) with path params, query params, and request bodies
- Validate request data with Pydantic models
- Organize a growing app with `APIRouter` and a `routers/` directory
- Write and apply dependencies with `Depends` (auth, DB sessions, etc.)
- Containerize the app with a Dockerfile
- Run the app + a Postgres database together with Docker Compose
- Persist data with SQLAlchemy and `psycopg2`
- Return correct HTTP status codes and use `HTTPException`
- Test every endpoint two ways: with `curl` and with the `/docs` Swagger UI

## Prerequisites

- **Module 01** complete (terminal, sudo, apt, git from Module 01's installs)
- **Module 02** complete (Docker installed, in the docker group, can `docker run` without sudo)
- `~/docker-course/` directory exists from Module 01
- A browser available — you'll be hitting `http://localhost:8000/docs` constantly
- ~3 GB free disk space (Python image, Postgres image, your image)

## Lessons

| # | File | Title | Est. Time |
|---|------|-------|-----------|
| 00 | [00-prerequisites-check.md](00-prerequisites-check.md) | Prerequisites Check | ~10 min |
| 01 | [01-python-environment.md](01-python-environment.md) | Python Virtual Environment | ~15 min |
| 02 | [02-installing-fastapi.md](02-installing-fastapi.md) | Installing FastAPI | ~10 min |
| 03 | [03-hello-world.md](03-hello-world.md) | Hello World | ~20 min |
| 04 | [04-path-and-query-params.md](04-path-and-query-params.md) | Path and Query Params | ~25 min |
| 05 | [05-request-bodies-with-pydantic.md](05-request-bodies-with-pydantic.md) | Request Bodies with Pydantic | ~30 min |
| 06 | [06-multiple-routes-and-routers.md](06-multiple-routes-and-routers.md) | Multiple Routes and Routers | ~25 min |
| 07 | [07-dependencies-and-injection.md](07-dependencies-and-injection.md) | Dependencies and Injection | ~25 min |
| 08 | [08-containerizing-fastapi.md](08-containerizing-fastapi.md) | Containerizing FastAPI | ~30 min |
| 09 | [09-docker-compose-and-postgres.md](09-docker-compose-and-postgres.md) | Docker Compose and Postgres | ~40 min |
| 10 | [10-database-with-sqlalchemy.md](10-database-with-sqlalchemy.md) | Database with SQLAlchemy | ~45 min |
| 11 | [11-error-handling-and-status-codes.md](11-error-handling-and-status-codes.md) | Error Handling and Status Codes | ~25 min |
| 12 | [12-final-checkpoint.md](12-final-checkpoint.md) | Final Checkpoint | ~30 min |

**Total estimated time: ~5h 30min** of typing and running. This module spans 3 class sessions.

## Solutions

If you get lost or fall behind, the [`solutions/`](solutions/) folder has the full file contents at the end of each lesson. Use them to **verify** what you typed, not to copy from. Copy-pasting from the solutions defeats the purpose of the module.

## What's next

Module 04 picks up from here — your FastAPI app is the codebase the rest of the course works against (testing, AI-assisted code changes, agents that talk to your API).
