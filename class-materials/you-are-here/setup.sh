#!/usr/bin/env bash
# ============================================================
#  YOU ARE HERE
#  Week 2 Wednesday activity · Agentic Coding
#
#  Students run:   bash setup.sh
#  Rebuild fresh:  bash setup.sh --reset
#
#  One building under ~/you-are-here/ . WSL or Mac.
#  No SSH. No sudo. Nothing to install.
#
#  Floors, in order:
#    1 Wrong Door     where the lab actually lives
#    2 Home Button    bare cd
#    3 Dotfile        ls vs ls -la
#    4 Stairs         cd /tmp and cd -
#    5 Route          home → /etc → /usr → home → /
#    6 Callback       three paths, home between each
#  Group lock: bash ~/you-are-here/join.sh
#  Three seats, three machines. Floors refuse to open until
#  each person types the hostname, whoami, and badge the
#  other two read aloud. Seat 1 holds only the /etc call,
#  seat 2 only /usr, seat 3 only /var.
#  Then predict hostname / whoami / pwd / uname, then the banner.
# ============================================================
set -euo pipefail

BASE="$HOME/you-are-here"
NOTE="$HOME/.you-are-here"

if [ "$(id -u)" -eq 0 ]; then
  echo "Do NOT run this with sudo. Run it as yourself: bash setup.sh"
  echo "(This activity never needs a password.)"
  exit 1
fi

kernel=$(uname -s)
case "$kernel" in
  Linux|Darwin) ;;
  *)
    echo "This shell is not WSL or Mac (uname says: $kernel)."
    echo "Open the Ubuntu app on Windows, or Terminal on a Mac, then run:"
    echo "    bash setup.sh"
    exit 1
    ;;
esac

if [ "${1:-}" = "--reset" ]; then
  rm -rf "$BASE"
  rm -f "$NOTE"
  echo "Old building demolished. Rebuilding..."
elif [ -d "$BASE" ]; then
  echo "~/you-are-here already exists."
  echo "To start over from scratch, run:  bash setup.sh --reset"
  exit 1
fi

mkdir -p \
  "$BASE/wrong-door/windows-side/Users/Documents" \
  "$BASE/home-button" \
  "$BASE/dotfile" \
  "$BASE/stairs" \
  "$BASE/route" \
  "$BASE/return" \
  "$BASE/.stamps"

# ------------------------------------------------------------
# Shared helpers — no hints, no fragments
# ------------------------------------------------------------
cat > "$BASE/.lib.sh" <<'LIB'
# Path helpers for You Are Here.
canon() {
  local logical physical home_physical
  logical=$(pwd)
  physical=$(pwd -P)
  home_physical=$(cd "$HOME" && pwd -P)
  if [ "$logical" = "$HOME" ] || [ "$physical" = "$home_physical" ]; then
    printf 'HOME\n'
    return
  fi
  case "$logical" in
    /etc|/private/etc) printf '/etc\n'; return ;;
    /tmp|/private/tmp) printf '/tmp\n'; return ;;
    /usr) printf '/usr\n'; return ;;
    /var|/private/var) printf '/var\n'; return ;;
    /) printf '/\n'; return ;;
  esac
  case "$physical" in
    /etc|/private/etc) printf '/etc\n'; return ;;
    /tmp|/private/tmp) printf '/tmp\n'; return ;;
    /usr) printf '/usr\n'; return ;;
    /var|/private/var) printf '/var\n'; return ;;
    /) printf '/\n'; return ;;
  esac
  printf '%s\n' "$logical"
}

norm_crew() {
  printf '%s' "$1" | tr '[:upper:]' '[:lower:]' | tr -s ' _' '-' | tr -cd 'a-z0-9-'
}

norm_id() {
  printf '%s' "$1" | tr '[:upper:]' '[:lower:]' | tr -cd 'a-z0-9._-'
}

