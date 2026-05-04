# Lesson 06: Permissions Drills

**By the end, you will be able to read, set, and change file permissions and ownership.**

⏱ ~15 minutes of typing

---

**1.** Go to your practice directory.
```bash
cd ~/docker-course/practice
```

**2.** Confirm.
```bash
pwd
```
```
/home/your-username/docker-course/practice
```

**3.** Look at the current permissions of your files.
```bash
ls -la
```
```
total 8
drwxrwxr-x 2 your-user your-user 4096 ... .
drwxrwxr-x 5 your-user your-user 4096 ... ..
-rw-rw-r-- 1 your-user your-user    0 ... file1.txt
-rw-rw-r-- 1 your-user your-user    0 ... file2.txt
```

(Reading the permission string `-rw-rw-r--`:
- Position 1: `-` = file, `d` = directory
- Positions 2-4: owner permissions (rwx)
- Positions 5-7: group permissions (rwx)
- Positions 8-10: everyone else (rwx))

**4.** Create a simple shell script.
```bash
echo '#!/bin/bash' > hello.sh
```

**5.** Add a command to the script.
```bash
echo 'echo "Hello from my script!"' >> hello.sh
```

**6.** Check what's in the file.
```bash
cat hello.sh
```
```
#!/bin/bash
echo "Hello from my script!"
```

**7.** Look at its permissions.
```bash
ls -la hello.sh
```
```
-rw-rw-r-- 1 your-user your-user 42 ... hello.sh
```
(Notice: no `x` in the permissions -- the file is NOT executable yet.)

**8.** Try to run it -- this will fail.
```bash
./hello.sh
```
```
bash: ./hello.sh: Permission denied
```

**9.** Make it executable with chmod +x.
```bash
chmod +x hello.sh
```

**10.** Check the permissions again.
```bash
ls -la hello.sh
```
```
-rwxrwxr-x 1 your-user your-user 42 ... hello.sh
```
(Now you see `x` in the permissions.)

**11.** Run it.
```bash
./hello.sh
```
```
Hello from my script!
```

**12.** Now practice setting permissions with numbers -- set to 644 (owner read/write, everyone else read-only).
```bash
chmod 644 hello.sh
```

**13.** Check.
```bash
ls -la hello.sh
```
```
-rw-r--r-- 1 your-user your-user 42 ... hello.sh
```
(6 = rw-, 4 = r--, 4 = r--)

**14.** Try to run it -- it's no longer executable.
```bash
./hello.sh
```
```
bash: ./hello.sh: Permission denied
```

**15.** Set it to 755 (owner full, everyone else read+execute).
```bash
chmod 755 hello.sh
```

**16.** Check.
```bash
ls -la hello.sh
```
```
-rwxr-xr-x 1 your-user your-user 42 ... hello.sh
```
(7 = rwx, 5 = r-x, 5 = r-x)

**17.** Run it again to confirm.
```bash
./hello.sh
```
```
Hello from my script!
```

**18.** Create another file to practice chown.
```bash
touch owned-by-me.txt
```

**19.** Check the owner.
```bash
ls -la owned-by-me.txt
```
```
-rw-rw-r-- 1 your-user your-user 0 ... owned-by-me.txt
```

**20.** Change the owner to root (requires sudo).
```bash
sudo chown root:root owned-by-me.txt
```

**21.** Check ownership again.
```bash
ls -la owned-by-me.txt
```
```
-rw-rw-r-- 1 root root 0 ... owned-by-me.txt
```
(Now root owns this file.)

**22.** Change it back to yourself.
```bash
sudo chown $USER:$USER owned-by-me.txt
```

**23.** Confirm.
```bash
ls -la owned-by-me.txt
```
```
-rw-rw-r-- 1 your-user your-user 0 ... owned-by-me.txt
```

**24.** Look at permissions on a system file to practice reading.
```bash
ls -la /etc/passwd
```
```
-rw-r--r-- 1 root root 1847 ... /etc/passwd
```
(644 -- owner can read/write, everyone else can only read.)

**25.** Look at a directory's permissions.
```bash
ls -la /tmp
```
(Notice the `d` at the start -- it's a directory. Also notice the `t` at the end -- that's the sticky bit.)

**26.** Go home.
```bash
cd ~
```

> **Warning:** Don't do this: `chmod 777 /` or `chmod -R 777 ~` -- this gives everyone full access to everything. Never use 777 on a real server. It's a security disaster.

> **Warning:** Don't do this: `sudo chown -R root:root ~` -- this would make root own your entire home directory and lock you out of your own files.

---

## Checkpoint

```bash
ls -la ~/docker-course/practice/hello.sh
```
You should see `-rwxr-xr-x` (permissions 755).

```bash
~/docker-course/practice/hello.sh
```
You should see: `Hello from my script!`

```bash
ls -la ~/docker-course/practice/owned-by-me.txt
```
Owner should be your username, not root.

```bash
stat -c "%a" ~/docker-course/practice/hello.sh
```
You should see: `755`

---

**Next up:** [07-networking-drills.md](07-networking-drills.md) -- Test your network connectivity
