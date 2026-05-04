# Lesson 02: Run Ollama with Docker Compose

**By the end, you will have the official Ollama container running with GPU access, listening on port 11434.**

⏱ ~15 minutes of typing

> **Ollama** serves local LLMs over HTTP. We run it with **Docker Compose** (same Docker you used in Module 02) so every student gets the same setup — no host `install.sh`, no systemd vs WSL differences. Continue.dev still talks to `http://localhost:11434`.

---

**1.** Make sure your venv from Module 03 is **not** active (clearer terminal output).
```bash
deactivate 2>/dev/null
```

**2.** Confirm Docker works.
```bash
docker compose version
```

**3.** Create the Ollama stack directory.

If you have this course repo cloned, copy the bundled compose file (adjust the source path to your clone):
```bash
mkdir -p ~/docker-course/ollama
cp ~/agentic-coding-course/05-local-gpu-continue/ollama/docker-compose.yml ~/docker-course/ollama/
```

If you do not have the repo path handy, create `~/docker-course/ollama/docker-compose.yml` with exactly:

```yaml
services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    restart: unless-stopped
    gpus: all

volumes:
  ollama_data:
```

**4.** Start Ollama.
```bash
cd ~/docker-course/ollama
docker compose up -d
```

If this fails with errors about **GPU**, **nvidia**, or **could not select device**, install the [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html), restart Docker (`sudo systemctl restart docker` on native Linux — on WSL follow NVIDIA’s WSL notes), then run `docker compose up -d` again.

**5.** Confirm the container is running.
```bash
docker compose ps
```
You should see `ollama` with state `running` (or `Up`).

**6.** Confirm Ollama responds on port 11434.
```bash
curl -s http://localhost:11434
```
```
Ollama is running
```

**7.** List models (empty until lesson 03).
```bash
curl -s http://localhost:11434/api/tags | python3 -m json.tool
```
```
{
    "models": []
}
```

**8.** Check logs — especially that the server sees CUDA, not CPU-only.
```bash
docker compose logs ollama --tail 30
```
Look for lines mentioning **cuda** or **CUDA**. If logs suggest **cpu**-only inference and you expected GPU, re-check the NVIDIA Container Toolkit (see the note under step 4) and lesson 01 (driver).

**9.** Log it.
```bash
echo "Ollama stack: Docker Compose at ~/docker-course/ollama (image ollama/ollama:latest)" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`gpus: all`** requires Docker with GPU support (NVIDIA Container Toolkit on Linux / WSL). Without it, `docker compose up` may error or Ollama falls back to CPU (slow).
- **Port 11434** must stay free. If something else binds it, change the left side of `"11434:11434"` in the compose file (and set the same port in Continue’s `apiBase` in lesson 04).
- **Models live in the Docker volume** `ollama_data` (not `~/.ollama` on the host). Removing the volume deletes all pulled models: `docker compose down -v`.
- **Remote / split setup:** Ollama on machine A, IDE on machine B — publish port `11434` on A’s firewall, set Continue’s `apiBase` to `http://<A’s IP>:11434`. Lesson 04 mentions SSH; with Compose on the remote host, keep `apiBase: http://localhost:11434` when Cursor is attached via Remote-SSH to that host.

---

## Day-to-day commands

| Task | Command (from `~/docker-course/ollama`) |
|------|----------------------------------------|
| Start | `docker compose up -d` |
| Stop | `docker compose down` |
| Logs | `docker compose logs -f ollama` |
| Ollama CLI | `docker compose exec ollama ollama <subcommand>` |

---

## Checkpoint

```bash
cd ~/docker-course/ollama && docker compose ps
```
Should list service `ollama` as **Up** or **running**.

```bash
curl -s http://localhost:11434
```
Should print `Ollama is running`.

In lesson 03 you will load a model and watch `nvidia-smi` on the host spike — that confirms GPU use even if container logs are quiet.

---

**Next up:** [03-pull-and-test-models.md](03-pull-and-test-models.md) — Pull the coding model and the autocomplete model
