# Lesson 04: CORS + Fetch Items

**By the end, your frontend will fetch the items list from FastAPI and render each item as a HeroUI Card. You'll have hit the CORS wall and added the middleware that breaks through it.**

⏱ ~25 minutes of typing

> Browsers block JavaScript on `http://localhost:3000` from calling `http://localhost:8000` by default — that's **CORS** (Cross-Origin Resource Sharing). FastAPI has middleware to allow it. Today you wire it up.

---

## Step 1: feel the CORS wall first

**1.** Make sure the FastAPI backend is running:
```bash
cd ~/docker-course/fastapi-app
docker compose up -d
sleep 2
curl -s http://localhost:8000/items | head -c 60
```
You should see JSON.

**2.** Make sure a few items exist (so we have something to render):
```bash
curl -s -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name":"Apple","price":0.5}' > /dev/null
curl -s -X POST http://localhost:8000/items -H "Content-Type: application/json" -d '{"name":"Bread","price":2.5,"is_offer":true}' > /dev/null
curl -s http://localhost:8000/items | python3 -m json.tool
```

**3.** Move to the frontend project.
```bash
cd ~/docker-course/fastapi-frontend
```

**4.** Replace `app/page.tsx` with a fetch attempt:
```tsx
"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
  price: number;
  is_offer: boolean | null;
};

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-8">
      <h1 className="text-3xl font-bold">Items</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="flex flex-col gap-2 w-96">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex justify-between">
              <span className="font-semibold">{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </CardHeader>
            <CardBody>
              {item.is_offer ? (
                <span className="text-green-600">On offer</span>
              ) : (
                <span className="text-gray-500">Regular price</span>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}
```

**5.** Save. Open `http://localhost:3000` in the browser.

**6.** **The page is empty (no items rendered).** Open the browser dev tools (F12 or right-click → Inspect) and look at the **Console** tab.

**7.** You should see something like:
```
Access to fetch at 'http://localhost:8000/items' from origin 'http://localhost:3000' has been blocked by CORS policy: ...
```
**That's the wall.** Now we break through it.

---

## Step 2: add CORS middleware to FastAPI

**8.** Open the **backend** project — `~/docker-course/fastapi-app/main.py` — in Cursor.

**9.** Add the import at the top with the other FastAPI imports:
```python
from fastapi.middleware.cors import CORSMiddleware
```

**10.** Below `app = FastAPI()`, add the middleware:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**11.** Save. Watch the api logs — uvicorn should hot-reload (Module 03 lesson 09 wired bind-mount + `--reload` for exactly this moment).
```bash
docker compose -f ~/docker-course/fastapi-app/docker-compose.yml logs api --tail=5
```
You should see `Application startup complete`.

**12.** Refresh `http://localhost:3000` in the browser. **The items render.**

**13.** Open the browser console — no more CORS errors.

---

## Step 3: read the four key arguments

   - **`allow_origins=["http://localhost:3000"]`** — exactly which origin can call your API. Use a list. Don't use `["*"]` in production with credentials.
   - **`allow_credentials=True`** — allows cookies/auth headers to ride along.
   - **`allow_methods=["*"]`** — allow all HTTP methods (GET, POST, DELETE, etc.).
   - **`allow_headers=["*"]`** — allow all request headers, including custom ones like `X-Token` from Module 03.

---

## Step 4: prove the round-trip works

**14.** Add a fresh item from the terminal:
```bash
curl -s -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Milk","price":3.0}' > /dev/null
```

**15.** Refresh the browser. Milk shows up in the list.

**16.** Look at the browser **Network** tab in dev tools. The request to `http://localhost:8000/items` should have status 200 and the response body should be your JSON.

---

## Step 5: handle loading and empty states

**17.** Update `app/page.tsx` to show a loading state and an "empty" state:
```tsx
"use client";

import { Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
  price: number;
  is_offer: boolean | null;
};

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-8">
      <h1 className="text-3xl font-bold">Items</h1>

      {loading && <Spinner label="Loading items..." />}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="text-gray-500">No items yet — add one!</p>
      )}

      <div className="flex flex-col gap-2 w-96">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex justify-between">
              <span className="font-semibold">{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </CardHeader>
            <CardBody>
              {item.is_offer ? (
                <span className="text-green-600">On offer</span>
              ) : (
                <span className="text-gray-500">Regular price</span>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}
```

**18.** Save. Refresh the browser — you'll briefly see a spinner before the items load.

**19.** Stop the FastAPI backend to feel the error path:
```bash
docker compose -f ~/docker-course/fastapi-app/docker-compose.yml stop api
```

**20.** Refresh the browser. After a moment, you should see the red error text.

**21.** Restart it:
```bash
docker compose -f ~/docker-course/fastapi-app/docker-compose.yml start api
```

**22.** Refresh — items return.

---

## Step 6: commit

**23.** Backend changes:
```bash
cd ~/docker-course/fastapi-app
git add main.py
git commit -m "Add CORS middleware for frontend on :3000"
```

**24.** Frontend changes:
```bash
cd ~/docker-course/fastapi-frontend
git add app/page.tsx
git commit -m "Fetch and render items from FastAPI"
```

**25.** Log it.
```bash
echo "Frontend fetches /items from FastAPI; CORS middleware added" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **CORS errors only happen in browsers.** `curl` and `fetch` from the same origin (or from server-side code) don't trigger CORS. So `curl http://localhost:8000/items` always works — it's only the browser that complains.
- **`allow_origins=["*"]` + `allow_credentials=True` is invalid.** The spec forbids that combination. If you want both, list specific origins.
- **The `/api/...` proxy pattern.** Some Next.js apps avoid CORS by routing `/api/*` to the backend through the Next.js server. We're using direct fetch with CORS for clarity. Either is fine.
- **Configure `allow_origins` per environment.** Hardcoding `http://localhost:3000` is fine for dev. For staging/prod, use env vars. We'll cross that bridge when we deploy.

---

## Checkpoint

```bash
grep "CORSMiddleware" ~/docker-course/fastapi-app/main.py
```
Should match.

In the browser at `http://localhost:3000`:
- An "Items" heading
- A loading spinner briefly, then your items as Cards
- No CORS errors in the console

```bash
curl -s -I -X OPTIONS http://localhost:8000/items \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET" | grep -i "access-control"
```
Should print headers like `access-control-allow-origin: http://localhost:3000`.

---

**Next up:** [05-create-item-form.md](05-create-item-form.md) — Add a form to create items
