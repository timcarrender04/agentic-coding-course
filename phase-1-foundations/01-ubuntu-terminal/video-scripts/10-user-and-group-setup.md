# Video: User and Group Setup

**Lesson:** [10-user-and-group-setup.md](../10-user-and-group-setup.md) · **Target:** ~2.5 min · **Words:** 350

## Narration

Today, one of your commands is supposed to fail. Not might fail — supposed to. And the error message it prints is actually your proof that everything is exactly right. Let me explain.

First, the concepts. Every account on a Linux system is a user, and users are collected into groups. Groups are how Linux hands out privileges in bulk — you're in the soo-doo group, so you can run soo-doo. The I D command shows your user I D and every group you're in, and the groups command lists just the names. That's the reading side. The writing side is user-mod with dash A capital G, which appends your user to a group. That one command is the reason this lesson exists.

Here's why. In Module Two you'll install Docker, and out of the box, Docker demands soo-doo for every single command. The fix is adding yourself to the docker group. But today, Docker isn't installed yet — which means the docker group doesn't exist yet. So when you run soo-doo user-mod dash A G docker, it fails: user-mod, group docker does not exist. That's the expected failure. You're rehearsing the command now so that next module, you type it with confidence. And to prove the pattern works, you'll immediately run the same command against a group that does exist, and watch it succeed quietly.

You'll also meet new-grp — spelled N E W G R P — which refreshes your group membership in your current shell so you don't have to log out and back in. File that away. You'll want it right after the real docker group add next module.

You're done when you can list your groups and explain why the failure was expected. For the lab, submit one screenshot in D2L showing three things: your I D output with soo-doo in the groups, the user-mod command with its group does not exist error — yes, submit the error, it's the proof — and the grep for docker in the group file coming back empty. Open the lesson, and I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 10 — User and Group Setup"; big caption: "One command WILL fail today. On purpose." |
| 2 | Terminal: `id`, `groups`, `grep $USER /etc/passwd`, `cat /etc/group \| grep sudo` |
| 3 | Terminal: `sudo usermod -aG docker $USER` → zoom on `usermod: group 'docker' does not exist`; then `sudo usermod -aG adm $USER` succeeding silently |
| 4 | Terminal: `newgrp adm`, `id -gn` → `adm`, then `newgrp $USER` back |
| 5 | Terminal: `id`, the failed usermod with its error, `grep docker /etc/group` returning nothing; cursor circles all three (the screenshot to submit) |
