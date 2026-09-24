# Video: Permissions Drills

**Lesson:** [06-permissions-drills.md](../06-permissions-drills.md) · **Target:** ~2.5 min · **Words:** 362

## Narration

Fair warning: today is the hardest concept in this module. It's also the one that will save you the most pain later, because half of all mysterious Linux errors come down to one word — permissions.

Here's the mental model. Every file answers three questions: who can read it, who can write it, and who can execute it. And it answers them for three audiences: the owner, the group, and everyone else. When you run L S space dash L A, that cryptic string — dash R W X R dash X dash dash dash — is just those three triplets in a row. Owner first, group second, world last. Read it in threes and it stops being cryptic.

Ch-mod changes permissions, and you'll use it two ways. Ch-mod plus X makes a file executable. The numeric style, like ch-mod seven five five, encodes one triplet per digit: seven means read, write, and execute; five means read and execute; four means read only. Ch-own changes who owns the file — and because giving files away is a root-level power, it needs soo-doo in front of it.

The drill makes all of this concrete. You'll write a tiny shell script, try to run it, and watch it fail with permission denied. Then ch-mod plus X, run it again, and it works. You'll flip it back and forth between six four four and seven five five until you feel the numbers, and you'll finish by handing a file to root and taking it back.

One more thing. Somewhere out there, a tutorial will tell you to ch-mod seven seven seven something. That means anyone can do anything to that file. On a real server that's a security hole, not a fix. Treat it as a smell.

You're done when your script runs and its permissions read seven five five. For the lab, run the four checkpoint commands — the L S on hello dot S H, running the script itself, the ownership check, and the stat call — and submit one screenshot of all four commands and their output in D2L. Open the lesson and go slow. I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 06 — Permissions Drills"; a "Permission denied" error fills the screen |
| 2 | Whiteboard/slide: the rwxrwxrwx grid — owner / group / everyone; then `ls -la` output with one permission string highlighted in threes |
| 3 | Terminal: `chmod +x hello.sh`, `chmod 644`, `chmod 755`, then `sudo chown root:root` and back to `$USER` |
| 4 | Terminal: `./hello.sh` → "Permission denied" → `chmod +x` → "Hello from my script!"; cycle 644 fails, 755 runs |
| 5 | Slide: "chmod 777" with a red X — "never on a real server" |
| 6 | Terminal: the four checkpoint commands; cursor circles the outputs (the screenshot to submit) |
