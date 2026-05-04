# Lesson 03: Hello World

**By the end, you will have a running FastAPI server that you can hit from curl and from a browser, with hot-reload turned on.**

⏱ ~20 minutes of typing

> This is the "it's alive" lesson. Type slowly. Run the server after each meaningful change. The dopamine hit of seeing your code respond to a real HTTP request is the entire point.

---

**1.** Make sure you're in the project directory and venv is active.
```bash
cd ~/docker-course/fastapi-app
source .venv/bin/activate
```

**2.** Create an empty `main.py` file.
```bash
touch main.py
```

**3.** Open `main.py` in Cursor. From the terminal:
```bash
code main.py
```
(If `code` doesn't work, click `main.py` in Cursor's file explorer.)

**4.** Type the import line at the top.
```python
from fastapi import FastAPI
```

**5.** Save (Ctrl+S). Then go back to the terminal and confirm Python can import the file with no errors.
```bash
python -c "import main"
```
(No output = no errors. If you see `ModuleNotFoundError: No module named 'fastapi'`, your venv isn't active.)

**6.** Add an empty line, then create the app instance. Type this into `main.py`:
```python
app = FastAPI()
```

**7.** Save. Confirm the file looks like this.
```bash
cat main.py
```
```
from fastapi import FastAPI

app = FastAPI()
```

**8.** Add the first route. Type these four lines after `app = FastAPI()`:
```python


@app.get("/")
def read_root():
    return {"hello": "world"}
```

**9.** Save. Confirm.
```bash
cat main.py
```
```
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"hello": "world"}
```

**10.** Run the server with hot-reload.
```bash
uvicorn main:app --reload
```
You should see:
```
INFO:     Will watch for changes in these directories: [...]
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [...]
INFO:     Started server process [...]
INFO:     Application startup complete.
```

**11.** **Leave that terminal running.** Open a **second** integrated terminal in Cursor (the `+` button at the top-right of the terminal panel, or the dropdown). In the new terminal, hit your server.
```bash
curl http://localhost:8000
```
```
{"hello":"world"}
```

**12.** Hit it again, asking for a verbose response so you can see the headers.
```bash
curl -i http://localhost:8000
```
```
HTTP/1.1 200 OK
date: ...
server: uvicorn
content-length: 17
content-type: application/json

{"hello":"world"}
```

**13.** Open a browser and visit `http://localhost:8000`.

   - **WSL students:** Windows browser, `http://localhost:8000`.
   - **SSH students:** look at Cursor's "Ports" tab in the bottom panel — port 8000 should be auto-forwarded. Click the globe icon to open in your local browser.

You should see `{"hello":"world"}`.

**14.** Now visit `http://localhost:8000/docs` in the browser. **This is the FastAPI superpower.** You should see a Swagger UI page listing your `GET /` route.

**15.** Click on the `GET /` row → click the **"Try it out"** button → click **"Execute"**. Look at the response — same `{"hello":"world"}` you got from curl.

**16.** Now feel the hot-reload. Go back to `main.py` and change the response to:
```python
    return {"hello": "fastapi"}
```

**17.** Save. Watch your first terminal — you should see uvicorn say:
```
WARNING:  WatchFiles detected changes in 'main.py'. Reloading...
INFO:     Application startup complete.
```

**18.** Curl it again — no need to restart anything.
```bash
curl http://localhost:8000
```
```
{"hello":"fastapi"}
```

**19.** Refresh the browser at `/` — same change.

**20.** Stop the server. In the first terminal, press **Ctrl+C**.
```
INFO:     Shutting down
INFO:     Application shutdown complete.
```

**21.** Restart it.
```bash
uvicorn main:app --reload
```

**22.** Log it.
```bash
echo "FastAPI hello-world running on port 8000" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **`uvicorn main:app --reload`** — `main` is the file (without `.py`), `app` is the variable inside it. If you renamed the file to `app.py`, you'd run `uvicorn app:app --reload`.
- Without `--reload`, you'd have to stop and restart the server after every change. **Always use `--reload` during development.**
- "Address already in use" → another `uvicorn` is still running somewhere. `pkill uvicorn` or `lsof -i :8000` to find and kill it.
- Indentation matters in Python. The body of `read_root` must be indented 4 spaces (Cursor does this for you).

---

## Checkpoint

```bash
curl http://localhost:8000
```
You should see `{"hello":"fastapi"}` (or `world` if you didn't change it back — either is fine).

In the browser at `http://localhost:8000/docs`, you should see Swagger UI listing one route: `GET /`.

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000
```
You should see `200`.

```bash
cat main.py | wc -l
```
You should see at least 7 lines.

---

**Next up:** [04-path-and-query-params.md](04-path-and-query-params.md) — Add routes that take parameters
