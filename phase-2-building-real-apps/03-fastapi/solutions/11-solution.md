# Solution: Lesson 11 — Error Handling and Status Codes

## Project state

Same files as lesson 10. Only `routers/items.py` changes.

## File contents

### `routers/items.py`

```python
from fastapi import APIRouter, Depends, HTTPException, status
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
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


@router.post("", response_model=ItemOut, status_code=status.HTTP_201_CREATED)
def create_item(item: ItemIn, db: Session = Depends(get_db)):
    if item.price <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="price must be positive",
        )
    db_item = models.Item(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    db.delete(item)
    db.commit()
    return None


@router.get("/me/protected")
def protected(user: dict = Depends(get_current_user)):
    return {"message": f"Hello {user['username']}, you reached a protected route"}
```

## Expected behavior

| Request | Status |
|---|---|
| `GET /items/{nonexistent}` | 404 |
| `POST /items` valid body | 201 |
| `POST /items` `price <= 0` | 400 |
| `POST /items` missing field | 422 |
| `DELETE /items/{existing}` | 204 |
| `DELETE /items/{nonexistent}` | 404 |
| `DELETE /items/{already-deleted}` | 404 |
