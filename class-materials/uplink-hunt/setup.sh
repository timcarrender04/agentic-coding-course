#!/usr/bin/env bash
# ============================================================
#  SIGNAL LOST — "Operation Uplink"
#  Week 4 live lab · Agentic Coding
#
#  Students run:   bash setup.sh     (never with sudo — this
#                                     game never asks for one)
#  Rebuild fresh:  bash setup.sh --reset
#
#  Builds a four-station scavenger hunt under ~/uplink-hunt/
#  using ONLY skills from labs 01:06–10:
#    Station 1  ip a / ss -tuln / curl / dig    (networking, 01:07)
#    Station 2  ps aux | grep                   (processes,  01:08)
#    Station 3  grep | cut | sort | uniq -c     (pipes,      01:09)
#    Station 4  chmod + /etc/passwd via cut     (users, 01:10 + 06)
#  Finale: the console validates the four fragments, then the
#  crew fires three test packets at the beacon.
# ============================================================
set -euo pipefail

BASE="$HOME/uplink-hunt"

if [ "$(id -u)" -eq 0 ]; then
  echo "Do NOT run this with sudo. Run it as yourself: bash setup.sh"
  echo "(This game never needs root. Not even once.)"
  exit 1
fi

if [ "${1:-}" = "--reset" ]; then
  pkill -f "$BASE/.machinery" 2>/dev/null || true
  rm -rf "$BASE"
  echo "Old station demolished. Machinery powered down. Rebuilding..."
elif [ -d "$BASE" ]; then
  echo "~/uplink-hunt already exists."
  echo "To start over from scratch, run:  bash setup.sh --reset"
  exit 1
fi

mkdir -p "$BASE/station-1-antenna" "$BASE/station-2-relay" \
         "$BASE/station-3-logs" "$BASE/station-4-crew" \
         "$BASE/.machinery/httpdocs"

# ------------------------------------------------------------
# Base README — the story and the first instruction
# ------------------------------------------------------------
cat > "$BASE/README.txt" <<'EOF'
==============================================================
     SIGNAL LOST · OPERATION UPLINK  ·  RELAY STATION 4
==============================================================

02:13. Saboteurs hit Relay Station 4 overnight and cut the
uplink to the outside world. Tomorrow the Docker shipment
arrives — and it travels over THIS link. No uplink, no
shipment.

The four station subsystems each hold ONE FRAGMENT of the
console's restart sequence:

    Station 1 — the Antenna Array
    Station 2 — the Relay Rack
    Station 3 — the Log Archive
    Station 4 — the Crew Deck

Recover all four fragments, feed them to the uplink console,
and fire three test packets at the beacon. Three echoes home
= the uplink lives.

RULES
 - Everything happens inside ~/uplink-hunt/ . Nothing outside
   it ever needs to be touched or deleted.
 - The .machinery bay is SEALED. Off-limits. Snooping in there
   voids your completion code.
 - Every station is solvable with commands from labs 01:07-10.
 - Stuck? Read the briefing again — or read what your last
   command actually printed. The answer is there. It always is.

FIRST: bring the generators back online.

    cd ~/uplink-hunt
    bash power.sh
==============================================================
EOF

# ------------------------------------------------------------
# power.sh — students start (and restart) the machinery
# in-story. Idempotent: kills old machinery, relaunches fresh.
# ------------------------------------------------------------
cat > "$BASE/power.sh" <<'POWERSH'
#!/usr/bin/env bash
# Relay Station 4 — backup generators.
# Run me any time the machinery goes quiet:  bash power.sh
BASE="$HOME/uplink-hunt"
MACH="$BASE/.machinery"

# Power-cycle: kill any machinery from a previous power-up.
pkill -f "$MACH" 2>/dev/null || true
sleep 1

if ! command -v python3 >/dev/null 2>&1; then
  echo "ANTENNA HARDWARE MISSING (python3 is not installed)."
  echo "Install it the way you've installed everything else:"
  echo "    sudo apt install -y python3"
  echo "then run:  bash power.sh  again."
  exit 0
fi

# Pick the beacon's frequency (fall back if a port is taken).
PORT=""
for p in 8412 8421 8437; do
  if ! ss -tuln 2>/dev/null | grep -q ":$p "; then
    PORT="$p"
    break
  fi
done
if [ -z "$PORT" ]; then
  echo "All backup frequencies are jammed (ports 8412/8421/8437 busy)."
  echo "Close whatever is using them, then run bash power.sh again."
  exit 0
fi
echo "$PORT" > "$MACH/port"

nohup setsid python3 -m http.server "$PORT" --bind 127.0.0.1 \
  --directory "$MACH/httpdocs" >/dev/null 2>&1 &
