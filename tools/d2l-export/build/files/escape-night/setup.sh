#!/usr/bin/env bash
# ============================================================
#  TERMINAL ESCAPE NIGHT — "Lockdown at ChiefOS"
#  Week 3 culminating event · Agentic Coding
#
#  Students run:   bash setup.sh
#  Rebuild fresh:  bash setup.sh --reset
#
#  Builds a four-room escape game under ~/escape-night/ using
#  ONLY skills from labs 01:02–06:
#    Room 1  cd / ls / cat            (navigation)
#    Room 2  mkdir / cp / mv / rm -r  (making & destroying)
#    Room 3  less / tail -f / nano    (reading & editing)
#    Room 4  ls -l / chmod / chown    (permissions) + sudo
#  Final door: chmod +x + a nano-written escape plan.
# ============================================================
set -euo pipefail

BASE="$HOME/escape-night"

if [ "$(id -u)" -eq 0 ]; then
  echo "Do NOT run this with sudo. Run it as yourself: bash setup.sh"
  echo "(The script will ask for sudo by itself at the one moment it needs it.)"
  exit 1
fi

if [ "${1:-}" = "--reset" ]; then
  rm -rf "$BASE"
  echo "Old escape room demolished. Rebuilding..."
elif [ -d "$BASE" ]; then
  echo "~/escape-night already exists."
  echo "To start over from scratch, run:  bash setup.sh --reset"
  exit 1
fi

mkdir -p "$BASE"

# ------------------------------------------------------------
# Base README — the story and the first instruction
# ------------------------------------------------------------
cat > "$BASE/README.txt" <<'EOF'
==============================================================
        LOCKDOWN AT CHIEFOS  ·  TERMINAL ESCAPE NIGHT
==============================================================

23:47. A bad update just locked every door in the ChiefOS
server building — and you're still inside. The GUI is dead.
The mouse is dead. All you have is this terminal.

Four rooms stand between you and the exit. Each room gives up
ONE CODE WORD. Collect all four, write the escape plan, and
get out.

RULES
 - Everything happens inside ~/escape-night/ . Nothing outside
   it ever needs to be touched or deleted.
 - Every room can be solved with commands you already know.
 - Stuck? Read the room's files again. The answer is written
   down somewhere. It always is.

START:
    cd ~/escape-night/room-1-lobby
    cat note.txt
==============================================================
EOF

# ------------------------------------------------------------
# ROOM 1 — The Lobby (cd / ls / cat)
# ------------------------------------------------------------
R1="$BASE/room-1-lobby"
mkdir -p "$R1/server-closet/rack-1" "$R1/server-closet/rack-2" "$R1/server-closet/rack-3" \
         "$R1/front-desk" "$R1/supply-cabinet"

cat > "$R1/note.txt" <<'EOF'
ROOM 1 — THE LOBBY

A sticky note from the night-shift admin:

  "Power went out mid-update. I stashed the override passcode
   in the SERVER CLOSET — third rack from the door. Everything
   else in there is junk. Don't trust the front desk."

Look around with ls. Move with cd. Read with cat.
(Remember: cd .. climbs back OUT of a directory.)
EOF

cat > "$R1/front-desk/visitor-log.txt" <<'EOF'
Nice try. The front desk knows nothing. The note said don't
trust us. Back to the closet — cd .. gets you out of here.
EOF

cat > "$R1/supply-cabinet/inventory.txt" <<'EOF'
3x ethernet cable (chewed), 1x keyboard (sticky), 0x passcodes.
EOF

cat > "$R1/server-closet/rack-1/label.txt" <<'EOF'
Rack 1: decommissioned 2019. Full of dust bunnies. Not this one.
EOF

cat > "$R1/server-closet/rack-2/label.txt" <<'EOF'
Rack 2: hums ominously. Empty. The note said the THIRD rack.
EOF

cat > "$R1/server-closet/rack-3/passcode.txt" <<'EOF'
==============================================================
  CODE WORD 1 of 4:   NOMOUSE
==============================================================
Write it down. You'll need all four at the very end.

NEXT ROOM:
    cd ~/escape-night/room-2-maintenance
    cat door.txt
