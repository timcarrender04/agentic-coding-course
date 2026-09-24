# Lesson 01: Install Docker Engine

**By the end, you will have Docker Engine installed from the official Docker apt repository, and you will be in the docker group.**

⏱ ~25 minutes of typing

> We are installing **Docker Engine** (the Linux daemon) — not Docker Desktop. Docker Desktop is a separate Windows/Mac product. On Linux (including WSL), Docker Engine is what you want.

```instructor
Say: "We're installing Docker Engine from the official apt repo — not Docker Desktop. Docker Desktop is a separate product. We want the Linux daemon."
Mention: "After `sudo usermod -aG docker $USER`, they MUST log out and back in OR run `newgrp docker`. Otherwise every Docker command fails with 'permission denied while trying to connect to the Docker daemon socket'."
Pause: After the GPG key step. If `gpg` is missing the dearmor silently fails — confirm `which gpg` returns a path before letting them continue.
Say: "You're done when `docker run hello-world` prints the welcome text WITHOUT sudo. If they used sudo, the group step didn't take effect — they need `newgrp docker` or a fresh login."
```

---

**1.** Start from home.
```bash
cd ~
```

**2.** Update the package list.
```bash
sudo apt update
```

**3.** Add Docker's official GPG key. This proves the packages you download are really from Docker.
```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

**4.** Download the key.
```bash
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```

**5.** Make the key file readable by everyone.
```bash
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

**6.** Confirm the key is in place.
```bash
ls -la /etc/apt/keyrings/docker.asc
```
You should see the file.

**7.** Add the Docker apt repository to your sources list. This is one long command — type it carefully.
```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

**8.** Confirm the repo file was created.
```bash
cat /etc/apt/sources.list.d/docker.list
```
```
deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu jammy stable
```
(Architecture and codename will vary.)

**9.** Update apt again — this time it'll see Docker's repo.
```bash
sudo apt update
```
You should see a line mentioning `download.docker.com`.

**10.** Install Docker Engine and the standard plugins.
```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
(This will take a minute or two.)

**11.** Confirm Docker is installed.
```bash
docker --version
```
```
Docker version 24.0.7, build afdd53b
```
(Version will vary.)

**12.** Confirm the Docker daemon is running. **WSL users:** if `systemctl` fails with "System has not been booted with systemd," skip to step 13.
```bash
sudo systemctl status docker
```
You should see `Active: active (running)`. Press `q` to exit.

**13.** **WSL only:** start the Docker service the WSL way.
```bash
sudo service docker start
```
```
 * Starting Docker: docker
```

**14.** Confirm the docker group now exists (Module 01 lesson 10 said it would after install).
```bash
grep docker /etc/group
```
```
docker:x:998:
```
(Number will vary. The group exists — that's the point.)

**15.** Add yourself to the docker group. **This is the command you previewed in Module 01 lesson 10. Now it works.**
```bash
sudo usermod -aG docker $USER
```
(No output means success.)

**16.** Refresh your group membership in this shell without logging out.
```bash
newgrp docker
```

**17.** Confirm you're in the docker group.
```bash
groups
```
```
your-user adm sudo docker
```
You should see `docker` in the list.

**18.** Test Docker without sudo.
```bash
docker info
```
You should see a long block of info about the Docker daemon. If you get "permission denied while trying to connect to the Docker daemon socket," your group membership didn't refresh — log out and back in, or close and reopen the integrated terminal, then try again.

**19.** See where Docker is installed.
```bash
which docker
```
```
/usr/bin/docker
```

**20.** Log it.
```bash
echo "Docker installed: $(docker --version)" >> ~/docker-course/notes/notes.txt
```

**21.** Verify the note.
```bash
tail -n 1 ~/docker-course/notes/notes.txt
```
```
Docker installed: Docker version 24.0.7, build afdd53b
```

---

## Checkpoint

```bash
docker --version
```
You should see a Docker version.

```bash
docker info | head -n 5
```
You should see info without `sudo` and without permission errors.

```bash
groups | grep docker
```
You should see `docker` somewhere in the output.

---

**Next up:** [02-hello-world.md](02-hello-world.md) — Run your first container
