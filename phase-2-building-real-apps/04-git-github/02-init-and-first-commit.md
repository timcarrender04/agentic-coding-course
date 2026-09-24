# Lesson 02: Init and First Commit

**By the end, your FastAPI project is a Git repository with one commit on `main`.**

⏱ ~15 minutes of typing

```instructor
Say: "First commit. We turn the FastAPI project into a Git repo and capture its current state on the `main` branch."
Mention: "`git commit` alone does NOT commit changes — they have to `git add` first. Drill it. The most common pattern is `git add . && git commit -m '...'`."
Pause: After `git init`. Point at `.git/` with `ls -la` — that's the repo. Delete that folder and the repo is gone. Don't mystify it.
Say: "You're done when `git log` shows one commit on `main` with their name as author."
```

---

**1.** Move into the FastAPI project.
```bash
cd ~/docker-course/fastapi-app
```

**2.** Confirm where you are.
```bash
pwd
```
```
/home/your-user/docker-course/fastapi-app
```

**3.** Initialize a new Git repository here.
```bash
git init
```
```
Initialized empty Git repository in /home/.../fastapi-app/.git/
hint: Using 'master' as the name of the initial branch...
```
(If you see a hint about `master`, you missed step 3 of lesson 01 — fix it now and re-run `git init`.)

**4.** See the hidden `.git` directory that just appeared.
```bash
ls -la .git | head -n 10
```
You should see `HEAD`, `config`, `objects/`, `refs/`. **Do not edit anything inside `.git/` by hand.** All `git` commands manipulate this folder for you.

**5.** Confirm the current branch is `main`.
```bash
git branch
```
(No output yet — you have no commits, so the branch doesn't fully exist yet. We'll see it after the first commit.)

**6.** See the status of the new repo.
```bash
git status
```
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .dockerignore
        .env
        .gitignore
        Dockerfile
        database.py
        ...
```
**Read this carefully.** Git is telling you everything is "untracked" — it sees the files but isn't versioning them yet.

**7.** Look at your existing `.gitignore` (you wrote it in Module 03 lesson 01).
```bash
cat .gitignore
```
```
.venv/
.env
```

**8.** Confirm `.git` itself is in `.gitignore`? It shouldn't be — `.git` is the repo, not a tracked file. But let's add a few more sensible ignores.
```bash
echo "__pycache__/" >> .gitignore
echo "*.pyc" >> .gitignore
```

**9.** Confirm.
```bash
cat .gitignore
```
```
.venv/
.env
__pycache__/
*.pyc
```

**10.** Run status again — `.venv` and `.env` should now be ignored.
```bash
git status
```
The untracked-files list should no longer include `.venv/` or `.env`.

**11.** Stage everything for the first commit. The `.` means "everything in the current directory."
```bash
git add .
```
(No output = success.)

**12.** Run status again.
```bash
git status
```
```
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   .dockerignore
        new file:   .gitignore
        new file:   Dockerfile
        ...
```
Everything moved from "Untracked" to "Changes to be committed" — the **staging area**.

**13.** Make the first commit. The `-m` flag attaches a message inline.
```bash
git commit -m "Initial commit: FastAPI app with Postgres and SQLAlchemy"
```
```
[main (root-commit) abc1234] Initial commit: FastAPI app with Postgres and SQLAlchemy
 15 files changed, 200 insertions(+)
 create mode 100644 .dockerignore
 ...
```
**Read the output.** `[main (root-commit) abc1234]` — your first commit's short hash, on the `main` branch.

**14.** Status now.
```bash
git status
```
```
On branch main
nothing to commit, working tree clean
```
**This is the calm Git state.** Working tree clean = "everything is committed."

**15.** Look at the commit.
```bash
git log
```
```
commit abc1234... (HEAD -> main)
Author: Your Name <you@example.com>
Date:   ...

    Initial commit: FastAPI app with Postgres and SQLAlchemy
```
(Press `q` to exit if it pages.)

**16.** A more compact view.
```bash
git log --oneline
```
```
abc1234 (HEAD -> main) Initial commit: FastAPI app with Postgres and SQLAlchemy
```

**17.** See what's in the commit.
```bash
git show --stat HEAD
```
Lists every file in the commit and how many lines were added/removed.

**18.** Log it.
```bash
echo "Repo initialized + first commit: $(git log --oneline | head -n 1)" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`git init` runs in the current directory** — make sure you're in `~/docker-course/fastapi-app` first, not your home directory. Initializing a repo in `~` is a classic accident.
- **Always `git status` between commands.** Git's state is invisible without it. Status is your single source of truth.
- The commit hash (`abc1234`) is unique to your machine — yours will look different. That's fine.
- A commit message is required. `-m "..."` provides it inline; without `-m`, Git opens an editor (set by `$EDITOR`) and you must save+quit.

---

## Checkpoint

```bash
git status
```
Should say `nothing to commit, working tree clean`.

```bash
git log --oneline | wc -l
```
Should print `1`.

```bash
git log -1 --format="%an <%ae>"
```
Should print your name and email (matches what you set in lesson 01).

```bash
test -d .git && echo "OK: repo exists"
```
Should print `OK: repo exists`.

---

**Next up:** [03-status-add-commit.md](03-status-add-commit.md) — The day-to-day cycle of changing files
