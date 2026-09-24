# Solution: Lesson 04 — Path and Query Params

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

app = FastAPI()


@app.get("/")
def read_root():
    return {"hello": "fastapi"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None, short: bool = False):
    if short:
        return {"item_id": item_id}
    return {"item_id": item_id, "q": q}
```

## Expected behavior

| Request | Response | Status |
|---|---|---|
| `GET /` | `{"hello":"fastapi"}` | 200 |
| `GET /items/42` | `{"item_id":42,"q":null}` | 200 |
| `GET /items/42?q=hi` | `{"item_id":42,"q":"hi"}` | 200 |
| `GET /items/42?q=hi&short=true` | `{"item_id":42}` | 200 |
| `GET /items/banana` | error detail | 422 |
| `GET /items/42?short=banana` | error detail | 422 |

## Browser

`/docs` shows two routes: `GET /` and `GET /items/{item_id}` with three params (`item_id` int required, `q` string optional, `short` bool optional default false).
