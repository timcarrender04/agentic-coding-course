# Lesson 03: Explore the Models

**By the end, you will have sent a real chat completion to the 70B model over the OpenAI-compatible API, felt its latency, and confirmed the 8B model is autocomplete-only.**

⏱ ~20 minutes of typing + reading

> **Two models, two roles.** The **70B** (Llama 3.3 70B Instruct) is the smart, conversational model — it handles chat, inline edit, and agent mode. The **8B** (Llama 3.1 8B Instruct) is fast and lightweight — it's strictly the tab-autocomplete engine. Today we exercise the 70B directly with `curl`, the same API Continue.dev will use in lesson 04.

```instructor
Say: "Two models, two roles. The 70B for chat/edit/agent — smart, a beat slower. The 8B for autocomplete only — fast. We poke the 70B directly today so they've seen a real completion before Continue hides it behind a nice UI."
Mention: "If the 70B isn't online yet, the chat-completions call 404s or errors with 'model not found'. That's expected mid-migration — have them run the call against the 8B just to see the API work, and note the 70B is coming."
Pause: While the first completion streams. Use the wait — explain OpenAI-compatible chat completions, system vs user roles, why 70B for reasoning and 8B for tab. Real Q&A, not a lecture.
Say: "You're done when a chat-completions call to the 70B returns a coherent answer AND they can explain why the 8B is autocomplete-only."
```

**All calls reuse the shell variables from lesson 02.** If you opened a fresh terminal, set them again:
```bash
export VLLM_BASE=http://gpu.college.local:8000/v1
export VLLM_KEY=sk-college-shared
```

---

## The two roles, restated

| Model | vLLM model id | Role | Why |
|---|---|---|---|
| Llama 3.3 70B Instruct | `meta-llama/Llama-3.3-70B-Instruct` | chat, edit, agent | Large, reasoning-capable; worth the extra second. |
| Llama 3.1 8B Instruct | `meta-llama/Llama-3.1-8B-Instruct` | autocomplete only | Small and fast; returns a suggestion in milliseconds. |

You do **not** pick a model by your own hardware — the shared box already hosts both. You just address each by its `id`.

---

**1.** Send a first chat completion to the **70B**. This is the OpenAI-compatible `/v1/chat/completions` route.
```bash
curl -s "$VLLM_BASE/chat/completions" \
  -H "Authorization: Bearer $VLLM_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Llama-3.3-70B-Instruct",
    "messages": [
      {"role": "user", "content": "What does the FastAPI Depends() function do, in one sentence?"}
    ]
  }' | python3 -c "import sys,json; print(json.load(sys.stdin)['choices'][0]['message']['content'])"
```
You should see a multi-second pause (the 70B is large and shared), then a coherent one-sentence answer printed. **That's the model Continue will use for chat.**

**2.** Feel the shape of the request. Notice three things:
   - `"model"` names the exact id from lesson 02.
   - `"messages"` is a list of role/content turns — same format the OpenAI SDK uses.
   - The answer comes back at `choices[0].message.content`.

**3.** Try a system prompt to steer the style — models take a `system` turn before the `user` turn.
```bash
curl -s "$VLLM_BASE/chat/completions" \
  -H "Authorization: Bearer $VLLM_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Llama-3.3-70B-Instruct",
    "messages": [
      {"role": "system", "content": "You are a terse senior Python engineer. Answer in one line of code, no prose."},
      {"role": "user", "content": "A FastAPI route that returns {\"ok\": true}."}
    ]
  }' | python3 -c "import sys,json; print(json.load(sys.stdin)['choices'][0]['message']['content'])"
```
You should get essentially a single line of Python. Same model, very different behavior — that's the system prompt at work.

**4.** Ask a follow-up-style question in one call to feel the model's coding ability:
```bash
curl -s "$VLLM_BASE/chat/completions" \
  -H "Authorization: Bearer $VLLM_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Llama-3.3-70B-Instruct",
    "messages": [
      {"role": "user", "content": "Show me a tiny example of FastAPI Depends() with a dependency function."}
    ]
  }' | python3 -c "import sys,json; print(json.load(sys.stdin)['choices'][0]['message']['content'])"
```
Read the code it returns. This is the quality you'll get in the chat panel in lesson 05.

**5.** Now look at the **8B**. It *can* answer a chat prompt, but in this course it is reserved for autocomplete. Prove it responds, then leave it alone:
```bash
curl -s "$VLLM_BASE/chat/completions" \
  -H "Authorization: Bearer $VLLM_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Llama-3.1-8B-Instruct",
    "messages": [
      {"role": "user", "content": "Complete this function:\ndef fib(n):"}
    ]
  }' | python3 -c "import sys,json; print(json.load(sys.stdin)['choices'][0]['message']['content'])"
```
It answers, and faster than the 70B — but notice it's a smaller, less careful model. In Continue we give it **only** the `autocomplete` role, where speed matters and the context is tightly scoped. Chat/edit/agent all go to the 70B.

> **Why 8B for autocomplete and 70B for everything else?** Tab autocomplete fires on every pause in your typing — it must return in milliseconds, so it needs the small, fast model. Chat, inline edit, and agent mode run once when you ask, and reward reasoning — so they get the big model even though it's a beat slower. Same reason you'd never wait two seconds for every ghost-text suggestion.

**6.** Log it.
```bash
echo "Models explored: chat-completions OK against Llama-3.3-70B (chat/edit/agent), Llama-3.1-8B reserved for autocomplete" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **First response is slow.** The 70B is large and shared across the whole cohort. Expect a few seconds before text comes back, longer during a busy lab. Don't conclude it's broken until you've waited.
- **`model not found` / `404` on the 70B.** The 70B is **coming online** — mid-migration it may not be loaded yet. Confirm with your instructor. In the meantime the 8B is live, so the API itself works.
- **`401 Unauthorized`.** The shared key is wrong or missing — recheck `VLLM_KEY` and the `Authorization` header (lesson 02).
- **Don't put the 8B on chat in Continue.** It's the autocomplete model. Using it for chat gives weaker answers; that's why lesson 04's `roles:` keep chat/edit/agent on the 70B.
- **It's shared, not private.** Everything you send goes to the college server. Don't paste secrets — build the hygiene habit now (it carries into lesson 05).

---

## Checkpoint

```bash
curl -s "$VLLM_BASE/chat/completions" \
  -H "Authorization: Bearer $VLLM_KEY" -H "Content-Type: application/json" \
  -d '{"model":"meta-llama/Llama-3.3-70B-Instruct","messages":[{"role":"user","content":"What is 2+2? One word."}]}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['choices'][0]['message']['content'])"
```
Should print `4` (or `Four`). If the 70B isn't online yet, run the same call with `meta-llama/Llama-3.1-8B-Instruct` to confirm the API works, and check 70B status with the instructor.

You should also be able to say why the 8B is the autocomplete model and the 70B does everything else.

---

**Next up:** [04-install-and-configure-continue.md](04-install-and-configure-continue.md) — Wire Continue.dev to the vLLM endpoint
