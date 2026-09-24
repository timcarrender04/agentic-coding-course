# Lesson 00: Prerequisites Check

**By the end, you will have confirmed that everything from Modules 01 and 02 still works on your machine.**

⏱ ~10 minutes

```instructor
Say: "Quick checks that everything from Modules 01 and 02 still works. Anything broken now will only get worse once we layer FastAPI on top."
Mention: "Confirm `docker run hello-world` runs WITHOUT sudo. If they need sudo, the docker group didn't take effect — `newgrp docker` or fresh login. Same trap as Module 02 lesson 01."
Pause: After the network/Docker checks. If anyone is failing, sort it now. Don't carry a broken environment into FastAPI.
Say: "You're done when every command in this file passes. If it doesn't, fix it before we install Python packages."
```

---

**1.** Open Cursor connected to your Ubuntu environment (WSL or SSH from Module 00). Open the integrated terminal.

**2.** Confirm Python 3 is installed.
```bash
python3 --version
```
```
Python 3.10.12
```
(Any 3.10+ is fine.)

**3.** Confirm pip is installed.
```bash
pip3 --version
```
```
pip 22.0.2 from /usr/lib/python3/dist-packages/pip (python 3.10)
```

**4.** Confirm Docker is installed and you're in the docker group.
```bash
docker --version
```
```
Docker version 24.0.7, build afdd53b
```

**5.** Confirm Docker works without sudo.
```bash
docker run --rm hello-world | head -n 1
```
```
Hello from Docker!
```

**6.** Confirm Docker Compose is available.
```bash
docker compose version
```
```
Docker Compose version v2.21.0
```

**7.** Confirm curl is installed (Module 01 lesson 5 installed it).
```bash
curl --version | head -n 1
```
```
curl 7.81.0 (x86_64-pc-linux-gnu) ...
```

**8.** Confirm your course directory exists from Module 01.
```bash
ls ~/docker-course/
```
You should see `notes`, `practice`, `projects`, etc.

**9.** Confirm your notes file is intact.
```bash
tail -n 3 ~/docker-course/notes/notes.txt
```
You should see entries from Modules 01 and 02.

**10.** Log this check.
```bash
echo "Module 03 prereq check: passed $(date -Iseconds)" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

If **any** step above failed, do not continue. Go back and fix it:
- `python3` not found → `sudo apt install -y python3`
- `pip3` not found → `sudo apt install -y python3-pip`
- `docker` permission denied → you skipped `sudo usermod -aG docker $USER && newgrp docker` in Module 02 lesson 01
- `~/docker-course/` missing → you skipped Module 01

---

## Checkpoint

```bash
python3 --version && pip3 --version && docker --version && docker compose version && curl --version | head -n 1
```
You should see five version lines, no errors.

```bash
docker run --rm hello-world > /dev/null && echo "docker OK"
```
You should see `docker OK`.

```bash
ls ~/docker-course/notes/notes.txt
```
You should see the path printed.

---

**Next up:** [01-python-environment.md](01-python-environment.md) — Set up a Python virtual environment for the FastAPI project
