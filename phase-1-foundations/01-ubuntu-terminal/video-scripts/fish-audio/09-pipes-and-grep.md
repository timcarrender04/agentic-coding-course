# Video: Pipes and Grep

**Lesson:** [09-pipes-and-grep.md](../09-pipes-and-grep.md) · **Target:** ~2.5 min · **Words:** 334

**Fish Audio:** S2-Pro `[bracket]` tags — paste only the `## Narration` block.

## Narration

[warm and friendly] Today is the lesson where the terminal stops being a list of commands and starts being a language. The trick is one character — the pipe, that vertical bar — and it changes everything. [break]

[calm] Here's the concept. Every command you've learned produces output. The pipe takes that output and feeds it straight into the next command as input. Text flows left to right through the chain, like water through pipe fittings. So cat a file, pipe it into W C space dash L, and you've counted its lines. No temporary files, no copy paste — just one command feeding another. [break]

[calm] The pipe's best friend is grep. Grep searches text for a pattern and keeps only the matching lines. On its own it searches files. Behind a pipe, it filters whatever flows into it. Those two ideas — flow and filter — are most of what makes terminal people look fast. [break]

[calm] The drill starts small: a single echo piped into grep, so you see one pipe work before anything fancy. Then you'll search the system's account file for your own username, count things, filter package lists, and build up to a genuinely satisfying chain: cut the shell field out of every account, sort it, count the duplicates, and rank them. Four commands, three pipes, one line. By the end you'll read that chain like a sentence. [break]

[calm] One heads-up: your numbers will differ from mine. Different machines have different accounts and different package counts, and that's fine. The pattern is what's being graded here, not the totals. [break]

[encouraging] You're done when you can chain three commands without looking anything up. For the lab, run the five checkpoint commands — grep your user out of the account file, count its lines, search your notes for the word learning, count curl in the package list, and run the shell ranking chain — and submit one screenshot of all five commands and their output in D2L. Open the lesson and let it flow. I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 09 — Pipes and Grep"; a giant `\|` character |
| 2 | Terminal: `echo "hello world" \| grep hello`; then `cat /etc/passwd \| wc -l` |
| 3 | Terminal: `grep root /etc/passwd`; then `ls /etc \| grep ssh` |
| 4 | Terminal: build the chain piece by piece — `cut -d: -f7`, add `\| sort`, add `\| uniq -c`, add `\| sort -rn` |
| 5 | Two terminals side by side: different `dpkg -l \| grep "^ii" \| wc -l` totals, both fine |
| 6 | Terminal: the five checkpoint commands; cursor circles the outputs (the screenshot to submit) |
