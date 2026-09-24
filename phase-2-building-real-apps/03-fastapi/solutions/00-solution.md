# Solution: Lesson 00 — Prerequisites Check

After this lesson there are no project files yet. The lesson is purely verification.

## Expected terminal output

All five version checks should print versions:

```
$ python3 --version
Python 3.10.12

$ pip3 --version
pip 22.0.2 from /usr/lib/python3/dist-packages/pip (python 3.10)

$ docker --version
Docker version 24.0.7, build afdd53b

$ docker compose version
Docker Compose version v2.21.0

$ curl --version | head -n 1
curl 7.81.0 (x86_64-pc-linux-gnu) ...
```

`docker run --rm hello-world` should print "Hello from Docker!".

## If something failed

| Symptom | Fix |
|---|---|
| `python3: command not found` | `sudo apt install -y python3` |
| `pip3: command not found` | `sudo apt install -y python3-pip` |
| `docker: command not found` | Redo Module 02 lesson 01 |
| `docker: permission denied` | `sudo usermod -aG docker $USER && newgrp docker` |
| `~/docker-course/` missing | Redo Module 01 |

Once all checks pass, move on to lesson 01.
