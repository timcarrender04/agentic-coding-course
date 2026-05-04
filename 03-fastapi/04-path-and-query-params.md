# Lesson 04: Path and Query Params

**By the end, you will have a route that takes a typed path parameter and an optional query parameter, and you will have seen FastAPI's automatic validation reject bad input with a 422.**

⏱ ~25 minutes of typing

> Type hints in FastAPI aren't decoration — they're validation. The framework reads them at startup and will reject any request whose params don't match.

```instructor
Say: "Type hints in FastAPI aren't decoration. Annotate a param as `int` and FastAPI rejects any request that sends a non-int with a 422 — for free."
Mention: "Show the 422 deliberately. Have them curl `/items/banana` (where the path is `int`) and read the validation error body. That's what FastAPI hands them whenever validation fails."
Pause: After the first 422. Walk through the error body together — FastAPI tells them which field failed and why. They'll lean on this all module.
Say: "You're done when their typed path param accepts ints, rejects strings with 422, and the optional query param works with and without it."
```

---

**1.** Make sure your venv is active and uvicorn is still running with `--reload`.
```bash
cd ~/docker-course/fastapi-app && source .venv/bin/activate
```
(Skip if you already see `(.venv)` in your prompt.)

**2.** Open `main.py` in Cursor.

**3.** Add a new route below the hello-world one. Type:
```python


@app.get("/items/{item_id}")
def read_item(item_id):
    return {"item_id": item_id}
```

**4.** Save. Watch uvicorn auto-reload in the first terminal.

**5.** Curl with a number.
```bash
curl http://localhost:8000/items/42
```
```
{"item_id":"42"}
```
(Note: it came back as a **string** because `item_id` has no type hint.)

**6.** Curl with text.
```bash
curl http://localhost:8000/items/banana
```
```
{"item_id":"banana"}
```
(Also accepted — no validation yet.)

**7.** Now add a type hint. Change the function signature to:
```python
def read_item(item_id: int):
```

**8.** Save. Curl with a number.
```bash
curl http://localhost:8000/items/42
```
```
{"item_id":42}
```
(No quotes around 42 — it's an int now.)

**9.** Curl with text.
```bash
curl http://localhost:8000/items/banana
```
```
{"detail":[{"type":"int_parsing","loc":["path","item_id"],"msg":"Input should be a valid integer..."}]}
```
**FastAPI rejected it with a 422.** This is the validation in action.

**10.** Confirm the status code.
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/items/banana
```
```
422
```

**11.** Now add an optional query parameter. Change the function signature to:
```python
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
```

**12.** Save.

**13.** Curl without `q`.
```bash
curl "http://localhost:8000/items/42"
```
```
{"item_id":42,"q":null}
```

**14.** Curl with `q`. **Quote the URL** — the shell will eat the `?` otherwise.
```bash
curl "http://localhost:8000/items/42?q=hello"
```
```
{"item_id":42,"q":"hello"}
```

**15.** Try multiple query params.
```bash
curl "http://localhost:8000/items/42?q=hello&extra=ignored"
```
```
{"item_id":42,"q":"hello"}
```
(`extra` is silently ignored — it's not declared.)

**16.** Open `http://localhost:8000/docs` in the browser. You should now see two routes: `GET /` and `GET /items/{item_id}`.

**17.** Click `GET /items/{item_id}` → **"Try it out"**. Notice Swagger now shows `item_id` as required and `q` as optional, with the right types.

**18.** Type `42` for `item_id`, leave `q` empty, click **Execute**. Same response as the curl.

**19.** Type `banana` for `item_id` and click Execute. Swagger shows the 422 with the readable error message.

**20.** Add another query param with a default value. Change the signature to:
```python
def read_item(item_id: int, q: str | None = None, short: bool = False):
```

**21.** Update the function body to use it:
```python
    if short:
        return {"item_id": item_id}
    return {"item_id": item_id, "q": q}
```

**22.** Save. Curl without `short`.
```bash
curl "http://localhost:8000/items/42?q=hi"
```
```
{"item_id":42,"q":"hi"}
```

**23.** Curl with `short=true`.
```bash
curl "http://localhost:8000/items/42?q=hi&short=true"
```
```
{"item_id":42}
```

**24.** Try `short=banana` — booleans validate too.
```bash
curl "http://localhost:8000/items/42?short=banana"
```
```
{"detail":[{"type":"bool_parsing","loc":["query","short"],"msg":"Input should be a valid boolean..."}]}
```

**25.** Confirm the file.
```bash
cat main.py
```
You should see the hello-world route, the items route, and three params on the items function.

**26.** Log it.
```bash
echo "Path + query params + type validation: working" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- Always **quote the URL** when curling with query params: `curl "...?q=foo"`. Without quotes, your shell tries to interpret `?` and `&`.
- `str | None` is Python 3.10+ syntax. If you're on 3.9 or older, use `Optional[str]` (and `from typing import Optional` at the top). The lessons assume 3.10+.
- The default value is what makes a param optional. `q: str` requires the query param. `q: str | None = None` makes it optional.
- A 422 response is **not** a server crash. FastAPI is doing its job by rejecting bad input. The right response is to fix the request.

---

## Checkpoint

```bash
curl -s "http://localhost:8000/items/42?q=test&short=false"
```
You should see `{"item_id":42,"q":"test"}`.

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/items/banana
```
You should see `422`.

```bash
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:8000/items/42?short=true"
```
You should see `200`.

In the browser at `/docs`, the `/items/{item_id}` route should show three params: `item_id` (path, required), `q` (query, optional, string), `short` (query, optional, boolean).

---

**Next up:** [05-request-bodies-with-pydantic.md](05-request-bodies-with-pydantic.md) — Accept JSON bodies and validate them with Pydantic
