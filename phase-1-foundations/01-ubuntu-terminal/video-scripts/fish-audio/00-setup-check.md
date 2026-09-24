# Video: Setup Check

**Lesson:** [00-setup-check.md](../00-setup-check.md) · **Target:** ~2.5 min · **Words:** 365

**Fish Audio:** S2-Pro `[bracket]` tags — paste only the `## Narration` block.

## Narration

[warm and friendly] Hey, welcome to Module One. This module is all about the Ubuntu terminal, and before we learn a single new command, we're going to do what every good engineer does before a big job: check the tools. Today is a five minute setup check. Nothing new, no tricks — we're just confirming the environment you built in Module Zero still works. [break]

[calm] Here's the idea behind this lesson. Everything in this module builds on three things: you're on a supported version of Ubuntu, you can reach the internet, and you have soo-doo access. If any one of those is broken, every later lesson breaks with it. So we check now, while it's cheap to fix. [break]

[calm] The lesson walks you through six quick commands. You'll run L S B release to print your Ubuntu version — you want twenty-two oh four or twenty-four oh four. You'll ping eight dot eight dot eight dot eight to prove you have raw internet, then ping google dot com to prove D N S — turning names into addresses — works too. Then soo-doo who am I, which should answer root, and plain who am I, which should answer your username, not root. And one P W D to see where you start. [break]

[calm] Two things that might bite you. If you're on a cloud V M and L S B release says command not found, just install it with soo-doo apt install dash Y L S B release, and run it again. And if you're on W S L and the google dot com ping fails while the numeric ping works, that's a D N S problem — the lesson notes the fix, one nameserver line in a config file. Neither one means anything is wrong with you. They're both thirty second repairs. [break]

[encouraging] You're done when every command in the file runs clean. For the lab, run the three checkpoint commands — L S B release dash R, a single ping to eight dot eight dot eight dot eight, and soo-doo who am I — and submit one screenshot of those commands and their output in D2L. Then open the lesson and start typing. I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Module 01, Lesson 00 — Setup Check"; cut to an empty terminal prompt |
| 2 | Simple slide: three legs — Ubuntu version / internet / sudo — holding up "Module 01" |
| 3 | Terminal: run `lsb_release -a`, `ping -c 3 8.8.8.8`, `ping -c 3 google.com`, `sudo whoami`, `whoami`, `pwd` at narration pace |
| 4 | Terminal: `sudo apt install -y lsb-release`; then `sudo nano /etc/resolv.conf` showing the `nameserver 8.8.8.8` line |
| 5 | Terminal: the three checkpoint commands run clean; cursor circles the output (the screenshot to submit) |
