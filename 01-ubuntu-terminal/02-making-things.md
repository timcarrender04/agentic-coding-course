# Lesson 02: Making Things

By the end, you will have created the ~/docker-course/ working directory you'll use for the rest of the module.

Estimated time: ~15 minutes of typing

---

**1.** Start from home.
```bash
cd ~
```

**2.** Confirm you are in your home directory.
```bash
pwd
```
```
/home/your-username
```

**3.** Create the working directory for this course.
```bash
mkdir docker-course
```

**4.** Confirm it exists.
```bash
ls
```
(You should see `docker-course` in the list.)

**5.** Move into it.
```bash
cd docker-course
```

**6.** Confirm you are inside the new directory.
```bash
pwd
```
```
/home/your-username/docker-course
```

**7.** Create a subdirectory for practice files.
```bash
mkdir practice
```

**8.** Create another subdirectory.
```bash
mkdir notes
```

**9.** List to see both.
```bash
ls
```
```
notes  practice
```

**10.** Try creating a nested directory path in one command.
```bash
mkdir -p projects/web/app
```

**11.** Confirm the full path was created.
```bash
ls -la projects/web/
```
```
total 12
drwxrwxr-x 3 your-user your-user 4096 ... .
drwxrwxr-x 3 your-user your-user 4096 ... ..
drwxrwxr-x 2 your-user your-user 4096 ... app
```

**12.** See the whole tree structure (using ls -R since tree may not be installed yet).
```bash
ls -R
```
```
.:
notes  practice  projects

./notes:

./practice:

./projects:
web

./projects/web:
app

./projects/web/app:
```

**13.** Create an empty file using touch.
```bash
touch practice/file1.txt
```

**14.** Confirm it exists.
```bash
ls practice/
```
```
file1.txt
```

**15.** Create a few more files.
```bash
touch practice/file2.txt
```

```bash
touch practice/file3.txt
```

**16.** List them with details.
```bash
ls -la practice/
```
(You should see file1.txt, file2.txt, and file3.txt — all with 0 bytes.)

**17.** Copy a file.
```bash
cp practice/file1.txt practice/file1-backup.txt
```

**18.** Confirm the copy was created.
```bash
ls practice/
```
```
file1-backup.txt  file1.txt  file2.txt  file3.txt
```

**19.** Copy a file into a different directory.
```bash
cp practice/file1.txt notes/
```

**20.** Confirm the file landed in notes.
```bash
ls notes/
```
```
file1.txt
```

**21.** Rename a file using mv.
```bash
mv practice/file3.txt practice/renamed.txt
```

**22.** Confirm — file3.txt is gone, renamed.txt is there.
```bash
ls practice/
```
```
file1-backup.txt  file1.txt  file2.txt  renamed.txt
```

**23.** Move a file to a different directory.
```bash
mv practice/renamed.txt notes/
```

**24.** Confirm the file moved from practice to notes.
```bash
ls notes/
```
```
file1.txt  renamed.txt
```

```bash
ls practice/
```
```
file1-backup.txt  file1.txt  file2.txt
```

**25.** Remove a single file.
```bash
rm practice/file1-backup.txt
```

**26.** Confirm it's gone.
```bash
ls practice/
```
```
file1.txt  file2.txt
```

> :warning: **Don't do this:** `rm -rf /` or `rm -rf ~` — this would delete your entire system or home directory. Always double-check the path before running rm.

**27.** Create a temporary directory to practice deleting.
```bash
mkdir practice/temp-dir
```

**28.** Put a file in it.
```bash
touch practice/temp-dir/throwaway.txt
```

**29.** Try removing the directory with plain rm — this will fail.
```bash
rm practice/temp-dir
```
```
rm: cannot remove 'practice/temp-dir': Is a directory
```

**30.** Remove the directory and its contents with rm -r.
```bash
rm -r practice/temp-dir
```

> :warning: **Don't do this:** Never run `rm -r` on a directory without first checking what's inside it with `ls`. One wrong path and you lose files permanently.

**31.** Confirm it's gone.
```bash
ls practice/
```
```
file1.txt  file2.txt
```

**32.** Run mkdir -p on a path that already exists — it won't error.
```bash
mkdir -p practice
```
(No output, no error. That's why -p is safe to use.)

**33.** Go home and confirm your docker-course structure.
```bash
cd ~
```

```bash
ls -R docker-course/
```
```
docker-course/:
notes  practice  projects

docker-course/notes:
file1.txt  renamed.txt

docker-course/practice:
file1.txt  file2.txt

docker-course/projects:
web

docker-course/projects/web:
app

docker-course/projects/web/app:
```

---

## Checkpoint

```bash
ls ~/docker-course/
```
You should see: `notes  practice  projects`

```bash
ls ~/docker-course/practice/
```
You should see: `file1.txt  file2.txt`

```bash
ls ~/docker-course/notes/
```
You should see: `file1.txt  renamed.txt`

```bash
ls ~/docker-course/projects/web/app/
```
Should show an empty directory (no error).

---

**Next up:** [03-looking-inside-files.md](03-looking-inside-files.md) — Read and edit files
