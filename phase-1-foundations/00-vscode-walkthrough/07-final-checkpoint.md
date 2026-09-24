# Lesson 07: Final Checkpoint

**Time:** ~15 min — **no instructor help**.

This is a self-test. Do every step in order, on your own. If you get stuck, **re-read the relevant lesson** — don't ask the instructor or your neighbor. The point is to prove to yourself that you can drive VS Code without a guide.

## The test

1. **Command palette + terminal.** Open the command palette with the keyboard shortcut. Use it to toggle the integrated terminal (no clicking the menu, no Ctrl+backtick — only the command palette).
2. **Install an extension.** From the extensions side bar, install **"Markdown All in One"** by **Yu Zhang**. Verify it appears under the **INSTALLED** section.
3. **Connect to a remote environment.** Either:
   - Connect to **WSL** (Windows students), **or**
   - Connect to **SSH** using the instructor-provided host (any student).
   Confirm the bottom-left of your VS Code window shows **"WSL: ..."** or **"SSH: ..."** on green.
4. **Open a remote folder.** With the connection active, open any folder on the remote/WSL side. Your file explorer should show its contents.
5. **Run two commands in the remote terminal.** Open the integrated terminal — it should be a remote terminal (its prompt is the remote/WSL hostname). Run:
   ```
   whoami
   pwd
   ```
   Both should print results from the remote, not your laptop.

## Lab

**This is the Module 00 phase-gate lab.**

**Objective:** Prove you can drive VS Code — command palette, extensions, remote connection, remote terminal — without a guide.

**Task:** Complete all five steps of the test above on your own: toggle the terminal from the command palette, install "Markdown All in One" by Yu Zhang, connect to **WSL** (Windows students) **or** **SSH** using the instructor-provided host (any student), open a remote folder, and run `whoami` and `pwd` in the remote terminal.

**Submit:** **One screenshot** of your VS Code window that shows, at the same time: the bottom-left status bar with **"WSL: ..."** or **"SSH: ..."** on green, and the integrated terminal with the output of `whoami` and `pwd` visible. Submit it in D2L.

**Pass criteria:**

- [ ] The green WSL or SSH indicator is visible in the bottom-left.
- [ ] The output of both `whoami` and `pwd` is visible in the terminal.
- [ ] Everything is in a single screenshot.

If yours is missing one of these, fix it before submitting. If you really can't get there in 15 minutes, raise your hand at the end of the time block — we'll regroup.

**Unlocks:** Module 01 — Ubuntu Terminal Foundations (phase gate)

## What's next

Module 01 (`../01-ubuntu-terminal/`) starts with you sitting in front of a working terminal — exactly where this checkpoint leaves you. Two and a half hours of typing drills are about to make all those terminal commands second nature. Get a glass of water and stretch your fingers.
