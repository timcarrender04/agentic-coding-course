# Module 02: Docker Installation and First Containers

See [`../COURSE-SCHEDULE.md`](../COURSE-SCHEDULE.md) for the full 8-week, 16-session calendar. This module is taught in **session 4** (one 2-hour session).

This module installs Docker Engine inside the Ubuntu environment you set up in Module 01, then walks you through your first containers. By the end, the Cursor Docker sidebar you installed in Module 00 lights up — the empty placeholder finally has containers and images in it.

## What you'll be able to do after this module

- Install Docker Engine from the official apt repository
- Add yourself to the `docker` group so you don't need `sudo` for every command
- Run `docker run hello-world` and explain what happened
- Run a real image (nginx) and reach it from a browser
- Tell containers and images apart and clean both up
- See the same containers in Cursor's Docker sidebar

## Prerequisites

- **Module 01 fully completed.** You need a working terminal, sudo, apt, and the docker-group muscle memory from lesson 10.
- **Module 00 fully completed.** You need Cursor, the Docker extension installed, and either WSL or SSH connected to the same Ubuntu environment Module 01 was done on.
- An internet connection (Docker downloads images on first run).
- ~2 GB of free disk space.

## Lessons

| # | File | Title | Est. Time |
|---|------|-------|-----------|
| 00 | [00-setup-check.md](00-setup-check.md) | Setup Check | ~5 min |
| 01 | [01-install-docker.md](01-install-docker.md) | Install Docker Engine | ~25 min |
| 02 | [02-hello-world.md](02-hello-world.md) | Your First Container | ~10 min |
| 03 | [03-running-nginx.md](03-running-nginx.md) | Running a Real Image | ~15 min |
| 04 | [04-images-and-containers.md](04-images-and-containers.md) | Images vs Containers | ~20 min |
| 05 | [05-cursor-docker-sidebar.md](05-cursor-docker-sidebar.md) | The Cursor Docker Sidebar | ~10 min |
| 06 | [06-final-checkpoint.md](06-final-checkpoint.md) | Final Checkpoint | ~15 min |

**Total estimated time: ~1h 40min**

## What's next

Module 03 covers Git and GitHub. Docker is now installed and you can keep using it across the rest of the course — most later modules will run things in containers.
