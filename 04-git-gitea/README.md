# Module 04: Git and Gitea

See [`../COURSE-SCHEDULE.md`](../COURSE-SCHEDULE.md) for the full 8-week, 16-session calendar. This module spans **sessions 8 and 9**.

This module turns your FastAPI app from Module 03 into a real Git repository, then pushes it to **Gitea** — a self-hosted Git service like GitHub but running on your instructor's infrastructure. By the end, you'll have committed, branched, merged, pushed, opened a pull request, reviewed code, and merged the PR. Same workflow you'll use at any company that uses Git.

## What you'll be able to do at the end of this module

- Configure Git (`user.name`, `user.email`, `init.defaultBranch`)
- Initialize a repo, stage, commit, and read a clean history
- Use `git status`, `git diff`, `git log` confidently
- Create branches, switch between them, and merge them back
- Recover from common mistakes (`git restore`, `git reset`, `git checkout`)
- Generate an SSH key and add it to your Gitea account
- Push a local repo to a Gitea remote
- Clone a repo from Gitea, pull updates, and resolve a basic conflict
- Open a pull request, review someone else's PR, and merge it
- Link commits and PRs to issues

## Prerequisites

- **Module 01** complete (terminal + apt)
- **Module 03** complete (you should have `~/docker-course/fastapi-app/` populated and working)
- The instructor-provided Gitea URL (the instructor will share this in lesson 07)
- An internet connection (or LAN connection to the Gitea host)

## Lessons

| # | File | Title | Est. Time |
|---|------|-------|-----------|
| 00 | [00-prerequisites-check.md](00-prerequisites-check.md) | Prerequisites Check | ~5 min |
| 01 | [01-git-config.md](01-git-config.md) | Configure Git | ~10 min |
| 02 | [02-init-and-first-commit.md](02-init-and-first-commit.md) | Init and First Commit | ~15 min |
| 03 | [03-status-add-commit.md](03-status-add-commit.md) | The status / add / commit Cycle | ~15 min |
| 04 | [04-diff-and-log.md](04-diff-and-log.md) | Diff and Log | ~15 min |
| 05 | [05-branches.md](05-branches.md) | Branches | ~25 min |
| 06 | [06-undoing-things.md](06-undoing-things.md) | Undoing Things | ~20 min |
| 07 | [07-gitea-account-and-ssh.md](07-gitea-account-and-ssh.md) | Gitea Account and SSH Key | ~20 min |
| 08 | [08-pushing-to-gitea.md](08-pushing-to-gitea.md) | Pushing to Gitea | ~15 min |
| 09 | [09-cloning-and-pulling.md](09-cloning-and-pulling.md) | Cloning, Pulling, and Conflicts | ~20 min |
| 10 | [10-pull-requests.md](10-pull-requests.md) | Pull Requests | ~25 min |
| 11 | [11-final-checkpoint.md](11-final-checkpoint.md) | Final Checkpoint | ~20 min |

**Total estimated time: ~3h 25m** across 2 sessions.

## What's next

Module 05 starts using Cursor's AI features against this same repo. Don't delete `~/docker-course/fastapi-app/` — and from this module forward, every change you make to it will be a commit.
