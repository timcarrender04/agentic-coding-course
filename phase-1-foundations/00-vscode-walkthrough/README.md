# Module 00: Cursor Walkthrough

This is the first module of the agentic-coding-course. See [`../COURSE-SCHEDULE.md`](../COURSE-SCHEDULE.md) for the full 8-week, 16-session calendar. This module is taught across **sessions 1 and 2**.

It is **instructor-led** and assumes you have never used an IDE before. By the end of this module, you will have Cursor installed, you will know where every part of its UI is, and you will be connected to either a WSL environment (Windows) or a remote machine over SSH — ready to start Module 01.

> **A note on Cursor's AI features.** Cursor ships with built-in AI (Tab, Chat, Composer) backed by a paid cloud service. **This course does not use the paid Cursor service.** In Module 05 we'll install the **Continue.dev** extension and point it at a local LLM running on a GPU — same agentic-coding experience, free and self-hosted. Cursor as an IDE is great; we just won't sign in to its paid backend.

## What you'll be able to do after this module

- Explain what an IDE is, and how Cursor relates to VS Code
- Tour the Cursor UI: activity bar, file explorer, editor tabs, command palette, settings
- Open the integrated terminal and tell it apart from the editor
- Open the extensions marketplace, install, disable, and uninstall an extension
- Install the Docker extension and recognize what its sidebar will show once Docker is running
- (Windows) Connect Cursor to WSL and open a Linux folder
- Connect Cursor to a remote machine over SSH and open a folder on it

## Prerequisites

- A laptop running Windows 10/11, macOS, or Linux
- Admin/install rights on that laptop
- An internet connection
- For SSH lesson: an instructor-provided host (the instructor will share `user@host` and a key/password before lesson 06)

## Lessons

| # | File | Title | Est. Time |
|---|------|-------|-----------|
| 00 | [00-what-is-an-ide.md](00-what-is-an-ide.md) | What is an IDE? | ~15 min |
| 01 | [01-cursor-tour.md](01-cursor-tour.md) | Cursor UI Tour | ~15 min |
| 02 | [02-integrated-terminal.md](02-integrated-terminal.md) | The Integrated Terminal | ~10 min |
| 03 | [03-extensions-overview.md](03-extensions-overview.md) | Extensions Overview | ~15 min |
| 04 | [04-docker-extension.md](04-docker-extension.md) | The Docker Extension | ~10 min |
| 05 | [05-wsl-connection.md](05-wsl-connection.md) | Connecting to WSL | ~20 min |
| 06 | [06-ssh-remote.md](06-ssh-remote.md) | Connecting over SSH | ~20 min |
| 07 | [07-final-checkpoint.md](07-final-checkpoint.md) | Final Checkpoint | ~15 min |

**Total estimated time: ~2 hours**

## What's next

Module 01 (`../01-ubuntu-terminal/`) is 2.5 hours of terminal typing drills. It assumes you have a working terminal in front of you — that's what this module sets up. Don't skip ahead: if you can't open a terminal in Cursor and run a command, you won't make it through Module 01.
