# Lesson 08: Agent Mode

**By the end, you will have used Continue's agent mode to make a multi-file change with shell command tool calls — accepting and rejecting individual steps along the way.**

⏱ ~25 minutes

> **Agent mode** lets the model do more than chat or edit one selection. It can list files, read files, write files, and run shell commands — chaining tool calls to complete a higher-level task. **Every tool call is gated on your approval.** You watch what it wants to do, you approve or reject, you keep control.

---

## Concept

Three modes Continue supports (toggled at the bottom of the chat panel):

| Mode | What the model can do |
|---|---|
| **Chat** | Read files you `@`-reference. No edits. No commands. (Lesson 05.) |
| **Edit** | Edit highlighted code via the `Ctrl+I` flow. Single-file scope. (Lesson 07.) |
| **Agent** | Read files itself, write files itself, run shell commands itself — gated by your approval. Multi-file. |

Agent mode is the closest thing local LLMs have to "the AI is doing the work." It's also where bad models go to wreck your repo, so you read every step.

---

## Step 1: switch to agent mode

**1.** Open the Continue chat panel.

**2.** At the bottom of the panel, find the mode dropdown (or the toggle next to the model picker — the UI moved a few times). Switch to **Agent**.

**3.** The chat input now shows a hint about tool use. Some agent UIs show available tools (read, write, run) listed.

---

## Step 2: a small agent task

**4.** Make sure the FastAPI repo is open and your tree is clean.
```bash
cd ~/docker-course/fastapi-app
git status
```

**5.** Create a feature branch (good hygiene — agent mode is going to make changes).
```bash
git switch -c agent-add-status-route
```

**6.** In Continue's agent chat, type:
```
Add a new route GET /status to the FastAPI app that returns:
{
  "uptime_seconds": <how long the process has been running>,
  "items_count": <number of items in the database>
}

Steps:
1. Find an appropriate file to add the route to (probably main.py or a new router).
2. Implement the route.
3. Show me the change before applying it.
4. After I approve, run a curl against /status to verify.
```
Send.

---

## Step 3: watch and approve

**7.** The agent will start working. You'll see a series of **tool calls** — each one with an "Approve" button.

**8.** A typical sequence:
   - `read main.py` — agent reads the file. Click **Approve**.
   - `read routers/items.py` — agent learns the pattern. Click Approve.
   - `propose edit to main.py` — agent shows a diff adding the `/status` route. **Read the diff.** If it looks right, Approve. If wrong, Reject and ask the agent to redo.
   - `run curl http://localhost:8000/status` — **but the stack might not be running.** The agent might need to start it first.

**9.** **Read each step.** Some prompts you'll commonly see:
   - "Should I run `docker compose up -d`?" — yes if your stack is down.
   - "Should I write `models.py`?" — only if you understand why.
   - "Should I run `rm <something>`?" — almost always **no**, then ask why.

**10.** If the agent makes a mistake (added an import to the wrong file, used a function that doesn't exist), reject the bad step and either:
   - Type new instructions: `That import goes at the top of main.py, not in routers/items.py. Try again.`
   - Or take over manually with `Ctrl+I` (lesson 07).

---

## Step 4: verify

**11.** Once the agent reports done, manually verify.
```bash
docker compose up -d
sleep 3
curl -s http://localhost:8000/status | python3 -m json.tool
```
You should see `uptime_seconds` and `items_count` keys.

**12.** Look at what changed.
```bash
git diff
```
Read every line. Agent-generated code is no different from human-generated code — read it.

---

## Step 5: commit and merge

**13.** If the change is good, commit. Otherwise revert.
```bash
git add -A
git commit -m "Add /status route via agent mode"
git switch main
git merge agent-add-status-route
git branch -d agent-add-status-route
```

---

## Drill 2: a multi-file change

**14.** Switch to a new branch.
```bash
git switch -c agent-add-tags
```

**15.** Agent task:
```
Add a 'tags' field to items, stored as a comma-separated string in the DB. Steps:

1. Update the SQLAlchemy Item model to add `tags: str | None`.
2. Update the Pydantic ItemIn and ItemOut models to include `tags: list[str] | None`.
3. In the create_item route, accept a list of strings and store them comma-joined.
4. In the read endpoints, split the stored string back into a list.
5. After applying, restart the stack and curl POST /items with a tags array, then GET /items/<id> to verify the round-trip.

Show me each file change before applying.
```

**16.** Watch the agent. This is multi-file:
   - `models.py` (new column)
   - `routers/items.py` (Pydantic models + serialize/deserialize)
   - Possibly a `docker compose down -v && docker compose up -d` to recreate the schema (the agent should suggest this — `Base.metadata.create_all` doesn't add columns to existing tables)

**17.** **Read every diff.** If the agent forgets to recreate the DB schema, the new column won't exist and POST will fail. Coach it:
```
The schema needs to be recreated. Run docker compose down -v then docker compose up -d.
```

**18.** Verify with a real round-trip:
```bash
curl -s -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Tagged","price":1.0,"tags":["red","sale"]}' | python3 -m json.tool
```
Then GET it back and confirm `tags` round-trips as an array.

**19.** Commit if good, revert if bad.
```bash
git status
git add -A
git commit -m "Add tags field to items via agent mode"
git switch main
git merge agent-add-tags
git branch -d agent-add-tags
```

---

## When agent mode goes wrong

**20.** Common failure modes with a 7B model:

| Symptom | Cause | What to do |
|---|---|---|
| Agent loops trying the same broken edit | model lost track of state | New chat, smaller scope, more explicit steps |
| Agent invented a function name | hallucination | Reject, ask "Show me where that function is defined" |
| Agent wants to `rm` your files | aggressive cleanup | **Reject** every destructive command unless you explicitly asked |
| Agent never finishes the task | context filled up | New chat, narrower scope |

**21.** **Default to skepticism.** A local 7B model is good for surgical edits and small features. It is not GPT-4. For bigger tasks, decompose them yourself and use agent mode on each piece.

---

## Step 6: log it

**22.** Log the lesson.
```bash
echo "Agent mode drilled: /status route + tags field on items" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Approve every tool call deliberately.** "Yes to all" is a footgun. The whole point of the approve gate is human-in-the-loop.
- **Branch first.** Always `git switch -c agent-<thing>` before letting the agent make changes. Easy to revert if the result is junk.
- **Schema migrations.** SQLAlchemy's `create_all` only creates tables that don't exist — it won't add columns. If the agent changes a model, the DB needs to be recreated (lose data) or migrated (Alembic, future module).
- **Small scope wins.** Three-step agent tasks succeed often. Ten-step ones rarely do on a 7B model. Decompose.

---

## Checkpoint

```bash
curl -s http://localhost:8000/status | python3 -m json.tool 2>/dev/null
```
Should print a JSON with at least `uptime_seconds` (or fail cleanly if you reverted — both are fine for the checkpoint).

```bash
git log --oneline -3
```
Should show your "via agent mode" commits.

```bash
git status
```
Should be clean.

---

**Next up:** [09-final-checkpoint.md](09-final-checkpoint.md) — Ship a feature end-to-end with the local stack
