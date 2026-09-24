# Terminal Escape Night — "Lockdown at ChiefOS"

**Wed Aug 5 · 6:00–8:00 PM · Zoom · replaces the Week 3 lab clinic**

A four-room terminal escape game that re-exercises every lab 01:02–06 skill
through a story instead of drills. Students who finish have, without noticing,
re-done the whole week: navigation, `mkdir`/`cp`/`mv`/`rm -r`, `cat`/`less`/
`tail -f`, nano, `sudo`, `ls -l`, `chmod`, `chown` — the exact surface the
Module 01 phase-gate (next week) tests.

**Format: three teams of 6**, each in its own Zoom breakout room, racing the
other two (~18 players). Everyone types on their own machine — a team clears
a room only when **all 6** have that room's code word, so nobody gets carried.

Nothing here touches `phase-1-foundations/`, so the instructor board is
unaffected.

## Before class

1. Get `setup.sh` to students — pick one:
   - Upload to D2L as a file and have them download into WSL, **or**
   - Zoom file transfer, **or**
   - Post it on the course site and (stretch tie-in to lab 01:07!) have them
     fetch it with `curl -O <url>`.
2. Students run it **as themselves, not with sudo**:
   ```bash
   bash setup.sh
   ```
   The script prompts for the sudo password once, at the end, to seal one vault
   file as root. If a student's sudo fails, the game still works (it falls back
   to a `chmod 000` lock) — don't burn class time fixing it.
   **Mac note:** if they hit `chown: root: illegal group name`, have them run
   `sed -i '' 's/chown root:root/chown root/' setup.sh` then
   `bash setup.sh --reset` (fixed copy already uses owner-only `chown`).
3. Do one dry run yourself beforehand: `bash setup.sh --reset` rebuilds a fresh
   room any time. Broken state mid-game? Same command — total reset takes
   seconds.
4. Pre-create three Zoom breakout rooms named after the teams (below). Assign
   **6 per room**. Balance each team: at least two who cruised labs 01:02–05
   and at least two who struggled — mix strength so coaching works.

## The three teams (6 each)

| Team | Breakout room | Identity |
|---|---|---|
| **Team SUDO** | Room 1 | "We have the power" |
| **Team NANO** | Room 2 | "We know the exit keys" |
| **Team CHMOD** | Room 3 | "We decide who reads" |

### How a team of 6 works together

Everyone runs the game on **their own machine**. The team moves as a unit:
a room is cleared only when **all 6** have that room's code word.

Roles **rotate every room** so each person drives at least once:

| Role (1 person) | Job |
|---|---|
| **Driver** | Shares screen in the breakout; types while narrating every command |
| **Navigator** | Tells the Driver the next command; watches for typos |
| **Reader** | Reads the room's notes/files aloud so the whole team hears the clues |
| **Scribe** | Tracks all 6 code-word checkmarks; posts clears to **main Zoom chat** |
| **Spotter A** | Eyes on Driver's screen; calls out errors / missing steps |
| **Spotter B** | Watches who's stuck among the other five; flags the Scribe when someone needs a coach |

**Work-together rules (announce at launch):**
1. Cameras on, mics unmuted in the breakout — think out loud.
2. You may discuss freely; you may **not** type on anyone else's machine or paste
   full answer files. Words and gestures only.
3. Fast finishers become **night-shift admins**: coach the remaining teammates
   through with words only until all 6 have the code word.
4. Nobody advances to the next game room until the Scribe confirms all 6 are clear.
5. Hint tokens are **team** tokens (3 for the night) — spend as a group.

### Broadcast & leaderboard

**Scribe → main Zoom chat** (so the whole class / instructor sees it):
```
SUDO cleared Room 2 — NOUNDO (6/6)
```

**Instructor → Zoom "Broadcast message to all" breakouts** at each milestone:
- Clock start: `ESCAPE IS LIVE. 50 minutes. All 6 must clear each room.`
- First clear of any room: `SUDO cleared Room 1 — race is on.`
- Midpoint (~6:55): `25 minutes left. Vault and final door still ahead.`
- First team into vault: `NANO has entered the vault...`
- First escape: `TEAM ___ ESCAPED — banner screenshots in main chat.`
- Soft close: `5 minutes. Finish your current room; banners still count.`

Keep a simple leaderboard in the main room (shared screen or chat pin):

| Team | R1 | R2 | R3 | R4 | Escape |
|---|---|---|---|---|---|
| SUDO | | | | | |
| NANO | | | | | |
| CHMOD | | | | | |

Update it from Scribe posts. Float between breakouts; broadcast keeps the race
feeling live even when you're in one room.

**Winner:** first team with **all 6** through the final door (banner screenshots
in main chat prove it). Tiebreaker: fewest hint tokens spent.

