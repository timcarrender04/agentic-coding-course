# Lesson 01: Python Virtual Environment

**By the end, you will have a Python virtual environment activated in your project directory and you will know how to toggle it on and off.**

⏱ ~15 minutes of typing

> A **virtual environment** (venv) is an isolated copy of Python and its packages, scoped to one project. Installing FastAPI into a venv keeps it from polluting your system Python.

---

## When to use a venv (especially without Docker)

You use a venv whenever you want a **project-scoped Python** on your machine: predictable package versions, no clashes with system tools, and a clear “this folder owns my dependencies” story. That applies to everyday coding **and** to running checks locally.

**Testing and iterating without Docker** is one of the main reasons to set this up first:

- **Speed:** Activating a venv and running `pytest`, `uvicorn`, or a one-off script is seconds. Building an image, starting a container, and mounting volumes is slower—fine for integration work, heavy for a tight edit–test loop.
- **IDE and debugger:** Your editor’s Python interpreter can point at `.venv`. Breakpoints, “run test under cursor,” and type-checking against installed packages work cleanly without wiring Docker into the IDE (possible, but more moving parts).
- **Failures are easier to read:** Tracebacks and log lines reference paths on your host. When something breaks in a container, you often need to map container paths and env vars back to your repo—again, great for realism, not ideal for the first pass at a failing test.
- **Network and filesystem:** Hitting `localhost:8000` from a browser on your host, reading a local SQLite file, or using a test double does not require publishing ports or bind-mount conventions from day one.

**When Docker still matters (later in the course):** Containers give you **repeatable environments**—same OS-ish layer, same Python base image, same install steps—so “works on my machine” disappears for deploys and CI. You will often **develop in a venv** and **verify in Docker** (or run CI in Docker) so you get fast local feedback *and* confidence that the app behaves the same when packaged.

**Practical split:**

| Goal | Typical choice |
|------|----------------|
| Unit tests, quick API smoke tests, learning FastAPI | Venv on the host (this lesson) |
| Postgres/Redis wired like prod, multi-service compose, deployment parity | Docker / Compose |

Neither replaces the other. The venv is your **default tool for “run Python on this machine”**; Docker is your **default tool for “run the same stack everywhere else.”** If you skip the venv and only use Docker, every small test pays container startup cost; if you only use a venv, you can miss issues that only appear in the containerized layout—so both show up in a solid workflow.

---

**1.** Install the venv package (some Ubuntu installs ship without it).
```bash
sudo apt install -y python3-venv python3-pip
```

**2.** Make sure you're in your home directory.
```bash
cd ~
```

**3.** Create the project folder.
```bash
mkdir -p ~/docker-course/fastapi-app
```

**4.** Move into it.
```bash
cd ~/docker-course/fastapi-app
```

**5.** Confirm.
```bash
pwd
```
```
/home/your-user/docker-course/fastapi-app
```

**6.** Create a virtual environment in a folder called `.venv`. The dot prefix hides it from `ls` by default.
```bash
python3 -m venv .venv
```
(No output. Takes a couple of seconds.)

**7.** See what got created.
```bash
ls -la .venv
```
You should see `bin`, `include`, `lib`, `pyvenv.cfg`.

**8.** Activate the venv.
```bash
source .venv/bin/activate
```

**9.** Look at your prompt — it should now start with `(.venv)`. That's how you know the venv is active.
```
(.venv) your-user@host:~/docker-course/fastapi-app$
```

**10.** See which Python you're using now.
```bash
which python
```
```
/home/your-user/docker-course/fastapi-app/.venv/bin/python
```
(That's the **venv** Python, not the system one.)

**11.** Same for pip.
```bash
which pip
```
```
/home/your-user/docker-course/fastapi-app/.venv/bin/pip
```

**12.** Check the Python version inside the venv.
```bash
python --version
```
```
Python 3.10.12
```
(Note: you can now type `python`, not `python3` — the venv aliases it.)

**13.** Deactivate the venv.
```bash
deactivate
```

**14.** Look at your prompt — the `(.venv)` is gone. You're back to system Python.
```bash
which python
```
```
/usr/bin/python
```
(Or `python3` only — depends on your distro.)

**15.** Reactivate it. You'll be doing this a lot.
```bash
source .venv/bin/activate
```

**16.** Confirm the prompt is back to `(.venv)`.
```bash
which python
```
```
/home/your-user/docker-course/fastapi-app/.venv/bin/python
```

**17.** Add `.venv/` to a `.gitignore` so the venv never gets committed if this becomes a git repo.
```bash
echo ".venv/" > .gitignore
```

**18.** Confirm.
```bash
cat .gitignore
```
```
.venv/
```

**19.** Log it.
```bash
echo "venv created at ~/docker-course/fastapi-app/.venv" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Every time you open a new terminal, the venv is NOT active.** You will have to run `source .venv/bin/activate` again. This is the #1 source of "why is FastAPI not found" errors for the rest of the module.
- The `(.venv)` prompt prefix is your single source of truth. If you don't see it, the venv is off.
- Don't run `pip install` outside the venv. It will install into your system Python and you'll waste an hour debugging.

---

## Checkpoint

```bash
which python
```
You should see `/home/.../fastapi-app/.venv/bin/python`.

```bash
echo $VIRTUAL_ENV
```
You should see the path to your `.venv` directory.

```bash
ls -la ~/docker-course/fastapi-app
```
You should see `.venv` and `.gitignore`.

---

**Next up:** [02-installing-fastapi.md](02-installing-fastapi.md) — Install FastAPI into your venv
