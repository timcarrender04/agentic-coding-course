# Lesson 10: Database with SQLAlchemy

**By the end, the in-memory `fake_items_db` is gone. Items are read from and written to Postgres via SQLAlchemy. You'll see your rows in `psql` after POSTing them.**

⏱ ~45 minutes of typing (this lesson runs long)

> SQLAlchemy is the most popular Python ORM. We'll use the SQLAlchemy 2.0 style: an `engine`, a `SessionLocal`, a `Base` class for ORM models, and FastAPI dependencies for getting a session per request.

---

**1.** Make sure Compose is up and the venv is active in your local terminal (we'll edit files locally; Compose's bind mount picks them up).
```bash
cd ~/docker-course/fastapi-app
docker compose ps
source .venv/bin/activate
```

**2.** Add SQLAlchemy and the Postgres driver to `requirements.txt` so they're installed in the image.
```bash
echo "sqlalchemy==2.0.30" >> requirements.txt
echo "psycopg2-binary==2.9.9" >> requirements.txt
```

**3.** Confirm.
```bash
tail -n 5 requirements.txt
```
You should see the two new lines.

**4.** Rebuild the api image (Compose will use the cached layers for everything except pip install).
```bash
docker compose build api
```

**5.** Restart the api service.
```bash
docker compose up -d
```

**6.** Confirm the api is healthy.
```bash
curl http://localhost:8000
```
```
{"hello":"fastapi"}
```

**7.** Create `database.py` at the project root.
```bash
touch database.py
```

**8.** Open `database.py` in Cursor. Type:
```python
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


DATABASE_URL = os.environ["DATABASE_URL"]

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

**9.** Save.

**10.** Read each block:
   - `DATABASE_URL` is read from the env (Compose already sets it for the api service).
   - `engine` is the connection pool to Postgres.
   - `SessionLocal` is a factory for sessions — one per request.
   - `Base` is what ORM models inherit from.
   - `get_db()` is a generator-style FastAPI dependency: it opens a session, yields it to the route, closes it after.

**11.** Create `models.py` at the project root.
```bash
touch models.py
```

**12.** Open `models.py`. Type:
```python
from sqlalchemy import Column, Integer, String, Float, Boolean

from database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    is_offer = Column(Boolean, nullable=True)
```

**13.** Save.

**14.** Now wire model creation at startup. Open `main.py` and add to the imports:
```python
from database import Base, engine
import models  # noqa: F401  -- registers Item with Base.metadata
```

**15.** Below `app = FastAPI()`, add the table-creation call:
```python


Base.metadata.create_all(bind=engine)
```

**16.** Save. Watch `docker compose logs api --tail=20` — you should see SQLAlchemy log a `CREATE TABLE items (...)` and uvicorn reload cleanly.

**17.** Open `psql` and confirm the table exists.
```bash
docker compose exec db psql -U postgres -d appdb -c "\dt"
```
```
 Schema | Name  | Type  |  Owner
--------+-------+-------+----------
 public | items | table | postgres
```

**18.** Now rewrite the items router to use the database. Open `routers/items.py`.

**19.** Replace the entire file with:
```python
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db
from dependencies import get_current_user
import models


router = APIRouter(prefix="/items", tags=["items"])


class ItemIn(BaseModel):
    name: str
    price: float
    is_offer: bool | None = None


class ItemOut(ItemIn):
    id: int

    model_config = {"from_attributes": True}


@router.get("", response_model=list[ItemOut])
def list_items(db: Session = Depends(get_db)):
    return db.query(models.Item).all()


@router.get("/{item_id}", response_model=ItemOut)
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    return item


