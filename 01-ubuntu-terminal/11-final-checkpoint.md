# Lesson 11: Final Checkpoint

**By the end, you will have proven that your Ubuntu environment is fully configured and that you can work in the terminal without hesitation.**

⏱ ~20 minutes of typing

---

This is a cumulative drill. Run every command below from memory. If you get stuck, go back and redo the lesson where you learned that command. Do NOT copy-paste — type every character.

---

### System Basics

**1.** Print your working directory.
```bash
pwd
```

**2.** Print your username.
```bash
whoami
```

**3.** Print your hostname.
```bash
hostname
```

**4.** Show your Ubuntu version.
```bash
lsb_release -a
```

**5.** Confirm sudo works.
```bash
sudo whoami
```
Expected: `root`

---

### Navigation

**6.** Go to the root of the filesystem and list its contents.
```bash
cd /
```

```bash
ls
```

**7.** Go to /etc and confirm.
```bash
cd /etc
```

```bash
pwd
```
Expected: `/etc`

**8.** Jump back to your previous directory.
```bash
cd -
```

**9.** Go home.
```bash
cd ~
```

```bash
pwd
```
Expected: `/home/your-username`

---

### Files and Directories

**10.** List your docker-course directory with details.
```bash
ls -la ~/docker-course/
```

**11.** Show the full directory tree.
```bash
tree ~/docker-course/
```

**12.** Read your notes file.
```bash
cat ~/docker-course/notes/notes.txt
```

**13.** Show only the first 3 lines.
```bash
head -n 3 ~/docker-course/notes/notes.txt
```

**14.** Show only the last 3 lines.
```bash
tail -n 3 ~/docker-course/notes/notes.txt
```

**15.** Count the lines in your notes file.
```bash
wc -l ~/docker-course/notes/notes.txt
```

---

### Permissions

**16.** Check the permissions on your script.
```bash
ls -la ~/docker-course/practice/hello.sh
```
Expected: `-rwxr-xr-x` (755)

**17.** Run your script.
```bash
~/docker-course/practice/hello.sh
```
Expected: `Hello from my script!`

---

### Package Management

**18.** Update the package list.
```bash
sudo apt update
```

**19.** Verify curl is installed.
```bash
curl --version | head -n 1
```

**20.** Verify git is installed.
```bash
git --version
```

---

### Networking

**21.** Confirm internet access.
```bash
ping -c 3 8.8.8.8
```
Expected: `0% packet loss`

**22.** Confirm DNS works.
```bash
ping -c 3 google.com
```
Expected: `0% packet loss`

**23.** Find your public IP.
```bash
curl ifconfig.me && echo ""
```

**24.** Check listening ports.
```bash
ss -tuln
```

---

### Processes and Services

**25.** Check if SSH is running.
```bash
systemctl is-active ssh
```
Expected: `active`

**26.** Check system resource usage.
```bash
free -h
```

**27.** Check disk space.
```bash
df -h /
```
Expected: at least 10GB available

---

### Pipes and Grep

**28.** Find your entry in /etc/passwd.
```bash
grep $USER /etc/passwd
```

**29.** Count installed packages.
```bash
dpkg -l | grep "^ii" | wc -l
```

**30.** List unique shells on the system.
```bash
cat /etc/passwd | cut -d: -f7 | sort | uniq
```

---

### Users and Groups

**31.** Show your user ID and groups.
```bash
id
```

**32.** List your groups.
```bash
groups
```

**33.** Confirm the docker group does NOT exist yet.
```bash
grep docker /etc/group
```
Expected: no output (docker group will be created in Module 02)

---

## Final Verification

Run these 5 commands. If all pass, you're ready for Module 02.

```bash
lsb_release -r
```
✅ Shows `Release: 22.04` or `Release: 24.04`

```bash
ping -c 1 8.8.8.8
```
✅ Shows `0% packet loss`

```bash
curl --version | head -n 1
```
✅ Shows a curl version

```bash
git --version
```
✅ Shows a git version

```bash
tree ~/docker-course/
```
✅ Shows your course directory tree with notes, practice, and projects

---

## You're done with Module 01!

You've built the muscle memory for:
- Navigating the filesystem
- Creating and managing files
- Reading and editing files
- Updating your system
- Installing software
- Setting permissions
- Diagnosing networking
- Inspecting processes and services
- Using pipes and grep
- Managing users and groups

**Next:** Module 02 — Docker Installation. Everything you typed in this module was preparation for what comes next.
