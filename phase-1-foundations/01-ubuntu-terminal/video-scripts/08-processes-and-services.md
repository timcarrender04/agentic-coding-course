# Video: Processes and Services

**Lesson:** [08-processes-and-services.md](../08-processes-and-services.md) · **Target:** ~2.5 min · **Words:** 363

## Narration

Your computer is running dozens of programs right now that you never started and can't see. Today you learn to see them — and in two weeks, these exact tools are how you'll debug Docker containers that won't behave.

Two concepts. A process is any running program — your shell, your browser, everything. P S space A U X lists them all, and top and H top show them live, updating in real time. Quick survival note: top has the same trap as less. Press the letter Q to quit, or you'll think your terminal froze. A service is a special kind of process — one the system starts for you at boot and keeps running in the background. Things like cron, the task scheduler, or S S H, the remote login server. System C T L is how you talk to services. Ask system C T L is dash active cron, and it answers with one word: active.

The drill has you list processes, filter them with grep, watch them live in top and H top, check the S S H and cron services, and read system logs with journal C T L. You'll finish with three quick health checks: uptime, memory with free space dash H, and disk space with D F space dash H. That last one matters — Docker images are big, and you want at least ten gigabytes free.

One branch to know about. On W S L and some virtual machines, the S S H service simply isn't installed — and that's fine. The instructor notes bless cron as the substitute. If S S H comes back inactive or not found, run the same checks against cron and keep moving. Don't burn class time installing S S H.

You're done when the checkpoint answers cleanly. For the lab, run system C T L is dash active for S S H and for cron — either one saying active is a pass — plus free dash H and D F dash H on the root filesystem. Submit one screenshot of those commands and their output in D2L. Open the lesson, and I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 08 — Processes and Services"; `ps aux` output scrolling past |
| 2 | Terminal: `ps aux`, then `top` live (press q on camera), then `systemctl is-active cron` → `active` |
| 3 | Terminal montage: `ps aux \| grep [s]shd`, `htop`, `systemctl status ssh`, `journalctl -u cron \| tail`, `uptime`, `free -h`, `df -h` |
| 4 | Terminal on WSL: `systemctl is-active ssh` failing, then `systemctl is-active cron` → `active`; caption "either one passes" |
| 5 | Terminal: both `is-active` calls plus `free -h` and `df -h /`; cursor circles the outputs (the screenshot to submit) |
