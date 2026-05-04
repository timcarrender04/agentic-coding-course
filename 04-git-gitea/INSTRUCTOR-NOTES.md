# Instructor Notes — Module 04: Git and Gitea

## TODO before class

- [ ] **Provision the Gitea instance.** Decide between: (a) a single shared Gitea host you maintain, (b) one Gitea container per student via `docker run` on their machine, or (c) a public/community Gitea (gitea.com). Most instructor-led courses go with (a). Document the URL, e.g. `https://gitea.example.com` or `http://gitea.local:3000`.
- [ ] **Replace `<INSTRUCTOR-PROVIDED-GITEA-URL>` placeholders.** Search this module for the placeholder and substitute your actual URL. Same for `<INSTRUCTOR-PROVIDED-USERNAME>` examples in lessons 07–10.
- [ ] **Pre-create student accounts** on Gitea (or be ready to walk them through self-registration at the start of lesson 07). Lesson 07 assumes the account already works.
- [ ] **Decide on lesson 10's collaboration mode.** Two options:
  1. **Pair students up.** Student A and B fork each other's repos and review each other's PRs. More realistic, more chaos.
  2. **Solo simulation.** Each student clones their own repo to a second directory and opens a PR from there. Less realistic, more predictable.
  Both are written into lesson 10. Pick one before class and brief students.
- [ ] **Verify SSH access from student machines to the Gitea host's port 22 (or the configured Gitea SSH port).** Some classroom firewalls block outbound 22. If so, fall back to HTTPS pushes with personal access tokens — note this in the lesson 07 walkthrough.

## General Tips

- **Git is muscle memory.** Same drill philosophy as Modules 01 and 03 — students type every command. Resist the urge to give them aliases or wrappers; those come after the fundamentals stick.
- **The commit graph is the mental model.** When a student is confused, draw the commit graph on a whiteboard. It almost always solves the confusion.
- **`git status` is the answer.** When a student says "Git is broken," 95% of the time `git status` tells them exactly what's going on. Drill it constantly. Make it a tic.
- **No `git reset --hard` until lesson 06.** And then with capital-letter warnings. It's the only Git command in this module that can lose work.
- **Browser is a real tool here.** Lessons 07–10 require students to keep the Gitea web UI and Cursor open side-by-side. Make sure their screens can hold both.

## Where Students Get Stuck (in priority order)

### #1 — Forgetting to stage before commit
- Symptom: `nothing to commit, working tree clean` or commit succeeds but is empty.
- Fix: students think `git commit` alone commits all changes. It doesn't. They must `git add <file>` first. Drill `git add . && git commit -m "..."` as the most common pattern but **also** show selective `git add <file>` so they understand what staging means.

### #2 — Confusing branch state
- Symptom: edits show up "missing" because the student is on the wrong branch.
- Fix: `git branch` (lists branches, shows current with `*`) or look at the bottom-left of Cursor — it shows the current branch.

### #3 — SSH key auth failures (lesson 07)
- Symptom: `Permission denied (publickey)` when pushing.
- Causes: key not added to Gitea, key file permissions wrong (`chmod 600` it), wrong account, or pushing over HTTPS while expecting SSH.
- Diagnostic: `ssh -T git@<gitea-host>` should print "Hi <username>! You've successfully authenticated..."

### #4 — Merge conflicts (lesson 09)
- Symptom: "CONFLICT (content): Merge conflict in <file>" + Cursor shows the `<<<<<<<` markers.
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

## Common Error Messages Cheat Sheet

| Error | Cause | Fix |
|---|---|---|
| `nothing to commit, working tree clean` | tried to commit without staging | `git add <files>` first |
| `please tell me who you are` | git config user.name/email not set | lesson 01 |
| `Permission denied (publickey)` | SSH key not registered with Gitea | lesson 07 |
| `fatal: The current branch X has no upstream branch` | first push of a new branch | `git push -u origin X` |
| `CONFLICT (content): Merge conflict in <file>` | incoming + local edits to same lines | resolve manually, lesson 09 |
| `error: failed to push some refs` | remote has commits you don't have locally | `git pull` first, then push |
| `HEAD detached at <hash>` | you ran `git checkout <hash>` | `git switch main` |
| `fatal: not a git repository` | you're outside the repo dir | `cd ~/docker-course/fastapi-app` |

## Suggested Schedule (2 × 2-hour sessions)

| Session | Lessons | Notes |
|---|---|---|
| 1 (S8) | 00 – 06 | Local Git only — no internet needed. End with branch merge done. |
| 2 (S9) | 07 – 11 | Gitea + collaboration. Final checkpoint is a complete push → PR → review → merge cycle. |

## Q&A Pause Points

- After lesson 02 (the first commit — let them see it as a milestone)
- After lesson 06 (undoing things is mentally heavy — let them ask)
- After lesson 09 (first merge conflict — definitely let them ask)
- After lesson 11 (wrap-up; preview Module 05)
