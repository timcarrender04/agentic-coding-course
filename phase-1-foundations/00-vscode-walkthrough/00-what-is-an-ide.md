# Lesson 00: What is an IDE?

**Time:** ~15 min

```instructor
Say: "Before we touch any code, three words: editor, terminal, IDE. By the end of this lesson Cursor is installed and open on your laptop."
Mention: "Cursor will ask you to sign in. Skip it — for the whole course. We're using local AI in Module 05, not Cursor's paid backend."
Pause: After the download starts (it's ~200 MB) — talk through editor vs terminal vs IDE while it downloads.
Show: Your own Cursor window already open, so they know what success looks like before they install.
Say: "You're done when Cursor is open and you did NOT sign in. Hand up if it won't install — don't move on without it."
```

## Concepts

Before we install anything, three words you'll hear all day:

- **Editor** — a program that lets you type and save text into a file. Notepad on Windows, TextEdit on Mac. That's it. No magic.
- **Terminal** — a program where you type commands as text and the computer runs them. No buttons, no menus. Just text in, text out. The Windows "Command Prompt" and the Mac "Terminal app" are both terminals.
- **IDE** — short for **Integrated Development Environment**. It is an editor and a terminal and a bunch of other tools, all bolted together in one window. The whole point of an IDE is that you don't have to alt-tab between five different programs to write, run, and debug code.

**Cursor is an IDE.** Specifically, Cursor is a fork of another IDE called **VS Code** (Visual Studio Code, made by Microsoft) with AI assistance built in. If you ever google something like "how do I do X in VS Code" the answer almost always works in Cursor too — they look 95% identical.

> **One caveat for this course:** Cursor's built-in AI (Tab, Chat, Composer) requires signing in to Cursor's paid service. **Skip the sign-in.** In Module 05 we'll install **Continue.dev** — a free extension that gives you the same agentic-coding features powered by a local LLM on a GPU. Today we just want the IDE itself.

## Demo (instructor at the front)

The instructor will show:

1. Notepad (or TextEdit) — just an editor.
2. Command Prompt (or Terminal app) — just a terminal.
3. Cursor — both, plus more, in one window.

You will see how the same task ("write a file, then run it") looks in all three.

## Hands-on: install Cursor

1. Open your normal web browser.
2. Go to **cursor.com**.
3. Click **Download** for your operating system (Windows / Mac / Linux).
4. Run the installer. Accept the defaults.
5. Launch Cursor.

When Cursor first opens it may ask you to:

- **Sign in.** **Skip this for the whole course.** Click "Continue" without signing in, or close the prompt. We're using local AI via Continue.dev (Module 05), not Cursor's paid backend.
- **Choose a theme.** Pick whichever you like. Light or dark — your eyes, your call.
- **Import settings from VS Code.** If you don't have VS Code, this will be empty. Click skip.
- **Choose keybindings.** Pick "VS Code" (the default). The shortcuts in the rest of this module assume VS Code keybindings.

## Checkpoint

You're done with this lesson when:

- [ ] Cursor is installed on your laptop.
- [ ] You have Cursor open and you see a welcome screen (or an empty window with a sidebar on the left).
- [ ] You did **not** sign in to Cursor's paid service.
- [ ] You can explain in one sentence what an IDE is. Try it on the person next to you.

If Cursor won't install or won't open, raise your hand. **Don't move on until your laptop is at the checkpoint above.** Every later lesson assumes you're sitting in front of a working Cursor window.