badge_for() {
  local crew="$1" seat="$2" host user sum alphabet n out i
  host=$(norm_id "$3")
  user=$(norm_id "$4")
  sum=$(printf '%s|%s|%s|%s|you-are-here' "$crew" "$seat" "$host" "$user" | cksum | awk '{print $1}')
  alphabet=ABCDEFGHJKLMNPQRSTUVWXYZ23456789
  n=${#alphabet}
  out=
  i=0
  while [ "$i" -lt 4 ]; do
    out="${out}${alphabet:$((sum % n)):1}"
    sum=$((sum / n))
    i=$((i + 1))
  done
  printf '%s\n' "$out"
}

crew_ready() {
  local lock="$HOME/you-are-here/.locked"
  local crew seat mine line pseat host user badge want
  if [ ! -f "$lock" ]; then
    echo "The crew has not rolled in. Floors stay locked until all three seats join."
    echo "On EACH machine:"
    echo "    bash ~/you-are-here/join.sh"
    return 1
  fi
  crew=$(sed -n '1p' "$lock")
  seat=$(sed -n '2p' "$lock")
  mine=$(sed -n '3p' "$lock")
  want=$(badge_for "$crew" "$seat" "$(hostname)" "$(whoami)")
  if [ "$mine" != "$want" ]; then
    echo "Your crew lock does not match this machine."
    echo "    bash ~/you-are-here/join.sh --redo"
    return 1
  fi
  n=0
  while IFS= read -r line; do
    [ -z "$line" ] && continue
    n=$((n + 1))
    pseat=${line%% *}
    host=$(printf '%s\n' "$line" | awk '{print $2}')
    user=$(printf '%s\n' "$line" | awk '{print $3}')
    badge=$(printf '%s\n' "$line" | awk '{print $4}')
    want=$(badge_for "$crew" "$pseat" "$host" "$user")
    if [ "$badge" != "$want" ]; then
      echo "A saved partner badge no longer checks out."
      echo "    bash ~/you-are-here/join.sh --redo"
      return 1
    fi
  done < <(sed -n '4,5p' "$lock")
  if [ "$n" -ne 2 ]; then
    echo "Crew lock is incomplete. All three seats have to check in."
    echo "    bash ~/you-are-here/join.sh --redo"
    return 1
  fi
  return 0
}

award() {
  local word="$1"
  if ! crew_ready; then
    return 1
  fi
  mkdir -p "$HOME/you-are-here/.stamps"
  : > "$HOME/you-are-here/.stamps/$word"
  printf '\n==============================================================\n'
  printf '  FRAGMENT: %s\n' "$word"
  printf '  Read it to the other two seats. Wait until they have it too.\n'
  printf '==============================================================\n'
  return 0
}
LIB

# ------------------------------------------------------------
# README — story and the first move only
# ------------------------------------------------------------
cat > "$BASE/README.txt" <<'EOF'
==============================================================
                    YOU ARE HERE
==============================================================

The directory signs fell off the ChiefOS lab building.
Security will not open the lab until your whole crew can
prove, out loud, where they are.

Six floors. Then you say what the machine will print
before it prints it. Then the banner.

This is a crew of THREE. One person cannot open the floors.
Each machine is a seat: 1, 2, or 3. You will get a badge.
The other two read theirs out loud. You type what you heard.
Until that checks out, every floor refuses you.

RULES
 - Every person runs this on their OWN machine.
 - Seats are 1, 2, and 3. One seat per machine.
 - A floor counts when ALL THREE have its fragment.
 - WSL or Mac. This building does not use SSH.
 - Coach with words. Nobody types on a teammate's keyboard.
 - Commands you need: pwd, ls, ls -la, cd, cd -, hostname,
   whoami, uname. Nothing else. No sudo.
 - Read the floor. It tells you the next command.
 - Wrecked a floor? From your home directory:
       bash setup.sh --reset
   (Use the same setup.sh you downloaded.)

BEFORE YOU MOVE — say it, then prove it.

  Say "WSL" if this is Ubuntu on a Windows laptop.
  Say "Mac" if this is a Mac.

    hostname
    whoami
    uname -a

  Linux  = you are in WSL.
  Darwin = you are on a Mac.

Then roll the crew in. All three machines:

    bash ~/you-are-here/join.sh

When join.sh says the crew is locked, take the first floor:

    cd ~/you-are-here/wrong-door
    cat briefing.txt
==============================================================
EOF

# ------------------------------------------------------------
# Floor 1 — Wrong Door
# ------------------------------------------------------------
cat > "$BASE/wrong-door/windows-side/Users/Documents/EMPTY.txt" <<'EOF'
This Documents folder is empty.

Your lab files did not vanish. They were never here.
This is the wrong side of the building.
EOF

cat > "$BASE/wrong-door/briefing.txt" <<'EOF'
FLOOR 1 — THE WRONG DOOR

Somebody opened the wrong side of the machine and swore
their files had vanished. They had not. The lab lives in
your home: /home/... on WSL, /Users/... on a Mac.
A path that starts with /mnt is the Windows drive.

Walk through the wrong door and look:

    cd windows-side
    ls
    cat Users/Documents/EMPTY.txt
    bash look.sh

Come back out to THIS folder (pwd should end in wrong-door)
and stamp it:

    cd ..
    pwd
    bash stamp.sh

The stamp prints your fragment. Read it to the crew.
EOF

cat > "$BASE/wrong-door/windows-side/look.sh" <<'LOOK'
#!/usr/bin/env bash
BASE="$HOME/you-are-here/wrong-door/windows-side"
here=$(pwd)
phys=$(pwd -P)
if [ "$here" != "$BASE" ] && [ "$phys" != "$BASE" ]; then
  echo "You are not standing in the wrong door."
  echo "    cd ~/you-are-here/wrong-door/windows-side"
  echo "    bash look.sh"
  exit 0
fi
if [ ! -f "$BASE/Users/Documents/EMPTY.txt" ]; then
  echo "The empty Documents folder is missing. Ask for a reset."
  exit 0
fi
: > "$HOME/you-are-here/wrong-door/.saw-wrong-side"
echo "Empty. Your files did not vanish — this was never the lab."
echo "WSL: /mnt is the Windows drive. Your lab is /home/..."
echo "Mac: your lab is /Users/..."
echo ""
echo "Step back out and stamp the floor:"
echo "    cd .."
echo "    bash stamp.sh"
LOOK

cat > "$BASE/wrong-door/stamp.sh" <<'STAMP'
#!/usr/bin/env bash
# shellcheck source=/dev/null
. "$HOME/you-are-here/.lib.sh"
BASE="$HOME/you-are-here/wrong-door"
here=$(pwd)
phys=$(pwd -P)
if [ "$here" != "$BASE" ] && [ "$phys" != "$BASE" ]; then
  echo "Stamp this floor from the wrong-door folder itself, not from inside it."
  echo "pwd says: $here"
  echo "    cd ~/you-are-here/wrong-door"
  echo "    bash stamp.sh"
  exit 0
fi
if [ ! -f "$BASE/.saw-wrong-side" ]; then
  echo "You have not looked through the wrong door yet."
  echo "    cd windows-side"
  echo "    cat Users/Documents/EMPTY.txt"
  echo "    bash look.sh"
  exit 0
fi
award HERE || exit 0
echo "Next floor:"
echo "    cd ~/you-are-here/home-button"
echo "    cat briefing.txt"
STAMP

# ------------------------------------------------------------
# Floor 2 — Home Button
# ------------------------------------------------------------
cat > "$BASE/home-button/briefing.txt" <<'EOF'
FLOOR 2 — THE HOME BUTTON

From anywhere in the building, one command takes you home.
No path. No tilde (~). Two letters and Enter.

    cd

Prove where you landed:

    pwd
    bash ~/you-are-here/home-button/stamp.sh

pwd must be exactly your home directory.
EOF

cat > "$BASE/home-button/stamp.sh" <<'STAMP'
#!/usr/bin/env bash
# shellcheck source=/dev/null
. "$HOME/you-are-here/.lib.sh"
where=$(canon)
if [ "$where" != "HOME" ]; then
  echo "You are not home. pwd says:"
  pwd
  echo "From anywhere, type cd and nothing else. Then run this again."
  exit 0
fi
award BARE || exit 0
echo "A note is hidden in this home directory."
echo "ls will not show it. ls -la will."
echo "Find the name that contains you-are-here, then cat that file."
STAMP

# ------------------------------------------------------------
# Floor 3 — Dotfile  (the note itself lives at ~/.you-are-here)
# ------------------------------------------------------------
cat > "$NOTE" <<'EOF'
You found the hidden note. Plain ls walked past it.
ls -la did not.

Now name ONE real dotfile that was already in your home
— not this note. Run ls -la and pick a name that starts
with a dot. On WSL that is often .bashrc. On a Mac it
might be .zshrc or .zsh_history.

    bash ~/you-are-here/dotfile/stamp.sh NAME

Example, if .bashrc is really there:

    bash ~/you-are-here/dotfile/stamp.sh .bashrc
EOF

cat > "$BASE/dotfile/stamp.sh" <<'STAMP'
#!/usr/bin/env bash
# shellcheck source=/dev/null
. "$HOME/you-are-here/.lib.sh"

if [ "$(canon)" != "HOME" ]; then
  echo "Run this from home. Bare cd, then try again."
  echo "pwd says: $(pwd)"
  exit 0
fi

shopt -s nullglob
others=()
for f in "$HOME"/.[!.]* "$HOME"/..?*; do
  base=${f##*/}
  [ "$base" = ".you-are-here" ] && continue
  others+=("$base")
done

name="${1:-}"
if [ -z "$name" ]; then
  if [ "${#others[@]}" -eq 0 ]; then
    echo "This home has no other dotfiles. The hidden note counts."
    award DOT || exit 0
    echo "Next floor:"
    echo "    cd ~/you-are-here/stairs"
    echo "    cat briefing.txt"
    exit 0
  fi
  echo "Pass the name of a real dotfile. ls -la first."
  echo "    bash ~/you-are-here/dotfile/stamp.sh NAME"
  exit 0
fi

case "$name" in
  .|..|.you-are-here)
    echo "That one doesn't count. Name a dotfile that was already yours."
    exit 0
    ;;
  .*)
    ;;
  *)
    echo "Dotfiles start with a dot. ls -la and try the name you see."
    exit 0
    ;;
