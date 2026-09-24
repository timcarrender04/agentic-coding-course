# Video: Installing Software

**Lesson:** [05-installing-software.md](../05-installing-software.md) · **Target:** ~2 min · **Words:** 321

## Narration

Up to now you've been using whatever Ubuntu shipped with. Today you install software — seven packages, and every one of them is a tool this course actually needs. Think of it as the terminal's app store, except it's one line per install and there are no ads.

The pattern is the same every time: soo-doo apt install, dash Y to auto-confirm, then the package name. You'll install curl and W get for downloading things, git for version control, H top for watching processes, tree for drawing directory structures, and two quieter ones — C A dash certificates and G N U P G — which handle secure connections and encryption keys. Those last two aren't glamorous, but Docker's installer in Module Two refuses to run without them.

Two habits ride along with this lesson. First: after you install something, prove it. That's the version check — curl dash dash version, git dash dash version. If a version number prints, the tool is really there. Second: some of these packages may already be installed, and apt will just tell you so. Type the command anyway. The muscle memory is the point, not the download. At the end you'll install all seven in a single line, because that's how every tutorial you'll ever read does it.

Quick word on output: your version numbers will differ from mine, and that's completely fine. Any version number is a pass. What matters is that each tool answers when you call it.

You're done when every package reports installed with no errors. For the lab, run the five checkpoint commands — the version checks for curl, git, and tree, the which command for W get, and the D P K G search for G N U P G — and submit one screenshot of all five commands and their output in D2L. Then open the lesson and start installing. I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 05 — Installing Software"; `sudo apt install -y curl` typed slowly |
| 2 | Terminal montage: installing wget, git, htop (open it, press q), tree (`tree ~/docker-course/`), ca-certificates, gnupg |
| 3 | Terminal: `curl --version` printing; an "already the newest version" message; then the one-line install of all seven packages |
| 4 | Two terminals side by side showing different `git --version` numbers, both passing |
| 5 | Terminal: the five checkpoint commands; cursor circles the outputs (the screenshot to submit) |
