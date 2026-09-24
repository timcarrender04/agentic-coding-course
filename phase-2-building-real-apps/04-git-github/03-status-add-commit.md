# Lesson 03: The status / add / commit Cycle

**By the end, you will have made several commits the way you'll make them every day for the rest of your career.**

⏱ ~15 minutes of typing

> The cycle: edit → `git status` → `git add` → `git commit -m "..."`. Repeat. That's 90% of Git in daily use.

```instructor
Say: "The everyday cycle: edit, `git status`, `git add`, `git commit -m '...'`. Repeat. That's 90% of Git in daily use."
Mention: "Make `git status` a tic. When anything looks weird, `git status` first — 95% of the time it tells them exactly what's going on."
Pause: After their first `git add` of a single file. Run `git status` again — the file moved from 'Changes not staged' to 'Changes to be committed'. Two regions in the output, two states.
Say: "You're done when they can make 3 small commits in a row, each preceded by `git status`, with no help from you."
```

---

**1.** You're in `~/docker-course/fastapi-app`. Working tree is clean from lesson 02.
```bash
cd ~/docker-course/fastapi-app
git status
```
Should say `nothing to commit, working tree clean`.

**2.** Make a tiny change. Open `main.py` in Cursor and change the hello-world response from `{"hello": "fastapi"}` to `{"hello": "git"}`. Save.

**3.** Run status.
```bash
git status
```
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   main.py

no changes added to commit (use "git add" to track)
```
**Read it carefully.** The file is modified but not staged.

**4.** See exactly what changed.
```bash
git diff
```
```
diff --git a/main.py b/main.py
index ...
--- a/main.py
+++ b/main.py
@@ -X,X +X,X @@ def read_root():
-    return {"hello": "fastapi"}
+    return {"hello": "git"}
```
**Read it.** Red lines (with `-`) are removed, green lines (with `+`) are added.

**5.** Stage just `main.py`.
```bash
git add main.py
```

**6.** Status again.
```bash
git status
```
```
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   main.py
```
The file moved from "Changes not staged" to "Changes to be committed" — the **staging area**.

**7.** Commit it.
```bash
git commit -m "Change hello response to git"
```
```
[main def5678] Change hello response to git
 1 file changed, 1 insertion(+), 1 deletion(-)
```

**8.** Status.
```bash
git status
```
Working tree clean again.

**9.** Log.
```bash
git log --oneline
```
You should see two commits.

**10.** Now make changes to **two** files and stage them selectively. Edit `main.py` again — change the response back to `{"hello": "fastapi"}` and save.

**11.** Edit `routers/items.py` — at the very top of the file (above the imports), add a single comment line:
```python
# Items router — manages item CRUD
```
Save.

**12.** Status.
```bash
git status
```
You should see two modified files.

**13.** Stage only `main.py`.
```bash
git add main.py
```

**14.** Status.
```bash
git status
```
You should see `main.py` under "Changes to be committed" and `routers/items.py` still under "Changes not staged."

**15.** Commit just the staged change.
```bash
git commit -m "Restore hello response to fastapi"
```

**16.** Status.
```bash
git status
```
`routers/items.py` is still showing as modified — it wasn't part of the last commit.

**17.** Stage and commit it now.
```bash
git add routers/items.py
git commit -m "Add header comment to items router"
```

**18.** Look at history.
```bash
git log --oneline
```
You should see four commits now.

**19.** Try a "shortcut" you'll use often — `-am` stages and commits **all already-tracked, modified files** in one shot. Make a change first. Edit `routers/users.py` and add at the top:
```python
# Users router — manages user CRUD
```

**20.** Use the shortcut.
```bash
git commit -am "Add header comment to users router"
```
```
[main ...] Add header comment to users router
 1 file changed, 1 insertion(+)
```
**Note:** `-am` only stages files Git already tracks. New (untracked) files still need a plain `git add`.

**21.** Demonstrate that. Create a new file.
```bash
echo "# Project notes" > NOTES.md
```

**22.** Try the shortcut.
```bash
git commit -am "Add notes file"
```
```
On branch main
Untracked files:
        NOTES.md

nothing added to commit but untracked files present
```
**See?** The new file wasn't picked up — `-am` ignores untracked files.

**23.** Stage it manually and commit.
```bash
git add NOTES.md
git commit -m "Add NOTES.md placeholder"
```

**24.** History check.
```bash
git log --oneline
```
You should now have around six commits.

**25.** Log it.
```bash
echo "Commit cycle drilled: $(git log --oneline | wc -l) commits total" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`git status` between commands.** Make it a tic. It tells you exactly what state Git thinks you're in.
- **`git diff` shows unstaged changes.** To see staged-but-not-committed changes, use `git diff --staged`.
- **`-am` is a footgun for new files** — it silently skips them. Always check `git status` before committing to confirm what's about to be included.
- **Commit messages should be useful.** `"fix"` and `"wip"` are unhelpful. Write what changed and why. Imperative mood ("Add", "Fix", "Refactor") is the convention.

---

## Checkpoint

```bash
git status
```
Should say `nothing to commit, working tree clean`.

```bash
git log --oneline | wc -l
```
Should print at least `5`.

```bash
git log -1 --format="%s"
```
Should print your most recent commit message.

---

**Next up:** [04-diff-and-log.md](04-diff-and-log.md) — Read history and diffs like a pro
