# Lesson 06: Undoing Things

**By the end, you will know how to discard unsaved changes, unstage files, fix the last commit message, and (carefully) reset a commit.**

⏱ ~20 minutes of typing

> Almost every "I broke Git" panic is one of four problems. Each has a one-liner fix. Today: drill all four.

```instructor
Say: "Four panics, four fixes. Discard unsaved changes, unstage a file, fix the last message, reset a commit. Once they have all four, Git stops being scary."
Mention: "`git reset --hard` is the only command in this module that can DESTROY uncommitted work. Capital-letter warning before they type it. Have them run `git status` first — every time."
Pause: After each undo type — let them see the working tree change in `git status`. Otherwise they don't trust the command worked.
Say: "You're done when they can demonstrate all four undoes from memory without referring back to the lesson."
```

---

**1.** Confirm clean state.
```bash
cd ~/docker-course/fastapi-app
git status
```

---

## Case 1: Discard an unstaged edit

**2.** Make a change you don't want to keep. Edit `main.py` — change `{"hello": "branched"}` to `{"hello": "MISTAKE"}`. Save.

**3.** Confirm Git sees it.
```bash
git diff
```
You should see the bad change.

**4.** Discard it. `git restore` reverts the working file to whatever's in the latest commit.
```bash
git restore main.py
```

**5.** Confirm.
```bash
git diff
```
(No output — the change is gone.)

**6.** Open `main.py` in Cursor — should show `{"hello": "branched"}` again.

---

## Case 2: Unstage a file (you `git add`-ed by mistake)

**7.** Make a change. Edit `NOTES.md` and add a line `oops`. Save.

**8.** Stage it.
```bash
git add NOTES.md
```

**9.** Status.
```bash
git status
```
You should see `NOTES.md` under "Changes to be committed."

**10.** Unstage it (the change stays in your working tree, just not staged).
```bash
git restore --staged NOTES.md
```

**11.** Status.
```bash
git status
```
`NOTES.md` should be back under "Changes not staged."

**12.** Now also discard the working-tree change.
```bash
git restore NOTES.md
```

**13.** Confirm clean.
```bash
git status
```

---

## Case 3: Fix the last commit message (or add a forgotten file)

**14.** Make a real change worth committing. Edit `NOTES.md` to add `Undo drills`. Save.
```bash
git commit -am "fixt typo"
```
(Yes, the message is misspelled on purpose.)

**15.** Look at the bad message.
```bash
git log --oneline -1
```
```
abc1234 (HEAD -> main) fixt typo
```

**16.** Amend the message.
```bash
git commit --amend -m "Note undo drills in NOTES.md"
```

**17.** Confirm.
```bash
git log --oneline -1
```
```
def5678 (HEAD -> main) Note undo drills in NOTES.md
```
**Notice the hash changed.** Amending creates a new commit replacing the old one. **Don't amend commits you've already pushed** — it rewrites history and confuses anyone who pulled the original.

**18.** You can also amend to add a forgotten file. Edit `NOTES.md` again, add `another line`. Save.
```bash
git add NOTES.md
git commit --amend --no-edit
```
(`--no-edit` keeps the existing message unchanged.)

**19.** Confirm.
```bash
git log -1 --stat
```
The commit now contains both edits to `NOTES.md`.

---

## Case 4: Undo the last commit entirely

**20.** Make a commit you want to undo. Edit `NOTES.md` and add `BAD COMMIT`. Save.
```bash
git commit -am "this commit shouldn't exist"
```

**21.** See it.
```bash
git log --oneline -3
```

**22.** **Option A: keep the changes, undo only the commit.** This is `--mixed` (the default).
```bash
git reset HEAD~1
```
The commit is gone but the file change is still on disk, unstaged.

**23.** Confirm.
```bash
git status
```
You should see `NOTES.md` modified.

```bash
git log --oneline -3
```
The bad commit is gone.

**24.** Discard the working-tree change.
```bash
git restore NOTES.md
```

---

## ⚠️⚠️ Case 5: `git reset --hard` (the dangerous one)

**25.** This is the only Git command in this module that **loses uncommitted work**. Read carefully.

**26.** Make changes you'd want to keep. Edit `NOTES.md` to add `something important`. Save. **Don't commit.**

**27.** Suppose you got confused and ran (in real life) the wrong command. Here's what `--hard` does:
```bash
git reset --hard HEAD
```
```
HEAD is now at <hash> Note undo drills in NOTES.md
```

**28.** Open `NOTES.md`. **`something important` is gone.** `--hard` blew it away to match the latest commit.

**29.** **Rule of thumb:**
- `git restore <file>` — discard one file's working-tree changes (safe, clear scope)
- `git reset HEAD~1` — undo last commit, keep changes (safe-ish)
- `git reset --hard HEAD~1` — undo last commit AND lose the changes (**only use when you mean it**)

**30.** Some courses teach `git reflog` as a safety net for `--hard` mistakes. We won't drill it today — just know it exists. If you ever do `git reset --hard` on something important, `git reflog` may show the old commit hash so you can recover.

---

## Recap drill

**31.** Make a clean commit to leave the repo tidy. Edit `NOTES.md` to add a line `End of lesson 6 ✅` (or just `End of lesson 6`). Save.
```bash
git commit -am "Mark end of lesson 6"
```

**32.** Confirm clean.
```bash
git status && git log --oneline -3
```

**33.** Log.
```bash
echo "Undo cycle drilled: restore, --staged, --amend, reset" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`git restore <file>`** uses the same name as `git restore --staged <file>` — the `--staged` flag is what changes its meaning. Read the flag, not just the command.
- **`git reset` defaults to `--mixed`** (keep changes, unstage). `--soft` keeps changes staged. `--hard` discards changes. **Always type the flag explicitly so you know what you're getting.**
- **Never amend or reset commits you've pushed** to a remote. It rewrites history and forces a `--force` push, which is hostile to anyone else who pulled the original.
- `git reflog` is the rescue tool for "I lost a commit." Mention it when a student panics, walk them through it.

---

## Checkpoint

```bash
git status
```
Should say `nothing to commit, working tree clean`.

```bash
git log --oneline | head -n 1
```
Should show your "Mark end of lesson 6" commit.

```bash
grep "End of lesson 6" NOTES.md
```
Should match.

---

**Next up:** [07-gitea-account-and-ssh.md](07-gitea-account-and-ssh.md) — Connect to your Gitea account
