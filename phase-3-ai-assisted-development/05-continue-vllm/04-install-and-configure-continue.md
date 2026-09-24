# Lesson 04: Install + Configure Continue.dev

**By the end, Continue.dev is installed in VS Code, configured to talk to the college's shared vLLM endpoint, and you've sent your first chat message through the IDE.**

⏱ ~25 minutes of clicking + typing

```instructor
Say: "Continue.dev is the free, open-source AI layer for VS Code — chat/edit/agent in the editor, but pointed at the COLLEGE endpoint. No paid backend, no per-student signup — just the shared URL and key."
Mention: "Mismatched roles is the #1 config bug. Chat/edit/apply on the 70B; autocomplete on the 8B. If a student puts the 70B on autocomplete, every keystroke pauses for a second or more."
Pause: After they save `~/.continue/config.yaml` and Continue reloads. If the panel shows a config error, the YAML indentation is wrong — usually a tab vs spaces mix. Show how to spot it before letting them chat.
Say: "You're done when the Continue panel chats with the 70B and the response streams within a few seconds of pressing Enter."
```

---

## Step 1: install the extension

**1.** Open VS Code. Open the extensions side bar (`Ctrl+Shift+X`).

**2.** Search for **Continue**. The extension you want is published by **Continue** (the company), id `continue.continue`.

**3.** Click **Install**. (If you already installed it in lesson 00, confirm it shows **Installed**.)

**4.** After install, look at the activity bar (left edge). There's a new icon — a small Continue logo. That's the Continue side bar. Click it.

**5.** First-launch prompt: Continue may offer "Try it for free" with their hosted models. **Click "Use my own models"** or "Skip" — we point it at the college endpoint, not a hosted service.

**6.** The Continue chat panel opens. At the bottom there's a model selector. It probably says "No models configured." That's fine — we'll fix it next.

---

## Step 2: open the config

**7.** Continue's config lives at `~/.continue/config.yaml`. Open the integrated terminal in VS Code.
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

**8.** Open the config in VS Code.
```bash
code ~/.continue/config.yaml 2>/dev/null || code ~/.continue/config.json
```
(Older Continue versions still use JSON. The lesson assumes YAML; if you got JSON, follow the JSON-version note at the end.)

---

## Step 3: write the config

**9.** Replace the entire contents of `~/.continue/config.yaml` with the following. (If your instructor gave you the Tailscale IP, substitute it in both `apiBase` lines. If no key is required on the campus network, you may delete both `apiKey` lines.)
```yaml
name: College Coder (vLLM)
version: 1.0.0
schema: v1

models:
  - name: Llama 3.3 70B (chat/edit/agent)
    provider: openai                 # vLLM is OpenAI-compatible
    model: meta-llama/Llama-3.3-70B-Instruct
    apiBase: http://gpu.college.local:8000/v1
    apiKey: sk-college-shared        # shared key; or omit on the campus network
    roles:
      - chat
      - edit
      - apply

  - name: Llama 3.1 8B (autocomplete)
    provider: openai
    model: meta-llama/Llama-3.1-8B-Instruct
    apiBase: http://gpu.college.local:8000/v1
    apiKey: sk-college-shared
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
   - Each has a friendly `name` (shown in the picker), a `provider` (`openai` here — vLLM speaks the OpenAI API), the `model` (the exact vLLM model id from lesson 02), an `apiBase` (the shared endpoint), an `apiKey` (the shared key), and `roles` (which Continue features it can serve).
   - The **70B** model handles **chat** (the conversation panel), **edit** (`Ctrl+I` inline edits), and **apply** (turning chat suggestions into actual file edits).
   - The **8B** model handles **autocomplete** only.
   - **`context:`** — providers that let you reference things in chat with `@`. We'll use these in lesson 05.

---

## Step 4: reload Continue

**12.** Continue picks up config changes automatically, but a clean reload is the safest. In the command palette (`Ctrl+Shift+P`), run **"Continue: Reload"** or just close and reopen the Continue side bar.

**13.** Look at the bottom of the Continue chat panel. The model selector should now show **"Llama 3.3 70B (chat/edit/agent)"**. If it still says "No models," your YAML has a syntax error — re-check indentation (2 spaces, no tabs) and try again.

---

## Step 5: first chat

**14.** Type into the Continue chat box:
```
Reply with the single word: hello
```

**15.** Press Enter (or click send). After a few seconds, the response should stream back: `hello` (or `Hello`).

**16.** **You're talking to the college's 70B.** The request went over the network to the shared vLLM box and back — no model is running on your laptop.

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

**20.** Pause. After a brief delay, you should see **ghost text** appear suggesting `    return a + b`. Press **Tab** to accept, or Esc to dismiss. This suggestion came from the **8B** model — notice it's near-instant compared to the chat response.

**21.** If no ghost text appears: open the Continue side bar, look at the bottom — there's a small status line. If it mentions the autocomplete model, that's the issue. Re-check the `roles: [autocomplete]` block on the 8B in your config.

**22.** **Don't keep the change.** Undo (`Ctrl+Z`) — we'll work the codebase properly later.

---

## Step 7: a note on remote / SSH setups

**23.** If your VS Code is attached to a remote host via **Remote — SSH** or **Remote — WSL**:
   - `~/.continue/config.yaml` lives on the machine where the Continue extension host runs — i.e. on the **remote** when you're attached via Remote — SSH. Edit it there (the `code ~/.continue/config.yaml` command in step 8 opens the right one).
   - The `apiBase` is the **same college endpoint** regardless of where your editor runs: `http://gpu.college.local:8000/v1`. There's no port forwarding to set up — you're calling a shared network service, not a local process.
   - Whichever machine runs the extension host just needs to reach the endpoint. Confirm with the lesson 02 `curl` from that machine if chat fails.

**24.** Log it.
```bash
echo "Continue.dev configured to talk to the college vLLM endpoint" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **YAML indentation.** 2 spaces per level, no tabs. Continue is picky.
- **`provider: openai`, not a vLLM-specific provider.** vLLM implements the OpenAI API, so Continue's `openai` provider is correct. The `apiBase` is what points it at the college box.
- **`apiBase` ends in `/v1`** and is `http://`, not `https://` — plain HTTP because it's an internal campus service.
- **Roles matter.** Wrong role on the wrong model means autocomplete uses the slow 70B (laggy on every keystroke), or chat uses the smaller 8B (weaker answers).
- **Key mismatch = "Failed to fetch" or 401.** If chat errors immediately, confirm `apiKey` matches the shared key (or that you removed it, if your network needs none).
- **Older Continue versions** use `~/.continue/config.json` instead of YAML. The same shape applies — JSON syntax, same keys. If you have JSON, port the YAML above by hand.

---

## Checkpoint

```bash
test -f ~/.continue/config.yaml -o -f ~/.continue/config.json && echo "OK: config present"
```
Should print `OK: config present`.

In the Continue chat panel:
- The model picker shows **Llama 3.3 70B (chat/edit/agent)**.
- Sending "Reply with the single word: ok" returns `ok` within a few seconds.

In any Python file, typing a function signature followed by a newline triggers ghost-text autocomplete (from the 8B).

---

**Next up:** [05-chat.md](05-chat.md) — Chat with the model about your repo
