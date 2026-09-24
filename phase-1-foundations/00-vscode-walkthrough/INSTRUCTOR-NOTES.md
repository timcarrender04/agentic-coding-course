# Instructor Notes — Module 00: Cursor Walkthrough

## TODO before class

- [ ] Decide whether students install WSL during class (requires reboot, ~10 min) or as a pre-class assignment. If pre-class, send the install command (`wsl --install`) the day before.
- [ ] Provision the SSH host(s) for lesson 06. Have the exact connection string ready: `ssh user@host`, plus the SSH key or password. Replace the `<INSTRUCTOR-PROVIDED>` placeholder in `06-ssh-remote.md` if you want a permanent record.
- [ ] (Optional) Take a screenshot of your own machine's populated Docker sidebar (containers + images) to show in lesson 04, since students' Docker isn't installed yet.
- [ ] Verify your Cursor is on the latest version. UI labels move occasionally between versions.
- [ ] Have a "what does it look like when it's working" reference open: a Cursor window already connected to WSL **and** a Cursor window connected to SSH.

## General Tips

- Total beginners. Define every acronym the first time. "IDE", "WSL", "SSH" all need a one-sentence definition before you use them.
- Demo on a projected screen. Students will copy your mouse path more than your words.
- Mac and Linux students sit out lesson 05 (WSL). Pair them with a Windows student to help, or let them get ahead on lesson 06.
- If a student's Cursor looks different from yours (panels missing, theme different), do **not** spend class time fixing it. Note it for after class.
- Cursor is built on VS Code. If a student googles "how to do X in VS Code," the answer almost always works in Cursor too. Tell them this — it removes a lot of anxiety.

## Where Students Get Stuck

### Lesson 00: What is an IDE?
- Some students have only ever used Google Docs. The "files on disk" concept is genuinely new. Spend a minute on it.
- The Cursor download is large (~200 MB). If the room's wifi is slow, start the download at the very beginning of the lesson and talk through concepts while it downloads.
- Sign-in is optional for the walkthrough. Skip it unless you've prepared accounts — it's a time sink.

### Lesson 01: Cursor UI Tour
- Students confuse the **activity bar** (left edge, icons) with the **side bar** (the panel that opens when you click an icon). Use the names consistently.
- Command palette (Ctrl+Shift+P / Cmd+Shift+P on Mac) is the single most important shortcut in the IDE. Drill it. If they only remember one keystroke from this module, this is it.
- On Mac, replace every `Ctrl` in the lesson with `Cmd`. Say this out loud — Mac students often miss it.

### Lesson 02: The Integrated Terminal
- The backtick key (`` ` ``) is hard to find on some international keyboards. If a student can't open the terminal with `` Ctrl+` ``, have them use `View → Terminal` from the menu instead.
- Some students will type into the editor when you say "type a command." Pause and physically point at the terminal pane vs the editor pane.
- Resist the urge to teach `cd`, `ls`, etc. here. That's Module 01. Stay at the "what is this thing" level.

### Lesson 03: Extensions Overview
- The marketplace listings can be overwhelming. Tell students: "Only install what I tell you to install today. We'll revisit extensions later."
- Some students will install 10 extensions out of excitement and break their setup. Watch for this.
- If a student's institution blocks the extension marketplace (corporate firewall), have them install extensions via VSIX file. Have one or two VSIX files on a USB stick as a backup.

### Lesson 04: The Docker Extension
- The Docker sidebar will say "Failed to connect to Docker" or be empty. **This is correct.** Repeat it loudly. Multiple students will think they did something wrong.
- Show your own machine's populated sidebar (or the screenshot from the TODO list) so they know what it will look like after Module 02.

### Lesson 05: Connecting to WSL
- `wsl --status` may say "WSL is not installed." If so, `wsl --install` requires a reboot. Plan around this.
- The first launch of a fresh WSL Ubuntu asks the student to create a Linux username and password. The password isn't shown as they type — students will think the keyboard is broken. Warn them.
- The bottom-left green indicator is the single most reliable way to confirm "I am in WSL." Make students point at it before moving on.
- If a student's Cursor opens the Windows file path (e.g. `C:\Users\...`) instead of the WSL path (`/home/...`), they're not actually connected to WSL — only opened a folder that happens to be on the Windows side. Have them reconnect.

### Lesson 06: Connecting over SSH
- SSH key permissions on Windows are a common failure (`UNPROTECTED PRIVATE KEY FILE`). Fix: right-click the key → Properties → Security → remove inherited permissions, leave only the current user with read access. Or store the key inside WSL.
- Students will paste the host string with smart quotes (curly `"`) if they copy from a Word doc or Slack. Make sure they paste from a plain-text source.
- The first connection asks "Are you sure you want to continue connecting (yes/no/[fingerprint])?" Students will press Enter expecting it to default. They have to type `yes`.
- Once connected, **every** terminal they open is on the remote. This trips students up later — they'll wonder why their local files aren't showing up.

### Lesson 07: Final Checkpoint
- No instructor help. If a student is stuck, point at the lesson, not the answer.
- Allow 15 minutes. If a student finishes in 5, ask them to help a neighbor.

## Suggested Schedule (~2-hour session)

| Block | Lessons | Duration |
|-------|---------|----------|
| 1 | 00–01 | 30 min |
| Break | — | 5 min |
| 2 | 02–04 | 35 min |
| Break | — | 5 min |
| 3 | 05–06 | 40 min |
| 4 | 07 | 15 min |

If WSL install + reboot happens in class, add 15 min to block 3.

## Q&A Pause Points

- After Lesson 01 (orient students before adding more concepts)
- After Lesson 04 (Docker confusion is real — let them ask)
- After Lesson 06 (SSH is the hardest topic in this module)
- After Lesson 07 (wrap-up; preview Module 01)
