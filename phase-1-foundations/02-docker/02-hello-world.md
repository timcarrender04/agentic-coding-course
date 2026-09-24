# Lesson 02: Your First Container

**By the end, you will have run a container and you will understand what just happened.**

⏱ ~10 minutes of typing

```instructor
Say: "First container. The whole point of today: you'll run a program you didn't install and didn't write, and it'll just work."
Mention: "'Unable to find image hello-world:latest locally' is NOT an error. Read it out loud to the room — Docker is telling them it's about to pull the image from Docker Hub."
Pause: After the welcome text prints. Walk through what just happened — pulled the image, started a container, ran the binary, exited. Don't let it feel like magic.
Say: "You're done when `docker run hello-world` prints 'Hello from Docker!' AND `docker ps -a` shows the exited container."
```

---

**1.** Start from home.
```bash
cd ~
```

**2.** Run the smallest possible container.
```bash
docker run hello-world
```
```
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
...
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

**3.** Read what Docker just told you. The first line said "Unable to find image 'hello-world:latest' locally" — **that is not an error.** Docker checked your local machine, didn't have the image, so it pulled it from Docker Hub and ran it. From now on, that image is cached locally.

**4.** Run it again. Notice it's faster — no pull this time.
```bash
docker run hello-world
```
```
Hello from Docker!
...
```

**5.** Look at the image Docker downloaded.
```bash
docker images
```
```
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    9c7a54a9a43c   8 months ago    13.3kB
```
(IDs and dates will vary. Notice the size — 13 KB. Tiny.)

**6.** Look at containers. By default `docker ps` shows only running ones.
```bash
docker ps
```
```
CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES
```
(Empty — hello-world ran and exited.)

**7.** Look at all containers, including stopped ones.
```bash
docker ps -a
```
```
CONTAINER ID   IMAGE         COMMAND    CREATED         STATUS                     PORTS   NAMES
abc123def456   hello-world   "/hello"   30 seconds ago  Exited (0) 28 seconds ago          modest_einstein
xyz789...      hello-world   "/hello"   1 minute ago    Exited (0) 1 minute ago            funny_curie
```
(Two stopped containers — one for each time you ran the image. Names are auto-generated.)

**8.** Read the names Docker gave them. They're random adjective + scientist combos.

**9.** Get just the container IDs.
```bash
docker ps -aq
```
```
abc123def456
xyz789ghi012
```

**10.** Log it.
```bash
echo "First container: hello-world ran successfully" >> ~/docker-course/notes/notes.txt
```

---

## What just happened (read this)

When you ran `docker run hello-world`, Docker did six things:

1. Looked for a local image called `hello-world` — didn't find it.
2. Connected to **Docker Hub** (docker.io) — the default public image registry.
3. Downloaded the `hello-world` image.
4. Created a **container** from that image (a running instance of it).
5. Started the container, which ran a tiny program that printed the welcome text.
6. The program finished, so the container **exited**. The container is now stopped, but still on disk (which is why `docker ps -a` shows it).

**Image** = the read-only blueprint Docker downloaded. **Container** = a running (or stopped) instance of an image. We'll explore this distinction more in lesson 04.

---

## Checkpoint

```bash
docker images | grep hello-world
```
You should see the hello-world image listed.

```bash
docker ps -a | grep hello-world
```
You should see at least one stopped hello-world container.

---

**Next up:** [03-running-nginx.md](03-running-nginx.md) — Run a real image
