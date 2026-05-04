# Lesson 03: Tour + First Component

**By the end, you will have changed the homepage to display a single HeroUI Button, watched it hot-reload, and seen what `"use client"` does.**

⏱ ~15 minutes of typing

```instructor
Say: "Tour of the Next.js starter, then the smallest possible change — replace the homepage with one HeroUI Button. Hot-reload should refresh the browser the moment you save."
Mention: "Next.js 13+ defaults pages to SERVER components. Anything with `useState`/`useEffect`/onClick needs `'use client'` at line 1. They will hit this — drill the error message."
Pause: After they save the Button and watch the browser refresh. That hot-reload moment is the same dopamine as FastAPI lesson 03 — let them feel it.
Say: "You're done when the homepage shows a HeroUI Button, clicking it does whatever they wired up, and editing the label hot-reloads instantly."
```

---

**1.** Make sure the dev server is still running. If not:
```bash
cd ~/docker-course/fastapi-frontend
npm run dev
```

**2.** In Cursor, open `~/docker-course/fastapi-frontend` as a folder (`File → Open Folder…`).

---

## Tour

**3.** Look at the structure in the explorer:

```
app/
├── layout.tsx       ← root layout, wraps every page
├── page.tsx         ← the / route
├── providers.tsx    ← HeroUIProvider lives here
├── globals.css      ← Tailwind directives
components/
config/
public/
styles/
tailwind.config.js
```

**4.** Open `app/page.tsx`. This is what renders at `http://localhost:3000`. It probably has a `<Hero>` or similar landing-page setup.

**5.** Open `app/layout.tsx`. Note the `<Providers>` component wrapping `{children}` — that's where HeroUI's theme and context get attached.

---

## First change

**6.** **Replace** the contents of `app/page.tsx` with a minimal page:
```tsx
import { Button } from "@heroui/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold">FastAPI + HeroUI</h1>
      <Button color="primary">Click me</Button>
    </main>
  );
}
```

**7.** Save. Watch the browser tab — Next.js hot-reloads. The page should now show your heading and a primary-color HeroUI button.

**8.** Click the button. Nothing happens — we haven't wired an `onClick` yet. That's intentional.

**9.** Look at the dev-server terminal. You should see:
```
 ✓ Compiled / in 200ms
```

---

## "use client" — the moment

**10.** Try adding interactivity. Update `app/page.tsx` to use `useState`:
```tsx
import { Button } from "@heroui/react";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold">FastAPI + HeroUI</h1>
      <Button color="primary" onPress={() => setCount(count + 1)}>
        Clicked {count} times
      </Button>
    </main>
  );
}
```

**11.** Save. **The browser will show an error** — something like:
```
You're importing a component that needs `useState`. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
```

**12.** **This is the most important Next.js lesson.** Pages and components in `app/` default to **server components** — they render on the server and ship as HTML. Anything with hooks (`useState`, `useEffect`, browser APIs) needs to be a **client component**, which means a `"use client"` directive at the top.

**13.** Add `"use client";` as the very first line of `app/page.tsx`:
```tsx
"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
```

**14.** Save. The error disappears, and the button now counts up when clicked.

**15.** Click it a few times. The number increments. **You have a working interactive React app.**

---

## Try a few more components

**16.** Replace `app/page.tsx` with a slightly richer page:
```tsx
"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold">FastAPI + HeroUI</h1>

      <Card className="w-96">
        <CardHeader>
          <h2 className="text-lg font-semibold">Greeter</h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Your name"
            value={name}
            onValueChange={setName}
          />
          <Button color="primary" isDisabled={!name}>
            Hello, {name || "stranger"}
          </Button>
        </CardBody>
      </Card>
    </main>
  );
}
```

**17.** Save. The page now shows a HeroUI Card with an Input and a Button that updates as you type.

**18.** Type your name in the input — the button text changes live.

**19.** Notice how the Button is disabled while the input is empty (`isDisabled={!name}`).

---

## Use Continue.dev for a tweak

**20.** Open the Continue chat panel (Module 05). Highlight the entire `Home` component in `app/page.tsx`.

**21.** Press **Ctrl+I**. Type:
```
Add a Reset button next to the greeting button that clears the name input.
```

**22.** Read the diff before accepting. The model should add a second Button with an `onPress` that calls `setName("")`.

**23.** Accept. Type a name, then click Reset. The input clears.

**24.** This is the agentic-coding loop on a frontend codebase. Same as Module 05's drills, just against TSX instead of Python.

---

## Commit

**25.** From a second terminal:
```bash
cd ~/docker-course/fastapi-frontend
git add app/page.tsx
git commit -m "First HeroUI page: greeter with Card, Input, Button"
```

**26.** Log it.
```bash
echo "HeroUI tour: Card + Input + Button + use client + Continue.dev tweak" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`"use client"` must be on line 1**, before any imports. (Comments above it are fine.)
- **Server vs client components is the #1 Next.js confusion.** Hooks → client. No hooks → server (and that's faster). Don't mark every component `"use client"` reflexively — it loses the SSR benefit.
- **HeroUI uses `onPress`, not `onClick`.** They use react-aria internally. `onClick` may work but `onPress` is the documented prop.
- **Tailwind classes are space-separated strings.** Quotes around the whole `className`, no commas. `"flex flex-col gap-4 p-8"` not `"flex, flex-col, gap-4, p-8"`.

---

## Checkpoint

```bash
grep '"use client"' app/page.tsx
```
Should match.

```bash
grep -E "Card|Input|Button" app/page.tsx | head -n 3
```
Should show HeroUI imports/usages.

In the browser at `http://localhost:3000`:
- A heading "FastAPI + HeroUI"
- A Card with an Input and Buttons
- The Reset button works

---

**Next up:** [04-cors-and-fetch-items.md](04-cors-and-fetch-items.md) — Connect the frontend to FastAPI
