from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/items", tags=["items"])


class Item(BaseModel):
    name: str
    price: float


items: list[dict] = [
    {"id": 1, "name": "notebook", "price": 3.50},
    {"id": 2, "name": "pencil", "price": 0.75},
]


@router.get("")
def list_items():
    return items


@router.get("/{item_id}")
def get_item(item_id: int):
    for item in items:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")


@router.post("", status_code=201)
def create_item(item: Item):
    new_item = {"id": len(items) + 1, **item.model_dump()}
    items.append(new_item)
    return new_item