esac

if [ ! -e "$HOME/$name" ]; then
  echo "No file named $name in your home. ls -la and use a name that is there."
  exit 0
fi

award DOT || exit 0
echo "You named: $name"
echo "Next floor:"
echo "    cd ~/you-are-here/stairs"
echo "    cat briefing.txt"
STAMP

# ------------------------------------------------------------
# Floor 4 — Stairs  (cd /tmp, then cd -)
# ------------------------------------------------------------
cat > "$BASE/stairs/briefing.txt" <<'EOF'
FLOOR 4 — THE STAIRS

One terminal. Do not open a second one — the stairs forget
you if you do.

From THIS folder:

    cd /tmp
    bash ~/you-are-here/stairs/drop.sh

Come back without retyping the path. The only legal return
is:

    cd -

Then, back on the stairs:

    bash stamp.sh

On a Mac, /tmp may look like /private/tmp. That is the
same room. The stamp knows.

Mac Terminal (zsh) hides the hop from the script. If the
stamp says it does not remember /tmp, run this instead:

    OLDPWD="$OLDPWD" bash stamp.sh
EOF

cat > "$BASE/stairs/drop.sh" <<'DROP'
#!/usr/bin/env bash
# shellcheck source=/dev/null
. "$HOME/you-are-here/.lib.sh"
if [ "$(canon)" != "/tmp" ]; then
  echo "Drop the token from /tmp. pwd says:"
  pwd
  echo "    cd /tmp"
  echo "    bash ~/you-are-here/stairs/drop.sh"
  exit 0