disown 2>/dev/null || true

nohup setsid bash "$MACH/relay.sh" \
  "FRAGMENT-2:HEARTBEAT" "NEXT:station-3-logs" >/dev/null 2>&1 &
disown 2>/dev/null || true

# Give the beacon a moment to bind its port before declaring victory.
sleep 1

if ! ss -tuln 2>/dev/null | grep -q ":$PORT "; then
  echo "Antenna failed to lock onto frequency $PORT."
  echo "Try:  bash power.sh  again. If it keeps failing, flag the instructor."
  exit 0
fi

echo "=============================================================="
echo " Generators humming. Station machinery is back online."
echo ""
echo " If the power ever flickers (something that should be running"
echo " has gone quiet), just run:  bash power.sh  again."
echo ""
if ! command -v dig >/dev/null 2>&1; then
  echo " NOTE: Station 1 will ask you to dig. Install it now:"
  echo "     sudo apt install -y dnsutils"
  echo ""
fi
echo " Begin your sweep:"
echo "     cd ~/uplink-hunt/station-1-antenna"
echo "     cat briefing.txt"
echo "=============================================================="
POWERSH

# ------------------------------------------------------------
# Machinery: the backup relay (station 2's clue lives in this
# process's ARGUMENTS, visible only in the process table) and
# the beacon file served by the http server (station 1's clue).
# ------------------------------------------------------------
cat > "$BASE/.machinery/relay.sh" <<'RELAYSH'
#!/usr/bin/env bash
# Relay unit RS4-B. Do not power off.
# Hums for 4 hours, then goes back to sleep on its own.
sleep 14400
RELAYSH

cat > "$BASE/.machinery/httpdocs/beacon.txt" <<'EOF'
==============================================================
  EMERGENCY BEACON · RELAY STATION 4 · AUTOMATED BROADCAST
==============================================================
You found the beacon's frequency. Transmission follows:

  FRAGMENT 1 of 4:   HANDSHAKE

Write it down. The console wants all four at the very end.

One more thing, operator: the saboteurs WIPED THE UPLINK
TARGET ADDRESS from the console. Intelligence says the beacon
operator answers to the name  dns.google  — recover their
address yourself:

    dig +short dns.google

WRITE THAT ADDRESS DOWN. You cannot fire without it.

NEXT STATION:
    cd ~/uplink-hunt/station-2-relay
    cat briefing.txt
==============================================================
EOF

# ------------------------------------------------------------
# STATION 1 — The Antenna Array (ip a / ss -tuln / curl / dig)
# ------------------------------------------------------------
cat > "$BASE/station-1-antenna/briefing.txt" <<'EOF'
STATION 1 — THE ANTENNA ARRAY

The dish survived. The saboteurs cut the console's uplink, but
an automated EMERGENCY BEACON is still transmitting somewhere
on THIS machine.

  1. Confirm the antenna has power. Look at your machine's
     network interfaces and find your inet address:
         ip a

  2. The beacon broadcasts on a TCP port somewhere ABOVE 8400.
     Only ports that are LISTENING will show. Sweep for it:
         ss -tuln

  3. Tune in. Ask the beacon for its message (fill in the
     port you just found):
         curl http://localhost:<port>/beacon.txt

The beacon tells you everything else — including something
the console will demand from you later. Do what it says.

Nothing above 8400 on the sweep? The power may have flickered:
    cd ~/uplink-hunt && bash power.sh
EOF

# ------------------------------------------------------------
# STATION 2 — The Relay Rack (ps aux | grep)
# ------------------------------------------------------------
cat > "$BASE/station-2-relay/briefing.txt" <<'EOF'
STATION 2 — THE RELAY RACK

The saboteurs killed the main relay, but the night crew swears
a BACKUP RELAY is still running — somewhere in this machine's
process table. It answers to the name "relay".

  1. Find it:
         ps aux | grep relay

     Remember lab 01:08 — one of those lines is always your
     own grep. The REAL relay is a bash process carrying TWO
     pieces of cargo in its arguments. Read them: that's your
     fragment AND your next heading.

  2. Log the station's vitals for the incident report (this
     part is a report, not a puzzle):
         systemctl is-active cron
         uptime
         free -h

     If systemctl prints an error on your machine, that is a
     FINDING, not a failure. Note it and move on.

No relay in the process table? The power may have flickered:
    cd ~/uplink-hunt && bash power.sh
EOF

# ------------------------------------------------------------
# STATION 3 — The Log Archive (grep / cut / sort / uniq -c)
# ------------------------------------------------------------
cat > "$BASE/station-3-logs/briefing.txt" <<'EOF'
STATION 3 — THE LOG ARCHIVE

