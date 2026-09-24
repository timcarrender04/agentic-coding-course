# Lesson 11: Final Checkpoint

**Time:** ~20 min — **no instructor help.**

This is the cumulative drill. You'll do a complete branch → commit → push → PR → review → merge cycle from memory. If you forget a command, reread the relevant lesson — but don't ask the instructor.

---

## The task

Add a small feature to your FastAPI app and ship it through a real PR workflow.

**Feature spec:** add a `GET /info` route that returns:
```json
{
  "app": "fastapi-app",
  "version": "0.1.0",
  "owner": "<your-gitea-username>"
}
```

The values can be hardcoded — this is a Git workflow drill, not an API drill.

---

## The steps (in order)

**1.** From `~/docker-course/fastapi-app`, confirm clean state and pull latest.
```bash
cd ~/docker-course/fastapi-app
git status
git pull
```

**2.** Create a feature branch named `add-info-route`.
```bash
git switch -c add-info-route
```

**3.** Implement the feature:
   - Edit `main.py` — add the `/info` route.
   - Edit `NOTES.md` — add a line `Added /info`.

**4.** Stage and commit each file in a **separate commit** with descriptive messages:
   - Commit 1: `Add /info route`
   - Commit 2: `Note /info in NOTES.md`

**5.** Confirm the two commits.
```bash
git log --oneline -3
```

**6.** Push the branch.
```bash
git push -u origin add-info-route
```

**7.** In Gitea, open a pull request from `add-info-route` into `main`. Title: `Add /info route`. Description: a short summary.

**8.** Leave at least one inline comment on your own PR (or have your pair partner do it). Reply to it.

**9.** Merge the PR (use **Create a merge commit**). Delete the branch on Gitea.

**10.** Pull on your local `main`.
```bash
git switch main
git pull
git branch -d add-info-route
```

**11.** Verify the route is live.
```bash
docker compose up -d
sleep 2
curl http://localhost:8000/info
```
Expected:
```
{"app":"fastapi-app","version":"0.1.0","owner":"<your-gitea-username>"}
```

---

## The acceptance test

Each of these must succeed:

```bash
git status
```
Clean.

```bash
git log --oneline -1
```
Shows the merge commit from your PR.

```bash
git branch
```
Shows only `* main`.

```bash
curl -s http://localhost:8000/info | python -m json.tool
```
Prints your three-key JSON.

In Gitea:
- The **Pull Requests** tab shows your PR as **Merged**.
- The **Commits** tab on `main` shows your two feature commits + the merge commit.

---

## What to submit

A screenshot showing **all four** of these in one image:
1. Your terminal with `curl http://localhost:8000/info` and its JSON response.
2. Your terminal with `git log --oneline --graph -5`.
3. Your Gitea PR page showing **Merged** status.
4. Your Gitea repo file view of `main.py` with the `/info` route visible.

Send it to the instructor however they've asked.

Then:
```bash
echo "Module 04 final checkpoint: passed $(date -Iseconds)" >> ~/docker-course/notes/notes.txt
```

---

## Self-grade

You pass this module if:

- [ ] The PR was opened, reviewed (with at least one comment), and merged.
- [ ] The merged branch was deleted on both Gitea and locally.
- [ ] `curl http://localhost:8000/info` returns the expected JSON.
- [ ] The merge commit shows in `git log --oneline --graph` on `main`.

---

## What's next

Module 05 turns on Cursor's AI features — Tab, Chat, Composer — using the repo you just built as the working codebase. Every change from here on flows through the same branch + PR + merge cycle you just drilled.