fi
: > "$HOME/you-are-here/stairs/.dropped"
echo "Token dropped in /tmp."
echo "Return in ONE command. Do not retype the path:"
echo "    cd -"
echo "Then:"
echo "    bash stamp.sh"
echo "Mac Terminal: if the stamp forgets the hop, run:"
echo "    OLDPWD=\"\$OLDPWD\" bash stamp.sh"
DROP

cat > "$BASE/stairs/stamp.sh" <<'STAMP'
#!/usr/bin/env bash
# shellcheck source=/dev/null
. "$HOME/you-are-here/.lib.sh"
BASE="$HOME/you-are-here/stairs"
here=$(pwd)
phys=$(pwd -P)
if [ "$here" != "$BASE" ] && [ "$phys" != "$BASE" ]; then
  echo "You are not back on the stairs. pwd says:"
  pwd
  echo "If you are still in /tmp, return with:  cd -"
  exit 0
fi
if [ ! -f "$BASE/.dropped" ]; then
  echo "No token yet. From the stairs: cd /tmp, then bash drop.sh."
  exit 0
fi
# $1 lets a Mac zsh pass the hop in: bash stamp.sh "$OLDPWD"
# OLDPWD="$OLDPWD" bash stamp.sh works on a lab already built.
old="${1:-${OLDPWD:-}}"
old_ok=0
case "$old" in
  /tmp|/private/tmp) old_ok=1 ;;