EOF

# ------------------------------------------------------------
# ROOM 2 — Maintenance (mkdir / cp / mv / rm -r)
# ------------------------------------------------------------
R2="$BASE/room-2-maintenance"
mkdir -p "$R2/supplies" "$R2/decoy-wires"

cat > "$R2/door.txt" <<'EOF'
ROOM 2 — MAINTENANCE

The maintenance door has a keycard slot — but the slot itself
is missing and the wall is a mess of decoy wiring.

Read maintenance-log.txt first. Then, to get the door open:

  1. Build the missing slot — a directory named exactly:  slot
     (make it right here in room-2-maintenance)
  2. COPY the correct keycard from supplies/ into slot/
     (copy, don't move — leave the original in supplies)
  3. The slot only reads cards named exactly:  keycard.txt
     Rename your copy once it's inside the slot.
  4. Rip out the decoy wiring: delete the decoy-wires
     directory entirely. It's a directory, so plain rm won't
     do it. READ THE PATH TWICE before you press Enter.
  5. Run the door mechanism:   bash unlock.sh
EOF

cat > "$R2/maintenance-log.txt" <<'EOF'
MAINTENANCE LOG — most recent entries

  07/29  Small electrical fire in supply room. RED keycard
         melted. GREEN keycard demagnetized in the microwave
         incident (don't ask). Only the BLUE keycard still
         works. It opens everything on this floor.
  07/30  Ordered replacement slot. Never installed it.
EOF

cat > "$R2/supplies/keycard-red.txt" <<'EOF'
A warped, half-melted red keycard. Smells like burnt plastic.
EOF
cat > "$R2/supplies/keycard-green.txt" <<'EOF'
A green keycard with a suspicious scorch mark. Dead.
EOF
cat > "$R2/supplies/keycard-blue.txt" <<'EOF'
BLUE MASTER KEYCARD — still warm from the charger. This one.
EOF

for i in 1 2 3 4; do
  echo "Decoy wire $i. Does nothing. Rip it all out." > "$R2/decoy-wires/wire-$i.txt"
done

cat > "$R2/unlock.sh" <<'EOF'
#!/usr/bin/env bash
# Room 2 door mechanism
HERE="$HOME/escape-night/room-2-maintenance"
ok=1

if [ ! -d "$HERE/slot" ]; then
  echo "CLUNK. There's still no slot on this door. (Step 1: mkdir)"
  ok=0
elif [ ! -f "$HERE/slot/keycard.txt" ]; then
  echo "CLUNK. The slot is empty, or the card inside isn't named"
  echo "exactly keycard.txt. (Steps 2-3: cp, then mv to rename.)"
  ok=0
elif ! grep -qi "BLUE MASTER" "$HERE/slot/keycard.txt"; then
  echo "BZZZT. The slot spits the card back out. Wrong card —"
  echo "the maintenance log says which one survived."
  ok=0
fi

if [ -d "$HERE/decoy-wires" ]; then
  echo "SPARKS! The decoy wiring shorts the lock. It has to go —"
  echo "all of it. (Step 4 — it's a directory.)"
  ok=0
fi

if [ ! -f "$HERE/supplies/keycard-blue.txt" ]; then
  echo "Hm — the original blue card is GONE from supplies/. You"
  echo "moved it instead of copying. The building wants it back:"
  echo "copy your card back into supplies/ as keycard-blue.txt."
  ok=0
fi

if [ "$ok" -eq 1 ]; then
  cat <<'DONE'
==============================================================
  KA-CHUNK. The maintenance door swings open.
  CODE WORD 2 of 4:   NOUNDO
==============================================================
NEXT ROOM:
    cd ~/escape-night/room-3-comms
    cat door.txt
DONE
fi
EOF

# ------------------------------------------------------------
# ROOM 3 — Comms (less / tail -f / nano)
# ------------------------------------------------------------
R3="$BASE/room-3-comms"
mkdir -p "$R3"

cat > "$R3/door.txt" <<'EOF'
ROOM 3 — THE COMMS ROOM

The exit here is voice-locked. The code word comes in TWO
HALVES:

  FIRST HALF  — buried at the very bottom of the emergency
                manual. It's long. Don't cat it — page through
                it:   less manual.txt
                (space = next page, q = quit. It is not frozen.)

  SECOND HALF — arrives over the radio. Start the radio with:
                    bash antenna.sh
                then OPEN A SECOND TERMINAL and listen live:
                    tail -f ~/escape-night/room-3-comms/signal.log
                Watch the noise. One transmission is real.
                (Ctrl+C stops tail when you have it.)

Then answer the voice lock: use nano to create a file named
reply.txt in this room containing the FULL code word (both
halves joined together, no space, all caps) on one line.
Save with Ctrl+O + Enter, exit with Ctrl+X.

Finally, transmit your answer:   bash transmit.sh
EOF

{
  echo "CHIEFOS EMERGENCY MANUAL — REV 14 — READ IN FULL"
  echo "=============================================="
  for i in $(seq 1 180); do
    case $((i % 6)) in
      0) echo "$i. In case of fire, do not use the elevator. Use the stairs." ;;
      1) echo "$i. Reboot procedure: hold the button. Count to ten. Regret." ;;
      2) echo "$i. The coffee machine is not a server. Stop plugging it in." ;;
      3) echo "$i. If a terminal looks frozen, it is probably a pager. Press q." ;;
      4) echo "$i. Backup tapes are in the basement. The basement is locked." ;;
      5) echo "$i. Never run commands you do not understand. Especially that one." ;;
    esac
  done
  echo "=============================================="
  echo "APPENDIX Z — VOICE LOCK, FIRST HALF OF CODE:  PRESS"
  echo "(second half arrives by radio — see the door instructions)"
} > "$R3/manual.txt"

