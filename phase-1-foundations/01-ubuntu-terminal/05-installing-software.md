# Lesson 05: Installing Software

**By the end, you will have installed all the prerequisite packages needed for Docker (in Module 02).**

⏱ ~10 minutes of typing

```instructor
Say: "We're installing the prerequisite packages Docker needs in Module 02 — `ca-certificates`, `gnupg`, and friends. Nothing fancy yet."
Mention: "If apt says a package is already installed, that's fine. They should still TYPE the command — building muscle memory matters more than saving the keystroke."
Pause: After this lesson — natural break point, about 45 minutes in. Take 5–10 minutes before pushing into permissions.
Say: "You're done when every package in the lesson reports 'already installed' or 'newly installed' with no errors."
```

---

**1.** Start from home.
```bash
cd ~
```

**2.** Confirm.
```bash
pwd
```
```
/home/your-username
```

**3.** Always update the package list before installing anything.
```bash
sudo apt update
```
(Wait for it to finish.)

**4.** Install curl — a tool for making HTTP requests from the terminal.
```bash
sudo apt install -y curl
```
```
Reading package lists... Done
...
curl is already the newest version (x.x.x).
```
(If already installed, apt will tell you. That's fine — type the command anyway.)

**5.** Verify curl is installed.
```bash
curl --version
```
```
curl 7.81.0 (x86_64-pc-linux-gnu) ...
```
(Version number will vary.)

**6.** Install wget — another download tool, used by many install scripts.
```bash
sudo apt install -y wget
```

**7.** Verify wget.
```bash
wget --version | head -n 1
```
```
GNU Wget 1.21.2 built on linux-gnu.
```

**8.** Install git — version control, needed for many Docker workflows.
```bash
sudo apt install -y git
```

**9.** Verify git.
```bash
git --version
```
```
git version 2.34.1
```

**10.** Install htop — a better process viewer than top.
```bash
sudo apt install -y htop
```

**11.** Verify htop works (press q to quit immediately).
```bash
htop
```
(You'll see a colorful process viewer. **Press q to quit.**)

**12.** Install tree — shows directory structures visually.
```bash
sudo apt install -y tree
```

**13.** Try tree on your course directory.
```bash
tree ~/docker-course/
```
```
/home/your-username/docker-course/
├── notes
│   ├── file1.txt
│   ├── notes.txt
│   └── renamed.txt
├── practice
│   ├── file1.txt
│   └── file2.txt
└── projects
    └── web
        └── app
```

**14.** Install ca-certificates — needed for secure HTTPS connections (Docker install requires this).
```bash
sudo apt install -y ca-certificates
```

**15.** Install gnupg — handles encryption keys (Docker's GPG key needs this).
```bash
sudo apt install -y gnupg
```

**16.** Install them all in one line — this is how you'll often see it in tutorials. Type it out.
```bash
sudo apt install -y curl wget git htop tree ca-certificates gnupg
```
```
Reading package lists... Done
...
0 newly installed, 0 to remove...
```
(Everything should already be installed. This is practice for combining packages in one command.)

**17.** Record what you installed in your notes.
```bash
echo "Installed: curl, wget, git, htop, tree, ca-certificates, gnupg" >> ~/docker-course/notes/notes.txt
```

**18.** Verify your note was added.
```bash
tail -n 1 ~/docker-course/notes/notes.txt
```
```
Installed: curl, wget, git, htop, tree, ca-certificates, gnupg
```

---

## Checkpoint

```bash
curl --version | head -n 1
```
You should see a curl version number.

```bash
git --version
```
You should see a git version number.

```bash
tree --version
```
You should see a tree version number.

```bash
which wget
```
You should see `/usr/bin/wget`.

```bash
dpkg -l | grep gnupg
```
You should see gnupg in the list.

## Lab

**Objective:** Install the seven prerequisite packages (curl, wget, git, htop, tree, ca-certificates, gnupg) and verify each one answers.

**Task:** Install each package by working through the drills — type every command even if apt says it's already installed. Then run the five Checkpoint commands in one terminal.

**Submit:** One screenshot (or pasted transcript) of the five Checkpoint commands and their output: `curl --version | head -n 1`, `git --version`, `tree --version`, `which wget`, `dpkg -l | grep gnupg`.

**Pass criteria:** (version numbers vary by machine — any version string passes)

- [ ] `curl --version | head -n 1` prints a curl version line.
- [ ] `git --version` prints a git version line.
- [ ] `tree --version` prints a tree version line.
- [ ] `which wget` prints `/usr/bin/wget`.
- [ ] `dpkg -l | grep gnupg` shows gnupg in the installed list.

**Unlocks:** [06-permissions-drills.md](06-permissions-drills.md)

---

**Next up:** [06-permissions-drills.md](06-permissions-drills.md) — Understand and change file permissions
