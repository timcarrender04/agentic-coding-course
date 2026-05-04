# Lesson 09: Pipes and Grep

**By the end, you will chain commands together with pipes and search through files with grep.**

⏱ ~15 minutes of typing

```instructor
Say: "Pipes are the trick that makes the terminal powerful — feed the output of one command straight into the input of the next. New mental model. Slow down."
Mention: "If `/var/log/syslog` is permission-denied, prepend `sudo` or switch the example to `/etc/passwd` (world-readable). Don't get stuck."
Pause: Before the drills, demo `echo "hello world" | grep hello` together. Watching one pipe work makes the rest click.
Say: "You're done when they can chain three commands with two pipes and grep a real log file for a string they choose."
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

**3.** The pipe `|` sends one command's output into another command — start simple.
```bash
echo "hello world" | grep hello
```
```
hello world
```
(grep found "hello" in the input and printed the matching line.)

**4.** Search for lines that DON'T match.
```bash
echo "hello world" | grep -v hello
```
(No output — the only line contained "hello" and was excluded.)

**5.** Look at /etc/passwd — every user account is listed here.
```bash
cat /etc/passwd
```
(You'll see many lines. Each line is a user account.)

**6.** Search for your username in /etc/passwd.
```bash
grep $USER /etc/passwd
```
```
your-user:x:1000:1000:Your Name:/home/your-user:/bin/bash
```

**7.** Search for "root" in /etc/passwd.
```bash
grep root /etc/passwd
```
```
root:x:0:0:root:/root:/bin/bash
```

**8.** Count how many user accounts exist on the system.
```bash
wc -l /etc/passwd
```
```
32 /etc/passwd
```
(Number will vary.)

**9.** Same thing using a pipe.
```bash
cat /etc/passwd | wc -l
```
```
32
```

**10.** Find all accounts that use /bin/bash as their shell.
```bash
grep "/bin/bash" /etc/passwd
```
(You should see your user and root at minimum.)

**11.** Count how many use bash.
```bash
grep "/bin/bash" /etc/passwd | wc -l
```
```
2
```
(Number will vary.)

**12.** Case-insensitive search — find "ROOT" regardless of case.
```bash
grep -i "ROOT" /etc/passwd
```
```
root:x:0:0:root:/root:/bin/bash
```

**13.** Search your notes file.
```bash
grep "learning" ~/docker-course/notes/notes.txt
```
```
Line 3: learning cat
Line 4: learning head
Line 5: learning tail
Line 6: learning less
```

**14.** Count the matches.
```bash
grep "learning" ~/docker-course/notes/notes.txt | wc -l
```
```
4
```

**15.** Search recursively through a directory with grep -r.
```bash
grep -r "note" ~/docker-course/notes/
```
(Shows every line containing "note" in every file in the notes directory.)

**16.** Use ls and pipe to grep to find specific files.
```bash
ls /etc | grep "ssh"
```
```
ssh
```
(Shows files/directories in /etc that contain "ssh" in the name.)

**17.** List all installed packages and search for curl.
```bash
dpkg -l | grep curl
```
```
ii  curl  7.81.0-1ubuntu1  amd64  command line tool for transferring data with URL syntax
```

**18.** Count how many packages are installed.
```bash
dpkg -l | grep "^ii" | wc -l
```
```
Output will vary — you should see a number like 200-500.
```

**19.** Sort the lines in your notes file alphabetically.
```bash
sort ~/docker-course/notes/notes.txt
```
(Lines will be in alphabetical order.)

**20.** Get unique shells used by system accounts.
```bash
cat /etc/passwd | cut -d: -f7 | sort | uniq
```
```
/bin/bash
/bin/false
/bin/sync
/usr/sbin/nologin
```
(This chain: extracts the 7th field (shell), sorts them, then removes duplicates.)

**21.** Count how many accounts use each shell.
```bash
cat /etc/passwd | cut -d: -f7 | sort | uniq -c | sort -rn
```
```
     27 /usr/sbin/nologin
      2 /bin/bash
      1 /bin/sync
      1 /bin/false
```
(Numbers will vary. This is a classic pipe chain: cut → sort → uniq -c → sort.)

**22.** Find lines in your notes containing "check" (case-insensitive).
```bash
grep -i "check" ~/docker-course/notes/notes.txt
```

**23.** Pipe multiple commands — find your user, extract the home directory.
```bash
grep $USER /etc/passwd | cut -d: -f6
```
```
/home/your-username
```

**24.** Log your progress.
```bash
echo "Pipes and grep: done" >> ~/docker-course/notes/notes.txt
```

---

## Checkpoint

```bash
grep $USER /etc/passwd
```
You should see your user's entry.

```bash
cat /etc/passwd | wc -l
```
You should see a number (total user accounts).

```bash
grep -r "learning" ~/docker-course/notes/
```
You should see lines containing "learning" from notes.txt.

```bash
dpkg -l | grep curl | wc -l
```
You should see at least `1`.

```bash
cat /etc/passwd | cut -d: -f7 | sort | uniq -c | sort -rn | head -n 3
```
You should see the top 3 most-used shells.

---

**Next up:** [10-user-and-group-setup.md](10-user-and-group-setup.md) — Users and groups
