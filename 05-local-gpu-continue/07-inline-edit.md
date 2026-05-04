# Lesson 07: Inline Edit

**By the end, you will have used `Ctrl+I` to highlight code and ask the model to change it — accepting, rejecting, and partially accepting the diff.**

⏱ ~15 minutes of typing + reading diffs

> Inline edit (`Ctrl+I`) is the second-most-used Continue feature. You select code, describe a change, the model proposes a diff, and you accept or reject it line by line.

---

**1.** Open `routers/items.py` in Cursor.

**2.** Confirm clean state.
```bash
cd ~/docker-course/fastapi-app && git status
```

---

## Drill 1: rename a function

**3.** Find the `read_item` function. **Highlight the entire function** (from `@router.get(...)` decorator through the end of the body).

**4.** Press **`Ctrl+I`** (Cmd+I on Mac). A small input box appears at the top of the editor.

**5.** Type:
```
Rename this function from read_item to get_item_by_id. Update the function name only — keep the route path and behavior identical.
```

**6.** Press Enter.

**7.** A diff overlay appears in your editor. Red = removed, green = added. Read it carefully.

**8.** If it looks right, click **Accept** (or press the accept shortcut shown — usually `Ctrl+Enter`).

**9.** If it looks wrong, click **Reject** (`Esc` or `Ctrl+Z` after accepting).

**10.** You can also **accept partial** — accept some hunks of the diff and reject others. Look for the per-hunk buttons.

**11.** Confirm the function was renamed.
```bash
grep -n "def get_item_by_id\|def read_item" routers/items.py
```
You should see the new name and not the old one.

---

## Drill 2: add error handling

**12.** Find the `update_item` function you wrote in lesson 06. Highlight the **body** of the function (the four-or-so lines after the `def` line).

**13.** `Ctrl+I`. Type:
```
Add a check at the start of the body: if item.price is provided and is <= 0, raise HTTPException 400 with the message "price must be positive". Keep the rest of the logic the same.
```

**14.** Read the proposed diff. The model should add a 2–3 line check before the existing logic.

**15.** Accept if it's right; reject and re-prompt if not.

**16.** Confirm.
```bash
grep -B 1 "price must be positive" routers/items.py
```

---

## Drill 3: extract a helper

**17.** Highlight the `db.query(models.Item).filter(models.Item.id == item_id).first()` line that appears in `read_item`/`get_item_by_id`, `update_item`, and `delete_item` — pick **one occurrence**.

**18.** `Ctrl+I`. Type:
```
This pattern repeats. Extract it into a helper function `get_item_or_404(db, item_id)` defined at the top of the file (after imports, before the router) that does the query and the 404 check. Then use the helper here. Don't change the other call sites yet.
```

**19.** This is a bigger change. The model may propose multi-line changes. Read carefully.

**20.** Accept. Now manually update the **other** two call sites (`update_item`, `delete_item`) to use the helper. You can do each with `Ctrl+I` again — highlight just the query+404 lines and ask the model to "use the get_item_or_404 helper instead."

**21.** Run a quick syntax check:
```bash
python3 -c "import ast; ast.parse(open('routers/items.py').read()); print('OK')"
```
You should see `OK`.

**22.** Restart the stack and confirm endpoints still work.
```bash
docker compose restart api
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/items
```
Should print `200`.

---

## Drill 4: write a test

**23.** Open a fresh terminal.
```bash
cd ~/docker-course/fastapi-app
source .venv/bin/activate
pip install pytest httpx
```

**24.** Create a test file.
```bash
mkdir -p tests
touch tests/__init__.py
touch tests/test_items.py
```

**25.** Open `tests/test_items.py`. Type only:
```python
from fastapi.testclient import TestClient

from main import app


client = TestClient(app)
```
Save.

**26.** Highlight the whole file. `Ctrl+I`. Type:
```
Add a pytest test function called test_create_and_read_item that:
1. POSTs a new item to /items with name "Test" and price 1.0
2. asserts the response status is 201
3. extracts the id from the response
4. GETs /items/{id}
5. asserts the response status is 200 and the name matches.
```

**27.** Read the diff. Accept if reasonable.

**28.** Run the test (note: this runs the app in-process against an in-memory or whatever DB the test client uses — it'll likely fail if your code requires the real Postgres. That's fine for the drill, you saw the model write a real test).
```bash
pytest tests/test_items.py -v 2>&1 | tail -n 20
```

**29.** **Don't worry about test pass/fail right now** — getting the test infrastructure wired up properly is its own module. The point is you wrote a real test by describing it.

---

## Drill 5: clean up + commit

**30.** Deactivate venv (we're done with the test).
```bash
deactivate
```

**31.** Commit the helper extraction.
```bash
git add routers/items.py
git commit -m "Extract get_item_or_404 helper"
```

**32.** The test file is in-progress; leave it for now or commit it as a WIP.
```bash
git add tests/
git commit -m "WIP: add first integration test"
```

**33.** Log it.
```bash
echo "Inline edit drilled: rename, add validation, extract helper, write test" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **Always read the diff.** Inline edit produces real changes to your file. Accept blindly and you'll spend an hour debugging "why does my route return 500." Habit: read every red and green line.
- **Smaller selections = better edits.** Highlighting a whole 200-line file and saying "fix all the things" leads to chaos. Pick the smallest scope that contains the change you want.
- **Imports get missed sometimes.** If the model adds a function call to a new module, it might not add the `import`. Run a syntax check or eyeball the imports.
- **Use `Ctrl+Z` if you accepted by accident.** Continue's edits are normal Cursor undo entries — one undo reverts the whole change.

---

## Checkpoint

```bash
grep "get_item_or_404" routers/items.py | wc -l
```
Should print at least `2` (definition + at least one call).

```bash
grep -c "@router\." routers/items.py
```
Should match the number of routes you have (at least 5).

```bash
git log --oneline -2
```
Should show your "Extract get_item_or_404 helper" commit.

---

**Next up:** [08-agent-mode.md](08-agent-mode.md) — Let the model run commands and edit multiple files
