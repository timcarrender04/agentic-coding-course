# Lesson 01: Cursor UI Tour

**Time:** ~15 min

> Mac users: every `Ctrl+...` shortcut in this module is `Cmd+...` on your machine. The lesson uses `Ctrl` everywhere — translate as you go.

## What you'll learn

The names of every part of the Cursor window. Once you know the names, you can google your way out of any problem.

## The parts of the window

```
+----------------------------------------------------------+
| Title bar                                                |
+--+----------------+--------------------------------------+
|A |                |                                      |
|c |  Side bar      |       Editor                         |
|t |  (file tree,   |   (where files open as tabs)         |
|i |   search,      |                                      |
|v |   extensions…) |                                      |
|i |                |                                      |
|t |                +--------------------------------------+
|y |                |   Panel  (terminal lives here)       |
|  |                |                                      |
|B |                |                                      |
|a |                |                                      |
|r |                |                                      |
+--+----------------+--------------------------------------+
| Status bar  (the green << thing in the bottom-left)      |
+----------------------------------------------------------+
```

- **Activity bar** — the thin strip of icons on the very left edge of the window.
- **Side bar** — the wider panel that opens when you click an activity-bar icon.
- **Editor** — the big middle area where files open. Each open file is a **tab** at the top.
- **Panel** — a horizontal area at the bottom of the editor. The integrated terminal lives here. Hidden by default.
- **Status bar** — the colored strip at the very bottom. The bottom-left section is important — it tells you where Cursor is "connected to" (we'll see this in lessons 05 and 06).

## Demo: the activity bar, top to bottom

1. **Files** (📄 stacked icon) — your folder's file tree. The default view.
2. **Search** (magnifying glass) — search across every file in the folder at once.
3. **Source Control** (a Y-shape) — git stuff. We'll come back to this in a later module.
4. **Run and Debug** (a play button with a bug) — run code with breakpoints. Later module.
5. **Extensions** (four squares with one floating) — the marketplace. Lesson 03.
6. **AI / Chat** (varies by Cursor version) — Cursor's AI features. Different module.

There may be more icons depending on your Cursor version. That's fine.

## Demo: open a folder

1. **File → Open Folder…** (or `Ctrl+K Ctrl+O`).
2. Pick any folder on your computer — your Desktop, your Documents, anything.
3. Cursor's first time opening that folder asks "Do you trust the authors of the files in this folder?" Click **Yes**.
4. Look at the file explorer in the side bar. You should see your folder's contents.

Click any file. It opens in the editor as a new tab. You can have many tabs open at once. Click the **×** on a tab to close it.

## Demo: the command palette

This is the most important shortcut in the entire IDE.

1. Press **Ctrl+Shift+P** (Mac: Cmd+Shift+P).
2. A search box appears at the top of the window. This is the **command palette**.
3. Type "toggle terminal" — you'll see a match. Press Enter.
4. The integrated terminal opens at the bottom of the editor. (We'll use this in the next lesson.)
5. Press **Ctrl+Shift+P** again, type "toggle terminal" again, Enter — terminal closes.

Anything you can do in Cursor is also available through the command palette by name. If you forget a shortcut, this is how you find it.

## Demo: settings

1. Press **Ctrl+,** (comma) — the settings page opens.
2. There's a search box at the top. Type "font size."
3. The first result is "Editor: Font Size." Change it from 14 to **16**. The change is instant — look at any open file, the text is bigger.

Settings save automatically. Close the settings tab when you're done.

## Try it yourself

1. Close any folder you have open (`File → Close Folder`).
2. Open a folder of your choosing.
3. Open any file.
4. Use the command palette to toggle the terminal. Then toggle it again to close it.
5. Open settings and change "Editor: Font Size" to **16**.

## Checkpoint

You're done when:

- [ ] You can name (out loud) the activity bar, side bar, editor, panel, and status bar.
- [ ] You opened a folder and a file.
- [ ] You opened the command palette with `Ctrl+Shift+P` and ran "Toggle Terminal."
- [ ] Your editor font size is 16.

If you didn't get there, ask a neighbor before raising your hand.