Every packet the station handled last night landed in
uplink.log — and the saboteur's traffic landed with it.
Each line reads:  source:status:message

  1. Size up the archive first:
         wc -l uplink.log
     Far too big to read. That is what pipes are for.

  2. Corrupt packets carry the saboteur's fingerprint. Count
     the CORRUPT packets per source and see who flooded us:
         grep CORRUPT uplink.log | cut -d: -f1 | sort | uniq -c | sort -rn
     The name towering over that list is your saboteur.

  3. The saboteur slipped ONCE. Exactly one of their packets
     went out CLEAN — and your third fragment is inside it.
     Find that line.

     Careful: machines care about case. Spies don't.
     (grep -i searches case-insensitively.
      grep -v CORRUPT throws the garbage away.)

The clean packet tells you where to go next.
EOF

# ------------------------------------------------------------
# uplink.log — 350 lines, colon-delimited. Source "ghost"
# floods CORRUPT lines; exactly one CLEAN line (capital G)
# hides mid-file with fragment 3.
# ------------------------------------------------------------
{
  echo "UPLINK TRANSMISSION ARCHIVE — RELAY STATION 4 — RAW CAPTURE"
  echo "==========================================================="
  for i in $(seq 1 348); do
    if [ "$i" -eq 177 ]; then
      echo "Ghost:CLEAN:fragment three is NEEDLE - proceed to station-4-crew"
      continue
    fi
    case $((i % 12)) in
      0)  echo "antenna:OK:carrier stable at $((i % 40 + 10)) dB" ;;
      1)  echo "ghost:CORRUPT:x7F x00 x00 xDE xAD signal injection" ;;
      2)  echo "dish:OK:azimuth locked" ;;
      3)  echo "ghost:CORRUPT:packet flood on backup channel" ;;
      4)  echo "console:OK:operator heartbeat received" ;;
      5)  echo "ghost:CORRUPT:checksum mismatch - payload is garbage" ;;
      6)  echo "relay:OK:frame $i relayed clean" ;;
      7)  echo "ghost:CORRUPT:repeated login probe rejected" ;;
      8)  echo "dish:OK:telemetry nominal" ;;
      9)  echo "antenna:CORRUPT:burst static during storm cell" ;;
      10) echo "console:OK:watchdog timer reset" ;;
      11) echo "relay:CORRUPT:buffer overrun - frame dropped" ;;
    esac
  done
} > "$BASE/station-3-logs/uplink.log"

# ------------------------------------------------------------
# STATION 4 — The Crew Deck (chmod + id/groups + cut on passwd)
# ------------------------------------------------------------
cat > "$BASE/station-4-crew/briefing.txt" <<'EOF'
STATION 4 — THE CREW DECK

The sealed personnel orders survived the sabotage — but the
seal is still on.

  1. Look at the lock BEFORE you touch it:
         ls -la
         stat -c "%a" sealed-orders.txt
     (stat prints 0 — that is mode 000: no read, no write,
      no run, for anyone.)
     Nobody can read that file. Not even you — and you OWN it.

  2. You own it, so you decide who reads it (lab 01:06).
     Break the seal so the owner can read the file, then
     read it:
         cat sealed-orders.txt

The orders contain your final fragment — and your orders.
EOF

cat > "$BASE/station-4-crew/sealed-orders.txt" <<'EOF'
==============================================================
   SEALED ORDERS · RELAY STATION 4 · CREW EYES ONLY
==============================================================
IDENTITY CHECK first. Prove who you are and what you are
cleared for:
    id
    groups
(If "sudo" appears in your groups, you hold admin clearance.
 You will not need it tonight — a real operator knows when
 NOT to reach for root.)

THE FOURTH FRAGMENT was never written down. It is the name of
the crew member that has executed every order you typed
tonight. Find it on YOUR line of the ship's manifest:

    grep "^$USER:" /etc/passwd | cut -d: -f7

The LAST WORD of that path, ALL CAPS, is fragment 4.

FINAL ORDERS:
    cd ~/uplink-hunt
    cat UPLINK-CONSOLE.txt
==============================================================
EOF
chmod 000 "$BASE/station-4-crew/sealed-orders.txt"

# ------------------------------------------------------------
# THE UPLINK CONSOLE — final door
# ------------------------------------------------------------
cat > "$BASE/UPLINK-CONSOLE.txt" <<'EOF'
==============================================================
                     THE UPLINK CONSOLE
==============================================================
The console wants two things:

1. THE FRAGMENT SEQUENCE. Using nano, create a file here in
   ~/uplink-hunt named  answers.txt  containing your FOUR
   fragments, in station order, ONE PER LINE, ALL CAPS.
   Save with Ctrl+O + Enter, exit with Ctrl+X.

