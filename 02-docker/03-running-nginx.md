# Lesson 03: Running a Real Image

**By the end, you will have run a real web server in a container and reached it from a browser.**

⏱ ~15 minutes of typing

> **nginx** (pronounced "engine-x") is a popular web server. Today we'll run it in a container without installing it on our machine — that's the whole point of Docker.

---

**1.** Start from home.
```bash
cd ~
```

**2.** Pull the nginx image first (without running it). This downloads the image and shows you the layers.
```bash
docker pull nginx
```
```
Using default tag: latest
latest: Pulling from library/nginx
...
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest
```

**3.** See the image you just pulled.
```bash
docker images
```
You should see `nginx` listed alongside `hello-world`. Note the size — nginx is bigger (~140 MB).

**4.** Run nginx in **detached** mode (in the background) and map your machine's port 8080 to the container's port 80.
```bash
docker run -d -p 8080:80 --name web nginx
```
```
abc123def456...
```
(One long container ID printed. That's normal.)

**5.** Read that command. The flags mean:
- `-d` — **detached.** Run in the background. Without this, your terminal would be stuck showing nginx logs.
- `-p 8080:80` — **port map.** Forward port 8080 on **your machine** to port 80 **inside the container.** nginx listens on port 80 inside the container; you reach it on 8080 outside.
- `--name web` — give the container a friendly name (`web`) instead of the random one Docker would pick.
- `nginx` — the image to run.

**6.** Confirm nginx is running.
```bash
docker ps
```
```
CONTAINER ID   IMAGE   COMMAND                  CREATED         STATUS         PORTS                  NAMES
abc123...      nginx   "/docker-entrypoint.…"   10 seconds ago  Up 9 seconds   0.0.0.0:8080->80/tcp   web
```
You should see your `web` container with status `Up`.

**7.** Hit nginx from the same terminal.
```bash
curl -s http://localhost:8080 | head -n 10
```
```
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
```
You should see nginx's welcome HTML.

**8.** **Now from your browser.**
   - **WSL students:** open your Windows browser, go to `http://localhost:8080`. You should see the nginx welcome page.
   - **SSH students:** Cursor's Remote-SSH automatically forwards ports. Look at the bottom panel of Cursor — there should be a **"Ports"** tab. Click it. Port 8080 should be listed (or click "Forward a Port"). Click the globe icon next to it to open it in your local browser.
   - **Native Linux students:** open your browser, go to `http://localhost:8080`.

**9.** See the nginx logs (what requests it has received).
```bash
docker logs web
```
You should see lines for each request, including your `curl` and your browser visit.

**10.** Tail the logs in real time. Open the page in your browser again — you'll see new lines appear.
```bash
docker logs -f web
```
Press **Ctrl+C** to stop tailing.

**11.** Get a shell **inside** the running container.
```bash
docker exec -it web bash
```
You're now inside the container. The prompt changes to `root@<container-id>:/#`.

**12.** Look around — this is a different filesystem from your host.
```bash
ls /
```
You'll see standard Linux directories, but it's nginx's container, not your machine.

**13.** See what nginx is serving.
```bash
ls /usr/share/nginx/html/
```
```
50x.html  index.html
```

**14.** Exit the container shell.
```bash
exit
```
You're back on your host.

**15.** Stop the nginx container.
```bash
docker stop web
```
```
web
```

**16.** Confirm it's stopped.
```bash
docker ps
```
The `web` container should be gone from this list (running containers only).

**17.** It's still there, just stopped.
```bash
docker ps -a
```
You should see `web` with status `Exited`.

**18.** Start it again — same container, same data.
```bash
docker start web
```

**19.** Confirm it's running again and the port mapping is preserved.
```bash
docker ps
curl -s http://localhost:8080 | head -n 4
```

**20.** Stop it for now.
```bash
docker stop web
```

**21.** Log it.
```bash
echo "Ran nginx container 'web' on port 8080" >> ~/docker-course/notes/notes.txt
```

---

## Checkpoint

```bash
docker ps -a --filter name=web
```
You should see your `web` container (likely stopped).

```bash
docker images | grep nginx
```
You should see the nginx image.

You should also have seen the **nginx welcome page in your browser at http://localhost:8080** at some point during this lesson.

---

**Next up:** [04-images-and-containers.md](04-images-and-containers.md) — Tell images and containers apart, clean up after yourself
