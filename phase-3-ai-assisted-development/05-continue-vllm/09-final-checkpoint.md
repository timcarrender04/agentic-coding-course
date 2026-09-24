# Lesson 09: Final Checkpoint

**Time:** ~20 min — **no instructor help.**

Build a small feature using the full local stack: Continue.dev + local Ollama, against the FastAPI repo, shipped through a Gitea PR (Module 04 workflow).

---

## The task

Add a **`GET /items/search?q=<query>`** route that returns all items whose `name` contains the query string (case-insensitive).

You decide how to use the AI — chat, autocomplete, inline edit, or agent mode. The point is to use the local stack to ship a real feature.

---

## Constraints

- The route must be on the existing items router (`routers/items.py`).
- Use SQLAlchemy `ilike` or equivalent for case-insensitive matching.
- Return a list of `ItemOut`.
- An empty query (`q=` or missing) returns all items (or a 400 — your call, justify it in the PR).
- Test it with curl from the terminal **and** from `/docs`.
- Ship it through a feature branch + PR + merge on Gitea.

---

## Suggested workflow

**1.** Branch.
```bash
cd ~/docker-course/fastapi-app
git switch main
git pull
git switch -c add-item-search
```

**2.** Use whichever Continue mode you prefer to build the route. **Read every diff before accepting.**

**3.** Restart the stack and verify with curl:
```bash
docker compose restart api
sleep 3
# create a couple of items first if needed
curl -s "http://localhost:8000/items/search?q=apple" | python3 -m json.tool
```

**4.** Open `/docs` and try the route from Swagger UI.

**5.** Commit, push, open a PR on Gitea, leave at least one self-review comment, merge, delete the branch.

```bash
git add routers/items.py
git commit -m "Add /items/search route"
git push -u origin add-item-search
# then PR + merge in the Gitea web UI
git switch main
git pull
git branch -d add-item-search
```

---

## Acceptance test

After merging:

```bash
git log --oneline --graph -5
```
Should show the merge commit from your PR.

```bash
docker compose up -d
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:8000/items/search?q=anything"
```
Should print `200`.

```bash
# create test data
curl -s -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name":"Apple","price":1}' > /dev/null
curl -s -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name":"Banana","price":2}' > /dev/null
curl -s "http://localhost:8000/items/search?q=app" | python3 -m json.tool
```
Should return one item (the apple), not the banana.

---

## What to submit

A screenshot showing **all of these** in one image:
1. Cursor with the new code visible in `routers/items.py` and the Continue chat panel showing the prompt you used.
2. A terminal with the search curl returning matching items.
3. The Gitea PR page showing your PR as **Merged**.

---

## Self-grade

You pass this module if:

- [ ] The search endpoint behaves as specified.
- [ ] You used Continue.dev (chat / inline edit / agent mode — any combination) and the local Ollama model to build it.
- [ ] The PR was opened, reviewed (one comment minimum), and merged on Gitea.
- [ ] You did **not** sign in to Cursor's paid AI service.

Then:
```bash
echo "Module 05 final checkpoint: passed $(date -Iseconds)" >> ~/docker-course/notes/notes.txt
```

---

## What's next

Module 06 (session 12) drills effective prompting and refactoring patterns against this same repo, same stack. The hard infrastructure work is done — from here it's about getting better at *using* the agent.
