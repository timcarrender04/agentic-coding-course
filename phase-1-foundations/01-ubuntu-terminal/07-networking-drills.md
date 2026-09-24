# Lesson 07: Networking Drills

**By the end, you will have confirmed your network is ready to pull Docker images.**

⏱ ~10 minutes of typing

```instructor
Say: "We're confirming the network can reach Docker Hub before Module 02. If it can't, we fix it now — not mid-pull next week."
Mention: "If `dig` reports 'command not found', install it: `sudo apt install -y dnsutils`. Don't waste time on it — install and continue."
Pause: At the `ss -tuln` output. The columns are dense. Walk through one line together — local address, port, state — before letting them continue.
Say: "You're done when `curl -I https://hub.docker.com` returns a 200 or 301 status line."
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

**3.** View your network interfaces and IP addresses.
```bash
ip a
```
```
1: lo: <LOOPBACK,UP,LOWER_UP> ...
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> ...
    inet 192.168.x.x/24 ...
```
(Output will vary. Look for an `inet` address on your main interface — that's your local IP.)

**4.** Ping Google's DNS to confirm basic internet connectivity.
```bash
ping -c 3 8.8.8.8
```
```
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.3 ms
...
3 packets transmitted, 3 received, 0% packet loss
```

**5.** Ping a domain name to confirm DNS works.
```bash
ping -c 3 google.com
```
```
PING google.com (142.250.x.x) 56(84) bytes of data.
...
3 packets transmitted, 3 received, 0% packet loss
```

**6.** Ping Docker Hub's domain — this is where we'll pull images from.
```bash
ping -c 3 hub.docker.com
```
(You should get 0% packet loss. If this fails, your network may block Docker Hub.)

**7.** Use curl to check HTTP headers from a website.
```bash
curl -I https://www.google.com
```
```
HTTP/2 200
content-type: text/html; charset=ISO-8859-1
...
```
(Look for `HTTP/2 200` — that means the request succeeded.)

**8.** Find your public IP address.
```bash
curl ifconfig.me
```
```
203.0.113.x
```
(This shows your public-facing IP. It will differ from your local IP.)

**9.** Add a newline after the IP (curl doesn't always add one).
```bash
echo ""
```

**10.** Check what ports are currently listening on your machine.
```bash
ss -tuln
```
```
Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port
tcp    LISTEN  0       128      0.0.0.0:22            0.0.0.0:*
```
(You should see at least port 22 for SSH. After Docker is installed, you'll see more ports here.)

**11.** Install dnsutils if dig isn't available yet.
```bash
sudo apt install -y dnsutils
```

**12.** Look up DNS records for Docker Hub.
```bash
dig hub.docker.com
```
```
;; ANSWER SECTION:
hub.docker.com.    300    IN    A    x.x.x.x
...
;; Query time: X msec
```
(This confirms your system can resolve DNS names — critical for pulling Docker images.)

**13.** Look up just the short answer.
```bash
dig +short hub.docker.com
```
```
x.x.x.x
```

**14.** Test a curl download — this is how Docker's install script works.
```bash
curl -fsSL https://www.google.com > /dev/null && echo "Download OK"
```
```
Download OK
```
(The -fsSL flags: f=fail silently, s=silent, S=show errors, L=follow redirects.)

**15.** Log your network status in your notes.
```bash
echo "Network check passed: $(date)" >> ~/docker-course/notes/notes.txt
```

**16.** Verify.
```bash
tail -n 1 ~/docker-course/notes/notes.txt
```
```
Network check passed: Mon Jan  1 12:00:00 UTC 2024
```
(Date will differ.)

---

## Checkpoint

```bash
ping -c 1 8.8.8.8
```
You should see `1 packets transmitted, 1 received, 0% packet loss`.

```bash
curl -I https://hub.docker.com 2>/dev/null | head -n 1
```
You should see an HTTP status code (200 or 301).

```bash
dig +short google.com
```
You should see one or more IP addresses.

```bash
ss -tuln | head -n 5
```
You should see a table of listening ports.

---

**Next up:** [08-processes-and-services.md](08-processes-and-services.md) — Inspect what's running
