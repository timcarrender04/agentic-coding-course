# Lesson 02: Init the HeroUI App

**By the end, you will have a Next.js + HeroUI starter project at `~/docker-course/fastapi-frontend/` with all dependencies installed and a dev server running on port 3000.**

⏱ ~15 minutes of typing + waiting for `npm install`

> **HeroUI** (formerly NextUI) is a React component library: prebuilt buttons, inputs, cards, modals — all themed and accessible. Pairs cleanly with Next.js + Tailwind. Their CLI scaffolds a starter that has everything wired up.

---

**1.** Move into the course directory.
```bash
cd ~/docker-course
```

**2.** Confirm it's there.
```bash
pwd
```
```
/home/your-user/docker-course
```

**3.** Run the HeroUI CLI to scaffold a new app. This downloads the CLI on the fly via npx (no global install needed).
```bash
npx heroui-cli@latest init
```

**4.** The CLI prompts you. Answer:
   - **Project name:** `fastapi-frontend`
   - **Template:** pick the **Next.js** option (or "App" — the simplest one).
   - **Package manager:** **npm**.
   - **Install dependencies now:** **Yes**.

**5.** The CLI creates the directory and runs `npm install`. This takes 1–3 minutes (~150 MB of dependencies). Let it finish.

**6.** Move into the new project.
```bash
cd fastapi-frontend
```

**7.** Look at what got created.
```bash
ls -la
```
You should see:
```
.eslintrc.json
.gitignore
README.md
app/                    (Next.js App Router pages live here)
components/             (your custom components)
config/
node_modules/           (DON'T look inside — 50,000+ files)
package.json
package-lock.json
public/
styles/
tailwind.config.js
tsconfig.json
```

**8.** Read `package.json` to see what's installed.
```bash
cat package.json | python3 -m json.tool | head -n 30
```
You'll see `next`, `react`, `@heroui/react`, `tailwindcss`, `framer-motion` (HeroUI's animation peer dep) and friends.

**9.** Start the dev server.
```bash
npm run dev
```
You should see:
```
> next dev

  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local
 ✓ Ready in 1.2s
```

**10.** **Leave that terminal running.** Open a **second** integrated terminal in Cursor.

**11.** Open `http://localhost:3000` in your browser.
   - **WSL students:** Windows browser, `http://localhost:3000`.
   - **SSH students:** Cursor's "Ports" tab should auto-forward 3000. Click the globe icon.

**12.** You should see a HeroUI starter page — usually something like a "Welcome to HeroUI" landing page with example components.

---

## Manual fallback (if the CLI fails)

If `heroui-cli` fails for any reason, do this manually:

**Manual A.** Create a Next.js app:
```bash
cd ~/docker-course
npx create-next-app@latest fastapi-frontend --typescript --tailwind --app --eslint --src-dir=false --import-alias='@/*'
cd fastapi-frontend
```

**Manual B.** Install HeroUI:
```bash
npm install @heroui/react framer-motion
```

**Manual C.** Configure Tailwind for HeroUI. Open `tailwind.config.js` and replace the `content` array and add the plugin per https://heroui.com/docs/guide/installation. (The CLI did this automatically; here you do it by hand.)

**Manual D.** Wrap your app with `HeroUIProvider`. Open `app/layout.tsx` (or `app/providers.tsx` if using a separate file) and wrap `{children}` in `<HeroUIProvider>`.

The CLI path is faster — only fall back to manual if necessary.

---

**13.** Back in the dev terminal, you should see Next.js compile messages every time you save a file. Leave it running.

**14.** Initialize a git repo for the frontend (it's a separate repo from your FastAPI backend).
```bash
git init
git add .
git commit -m "Initial commit: HeroUI Next.js starter"
```

**15.** Log it.
```bash
echo "HeroUI app initialized at ~/docker-course/fastapi-frontend" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`node_modules/` is huge.** Never commit it — the CLI's `.gitignore` already excludes it. Confirm: `grep node_modules .gitignore`.
- **Port 3000 in use.** If you already have something on 3000, Next.js will pick 3001 automatically. Watch the URL it prints.
- **Don't run `npm install` from the home directory.** Always from the project directory (`~/docker-course/fastapi-frontend/`). Otherwise you create a `node_modules/` in the wrong place.
- **The CLI version pins matter.** HeroUI is moving fast — major versions change props/imports. The starter will pin a compatible set; don't manually upgrade individual packages mid-module.

---

## Checkpoint

```bash
cd ~/docker-course/fastapi-frontend && ls package.json
```
Should print `package.json`.

```bash
grep -q '"@heroui/react"' ~/docker-course/fastapi-frontend/package.json && echo "OK: HeroUI installed"
```
Should print `OK: HeroUI installed`.

```bash
curl -s http://localhost:3000 | head -c 200
```
Should print HTML (something starting with `<!DOCTYPE html>` or similar).

In the browser, `http://localhost:3000` shows the HeroUI starter page.

---

**Next up:** [03-tour-and-first-component.md](03-tour-and-first-component.md) — Tour the app and add your first HeroUI component
