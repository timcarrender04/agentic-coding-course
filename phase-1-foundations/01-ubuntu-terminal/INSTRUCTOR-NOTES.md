# Instructor Notes — Module 01: Ubuntu Terminal Foundations

## General Tips
- Students TYPE every command. No copy-paste. Enforce this early.
- Walk around (or screen-share check) during checkpoints to catch students who fell behind.
- If a student's checkpoint fails, have them restart from the beginning of that file — not the beginning of the module.
- Keep your terminal font size large. Students will be glancing at your screen while typing.

## Where Students Get Stuck

### Lesson 00: Setup Check
- WSL users sometimes fail the ping test due to DNS config. Fix: `sudo nano /etc/resolv.conf` → add `nameserver 8.8.8.8`. Mention this only if it comes up.
- Some cloud VMs don't have `lsb_release` installed. Fix: `sudo apt install -y lsb-release`.

### Lesson 01: Where Am I?
- `cd -` confuses students. Slow down here. Show it 3 times.
- Students forget that `cd` with no arguments goes to home. Drill this.

### Lesson 02: Making Things
- `rm -r` is the first destructive command. Pause and explain. Show what happens if you accidentally `rm -r` the wrong directory (use a throwaway example).
- `mkdir -p` — emphasize the difference from plain `mkdir`. Students will hit "directory already exists" errors later if they don't learn `-p` now.

### Lesson 03: Looking Inside Files
- `less` — students will get stuck in the pager. Loudly announce: "Press q to quit" BEFORE they run it.
- `tail -f` — students will think it's frozen. Explain it's waiting for new data. Have them open a second terminal to `echo` into the file.
- `nano` — some students will try to use arrow keys or mouse. Remind them: Ctrl+O to save, Ctrl+X to exit. Write these on the board.

### Lesson 04: Sudo and System Updates
- `sudo apt upgrade -y` can take a while. This is a good time for a 5-minute break or Q&A.
- If a student gets a dpkg lock error, another apt process is running. Wait or `sudo kill` it.

### Lesson 05: Installing Software
- This is a natural break point (~45 min in). Take a 5-10 minute break here.
- If `ca-certificates` or `gnupg` are already installed, that's fine — apt will say so. Students should still type the command.

### Lesson 06: Permissions Drills
- Permissions are hard. Go slow.
- Draw the rwxrwxrwx grid on a whiteboard if available.
- `chmod 777` — warn them LOUDLY. Never on a real server.
- `chown` requires sudo. Students will forget.

### Lesson 07: Networking Drills
- `dig` may not be installed. It comes with `dnsutils`: `sudo apt install -y dnsutils`.
- `curl ifconfig.me` — if students are behind a corporate proxy, this may return a proxy IP. That's fine.
- `ss -tuln` — output is dense. Walk through one line together.

### Lesson 08: Processes and Services
- `top` — announce "press q to quit" BEFORE they run it, just like `less`.
- `systemctl status ssh` — if SSH isn't running, use `cron` instead.
- `journalctl` output can be overwhelming. Focus them on the last 10 lines only.

### Lesson 09: Pipes and Grep
- Pipes are a paradigm shift. Slow down.
- Start with a simple example before the drills: `echo "hello world" | grep hello`.
- `/var/log/syslog` may require sudo to read. If so, use `sudo cat /var/log/syslog | grep ...` or switch to `/etc/passwd` which is world-readable.

### Lesson 10: User and Group Setup
- The `docker` group doesn't exist yet (Docker isn't installed until Module 02). The `usermod` command will fail. That's intentional — tell students we're previewing the command and they'll run it for real in Module 02.
- `newgrp` is confusing. Explain it as "refresh your group membership without logging out."

### Lesson 11: Final Checkpoint
- This should be done with NO help. If a student can't complete it, they need to redo the specific lesson they're stuck on.
- Consider making this a timed exercise (~15 min) to build confidence.

## Suggested Schedule (2.5-hour session)
| Block | Lessons | Duration |
|-------|---------|----------|
| 1 | 00–03 | 50 min |
| Break | — | 10 min |
| 2 | 04–06 | 35 min |
| Break | — | 10 min |
| 3 | 07–09 | 40 min |
| 4 | 10–11 | 30 min |

## Q&A Pause Points
- After Lesson 03 (before sudo/admin work)
- After Lesson 06 (permissions are confusing — let them ask)
- After Lesson 09 (pipes are a new concept)
- After Lesson 11 (wrap-up, preview Module 02)