@router.post("", response_model=ItemOut)
def create_item(item: ItemIn, db: Session = Depends(get_db)):
    db_item = models.Item(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.get("/me/protected")
def protected(user: dict = Depends(get_current_user)):
    return {"message": f"Hello {user['username']}, you reached a protected route"}
```

**20.** Save. Watch the api reload.

**21.** Read what changed:
   - **Two Pydantic models now**: `ItemIn` for incoming requests (no `id`), `ItemOut` for responses (includes `id`).
   - `model_config = {"from_attributes": True}` lets Pydantic build `ItemOut` from a SQLAlchemy ORM object.
   - Each route takes a `db: Session = Depends(get_db)` — a fresh session per request, auto-closed.
   - `db.add()` + `db.commit()` + `db.refresh()` is the standard SQLAlchemy create pattern.

**22.** POST an item.
```bash
curl -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Real Apple", "price": 0.50}'
```
```
{"name":"Real Apple","price":0.5,"is_offer":null,"id":1}
```
**Notice the `id` is back from the database.**

**23.** POST another.
```bash
curl -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Real Bread", "price": 2.50, "is_offer": true}'
```

**24.** List them.
```bash
curl http://localhost:8000/items
```
```
[{"name":"Real Apple","price":0.5,"is_offer":null,"id":1},{"name":"Real Bread","price":2.5,"is_offer":true,"id":2}]
```

**25.** Read one by ID.
```bash
curl http://localhost:8000/items/1
```
```
{"name":"Real Apple","price":0.5,"is_offer":null,"id":1}
```

**26.** **Now look in the actual database.**
```bash
docker compose exec db psql -U postgres -d appdb -c "SELECT * FROM items;"
```
```
 id |    name    | price | is_offer
----+------------+-------+----------
  1 | Real Apple |   0.5 |
  2 | Real Bread |   2.5 | t
```
**You're seeing your rows in Postgres.** Real persistence.

**27.** Restart the stack to prove the data sticks.
```bash
docker compose restart api
```

**28.** List items again.
```bash
curl http://localhost:8000/items
```
The two items are still there.

**29.** Bring everything down — but **keep the volume**.
```bash
docker compose down
```

**30.** Bring it back up.
```bash
docker compose up -d
```

**31.** List items.
```bash
sleep 2 && curl http://localhost:8000/items
```
The two items are still there. The named volume preserved the data.

**32.** Update the users router to also use the DB. Open `routers/users.py` and replace it with:
```python
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session

from database import Base, get_db
from dependencies import get_current_user


class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)


router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(get_current_user)],
)


class UserIn(BaseModel):
    name: str
    email: str


class UserOut(UserIn):
    id: int

    model_config = {"from_attributes": True}


@router.get("", response_model=list[UserOut])
def list_users(db: Session = Depends(get_db)):
    return db.query(UserModel).all()


@router.post("", response_model=UserOut)
def create_user(user: UserIn, db: Session = Depends(get_db)):
    db_user = UserModel(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
```

**33.** Save. Reload happens automatically.

**34.** The new `users` table doesn't exist yet — `Base.metadata.create_all` ran at startup before the new model was registered. Restart the api to re-run startup.
```bash
docker compose restart api
```

**35.** Confirm the table.
```bash
docker compose exec db psql -U postgres -d appdb -c "\dt"
```
You should see both `items` and `users`.

**36.** POST a user.
```bash
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -H "X-Token: secret-token" \
  -d '{"name": "Ada", "email": "ada@example.com"}'
```
```
{"name":"Ada","email":"ada@example.com","id":1}
```

**37.** List users.
```bash
curl http://localhost:8000/users -H "X-Token: secret-token"
```
```
[{"name":"Ada","email":"ada@example.com","id":1}]
```

**38.** Confirm in psql.
```bash
docker compose exec db psql -U postgres -d appdb -c "SELECT * FROM users;"
```

**39.** Log it.
```bash
echo "SQLAlchemy: items + users persisted in postgres" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`models` import side-effects.** The `import models` line in `main.py` is what registers the `Item` table with `Base.metadata`. Without it, `create_all` won't create the table. The `# noqa` comment is a hint to linters that the import is intentional even though `models` isn't directly referenced.
- **`from_attributes` (formerly `orm_mode`)** is the Pydantic v2 setting that lets a Pydantic model serialize from a SQLAlchemy object. Without it, FastAPI returns the raw object and serialization fails.
- **Adding a new `Base`-derived model after startup** doesn't auto-create the table. Restart the api (`docker compose restart api`) to re-run `create_all`.
- **`db.refresh(db_item)`** after commit is what loads the auto-generated `id` back from the database. Skip it and your response has `id: null`.
- For real apps, use **Alembic** for schema migrations rather than `create_all`. We're keeping it simple.

---

## Checkpoint

```bash
docker compose exec db psql -U postgres -d appdb -c "\dt"
```
Should show `items` and `users`.

```bash
curl -s -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name": "Test", "price": 1}' | python -m json.tool
```
Should return JSON including a numeric `id`.

```bash
docker compose exec db psql -U postgres -d appdb -c "SELECT count(*) FROM items;"
```
Should print a non-zero count.

```bash
curl -s http://localhost:8000/items | python -m json.tool
```
Should list every item you've POSTed.

---

**Next up:** [11-error-handling-and-status-codes.md](11-error-handling-and-status-codes.md) — Return correct HTTP status codes
