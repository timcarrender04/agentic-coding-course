# Video: Install Docker Engine

**Lesson:** [01-install-docker.md](../01-install-docker.md) · **Target:** ~2.5 min · **Words:** 352

## Narration

Alright, this is the big one. Today Docker actually lands on your machine, and you're going to install it the way professionals do: from Docker's official package repository, with a cryptographic key that proves every package really came from Docker.

Two concepts before you type anything. First, we're installing Docker Engine, not Docker Desktop. Docker Desktop is a separate point-and-click product for Windows and Mac. Docker Engine is the actual Linux daemon, the thing that runs containers, and on Linux, including W S L, it's what you want. Second, the trust chain. You'll download Docker's G P G key, tell apt where Docker's repository lives, and only then install. That's how Linux machines everywhere get software safely, and now you'll have done it by hand.

There's one fork in the road. After the install, if you're on W S L and system C T L complains that the system has not been booted with system D, don't panic — you just start the daemon the W S L way instead, soo-doo service docker start, and you're back on the same path as everyone else.

The last stretch is about permissions. Out of the box, only root can talk to the Docker daemon. So you'll add yourself to the docker group, refresh your session, and from then on you run docker commands without soo-doo. If you ever see permission denied on the Docker socket, the group membership hasn't taken effect yet — log out and back in, or reopen the terminal, and it will.

So here's your lab. Work the twenty-one steps in order: key, repository, install, start the daemon, join the docker group, and log a line to your notes file. Type the long commands carefully — they're long for a reason.

You're done when three things are true. Docker dash dash version prints a version. Docker info runs without soo-doo and without a permission error. And the groups command shows docker in your list. Paste those outputs, plus the tail of your notes file, into D2L. Then open the lesson, take your time, and I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 01 — Install Docker Engine"; browser flash of download.docker.com repo page |
| 2 | Split shot: Docker Desktop marketing page vs a bare terminal; then terminal running the GPG key + `tee` repo steps (steps 3–8) |
| 3 | Terminal: `sudo systemctl status docker` failing with the systemd message, then `sudo service docker start` succeeding |
| 4 | Terminal: `docker info` hitting "permission denied", then `sudo usermod -aG docker $USER`, `newgrp docker`, `groups` showing docker |
| 5 | Lesson file scrolled to show steps 1–21; terminal running `sudo apt install docker-ce ...` |
| 6 | Terminal: `docker --version`, `docker info | head -n 5`, `groups`, `tail -n 1 ~/docker-course/notes/notes.txt` — the outputs to paste |
