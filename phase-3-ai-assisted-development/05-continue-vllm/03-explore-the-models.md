# Lesson 03: Pull and Test Models

**By the end, you will have two models pulled — a 7B coding model for chat/edit, and a 1.5B base model for autocomplete — and you will have chatted with both from the command line.**

⏱ ~20 minutes of typing (mostly waiting for downloads)

> **Two models, two roles.** Big models (7B+) are smart but slow — perfect for chat where you wait a few seconds for an answer. Small base models (1.5B) are fast but limited — perfect for tab autocomplete where you need a suggestion in milliseconds.

```instructor
Say: "Two models, two roles. The 7B coding model for chat/edit (smart but slow). The 1.5B base model for autocomplete (fast but limited). We pull both today."
Mention: "Pulls are 4-5 GB each. If a model OOMs with 'cudaMalloc failed', they don't have enough VRAM for the 7B — fall back to 3b or 1.5b chat. Lesson lists alternatives by VRAM tier."
Pause: While the 7B pulls (~5 minutes on a fast network). Use the wait — explain why two models, why coding-tuned, why parameters and quantization matter. Real Q&A, not a lecture.
Say: "You're done when `docker compose exec -T ollama ollama list` shows BOTH models AND a one-shot prompt to each returns a coherent response."
```

All **Ollama CLI** commands run **inside the container** from lesson 02. Open a terminal and use `~/docker-course/ollama` as the working directory:

```bash
cd ~/docker-course/ollama
```

Then use either:

- **Non-interactive:** `docker compose exec -T ollama ollama <subcommand> …`
- **Interactive chat:** `docker compose exec -it ollama ollama run <model>`

(`-T` avoids “the input device is not a TTY” errors for scripted pulls; `-it` is required for the REPL.)

---

## Pick model sizes by VRAM

Look at your VRAM from lesson 01:

| VRAM | Chat model | Autocomplete model |
|---|---|---|
| 8 GB+ | `qwen2.5-coder:7b` (Q4, ~4.7 GB) | `qwen2.5-coder:1.5b-base` (~1 GB) |
| 6 GB | `qwen2.5-coder:3b` (~2 GB) | `qwen2.5-coder:1.5b-base` |
| 4 GB | `qwen2.5-coder:1.5b` | (skip autocomplete) |
| 16 GB+ | `qwen2.5-coder:14b` (Q4, ~9 GB) | `qwen2.5-coder:1.5b-base` |

The lessons assume the **8 GB+** row. If you have less, substitute the size in every command.

---

**1.** Pull the chat model (this takes a few minutes — it's ~4.7 GB).
```bash
cd ~/docker-course/ollama
docker compose exec -T ollama ollama pull qwen2.5-coder:7b
```
You'll see progress per layer:
```
pulling manifest
pulling abc1234... 100% ▕████████████████▏ 4.7 GB
pulling def5678... 100% ▕████████████████▏  ...
verifying sha256 digest
writing manifest
removing any unused layers
success
```

**2.** Pull the autocomplete model (smaller, faster).
```bash
docker compose exec -T ollama ollama pull qwen2.5-coder:1.5b-base
```

> **Why `:1.5b-base` and not `:1.5b`?** The non-base (instruct) variant is fine-tuned for chat. The **base** variant does **fill-in-the-middle (FIM)** completion — taking code with a hole in it and predicting what goes in the hole. That's exactly what tab autocomplete needs.

**3.** List your models.
```bash
docker compose exec -T ollama ollama list
```
```
NAME                         SIZE    MODIFIED
qwen2.5-coder:7b             4.7 GB  X minutes ago
qwen2.5-coder:1.5b-base      1.0 GB  X minutes ago
```

**4.** Talk to the chat model from the command line.
```bash
docker compose exec -it ollama ollama run qwen2.5-coder:7b
```
The CLI drops into a chat prompt:
```
>>> Send a message (/? for help)
```

**5.** Ask it something coding-flavored.
```
>>> What does the FastAPI Depends() function do in one sentence?
```
You should see a multi-second pause (model loading + generation), then a streaming response. That's the model running on your GPU (inside Docker).

**6.** Ask a follow-up to feel the conversation memory.
```
>>> Show me a tiny example.
```

**7.** Watch GPU usage in another terminal. Open a second integrated terminal in Cursor and run:
```bash
watch -n 1 nvidia-smi
```
Submit another question to the chat. You should see VRAM usage and GPU utilization spike on the **host** — the container uses the GPU through the NVIDIA runtime. **That's your model running locally.**

**8.** Exit the chat.
```
>>> /bye
```

**9.** Confirm the model unloaded (Ollama unloads after ~5 min idle by default).
```bash
docker compose exec -T ollama ollama ps
```
```
NAME                ID        SIZE    PROCESSOR    UNTIL
qwen2.5-coder:7b    abc1234   5.5 GB  100% GPU     4 minutes from now
```
(If you just sent a message, it'll still be loaded. Wait 5 min and re-run to see it gone.)

**10.** Try the autocomplete model briefly. The base model isn't conversational — it'll just continue the text you give it.
```bash
docker compose exec -it ollama ollama run qwen2.5-coder:1.5b-base
```
```
>>> def fib(n):
```
You should see something like:
```
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
```
The model "completed" the function. That's FIM in action. Exit with `/bye`.

**11.** Test the API directly (from the host — same as before).
```bash
curl -s http://localhost:11434/api/generate -d '{
  "model": "qwen2.5-coder:7b",
  "prompt": "Write a one-line FastAPI route returning {\"ok\": true}",
  "stream": false
}' | python3 -c "import sys,json; print(json.load(sys.stdin)['response'])"
```
You should see Python code printed. This is the API Continue.dev will use.

**12.** Log it.
```bash
echo "Models pulled: $(cd ~/docker-course/ollama && docker compose exec -T ollama ollama list | tail -n +2 | awk '{print $1}' | tr '\n' ' ')" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **First chat is slow.** Expect 5–15 seconds before the first token streams. After that, generation is fast. Don't conclude the GPU isn't working until you've waited.
- **Disk usage.** Each pulled model can be 1–10 GB. Data lives in the Docker volume `ollama_data` (see lesson 02). `docker compose exec -T ollama ollama list` to see tags; `docker compose exec -T ollama ollama rm <model>` to delete.
- **`base` vs instruct.** Don't use the instruct model (`:1.5b`) for autocomplete or the base model (`:1.5b-base`) for chat. Roles in lesson 04 separate them.
- **Quantization.** Ollama tags like `:7b` default to a 4-bit quantization. That's the right tradeoff for desktop GPUs. `:7b-fp16` would be the full-precision version (~14 GB) — only worth it on very large GPUs.
- **Stack must be up.** If `docker compose exec` errors with "service not running," run `cd ~/docker-course/ollama && docker compose up -d`.

---

## Checkpoint

```bash
cd ~/docker-course/ollama && docker compose exec -T ollama ollama list | grep qwen
```
Should print two lines (chat + autocomplete models).

```bash
cd ~/docker-course/ollama && docker compose exec -T ollama ollama run qwen2.5-coder:7b "What is 2+2? One word answer." 2>/dev/null | head -n 1
```
Should print `4` (or `Four.`).

```bash
nvidia-smi --query-gpu=memory.used --format=csv,noheader
```
After running the previous command, should show non-zero VRAM used.

---

**Next up:** [04-install-and-configure-continue.md](04-install-and-configure-continue.md) — Wire Continue.dev to Ollama
