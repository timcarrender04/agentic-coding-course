# Lesson 05: Branches

**By the end, you will have created a feature branch, made commits on it, merged it back to `main`, and deleted it.**

⏱ ~25 minutes of typing

> A **branch** is a movable pointer to a commit. Switching branches updates your working tree to look like that commit. Branches are cheap, free, and the unit of "work in progress."

---

**1.** Confirm clean state.
```bash
cd ~/docker-course/fastapi-app
git status
```

**2.** List existing branches.
```bash
git branch
```
```
* main
```
(The `*` is the current branch.)

**3.** Create a new branch called `add-health-route`.
```bash
git branch add-health-route
```
(No output = success.)

**4.** List branches again.
```bash
git branch
```
```
  add-health-route
* main
```
(The branch exists, but you're still on `main`.)

**5.** Switch to the new branch.
```bash
git switch add-health-route
```
```
Switched to branch 'add-health-route'
```
(Older Git uses `git checkout <branch>` — both work.)

**6.** Confirm.
```bash
git branch
```
```
* add-health-route
  main
```

**7.** Look at the bottom-left of your Cursor window — it should now say `add-health-route` instead of `main`. Cursor reads `.git/HEAD` to show the current branch.

**8.** Quick shortcut: create + switch in one command. (We won't actually use this now — just know it exists.)
```bash
# git switch -c another-branch     # creates AND switches
# git checkout -b another-branch   # older equivalent
```

**9.** Now make a real change on this branch. Open `main.py` in Cursor. Above `app.include_router(items.router)`, add a `/health` route:
```python


@app.get("/health")
def health():
    return {"status": "ok"}
```

**10.** Save.

**11.** Status.
```bash
git status
```
You should see `main.py` modified.

**12.** Commit it.
```bash
git add main.py
git commit -m "Add /health route"
```

**13.** See the log on this branch.
```bash
git log --oneline -5
```
The new commit is on top, on `add-health-route`.

**14.** Now switch back to `main`.
```bash
git switch main
```

**15.** Open `main.py` in Cursor. **The `/health` route is gone.** It only exists on the other branch. Switching branches changes the files on disk to match that branch's commit.

**16.** Confirm with the log.
```bash
git log --oneline -3
```
The "Add /health route" commit is missing — it's only on the other branch.

**17.** See **all** branches' commits in a graph.
```bash
git log --oneline --graph --all --decorate -10
```
You should see a graph where `add-health-route` has one extra commit beyond `main`.

**18.** Switch back to the feature branch.
```bash
git switch add-health-route
```

**19.** Open `main.py`. The `/health` route is back. Branches keep their own state.

**20.** Make another commit on this branch. Edit `main.py` and add a docstring under the `health` function:
```python
    """Liveness probe — returns 200 if the app is up."""
```

**21.** Save, stage, commit.
```bash
git commit -am "Document /health route"
```

**22.** Look at the graph.
```bash
git log --oneline --graph --all --decorate -10
```
Two commits ahead of `main` now.

**23.** Now merge the feature branch back into `main`. First, switch to `main`.
```bash
git switch main
```

**24.** Merge.
```bash
git merge add-health-route
```
```
Updating abc1234..def5678
Fast-forward
 main.py | 5 +++++
 1 file changed, 5 insertions(+)
```
**Read it.** "Fast-forward" means `main` had no commits of its own since the branch diverged, so Git just moved the `main` pointer forward — no merge commit needed.

**25.** Confirm `main.py` now has the `/health` route.
```bash
grep -A 2 "def health" main.py
```

**26.** History on `main`.
```bash
git log --oneline -5
```
The `/health` commits are now on `main`.

**27.** Delete the merged feature branch — its commits live on `main` now.
```bash
git branch -d add-health-route
```
```
Deleted branch add-health-route (was abcdef0).
```

**28.** Confirm.
```bash
git branch
```
```
* main
```

**29.** **Now feel a non-fast-forward merge.** Create a new branch, make a commit on it, but **also** make a commit on `main` in between. This forces Git to create a real merge commit.

**30.** Create + switch.
```bash
git switch -c rename-hello
```

**31.** Edit `main.py`'s `read_root` to return `{"hello": "branched"}`. Save, commit.
```bash
git commit -am "Rename hello response to 'branched'"
```

**32.** Switch back to `main`.
```bash
git switch main
```

**33.** Make a different change. Edit `NOTES.md` and add a line `Branch demo`. Save, commit.
```bash
git commit -am "Note branch demo in NOTES.md"
```

**34.** Look at the graph — `main` and `rename-hello` have diverged.
```bash
git log --oneline --graph --all --decorate -10
```

**35.** Merge — this will be a true merge commit.
```bash
git merge rename-hello -m "Merge rename-hello into main"
```
```
Merge made by the 'ort' strategy.
 main.py | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

**36.** See the merge commit in the graph.
```bash
git log --oneline --graph --decorate -10
```
You should see the diamond shape: two parents converging on the merge commit.

**37.** Delete the merged branch.
```bash
git branch -d rename-hello
```

**38.** Open `main.py` and confirm it now says `{"hello": "branched"}`. Both changes (the rename and the note) are present.

**39.** Log it.
```bash
echo "Branches: created, committed, merged (FF + true merge)" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Always `git status` and `git branch` before doing anything destructive.** Knowing where you are prevents 95% of mistakes.
- **`git branch -d`** only deletes a fully merged branch (safe). **`git branch -D`** force-deletes any branch (loses unmerged work).
- **You can't switch branches if you have uncommitted changes** that would conflict. Either commit them, or `git stash` (covered briefly later).
- **`git switch` is newer and clearer than `git checkout`.** Both work. The lessons use `switch` for branches and reserve `checkout` for older or specific patterns.

---

## Checkpoint

```bash
git branch
```
Should show only `* main`.

```bash
git log --oneline --graph -8
```
Should show your merge commit (look for the asterisk graph showing two parents).

```bash
grep '"branched"' main.py
```
Should print the line with `branched`.

```bash
grep "Branch demo" NOTES.md
```
Should print the note.

---

**Next up:** [06-undoing-things.md](06-undoing-things.md) — When you mess up
