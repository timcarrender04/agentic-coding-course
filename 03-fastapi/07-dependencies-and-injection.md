# Lesson 07: Dependencies and Injection

**By the end, you will have a `get_current_user` dependency that reads a header, and a protected route that returns 401 without the header and 200 with it.**

⏱ ~25 minutes of typing

> A **dependency** in FastAPI is a function whose return value is "injected" into your route. Common uses: auth, DB sessions, shared validation. The pattern is `param = Depends(my_function)`.

```instructor
Say: "`Depends()` is FastAPI's dependency injection. A function returns a value; FastAPI runs it before the route and passes the result in. Used for auth, DB sessions, shared validation."
Mention: "401 vs 422 confuses students. 401 is 'not authenticated' (header missing or wrong); 422 is 'malformed input'. Read the route's behavior and match the right code."
Pause: After they raise the first `HTTPException(401)` from the dependency. Show how the route never even runs — the dep short-circuited it.
Say: "You're done when hitting the protected route without `X-Token` returns 401 and with the right value returns 200."
```

---

**1.** Make sure venv is active and uvicorn is running.
```bash
cd ~/docker-course/fastapi-app && source .venv/bin/activate
```

**2.** Create a `dependencies.py` at the project root.
```bash
touch dependencies.py
```

**3.** Open it in Cursor.

**4.** Type the imports:
```python
from fastapi import Header, HTTPException
```

**5.** Add the dependency function. It reads an `X-Token` header and rejects bad ones.
```python


def get_current_user(x_token: str = Header(...)):
    if x_token != "secret-token":
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"username": "admin"}
```

**6.** Save. Confirm.
```bash
cat dependencies.py
```

**7.** Now use it on a route. Open `routers/items.py`.

**8.** Add to the imports at the top:
```python
from fastapi import APIRouter, Depends

from dependencies import get_current_user
```
(Replace the existing `from fastapi import APIRouter` line — combine into one.)

**9.** Add a new protected route at the bottom of `routers/items.py`.
```python


@router.get("/me/protected")
def protected(user: dict = Depends(get_current_user)):
    return {"message": f"Hello {user['username']}, you reached a protected route"}
```

**10.** Save. Watch uvicorn reload.

**11.** Curl without the header.
```bash
curl -i http://localhost:8000/items/me/protected
```
```
HTTP/1.1 422 Unprocessable Entity
...
{"detail":[{"type":"missing","loc":["header","x-token"],"msg":"Field required",...}]}
```
(Pydantic 422 because the header is required at the framework level.)

**12.** Curl with the wrong token.
```bash
curl -i http://localhost:8000/items/me/protected -H "X-Token: nope"
```
```
HTTP/1.1 401 Unauthorized
...
{"detail":"Invalid token"}
```

**13.** Curl with the right token.
```bash
curl -i http://localhost:8000/items/me/protected -H "X-Token: secret-token"
```
```
HTTP/1.1 200 OK
...
{"message":"Hello admin, you reached a protected route"}
```

**14.** Now apply the dependency at the **router level** to protect every users route. Open `routers/users.py`.

**15.** Update the imports:
```python
from fastapi import APIRouter, Depends

from dependencies import get_current_user
```

**16.** Update the router instantiation to include the dependency:
```python
router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(get_current_user)],
)
```

**17.** Save.

**18.** Curl `/users` without the header.
```bash
curl -i http://localhost:8000/users
```
```
HTTP/1.1 422 Unprocessable Entity
```

**19.** Curl `/users` with the right token.
```bash
curl -i http://localhost:8000/users -H "X-Token: secret-token"
```
```
HTTP/1.1 200 OK
```

**20.** Curl `/users` with the wrong token.
```bash
curl -i http://localhost:8000/users -H "X-Token: nope"
```
```
HTTP/1.1 401 Unauthorized
```

**21.** Curl `/items` (the items router has **no** router-level dependency).
```bash
curl -i http://localhost:8000/items
```
```
HTTP/1.1 200 OK
```
(Items is unprotected — only the `/items/me/protected` route uses Depends.)

**22.** Open `/docs` in the browser. Refresh.

**23.** Click any user route → **"Try it out"**. Notice Swagger now shows an `X-Token` header field. Type `secret-token`, click Execute.

**24.** Try with a wrong value to see the 401 in Swagger.

**25.** Use the global "Authorize" button — for our simple X-Token, you set the token via the header field on each route. (Real apps use OAuth/Bearer tokens with `OAuth2PasswordBearer`; we're keeping it simple.)

**26.** **Why this matters.** A dependency is a regular function. You can swap it (e.g., a fake `get_current_user` for tests). You can compose them (`Depends` inside another `Depends`). This is how FastAPI handles auth, DB sessions, rate limits, feature flags — all the same pattern.

**27.** Log it.
```bash
echo "Dependencies + injection: get_current_user wired in" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- The header name in `Header()` is automatically converted between hyphens and underscores. `x_token: str = Header(...)` matches `X-Token` on the wire.
- `Header(...)` (with the literal `...` Ellipsis) means "required." `Header(None)` means "optional, default None."
- `Depends(get_current_user)` — pass the function, **don't call it**. No parentheses.
- Router-level dependencies apply to **every route on that router**. If you only want to protect one, put `Depends` on the route, not the router.

---

## Checkpoint

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/items/me/protected
```
Should print `422` (header missing).

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/items/me/protected -H "X-Token: nope"
```
Should print `401`.

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/items/me/protected -H "X-Token: secret-token"
```
Should print `200`.

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/users
```
Should print `422` (header missing — the users router is now protected).

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/items
```
Should print `200` (items list is still unprotected).

---

**Next up:** [08-containerizing-fastapi.md](08-containerizing-fastapi.md) — Wrap the whole app in a Dockerfile
