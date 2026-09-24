# Video: Looking Inside Files

**Lesson:** [03-looking-inside-files.md](../03-looking-inside-files.md) · **Target:** ~2 min · **Words:** 326

**Fish Audio:** S2-Pro `[bracket]` tags — paste only the `## Narration` block.

## Narration

[warm and friendly] So far you can make files, but they're all empty. Today you put text into files, read it back, and edit it — all without leaving the terminal. No graphical editor, no mouse. [break]

[calm] A few concepts to keep straight. Echo with a single greater-than sign writes text into a file — and this matters — a single greater-than OVERWRITES whatever was there. Two greater-than signs append to the end instead. Mixing those up has destroyed a lot of files, so burn it in now: [emphasis] one arrow replaces, two arrows add. For reading, you've got a family of tools. Cat dumps the whole file. Head shows just the top, tail shows just the bottom. And less opens a scrollable viewer for big files — arrow keys to move, and hear me on this one: you press the letter Q to quit. If your terminal ever looks frozen today, you're probably inside less. Press Q. [break]

[calm] Then there's tail with dash F, which watches a file and prints new lines as they arrive, live. It looks stuck — it isn't. It's waiting. Control C gets you out. And finally nano, a simple terminal text editor. Control O saves, control X exits. That's the whole survival kit for this lesson. [break]

[calm] The drill builds a nine line notes file, one echo at a time, then reads it back with every tool in the list. You'll peek inside some real system files too, and you'll finish by opening nano, typing line nine yourself, and saving it properly. [break]

[encouraging] You're done when your notes file has nine lines and the last one is the line you typed in nano. For the lab, run the four checkpoint commands — cat the file, count its lines with W C space dash L, then head and tail one line each — and submit one screenshot of all four commands and their output in D2L. Open the lesson and start typing. I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 03 — Looking Inside Files"; terminal sitting in ~/docker-course |
| 2 | Terminal: `echo "..." > notes/notes.txt`, `cat`, then `>>` append; `head -n 3`, `tail -n 3`; open `less /etc/passwd` and press q on camera |
| 3 | Terminal: `tail -f notes/notes.txt` waiting; second terminal echoes a line in, first one updates; Ctrl+C; then nano open, Ctrl+O, Ctrl+X |
| 4 | Terminal: montage building lines 3 through 8 with `>>`, then nano adding "Line 9: edited with nano" and saving |
| 5 | Terminal: the four checkpoint commands; cursor circles the outputs (the screenshot to submit) |
