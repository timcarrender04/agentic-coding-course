# Video: Setup Check

**Lesson:** [00-setup-check.md](../00-setup-check.md) · **Target:** ~2.5 min · **Words:** 359

## Narration

Hey, welcome to Module two. Today's the day we install Docker, and before we install anything big, we do what pilots do: a pre-flight check. Five minutes of checking now saves you an hour of debugging an install that went sideways halfway through.

Here's the idea behind this lesson. An installation is only as good as the environment you install into. So before Docker touches your machine, we prove four things. You're actually in Linux, not accidentally in a Windows terminal. You have soo-doo rights, because installing system software requires them. The tools from Module one, curl and G P G, are still there, because the Docker install uses both of them. And your machine can reach Docker Hub, the server we'll be downloading from.

There's one more check, and it's my favorite: the notes file. All through Module one you appended a line to your notes file at the end of each lesson. That file is your receipt. If it exists and has entries, you really did the work. If it's missing, no judgment, but you need to go back and finish Module one first, because everything in this module builds on it.

And one check might surprise you. We run which docker, and we want to see nothing. No output means Docker is not installed yet, which is exactly what we want. A clean slate. If something does print, raise your hand, because we need to know what's already on your machine before we install on top of it.

So here's your lab. Open VS Code, connect to your Ubuntu environment, open the integrated terminal, and run the nine checks in the lesson, top to bottom. Confirm Linux, confirm soo-doo, confirm the tools, confirm the notes file, confirm no Docker, confirm you can reach Docker Hub, and confirm you've got at least two gigabytes of free disk.

You're done when the checkpoint command at the bottom of the lesson runs clean, showing root, the two tool paths, and the path to your notes file. Copy that output and paste it into D2L. Then open the lesson, work the checks, and I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Module 02 — Lesson 00: Setup Check"; quick flash of a pilot-style checklist |
| 2 | Terminal: run `uname -s`, `sudo whoami`, `which curl gpg`, then `curl -s -o /dev/null -w "%{http_code}\n" https://hub.docker.com` showing `200` |
| 3 | Terminal: `cat ~/docker-course/notes/notes.txt` scrolling past Module 01 entries |
| 4 | Terminal: `which docker` returning nothing; cursor blinks on the empty line |
| 5 | VS Code connected (bottom-left "WSL: Ubuntu"), integrated terminal open, lesson file beside it; `df -h ~` output |
| 6 | Checkpoint one-liner running clean; select + copy the output (the paste to submit) |
