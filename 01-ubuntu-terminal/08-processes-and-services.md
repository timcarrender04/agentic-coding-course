# Lesson 08: Processes and Services

**By the end, you will be able to inspect running processes and check service status — skills you'll need for managing Docker containers.**

⏱ ~15 minutes of typing

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

**3.** List all running processes.
```bash
ps aux
```
(You'll see a long list. Each line is a running process.)

**4.** That's too much output — filter for just your user's processes.
```bash
ps aux | grep $USER
```
(You'll see only processes owned by your user.)

**5.** Search for a specific process — let's check if SSH is running.
```bash
ps aux | grep sshd
```
```
root      1234  0.0  0.1  12345  6789 ?  Ss   12:00   0:00 sshd: /usr/sbin/sshd
your-user 5678  0.0  0.0   6789  1234 pts/0  S+ 12:01   0:00 grep --color=auto sshd
```
(The second line is your grep command itself — that's normal. The first line is the actual sshd process.)

**6.** Filter out the grep line using a common trick.
```bash
ps aux | grep [s]shd
```
(The bracket trick prevents grep from matching itself.)

**7.** Open the interactive process viewer.
```bash
top
```
(You'll see a live-updating list of processes. **Press q to quit.** Don't type anything else — just press q.)

**8.** Use htop for a better experience (we installed it in Lesson 05).
```bash
htop
```
(Colorful process viewer. **Press q to quit.**)

**9.** Check the status of the SSH service using systemctl.
```bash
systemctl status ssh
```
```
● ssh.service - OpenBSD Secure Shell server
     Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
     Active: active (running) since ...
```
(Press q if the output is paged. Look for "active (running)".)

**10.** Quick check — is SSH active? One-word answer.
```bash
systemctl is-active ssh
```
```
active
```

**11.** Check if SSH is enabled to start at boot.
```bash
systemctl is-enabled ssh
```
```
enabled
```

**12.** Check the cron service — another service that should be running.
```bash
systemctl status cron
```
```
● cron.service - Regular background program processing daemon
     Loaded: loaded (/lib/systemd/system/cron.service; enabled; ...)
     Active: active (running) since ...
```

**13.** Quick check cron.
```bash
systemctl is-active cron
```
```
active
```

**14.** List all active services.
```bash
systemctl list-units --type=service --state=active
```
(You'll see all services that are currently running.)

**15.** View recent system logs with journalctl.
```bash
sudo journalctl -xe | tail -n 20
```
(Shows the last 20 lines of the system journal. Output will vary.)

**16.** View logs for a specific service.
```bash
sudo journalctl -u ssh | tail -n 10
```
(Shows the last 10 SSH log entries.)

**17.** View logs for cron.
```bash
sudo journalctl -u cron | tail -n 10
```

**18.** Check how long the system has been running.
```bash
uptime
```
```
 12:00:00 up 2 days, 3:45,  1 user,  load average: 0.00, 0.01, 0.05
```

**19.** See how much memory is in use.
```bash
free -h
```
```
              total        used        free      shared  buff/cache   available
Mem:          3.8Gi       512Mi       2.1Gi       1.0Mi       1.2Gi       3.1Gi
Swap:         2.0Gi          0B       2.0Gi
```

**20.** Check disk space — Docker images can be large, so you'll want to know this.
```bash
df -h
```
```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   5G   42G  11% /
...
```
(Make sure you have at least 10GB free for Docker images.)

**21.** Log your system status.
```bash
echo "System check: $(uptime)" >> ~/docker-course/notes/notes.txt
```

---

## Checkpoint

```bash
systemctl is-active ssh
```
You should see `active`.

```bash
systemctl is-active cron
```
You should see `active`.

```bash
ps aux | grep [s]shd
```
You should see at least one sshd process.

```bash
free -h | head -n 2
```
You should see total and used memory.

```bash
df -h /
```
You should see at least 10GB available.

---

**Next up:** [09-pipes-and-grep.md](09-pipes-and-grep.md) — Chain commands together
