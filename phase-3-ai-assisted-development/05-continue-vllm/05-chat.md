# Lesson 05: Chat

**By the end, you will have used `@file`, `@codebase`, `@diff`, and `@terminal` to bring real context from your FastAPI repo into a chat.**

⏱ ~20 minutes of typing + reading

> Plain "explain this" chat is fine, but the magic is **context**. Continue's `@` providers pull files, diffs, terminal output, and whole codebases into the prompt before the model sees it.

```instructor
Say: "Plain chat is fine, but the magic is CONTEXT. Today we drill four `@` providers — `@file`, `@codebase`, `@diff`, `@terminal` — to bring real code into the prompt."
Mention: "`@codebase` blows the 32k context window on big repos. Use it for 'find me where X happens' questions, not 'rewrite all of X.' Drill the right shape of question."
Pause: After their first `@file` query lands. Compare the answer with and without the file attached — same question, two different answers. That's the whole lesson.
Say: "You're done when they've used all four providers in real questions about their FastAPI repo and gotten coherent answers."
```

---

**1.** In Cursor, open the FastAPI project.
```bash
cd ~/docker-course/fastapi-app
```
Then `File → Open Folder…` and pick `~/docker-course/fastapi-app`.

**2.** Open the Continue side bar (CN icon in the activity bar). Confirm the model picker shows **Qwen 2.5 Coder 7B**.

---

## Drill 1: a vanilla question

**3.** In the chat box, type:
```
Explain what FastAPI's @app.post decorator does and how it differs from @app.get.
```
Send. Read the response. Note the latency — first token in a few seconds, then a stream.

---

## Drill 2: ask about a specific file

**4.** Type `@` in the chat box. A picker appears. Type `file` and select **File**.

**5.** A file-picker opens. Pick `main.py` from your repo.

**6.** After the `@main.py` chip appears in the input, type:
```
Walk me through what main.py does, line by line.
```
Send.

**7.** Read the response. The model now has the actual contents of `main.py` and references real lines. **This is what beats googling — the model sees your code.**

---

## Drill 3: ask about a router

**8.** New chat (click the `+` icon at the top of the Continue panel — fresh context).

**9.** Reference `routers/items.py`:
```
@routers/items.py
What HTTP methods does this router expose, and what does each one do?
```
Send. Read.

---

## Drill 4: `@codebase` — full repo context

**10.** New chat.

**11.** Type:
```
@codebase
Where in this project does the database connection get created? Reference the file and line if possible.
```
Send.

**12.** `@codebase` triggers Continue to **embed and search** your whole repo (it builds an index in the background; the first use after opening a folder takes a few seconds). The model gets the most relevant chunks, then answers.

**13.** Read the answer. It should mention `database.py` and the `engine = create_engine(...)` line.

---

## Drill 5: `@diff` — what's changed since the last commit

**14.** Make a small uncommitted change. Open `main.py` and add a single comment at the top:
```python
# This is a Module 05 chat-context test
```

**15.** Save. **Don't commit.**

**16.** New chat in Continue.
```
@diff
Summarize the change I'm about to commit.
```

**17.** The model receives the `git diff` output and summarizes. Useful for writing commit messages.

**18.** Undo the change before moving on (`Ctrl+Z`, save).

---

## Drill 6: `@terminal` — pull recent terminal output

**19.** In Cursor's terminal, run:
```bash
docker compose up -d 2>&1 | head -n 5
```

**20.** New Continue chat.
```
@terminal
What did Docker Compose just do?
```

**21.** The model sees your terminal scrollback and explains. Useful for "what does this error mean."

**22.** Force an error to feel this in anger:
```bash
docker run --not-a-real-flag
```

**23.** New chat.
```
@terminal
What's wrong with the last command I ran?
```
Read the answer — it should explain the flag is invalid and suggest `docker run --help`.

---

## Drill 7: combine providers

**24.** New chat.
```
@file:routers/items.py @file:routers/users.py
The items router has a class for input/output Pydantic models. The users router has a similar pattern. Compare the two and tell me whether they're consistent.
```

**25.** The model gets both files in context and compares. This is faster than reading both yourself.

---

## Drill 8: ask for a code suggestion (don't apply yet)

**26.** New chat.
```
@file:routers/items.py
Write a `PUT /items/{item_id}` route that updates an existing item. Return 404 if not found. Use the same pattern as `delete_item`.
```

**27.** The model proposes code. Read it carefully — does it look like the existing patterns? Does it use the same `models`, `db`, `HTTPException`?

**28.** **Don't click "Apply" yet** — we'll cover apply/edit in lesson 07. For now, just read the suggestion and verify it looks reasonable. Keep it open for lesson 07.

---

**29.** Log it.
```bash
echo "Chat drilled: @file, @codebase, @diff, @terminal" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Context is finite.** Qwen 2.5 Coder 7B has a 32k token context. `@codebase` on a huge repo will hit the cap and the model will lose detail. Use `@file` for surgical questions, `@codebase` only when you're searching.
- **The model can be wrong.** It will sometimes invent function names or APIs. Read the response, don't trust blindly. If you're going to apply changes (lesson 07), read the diff first.
- **New chat for new topics.** Continue keeps conversation memory in the chat session. Switching topics? `+` icon for a fresh chat. Stale context confuses the model.
- **Don't paste secrets.** Anything you put in the chat goes into the model's prompt. With local Ollama, that prompt stays on your machine — but get the hygiene habit anyway.

---

## Checkpoint

In Continue, you have:
- [ ] Sent a chat message and received a response.
- [ ] Used `@file` to bring a specific file into context.
- [ ] Used `@codebase` to ask a search-flavored question.
- [ ] Used `@diff` to summarize uncommitted changes.
- [ ] Used `@terminal` to ask about recent terminal output.

---

**Next up:** [06-autocomplete.md](06-autocomplete.md) — Tab-completing as you type
