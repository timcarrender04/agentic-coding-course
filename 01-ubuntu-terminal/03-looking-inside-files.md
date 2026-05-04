# Lesson 03: Looking Inside Files

**By the end, you will have created, read, and edited files using the terminal.**

⏱ ~15 minutes of typing

```instructor
Say: "You'll create files, read them, and edit them — all from the terminal. No GUI text editor today."
Mention: "Before they run `less`, announce loudly: 'press q to quit.' Same for `top` later. Otherwise half the room thinks the terminal is frozen."
Pause: At `tail -f`. It looks frozen because it's waiting for new data. Have them open a second terminal and `echo` into the file so they see it update live.
Say: "You're done when they can save with Ctrl+O and exit with Ctrl+X in nano without using arrow keys to escape."
```

---

**1.** Go to your course directory.
```bash
cd ~/docker-course
```

**2.** Confirm.
```bash
pwd
```
```
/home/your-username/docker-course
```

**3.** Create a notes file by writing text into it with echo.
```bash
echo "This is my first note" > notes/notes.txt
```
(The `>` redirects the output of echo into a file, creating it if it doesn't exist.)

**4.** Read the file with cat.
```bash
cat notes/notes.txt
```
```
This is my first note
```

**5.** Add a second line using >> (append, don't overwrite).
```bash
echo "This is my second note" >> notes/notes.txt
```

**6.** Read it again to see both lines.
```bash
cat notes/notes.txt
```
```
This is my first note
This is my second note
```

**7.** Add a few more lines so we have enough to practice with.
```bash
echo "Line 3: learning cat" >> notes/notes.txt
```

```bash
echo "Line 4: learning head" >> notes/notes.txt
```

```bash
echo "Line 5: learning tail" >> notes/notes.txt
```

```bash
echo "Line 6: learning less" >> notes/notes.txt
```

```bash
echo "Line 7: almost done" >> notes/notes.txt
```

```bash
echo "Line 8: last line" >> notes/notes.txt
```

**8.** Read the full file again.
```bash
cat notes/notes.txt
```
```
This is my first note
This is my second note
Line 3: learning cat
Line 4: learning head
Line 5: learning tail
Line 6: learning less
Line 7: almost done
Line 8: last line
```

**9.** Show only the first 3 lines with head.
```bash
head -n 3 notes/notes.txt
```
```
This is my first note
This is my second note
Line 3: learning cat
```

**10.** Show only the last 3 lines with tail.
```bash
tail -n 3 notes/notes.txt
```
```
Line 6: learning less
Line 7: almost done
Line 8: last line
```

**11.** Now look at a longer system file with less -- this opens a scrollable viewer.
```bash
less /etc/passwd
```
(Use arrow keys to scroll. **Press q to quit.** This is critical -- you must press q to exit less.)

**12.** Use head on a system file to peek at the first 5 lines.
```bash
head -n 5 /etc/passwd
```
```
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
```

**13.** Use tail on a system file to see the last 5 lines.
```bash
tail -n 5 /etc/passwd
```
(Output will vary -- you'll see the last 5 user accounts on the system.)

**14.** Now try tail -f -- this watches a file for new content in real time.
```bash
tail -f notes/notes.txt
```
(This will show the last 10 lines and then WAIT. It looks frozen -- it's not. It's waiting for new data.)

**Press Ctrl+C to stop tail -f.** This is how you exit it.

**15.** Now edit a file with nano -- a simple terminal text editor.
```bash
nano notes/notes.txt
```
(nano opens the file for editing.)

Inside nano:
- Type a new line at the bottom: `Line 9: edited with nano`
- Press **Ctrl+O** to save (then press Enter to confirm the filename)
- Press **Ctrl+X** to exit nano

**16.** Confirm your edit was saved.
```bash
cat notes/notes.txt
```
```
This is my first note
This is my second note
Line 3: learning cat
Line 4: learning head
Line 5: learning tail
Line 6: learning less
Line 7: almost done
Line 8: last line
Line 9: edited with nano
```

**17.** Use cat to look at a system file -- /etc/hostname.
```bash
cat /etc/hostname
```
(Output will show your machine's hostname.)

**18.** Count how many lines are in your notes file using wc.
```bash
wc -l notes/notes.txt
```
```
9 notes/notes.txt
```

> **Don't do this:** `echo "text" > important-file.txt` when you mean `>>`. A single `>` OVERWRITES the file. Double `>>` APPENDS. This mistake has destroyed many files.

---

## Checkpoint

```bash
cat ~/docker-course/notes/notes.txt
```
You should see 9 lines, ending with "Line 9: edited with nano".

```bash
wc -l ~/docker-course/notes/notes.txt
```
You should see `9`.

```bash
head -n 1 ~/docker-course/notes/notes.txt
```
You should see: `This is my first note`

```bash
tail -n 1 ~/docker-course/notes/notes.txt
```
You should see: `Line 9: edited with nano`

---

**Next up:** [04-sudo-and-updates.md](04-sudo-and-updates.md) -- System updates with sudo
