# Lesson 04: Diff and Log

**By the end, you will be fluent in `git diff`, `git log`, and the most useful flags on each.**

⏱ ~15 minutes of typing

```instructor
Say: "Diff shows you what changed; log shows you what's been committed. Together they're how you read history."
Mention: "`git diff` (no args) shows UNSTAGED changes. `git diff --staged` shows STAGED ones. They'll edit a file, run `git add`, then run `git diff` and see nothing — that's why."
Pause: Before they run `git log`, announce 'press q to quit' — same trap as `less` and `top` from Module 01.
Say: "You're done when they can show me a diff before staging, a diff after staging, and a one-line log with `git log --oneline`."
```

---

**1.** Confirm you're in the project and the tree is clean.
```bash
cd ~/docker-course/fastapi-app
git status
```

**2.** Look at the full log.
```bash
git log
```
(Press `q` to quit the pager.)

**3.** One-line per commit.
```bash
git log --oneline
```

**4.** With branch + tag decorations.
```bash
git log --oneline --decorate
```
You should see `(HEAD -> main)` next to the most recent commit.

**5.** With a tiny visual graph (more useful when you have branches).
```bash
git log --oneline --graph --decorate --all
```

**6.** Show file changes with each commit.
```bash
git log --stat --oneline
```

**7.** Show the actual diff with each commit.
```bash
git log -p
```
(Lots of output. Press `q` to quit.)

**8.** Filter to commits touching a specific file.
```bash
git log --oneline -- main.py
```

**9.** Filter by author.
```bash
git log --oneline --author="Your Name"
```

**10.** Filter by message text.
```bash
git log --oneline --grep="hello"
```
You should see your "Change hello response to git" and "Restore hello response to fastapi" commits.

**11.** Show just the last N commits.
```bash
git log --oneline -3
```

**12.** Look at one specific commit by hash. Pick any short hash from `git log --oneline`.
```bash
git show <paste-a-hash-here>
```
You'll see the commit metadata + the diff.

**13.** Now make changes to feel `git diff` properly. Edit `routers/items.py` and add a docstring under the `class ItemIn(BaseModel):` line:
```python
    """Pydantic model for incoming item creation requests."""
```

**14.** Save. Diff.
```bash
git diff
```
You should see exactly the line you added.

**15.** See the diff with more context lines.
```bash
git diff -U10
```
(Default is `-U3` — three lines of context above and below each change.)

**16.** Stage the change.
```bash
git add routers/items.py
```

**17.** `git diff` now shows nothing — staged changes don't appear in plain `git diff`.
```bash
git diff
```
(No output.)

**18.** See the staged diff.
```bash
git diff --staged
```
(Same diff as before — but now you're looking at what's about to be committed.)

**19.** Commit it.
```bash
git commit -m "Add docstring to ItemIn model"
```

**20.** See the diff between the commit you just made and the commit before it.
```bash
git diff HEAD~1 HEAD
```
(`HEAD` = the latest commit. `HEAD~1` = one commit before HEAD. `HEAD~2` = two before, etc.)

**21.** Same diff in stat form.
```bash
git diff HEAD~1 HEAD --stat
```

**22.** See the full diff between any two commits — pick two short hashes from `git log --oneline`.
```bash
git diff <older-hash> <newer-hash>
```

**23.** Compare a single file across two commits.
```bash
git diff HEAD~3 HEAD -- main.py
```

**24.** A pretty log format you might want to alias later. Type it once now.
```bash
git log --pretty=format:"%h %an %ar  %s" -10
```
```
abc1234 Your Name 5 minutes ago  Add docstring to ItemIn model
def5678 Your Name 10 minutes ago  Add header comment to users router
...
```

**25.** Log it.
```bash
echo "Diff + log fluency drilled" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`git diff` shows working-tree changes only.** For staged changes, `git diff --staged`. For both, `git diff HEAD`.
- **`HEAD~N`** counts back from your current commit. `HEAD~1` = parent, `HEAD~2` = grandparent. With merges this gets weirder; we won't worry about that yet.
- **Pager controls** (`less`): `q` to quit, `/text` to search, `n` for next match, space for next page, `b` for back.
- **Don't shell out to `cat` to see commits** — `git show` is the right tool.

---

## Checkpoint

```bash
git log --oneline | wc -l
```
Should print at least `6`.

```bash
git log --oneline --grep="hello" | wc -l
```
Should print at least `1`.

```bash
git diff HEAD~1 HEAD --stat
```
Should show one file changed (the docstring you added).

---

**Next up:** [05-branches.md](05-branches.md) — Work on multiple things at once