esac
if [ "$old_ok" -ne 1 ] && [ -n "$old" ]; then
  old_phys=$(cd "$old" 2>/dev/null && pwd -P || true)
  case "$old_phys" in
    /tmp|/private/tmp) old_ok=1 ;;
  esac
fi
if [ "$old_ok" -ne 1 ]; then
  echo "The stairs don't remember a hop from /tmp."
  echo "Same terminal:  cd /tmp    then    cd -"
  echo "Then run bash stamp.sh again."
  echo "On a Mac, zsh hides that hop. From the stairs run:"
  echo "    OLDPWD=\"\$OLDPWD\" bash stamp.sh"
  exit 0
fi
award HOP || exit 0
echo "Next floor:"
echo "    cd ~/you-are-here/route"
echo "    cat briefing.txt"
STAMP

# ------------------------------------------------------------
# Floor 5 — Route
# ------------------------------------------------------------
cat > "$BASE/route/briefing.txt" <<'EOF'
FLOOR 5 — THE ROUTE

No mouse. Five stops, in this order. pwd after every hop.
At each stop, run the scout.

    1. home     (bare cd)
    2. /etc
    3. /usr
    4. home     (bare cd again)
    5. /

At every stop:

    pwd
    bash ~/you-are-here/route/scout.sh

Lost the count? The scout tells you the next stop.
Start over:  bash ~/you-are-here/route/scout.sh --reset
EOF

cat > "$BASE/route/scout.sh" <<'SCOUT'
#!/usr/bin/env bash
# shellcheck source=/dev/null
. "$HOME/you-are-here/.lib.sh"
stepfile="$HOME/you-are-here/route/.step"
if [ "${1:-}" = "--reset" ]; then
  rm -f "$stepfile"
  echo "Route cleared. Stop 1 is home. Bare cd, pwd, then scout again."
  exit 0
fi
step=0
if [ -f "$stepfile" ]; then
  step=$(cat "$stepfile")
fi
where=$(canon)
# 0 home, 1 /etc, 2 /usr, 3 home, 4 /
want=""
label=""
case "$step" in
  0) want="HOME"; label="home (bare cd)" ;;
  1) want="/etc"; label="/etc" ;;
  2) want="/usr"; label="/usr" ;;
  3) want="HOME"; label="home (bare cd)" ;;
  4) want="/"; label="/" ;;
  *)
    echo "Route already finished. Next floor is the callback."
    echo "    cd ~/you-are-here/return"
    echo "    cat briefing.txt"
    exit 0
    ;;
esac
if [ "$where" != "$want" ]; then
  n=$((step + 1))
  echo "Stop $n of 5 wants $label."
  echo "pwd says: $(pwd)"
  exit 0
fi
step=$((step + 1))
printf '%s\n' "$step" > "$stepfile"
echo "Stop $step of 5 stamped. pwd: $(pwd)"
if [ "$step" -lt 5 ]; then
  case "$step" in
    1) echo "Next: /etc" ;;
    2) echo "Next: /usr" ;;
    3) echo "Next: home (bare cd)" ;;
    4) echo "Next: /" ;;
  esac
  exit 0
fi
award ROUTE || exit 0
echo "Next floor:"
echo "    cd ~/you-are-here/return"
echo "    cat briefing.txt"
SCOUT

# ------------------------------------------------------------
# Floor 6 — Callback
# ------------------------------------------------------------
cat > "$BASE/return/briefing.txt" <<'EOF'
FLOOR 6 — THE CALLBACK

Your calls.txt has ONE path. The other two paths are on
the other two seats. Ask them. Do not guess, and do not
open anybody else's files.

