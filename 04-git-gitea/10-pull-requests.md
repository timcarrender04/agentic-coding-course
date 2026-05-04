# Lesson 10: Pull Requests

**By the end, you will have opened a pull request on Gitea, had it reviewed (by a partner or the instructor), and merged it.**

⏱ ~25 minutes of typing + clicking

> A **pull request** (PR) is a proposal to merge one branch into another. The web UI shows the diff, lets people comment, and gates the merge. Every team uses this workflow.

```instructor
Say: "PRs are how every team merges code. Branch, push, open a PR on Gitea, get a review, merge. Today they walk the full loop."
Mention: "Decide pairs vs solo BEFORE step 1 — INSTRUCTOR-NOTES covers both modes. If pair, brief who reviews whom; if solo, the second clone is the 'reviewer'."
Pause: At the review step. The reviewer should leave at least one comment before approving — otherwise it feels like clicking through a form. Make the review real.
Say: "You're done when their feature branch is merged into main on Gitea via the PR UI AND `git pull` on their local main brings the merge down."
```

---

## Mode A: pair work (real PRs)

If your instructor paired you with another student, follow Mode A. Skip to Mode B otherwise.

**1A.** Decide who's the **author** and who's the **reviewer** for the first round. You'll swap roles after.

**2A.** Reviewer: in Gitea, go to the author's `fastapi-app` repo. Click the **Fork** button (top-right). Don't actually use your fork yet — just confirm you have permissions. (Skip this step if your instructor disabled forking — review will happen on a branch in the same repo instead.)

**3A.** Author: continue with steps 1–N below.

## Mode B: solo (simulated PRs)

You play both author and reviewer. The clone you set up in lesson 09 acts as a "different person."

**Use your `~/docker-course/fastapi-app` directory as the author**, and the Gitea web UI itself as the reviewer.

---

## Step 1: create a feature branch

**1.** From your project directory.
```bash
cd ~/docker-course/fastapi-app
```

**2.** Confirm clean.
```bash
git status
```

**3.** Make sure you're up to date with the remote.
```bash
git pull
```

**4.** Create a feature branch.
```bash
git switch -c add-version-route
```

---

## Step 2: build the feature

**5.** Open `main.py` in Cursor. Above `app.include_router(items.router)`, add a new route:
```python


@app.get("/version")
def version():
    return {"version": "0.1.0"}
```

**6.** Save.

**7.** Commit.
```bash
git commit -am "Add /version route returning 0.1.0"
```

**8.** Edit `NOTES.md` to add a line: `Added /version`. Save and commit.
```bash
git commit -am "Note /version in NOTES"
```

---

## Step 3: push the branch

**9.** Push the branch — `-u` because it's the first push of this branch.
```bash
git push -u origin add-version-route
```
You should see:
```
remote: ...
remote: Create a new pull request for 'add-version-route':
remote:     <gitea-host>/<your-username>/fastapi-app/compare/main...add-version-route
To <gitea-host>:<your-username>/fastapi-app.git
 * [new branch]      add-version-route -> add-version-route
branch 'add-version-route' set up to track 'origin/add-version-route'.
```
**Note the URL Gitea suggested.** That's the PR creation page.

---

## Step 4: open the pull request

**10.** Open the URL from step 9 in your browser. (Or go to the repo on Gitea, click **Pull Requests** → **New Pull Request**.)

**11.** You should see:
   - **Base branch:** `main`
   - **Compare branch:** `add-version-route`
   - The diff of your two commits

**12.** Set the title to something useful: `Add /version route`.

**13.** Set the description to something like:
```
Adds GET /version returning {"version": "0.1.0"}.

- New route in main.py
- Note in NOTES.md
```

**14.** Click **Create Pull Request**.

**15.** You're on the PR page. Tour it:
   - **Conversation tab** — comments, status events.
   - **Commits tab** — your two commits.
   - **Files Changed tab** — the diff.

---

## Step 5: review

**16. Mode A (pair):** the reviewer opens the PR URL the author shares. Continue at step 17.
**16. Mode B (solo):** you'll review your own PR — yes, it's a little weird. The point is to feel the workflow.

**17.** Click **Files Changed**. Hover over a line in the diff — a **+** icon appears. Click it to add an inline comment.

**18.** Leave one comment on a line of `main.py`. For example, on the `return {"version": "0.1.0"}` line, add:
```
Should we read the version from a constant or env var instead of hardcoding?
```

**19.** Click **Add single comment** (or **Start a review** to batch comments).

**20.** Go back to the **Conversation tab**. Your comment should appear inline with the diff snippet.

---

## Step 6: respond to feedback

**21.** As the author, address the comment. Edit `main.py` — change the version line:
```python
APP_VERSION = "0.1.0"


@app.get("/version")
def version():
    return {"version": APP_VERSION}
```
(`APP_VERSION` constant declared above the route.)

**22.** Save, commit, push.
```bash
git commit -am "Hoist version to APP_VERSION constant"
git push
```

**23.** Refresh the PR page on Gitea. The new commit shows up in the **Commits** tab and in the diff.

**24.** Reply to the original review comment with something like `Done — moved to APP_VERSION`. Click **Comment**.

**25.** As the reviewer, mark the comment as resolved (Gitea has a **Resolve conversation** button next to each thread).

---

## Step 7: merge

**26.** With the review approved, scroll to the bottom of the PR page. There's a **Merge Pull Request** button.

**27.** Pick a merge style. Gitea offers a few:
   - **Create a merge commit** — keeps the branch's full history with a merge commit on top.
   - **Squash and merge** — collapses all PR commits into one on `main`. Common for small features.
   - **Rebase and merge** — replays the branch's commits on top of `main` linearly (no merge commit).
   For this drill, pick **Create a merge commit**.

**28.** Click **Merge Pull Request**. Confirm with a default merge message.

**29.** Gitea shows "Pull request successfully merged." There's a **Delete Branch** button — click it. (The merged branch is no longer needed.)

---

## Step 8: sync locally

**30.** Back in the terminal.
```bash
cd ~/docker-course/fastapi-app
git switch main
git pull
```
You should see the merge commit + your branch's commits arrive.

**31.** Look at the graph.
```bash
git log --oneline --graph -8
```
The merge from your PR is there.

**32.** The branch is gone on the remote. Delete the local copy too.
```bash
git branch -d add-version-route
```

**33.** Confirm.
```bash
git branch
```
Only `* main`.

**34.** Test the new route end-to-end. Start your stack if it's not running.
```bash
docker compose up -d
sleep 2
curl http://localhost:8000/version
```
```
{"version":"0.1.0"}
```

**35.** Log it.
```bash
echo "First PR merged on Gitea: /version route" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Never commit directly to `main`** when collaborating. Branch + PR is the workflow. Direct commits to `main` skip review.
- **Pulls before pushes, always.** If you forgot to pull and your push gets rejected, just `git pull` then `git push` again.
- **A merged PR's branch should be deleted.** Both on the remote (Gitea offers the button) and locally (`git branch -d`). Stale branches pile up fast otherwise.
- **Squash vs merge commit vs rebase** is a team-by-team religious decision. Pick one and be consistent. The lessons use merge commits because they're the most explicit.

---

## Checkpoint

```bash
git log --oneline --graph -5
```
Should show the merge of `add-version-route`.

```bash
git branch
```
Should show only `* main`.

```bash
curl http://localhost:8000/version
```
Should print `{"version":"0.1.0"}`.

In Gitea, the **Pull Requests** tab should show one **Closed/Merged** PR with your description and the conversation.

---

**Next up:** [11-final-checkpoint.md](11-final-checkpoint.md) — The whole loop, from memory
