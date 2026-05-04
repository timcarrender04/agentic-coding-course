# Lesson 07: Gitea Account and SSH Key

**By the end, you will have a Gitea account, an SSH key on your machine, and that key registered with Gitea so you can push without typing a password.**

⏱ ~20 minutes of typing + clicking

> **Gitea** is a self-hosted Git service. Your instructor runs an instance for the class. The web UI looks like a stripped-down GitHub — repos, issues, pull requests, the works.

---

## Step 1: log in to Gitea

**1.** Open your browser. Go to:
```
<INSTRUCTOR-PROVIDED-GITEA-URL>
```
(Your instructor will give you the exact URL.)

**2.** Sign in with the credentials your instructor gave you. If self-registration is enabled, the instructor will tell you to "Sign up" instead.

**3.** Use the **same email** you set in `git config --global user.email` (lesson 01). Mismatched emails create commits that don't link to your profile.

**4.** Once logged in, look at the top-right of the page — your username should appear. Click it → **Settings** → confirm your email matches.

---

## Step 2: generate an SSH key (if you don't have one)

**5.** Back in Cursor's integrated terminal. Check whether you already have a key.
```bash
ls ~/.ssh/id_ed25519.pub 2>/dev/null
```
If you see a path printed, you already have a key — **skip to Step 3**.

**6.** Generate one. The `-t ed25519` picks a modern key type. The `-C "..."` is just a label.
```bash
ssh-keygen -t ed25519 -C "you@example.com"
```

**7.** Three prompts:
   - **"Enter file in which to save the key"** — press Enter to accept the default `~/.ssh/id_ed25519`.
   - **"Enter passphrase"** — for this course, press Enter twice for no passphrase. (In real life, set one.)
   - **"Enter same passphrase again"** — Enter again.

**8.** Output:
```
Your identification has been saved in /home/your-user/.ssh/id_ed25519
Your public key has been saved in /home/your-user/.ssh/id_ed25519.pub
The key fingerprint is: SHA256:...
```

**9.** Confirm both files exist.
```bash
ls -la ~/.ssh/id_ed25519*
```
You should see two files: `id_ed25519` (private) and `id_ed25519.pub` (public).

**10.** **The private key never leaves your machine.** Permissions should be `600` (owner read/write only). Verify.
```bash
ls -la ~/.ssh/id_ed25519
```
The permissions should look like `-rw-------`.

**11.** If they're not, fix them.
```bash
chmod 600 ~/.ssh/id_ed25519
```

---

## Step 3: copy the public key

**12.** Print the **public** key (the `.pub` file).
```bash
cat ~/.ssh/id_ed25519.pub
```
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... you@example.com
```

**13.** Select that entire line in your terminal and copy it (right-click → Copy, or Ctrl+Shift+C in most terminals).

---

## Step 4: register the key on Gitea

**14.** In your browser, go to **Gitea → top-right avatar → Settings → SSH / GPG Keys**.

**15.** Click **Add Key** (under "Manage SSH Keys").

**16.** Fill in:
   - **Key name:** something like `course-laptop`. (Just a label for you.)
   - **Content:** paste the entire public key line from step 13.

**17.** Click **Add Key**. The key should appear in the list.

---

## Step 5: test the SSH connection

**18.** Test from the terminal. Replace `<gitea-host>` with just the hostname part of the URL (e.g. `gitea.example.com`, no `https://`).
```bash
ssh -T git@<gitea-host>
```

**19.** First time, you'll see:
```
The authenticity of host '<gitea-host>' can't be established.
ED25519 key fingerprint is SHA256:...
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
Type `yes` and press Enter. (Don't just press Enter — there's no default.)

**20.** Successful auth looks like:
```
Hi <your-username>! You've successfully authenticated, but Gitea does not provide shell access.
```
**That message means it worked.** Gitea won't give you a shell, but it confirmed your identity.

**21.** If instead you see `Permission denied (publickey)`:
   - Make sure you pasted the **public** key (`.pub` file), not the private one.
   - Make sure you pasted the **whole line**, including `ssh-ed25519` at the start and the email at the end.
   - Run `ssh -vT git@<gitea-host>` to see verbose output.

**22.** Log it.
```bash
echo "Gitea SSH auth: working ($(ssh -T git@<gitea-host> 2>&1 | head -n 1))" >> ~/docker-course/notes/notes.txt
```
(Replace `<gitea-host>` in the command above with your real one.)

---

## ⚠️ Watch out

- **Public vs private key.** You paste the `.pub` file's contents into Gitea. Never paste the private key (`id_ed25519` without `.pub`). The private key stays on your machine forever.
- **Some classroom networks block outbound port 22.** If `ssh -T` hangs, ask the instructor whether to use the alternate Gitea SSH port (sometimes 2222) or fall back to HTTPS pushes with a personal access token. The instructor will tell you the workaround.
- **Email mismatch.** If your Gitea email doesn't match `git config --global user.email`, Gitea won't link your commits to your profile. Fix one or the other to match.

---

## Checkpoint

```bash
ls ~/.ssh/id_ed25519.pub
```
Should print the path.

```bash
ssh -T git@<gitea-host>
```
Should print `Hi <username>! You've successfully authenticated...`.

In the Gitea web UI, your SSH key should appear at **Settings → SSH / GPG Keys** with the name you gave it.

---

**Next up:** [08-pushing-to-gitea.md](08-pushing-to-gitea.md) — Push your repo to Gitea
