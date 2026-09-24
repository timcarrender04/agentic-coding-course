# Solution: Lesson 07 — Dependencies and Injection

## Project state

```
~/docker-course/fastapi-app/
├── .gitignore
├── .venv/
├── dependencies.py     ← new
├── main.py
├── requirements.txt
└── routers/
    ├── __init__.py
    ├── items.py        ← updated (protected route added)
    └── users.py        ← updated (router-level dep)
```

## File contents

### `dependencies.py`

```python
from fastapi import Header, HTTPException


def get_current_user(x_token: str = Header(...)):
    if x_token != "secret-token":
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"username": "admin"}
```

### `routers/items.py`

```python
from fastapi import APIRouter, Depends
from pydantic import BaseModel

from dependencies import get_current_user


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


@router.get("/me/protected")
def protected(user: dict = Depends(get_current_user)):
    return {"message": f"Hello {user['username']}, you reached a protected route"}
```

### `routers/users.py`

```python
from fastapi import APIRouter, Depends
from pydantic import BaseModel

from dependencies import get_current_user


router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(get_current_user)],
)


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

### `main.py`

Unchanged from lesson 06.

## Expected behavior

| Request | Status |
|---|---|
| `GET /items` (no header) | 200 (still unprotected) |
| `GET /items/me/protected` (no header) | 422 |
| `GET /items/me/protected` `-H "X-Token: nope"` | 401 |
| `GET /items/me/protected` `-H "X-Token: secret-token"` | 200 |
| `GET /users` (no header) | 422 |
| `GET /users` `-H "X-Token: secret-token"` | 200 |
| `POST /users` (no header) | 422 |
