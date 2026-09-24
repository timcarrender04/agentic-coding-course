# Lesson 05: Connecting to WSL

**Time:** ~20 min

> **This lesson is for Windows students only.** Mac and Linux students: you already have a real Unix terminal — skip ahead to lesson 06, or pair up with a Windows neighbor and help them.

```instructor
Say: "Windows students only. Mac and Linux already have a real Unix terminal — pair with a Windows neighbor or jump to lesson 06."
Mention: "When Ubuntu asks for a Linux password, it does NOT echo what they type — no asterisks, no dots. Warn them before they type or they'll think the keyboard is broken."
Pause: After the bottom-left changes to green 'WSL: Ubuntu' — make every student point at their indicator before moving on. That's the only proof they're really inside WSL.
Say: "You're done when the bottom-left shows WSL: Ubuntu on green AND `uname -a` in the terminal mentions Linux."
```

## What is WSL?

**WSL** stands for **Windows Subsystem for Linux**. It is a real Linux operating system that runs *inside* Windows, side by side with your normal Windows environment. You don't dual-boot, you don't run a VM in the old slow way — you just open WSL and you're in a Linux shell.

Why do we use WSL in this course? Because the rest of the course (Module 01 onward) assumes you have a Linux terminal. On Windows, the cleanest way to get one is WSL.

## Step 1: check whether WSL is installed

1. Open Windows **PowerShell** (press the Windows key, type "powershell", press Enter).
2. In PowerShell, type:
   ```
   wsl --status
   ```
3. Two outcomes:
   - **It prints version info** like "Default Distribution: Ubuntu" — WSL is installed. Skip to Step 3.
   - **It prints "WSL is not installed"** or an error — go to Step 2.

## Step 2: install WSL (if needed)

> Heads up: this requires a **reboot**. Your instructor will tell you whether to do this in class or at home.

1. In **PowerShell as administrator** (right-click PowerShell → "Run as administrator"), run:
   ```
   wsl --install
   ```
2. Wait for it to finish. It will install WSL and a default Ubuntu distribution.
3. **Reboot your computer.**
4. After reboot, Ubuntu will launch automatically and ask you to **create a Linux username and password.**
   - The password **does not show on screen** when you type — no asterisks, no dots, nothing. Just type it carefully and press Enter. Then confirm it.
   - Pick a simple lowercase username. It does **not** have to match your Windows username.
   - Remember this password. You'll need it for `sudo` commands in Module 01.
5. Once you see the Ubuntu prompt (`yourname@hostname:~$`), WSL is installed.

## Step 3: install the WSL extension in Cursor

1. Open Cursor.
2. Open the extensions side bar (`Ctrl+Shift+X`).
3. Search for **WSL**.
4. The one you want is published by **Microsoft**, full id `ms-vscode-remote.remote-wsl`.
5. Click **Install**.

## Step 4: connect Cursor to WSL

1. Look at the **bottom-left corner** of the Cursor window. There's a small green or blue button — it might just be two angle brackets `><`, or it might say something like "Open a Remote Window."
2. Click it.
3. A menu drops down from the top of the window. Choose **"Connect to WSL"** (or "WSL: Connect to WSL").
4. Cursor reloads. The bottom-left corner now shows **"WSL: Ubuntu"** (or whichever distro you have) on a green background.

You are now running Cursor's "remote" half inside WSL. Your editor is still on Windows; the files, terminal, and tools are all in Linux.

## Step 5: open a Linux folder

1. **File → Open Folder…**
2. The path bar should now show Linux paths. Navigate to `/home/<your-linux-username>/`.
3. Click **OK**.
4. The file explorer in the side bar fills with whatever is in your Linux home directory (probably empty or just a couple of dotfiles).

## Step 6: confirm the terminal is Linux

1. Open the integrated terminal (`` Ctrl+` ``).
2. The prompt should look like:
   ```
   yourname@hostname:~$
   ```
   That's a Linux prompt. Not `PS C:\>` — that would be PowerShell.
3. Type:
   ```
   uname -a
   ```
   The output should mention "Linux" somewhere. If it does, you really are inside WSL.

## Checkpoint

You're done when:

- [ ] `wsl --status` in PowerShell shows WSL is installed.
- [ ] You installed the **WSL** extension in Cursor (publisher Microsoft).
- [ ] The bottom-left of your Cursor window shows **"WSL: Ubuntu"** (or your distro name) on green.
- [ ] You opened a folder under `/home/<your-linux-username>/`.
- [ ] You opened the integrated terminal and ran `uname -a` and saw output containing "Linux."

If anything fails, raise your hand. WSL has more failure modes than the rest of the course combined and they're better to fix in person.
