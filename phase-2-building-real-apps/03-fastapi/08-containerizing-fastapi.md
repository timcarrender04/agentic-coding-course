# Lesson 08: Containerizing FastAPI

**By the end, you will have a Dockerfile that builds your FastAPI app into an image, and you will be able to run that image with `docker run` and hit it with curl.**

⏱ ~30 minutes of typing

> The Module 02 muscle memory pays off here. You're going to write a Dockerfile from scratch, build it, and run it. Same `docker run` patterns you drilled before.

```instructor
Say: "Module 02 muscle memory time. We write a Dockerfile for the FastAPI app, build it, run it, hit it with curl from outside the container."
Mention: "In the `CMD`, uvicorn MUST bind `--host 0.0.0.0` — not the default 127.0.0.1. Otherwise the port-mapping works but `curl localhost:8000` resets the connection. Top stuck point #2 of the module."
Pause: After they `docker run`. Curl from the host AND check `docker logs` together. If either is silent, the host bind is wrong.
Say: "You're done when their image runs, port 8000 is mapped, and curl from the host returns the same JSON as before."
```

---

**1.** Make sure you're in the project directory. **Stop the running uvicorn** with Ctrl+C in its terminal — we're about to use port 8000 from a container instead.
```bash
cd ~/docker-course/fastapi-app
```

**2.** Create an empty `Dockerfile`.
```bash
touch Dockerfile
```

**3.** Open `Dockerfile` in Cursor.

**4.** Type the base image line. We use the `slim` variant of Python 3.12 — small but enough.
```dockerfile
FROM python:3.12-slim
```

**5.** Set the working directory inside the container.
```dockerfile
WORKDIR /app
```

**6.** Copy `requirements.txt` first (before the rest of the code). This is the **layer-caching trick**: if requirements don't change, Docker reuses the pip-install layer between builds.
```dockerfile
COPY requirements.txt .
```

**7.** Install the dependencies inside the image.
```dockerfile
RUN pip install --no-cache-dir -r requirements.txt
```

**8.** Now copy the rest of the code.
```dockerfile
COPY . .
```

**9.** Expose the port the app will listen on (this is documentation more than networking — `-p` on `docker run` is what actually publishes it).
```dockerfile
EXPOSE 8000
```

**10.** Set the command to run when the container starts. **Note `--host 0.0.0.0`** — without that, uvicorn only listens on the container's loopback and `docker run -p` won't reach it.
```dockerfile
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**11.** Save. Confirm the file.
```bash
cat Dockerfile
```
You should see seven lines (the seven directives above).

**12.** Create a `.dockerignore` to keep your venv and other junk out of the image.
```bash
touch .dockerignore
```

**13.** Open `.dockerignore` and add:
```
.venv/
__pycache__/
*.pyc
.git/
.gitignore
Dockerfile
.dockerignore
```

**14.** Save.

**15.** Build the image. The `.` at the end is the **build context** — the current directory.
```bash
docker build -t fastapi-app .
```
You should see a series of step lines (`[1/6] FROM python:3.12-slim`, `[2/6] WORKDIR /app`, etc.), then `Successfully tagged fastapi-app:latest`.

**16.** Confirm the image exists.
```bash
docker images | grep fastapi-app
```
```
fastapi-app   latest   abc123...   30 seconds ago   180MB
```

**17.** Run the container. `-d` for detached, `-p` to map host port 8000 to container port 8000, `--name` for friendly identification.
```bash
docker run -d -p 8000:8000 --name fastapi-app fastapi-app
```
```
abc123def456...
```

**18.** Confirm it's running.
```bash
docker ps --filter name=fastapi-app
```
You should see status `Up`.

**19.** Hit it.
```bash
curl http://localhost:8000
```
```
{"hello":"fastapi"}
```

**20.** Hit the items route.
```bash
curl http://localhost:8000/items
```
```
[]
```
(Fresh container — empty list.)

**21.** Hit the protected route without the header.
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/items/me/protected
```
```
422
```

**22.** Hit it with the right header.
```bash
curl http://localhost:8000/items/me/protected -H "X-Token: secret-token"
```
```
{"message":"Hello admin, you reached a protected route"}
```

**23.** Open `http://localhost:8000/docs` in the browser. Same Swagger UI, now served from the container.

**24.** Look at the container's logs.
```bash
docker logs fastapi-app
```
You should see the uvicorn startup banner and entries for each request you've made.

**25.** Make a code change to confirm the container is **isolated** from your local files. In Cursor, change `main.py`'s `read_root` return to `{"hello": "from-host"}`. Save.

**26.** Curl the container.
```bash
curl http://localhost:8000
```
```
{"hello":"fastapi"}
```
(Unchanged — the image was built with the old code. The container doesn't see your edits.)

**27.** Rebuild the image.
```bash
docker build -t fastapi-app .
```

**28.** Restart the container with the new image.
```bash
docker stop fastapi-app && docker rm fastapi-app
docker run -d -p 8000:8000 --name fastapi-app fastapi-app
```

**29.** Curl again.
```bash
curl http://localhost:8000
```
```
{"hello":"from-host"}
```
(Now the new code is in the image.)

**30.** Revert your change in `main.py` back to `{"hello": "fastapi"}` and save (we don't need to rebuild — we'll use Compose with bind mounts in the next lesson for hot reload inside Docker).

**31.** Stop and remove the container — we'll let Compose own the lifecycle from now on.
```bash
docker stop fastapi-app && docker rm fastapi-app
```

**32.** Log it.
```bash
echo "Dockerfile + image build + container run: working" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`--host 0.0.0.0`** in `CMD`. Without it, uvicorn binds only to the container's loopback and `curl http://localhost:8000` from the host returns "connection reset." This is the most common Dockerfile mistake.
- The `.dockerignore` file matters — without it, your `.venv/` (~150 MB) gets copied into the image, ballooning it. Keep `.venv/` out.
- `COPY requirements.txt .` **before** `COPY . .`. If you copy everything first, every code change invalidates the pip-install cache and re-installs every package on every build. That's slow.
- Code changes don't appear in the container until you **rebuild and restart**. That's why we use Compose with bind mounts next — for dev parity with the venv hot-reload.

---

## Checkpoint

```bash
docker images | grep fastapi-app
```
Should show your image.

```bash
docker build -t fastapi-app .
```
Should complete without errors.

```bash
docker run --rm -d -p 8000:8000 --name test-fastapi fastapi-app && sleep 2 && curl -s http://localhost:8000 && docker stop test-fastapi
```
Should print `{"hello":"fastapi"}` and stop the container.

---

**Next up:** [09-docker-compose-and-postgres.md](09-docker-compose-and-postgres.md) — Add a Postgres database and orchestrate both with Compose
