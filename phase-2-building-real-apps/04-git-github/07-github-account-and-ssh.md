# Lesson 07: GitHub Account and SSH

**By the end, you will have a free GitHub account, an SSH key on your machine, and that key registered with GitHub so you can push without typing a password.**

⏱ ~20 minutes of typing + clicking

> **GitHub** is the largest Git host in the world — the same site most companies and open-source projects use. Your course repos will be **public**, on purpose: classmates can browse, clone, and review each other's work, exactly like real open source.

```instructor
Say: "GitHub is where most of the world's code lives. You're making a free account, and your course repos will be public — that's deliberate, so you can browse and clone each other's work."
Mention: "If `ssh -T git@github.com` fails with 'Permission denied (publickey)', the public key didn't get added to GitHub or the wrong key is being offered. The success message is 'Hi <username>! You've successfully authenticated...'"
Pause: After they add the public key. Have every student run `ssh -T git@github.com` and read the success line back to you. If anyone's failing, fix it now — every later lesson assumes push works.
Say: "You're done when `ssh -T git@github.com` greets them by username and the key shows up at github.com → Settings → SSH and GPG keys."
```

---

## Step 1: create your GitHub account

**1.** Open your browser. Go to:
```
https://github.com/signup
```
(If you already have a GitHub account, sign in and skip to step 4.)

**2.** Use the **same email** you set in `git config --global user.email` (lesson 01). Mismatched emails create commits that don't link to your profile.

**3.** Pick a username carefully. It will be **public** — visible to classmates now and to future employers later. Something professional based on your name beats `xX_c0d3r_Xx`. Complete the email verification GitHub sends you.

**4.** Once logged in, look at the top-right of the page — your avatar should appear. Click it → **Settings** → **Emails** → confirm your email matches the one from lesson 01.

---

## Step 2: generate an SSH key (if you don't have one)

**5.** Back in VS Code's integrated terminal. Check whether you already have a key.
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

## Step 4: register the key on GitHub

**14.** In your browser, go to **github.com → top-right avatar → Settings → SSH and GPG keys**.

**15.** Click **New SSH key** (the green button).

**16.** Fill in:
   - **Title:** something like `course-laptop`. (Just a label for you.)
   - **Key type:** leave as **Authentication Key**.
   - **Key:** paste the entire public key line from step 13.

**17.** Click **Add SSH key**. GitHub may ask you to re-enter your password to confirm. The key should appear in the list.

---

## Step 5: test the SSH connection

**18.** Test from the terminal.
```bash
ssh -T git@github.com
```

**19.** First time, you'll see:
```
The authenticity of host 'github.com (140.82.x.x)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
Type `yes` and press Enter. (Don't just press Enter — there's no default.)

**20.** Successful auth looks like:
```
Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
```
**That message means it worked.** GitHub won't give you a shell, but it confirmed your identity.

**21.** If instead you see `Permission denied (publickey)`:
   - Make sure you pasted the **public** key (`.pub` file), not the private one.
   - Make sure you pasted the **whole line**, including `ssh-ed25519` at the start and the email at the end.
   - Check the private key's permissions (`chmod 600 ~/.ssh/id_ed25519` — SSH refuses keys that other users can read).
   - Run `ssh -vT git@github.com` to see verbose output.

**22.** Log it.
```bash
echo "GitHub SSH auth: working ($(ssh -T git@github.com 2>&1 | head -n 1))" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Public vs private key.** You paste the `.pub` file's contents into GitHub. Never paste the private key (`id_ed25519` without `.pub`). The private key stays on your machine forever. If you accidentally pasted the private key anywhere, delete that key pair and generate a new one.
- **Wrong key permissions.** If the private key is readable by anyone else (`-rw-r--r--`), SSH silently refuses to use it. `chmod 600 ~/.ssh/id_ed25519` fixes it.
- **Some classroom networks block outbound port 22.** If `ssh -T` hangs, GitHub offers SSH over port 443: test with `ssh -T -p 443 git@ssh.github.com`. Ask the instructor before setting that up permanently.
- **Email mismatch.** If your GitHub email doesn't match `git config --global user.email`, GitHub won't link your commits to your profile. Fix one or the other to match.

---

## Checkpoint

```bash
ls ~/.ssh/id_ed25519.pub
```
Should print the path.

```bash
ssh -T git@github.com
```
Should print `Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.`

In the GitHub web UI, your SSH key should appear at **Settings → SSH and GPG keys** with the title you gave it.

---

**Next up:** [08-pushing-to-github.md](08-pushing-to-github.md) — Push your repo to GitHub
