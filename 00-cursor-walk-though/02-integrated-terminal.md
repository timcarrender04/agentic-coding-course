# Lesson 02: The Integrated Terminal

**Time:** ~10 min

```instructor
Say: "Today is just 'where is the terminal and what does it look like.' We are not learning shell commands yet — that's all of Module 01."
Mention: "If `Ctrl+\`` does nothing, the backtick is missing or moved on their keyboard. Tell them to use View → Terminal instead — don't burn time hunting the key."
Pause: After they open the terminal — physically point at the terminal pane vs the editor pane. Some will type the command into the editor.
Say: "You're done when `echo hello` prints `hello` back at you in the terminal panel — not in a file."
```

## What is a terminal, again?

A **terminal** is a program where you type a command, press Enter, and the computer runs that command and prints text back at you. That is the entire interface — text in, text out.

You already have a terminal on your computer:

- **Windows:** "Command Prompt" or "PowerShell" or "Windows Terminal."
- **Mac:** "Terminal" (in Applications → Utilities).
- **Linux:** "Terminal" or "Console" (varies by distro).

Cursor has a terminal **built into** its window. That's the **integrated terminal**. It's the same kind of program as the ones above — same commands, same output — just embedded inside the IDE so you don't have to alt-tab to a separate window.

## Why this matters

Almost every later module of this course assumes you have a terminal open. **Module 01 is 2.5 hours of typing commands into this terminal.** Today, all you need to know is how to open it and how to type into it.

> We are deliberately **not** teaching you commands like `ls`, `cd`, `pwd`, etc. in this lesson. That's all of Module 01. Today is just "where is the terminal and what does it look like."

## Demo: open the integrated terminal

Three ways to open it. Pick whichever you remember:

1. Keyboard shortcut: **`` Ctrl+` ``** — that's Ctrl + backtick. The backtick is usually on the same key as the tilde (`~`), top-left of the keyboard, just under Esc.
2. Menu: **View → Terminal**.
3. Command palette: `Ctrl+Shift+P` → type "Toggle Terminal" → Enter.

The terminal opens in a panel at the bottom of the editor. You'll see a **prompt** — something that looks like `user@host:~$` on Linux/Mac or `PS C:\Users\You>` on Windows. The prompt is the terminal saying "I'm ready, type a command."

## Editor vs terminal: don't mix them up

This is the single most common beginner mistake.

- The **editor** is the big area in the middle. When you type there, you're typing **into a file**. Nothing runs.
- The **terminal** is the panel at the bottom. When you type there and press Enter, the computer **runs your command**.

If you type a command into the editor, the editor will just store the text in a file and nothing will happen. If you type a sentence into the terminal, the terminal will try to run it as a command and complain that it doesn't exist.

**Always look at where your blinking cursor is before typing.**

## Try it yourself

1. Open the integrated terminal (any of the three ways above).
2. Click inside the terminal panel — you should see the cursor blinking next to the prompt.
3. Type exactly this and press Enter:

   ```
   echo hello
   ```

   You should see `hello` printed on the next line, then a fresh prompt.

4. Now type your own name:

   ```
   echo your-name-here
   ```

   (Replace `your-name-here` with your actual name. No quotes needed.)

5. Close the terminal with `` Ctrl+` `` and reopen it. The terminal pane comes back — the previous output is still there.

## Checkpoint

You're done when:

- [ ] You opened the integrated terminal at least once.
- [ ] You ran `echo hello` and saw `hello` printed back.
- [ ] You ran `echo` with your own name and it worked.
- [ ] You can explain the difference between typing into the editor and typing into the terminal.

You don't need to memorize any commands today. That's tomorrow's problem (Module 01).
