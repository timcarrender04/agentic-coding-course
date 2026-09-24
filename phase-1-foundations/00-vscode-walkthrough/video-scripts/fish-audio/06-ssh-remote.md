# Video: Connecting over SSH

**Lesson:** [06-ssh-remote.md](../06-ssh-remote.md) · **Target:** ~2.5 min · **Words:** 365

**Fish Audio:** S2-Pro `[bracket]` tags — paste only the `## Narration` block.

## Narration

[enthusiastic] Here's where the IDE gets superpowers. So far, everything VS Code has touched lived on your laptop. Today you'll connect it to a computer somewhere else entirely, and work on that machine as if it were sitting right in front of you. [break]

[calm] The technology is S S H — secure shell. It's the standard way to log into and control a remote computer over the network. You run one command, you authenticate, and you've got a terminal on the remote machine. The VS Code Remote S S H extension takes it a step further: not just a remote terminal, but the whole editor working on remote files. You edit a file, it lives on the remote. You run a command, it runs on the remote. Your laptop becomes a thin client — a screen and a keyboard for a computer that could be anywhere. [break]

[calm] Today's remote is the college's shared server. I'll give you the host name and your username in class — write them down before you start, because the lesson can't guess them for you. And one trap to know about: the first time you connect, S S H asks, are you sure you want to continue connecting. You have to [emphasis] type the word yes — the whole word. Pressing Enter alone does nothing, because the question has no default. And if you're using a password, it won't show on screen as you type. [emphasis] That's normal. [break]

[confident] Here's your lab. Install the Remote S S H extension, publisher Microsoft. Click the green button in the bottom-left corner, add the host I give you, and connect. When the bottom-left reads S S H and the hostname on green, open a folder on the remote, open the terminal, and run two commands: hostname, and who am I — that's one word, W H O A M I. Both should print the remote's answers, not your laptop's. [long-break]

[encouraging] You're done when that green S S H indicator is showing and both commands print the remote's values. Take one screenshot with the indicator and both outputs visible, and submit it in D2L. Then open the lesson and follow it step by step. I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 06 — Connecting over SSH"; simple map graphic, laptop → network → server |
| 2 | Plain terminal SSH login; then VS Code editing a remote file with a remote terminal below it |
| 3 | Slide: Host / User as `<INSTRUCTOR-PROVIDED>`; the "continue connecting (yes/no/[fingerprint])?" prompt; typing `yes` |
| 4 | Install Remote - SSH; bottom-left `><` button → "Add New SSH Host…" → connect → green "SSH: <hostname>"; run `hostname`, then `whoami` |
| 5 | Full window: green SSH indicator + both command outputs; cursor circles the frame (the screenshot to take) |
