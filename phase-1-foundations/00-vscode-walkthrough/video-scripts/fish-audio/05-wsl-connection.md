# Video: Connecting to WSL

**Lesson:** [05-wsl-connection.md](../05-wsl-connection.md) · **Target:** ~2.5 min · **Words:** 379

**Fish Audio:** S2-Pro `[bracket]` tags — paste only the `## Narration` block.

## Narration

[calm] This lesson splits the room. From Module one onward, this course assumes you have a Linux terminal, and how you get one depends on your operating system. If you're on a Mac, your path is easy: mac O S is already Unix under the hood, so your Terminal app already speaks the language. Same if you're on Linux. You'll prove it with one command and you're done — or better, pair up and help a Windows neighbor, because Windows students have real work today. [break]

[calm] Windows doesn't come with a Unix shell, so we install one: W S L, the Windows Subsystem for Linux. It's a real Linux operating system running inside Windows, side by side with everything else. No dual-boot, no clunky virtual machine. You open W S L and you're in a Linux shell. [break]

[calm] Windows students, here's your path. First, in PowerShell, run W S L space dash dash status to see if it's already installed. If it isn't, W S L space dash dash install sets it up — that one needs a reboot, and afterward Ubuntu asks you to create a Linux username and password. Fair warning: when you type that password, [emphasis] nothing shows on screen. No dots, no asterisks. Your keyboard isn't broken — type it carefully and press Enter. Then install the W S L extension in VS Code, publisher Microsoft, click the green button in the bottom-left corner of the window, and choose connect to W S L. When the window reloads, that corner reads W S L Ubuntu on green. Open the terminal and run U name space dash A — if the output says Linux, you're genuinely inside. [break]

[confident] So the artifact splits too. Windows students: you're done when the bottom-left shows W S L Ubuntu on green and U name dash A mentions Linux — screenshot your VS Code window showing both and submit it in D2L. Mac and Linux students: open your native terminal, run U name space dash A, and submit a screenshot of that output instead. That's your whole lab. [long-break]

[calm] Windows folks, this lesson has more failure modes than the rest of the course combined, so if anything goes sideways, raise your hand early. Open the lesson, take it slow, and I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 05 — Connecting to WSL (Windows)"; split screen Windows logo vs Mac/Linux; Mac Terminal runs `uname -a` |
| 2 | Simple diagram: Ubuntu shell running inside Windows; a WSL terminal open next to the Windows desktop |
| 3 | PowerShell: `wsl --status`, then `wsl --install`; Ubuntu first-run username/password (nothing echoes); bottom-left `><` button → "Connect to WSL" → green "WSL: Ubuntu"; terminal runs `uname -a` |
| 4 | Side by side: the Windows screenshot (green indicator + uname output) vs the Mac Terminal screenshot |
| 5 | Lesson file open at the checkpoint; hold on the "raise your hand" line |
