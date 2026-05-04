# Lesson 00: Setup Check

By the end, you will have confirmed that your Ubuntu environment is ready for this course.

**Estimated time:** ~5 minutes of typing

---

**1.** Check your Ubuntu version — this confirms you're on a supported release.

```bash
lsb_release -a
```

Expected output (version may differ):

```
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.x LTS
Release:        22.04
Codename:       jammy
```

(You should see 22.04 or 24.04. Either is fine.)

**2.** Confirm you have internet access — every later step needs this.

```bash
ping -c 3 8.8.8.8
```

Expected output:

```
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.3 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=11.8 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=12.1 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss
```

(Times will differ. 0% packet loss is what matters.)

**3.** Confirm DNS resolution works — we'll need to download packages by name.

```bash
ping -c 3 google.com
```

Expected output:

```
PING google.com (142.250.x.x) 56(84) bytes of data.
64 bytes from ...: icmp_seq=1 ttl=117 time=12.3 ms
...
3 packets transmitted, 3 received, 0% packet loss
```

(The IP will vary. 0% packet loss is what matters.)

**4.** Confirm your user has sudo access — you'll need this for installing packages.

```bash
sudo whoami
```

Expected output:

```
root
```

> **Warning:** Be careful with `sudo`. It runs commands as the root user, which has unrestricted access to the entire system. A typo in a `sudo` command can delete files, break your OS, or cause data loss. Always double-check before pressing Enter.

(You may be prompted for your password. Type it — characters won't appear on screen.)

**5.** Check your username — we'll reference this throughout the course.

```bash
whoami
```

Expected output:

```
your-username
```

(This should NOT say "root". If it does, you're logged in as root — create a normal user first.)

**6.** Run one more pwd to see where you start.

```bash
pwd
```

Expected output:

```
/home/your-username
```

---

## Checkpoint

Run each command and confirm the expected result:

```bash
lsb_release -r
```

You should see `Release: 22.04` or `Release: 24.04`.

```bash
ping -c 1 8.8.8.8
```

You should see `1 packets transmitted, 1 received, 0% packet loss`.

```bash
sudo whoami
```

You should see `root`.

---

**Next up:** [01-where-am-i.md](01-where-am-i.md) — Navigate the filesystem
