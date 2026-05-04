# Solution: Lesson 06 — Multiple Routes and Routers

## Project state

```
~/docker-course/fastapi-app/
├── .gitignore
├── .venv/
├── main.py
├── requirements.txt
└── routers/
    ├── __init__.py
    ├── items.py
    └── users.py
```

## File contents

### `main.py`

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

### `routers/__init__.py`

Empty file. Its existence is what makes `routers/` a Python package.

### `routers/items.py`

```python
from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(prefix="/items", tags=["items"])


class Item(BaseModel):
    name: str
    price: float
    is_offer: bool | None = None


fake_items_db: list[Item] = []


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

### `routers/users.py`

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

## Expected behavior

`/docs` shows two tagged sections: **items** and **users**, each containing their routes. All previous behaviors still work, with the same paths.
