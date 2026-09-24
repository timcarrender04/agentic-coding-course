# Lesson 07: Final Checkpoint

**Time:** ~15 min — **no instructor help**.

This is a self-test. Do every step in order, on your own. If you get stuck, **re-read the relevant lesson** — don't ask the instructor or your neighbor. The point is to prove to yourself that you can drive Cursor without a guide.

## The test

1. **Command palette + terminal.** Open the command palette with the keyboard shortcut. Use it to toggle the integrated terminal (no clicking the menu, no Ctrl+backtick — only the command palette).
2. **Install an extension.** From the extensions side bar, install **"Markdown All in One"** by **Yu Zhang**. Verify it appears under the **INSTALLED** section.
3. **Connect to a remote environment.** Either:
   - Connect to **WSL** (Windows students), **or**
   - Connect to **SSH** using the instructor-provided host (any student).
   Confirm the bottom-left of your Cursor window shows **"WSL: ..."** or **"SSH: ..."** on green.
4. **Open a remote folder.** With the connection active, open any folder on the remote/WSL side. Your file explorer should show its contents.
5. **Run two commands in the remote terminal.** Open the integrated terminal — it should be a remote terminal (its prompt is the remote/WSL hostname). Run:
   ```
   whoami
   pwd
   ```
   Both should print results from the remote, not your laptop.

## What to submit

Take **one screenshot** of your Cursor window that shows, at the same time:

- The bottom-left status bar with **"WSL: ..."** or **"SSH: ..."** on green.
- The integrated terminal with the output of `whoami` and `pwd` visible.

Send it to the instructor however they've asked (Slack, email, LMS upload — instructor will say).

## Self-grade

You pass this module if your screenshot clearly shows both:

- [ ] The green WSL or SSH indicator in the bottom-left.
- [ ] The output of both `whoami` and `pwd` in the terminal.

If yours is missing one of these, fix it before submitting. If you really can't get there in 15 minutes, raise your hand at the end of the time block — we'll regroup.

## What's next

Module 01 (`../01-ubuntu-terminal/`) starts with you sitting in front of a working terminal — exactly where this checkpoint leaves you. Two and a half hours of typing drills are about to make all those terminal commands second nature. Get a glass of water and stretch your fingers.
