# Lesson 05: Create-Item Form

**By the end, you will have a HeroUI form that POSTs new items to FastAPI and refreshes the list inline — full create-and-display loop.**

⏱ ~20 minutes of typing

---

**1.** In `~/docker-course/fastapi-frontend/app/page.tsx`, you currently have a list view. We're adding a form above it that creates new items.

**2.** Replace the contents of `app/page.tsx` with:
```tsx
"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Spinner,
} from "@heroui/react";
import { FormEvent, useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
  price: number;
  is_offer: boolean | null;
};

const API = "http://localhost:8000";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isOffer, setIsOffer] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function loadItems() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/items`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setItems(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch(`${API}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          is_offer: isOffer,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(`HTTP ${res.status}: ${detail}`);
      }
      // success — clear form and reload list
      setName("");
      setPrice("");
      setIsOffer(false);
      await loadItems();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Items</h1>

      <Card className="w-96">
        <CardHeader>
          <h2 className="text-lg font-semibold">Add an item</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              label="Name"
              value={name}
              onValueChange={setName}
              isRequired
            />
            <Input
              label="Price"
              type="number"
              step="0.01"
              value={price}
              onValueChange={setPrice}
              isRequired
            />
            <Checkbox isSelected={isOffer} onValueChange={setIsOffer}>
              On offer
            </Checkbox>
            <Button
              type="submit"
              color="primary"
              isLoading={submitting}
              isDisabled={!name || !price}
            >
              Add item
            </Button>
            {formError && (
              <p className="text-sm text-red-500">{formError}</p>
            )}
          </form>
        </CardBody>
      </Card>

      <div className="flex flex-col gap-2 w-96">
        {loading && <Spinner label="Loading items..." />}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="text-gray-500">No items yet — add one!</p>
        )}
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

**3.** Save. Watch the dev-server terminal hot-reload.

**4.** In the browser at `http://localhost:3000`, you should see the form Card above the items list.

---

## Drill the form

**5.** Type `Cheese` in Name, `5.00` in Price. Click **Add item**.

**6.** The button shows a loading spinner briefly (HeroUI's `isLoading` prop), then the form clears, then the list reloads with `Cheese` at the bottom.

**7.** Confirm it's really in the database:
```bash
curl -s http://localhost:8000/items | python3 -m json.tool | tail -n 10
```
Cheese should be there.

**8.** And in psql:
```bash
docker compose -f ~/docker-course/fastapi-app/docker-compose.yml exec db \
  psql -U postgres -d appdb -c "SELECT * FROM items WHERE name='Cheese';"
```

---

## Drill validation errors

**9.** Try adding an item with `price = -1` (the FastAPI lesson 11 validation should reject it).

**10.** Click **Add item**. The Add button works (no client-side number-range check in our code), but the response from the server is a 400:
```
HTTP 400: {"detail":"price must be positive"}
```
That message appears in red below the Add button — exactly the behavior the form wires up.

**11.** Try a non-numeric value — type `free` in Price. Note the Input's `type="number"` mostly prevents this in modern browsers; on older ones the form-level error path catches it.

**12.** Try the `is_offer` checkbox. Add an item with it checked — the list shows it as **On offer** in green.

---

## Toggle the form into a Modal (optional polish)

Skip this section if pressed for time.

**13.** Real apps often put creation forms in a modal. HeroUI has a Modal component. Highlight the entire form Card and use Continue.dev:
   - **Ctrl+I**, prompt:
     ```
     Wrap this form in a HeroUI Modal that opens when an "Add item" button is clicked. Use the useDisclosure hook from @heroui/react. Keep the form contents identical.
     ```
   - Read the diff. Accept if reasonable.

**14.** The page now shows a small "Add item" button at the top; clicking it opens a modal with the form.

---

## Commit

**15.** Stage and commit:
```bash
cd ~/docker-course/fastapi-frontend
git add app/page.tsx
git commit -m "Add create-item form (Card + Input + Checkbox + Button)"
```

**16.** Log it.
```bash
echo "Frontend create-item form: working end-to-end" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`onValueChange`, not `onChange`.** HeroUI's Input/Checkbox/Switch use `onValueChange` which gives you the value directly. `onChange` would give you an Event, which works but isn't idiomatic for HeroUI.
- **`Number(price)` not `price`.** Input values are strings. The API expects a number for `price`. Convert before sending.
- **Always `await loadItems()` after a successful POST.** Otherwise the new item shows up only on next refresh.
- **Don't put the API URL in 12 places.** The constant `const API = "http://localhost:8000"` is the seed of an env var (`NEXT_PUBLIC_API_URL`). We'll skip env vars today; flag it for refactor.

---

## Checkpoint

```bash
grep "handleSubmit" app/page.tsx
```
Should match.

In the browser:
- The form accepts name + price + isOffer.
- The Add button is disabled until both name and price have values.
- Submitting creates an item that immediately appears in the list below.
- Submitting an invalid price shows the error message in red.

```bash
curl -s http://localhost:8000/items | python3 -c "import sys,json; print(len(json.load(sys.stdin)))"
```
Should print a number that increases each time you submit a valid item.

---

**Next up:** [06-extend-with-continue.md](06-extend-with-continue.md) — Use Continue.dev's agent mode to add a feature
