# Module 04: Git & GitHub

See [`../COURSE-SCHEDULE.md`](../../docs/COURSE-SCHEDULE.md) for the full 8-week, 16-session calendar. This module spans **sessions 8 and 9**.

This module turns your FastAPI app from Module 03 into a real Git repository, then pushes it to **GitHub** — a free account on github.com, with your course repos **public**. Public is deliberate: classmates can browse, clone, and open pull requests on each other's repos, exactly like real open source. Only basic course exercises go public, so there's nothing sensitive at stake. By the end, you'll have committed, branched, merged, pushed, opened a pull request, reviewed a classmate's code, and merged your PR. Same workflow you'll use at any company that uses Git.

## What you'll be able to do at the end of this module

- Configure Git (`user.name`, `user.email`, `init.defaultBranch`)
- Initialize a repo, stage, commit, and read a clean history
- Use `git status`, `git diff`, `git log` confidently
- Create branches, switch between them, and merge them back
- Recover from common mistakes (`git restore`, `git reset`, `git checkout`)
- Generate an SSH key and add it to your GitHub account
- Push a local repo to a public GitHub remote
- Clone a repo from GitHub (your own **and** a classmate's), pull updates, and resolve a basic conflict
- Open a pull request, review someone else's PR, and merge it
- Fork a repo you can't push to and open a cross-fork PR

## Prerequisites

- **Module 01** complete (terminal + apt)
- **Module 03** complete (you should have `~/docker-course/fastapi-app/` populated and working)
- A **free github.com account** (created in lesson 07 if you don't have one — use the same email as your Git config)
- The instructor's GitHub username (the instructor will share this in class; lessons write it as `<INSTRUCTOR-GITHUB-USERNAME>`)
- An internet connection (github.com must be reachable)

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
| 07 | [07-github-account-and-ssh.md](07-github-account-and-ssh.md) | GitHub Account and SSH | ~20 min |
| 08 | [08-pushing-to-github.md](08-pushing-to-github.md) | Pushing to GitHub | ~15 min |
| 09 | [09-cloning-and-pulling.md](09-cloning-and-pulling.md) | Cloning, Pulling, and Conflicts | ~20 min |
| 10 | [10-pull-requests.md](10-pull-requests.md) | Pull Requests | ~35 min |
| 11 | [11-final-checkpoint.md](11-final-checkpoint.md) | Final Checkpoint | ~20 min |

**Total estimated time: ~3h 35m** across 2 sessions.

## What's next

Module 05 starts using Continue.dev's AI features in VS Code against this same repo. Don't delete `~/docker-course/fastapi-app/` — and from this module forward, every change you make to it will be a commit.