cat > "$R3/antenna.sh" <<'EOF'
#!/usr/bin/env bash
# Room 3 radio — writes to signal.log for ~45 seconds.
LOG="$HOME/escape-night/room-3-comms/signal.log"
: > "$LOG"
echo "Radio warming up... listen in another terminal with:"
echo "    tail -f $LOG"
(
  msgs=(
    "...static..."
    "...krrrzzt..."
    "mayday mayday is anyone --krzzt--"
    "...static..."
    "the vending machine on floor 2 is out of order"
    "...krrrzzt..."
    ">>> VOICE LOCK, SECOND HALF OF CODE:  Q  <<<"
    "...static..."
    "repeat: second half is the letter Q. Just Q. That's it."
    "...krrrzzt..."
    "...static..."
    "radio battery dying... rerun antenna.sh to hear it again..."
  )
  for m in "${msgs[@]}"; do
    sleep 4
    echo "[radio] $m" >> "$LOG"
  done
) &
disown
echo "(Radio is live. It runs for about 45 seconds, then dies.)"
EOF

cat > "$R3/transmit.sh" <<'EOF'
#!/usr/bin/env bash
# Room 3 voice lock
HERE="$HOME/escape-night/room-3-comms"
if [ ! -f "$HERE/reply.txt" ]; then
  echo "The voice lock waits. There is no reply.txt yet — write"
  echo "one with nano (see door.txt)."
  exit 0
fi
if grep -q "PRESSQ" "$HERE/reply.txt"; then
  cat <<'DONE'
==============================================================
  "...voice pattern accepted." The comms door unseals.
  CODE WORD 3 of 4:   PRESSQ
==============================================================
NEXT ROOM:
    cd ~/escape-night/room-4-vault
    cat door.txt
DONE
else
  echo "\"...voice pattern NOT recognized.\" The lock wants both"
  echo "halves joined, no space, ALL CAPS, on one line. Edit"
  echo "reply.txt in nano and transmit again."
fi
EOF

# ------------------------------------------------------------
# ROOM 4 — The Vault (ls -l / chmod / chown / sudo)
# ------------------------------------------------------------
R4="$BASE/room-4-vault"
mkdir -p "$R4"

cat > "$R4/door.txt" <<'EOF'
ROOM 4 — THE VAULT

The final code word is split across two lockboxes. Neither
will open until the permissions say you can read them.

