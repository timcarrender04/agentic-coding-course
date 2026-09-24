# Video: Where Am I?

**Lesson:** [01-where-am-i.md](../01-where-am-i.md) · **Target:** ~2.5 min · **Words:** 346

## Narration

Every terminal session starts with the same quiet question: where am I? Today you learn the three commands that answer it, and by the end of this lesson you'll move around the filesystem without stopping to think.

The concepts are simple. Your terminal is always sitting inside exactly one directory — that's your working directory. P W D prints it. C D changes it. L S lists what's there, and L S space dash L A shows the details, including the hidden files that start with a dot. That's the whole toolkit. The skill is using them so often they become reflex.

There are a few shortcuts worth calling out, because they trip everybody up the first time. C D with nothing after it takes you home, from anywhere. The tilde character also means home, so C D space tilde does the same thing. And the sneaky one: C D space dash takes you back to the previous directory you were in — and it prints where it took you. Think of it like the back button in a browser. You'll drill that one a few times in the lesson, because it feels weird until suddenly it doesn't.

The drill itself is thirty steps of bouncing around the real filesystem. You'll visit the root at slash, poke into slash et-see where the config files live, slash var slash log where the system writes its logs, and slash user slash bin where the programs are. At every stop it's the same rhythm: C D somewhere, P W D to confirm, L S to look around. Type every command — no copy paste. The typing is the lesson.

You're done when you can C D home from anywhere without thinking. For the lab, run the five checkpoint commands at the end of the lesson — they bounce you into et-see and back, out to the root, and home again — and submit one screenshot of all five commands and their output in D2L. Open the lesson, start at step one, and I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 01 — Where Am I?"; terminal with a bare prompt |
| 2 | Terminal: `pwd`, `ls`, `ls -la` in home — highlight the dot files |
| 3 | Terminal: bare `cd` → `pwd`; `cd ~` → `pwd`; then bounce `/etc` ↔ back with `cd -` twice, showing the printed path |
| 4 | Terminal montage: `cd /`, `ls`, `cd /etc`, `cd /var/log`, `ls`, `cd /usr/bin`, `ls \| head` |
| 5 | Terminal: the five checkpoint commands run in order; cursor circles the outputs (the screenshot to submit) |
