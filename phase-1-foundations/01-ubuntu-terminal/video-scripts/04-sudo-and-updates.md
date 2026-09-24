# Video: Sudo and System Updates

**Lesson:** [04-sudo-and-updates.md](../04-sudo-and-updates.md) · **Target:** ~2 min · **Words:** 324

## Narration

Today you do the thing Windows does to you automatically — a full system update — except this time you're the one driving. It's also your first real workout with soo-doo, so let's talk about what that word actually means.

Soo-doo runs a single command as the root user — the account that can touch anything on the system. That power is why the lesson opens with a warning: a typo in a soo-doo command can do real damage, so read the line before you press enter. You'll also type your password and see nothing appear on screen. That's normal. It's listening — it just doesn't echo.

The update itself is two moves, and people mix them up constantly. Soo-doo apt update doesn't install anything — it downloads the latest list of what's available, like refreshing a store catalog. Soo-doo apt upgrade dash Y is what actually installs the newer versions. Catalog first, then shopping. You'll finish with apt autoremove, which sweeps up packages nothing needs anymore.

One heads-up before you start: your output will not match mine, and it won't match your neighbor's. Maybe you have forty packages to upgrade, maybe two, maybe none. All of those are fine. What matters isn't the numbers — it's the final state. When you run soo-doo apt update again at the end, it should tell you all packages are up to date. The upgrade may take a few minutes to chew through downloads. Let it run.

You're done when the system reports nothing left to upgrade. For the lab, run the checkpoint: soo-doo apt update one more time, plus soo-doo who am I. Submit one screenshot in D2L showing the end of that update output — the all packages are up to date line — and the word root. Don't worry about matching anyone else's package counts; the finish line is the same for everybody. Open the lesson, and I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 04 — Sudo and System Updates"; Windows Update spinner cut against a terminal prompt |
| 2 | Terminal: `sudo whoami` → password prompt with nothing echoing → `root` |
| 3 | Terminal: `sudo apt update` scrolling; then `sudo apt upgrade -y` running; then `sudo apt autoremove -y` |
| 4 | Two terminals side by side: different "X packages can be upgraded" counts, both ending at the same final state |
| 5 | Terminal: final `sudo apt update` ending "All packages are up to date." plus `sudo whoami`; cursor circles both (the screenshot to submit) |
