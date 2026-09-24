# Lesson 06: Connecting over SSH

**Time:** ~20 min

```instructor
Say: "SSH gives you a terminal on a remote computer. The Cursor extension goes further — your editor opens remote files too, like the remote is your laptop."
Mention: "When the prompt asks 'Are you sure you want to continue connecting (yes/no/[fingerprint])?' they MUST type `yes`. Pressing Enter alone does nothing — there's no default."
Pause: After everyone connects — remind them every terminal they open from now on is on the remote. Otherwise they'll wonder later why their local files vanished.
Say: "You're done when the bottom-left shows SSH: hostname on green AND `hostname` / `whoami` in the terminal print the remote's values, not your laptop's."
```

## What is SSH?

**SSH** stands for **Secure Shell**. It is the standard way to connect to and control a remote computer over the network. You sit at your laptop, run an SSH command, type a password (or use a key), and you get a terminal on the remote computer — as if you were sitting in front of it.

The Cursor **Remote - SSH** extension takes this one step further: not only do you get a remote terminal, you also get the editor working on the remote files. You edit a file in Cursor, the file lives on the remote, and you can run it in a remote terminal — all without leaving your local Cursor window.

## Before you start

Your instructor will give you the exact connection details for today:

- **Host:** `<INSTRUCTOR-PROVIDED>` — e.g. `ec2-12-34-56-78.compute.amazonaws.com`
- **User:** `<INSTRUCTOR-PROVIDED>` — e.g. `student`
- **Auth:** either a **password** or an **SSH key file** the instructor sent you.

Write these down before you go further.

## Step 1: install the Remote - SSH extension

1. Open the extensions side bar (`Ctrl+Shift+X`).
2. Search for **Remote - SSH**.
3. Publisher: **Microsoft**, id `ms-vscode-remote.remote-ssh`.
4. Click **Install**.

## Step 2 (key auth only): place your key file

If your instructor gave you a **password**, skip this step.

If they gave you a **key file** (a small file usually named like `student_key` or `id_ed25519` with no extension):

1. Save the file to:
   - **Windows:** `C:\Users\<You>\.ssh\` — create the `.ssh` folder if it doesn't exist.
   - **Mac/Linux:** `~/.ssh/`
2. **Mac/Linux only:** in a terminal, run:
   ```
   chmod 600 ~/.ssh/<your-key-filename>
   ```
   This locks down the file's permissions so SSH will accept it. SSH refuses keys that anyone else can read.
3. **Windows:** if Windows complains about permissions later, right-click the key file → Properties → Security → Advanced → "Disable inheritance" → "Remove all" → then add yourself with Read access only.

## Step 3: connect

1. In Cursor, click the **bottom-left corner** button (the `><` angle brackets) — same place as the WSL button.
2. From the dropdown choose **"Connect to Host…"** (or "Remote-SSH: Connect to Host…").
3. Choose **"Add New SSH Host…"**.
4. Type the SSH command exactly as your instructor gave it. For password auth:
   ```
   ssh student@ec2-12-34-56-78.compute.amazonaws.com
   ```
   For key auth:
   ```
   ssh -i ~/.ssh/student_key student@ec2-12-34-56-78.compute.amazonaws.com
   ```
   (Substitute the real values your instructor gave you.)
5. Press Enter.
6. Cursor asks where to save the SSH config. Pick the first option (your user `~/.ssh/config`).
7. Click the bottom-left button again → "Connect to Host…" → your new host should be in the list. Click it.

## Step 4: trust and authenticate

The first time you connect to a new host, two things happen:

1. A prompt appears: **"The authenticity of host ... can't be established. Are you sure you want to continue connecting (yes/no/[fingerprint])?"** Type **`yes`** and press Enter. (Pressing Enter alone without typing yes does nothing — the question doesn't have a default.)
2. If you used password auth, a password prompt appears. Type the password (it won't show on screen) and press Enter.

Cursor's bottom-left now reads **"SSH: <hostname>"** on green. You are connected.

## Step 5: open a folder on the remote

1. **File → Open Folder…**
2. The path bar shows paths on the **remote** machine, not your laptop. Navigate to your home directory there (something like `/home/student/`).
3. Click **OK**.

## Step 6: confirm the terminal is on the remote

1. Open the integrated terminal (`` Ctrl+` ``).
2. The prompt should look like:
   ```
   student@ec2-12-34-56-78:~$
   ```
   That hostname is the **remote** machine, not your laptop.
3. Run:
   ```
   hostname
   ```
   The output should be the remote's hostname.
4. Run:
   ```
   whoami
   ```
   The output should be the username your instructor gave you (e.g. `student`).

If both are correct: every command you run in this terminal runs on the remote. Every file you save in this Cursor window saves to the remote. Your laptop is now a thin client.

## Disconnecting

Click the bottom-left **"SSH: ..."** button → **"Close Remote Connection"**. Cursor reloads back to your local environment. The remote keeps running; you just stopped talking to it.

## Checkpoint

You're done when:

- [ ] You installed the **Remote - SSH** extension by **Microsoft**.
- [ ] You added the instructor-provided host as an SSH target.
- [ ] The bottom-left of your Cursor window shows **"SSH: <hostname>"** on green.
- [ ] You opened a folder on the remote machine.
- [ ] You ran `hostname` and `whoami` in the integrated terminal and the output matches the remote.

If you get a `Permission denied (publickey)` error, your key isn't being used or its permissions are wrong — flag the instructor.
