# Lesson 11: Error Handling and Status Codes

**By the end, your API returns 201 on POST, 404 when an item doesn't exist, and 204 on successful DELETE — all using `HTTPException` and FastAPI's `status_code` argument.**

⏱ ~25 minutes of typing

> Default status codes are 200 for everything. That's wrong. POST should be 201 (Created), DELETE should be 204 (No Content), missing resources should be 404 (Not Found).

---

**1.** Compose should still be up from lesson 10. Confirm.
```bash
cd ~/docker-course/fastapi-app
docker compose ps
```

**2.** Open `routers/items.py`.

**3.** Add `HTTPException` and `status` to the FastAPI import. Update the line:
```python
from fastapi import APIRouter, Depends, HTTPException, status
```

**4.** Update the `read_item` route to return 404 when the item isn't found. Replace the existing `read_item` with:
```python
@router.get("/{item_id}", response_model=ItemOut)
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item
```

**5.** Save.

**6.** Curl a non-existent item.
```bash
curl -i http://localhost:8000/items/999999
```
```
HTTP/1.1 404 Not Found
...
{"detail":"Item not found"}
```

**7.** Curl an existing item (use an id you POSTed earlier).
```bash
curl -i http://localhost:8000/items/1
```
```
HTTP/1.1 200 OK
...
{"name":"Real Apple",...}
```

**8.** Now make POST return 201. Update the `create_item` decorator:
```python
@router.post("", response_model=ItemOut, status_code=status.HTTP_201_CREATED)
def create_item(item: ItemIn, db: Session = Depends(get_db)):
    db_item = models.Item(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
```

**9.** Save.

**10.** Curl a POST and check the status.
```bash
curl -i -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "ErrCheck", "price": 1.0}'
```
```
HTTP/1.1 201 Created
...
{"name":"ErrCheck","price":1.0,"is_offer":null,"id":...}
```

**11.** Now add a DELETE route. Append to `routers/items.py`:
```python


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    db.delete(item)
    db.commit()
    return None
```

**12.** Save.

**13.** Pick an existing item id (e.g. 1) and delete it.
```bash
curl -i -X DELETE http://localhost:8000/items/1
```
```
HTTP/1.1 204 No Content
...
```
(204 means success with no response body — the standard for successful deletes.)

**14.** Try to read it now.
```bash
curl -i http://localhost:8000/items/1
```
```
HTTP/1.1 404 Not Found
...
{"detail":"Item not found"}
```

**15.** Try to delete the same item again.
```bash
curl -i -X DELETE http://localhost:8000/items/1
```
```
HTTP/1.1 404 Not Found
{"detail":"Item not found"}
```

**16.** Confirm in the DB.
```bash
docker compose exec db psql -U postgres -d appdb -c "SELECT * FROM items WHERE id=1;"
```
```
 id | name | price | is_offer
----+------+-------+----------
(0 rows)
```

**17.** Add a custom error class. Sometimes you want a body other than `{"detail": "..."}`. Add a 400 case for invalid prices. Update the `create_item` route's body to validate (right after `def create_item(...)`):
```python
    if item.price <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="price must be positive",
        )
```

**18.** Save.

**19.** Try a negative-priced item.
```bash
curl -i -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Bad", "price": -1}'
```
```
HTTP/1.1 400 Bad Request
{"detail":"price must be positive"}
```

**20.** And zero.
```bash
curl -i -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Zero", "price": 0}'
```
```
HTTP/1.1 400 Bad Request
```

**21.** A valid one still works.
```bash
curl -i -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Good", "price": 5}'
```
```
HTTP/1.1 201 Created
```

**22.** Open `/docs`. Refresh. Each route now shows its proper response codes (201, 204, 404, 400).

**23.** Try the DELETE from Swagger UI. Find an item id in the list, paste it into the DELETE form, click Execute. The response body is empty and the status is 204 — Swagger shows both.

**24.** Log it.
```bash
echo "Status codes: 201/204/400/404 wired in" >> ~/docker-course/notes/notes.txt
```

---

## Status code quick reference

| Code | Meaning | When to use |
|---|---|---|
| 200 | OK | Default for GET; POST/PUT that return the resource |
| 201 | Created | POST that creates a new resource |
| 204 | No Content | Successful DELETE; PUT that doesn't return the resource |
| 400 | Bad Request | Caller's input is wrong (business rule violation) |
| 401 | Unauthorized | Caller didn't authenticate |
| 403 | Forbidden | Caller authenticated but lacks permission |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Business state prevents the action (e.g. duplicate email) |
| 422 | Unprocessable Entity | Pydantic validation rejected the body — FastAPI does this automatically |
| 500 | Internal Server Error | Your code crashed — FastAPI does this automatically when an exception escapes |

---

## ⚠️ Watch out

- **`status_code=status.HTTP_201_CREATED`** is on the **decorator**, not on the return statement. The decorator sets the success status; `HTTPException` overrides it for errors.
- **204 must not return a body.** FastAPI honors this — even if you `return {"foo": "bar"}` from a 204 route, the body is dropped. Just `return None`.
- **`HTTPException(detail=...)`** — `detail` is what shows up in the `{"detail": "..."}` response. Use clear, user-actionable messages, but don't leak internal details (no stack traces).
- **Validation errors are always 422**, not 400. 400 is for *your* business rules; 422 is for Pydantic's structural validation.

---

## Checkpoint

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/items/999999
```
Should print `404`.

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name":"X","price":1}'
```
Should print `201`.

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X DELETE http://localhost:8000/items/$(curl -s http://localhost:8000/items | python -c "import sys,json;print(json.load(sys.stdin)[-1]['id'])")
```
Should print `204` (deletes the most-recently created item).

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name":"X","price":-1}'
```
Should print `400`.

---

**Next up:** [12-final-checkpoint.md](12-final-checkpoint.md) — Build a `User` resource end-to-end from memory
