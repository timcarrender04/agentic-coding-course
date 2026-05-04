# Solution: Lesson 10 — Database with SQLAlchemy

## Project state

```
~/docker-course/fastapi-app/
├── .dockerignore
├── .env
├── .gitignore
├── .venv/
├── database.py         ← new
├── docker-compose.yml
├── Dockerfile
├── dependencies.py
├── main.py             ← updated (registers Base + create_all)
├── models.py           ← new
├── requirements.txt    ← updated (sqlalchemy + psycopg2-binary)
└── routers/
    ├── __init__.py
    ├── items.py        ← rewritten (DB-backed)
    └── users.py        ← rewritten (DB-backed)
```

## File contents

### `database.py`

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

### `models.py`

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

### `main.py`

```python
from fastapi import FastAPI

from database import Base, engine
import models  # noqa: F401  -- registers Item with Base.metadata
from routers import items, users

app = FastAPI()


Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
    return {"hello": "fastapi"}


app.include_router(items.router)
app.include_router(users.router)
```

### `routers/items.py`

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

### `routers/users.py`

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

### `requirements.txt`

The file from lesson 02 plus two new lines at the bottom:

```
... (everything from lesson 02 freeze)
sqlalchemy==2.0.30
psycopg2-binary==2.9.9
```

## Expected DB state

```
$ docker compose exec db psql -U postgres -d appdb -c "\dt"
 Schema |  Name  | Type  |  Owner
--------+--------+-------+----------
 public | items  | table | postgres
 public | users  | table | postgres

$ docker compose exec db psql -U postgres -d appdb -c "SELECT * FROM items;"
(your POSTed items, with auto-generated ids)
```
