# Video: Networking Drills

**Lesson:** [07-networking-drills.md](../07-networking-drills.md) · **Target:** ~2.5 min · **Words:** 359

## Narration

Next week you'll ask Docker to pull images from the internet, and if your network can't reach Docker Hub, class grinds to a halt mid-pull. So today we test the network — layer by layer — while there's still time to fix anything we find.

Think of connectivity as a ladder with three rungs. Bottom rung: raw reachability — can you ping a bare I P address like eight dot eight dot eight dot eight? Middle rung: D N S — can you turn a name like hub dot docker dot com into an address? Top rung: H T T P — can you actually hold a web conversation? Curl with dash capital I asks a server for just its headers, and a status line that comes back with two hundred means yes. When a network is broken, this ladder tells you exactly which rung snapped.

The drill walks the ladder. You'll look at your own interfaces with I P space A, ping the numeric address, ping google dot com and Docker Hub by name, pull headers with curl, and query D N S records directly with dig. You'll also check your public I P with curl against if config dot me, and peek at your machine's listening ports with S S space dash T U L N.

Now, expectations. Network output is different on every machine and every network — that's normal. If you're on campus or corporate wifi, if config dot me might show a proxy address instead of your real one, and some networks block certain hosts. Don't panic, and don't chase exact numbers. Any successful response counts. What we care about is the final state: packets come back, names resolve, and a status line prints.

You're done when the checkpoint passes: a ping to eight dot eight dot eight dot eight with zero percent packet loss, an H T T P status line back from Docker Hub, a dig answer for google dot com, and a table of listening ports. Submit one screenshot of those four commands and their output in D2L. Open the lesson and start climbing. I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 07 — Networking Drills"; a staged `docker pull` hanging on a broken network |
| 2 | Slide: three-rung ladder — IP reachability → DNS → HTTP; terminal shows `ping 8.8.8.8` then `curl -I https://www.google.com` |
| 3 | Terminal montage: `ip a`, the three pings, `curl -I`, `curl ifconfig.me`, `dig hub.docker.com`, `ss -tuln` |
| 4 | Terminal on campus wifi: `curl ifconfig.me` returning a proxy-looking IP; caption "any successful response counts" |
| 5 | Terminal: the four checkpoint commands; cursor circles the outputs (the screenshot to submit) |
