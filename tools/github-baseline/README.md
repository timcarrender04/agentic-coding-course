# GitHub Baseline Repos

Two repos the instructor publishes on **public GitHub** before Module 04 starts. Everything here is a basic course exercise — nothing proprietary goes public.

| Scaffold | GitHub repo | Purpose |
|---|---|---|
| [`course-items-api/`](./course-items-api/) | `<INSTRUCTOR-GITHUB-USERNAME>/course-items-api` (**Template repo**) | Reference copy of the Module 03 FastAPI project at the state students enter Module 04 with. Fallback for anyone whose own project is broken, and the instructor's live-demo repo. |
| [`course-pr-practice/`](./course-pr-practice/) | `<INSTRUCTOR-GITHUB-USERNAME>/course-pr-practice` | Hub for the Module 04 lesson 10 cross-sharing exercise: every student forks it, adds a `students/<username>.md` card on a branch, opens a PR back, and reviews one classmate's PR. |

## Publishing (one-time, ~10 min)

For each scaffold directory:

1. On github.com: **New repository** → name it as above → **Public** → do **not** initialize with a README (the scaffold has one).
2. Push the scaffold:

```bash
cd tools/github-baseline/course-items-api   # or course-pr-practice
git init && git add . && git commit -m "Course baseline"
git branch -M main
git remote add origin git@github.com:<INSTRUCTOR-GITHUB-USERNAME>/course-items-api.git
git push -u origin main
```

3. `course-items-api` only: repo **Settings → General →** check **Template repository** (students use "Use this template" to get their own copy).
4. `course-pr-practice` only: **Settings → Branches →** add a branch protection rule on `main` requiring a pull request before merging — so student PRs are the only way in, and nobody force-pushes over the roster.

Then share `<INSTRUCTOR-GITHUB-USERNAME>` with the cohort (D2L content item, same place as the vLLM endpoint details).

## Between cohorts

`course-pr-practice` accumulates student cards and merged PRs. For a fresh cohort either delete/recreate the repo, or clear `students/` (keep `_example.md`) in a single commit.