The seat who owns the next path reads it out loud.
Everybody types it on their own machine:

    cd THATPATH
    ls
    bash ~/you-are-here/return/mark.sh
    cd
    bash ~/you-are-here/return/home.sh

Home BETWEEN each call. Not after all three.
Come home with bare cd — no path, no tilde.

Your card:

    cat ~/you-are-here/return/calls.txt

Lost?  bash ~/you-are-here/return/home.sh --reset
EOF

cat > "$BASE/return/mark.sh" <<'MARK'
#!/usr/bin/env bash
# shellcheck source=/dev/null
. "$HOME/you-are-here/.lib.sh"
state="$HOME/you-are-here/return/.state"
mkdir -p "$state"
touch "$state/marks"
where=$(canon)
case "$where" in
  /etc|/usr|/var) ;;
  *)
    echo "This is not a call on the card. pwd says: $(pwd)"
    echo "Navigator: read the next CALL from calls.txt."
    exit 0
    ;;
esac
if grep -qx "$where" "$state/marks"; then
  echo "$where is already marked. Bare cd, then bash home.sh."
  exit 0
fi
printf '%s\n' "$where" >> "$state/marks"
echo "Marked $where."
echo "Come home before the next call:"
echo "    cd"
echo "    bash ~/you-are-here/return/home.sh"
MARK

cat > "$BASE/return/home.sh" <<'HOME'
#!/usr/bin/env bash
# shellcheck source=/dev/null
. "$HOME/you-are-here/.lib.sh"
state="$HOME/you-are-here/return/.state"
mkdir -p "$state"
touch "$state/marks"
if [ "${1:-}" = "--reset" ]; then
  rm -f "$state/marks" "$state/homes"
  echo "Callback cleared. Seat 1 reads the first path from their card."
  exit 0
fi
if [ "$(canon)" != "HOME" ]; then
  echo "You are not home. Bare cd, then run home.sh again."
  echo "pwd says: $(pwd)"
  exit 0
fi
marks=$(grep -c . "$state/marks" || true)
homes=0
if [ -f "$state/homes" ]; then
  homes=$(cat "$state/homes")
fi
if [ "$marks" -eq "$homes" ]; then
  echo "Visit the next path on calls.txt, mark it, then come home."
  echo "Marked: $marks    Home checks: $homes"
  exit 0
fi
if [ "$marks" -gt $((homes + 1)) ]; then
  echo "You visited more than one floor without coming home."
  echo "That's the panic this floor is for. Reset and do them one at a time:"
  echo "    bash ~/you-are-here/return/home.sh --reset"
  exit 0
fi
homes=$((homes + 1))
printf '%s\n' "$homes" > "$state/homes"
echo "Home check $homes of 3. pwd: $(pwd)"
if [ "$homes" -lt 3 ]; then
  echo "Navigator: call the next path."
  exit 0
fi
award BACK || exit 0
echo "Last door. Same terminal. Say each answer BEFORE Enter."
echo "    bash ~/you-are-here/predict.sh"
HOME

# ------------------------------------------------------------
# Predict, then banner
# ------------------------------------------------------------
cat > "$BASE/predict.sh" <<'PREDICT'
#!/usr/bin/env bash
# shellcheck source=/dev/null
. "$HOME/you-are-here/.lib.sh"
if [ ! -f "$HOME/you-are-here/.stamps/BACK" ]; then
  echo "Finish the six floors first. The callback stamp is still missing."
  exit 0
fi
say() {
  printf '\nPREDICT — say it out loud, then press Enter.\n'
  printf '  %s\n' "$1"
  read -r _
  echo "-------- machine says --------"
}

say "hostname"
hostname
say "whoami"
whoami
say "pwd"
pwd
say "uname -a"
uname -a

echo "--------"
kernel=$(uname -s)
case "$kernel" in
  Linux)  echo "Linux. If this laptop is Windows, you say: WSL." ;;
  Darwin) echo "Darwin. You say: Mac." ;;
  *)      echo "uname says $kernel. Tell the crew what you are on." ;;
esac
award SAID || exit 0
echo "Open the lab:"
echo "    bash ~/you-are-here/banner.sh"
PREDICT

