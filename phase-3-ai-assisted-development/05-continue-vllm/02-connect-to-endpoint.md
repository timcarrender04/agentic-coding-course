# Lesson 02: Connect to the Endpoint

**By the end, you will have queried the shared vLLM endpoint's `/v1/models` route with the shared key and confirmed both Llama models appear in the list.**

⏱ ~15 minutes of typing

> The endpoint speaks the **OpenAI-compatible** API. Before we wire up the editor, we prove the connection by hand with `curl` — list the models the server is serving, using the shared base URL and key. If `curl` can see the models, Continue.dev will too.

```instructor
Say: "The endpoint is OpenAI-compatible, so we can talk to it with plain curl before involving the editor. If curl lists the models, Continue will connect. If curl can't, no config in the world will fix Continue."
Mention: "Two failure shapes: connection refused/000 means network (Tailscale/LAN) — send them back to lesson 01. A 401 means the key is wrong or missing — check the Authorization header and the shared key value."
Pause: After `/v1/models` returns JSON. Read the `data[].id` values together — confirm they see the 8B and (if online) the 70B model ids. Those exact ids go into the config in lesson 04.
Say: "You're done when `curl .../v1/models` prints a JSON list containing meta-llama/Llama-3.1-8B-Instruct. That single response is the proof the connection works."
```

---

**1.** Make sure your venv from Module 03 is **not** active (clearer terminal output).
```bash
deactivate 2>/dev/null
```

**2.** Set the endpoint and shared key as shell variables so the rest of the lesson is copy-paste. (Substitute the Tailscale IP for `gpu.college.local` if that's what your instructor gave you.)
```bash
export VLLM_BASE=http://gpu.college.local:8000/v1
export VLLM_KEY=sk-college-shared
```

> If your instructor said **no key is required** on the campus network, you can leave `VLLM_KEY` set to anything — the server will ignore the `Authorization` header. Setting it does no harm.

**3.** List the models the endpoint is serving.
```bash
curl -s "$VLLM_BASE/models" -H "Authorization: Bearer $VLLM_KEY" | python3 -m json.tool
```

**4.** You should see an OpenAI-style response — an `object: "list"` with a `data` array of model records:
```json
{
    "object": "list",
    "data": [
        {
            "id": "meta-llama/Llama-3.1-8B-Instruct",
            "object": "model",
            "owned_by": "vllm"
        },
        {
            "id": "meta-llama/Llama-3.3-70B-Instruct",
            "object": "model",
            "owned_by": "vllm"
        }
    ]
}
```

**5.** Read the `id` fields — these are the **exact** model ids you'll put in your Continue config in lesson 04:
   - `meta-llama/Llama-3.1-8B-Instruct` — the **autocomplete** model (live now).
   - `meta-llama/Llama-3.3-70B-Instruct` — the **chat / edit / agent** model.

> The 70B is **coming online** (tensor-parallel across both A6000s). If it isn't in the list yet, you'll still see the 8B — that's enough to continue. Ask the instructor whether the 70B is up before lesson 05.

**6.** Pull just the ids out, to be sure (no eyeballing the whole blob):
```bash
curl -s "$VLLM_BASE/models" -H "Authorization: Bearer $VLLM_KEY" \
  | python3 -c "import sys,json; [print(m['id']) for m in json.load(sys.stdin)['data']]"
```
```
meta-llama/Llama-3.1-8B-Instruct
meta-llama/Llama-3.3-70B-Instruct
```

**7.** Log it.
```bash
echo "vLLM endpoint connected: $VLLM_BASE (models: $(curl -s "$VLLM_BASE/models" -H "Authorization: Bearer $VLLM_KEY" | python3 -c "import sys,json; print(', '.join(m['id'] for m in json.load(sys.stdin)['data']))"))" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`000` / connection refused / timeout** — you can't reach the box. This is a **network** problem, not a key problem. Confirm you're on the campus LAN or Tailscale (lesson 01), then retry.
- **`401 Unauthorized`** — the server wants the shared key and yours is wrong or missing. Check the `Authorization: Bearer $VLLM_KEY` header and confirm `VLLM_KEY` matches the value your instructor gave you (`sk-college-shared` by default).
- **`404` on `/models`** — you probably dropped the `/v1` from the base URL. The path is `http://gpu.college.local:8000/v1/models`.
- **Empty `data` array** — the server is up but no model is loaded yet (the 70B may still be warming up). The 8B should always be present; if even it is missing, ask the instructor.
- **Trailing slashes.** `$VLLM_BASE` should end in `/v1` with **no** trailing slash, so `$VLLM_BASE/models` becomes `.../v1/models`.

---

## Handy commands

| Task | Command |
|------|---------|
| List models | `curl -s "$VLLM_BASE/models" -H "Authorization: Bearer $VLLM_KEY"` |
| Just the ids | pipe the above through the `json` one-liner in step 6 |
| Check reachability only | `curl -s -o /dev/null -w "%{http_code}\n" "$VLLM_BASE/models"` |

---

## Checkpoint

```bash
curl -s "$VLLM_BASE/models" -H "Authorization: Bearer $VLLM_KEY" | grep -q "Llama-3.1-8B-Instruct" && echo "OK: endpoint serving models"
```
Should print `OK: endpoint serving models`.

In lesson 03 you will send an actual chat completion to the 70B model and see it generate — this lesson just proves the connection and lists what's available.

---

**Next up:** [03-explore-the-models.md](03-explore-the-models.md) — Send a test chat completion to the 70B model
