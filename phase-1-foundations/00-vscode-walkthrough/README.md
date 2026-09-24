# Module 00: VS Code Walkthrough

This is the first module of the agentic-coding-course. See [`../COURSE-SCHEDULE.md`](../../docs/COURSE-SCHEDULE.md) for the full 8-week, 16-session calendar. This module is taught across **sessions 1 and 2**.

It is **instructor-led** and assumes you have never used an IDE before. By the end of this module, you will have VS Code installed, you will know where every part of its UI is, and you will be connected to either a WSL environment (Windows) or a remote machine over SSH — ready to start Module 01.

> **A note on AI features.** Out of the box, VS Code is just the editor — no AI assistant. In Module 05 we'll install the **Continue.dev** extension and point it at the college's shared LLM server — a free, self-hosted, agentic-coding experience. There's no paid service and nothing to sign in to; VS Code + Continue.dev is simply the free stack we use.

## What you'll be able to do after this module

- Explain what an IDE is, and what VS Code is
- Tour the VS Code UI: activity bar, file explorer, editor tabs, command palette, settings
- Open the integrated terminal and tell it apart from the editor
- Open the extensions marketplace, install, disable, and uninstall an extension
- Install the Docker extension and recognize what its sidebar will show once Docker is running
- (Windows) Connect VS Code to WSL and open a Linux folder
- Connect VS Code to a remote machine over SSH and open a folder on it

## Prerequisites

- **A laptop running Windows 10/11 with WSL2 (Ubuntu), or macOS** (a native Linux laptop also works). Chromebooks and tablets are not supported. Windows students set up WSL in lesson 05; Mac students use the built-in terminal.
- Admin/install rights on that laptop
- An internet connection
- For SSH lesson: an instructor-provided host (the instructor will share `user@host` and a key/password before lesson 06)

## Lessons

| # | File | Title | Est. Time |
|---|------|-------|-----------|
| 00 | [00-what-is-an-ide.md](00-what-is-an-ide.md) | What is an IDE? | ~15 min |
| 01 | [01-vscode-tour.md](01-vscode-tour.md) | VS Code UI Tour | ~15 min |
| 02 | [02-integrated-terminal.md](02-integrated-terminal.md) | The Integrated Terminal | ~10 min |
| 03 | [03-extensions-overview.md](03-extensions-overview.md) | Extensions Overview | ~15 min |
| 04 | [04-docker-extension.md](04-docker-extension.md) | The Docker Extension | ~10 min |
| 05 | [05-wsl-connection.md](05-wsl-connection.md) | Connecting to WSL | ~20 min |
| 06 | [06-ssh-remote.md](06-ssh-remote.md) | Connecting over SSH | ~20 min |
| 07 | [07-final-checkpoint.md](07-final-checkpoint.md) | Final Checkpoint | ~15 min |

**Total estimated time: ~2 hours**

## What's next

Module 01 (`../01-ubuntu-terminal/`) is 2.5 hours of terminal typing drills. It assumes you have a working terminal in front of you — that's what this module sets up. Don't skip ahead: if you can't open a terminal in VS Code and run a command, you won't make it through Module 01.
