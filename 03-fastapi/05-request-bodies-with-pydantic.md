# Lesson 05: Request Bodies with Pydantic

**By the end, you will have a `POST /items` route that accepts a JSON body, validated against a Pydantic model, and you will have hit it from both curl and Swagger UI.**

⏱ ~30 minutes of typing

> **Pydantic** is the data-validation library FastAPI sits on top of. You define a class with typed fields; FastAPI uses it to parse, validate, and document request bodies.

---

**1.** Make sure your venv is active and uvicorn is running with `--reload`.
```bash
cd ~/docker-course/fastapi-app && source .venv/bin/activate
```

**2.** Open `main.py`.

**3.** Add the Pydantic import. Below `from fastapi import FastAPI`, add:
```python
from pydantic import BaseModel
```

**4.** Save. Watch uvicorn reload — no errors expected.

**5.** Below the imports, define an `Item` model. Type it carefully:
```python


class Item(BaseModel):
    name: str
    price: float
    is_offer: bool | None = None
```

**6.** Save. Confirm the model is part of the file.
```bash
grep -A 4 "class Item" main.py
```
You should see the four lines you just typed.

**7.** Add a `POST /items` route below your existing routes.
```python


@app.post("/items")
def create_item(item: Item):
    return item
```

**8.** Save. Watch uvicorn reload.

**9.** Curl the new route with a valid JSON body. **Note the three flags:** `-X POST`, `-H "Content-Type: application/json"`, `-d '{...}'`.
```bash
curl -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Widget", "price": 9.99}'
```
```
{"name":"Widget","price":9.99,"is_offer":null}
```

**10.** Curl with an offer flag.
```bash
curl -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Widget", "price": 9.99, "is_offer": true}'
```
```
{"name":"Widget","price":9.99,"is_offer":true}
```

**11.** Curl with an invalid body — missing `price`.
```bash
curl -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Widget"}'
```
```
{"detail":[{"type":"missing","loc":["body","price"],"msg":"Field required",...}]}
```
**Pydantic rejected it with a 422.** Notice the response tells you exactly which field is missing.

**12.** Confirm the status.
```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Widget"}'
```
```
422
```

**13.** Curl with a wrong type — `price` as a string.
```bash
curl -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Widget", "price": "free"}'
```
```
{"detail":[{"type":"float_parsing","loc":["body","price"],"msg":"Input should be a valid number,...","input":"free"}]}
```

**14.** Forget the `Content-Type` header on purpose.
```bash
curl -X POST http://localhost:8000/items \
  -d '{"name": "Widget", "price": 9.99}'
```
```
{"detail":[{"type":"json_invalid",...}]}
```
(FastAPI couldn't parse the body. **Always set `Content-Type: application/json` on POST.**)

**15.** Now hit it from Swagger UI. Open `http://localhost:8000/docs` and refresh the page.

**16.** You should see `POST /items` listed. Click it → **"Try it out"**.

**17.** The request body box has a sample JSON pre-filled. Change it to:
```json
{
  "name": "From Swagger",
  "price": 1.23,
  "is_offer": false
}
```

**18.** Click **Execute**. The response should echo your input.

**19.** In the same Swagger box, delete `"price": 1.23,` and click Execute. Swagger shows the 422 inline with the same error structure curl saw.

**20.** Now let's actually store items. Above the routes, add a tiny in-memory list:
```python


fake_items_db: list[Item] = []
```

**21.** Update the POST handler to save the item:
```python
@app.post("/items")
def create_item(item: Item):
    fake_items_db.append(item)
    return item
```

**22.** Add a route to list all items:
```python


@app.get("/items")
def list_items():
    return fake_items_db
```

**23.** Save.

**24.** POST a couple of items.
```bash
curl -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name": "Apple", "price": 0.50}'
curl -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name": "Bread", "price": 2.50, "is_offer": true}'
```

**25.** List them.
```bash
curl http://localhost:8000/items
```
```
[{"name":"Apple","price":0.5,"is_offer":null},{"name":"Bread","price":2.5,"is_offer":true}]
```

**26.** Restart the server (Ctrl+C in the uvicorn terminal, then `uvicorn main:app --reload` again). List items again.
```bash
curl http://localhost:8000/items
```
```
[]
```
(In-memory list — gone after restart. We'll fix this with a real DB in lesson 10.)

**27.** Log it.
```bash
echo "POST /items + Pydantic validation: working" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`Content-Type: application/json`** on every POST. Forgetting it is the #1 cause of unexplained 422 errors. Drill it.
- The single quotes around the `-d '{...}'` payload matter — they prevent your shell from interpreting `$` or `"` inside the JSON.
- `is_offer: bool | None = None` — the default value is what makes the field optional. Without `= None`, Pydantic would require it.
- The in-memory `fake_items_db` is **not** real persistence. Restart the server and it's gone. We'll fix that in lesson 10.

---

## Checkpoint

```bash
curl -s -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name": "T", "price": 1}'
```
You should see the item echoed back as JSON.

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name": "T"}'
```
You should see `422`.

```bash
curl -s http://localhost:8000/items | python -m json.tool
```
You should see at least one item from the previous POST formatted as JSON.

In the browser at `/docs`, the `POST /items` row should show your `Item` schema with `name`, `price`, `is_offer`.

---

**Next up:** [06-multiple-routes-and-routers.md](06-multiple-routes-and-routers.md) — Split the app into separate router files
