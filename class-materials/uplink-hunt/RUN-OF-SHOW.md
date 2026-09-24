# Operation Uplink — "Signal Lost"

**Wed Aug 12 · 6:00–8:00 PM · Zoom · opens the night; the Module 01 phase-gate (01:11) runs in the back half**

A four-station scavenger hunt that re-exercises every lab 01:07–10 skill through
a story instead of drills: networking (`ip a`/`ss -tuln`/`curl`/`dig`), processes
(`ps aux | grep`), pipes (`grep`/`cut`/`sort`/`uniq -c`), users & groups
(`id`/`groups`/`/etc/passwd`), plus a `chmod` seal from 01:06. The finale is the
course's canonical network check — `ping -c 3 8.8.8.8`, three echoes home — which
is literally the wire Docker rides in Week 5. Students who finish have, without
noticing, reviewed the exact surface the phase-gate tests an hour later.

**Format: crews of 2**, each pair in its own Zoom breakout room. Both partners
run everything on their **own machine**; roles swap every station; a station is
cleared only when **both** hold the fragment.

Nothing here touches `phase-1-foundations/`, so the instructor board is
unaffected.

## Before class

1. Get `setup.sh` to students — upload to D2L (Week 4 → Operation Uplink), or
   post it on the course site and (tie-in to lab 01:07!) have them fetch it with
   `curl -O <url>`.
2. Students run it **before 6:00 PM, as themselves, never with sudo**:
   ```bash
   bash setup.sh
   ```
   This game never asks for a password — there is **zero sudo** anywhere in it.
   Remind them of the packet's other pre-flight step:
   `which dig || sudo apt install -y dnsutils` (lab 01:07 drill).
3. Do one dry run yourself beforehand: `bash setup.sh --reset` rebuilds a fresh
   station any time, and also powers down the background machinery. Broken state
   mid-game? Same command. Machinery quiet? `bash power.sh` restarts it — that
   is the universal in-story fix and the students are told it repeatedly.
4. Pre-create the 2-person breakout rooms (**Crew 1, Crew 2, …**). Pair one
   student who cruised Monday's labs with one who struggled — the Navigator role
   makes coaching automatic.
5. Queue the phase-gate materials (lesson 01:11) for 7:15. Tonight's hunt IS the
   review; there is no separate triage block.

## The crews (2 each)

| Role (swaps EVERY station) | Job |
|---|---|
| **Driver** | Shares screen in the breakout; types every command while narrating it |
| **Navigator** | Reads the packet + station briefings aloud; dictates the next command; watches for typos |

**Work-together rules (announce at launch):**
1. Cameras on, mics open in the breakout — think out loud.
2. Both partners run everything on their **own machine**. A station is cleared
   only when **both** have the fragment. The finale banner must come from
   **both** terminals.
3. Coach with words only — never type on your partner's machine, never paste an
   answer file.
4. Roles swap at every station door. No exceptions — that's how both partners
   drive twice.
5. Hint tokens are **crew** tokens (3 for the night) — spend as a pair.

### Broadcast & leaderboard

**Crews → main Zoom chat** as they clear stations:
```
CREW 3 — Station 2 clear (2/2)
```

**Instructor → Zoom "Broadcast message to all breakouts"** at milestones:
- Clock start: `THE HUNT IS LIVE. 60 minutes. Both partners must clear every station.`
- First station-1 clear: `CREW ___ hears the beacon — race is on.`
- First station-2 clear: `CREW ___ found the HEARTBEAT... whatever that means.`
- Midpoint (~6:35): `30 minutes. The console is still dark.`
- First armed console: `CREW ___ has ARMED THE CONSOLE...`
- First uplink: `CREW ___ RESTORED THE UPLINK — banners in main chat.`
- Soft close: `5 minutes. Fire what you have; banners still count.`

Keep a simple leaderboard in the main room (shared screen or chat pin):

| Crew | S1 | S2 | S3 | S4 | UPLINK |
|---|---|---|---|---|---|
| Crew 1 | | | | | |
| Crew 2 | | | | | |
| Crew 3 | | | | | |

**Winner:** first crew with **both** banners in main chat. Tiebreaker: fewest
hint tokens spent.

## Run of show

| Clock | Block | What happens |
|---|---|---|
| 6:00 | Cold open | The story (4 min): saboteurs cut the uplink; Docker shipment lands next week on this wire. Rules read aloud. Everyone posts a ✓ in chat when `ls ~/uplink-hunt` shows four stations. Setup rescue for stragglers: `bash setup.sh --reset`. Assign crews out loud. |
| 6:05 | THE HUNT | Breakouts open. 60:00 on the clock. First in-story act on each machine: `bash power.sh`. Instructor floats between breakouts + broadcasts milestones. Hint economy below. |
| 7:05 | Debrief | Back to main. Banners tallied, winner crowned. One crew narrates each station (~2 min each): the `ss` sweep, the process-table clue, the `uniq -c` pipeline, the passwd cut. Drop the wink: the beacon port was **8412 — tonight's date**. Close the loop: "you just proved the exact network Docker needs in two weeks." |
| 7:15 | **Module 01 phase-gate (01:11)** | Timed, no-help, cameras on, from memory. The hunt was the warm-up; the gate is solo. |
| 7:45 | Gate triage | Screenshot submissions to D2L. Anyone who missed a section gets redo-the-lesson homework assigned on the spot. |
| 7:55 | Close | Labs 01:07–11 due in D2L by **Sunday**. Week 5 preview: Docker install — over the uplink they just restored. |

