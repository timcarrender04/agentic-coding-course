# Instructor Notes — Module 05: Continue.dev + Shared vLLM Endpoint

## TODO before class

- [ ] **Confirm the shared endpoint is up** and reachable from the classroom network **the day before**. From a student-like machine: `curl -s http://gpu.college.local:8000/v1/models -H "Authorization: Bearer sk-college-shared"` should list the models. If you're using a Tailscale IP instead of `gpu.college.local`, hand out the exact IP.
- [ ] **Confirm which models are live.** The **Llama 3.1 8B** (autocomplete) should be up. The **Llama 3.3 70B** (chat/edit/agent) is "coming online" — if it isn't loaded yet, tell students in lesson 03/05 and have them verify the 8B works so the API path is proven. The `vllm/docker-compose.yml` in this folder is the server reference (TP=2, quantized 70B); it is **not** something students run.
- [ ] **Distribute the shared key** (`sk-college-shared`) — or confirm the endpoint is open on the campus network and no key is needed. Decide one way and make the lessons match.
- [ ] **Network access for off-campus students.** If anyone joins remotely, make sure Tailscale/VPN gets them to the endpoint. A student who can't reach the box can't do any of Module 05 — sort this before class.
- [ ] **Verify your own Continue setup end to end.** Continue's config schema has changed several times; make sure the `config.yaml` in lesson 04 (provider `openai`, `apiBase` at the college endpoint, the two Llama models with roles) still works on the latest extension version.
- [ ] **Watch the shared-load story.** One box, whole cohort. During peak lab moments the 70B will feel slower. Set expectations; it's contention, not breakage.

## General Tips

- **Latency is shared, not local.** First 70B response takes a few seconds and gets slower when the whole class prompts at once. If a student says "it feels slow," that's usually contention on the shared box, not a broken setup. The 8B autocomplete stays fast.
- **Context windows matter.** Llama 3.3 70B has a large context window, but it's still finite and the endpoint is shared — big prompts cost everyone latency. Tell students to keep `@codebase` for "find me where X happens" questions, not "rewrite all of X."
- **Hallucinations on open models are real.** Llama 3.3 70B is capable but not a frontier cloud model. It will sometimes invent function names. Drill students to **read every diff** before accepting it — Continue makes you accept changes explicitly anyway.
- **The agent mode lesson (08) is where students fall in love with this.** Make sure session 2 has time for it. It's also where things break — agent mode plus an open model can lead to sad loops. Lesson 08 calls out the failure modes.
- **No local GPU story this year.** There is nothing to install on student machines beyond VS Code + Continue. If a student is fiddling with drivers or CUDA, redirect them — the model runs on the college server.

## Where Students Get Stuck (in priority order)

### #1 — Can't reach the endpoint (`000` / connection refused / timeout)
- This is a **network** problem, not a model or driver problem.
- **On campus:** confirm they're actually on the campus LAN, not a phone hotspot.
- **Off campus:** Tailscale/VPN isn't connected. Start it, retry `curl -s -o /dev/null -w "%{http_code}\n" http://gpu.college.local:8000/v1/models`.
- If the whole class fails at once, the **endpoint itself is down** — check the server before blaming student setups.

### #2 — `401 Unauthorized`
- Symptom: `curl` returns 401, or Continue chat errors immediately with "Failed to fetch."
- Cause: shared key wrong or missing.
- Fix: confirm `Authorization: Bearer sk-college-shared` in curl, and `apiKey: sk-college-shared` in `~/.continue/config.yaml`. If the endpoint is open (no key), make sure they didn't send a wrong one that the server rejects.

### #3 — Continue can't reach the endpoint
- Symptom: chat returns "Failed to fetch" or a connection error, but curl from the terminal works.
- Causes: wrong `apiBase` (missing `/v1`, or `https` instead of `http`); config edited on the wrong machine in a Remote-SSH/WSL session.
- Fix: on the machine where the **Continue extension host** runs, the lesson 02 curl must succeed. In Remote-SSH sessions, `~/.continue/config.yaml` lives on the remote — edit it there.

### #4 — Wrong model role assignments in Continue config
- Symptom: autocomplete is using the 70B (every keystroke lags), or chat is using the 8B (weaker answers).
- Fix: lesson 04 walks through `roles:` — chat/edit/apply on the 70B, autocomplete on the 8B. Mismatched roles is the most common config error.

### #5 — Tab autocomplete not appearing
- Symptom: typing in a `.py` file produces no ghost-text suggestions.
- Causes: extension disabled for the file type, autocomplete role not assigned to the 8B, wrong model id, or another extension stealing the shortcut.
- Fix: open the Continue panel, look for errors at the bottom. Re-run lesson 02's `/v1/models` curl to confirm `meta-llama/Llama-3.1-8B-Instruct` is served, and check the `roles: [autocomplete]` block.

### #6 — 70B `model not found` / `404`
- Symptom: chat/edit against the 70B errors with "model not found."
- Cause: the 70B is still coming online (mid-migration) or the server unloaded it.
- Fix: confirm the 70B is loaded on the server; in the meantime the 8B proves the API path works. This is a **server** state, not a student config issue.

### #7 — Agent mode runs the wrong commands
- Symptom: agent mode tries to `rm -rf` something, or runs commands in the wrong directory.
- Fix: Continue's agent mode requires you to **approve each tool call**. Tell students to read the prompt before clicking "Run." Lesson 08 makes this an explicit drill.

## Common Error Messages Cheat Sheet

| Error | Cause | Fix |
|---|---|---|
| `000` / timeout from `curl .../v1/models` | can't reach the endpoint | network — campus LAN / Tailscale (lesson 01) |
| `401 Unauthorized` | shared key wrong/missing | check `Authorization` header + `apiKey` in config |
| `404` on `/models` or `/chat/completions` | dropped `/v1` from base URL | base URL ends in `/v1` |
| `model not found` for the 70B | 70B not loaded yet | server state — confirm 70B is online; use 8B meanwhile |
| `Failed to fetch` in Continue | Continue can't reach endpoint | curl must work from the extension-host machine; check `apiBase` |
| `Continue: configuration not loaded` | YAML syntax error | check indentation (2 spaces, no tabs), rerun |
| Tab autocomplete missing | model role wrong, extension disabled | check Continue panel + `roles: [autocomplete]` on the 8B |

## Suggested Schedule (2 × 2-hour sessions)

| Session | Lessons | Notes |
|---|---|---|
| 1 (S10) | 00 – 04 | Endpoint understood, connection proven with curl, models explored, Continue installed and chatting. End with first successful chat through the IDE. |
| 2 (S11) | 05 – 09 | Drill the four agentic features. Final checkpoint is a small feature shipped through agent mode + a GitHub PR (calls back to Module 04). |

## Q&A Pause Points

- After lesson 01 (what the shared box is — head off "where's my GPU?" confusion)
- After lesson 04 (first chat through the IDE — celebrate the moment, then take questions)
- After lesson 06 (autocomplete is the most subtle to "get")
- After lesson 08 (agent mode is wow + scary; let them ask)
- After lesson 09 (wrap-up, preview Module 06)
