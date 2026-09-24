# Lesson 07: Final Checkpoint

**Time:** ~20 min — **no instructor help.**

Cumulative drill: ship one new frontend feature end-to-end using Continue.dev as your AI assistant.

---

## The task

Add a **search box** at the top of the items page that filters the displayed items by name as you type. **Client-side filter only** — no new backend route needed (this is purely a frontend exercise).

### Requirements

- A HeroUI `Input` with a search icon (or `placeholder="Search items..."`).
- As the user types, the items list filters in real time. Case-insensitive match against `name`.
- Empty search box shows all items.
- The "No items yet" empty state is replaced with "No items match your search" when filtering returns zero results but `items.length > 0`.

You decide how to use Continue: chat for ideas, inline edit for surgical changes, or agent mode for a multi-step change.

---

## Suggested workflow

**1.** Branch.
```bash
cd ~/docker-course/fastapi-frontend
git switch main
git switch -c add-item-search
```

**2.** Use Continue.dev to make the change. Read every diff before accepting.

**3.** Verify in the browser:
- Type something — items filter live.
- Clear the box — all items return.
- Type something with no matches — see the "No items match" message.

**4.** Commit, push, open a PR (or merge locally if no Gitea origin).
```bash
git add app/page.tsx
git commit -m "Add client-side search filter for items"
# git push -u origin add-item-search   # if you set up the frontend on Gitea
git switch main
git merge add-item-search
git branch -d add-item-search
```

---

## Acceptance test

After merging:

In the browser at `http://localhost:3000`:
- A search Input appears above the items list.
- Typing `a` filters to items whose name contains `a` (case-insensitive).
- Clearing the search box restores the full list.
- Typing `zzzzzz` shows the "No items match your search" message.

```bash
grep -i "search\|filter" app/page.tsx | head -n 5
```
Should show search/filter logic.

```bash
git log --oneline -1
```
Should show the merge or commit from this checkpoint.

---

## What to submit

A screenshot showing **all of these** in one image:
1. The browser at `localhost:3000` with the search box visible.
2. The list filtered by a typed query.
3. The Continue chat panel showing the prompt you used to build it.
4. A terminal with `git log --oneline -3`.

---

## Self-grade

You pass this module if:

- [ ] You used **Continue.dev with the local Ollama model** to build the feature (chat, edit, or agent mode — any combination).
- [ ] The search box behaves as specified.
- [ ] The change was committed (and pushed/merged if you set up the frontend on Gitea).
- [ ] You did **not** sign in to Cursor's paid AI service.

```bash
echo "Module 06 final checkpoint: passed $(date -Iseconds)" >> ~/docker-course/notes/notes.txt
```

---

## What you have now

A real full-stack slice:

- **Backend:** FastAPI + Postgres + SQLAlchemy in Docker Compose.
- **Frontend:** Next.js + HeroUI + Tailwind talking to the backend over CORS.
- **Tooling:** Cursor + Continue.dev + local Ollama for AI assistance, Gitea for version control.
- **Workflow:** branch → AI-assisted edit → diff review → commit → PR → merge.

That's the shape of every real product team's setup, just smaller. Don't delete any of this — Modules 07 and 08 build on it.

---

## What's next

Module 07 (sessions 13–14) introduces **agents and tool use** at the API level — building agents that call tools (including your FastAPI endpoints) using the same local Ollama model.