2. Load the sequence into the console:
       bash transmit.sh

   If the console accepts all four fragments, it will ARM —
   and tell you how to fire. Keep the beacon address you
   recovered at Station 1 within reach.

BOTH crew members fire from their own machine. A crew is done
when TWO banners are in the Zoom chat.
==============================================================
EOF

cat > "$BASE/transmit.sh" <<'TRANSMITSH'
#!/usr/bin/env bash
# The uplink console. Load the fragment sequence, then fire.
BASE="$HOME/uplink-hunt"
PLAN="$BASE/answers.txt"

# Fragment 4 adapts to the operator's own login shell.
SHELL_PATH="$(grep "^$USER:" /etc/passwd | cut -d: -f7)"
FRAG4="$(basename "$SHELL_PATH" | tr '[:lower:]' '[:upper:]')"

check_answers() {
  if [ ! -f "$PLAN" ]; then
    echo "The console blinks: NO FRAGMENT SEQUENCE LOADED."
    echo "(It wants ~/uplink-hunt/answers.txt — four fragments,"
    echo " station order, one per line, ALL CAPS. Write it with"
    echo " nano. See UPLINK-CONSOLE.txt.)"
    return 1
  fi
  local words=(HANDSHAKE HEARTBEAT NEEDLE "$FRAG4")
  local n=1
  local w
  for w in "${words[@]}"; do
    if ! sed -n "${n}p" "$PLAN" | tr -d '[:space:]' | grep -qx "$w"; then
      echo "The console blinks: FRAGMENT REJECTED AT LINE $n."
      echo "(Four fragments, station order, one per line, ALL CAPS."
      echo " Line $n is wrong or missing — Station $n holds that"
      echo " answer. Fix answers.txt in nano and try again.)"
      return 1
    fi
    n=$((n+1))
  done
  return 0
}

if [ "${1:-}" = "--fire" ]; then
  check_answers || exit 0
  ADDR="${2:-}"
  if [ -z "$ADDR" ]; then
    echo "The dish waits. Fire at WHAT? Usage:"
    echo "    bash transmit.sh --fire <beacon-address>"
    echo "(Station 1 showed you how to recover the beacon's address.)"
    exit 0
  fi
  case "$ADDR" in
    8.8.8.8|8.8.4.4) ;;
    *)
      echo "The dish swings around... and points at nothing."
      echo "That is not the beacon. Station 1 knows how to find it —"
      echo "the beacon operator's NAME resolves to it. Dig it up."
      exit 0
      ;;
  esac
  echo "Dish aimed at $ADDR. Firing three test packets..."
  echo
  out="$(ping -c 3 "$ADDR" 2>&1)"
  status=$?
  echo "$out"
  echo
  if [ "$status" -eq 0 ] && echo "$out" | grep -q " 0% packet loss"; then
    cat <<'BANNER'
   ██████████████████████████████████████████████
   █                                            █
   █    UPLINK RESTORED. 3 PACKETS OUT,         █
   █    3 ECHOES HOME. RELAY STATION 4 IS       █
   █    BACK ON THE GRID.                       █
   █                                            █
   █    NEXT WEEK, DOCKER RIDES THIS LINK.      █
   █                                            █
   █    COMPLETION CODE:  UPLINK-3X3-0LOSS      █
   █                                            █
   ██████████████████████████████████████████████

Screenshot this banner and post it in the Zoom chat.
BOTH crew members must fire — a crew is done when two
banners are in the chat.
BANNER
  elif echo "$out" | grep -qi "not permitted"; then
    echo "The dish fired... and the packets never left the building."
    echo "Your ping lacks raw-socket clearance (a rare WSL build)."
    echo "Try:   sudo ping -c 3 $ADDR"
    echo "If THAT works, flag the instructor — you've earned the code."
  else
    echo "The uplink is still dark. The console did its job — the"
    echo "problem is now on YOUR side of the dish. Check your Wi-Fi,"
    echo "check your VPN, then fire again. This is real network"
    echo "triage: welcome to operations."
  fi
  exit 0
fi

if check_answers; then
  echo "=============================================================="
  echo "  FRAGMENTS ACCEPTED. CONSOLE ARMED."
  echo ""
  echo "  Aim the dish at the beacon you recovered at Station 1:"
  echo "      bash transmit.sh --fire <beacon-address>"
  echo "=============================================================="
fi
TRANSMITSH

echo
echo "=============================================================="
echo " Relay Station 4 is planted. Do NOT enter before class."
echo " At go-time:"
echo "     cd ~/uplink-hunt"
echo "     cat README.txt"
echo "=============================================================="
