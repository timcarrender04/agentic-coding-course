# Solution: Lesson 05 — Request Bodies with Pydantic

## Project state

```
~/docker-course/fastapi-app/
├── .gitignore
├── .venv/
├── main.py
└── requirements.txt
```

## File contents

### `main.py`

```python
from fastapi import FastAPI
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    price: float
    is_offer: bool | None = None


app = FastAPI()

fake_items_db: list[Item] = []


@app.get("/")
def read_root():
    return {"hello": "fastapi"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None, short: bool = False):
    if short:
        return {"item_id": item_id}
    return {"item_id": item_id, "q": q}


@app.post("/items")
def create_item(item: Item):
    fake_items_db.append(item)
    return item


@app.get("/items")
def list_items():
    return fake_items_db
```

## Expected behavior

| Request | Response body | Status |
|---|---|---|
| `POST /items` with `{"name":"Apple","price":0.50}` | the item echoed | 200 |
| `POST /items` with `{"name":"Apple"}` (missing price) | `{"detail":[...]}` | 422 |
| `POST /items` with no Content-Type header | invalid-json detail | 422 |
| `GET /items` | list of all POSTed items | 200 |

## Important note

The `fake_items_db` list resets every time you restart uvicorn. That's expected — we add real persistence in lesson 10.
