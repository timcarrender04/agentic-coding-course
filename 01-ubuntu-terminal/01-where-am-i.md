# Lesson 01: Where Am I?

By the end, you will navigate the filesystem without hesitation.

Estimated time: ~15 minutes of typing

---

**1.** Print your current directory — this is the command you'll type most often.
```bash
pwd
```
```
/home/your-username
```

**2.** Confirm who you're logged in as.
```bash
whoami
```
```
your-username
```

**3.** Check this machine's hostname.
```bash
hostname
```
```
your-hostname
```
(Output varies — just confirm it returns something.)

**4.** List what's in your home directory.
```bash
ls
```
```
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
```
(Your output may differ — a fresh install may show nothing or different folders.)

**5.** List again with details — this shows permissions, owner, size, and date.
```bash
ls -la
```
```
total 32
drwxr-x--- 4 your-user your-user 4096 Jan  1 12:00 .
drwxr-xr-x 3 root      root      4096 Jan  1 12:00 ..
-rw-r--r-- 1 your-user your-user  220 Jan  1 12:00 .bash_logout
-rw-r--r-- 1 your-user your-user 3771 Jan  1 12:00 .bashrc
-rw-r--r-- 1 your-user your-user  807 Jan  1 12:00 .profile
```
(Output will vary. Notice the `.` files — those are hidden files.)

**6.** Move to the root of the filesystem.
```bash
cd /
```
(No output — that's normal. cd is silent on success.)

**7.** Confirm you moved.
```bash
pwd
```
```
/
```

**8.** List what's at the root.
```bash
ls
```
```
bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

**9.** Look at the details of root-level directories.
```bash
ls -la
```
```
total 64
drwxr-xr-x  19 root root 4096 Jan  1 12:00 .
drwxr-xr-x  19 root root 4096 Jan  1 12:00 ..
drwxr-xr-x   2 root root 4096 Jan  1 12:00 bin
drwxr-xr-x   3 root root 4096 Jan  1 12:00 boot
...
```

**10.** Move into /etc — this is where system config files live.
```bash
cd /etc
```

**11.** Confirm.
```bash
pwd
```
```
/etc
```

**12.** List this directory.
```bash
ls
```
(You'll see a long list of config files and folders.)

**13.** Go back to where you just were using cd -.
```bash
cd -
```
```
/
```
(cd - takes you to your PREVIOUS directory. It also prints where it took you.)

**14.** Confirm.
```bash
pwd
```
```
/
```

**15.** Use cd - again to bounce back to /etc.
```bash
cd -
```
```
/etc
```

**16.** Confirm.
```bash
pwd
```
```
/etc
```

**17.** Go to your home directory using cd with no arguments.
```bash
cd
```
(No output.)

**18.** Confirm you're home.
```bash
pwd
```
```
/home/your-username
```

**19.** Go to /var/log — this is where system logs live.
```bash
cd /var/log
```

**20.** Confirm and list.
```bash
pwd
```
```
/var/log
```

```bash
ls
```
(You'll see log files like syslog, auth.log, kern.log, etc.)

**21.** Go home using the tilde shortcut.
```bash
cd ~
```
(No output.)

**22.** Confirm.
```bash
pwd
```
```
/home/your-username
```

**23.** Move to /tmp — a directory anyone can write to.
```bash
cd /tmp
```

**24.** Confirm and list.
```bash
pwd
```
```
/tmp
```

```bash
ls -la
```
(Contents will vary.)

**25.** Jump home one more time — drill it.
```bash
cd ~
```

**26.** Confirm.
```bash
pwd
```
```
/home/your-username
```

**27.** One final drill — move to /usr/bin where programs live.
```bash
cd /usr/bin
```

**28.** Confirm and list a few items.
```bash
pwd
```
```
/usr/bin
```

```bash
ls | head
```
(You'll see the first 10 programs installed on your system.)

**29.** Go home.
```bash
cd
```

**30.** Confirm.
```bash
pwd
```
```
/home/your-username
```

---

## Checkpoint

Run each command and confirm the result:

```bash
pwd
```
You should be in `/home/your-username`.

```bash
cd /etc && pwd
```
You should see `/etc`.

```bash
cd - && pwd
```
You should be back in `/home/your-username`.

```bash
cd / && ls
```
You should see the root directories (bin, boot, dev, etc...).

```bash
cd ~ && pwd
```
You should be in `/home/your-username`.

---

**Next up:** [02-making-things.md](02-making-things.md) — Create files and directories
