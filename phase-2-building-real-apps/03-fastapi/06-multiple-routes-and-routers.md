# Lesson 06: Multiple Routes and Routers

**By the end, you will have refactored the items routes into a separate `routers/items.py` module, added a `routers/users.py`, and mounted both in `main.py` with `APIRouter`.**

⏱ ~25 minutes of typing

> One file per resource. As your app grows, you don't want every route in `main.py` — you want each resource (items, users, orders, …) in its own file. `APIRouter` is FastAPI's mechanism for that.

```instructor
Say: "We're refactoring routes out of `main.py` into per-resource files using `APIRouter`. This is how every real FastAPI codebase is organized."
Mention: "After the refactor, every existing curl from lessons 03–05 must still work. If a route 404s, the prefix on the router is wrong or the include line in `main.py` is missing."
Pause: After mounting both routers — re-run all the curls from earlier lessons. That's how they confirm the refactor didn't break anything.
Say: "You're done when items live in `routers/items.py`, users in `routers/users.py`, both are mounted in `main.py`, and every old curl still works."
```

---

**1.** Make sure your venv is active and uvicorn is running with `--reload`.
```bash
cd ~/docker-course/fastapi-app && source .venv/bin/activate
```

**2.** Create the routers directory.
```bash
mkdir routers
```

**3.** Make it a Python package by adding an empty `__init__.py`.
```bash
touch routers/__init__.py
```

**4.** Confirm.
```bash
ls routers/
```
```
__init__.py
```

**5.** Create `routers/items.py`.
```bash
touch routers/items.py
```

**6.** Open `routers/items.py` in Cursor.

**7.** Type the imports:
```python
from fastapi import APIRouter
from pydantic import BaseModel
```

**8.** Create the router with a prefix and a tag (the tag is what shows up as the section header in Swagger).
```python


router = APIRouter(prefix="/items", tags=["items"])
```

**9.** Move the `Item` model from `main.py` to here:
```python


class Item(BaseModel):
    name: str
    price: float
    is_offer: bool | None = None
```

**10.** Add the in-memory store:
```python


fake_items_db: list[Item] = []
```

**11.** Add the routes — note `@router.get`, not `@app.get`. And the prefix `/items` is already on the router, so paths here are relative.
```python


@router.get("")
def list_items():
    return fake_items_db


@router.get("/{item_id}")
def read_item(item_id: int, q: str | None = None, short: bool = False):
    if short:
        return {"item_id": item_id}
    return {"item_id": item_id, "q": q}


@router.post("")
def create_item(item: Item):
    fake_items_db.append(item)
    return item
```

**12.** Save.

**13.** Now create the users router.
```bash
touch routers/users.py
```

**14.** Open `routers/users.py` and type:
```python
from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(prefix="/users", tags=["users"])


class User(BaseModel):
    name: str
    email: str


fake_users_db: list[User] = []


@router.get("")
def list_users():
    return fake_users_db


@router.post("")
def create_user(user: User):
    fake_users_db.append(user)
    return user
```

**15.** Save.

**16.** Now slim down `main.py` to just import and mount the routers. Open `main.py` and replace its contents with:
```python
from fastapi import FastAPI

from routers import items, users

app = FastAPI()


@app.get("/")
def read_root():
    return {"hello": "fastapi"}


app.include_router(items.router)
app.include_router(users.router)
```

**17.** Save. Watch uvicorn reload. If you see `ImportError`, check that `routers/__init__.py` exists.

**18.** Confirm the project structure.
```bash
ls -la
ls -la routers/
```
You should see:
```
.
├── .gitignore
├── .venv/
├── main.py
├── requirements.txt
└── routers/
    ├── __init__.py
    ├── items.py
    └── users.py
```

**19.** Curl the moved items route. The path is the same as before because the router has prefix `/items`.
```bash
curl http://localhost:8000/items
```
```
[]
```

**20.** Curl the new users route.
```bash
curl http://localhost:8000/users
```
```
[]
```

**21.** POST a user.
```bash
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Ada", "email": "ada@example.com"}'
```
```
{"name":"Ada","email":"ada@example.com"}
```

**22.** List users to confirm it stuck.
```bash
curl http://localhost:8000/users
```
```
[{"name":"Ada","email":"ada@example.com"}]
```

**23.** POST an item to confirm the items router still works.
```bash
curl -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Widget", "price": 5.0}'
```

**24.** Hit the path-param route on items.
```bash
curl http://localhost:8000/items/42
```
```
{"item_id":42,"q":null}
```

**25.** Open `/docs` in the browser. Refresh. You should now see **two sections** ("items" and "users") thanks to the `tags=` argument on each router.

**26.** Click the **"items"** tag header in Swagger — the items routes collapse/expand together. Same for "users".

**27.** Hit `POST /users` from Swagger UI to confirm it works there too.

**28.** Log it.
```bash
echo "Routers: items + users split out" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`__init__.py` in `routers/`** — without it, `from routers import items` fails with `ModuleNotFoundError`.
- The `prefix="/items"` is already on the router, so don't repeat it: write `@router.get("")` for `/items`, not `@router.get("/items")` (which would become `/items/items`).
- `app.include_router(items.router)` — note the `.router`. The router *object* is what FastAPI mounts, not the module.
- When you move code between files, the in-memory state moves too. The `fake_items_db` you POSTed to in lesson 05 is gone — it lived in the old `main.py`. The new one is empty until you POST again.

---

## Checkpoint

```bash
curl -s http://localhost:8000/items
```
Should return `[]` or whatever you POSTed since the refactor.

```bash
curl -s http://localhost:8000/users
```
Should return `[]` or your test users.

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/items/42
```
Should return `200`.

```bash
ls routers/
```
Should show `__init__.py`, `items.py`, `users.py`.

In `/docs` you should see **two tagged sections**: "items" and "users".

---

**Next up:** [07-dependencies-and-injection.md](07-dependencies-and-injection.md) — Use `Depends` to share logic across routes