## Run of show

| Clock | Block | What happens |
|---|---|---|
| 6:00 | Open + triage | Sign-in. Quick D2L check: who still owes labs 01:02–05? Those students get their sticking point unstuck NOW — the game will finish the review job. Assign 6-person teams out loud. |
| 6:20 | Story launch | Premise ("bad update, building locked, GUI dead, keyboard only"). Read the work-together rules. Everyone runs `bash setup.sh`. Split into breakouts; each team picks Room-1 roles, then `cat ~/escape-night/README.txt`. Broadcast: clock is live. |
| 6:30 | THE ESCAPE | 50 minutes. Three breakouts of 6 racing. Leaderboard from Scribe posts in main chat. Instructor floats + broadcasts milestones. Hint economy below. |
| 7:20 | Debrief | Back to main. Each team teaches one room: SUDO → vault (chmod/chown), NANO → comms (less/tail -f/nano), CHMOD → maintenance (cp/mv/rm -r). Exit ticket: everyone runs `ls -l ~/escape-night/escape`; cold-call students to read the permission string — phase-gate question. |
| 7:40 | Close | Confirm 01:02–06 submitted in D2L · homework through Sunday · Week 4 phase-gate warning (timed, no-help). Banner screenshot in Zoom chat = tonight's participation artifact. |

**Hint economy:** each team gets 3 hint tokens for the night. Spending one
summons the instructor to their breakout for one nudge. First hint for any
room is always: "read the room's files again — the answer is written down."
(It always is.) Unspent tokens are the tiebreaker.

**Finish spread:** fast solvers ~25 min, slow ones need the full 50 — which is
the point of the all-6 rule. Night-shift admins coach with words only until
the last teammate clears.

## Answer key (instructor only)

| Room | Skill (lab) | Solution | Code word |
|---|---|---|---|
| 1 · Lobby | `cd`/`ls`/`cat` (01:02 nav) | `cat server-closet/rack-3/passcode.txt` | `NOMOUSE` |
| 2 · Maintenance | `mkdir`/`cp`/`mv`/`rm -r` (01:02) | `mkdir slot` · `cp supplies/keycard-blue.txt slot/` · `mv slot/keycard-blue.txt slot/keycard.txt` · `rm -r decoy-wires` · `bash unlock.sh` | `NOUNDO` |
| 3 · Comms | `less`/`tail -f`/nano (01:03) | First half `PRESS` at bottom of `manual.txt` (via `less`); second half `Q` arrives on `tail -f signal.log` after `bash antenna.sh`; write `PRESSQ` into `reply.txt` with nano; `bash transmit.sh` | `PRESSQ` |
| 4 · Vault | `ls -l`/`chmod`/`chown`/sudo (01:04, 01:06) | `chmod 600 vault-a.txt` → `ROOT`; `sudo chown $USER vault-b.txt` then `chmod 600 vault-b.txt` (or just `chmod` in the no-sudo fallback) → `ACCESS` | `ROOTACCESS` |
| Final door | nano + `chmod +x` (01:03, 01:06) | nano `~/escape-night/escape-plan.txt` with the 4 words, one per line, ALL CAPS · `chmod +x escape` · `./escape` | banner: `CTRL-O-CTRL-X-RWX` |

Every door script rejects wrong states with an in-story nudge, so "it didn't
work" almost always means "read the message it printed."

## Predicted stuck spots

| Symptom | What's happening | Fix line |
|---|---|---|
| "unlock.sh says the slot spits the card out" | They copied red/green, or renamed wrong | "The maintenance log says which card survived." |
| Moved the blue card instead of copying | unlock.sh detects it and says so | Have them `cp` it back — the error message tells them exactly what to do |
| "The manual froze my terminal" | They're in `less` | Press `q`. This is the lesson. |
| "tail -f shows nothing" | Radio died (45 s) or they never started it | `bash antenna.sh` again, keep the `tail -f` terminal open |
| Stuck in nano | Classic | `Ctrl+O`, `Enter`, `Ctrl+X` |
| "Operation not permitted" on vault-b | Forgot `sudo` before `chown` | Let them see the error first — then the room's own door.txt explains it |
| `./escape` "Permission denied" | It's mode 644 on purpose | `ls -l escape` — where's the x? `chmod +x escape` |
| Anything unrecoverable | — | `bash setup.sh --reset` rebuilds in seconds |

## Safety notes

- The only `rm -r` in the game targets `~/escape-night/room-2-maintenance/decoy-wires` —
  drilled with the same "read the path twice" ritual as lab 01:02.
- setup.sh refuses to run as root, refuses to overwrite an existing game
  without `--reset`, and never writes outside `~/escape-night/`.
- The radio background job writes 12 lines over ~45 s and exits on its own —
  no lingering processes.
