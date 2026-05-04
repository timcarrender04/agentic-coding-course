# Lesson 08: Pushing to Gitea

**By the end, your local FastAPI repo is mirrored on Gitea, and you've made a commit on each side and synced them.**

⏱ ~15 minutes of typing + clicking

---

## Step 1: create the empty repo on Gitea

**1.** In your browser, go to your Gitea instance. Click the **"+" icon** in the top-right → **New Repository**.

**2.** Fill in:
   - **Owner:** your username.
   - **Repository Name:** `fastapi-app` (matches your local folder name).
   - **Visibility:** keep it the default the instructor specifies (probably "Private" or "Internal").
   - **Initialize Repository:** **leave UNCHECKED.** We're pushing an existing local repo — initializing on the server would create a conflict.

**3.** Click **Create Repository**.

**4.** Gitea drops you on the empty repo page with instructions like:
```
git remote add origin git@<gitea-host>:<your-username>/fastapi-app.git
git push -u origin main
```
Copy the SSH URL — the `git@<gitea-host>:<your-username>/fastapi-app.git` line. (Use the **SSH** tab, not HTTPS.)

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

**7.** Add the Gitea repo as the `origin` remote.
```bash
git remote add origin git@<gitea-host>:<your-username>/fastapi-app.git
```
(Substitute the real values from step 4.)

**8.** Confirm.
```bash
git remote -v
```
```
origin  git@<gitea-host>:<your-username>/fastapi-app.git (fetch)
origin  git@<gitea-host>:<your-username>/fastapi-app.git (push)
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
To <gitea-host>:<your-username>/fastapi-app.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

**10.** Refresh the Gitea repo page in your browser. **Your code is there.** All your files, all your commits, all your branches' commits that ended up on `main`.

**11.** Click on a few files to confirm. Click "Commits" to see your history.

---

## Step 4: round-trip a commit

**12.** Make a change locally. Edit `NOTES.md` and add `Pushed to Gitea today`. Save.
```bash
git commit -am "Note Gitea push"
```

**13.** Push.
```bash
git push
```
(No `-u` this time — `main` already tracks `origin/main`.)
```
To <gitea-host>:<your-username>/fastapi-app.git
   abc1234..def5678  main -> main
```

**14.** Refresh Gitea. The new commit is at the top of the history.

---

## Step 5: edit on Gitea, pull locally

**15.** On Gitea, navigate to `NOTES.md`. Click the **pencil/edit icon** at the top-right of the file view.

**16.** Add a line at the bottom: `Edited via Gitea web UI`.

**17.** Scroll down. Set the commit message to `Edit NOTES via web` and click **Commit Changes** (it'll commit straight to `main` for now — we'll do PRs in lesson 10).

**18.** Refresh the commits page — you should see the new commit.

**19.** Back in the terminal. **Don't edit anything locally.** Pull from Gitea.
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

**20.** Open `NOTES.md` in Cursor. The line `Edited via Gitea web UI` should now be there.

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
git@<gitea-host>:<your-username>/fastapi-app.git
```
**SSH form** — used for pushes/pulls without typing a password (your SSH key authenticates).

**23.** The HTTPS form would look like `https://<gitea-host>/<your-username>/fastapi-app.git`. That requires entering a username + password (or a personal access token) on every push. SSH is simpler once set up — that's why we're using it.

**24.** Log it.
```bash
echo "Gitea repo + first push: $(git remote get-url origin)" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **"failed to push some refs"** means the remote has commits you don't have. Run `git pull` first, resolve any conflicts (lesson 09), then push again.
- **Don't initialize the Gitea repo with a README** if you have an existing local repo. The histories won't match and you'll get rejected pushes.
- **`-u` is only needed the first time** for a new branch. After that, `git push` knows where to go.
- **The remote name `origin` is convention, not magic.** You could call it anything. `origin` is what most tools assume.

---

## Checkpoint

```bash
git remote -v
```
Should show `origin` with a Gitea SSH URL.

```bash
git push --dry-run
```
Should print `Everything up-to-date` (or what would be pushed).

In the Gitea web UI, your repo's commit count should match `git log --oneline | wc -l` locally.

---

**Next up:** [09-cloning-and-pulling.md](09-cloning-and-pulling.md) — The other side of collaboration
