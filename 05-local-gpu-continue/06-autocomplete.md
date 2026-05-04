# Lesson 06: Autocomplete

**By the end, you will have used tab autocomplete to write a real route in your FastAPI app.**

⏱ ~15 minutes of typing

> Autocomplete is the most-used Continue feature. As you type, the small base model predicts what comes next as **ghost text**. Tab to accept, keep typing to refine, Esc to dismiss.

```instructor
Say: "Tab autocomplete is the most-used Continue feature. The small base model predicts what comes next as ghost text. Tab accepts, keep typing refines, Esc dismisses."
Mention: "If no ghost text appears: check the Continue panel for errors, confirm the autocomplete model is in `ollama list`, and confirm `roles:` in config has it on `autocomplete`. Those are the four common causes."
Pause: After they accept their first ghost-text completion. Sit with it. The first time autocomplete writes a real line for them is the moment Continue clicks.
Say: "You're done when ghost text appears within ~500ms of a pause in typing AND they've shipped a real route in `routers/items.py` using mostly autocomplete."
```

---

**1.** Make sure your FastAPI repo is open in Cursor and the venv is **not** active in your terminal (autocomplete works regardless — keeping the prompt clean).

**2.** Open `routers/items.py`.

**3.** Find the `delete_item` function. Position your cursor at the end of that function's last line.

---

## Drill 1: complete a route

**4.** Press Enter twice to start a new function. Type:
```python


@router.put("/{item_id}", response_model=ItemOut)
```

**5.** Press Enter. Pause. Ghost text should appear suggesting a function signature.

**6.** Read the suggestion before pressing Tab. Does it look like:
```python
def update_item(item_id: int, item: ItemIn, db: Session = Depends(get_db)):
```
or something close? If yes, **Tab** to accept.

**7.** Press Enter. The model should now suggest the body — query, 404 check, mutation, commit, return.

**8.** Read each suggestion before accepting. Tab if it looks right; keep typing if you want to override.

**9.** End of the function — your file should have something like:
```python
@router.put("/{item_id}", response_model=ItemOut)
def update_item(item_id: int, item: ItemIn, db: Session = Depends(get_db)):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item
```
(Yours may differ in details — that's fine. Read it for correctness.)

**10.** Save.

---

## Drill 2: feel partial vs full accept

**11.** In the same file, position at the bottom and start typing a docstring for `update_item`:
```python
"""
```

**12.** Ghost text appears with a full docstring. **You can accept just the next word** with `Ctrl+→` (or `Cmd+→` on Mac) — that walks the suggestion one word at a time.

**13.** Try it: Tab once for the full suggestion, or `Ctrl+→` repeatedly for word-by-word.

**14.** Esc to dismiss the rest if you don't want it.

---

## Drill 3: refusing a bad suggestion

**15.** Position cursor on a new line at the bottom of `routers/items.py`. Type:
```python
def supercalifragilisticexpialidocious(
```

**16.** The autocomplete model will try to suggest something — likely garbage given the made-up name. Read the suggestion. **Do not accept.** Hit Esc.

**17.** Delete the line you typed.

**18.** **Lesson:** the model is a tool, not an oracle. Reading every suggestion before Tab is the habit.

---

## Drill 4: completing a test

**19.** Test your new route by curling it. First start the stack.
```bash
cd ~/docker-course/fastapi-app
docker compose up -d
sleep 3
```

**20.** Create an item to update.
```bash
curl -s -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Original","price":1.0}' | python3 -m json.tool
```
Note the `id` in the response.

**21.** PUT to update it (substitute your id):
```bash
curl -s -X PUT http://localhost:8000/items/<id> \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","price":2.0}' | python3 -m json.tool
```

**22.** Read the response — `name` and `price` should be the new values, `id` unchanged.

---

## Drill 5: turn it off when you don't want it

**23.** Sometimes ghost text is distracting. Open the command palette (`Ctrl+Shift+P`) and run **"Continue: Toggle Autocomplete Enabled"**.

**24.** Ghost text now stops appearing. Re-run the same command to turn it back on.

---

## Drill 6: commit your new code

**25.** This is real work — commit it.
```bash
git switch -c add-update-item-route
git add routers/items.py
git commit -m "Add PUT /items/{item_id} update route"
```

**26.** We won't push this branch yet — Module 04's PR drill is sufficient for now. Switch back to `main` and clean up:
```bash
git switch main
git merge add-update-item-route
git branch -d add-update-item-route
```

**27.** Log it.
```bash
echo "Autocomplete used to write PUT /items route" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Read every suggestion before Tab.** The 1.5B-base model is fast but limited. It will sometimes invent module names, miss imports, or hallucinate field names. Tab is a commitment.
- **Latency varies with file size.** Long files mean more context prefix to process — completions can take 1–2 seconds on big files. Patience.
- **Imports.** The autocomplete model often won't add `import` lines for symbols it uses. You'll fix imports manually or via Continue chat.
- **Ghost text only appears at the cursor.** It won't suggest in the middle of an existing line — only when you stop typing in a position where new code makes sense.

---

## Checkpoint

```bash
grep -A 1 "@router.put" routers/items.py
```
Should show your new PUT route decorator.

```bash
docker compose up -d && sleep 3 && curl -s -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name":"T","price":1}' | python3 -m json.tool
```
Should return a created item.

```bash
git log --oneline -1
```
Should show your "Add PUT /items/{item_id}" commit.

---

**Next up:** [07-inline-edit.md](07-inline-edit.md) — Tell the model to edit highlighted code
