# Lesson 08: Pushing to GitHub

**By the end, your local FastAPI repo is mirrored in a public repo on GitHub, and you've made a commit on each side and synced them.**

⏱ ~15 minutes of typing + clicking

```instructor
Say: "We push the local FastAPI repo to a public repo on GitHub, then commit on each side and sync. After today they own the local-remote round trip."
Mention: "First push of a new branch needs `git push -u origin <branch>`. Without `-u`, Git complains 'no upstream branch.' Drill the `-u` once."
Mention: "Anyone whose Module 03 project is broken: point them at the fallback box after Step 1 — they create their own copy from the `course-items-api` template instead of debugging in class."
Pause: After the first successful `git push`. Have them refresh the GitHub repo page and see the commits land. Browser side and CLI side must match — that's the loop.
Say: "You're done when their repo is public on GitHub AND a commit made locally appears in the web UI after `git push`."
```

---

## Step 1: create the empty repo on GitHub

**1.** In your browser, go to github.com. Click the **"+" icon** in the top-right → **New repository**.

**2.** Fill in:
   - **Owner:** your username.
   - **Repository name:** `fastapi-app` (matches your local folder name).
   - **Visibility:** **Public.** Your classmates will browse and clone each other's repos in lessons 09–10 — that's the point.
   - **Initialize this repository:** leave **everything unchecked** — no README, no `.gitignore`, no license. We're pushing an existing local repo — initializing on the server would create a conflict.

**3.** Click **Create repository**.

**4.** GitHub drops you on the quick-setup page. Find the section **"…or push an existing repository from the command line"**:
```
git remote add origin git@github.com:<username>/fastapi-app.git
git branch -M main
git push -u origin main
```
Make sure the **SSH** tab is selected (not HTTPS) — the URL must start with `git@github.com:`.

> **Fallback — Module 03 project broken or missing?** Don't rebuild it in class. Open the instructor's template repo at `github.com/<INSTRUCTOR-GITHUB-USERNAME>/course-items-api`, click **Use this template → Create a new repository**, name it `fastapi-app`, keep it **Public**, then clone it:
> ```bash
> git clone git@github.com:<username>/fastapi-app.git ~/docker-course/fastapi-app
> ```
> Cloning sets up `origin` for you, so skip Steps 2 and 3 below and continue at **Step 4: round-trip a commit**.

---

## Step 2: connect local to remote

**5.** Back in the terminal, in your project.
```bash
cd ~/docker-course/fastapi-app
```

**6.** Confirm you have no remote yet.
```bash
git remote
```
(No output.)

**7.** Add the GitHub repo as the `origin` remote.
```bash
git remote add origin git@github.com:<username>/fastapi-app.git
```
(Substitute your real username from step 4.)

**8.** Confirm.
```bash
git remote -v
```
```
origin  git@github.com:<username>/fastapi-app.git (fetch)
origin  git@github.com:<username>/fastapi-app.git (push)
```

---

## Step 3: push

**9.** Push your `main` branch and set it as the upstream tracking branch (the `-u` does that).
```bash
git push -u origin main
```
You should see:
```
Enumerating objects: ... done.
Counting objects: 100% done.
...
To github.com:<username>/fastapi-app.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

**10.** Refresh the GitHub repo page in your browser. **Your code is there.** All your files, all your commits, all your branches' commits that ended up on `main`.

**11.** Click on a few files to confirm. Click the **"N commits"** link (top-right of the file list, with a clock icon) to see your history.

---

## Step 4: round-trip a commit

**12.** Make a change locally. Edit `NOTES.md` and add `Pushed to GitHub today`. Save.
```bash
git commit -am "Note GitHub push"
```

**13.** Push.
```bash
git push
```
(No `-u` this time — `main` already tracks `origin/main`.)
```
To github.com:<username>/fastapi-app.git
   abc1234..def5678  main -> main
```

**14.** Refresh GitHub. The new commit is at the top of the history. Click the commit message to see its diff rendered in the browser — green added lines, red removed lines, same as `git show`.

---

## Step 5: edit on GitHub, pull locally

**15.** On GitHub, navigate to `NOTES.md`. Click the **pencil/edit icon** at the top-right of the file view.

**16.** Add a line at the bottom: `Edited via GitHub web UI`.

**17.** Click **Commit changes...** (green button, top-right). Set the commit message to `Edit NOTES via web`, keep **Commit directly to the `main` branch** selected, and click **Commit changes** (we'll do PRs in lesson 10).

**18.** Refresh the commits page — you should see the new commit.

**19.** Back in the terminal. **Don't edit anything locally.** Pull from GitHub.
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

**20.** Open `NOTES.md` in VS Code. The line `Edited via GitHub web UI` should now be there.

**21.** Confirm with log.
```bash
git log --oneline -3
```

---

## Step 6: see the SSH-vs-HTTPS distinction

**22.** Look at the remote URL.
```bash
git remote get-url origin
```
```
git@github.com:<username>/fastapi-app.git
```
**SSH form** — used for pushes/pulls without typing a password (your SSH key authenticates).

**23.** The HTTPS form would look like `https://github.com/<username>/fastapi-app.git`. GitHub doesn't accept your account password for HTTPS pushes — you'd need a personal access token. SSH is simpler once set up — that's why we're using it.

**24.** Log it.
```bash
echo "GitHub repo + first push: $(git remote get-url origin)" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Your repo is public.** Anyone on the internet can read it. That's fine for course exercises — but never commit secrets. Your `.env` is in `.gitignore` from lesson 02 for exactly this reason. Check `git status` before every push.
- **"failed to push some refs"** means the remote has commits you don't have. Run `git pull` first, resolve any conflicts (lesson 09), then push again.
- **Don't initialize the GitHub repo with a README** if you have an existing local repo. The histories won't match and you'll get rejected pushes.
- **`-u` is only needed the first time** for a new branch. After that, `git push` knows where to go.
- **The remote name `origin` is convention, not magic.** You could call it anything. `origin` is what most tools assume.

---

## Checkpoint

```bash
git remote -v
```
Should show `origin` with a `git@github.com:` SSH URL.

```bash
git push --dry-run
```
Should print `Everything up-to-date` (or what would be pushed).

On GitHub, the **"N commits"** count on your repo page should match `git log --oneline | wc -l` locally.

---

**Next up:** [09-cloning-and-pulling.md](09-cloning-and-pulling.md) — The other side of collaboration
