# Lesson 01: Install Node.js with nvm

**By the end, you will have nvm installed, the latest LTS version of Node.js active, and `node`/`npm`/`npx` on your PATH.**

⏱ ~10 minutes of typing

> **nvm** (Node Version Manager) lets you install and switch between Node.js versions without sudo. It's the standard way to manage Node on a developer machine.

```instructor
Say: "nvm lets you install and switch Node versions without sudo. It's how every working dev machine handles Node — never `apt install nodejs`."
Mention: "After nvm installs, `node --version` may say 'command not found' in the SAME terminal. The shell hasn't sourced `.bashrc` yet — close and reopen, or `source ~/.bashrc`."
Pause: After `nvm install --lts` finishes. Have them open a fresh terminal and confirm `node`, `npm`, `npx` all work there. That's the test.
Say: "You're done when `node --version` prints v20.x.x or newer in a brand-new terminal AND `which node` points inside `~/.nvm/`, not `/usr/bin/`."
```

---

**1.** Make sure you're in your home directory.
```bash
cd ~
```

**2.** Install nvm using the official installer.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
You should see output ending with:
```
=> nvm source string already in /home/your-user/.bashrc
=> Close and reopen your terminal to start using nvm
```

**3.** Either close+reopen the terminal or source your shell config now.
```bash
source ~/.bashrc
```

**4.** Confirm nvm is loaded.
```bash
command -v nvm
```
```
nvm
```
(Expected output is the literal word `nvm` — it's a shell function, not a binary.)

**5.** See what Node versions nvm can install.
```bash
nvm ls-remote --lts | tail -n 10
```
You'll see a list of LTS versions.

**6.** Install the latest LTS.
```bash
nvm install --lts
```
You should see lines about downloading and installing, ending with:
```
Now using node v20.x.x (npm v10.x.x)
```

**7.** Mark it as the default for new shells.
```bash
nvm alias default lts/*
```

**8.** Confirm Node and npm work.
```bash
node --version
npm --version
npx --version
```
You should see three version numbers (e.g. `v20.11.0`, `10.2.4`, `10.2.4`).

**9.** See where they live (under your home, not system paths).
```bash
which node npm npx
```
```
/home/your-user/.nvm/versions/node/v20.11.0/bin/node
/home/your-user/.nvm/versions/node/v20.11.0/bin/npm
/home/your-user/.nvm/versions/node/v20.11.0/bin/npx
```

**10.** Run a one-liner to confirm Node is working end to end.
```bash
node -e "console.log('node ok:', process.version)"
```
```
node ok: v20.11.0
```

**11.** Configure npm to use a sensible cache location (optional but tidy).
```bash
npm config set fund false
npm config set audit false
```
(Disables nag messages on every install.)

**12.** Log it.
```bash
echo "Node installed: $(node --version), npm $(npm --version)" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`nvm` is a shell function, not a binary.** `which nvm` returns nothing — that's correct. Use `command -v nvm` to verify it exists.
- **Every new terminal sources `~/.bashrc`** which sources nvm. If a fresh terminal can't find Node, check that `~/.bashrc` has the nvm block (it should — the installer added it).
- **Don't `sudo npm install -g`.** When npm wants to write to a system path, that's a sign your nvm setup isn't active. Fix nvm; don't sudo around it.
- **WSL users:** the same nvm setup works in WSL exactly like native Linux. Don't try to use a Windows-side Node.

---

## Checkpoint

```bash
node --version && npm --version && npx --version
```
Should print three version numbers.

```bash
which node | grep -q '\.nvm' && echo "OK: nvm-managed"
```
Should print `OK: nvm-managed`.

```bash
node -e "console.log(2 + 2)"
```
Should print `4`.

---

**Next up:** [02-init-heroui-app.md](02-init-heroui-app.md) — Init the HeroUI starter project
