# Lesson 09: Cloning, Pulling, and Conflicts

**By the end, you will have cloned your repo to a second directory, made conflicting commits in both, and resolved the conflict.**

⏱ ~20 minutes of typing

> Cloning is how teammates get a copy of the repo. Pulling is how they keep it in sync. When two people change the same lines, you get a **merge conflict** — and you learn to read the markers in the file and pick a side.

```instructor
Say: "Cloning is how teammates get a copy. Pulling keeps it in sync. Today we deliberately CAUSE a merge conflict and resolve it together — the first one is always traumatic."
Mention: "The conflicted file has `<<<<<<<`, `=======`, `>>>>>>>` markers. Open the file, pick a side (or hand-merge), DELETE all the markers, `git add`, `git commit`. If they leave a single marker, the next commit fails."
Pause: After Git declares the conflict. Sit with it. Read the message together — Git tells them which file. Resist jumping straight to the fix.
Say: "You're done when both clones are in sync, the conflicted file has clean content (no markers), and `git log` shows the merge commit."
```

---

## Part 1: clone

**1.** Move out of the project to your course directory.
```bash
cd ~/docker-course
```

**2.** Clone your own Gitea repo into a new directory called `fastapi-app-clone`.
```bash
git clone git@<gitea-host>:<your-username>/fastapi-app.git fastapi-app-clone
```
```
Cloning into 'fastapi-app-clone'...
remote: Enumerating objects: ... done.
Receiving objects: 100% done.
```

**3.** Two folders now.
```bash
ls ~/docker-course/ | grep fastapi-app
```
```
fastapi-app
fastapi-app-clone
```

**4.** Look at the clone.
```bash
cd fastapi-app-clone
git log --oneline -3
```
Same history as your original.

**5.** Confirm the remote was set automatically.
```bash
git remote -v
```
```
origin  git@<gitea-host>:<your-username>/fastapi-app.git (fetch)
origin  git@<gitea-host>:<your-username>/fastapi-app.git (push)
```
**Cloning sets up `origin` for you.** No `git remote add` needed.

---

## Part 2: simulate a teammate

**6.** Pretend the clone is your teammate. Make a change there. Edit `NOTES.md` (in `fastapi-app-clone`) and add a line at the bottom: `Teammate: hello from the clone`. Save.

**7.** Commit and push.
```bash
git commit -am "Teammate adds hello note"
git push
```

**8.** Now switch back to your original.
```bash
cd ~/docker-course/fastapi-app
```

**9.** Pull the teammate's change.
```bash
git pull
```
```
remote: Enumerating objects: ... done.
...
Updating ...
Fast-forward
 NOTES.md | 1 +
 1 file changed, 1 insertion(+)
```

**10.** Confirm.
```bash
tail -n 3 NOTES.md
```
The teammate's line is now there.

**11.** This is the **happy-path collaboration loop**: edit, commit, push from one side; pull from the other.

---

## Part 3: cause a conflict

**12.** In your **original** (`~/docker-course/fastapi-app`), edit `NOTES.md` and change the `Teammate: hello from the clone` line to:
```
Teammate (original wins): hello from the clone
```
Save. Commit:
```bash
git commit -am "Edit teammate note from original"
```

**13.** **Don't push yet.** Switch to the clone:
```bash
cd ~/docker-course/fastapi-app-clone
```

**14.** Edit the **same line** in `NOTES.md` to:
```
Teammate (clone wins): hello from the clone
```
Save. Commit:
```bash
git commit -am "Edit teammate note from clone"
```

**15.** Push from the clone.
```bash
git push
```
That works — the clone is ahead of the remote.

**16.** Now back in the original. Try to push.
```bash
cd ~/docker-course/fastapi-app
git push
```
```
To <gitea-host>:<your-username>/fastapi-app.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to ...
hint: Updates were rejected because the remote contains work that you do
hint: not have locally.
```
**Read the error.** The remote has the clone's commit, which your original doesn't have. Git won't let you overwrite it.

**17.** Pull first.
```bash
git pull
```
```
Auto-merging NOTES.md
CONFLICT (content): Merge conflict in NOTES.md
Automatic merge failed; fix conflicts and then commit the result.
```
**Conflict.**

**18.** Status.
```bash
git status
```
```
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  ...
Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   NOTES.md
```

---

## Part 4: resolve the conflict

**19.** Open `NOTES.md` in Cursor. You'll see conflict markers like:
```
<<<<<<< HEAD
Teammate (original wins): hello from the clone
=======
Teammate (clone wins): hello from the clone
>>>>>>> abc1234... (Edit teammate note from clone)
```

**20.** Read it:
   - Everything between `<<<<<<< HEAD` and `=======` is **your** version (the original side).
   - Everything between `=======` and `>>>>>>>` is **theirs** (the clone's version).

**21.** Pick a resolution. For this drill, hand-merge to one final line. Replace the entire conflict block with:
```
Teammate (merged): hello from the clone
```

**22.** Save. Confirm no markers remain.
```bash
grep -E "^<<<|^===|^>>>" NOTES.md
```
(No output = clean.)

**23.** Stage the resolved file.
```bash
git add NOTES.md
```

**24.** Status.
```bash
git status
```
```
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)
```

**25.** Commit the merge.
```bash
git commit
```
Git opens an editor with a default message like `Merge branch 'main' of git@<host>:...`. Save and exit. (In nano: Ctrl+O Enter, then Ctrl+X.)

**26.** Push.
```bash
git push
```
Now succeeds.

**27.** Look at the graph.
```bash
git log --oneline --graph -5
```
You should see the diamond shape of the merge commit.

**28.** Pull on the clone to get the merge.
```bash
cd ~/docker-course/fastapi-app-clone
git pull
```

**29.** Confirm both directories agree.
```bash
diff ~/docker-course/fastapi-app/NOTES.md ~/docker-course/fastapi-app-clone/NOTES.md
```
(No output = identical.)

**30.** Log it.
```bash
echo "Conflict resolved end-to-end: pull, hand-merge, commit, push" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Never commit a file with `<<<<<<<` markers.** Cursor will highlight them in red. They're for **you** to resolve, not to commit.
- **`git status` during a merge** is your friend. It tells you exactly which files still have unresolved conflicts.
- **`git merge --abort`** undoes a half-finished merge if you panic. You'll be back to where you started before `git pull`.
- **The clone is independent.** You committed in both directories — Git couldn't know one was "the original" and the other "the copy." They're peers.

---

## Checkpoint

```bash
cd ~/docker-course/fastapi-app
git status
```
Should be clean.

```bash
git log --oneline --graph -5
```
Should show your merge commit.

```bash
diff ~/docker-course/fastapi-app/NOTES.md ~/docker-course/fastapi-app-clone/NOTES.md
```
Should produce no output.

In Gitea, the commits page should show the merge commit at the top.

---

**Next up:** [10-pull-requests.md](10-pull-requests.md) — The team workflow
