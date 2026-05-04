# Lesson 04: Sudo and System Updates

**By the end, you will have run a full system update on your Ubuntu machine.**

⏱ ~10 minutes of typing (plus wait time for downloads)

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

**3.** Confirm sudo works — you'll need it for every command in this lesson.
```bash
sudo whoami
```
```
root
```

**4.** Update the package list — this downloads the latest list of available software.
```bash
sudo apt update
```
```
Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]
...
Reading package lists... Done
Building dependency tree... Done
X packages can be upgraded. Run 'apt list --upgradable' to see them.
```
(Output will vary. The last line tells you how many packages can be upgraded.)

**5.** See which packages have updates available.
```bash
sudo apt list --upgradable
```
```
Listing... Done
package1/jammy-updates 1.2.3 amd64 [upgradable from: 1.2.2]
...
```
(You may see many packages or none. Both are fine.)

**6.** Upgrade all packages — the -y flag auto-confirms.
```bash
sudo apt upgrade -y
```
```
Reading package lists... Done
Building dependency tree... Done
Calculating upgrade... Done
The following packages will be upgraded:
  ...
X upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
...
```
(This may take a few minutes. Wait for it to finish.)

**7.** Run update again to confirm everything is current.
```bash
sudo apt update
```
```
...
All packages are up to date.
```
(You should see "All packages are up to date" or "0 packages can be upgraded.")

**8.** Clean up any packages that are no longer needed.
```bash
sudo apt autoremove -y
```
```
Reading package lists... Done
Building dependency tree... Done
0 to remove.
```
(Output will vary. This removes orphaned dependencies.)

**9.** Check that your course directory is still intact — updates don't touch your files, but it's a good habit to verify.
```bash
ls ~/docker-course/
```
```
notes  practice  projects
```

**10.** Check your notes file is still there.
```bash
cat ~/docker-course/notes/notes.txt
```
(You should see all 9 lines from the previous lesson.)

> ⚠️ **Don't do this:** `sudo apt upgrade` without the `-y` flag during a scripted install — it will pause and wait for confirmation, which can hang an automated process. For interactive use (like right now), either way is fine.

---

## Checkpoint

```bash
sudo apt update
```
You should see "All packages are up to date" or "0 packages can be upgraded."

```bash
sudo whoami
```
You should see `root`.

```bash
pwd
```
You should be in `/home/your-username`.

---

**Next up:** [05-installing-software.md](05-installing-software.md) — Install the packages we need