**Hint economy:** each crew gets 3 hint tokens for the night. Spending one
summons the instructor to their breakout for one nudge. The free hint is always
the same: "read the briefing again — or read what your last command actually
printed." (It always tells them.)

**Finish spread:** a sharp crew lands the banner in ~30 min; slow crews need the
full 60 — the swap-every-station rule is what keeps the fast partner from
carrying. Early finishers: have them re-run the station-3 pipeline one stage at
a time and explain what each stage adds — that's the phase-gate question.

## Answer key (instructor only)

| Station | Skill (lab) | Solution | Fragment |
|---|---|---|---|
| 1 · Antenna Array | `ip a` / `ss -tuln` / `curl` / `dig` (01:07) | `ss -tuln` → port **8412** (fallbacks 8421/8437 if busy) · `curl http://localhost:8412/beacon.txt` · beacon also orders `dig +short dns.google` → **8.8.8.8 / 8.8.4.4** (they must write the address down) | `HANDSHAKE` |
| 2 · Relay Rack | `ps aux \| grep` (01:08) | `ps aux \| grep relay` → `bash …/.machinery/relay.sh FRAGMENT-2:HEARTBEAT NEXT:station-3-logs` — the clue exists **only** in the process table | `HEARTBEAT` |
| 3 · Log Archive | pipes/`grep`/`cut`/`sort`/`uniq -c` (01:09) | `grep CORRUPT uplink.log \| cut -d: -f1 \| sort \| uniq -c \| sort -rn` → **ghost** floods the top · `grep -i ghost uplink.log \| grep -v CORRUPT` → the single `Ghost:CLEAN:` line (capital G — lowercase `grep ghost` misses it on purpose) | `NEEDLE` |
| 4 · Crew Deck | `chmod` (01:06) + `id`/`groups`/passwd `cut` (01:10) | `stat -c "%a" sealed-orders.txt` → 000 · `chmod 644 sealed-orders.txt` · `cat` it · `grep "^$USER:" /etc/passwd \| cut -d: -f7` → `/bin/bash` → last word ALL CAPS | `BASH` * |
| Console | nano + everything | `nano ~/uplink-hunt/answers.txt` (4 fragments, station order, one per line, ALL CAPS) · `bash transmit.sh` → ARMED · `bash transmit.sh --fire 8.8.8.8` (8.8.4.4 also accepted) → live `ping -c 3` → banner | **`UPLINK-3X3-0LOSS`** |

\* Line 4 auto-adapts to the student's login shell — a zsh user's `ZSH` also
passes. The console computes it from their own `/etc/passwd` line at runtime.

**Instructor override:** if a student's `ping` genuinely cannot succeed tonight
(VPN policy, hotel Wi-Fi blocking ICMP) and `sudo ping` fails too, award the
manual code **`UPLINK-MANUAL-OVERRIDE`** and note who received it. Never share
it otherwise — it exists only in this document.

## Predicted stuck spots

| Symptom | What's happening | Fix line |
|---|---|---|
| `ss -tuln` shows nothing above 8400 | They never ran `power.sh`, or WSL restarted and killed the machinery | "The power flickered. `bash power.sh`." |
| `curl: (7) Failed to connect` | Same as above, or they typed a port that isn't the one on THEIR machine | "Sweep again with `ss -tuln` — the beacon picks its own frequency." |
| `dig: command not found` | Skipped the packet's pre-flight | `sudo apt install -y dnsutils` (lab 01:07 drill — the packet told them) |
| `ps aux \| grep relay` shows only one line | That line is their own grep; the relay died (4-hour self-expiry or WSL restart) | "What did lab 01:08 say about grep finding itself? Then: `bash power.sh`." |
| `systemctl` prints "System has not been booted with systemd" | Expected on some WSL installs | Non-gating by design — the briefing says a finding, not a failure |
| The station-3 pipeline prints nothing | A typo somewhere in the chain | "Build it left to right, one pipe at a time. Look at each stage's output." |
| `grep ghost` finds no clean line | Case. The clean line is `Ghost:` | "Machines care about case. Spies don't." (It's in the briefing.) |
| `Permission denied` on sealed-orders.txt | That IS the seal | "Look at the lock first: `ls -la`. Who owns it? Then lab 01:06." |
| Console rejects line 4 | They typed `/bin/bash` or `bash` instead of `BASH` | "Last word of the path. ALL CAPS." |
| `ping: socket: Operation not permitted` | Rare WSL build without raw-socket capability | `sudo ping -c 3 8.8.8.8`; if that works, award the override code |
| Ping shows 100% packet loss | Their actual network is down — this is a real triage moment | Wi-Fi, VPN, `ip a`, `curl -I https://www.google.com` — coach it live; this IS lab 01:07 |
| Anything unrecoverable | — | `bash setup.sh --reset`, then `bash power.sh`. Seconds. |

## Safety notes

- **Zero sudo in the game.** setup.sh refuses to run as root, never asks for a
  password, and never writes outside `~/uplink-hunt/`.
- **Zero `rm -r` in the game.** Nothing in the hunt asks students to delete
  anything.
- Background machinery is exactly two processes: a `bash` wrapper around
  `sleep 14400` (self-expires after 4 hours) and one `python3 -m http.server`
  bound to **127.0.0.1 only** (never reachable from outside the machine). Both
  are killed by `bash setup.sh --reset` and power-cycled by every `power.sh`
  run.
- The finale sends exactly three ICMP echo requests to `8.8.8.8` (or
  `8.8.4.4`) — the same packets lab 01:07 already sent.