cat > "$BASE/banner.sh" <<'BANNER'
#!/usr/bin/env bash
BASE="$HOME/you-are-here/.stamps"
missing=0
need() {
  local word="$1" floor="$2"
  if [ ! -f "$BASE/$word" ]; then
    echo "  still open: $floor"
    missing=1
  fi
}
echo "Checking the building..."
need HERE "Floor 1  Wrong Door"
need BARE "Floor 2  Home Button"
need DOT  "Floor 3  Dotfile"
need HOP  "Floor 4  Stairs"
need ROUTE "Floor 5  Route"
need BACK "Floor 6  Callback"
need SAID "Front desk  predict.sh"
if [ "$missing" -ne 0 ]; then
  echo "The lab door stays shut until those are done."
  exit 0
fi
kernel=$(uname -s)
call="this machine"
case "$kernel" in
  Linux) call="WSL" ;;
  Darwin) call="Mac" ;;
esac
echo "=============================================================="
echo "                      YOU ARE HERE"
echo "=============================================================="
echo "  HERE   BARE   DOT   HOP   ROUTE   BACK   SAID"
echo
echo "  say this : $call"
echo "  machine  : $(hostname)"
echo "  user     : $(whoami)"
echo "  where    : $(pwd)"
echo "  system   : $(uname -s)"
echo
echo "  Screenshot this banner into the Zoom chat."
echo "  The crew is done when EVERY machine shows it,"
echo "  and the three screens name each other."
echo "=============================================================="
if [ -f "$HOME/you-are-here/.locked" ]; then
  echo "  crew  : $(sed -n '1p' "$HOME/you-are-here/.locked")"
  echo "  seat  : $(sed -n '2p' "$HOME/you-are-here/.locked")"
  echo "  badge : $(sed -n '3p' "$HOME/you-are-here/.locked")"
  echo "  with  : $(sed -n '4p' "$HOME/you-are-here/.locked")"
  echo "          $(sed -n '5p' "$HOME/you-are-here/.locked")"
  echo "=============================================================="
fi
BANNER

# ------------------------------------------------------------
# Crew lock — three seats, three machines, one shared name
# ------------------------------------------------------------
cat > "$BASE/join.sh" <<'JOIN'
#!/usr/bin/env bash
# shellcheck source=/dev/null
. "$HOME/you-are-here/.lib.sh"

lock="$HOME/you-are-here/.locked"
card() {
  echo "=============================================================="
  echo "  CREW  $(sed -n '1p' "$lock")"
  echo "  SEAT  $(sed -n '2p' "$lock")"
  echo "  READ THIS, do not type it on their machines:"
  echo "    hostname : $(hostname)"
  echo "    whoami   : $(whoami)"
  echo "    badge    : $(sed -n '3p' "$lock")"
  echo "=============================================================="
}

if [ "${1:-}" = "--redo" ]; then
  rm -f "$lock" "$HOME/you-are-here/return/calls.txt"
  echo "Crew lock cleared. Run:  bash ~/you-are-here/join.sh"
  exit 0
fi

if [ -f "$lock" ] && crew_ready; then
  echo "This machine is already in the crew."
  card
  echo "Partners:"
  sed -n '4,5p' "$lock"
  echo "Redo only if the crew name was wrong:  bash ~/you-are-here/join.sh --redo"
  exit 0
fi

ask() {
  local ans
  printf '%s' "$1" >/dev/tty
  if ! read -r ans </dev/tty; then
    echo "This step needs a person at the keyboard."
    exit 1
  fi
  printf '%s\n' "$ans"
}

echo "=============================================================="
echo "  ROLL CALL — three machines, or the floors stay shut"
echo "=============================================================="
echo "Agree on a crew name out loud. All three type the same name."
raw=$(ask "Crew name: ")
crew=$(norm_crew "$raw")
if [ -z "$crew" ]; then
  echo "That name disappeared when it was cleaned up. Use letters. Try again."
  exit 1
fi
echo "Crew id on this machine: $crew"
echo "The other two must see that same id."
echo
echo "Seats are 1, 2, and 3. One per machine. Say yours, then type it."
seat=$(ask "Your seat (1, 2, or 3): ")
seat=$(printf '%s' "$seat" | tr -cd '0-9')
case "$seat" in
  1|2|3) ;;
  *)
    echo "Seat must be 1, 2, or 3."
    exit 1
    ;;
