# Solution: Lesson 12 — Final Checkpoint (Profile resource)

> **Don't read this until you've genuinely tried.** Building from memory is the point of the checkpoint.

## Project state (additions only)

```
~/docker-course/fastapi-app/
├── ...
├── main.py             ← updated to include profiles router
├── models.py           ← Profile model added
└── routers/
    ├── ...
    └── profiles.py     ← new
```

## File contents

### `models.py`

```python
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.sql import func

from database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    is_offer = Column(Boolean, nullable=True)


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True, index=True)
    display_name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
```

### `routers/profiles.py`

```python
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from database import get_db
from dependencies import get_current_user
import models


router = APIRouter(prefix="/profiles", tags=["profiles"])


class ProfileIn(BaseModel):
    email: str
    display_name: str


class ProfileOut(BaseModel):
    id: int
    email: str
    display_name: str
    created_at: datetime

    model_config = {"from_attributes": True}


@router.post("", response_model=ProfileOut, status_code=status.HTTP_201_CREATED)
def create_profile(profile: ProfileIn, db: Session = Depends(get_db)):
    if not profile.display_name.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="display_name must not be empty",
        )

    existing = db.query(models.Profile).filter(models.Profile.email == profile.email).first()
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="email already registered",
        )

    db_profile = models.Profile(**profile.model_dump())
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile


@router.get("/{profile_id}", response_model=ProfileOut)
def read_profile(profile_id: int, db: Session = Depends(get_db)):
    profile = db.query(models.Profile).filter(models.Profile.id == profile_id).first()
    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )
    return profile


@router.delete(
    "/{profile_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_user)],
)
def delete_profile(profile_id: int, db: Session = Depends(get_db)):
    profile = db.query(models.Profile).filter(models.Profile.id == profile_id).first()
    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )
    db.delete(profile)
    db.commit()
    return None
```

### `main.py`

```python
from fastapi import FastAPI

from database import Base, engine
import models  # noqa: F401  -- registers tables with Base.metadata
from routers import items, users, profiles

app = FastAPI()


Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
    return {"hello": "fastapi"}


app.include_router(items.router)
app.include_router(users.router)
app.include_router(profiles.router)
```

## After editing

```bash
docker compose restart api
```

## Acceptance test results

| # | Request | Expected status |
|---|---|---|
| 1 | POST valid profile | 201 |
| 2 | POST duplicate email | 409 |
| 3 | POST empty display_name | 400 |
| 4 | GET existing profile | 200 |
| 5 | GET nonexistent | 404 |
| 6 | DELETE no auth header | 422 |
| 7 | DELETE wrong token | 401 |
| 8 | DELETE right token | 204 |
| 9 | GET deleted profile | 404 |
| 10 | psql `\d profiles` | shows columns id, email, display_name, created_at |

## Common mistakes

- **Forgetting `server_default=func.now()`** on `created_at` → POSTs return `created_at: null`.
- **Putting the auth dependency on the router** instead of just the DELETE route → all profile routes become protected.
- **Putting the duplicate-email check after `db.add()`** → IntegrityError instead of a clean 409.
- **Returning `db_profile` from a 204 route** — works but feels wrong; just `return None`.
- **Forgetting to register the new model** → `import models` in `main.py` already does this for `Profile` because it's defined in `models.py`. If you defined `Profile` somewhere else, you need to import it before `create_all`.
