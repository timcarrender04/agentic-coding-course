# Instructor Notes — Module 04: Git & GitHub

## TODO before class

- [ ] **Create the two baseline repos** under your GitHub account, from the scaffolds in [`../../tools/github-baseline/`](../../tools/github-baseline/) — its README has the step-by-step publish instructions (~10 min):
  1. `course-items-api` — the reference FastAPI project. Mark it as a **template repo** (repo → Settings → check **Template repository**). It's the fallback in lesson 08 for students whose Module 03 project is broken: they click **Use this template**, create their own public copy, and clone it — no class time lost debugging.
  2. `course-pr-practice` — the hub for lesson 10's class PR exercise. It needs a `students/` folder (with a placeholder file so the folder exists in Git). Students fork it, add `students/<their-github-username>.md` on a branch, open a PR back to your repo, and review one classmate's PR.
- [ ] **Share your GitHub username with the class.** The lessons write it as `<INSTRUCTOR-GITHUB-USERNAME>` — either substitute it in the files or write it on the board at the start of session 2.
- [ ] **Set the public-repo expectation.** Course repos are **public** on purpose (cross-sharing: students browse, clone, and review each other's work). Only basic course exercises go public — no IP concerns. Remind students never to commit secrets; `.env` is gitignored in lesson 02.
- [ ] **Plan lesson 09 Part 5 and lesson 10 Part 2.** Both need classmates' GitHub usernames — collect them on the board or a shared doc early in session 2. Decide how PR reviews are assigned in lesson 10 (simplest rule: review the PR opened right after yours in the list). Plan to merge the card PRs during or right after class.
- [ ] **Verify students can reach github.com and outbound SSH port 22.** Some classroom firewalls block outbound 22. GitHub's fallback is SSH over 443 (`ssh -T -p 443 git@ssh.github.com`) — lesson 07's Watch out mentions it; be ready to walk students through `~/.ssh/config` if needed.

## General Tips

- **Git is muscle memory.** Same drill philosophy as Modules 01 and 03 — students type every command. Resist the urge to give them aliases or wrappers; those come after the fundamentals stick.
- **The commit graph is the mental model.** When a student is confused, draw the commit graph on a whiteboard. It almost always solves the confusion.
- **`git status` is the answer.** When a student says "Git is broken," 95% of the time `git status` tells them exactly what's going on. Drill it constantly. Make it a tic.
- **No `git reset --hard` until lesson 06.** And then with capital-letter warnings. It's the only Git command in this module that can lose work. (Lesson 09 reuses it once, deliberately, to discard a junk commit.)
- **Browser is a real tool here.** Lessons 07–10 require students to keep github.com and VS Code open side-by-side. Make sure their screens can hold both.

## Where Students Get Stuck (in priority order)

### #1 — Forgetting to stage before commit
- Symptom: `nothing to commit, working tree clean` or commit succeeds but is empty.
- Fix: students think `git commit` alone commits all changes. It doesn't. They must `git add <file>` first. Drill `git add . && git commit -m "..."` as the most common pattern but **also** show selective `git add <file>` so they understand what staging means.

### #2 — Confusing branch state
- Symptom: edits show up "missing" because the student is on the wrong branch.
- Fix: `git branch` (lists branches, shows current with `*`) or look at the bottom-left of VS Code — it shows the current branch.

### #3 — SSH key auth failures (lesson 07)
- Symptom: `Permission denied (publickey)` when pushing.
- Causes: key not added to GitHub, key file permissions wrong (`chmod 600` it), pasted the private key instead of the public one, or pushing over HTTPS while expecting SSH.
- Diagnostic: `ssh -T git@github.com` should print "Hi <username>! You've successfully authenticated, but GitHub does not provide shell access."

### #4 — Merge conflicts (lesson 09)
- Symptom: "CONFLICT (content): Merge conflict in <file>" + VS Code shows the `<<<<<<<` markers.
- Fix: open the file, pick which side to keep (or hand-merge), remove the markers, `git add <file>`, `git commit`. Lesson 09 walks them through one deliberately. The first one is always traumatic.

### #5 — Detached HEAD state
- Symptom: prompt says "HEAD detached at <hash>" — happens after `git checkout <commit-hash>`.
- Fix: `git checkout main` or `git switch main`. Don't introduce this state in this module — flag it as something they'll see eventually.

### #6 — Pushing to the wrong branch / pushing without setting upstream
- Symptom: `fatal: The current branch <name> has no upstream branch.`
- Fix: `git push -u origin <name>` the first time. After that, plain `git push` works.

### #7 — `pull` failing because of uncommitted changes
- Symptom: `error: Your local changes to the following files would be overwritten by merge.`
- Fix: commit them, or stash them (`git stash`) — but stash is mentioned only briefly in this module to avoid a tangent.

### #8 — Cloning the instructor's repo instead of their fork (lesson 10)
- Symptom: `remote: Permission to <INSTRUCTOR-GITHUB-USERNAME>/course-pr-practice.git denied` when pushing the card branch.
- Fix: they cloned your hub repo instead of their fork. `git remote -v` shows whose repo `origin` points at — it must be `<their-username>/course-pr-practice`. Re-clone from the fork (or `git remote set-url origin git@github.com:<their-username>/course-pr-practice.git`).

## Common Error Messages Cheat Sheet

| Error | Cause | Fix |
|---|---|---|
| `nothing to commit, working tree clean` | tried to commit without staging | `git add <files>` first |
| `please tell me who you are` | git config user.name/email not set | lesson 01 |
| `Permission denied (publickey)` | SSH key not registered with GitHub | lesson 07 |
| `fatal: The current branch X has no upstream branch` | first push of a new branch | `git push -u origin X` |
| `CONFLICT (content): Merge conflict in <file>` | incoming + local edits to same lines | resolve manually, lesson 09 |
| `error: failed to push some refs` | remote has commits you don't have locally | `git pull` first, then push |
| `remote: Permission to X.git denied` (403) | pushing to a repo the student doesn't own | expected in lesson 09 Part 5; in lesson 10 it means they cloned the wrong repo — use their fork |
| `HEAD detached at <hash>` | you ran `git checkout <hash>` | `git switch main` |
| `fatal: not a git repository` | you're outside the repo dir | `cd ~/docker-course/fastapi-app` |

## Suggested Schedule (2 × 2-hour sessions)

| Session | Lessons | Notes |
|---|---|---|
| 1 (S8) | 00 – 06 | Local Git only — no internet needed. End with branch merge done. |
| 2 (S9) | 07 – 11 | GitHub + collaboration. Final checkpoint is a complete push → PR → review → merge cycle. |

## Q&A Pause Points

- After lesson 02 (the first commit — let them see it as a milestone)
- After lesson 06 (undoing things is mentally heavy — let them ask)
- After lesson 09 (first merge conflict — definitely let them ask)
- After lesson 11 (wrap-up; preview Module 05)