esac

mine=$(badge_for "$crew" "$seat" "$(hostname)" "$(whoami)")
printf '%s\n' "$crew" > "$lock.tmp"
printf '%s\n' "$seat" >> "$lock.tmp"
printf '%s\n' "$mine" >> "$lock.tmp"
mv "$lock.tmp" "$lock.card"
# Show the card before partners are stored. crew_ready is not passed yet.
echo
echo "=============================================================="
echo "  SEAT $seat    BADGE  $mine"
echo "  hostname : $(hostname)"
echo "  whoami   : $(whoami)"
echo "=============================================================="
echo "Read those three lines to the other seats."
echo "Wait until both of them can read theirs back."
echo

myhost=$(norm_id "$(hostname)")
myuser=$(norm_id "$(whoami)")
for other in 1 2 3; do
  [ "$other" = "$seat" ] && continue
  echo "---- seat $other, from THEIR screen ----"
  host=$(ask "Their hostname: ")
  user=$(ask "Their whoami: ")
  badge=$(ask "Their badge: ")
  host=$(norm_id "$host")
  user=$(norm_id "$user")
  badge=$(printf '%s' "$badge" | tr '[:lower:]' '[:upper:]' | tr -cd 'A-Z0-9')
  if [ -z "$host" ] || [ -z "$user" ] || [ -z "$badge" ]; then
    echo "Missing a line. Ask seat $other to read hostname, whoami, and badge again."
    rm -f "$lock.card"
    exit 1
  fi
  if [ "$host" = "$myhost" ] && [ "$user" = "$myuser" ]; then
    echo "That is this machine. Seat $other is somebody else."
    rm -f "$lock.card"
    exit 1
  fi
  want=$(badge_for "$crew" "$other" "$host" "$user")
  if [ "$badge" != "$want" ]; then
    echo "That badge does not match seat $other."
    echo "Check the crew id ($crew), then have them re-read hostname, whoami, and badge."
    echo "Run this again:  bash ~/you-are-here/join.sh"
    rm -f "$lock.card"
    exit 1
  fi
  printf '%s %s %s %s\n' "$other" "$host" "$user" "$badge" >> "$lock.card"
  echo "Seat $other checks out."
  echo
done

mv "$lock.card" "$lock"

case "$seat" in
  1) call="/etc" ;;
  2) call="/usr" ;;
  3) call="/var" ;;
esac
cat > "$HOME/you-are-here/return/calls.txt" <<EOF
YOUR CALL ONLY. You are seat $seat of crew $crew.
Read this path when the crew asks. Do not guess the others.

CALL $seat:  $call
EOF

echo "=============================================================="
echo "  CREW $crew IS LOCKED ON THIS MACHINE"
echo "  Your callback path is $call — the others have the rest."
echo "=============================================================="
echo "First floor, on every machine:"
echo "    cd ~/you-are-here/wrong-door"
echo "    cat briefing.txt"
JOIN

chmod +x \
  "$BASE/join.sh" \
  "$BASE/wrong-door/windows-side/look.sh" \
  "$BASE/wrong-door/stamp.sh" \
  "$BASE/home-button/stamp.sh" \
  "$BASE/dotfile/stamp.sh" \
  "$BASE/stairs/drop.sh" \
  "$BASE/stairs/stamp.sh" \
  "$BASE/route/scout.sh" \
  "$BASE/return/mark.sh" \
  "$BASE/return/home.sh" \
  "$BASE/predict.sh" \
  "$BASE/banner.sh"

echo "=============================================================="
echo " Building raised at ~/you-are-here"
echo " Machine: $kernel"
if [ "$kernel" = "Linux" ]; then
  echo " Say it in the crew: WSL"
else
  echo " Say it in the crew: Mac"
fi
echo
echo " Do not explore yet. Wait until the clock starts."
echo " When it does, three machines join before any floor opens:"
echo "     cd ~/you-are-here"
echo "     cat README.txt"
echo "     bash ~/you-are-here/join.sh"
echo "=============================================================="
