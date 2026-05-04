# Lesson 04: Install + Configure Continue.dev

**By the end, Continue.dev is installed in Cursor, configured to talk to your local Ollama, and you've sent your first chat message through the IDE.**

⏱ ~25 minutes of clicking + typing

---

## Step 1: install the extension

**1.** Open Cursor. Open the extensions side bar (`Ctrl+Shift+X`).

**2.** Search for **Continue**. The extension you want is published by **Continue** (the company), id `continue.continue`.

**3.** Click **Install**.

**4.** After install, look at the activity bar (left edge). There's a new icon — a small CN logo (or similar). That's the Continue side bar. Click it.

**5.** First-launch prompt: Continue may offer "Try it for free" with their hosted models. **Click "Use my own models"** or "Skip" — we want local Ollama.

**6.** The Continue chat panel opens. At the bottom there's a model selector. It probably says "No models configured." That's fine — we'll fix it next.

---

## Step 2: open the config

**7.** Continue's config lives at `~/.continue/config.yaml`. Open the integrated terminal in Cursor.
```bash
ls -la ~/.continue/
```
You'll see something like:
```
config.yaml      (or config.json on older versions)
docs/
index/
sessions/
```

**8.** Open the config in Cursor.
```bash
code ~/.continue/config.yaml 2>/dev/null || code ~/.continue/config.json
```
(Older Continue versions still use JSON. The lesson assumes YAML; if you got JSON, follow the JSON-version note at the end.)

---

## Step 3: write the config

**9.** Replace the entire contents of `~/.continue/config.yaml` with:
```yaml
name: Local Ollama
version: 0.0.1
schema: v1

models:
  - name: Qwen 2.5 Coder 7B
    provider: ollama
    model: qwen2.5-coder:7b
    apiBase: http://localhost:11434
    roles:
      - chat
      - edit
      - apply

  - name: Qwen 2.5 Coder 1.5B Base
    provider: ollama
    model: qwen2.5-coder:1.5b-base
    apiBase: http://localhost:11434
    roles:
      - autocomplete

context:
  - provider: code
  - provider: diff
  - provider: terminal
  - provider: problems
  - provider: folder
  - provider: codebase
  - provider: file
  - provider: docs
```

**10.** Save (`Ctrl+S`).

**11.** Read the config you just wrote:
   - **`models:`** — a list of model definitions.
   - Each has a friendly `name` (shown in the picker), a `provider` (`ollama` here), the `model` (the Ollama tag), and `roles` (which Continue features it can serve).
   - The 7B model handles **chat** (the conversation panel), **edit** (`Ctrl+I` inline edits), and **apply** (turning chat suggestions into actual file edits).
   - The 1.5B-base model handles **autocomplete** only.
   - **`context:`** — providers that let you reference things in chat with `@`. We'll use these in lesson 05.

---

## Step 4: reload Continue

**12.** Continue picks up config changes automatically, but a clean reload is the safest. In the command palette (`Ctrl+Shift+P`), run **"Continue: Reload"** or just close and reopen the Continue side bar.

**13.** Look at the bottom of the Continue chat panel. The model selector should now show **"Qwen 2.5 Coder 7B"**. If it still says "No models," your YAML has a syntax error — re-check indentation (2 spaces, no tabs) and try again.

---

## Step 5: first chat

**14.** Type into the Continue chat box:
```
Reply with the single word: hello
```

**15.** Press Enter (or click send). After a few seconds, the response should stream back: `hello` (or `Hello`).

**16.** **You're talking to your GPU.** Open a second terminal and run `nvidia-smi` while you send another message — you should see VRAM and GPU utilization climb.

**17.** Try a coding question.
```
In one sentence, what does the @app.get decorator do in FastAPI?
```
You should get a focused, accurate answer.

---

## Step 6: confirm autocomplete is loaded

**18.** Open a Python file from your repo, e.g. `~/docker-course/fastapi-app/main.py`.

**19.** At the bottom of `main.py`, hit Enter to start a new line and type:
```python
def add(a: int, b: int) -> int:
```

**20.** Pause. After a brief delay, you should see **ghost text** appear suggesting `    return a + b`. Press **Tab** to accept, or Esc to dismiss.

**21.** If no ghost text appears: open the Continue side bar, look at the bottom — there's a small status line. If it says something about the autocomplete model, that's the issue. Re-check the `roles: [autocomplete]` block in your config.

**22.** **Don't keep the change.** Undo (`Ctrl+Z`) — we'll work the codebase properly later.

---

## Step 7: SSH-to-GPU students only

**23.** If your GPU and Ollama Compose stack are on a remote machine and your Cursor is on your laptop:
   - On the **remote** machine, lesson 02 publishes `11434:11434` from the Ollama container — ensure `cd ~/docker-course/ollama && docker compose up -d` is running there.
   - In `~/.continue/config.yaml` (which lives in the remote-attached Cursor session, so on the remote), keep `apiBase: http://localhost:11434` — from the remote's perspective, Ollama is at localhost.
   - If Cursor is connected via Remote-SSH, Continue's "remote half" runs on the remote and talks to Ollama there. **No port forwarding needed in this case.** Just confirm `~/.continue/config.yaml` is on the remote, not your laptop.
   - (Rare split setup: IDE local, Ollama on another host on the LAN — point `apiBase` at `http://<that-host>:11434` and ensure that host's firewall allows the port.)

**24.** Log it.
```bash
echo "Continue.dev configured to talk to local Ollama" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **YAML indentation.** 2 spaces per level, no tabs. Continue is picky.
- **`apiBase`** is `http://localhost:11434`, not `https://`. Plain HTTP because it's local.
- **Roles matter.** Wrong role on the wrong model means autocomplete uses the slow 7B (laggy), or chat uses the dumb 1.5B-base (gibberish).
- **Older Continue versions** use `~/.continue/config.json` instead of YAML. The same shape applies — JSON syntax, same keys. If you have JSON, port the YAML above using a converter or just rewrite by hand.

---

## Checkpoint

```bash
test -f ~/.continue/config.yaml -o -f ~/.continue/config.json && echo "OK: config present"
```
Should print `OK: config present`.

In the Continue chat panel:
- The model picker shows **Qwen 2.5 Coder 7B**.
- Sending "Reply with the single word: ok" returns `ok` within ~10 seconds.

In any Python file, typing a function signature followed by a newline triggers ghost-text autocomplete.

---

**Next up:** [05-chat.md](05-chat.md) — Chat with the model about your repo
