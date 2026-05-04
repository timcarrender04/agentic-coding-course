# Lesson 04: Images vs Containers

**By the end, you will be able to tell containers and images apart, and clean both up.**

⏱ ~20 minutes of typing

> **Image** = the recipe (read-only blueprint). **Container** = the meal cooked from it (a running or stopped instance). One image, many containers.

```instructor
Say: "Today's conceptual heart: image vs container. Image is the recipe. Container is the meal. One image, many containers."
Mention: "`docker ps` shows running. `docker ps -a` shows all, including stopped. They'll run `ps`, see nothing, think the container vanished. Show both side-by-side."
Pause: At the cleanup section. `docker rm` removes a container; `docker rmi` removes an image. They will mix them up — read both names together before they type.
Say: "You're done when they can show you a stopped container in `ps -a`, remove it with `rm`, then remove its image with `rmi`."
```

---

**1.** Start from home.
```bash
cd ~
```

**2.** See all your images.
```bash
docker images
```
You should see `hello-world` and `nginx`.

**3.** See all your containers (running and stopped).
```bash
docker ps -a
```
You should see your `hello-world` containers from lesson 02 and your `web` container from lesson 03.

**4.** Run nginx **three more times** with different names — each one is a separate container from the same image.
```bash
docker run -d -p 8081:80 --name web2 nginx
```
```bash
docker run -d -p 8082:80 --name web3 nginx
```
```bash
docker run -d -p 8083:80 --name web4 nginx
```

**5.** Look at running containers — three nginx containers, all from the **same image**.
```bash
docker ps
```
```
CONTAINER ID   IMAGE   ...   PORTS                  NAMES
...            nginx   ...   0.0.0.0:8083->80/tcp   web4
...            nginx   ...   0.0.0.0:8082->80/tcp   web2
...            nginx   ...   0.0.0.0:8081->80/tcp   web3
```

**6.** Confirm only one nginx **image** exists.
```bash
docker images | grep nginx
```
```
nginx   latest   ...   140MB
```
**One image, multiple containers.** This is the point.

**7.** Hit each one — they're independent processes.
```bash
curl -s http://localhost:8081 | grep title
curl -s http://localhost:8082 | grep title
curl -s http://localhost:8083 | grep title
```
Each prints `<title>Welcome to nginx!</title>`.

**8.** Stop them all at once.
```bash
docker stop web2 web3 web4
```
```
web2
web3
web4
```

**9.** Confirm they're stopped.
```bash
docker ps
```
(Empty — none running.)

**10.** They still exist on disk.
```bash
docker ps -a
```
You should see `web`, `web2`, `web3`, `web4` and the old `hello-world` containers — all with `Exited` status.

**11.** Remove the stopped nginx containers.
```bash
docker rm web web2 web3 web4
```
```
web
web2
web3
web4
```

**12.** Confirm they're gone.
```bash
docker ps -a | grep web
```
(No output — the web containers are gone.)

**13.** Remove the old hello-world containers in one command. `$(...)` runs the inner command first and pastes the output as arguments.
```bash
docker rm $(docker ps -aq --filter ancestor=hello-world)
```
You'll see the IDs of the removed containers printed.

**14.** Confirm only no containers remain.
```bash
docker ps -a
```
(Empty.)

**15.** The **images** are still there — removing containers doesn't remove the images they were created from.
```bash
docker images
```
You should still see `hello-world` and `nginx`.

**16.** Remove the hello-world image.
```bash
docker rmi hello-world
```
```
Untagged: hello-world:latest
Deleted: sha256:...
```

**17.** Try to run it again — it'll be re-pulled because it's gone.
```bash
docker run hello-world
```
You should see the "Unable to find image locally" line again, then the welcome text.

**18.** Clean up that container we just made too.
```bash
docker rm $(docker ps -aq)
```

**19.** A faster shortcut — `docker container prune` removes all stopped containers in one step.
```bash
docker container prune -f
```
```
Total reclaimed space: ...
```

**20.** Same idea for images: `docker image prune -a` removes images that aren't being used by any container.
```bash
docker image prune -a -f
```
This removes hello-world and nginx since nothing is using them. You'll see their layers being deleted.

**21.** Confirm everything is gone.
```bash
docker images
docker ps -a
```
Both should be empty (or nearly so).

**22.** Re-pull nginx — we'll need it for the final checkpoint.
```bash
docker pull nginx
```

**23.** Log it.
```bash
echo "Image vs container drills: complete" >> ~/docker-course/notes/notes.txt
```

---

## Quick reference

| Command | What it does |
|---|---|
| `docker images` | List images |
| `docker ps` | List **running** containers |
| `docker ps -a` | List **all** containers, running and stopped |
| `docker run <image>` | Create a new container from an image and start it |
| `docker stop <name>` | Stop a running container |
| `docker start <name>` | Start a stopped container |
| `docker rm <name>` | Remove a stopped container |
| `docker rmi <image>` | Remove an image |
| `docker logs <name>` | Show a container's logs |
| `docker exec -it <name> bash` | Get a shell inside a running container |
| `docker container prune -f` | Remove all stopped containers |
| `docker image prune -a -f` | Remove all unused images |

---

## Checkpoint

```bash
docker images | grep nginx
```
You should see nginx (you re-pulled it in step 22).

```bash
docker ps -a
```
Should be empty or near-empty — you cleaned up.

```bash
docker run -d -p 8080:80 --name test nginx && docker stop test && docker rm test
```
Should run, stop, and remove a container with no errors.

---

**Next up:** [05-cursor-docker-sidebar.md](05-cursor-docker-sidebar.md) — See all this in Cursor's Docker sidebar