Start by LOOKING at the locks:
    ls -l

  LOCKBOX A — vault-a.txt
    Look at its permission string. Nobody can read it. Not
    even you, and you OWN it. Fix its mode with chmod so that
    you (the owner) can read it — then cat it.

  LOCKBOX B — vault-b.txt
    Look at the owner column. If it isn't you, you can't chmod
    it — first take ownership (that needs sudo), then make it
    readable, then cat it.
    Forgot sudo? "Operation not permitted." Everyone does it
    once — that's the lesson.

When you have BOTH halves, walk out and read the final door:
    cat ~/escape-night/FINAL-DOOR.txt
EOF

cat > "$R4/vault-a.txt" <<'EOF'
LOCKBOX A — first half of the final code word:  ROOT
EOF
chmod 000 "$R4/vault-a.txt"

cat > "$R4/vault-b.txt" <<'EOF'
LOCKBOX B — second half of the final code word:  ACCESS
(Join the halves: that's code word 4. Now for the exit.)
EOF

# Lock box B as root if sudo is available; otherwise fall back
# to a mode-only lock so the room still works.
# Owner only (no ":root" group) — macOS has no group named root.
if sudo -v 2>/dev/null && sudo chown root "$R4/vault-b.txt" 2>/dev/null; then
  sudo chmod 600 "$R4/vault-b.txt"
  echo "(Vault sealed with root ownership — sudo worked.)"
else
  chmod 000 "$R4/vault-b.txt"
  echo "(sudo not available — vault-b sealed with chmod 000 instead.)"
fi

# ------------------------------------------------------------
# FINAL DOOR — nano + chmod +x
# ------------------------------------------------------------
cat > "$BASE/FINAL-DOOR.txt" <<'EOF'
==============================================================
                      THE FINAL DOOR
==============================================================
The exit computer wants two things:

1. AN ESCAPE PLAN. Using nano, create a file in ~/escape-night
   named escape-plan.txt containing your FOUR code words, in
   room order, ONE PER LINE, ALL CAPS. (For room 4, join the
   two halves into one word.) Save and exit.

2. Next to this note is the exit program:  escape
   Check it with ls -l — notice there is no x anywhere in its
   permission string. It's a program that nobody is allowed to
   RUN. Give yourself execute permission with chmod, then
   run it:
       ./escape
==============================================================
EOF

cat > "$BASE/escape" <<'EOF'
#!/usr/bin/env bash
# The exit program.
PLAN="$HOME/escape-night/escape-plan.txt"
if [ ! -f "$PLAN" ]; then
  echo "The exit computer blinks: NO ESCAPE PLAN FOUND."
  echo "(It wants ~/escape-night/escape-plan.txt — see FINAL-DOOR.txt)"
  exit 0
fi
words=(NOMOUSE NOUNDO PRESSQ ROOTACCESS)
n=1
for w in "${words[@]}"; do
  if ! sed -n "${n}p" "$PLAN" | tr -d '[:space:]' | grep -qx "$w"; then
    echo "The exit computer blinks: PLAN REJECTED AT LINE $n."
    echo "(Four code words, room order, one per line, ALL CAPS."
    echo " Fix it in nano and run ./escape again.)"
    exit 0
  fi
  n=$((n+1))
done
cat <<'BANNER'

   ██████████████████████████████████████████████
   █                                            █
   █    THE EXIT DOOR ROLLS OPEN. COOL NIGHT    █
   █    AIR. YOU ESCAPED USING NOTHING BUT      █
   █    A KEYBOARD.                             █
   █                                            █
   █        -rwxr-x---  YOU CAN READ THIS.      █
   █        THAT'S WHY YOU'RE OUT.              █
   █                                            █
   █    COMPLETION CODE:  CTRL-O-CTRL-X-RWX     █
   █                                            █
   ██████████████████████████████████████████████

Screenshot this banner and post it in the Zoom chat.
Then flag the instructor and read your badge out loud:
    ls -l ~/escape-night/escape
Who can run this file? Owner? Group? Everyone?
BANNER
EOF
chmod 644 "$BASE/escape"

echo
echo "=============================================================="
echo " Escape room built. Begin with:"
echo "     cd ~/escape-night"
echo "     cat README.txt"
echo "=============================================================="
