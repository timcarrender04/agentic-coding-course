# course-pr-practice

The class PR dojo. Every student in the course lands **one pull request** here (Module 04, lesson 10) and **reviews one classmate's PR**. By the end of the module, `students/` is a roster the whole cohort built together — one merged PR per person.

## The exercise

1. **Fork** this repo (top-right on GitHub) — you can't push here directly, and that's the point.
2. Clone **your fork**:
   ```bash
   git clone git@github.com:<your-username>/course-pr-practice.git
   cd course-pr-practice
   ```
3. Make a branch named after yourself:
   ```bash
   git switch -c add-<your-username>
   ```
4. Copy the example card and fill it in:
   ```bash
   cp students/_example.md students/<your-username>.md
   ```
5. Commit, push to **your fork**, and open a **pull request** back to this repo:
   ```bash
   git add students/<your-username>.md
   git commit -m "Add <your-username>'s card"
   git push -u origin add-<your-username>
   ```
   Then click the **"Compare & pull request"** banner on GitHub.
6. **Review a classmate's open PR** — open the *Pull requests* tab here, pick one that has no review yet, read the *Files changed* tab, and leave at least one comment. See [CONTRIBUTING.md](CONTRIBUTING.md) for what a good comment looks like.

The instructor merges PRs during the Wednesday lab clinic.

## Rules

- One file only: `students/<your-github-username>.md`. Don't touch anyone else's card, the README, or the example.
- Branch name: `add-<your-github-username>`.
- Everything here is public. Course exercises only — no personal info beyond what the card asks for.
