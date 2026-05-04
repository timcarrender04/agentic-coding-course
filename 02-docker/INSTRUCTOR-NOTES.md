# Instructor Notes — Module 02: Docker

## TODO before class

- [ ] Confirm every student finished Module 01's final checkpoint. If not, run them through it during the first 10 min — Module 02 *will* fail without it.
- [ ] Verify the SSH host(s) from Module 00 lesson 06 still work and that students remember their connection details.
- [ ] Have a working Docker install on your own machine to demo from. Pre-pull `hello-world` and `nginx` so student demos don't lag the projector.
- [ ] Decide your fallback for students whose WSL Docker install fails: either provision a fresh course VM via SSH for them mid-class, or have them pair-program off a neighbor's screen.

## General Tips

- This module is the first time students run something that isn't their own typed command — `docker run hello-world` pulls an image they didn't write. Pause and explain what just happened. Don't let it feel like magic.
- The `docker` group + `newgrp` step trips at least one student per cohort. Plan to spend 5 min on it.
- Resist explaining Dockerfiles, networks, volumes, or compose today. Those are later. Today is "Docker exists, here's how to run a container."
- If a student gets stuck on install, do not let them fall behind. Pair them with someone whose install worked and have them follow along on the partner's machine. They can redo their own install at home.

## Where Students Get Stuck

### Lesson 00: Setup Check
- A student will swear they finished Module 01's checkpoint and they did not. Verify with `cat ~/docker-course/notes/notes.txt` — it should have entries from at least 5 lessons. If it's empty, send them to Module 01 lesson 11.

### Lesson 01: Install Docker Engine
- The official Docker apt-repo install has many steps. Students will try to skip ahead. **Do not let them.** Each step matters.
- The GPG key step (`curl ... | sudo gpg --dearmor`) silently fails if `gnupg` isn't installed. Module 01 lesson 5 installed it; verify with `which gpg` if a student has trouble.
- `sudo usermod -aG docker $USER` does not take effect in the current shell. Students must log out / log back in, or run `newgrp docker`. They will forget. Watch for "permission denied while trying to connect to the Docker daemon socket" — that's the symptom.
- **WSL gotcha:** in WSL2, `systemctl` may not work out of the box. If `sudo systemctl status docker` fails with "System has not been booted with systemd," have the student run `sudo service docker start` instead, and add `sudo service docker start` to their `~/.bashrc` for future sessions. Mention this only if it comes up — don't pre-emptively confuse Mac/Linux students.

### Lesson 02: Your First Container
- "Unable to find image 'hello-world:latest' locally" is **not an error.** Docker is telling them it's about to pull from Docker Hub. Read this line out loud to the class.

### Lesson 03: Running a Real Image
- Port mapping is the new concept here. Draw it on a whiteboard: "host port 8080 → container port 80." Students confuse which side is which.
- `docker run -d -p 8080:80 nginx` — the `-d` (detached) flag is easy to forget. If they leave it off, the terminal hangs and they think Docker is broken. It's not — nginx is running in the foreground. Have them Ctrl+C and re-run with `-d`.
- "localhost:8080" — for SSH students, "localhost" is the **remote**, not their laptop. They need to either set up port forwarding via Cursor's Remote-SSH (which it does automatically — show them the "Ports" tab in the panel) or `curl localhost:8080` from the SSH terminal.
- For WSL students, `localhost:8080` from their Windows browser usually works — WSL2 forwards localhost to the host. If it doesn't, `curl localhost:8080` from the WSL terminal will.

### Lesson 04: Images vs Containers
- This is the conceptual heart of the module. Slow down. Use the analogy: **image = recipe, container = the meal you cook from it.** You can cook many meals from one recipe.
- `docker ps` (running) vs `docker ps -a` (all, including stopped) is a major source of confusion. Students will run `docker ps`, see nothing, and think their container disappeared. Show both side by side.
- `docker rm` (removes container) vs `docker rmi` (removes image) — different commands. They will mix them up. Both names start with "rm" — read them together.

### Lesson 05: The Cursor Docker Sidebar
- This lesson is mostly "look at the thing." Don't over-engineer it. The win is that students see the sidebar from Module 00 lesson 04 finally populated.
- Right-click context menus in the Docker sidebar are useful — show "Stop container" and "Remove container" via right-click instead of CLI, just to demonstrate the UI <-> CLI parity.

### Lesson 06: Final Checkpoint
- No instructor help. Same rule as Module 01.
- The checkpoint requires nginx running on a port and visible in the Cursor sidebar. Both pieces.

## Suggested Schedule (~2-hour session)

| Block | Lessons | Duration |
|-------|---------|----------|
| Recap + setup check | 00 | 15 min |
| Install Docker | 01 | 25 min |
| Break | — | 10 min |
| First container + nginx | 02 + 03 | 25 min |
| Images vs containers | 04 | 20 min |
| Cursor sidebar | 05 | 10 min |
| Final checkpoint | 06 | 15 min |

Total: 120 min. Tight but doable. If install drags on, push the final checkpoint to homework.

## Q&A Pause Points

- After Lesson 01 (install is the hardest part — let them ask before moving on)
- After Lesson 04 (image vs container concept)
- After Lesson 06 (wrap-up, preview Module 03 — Git)
