# Solution: Lesson 03 — Hello World

## Project state

```
~/docker-course/fastapi-app/
├── .gitignore
├── .venv/
├── main.py
└── requirements.txt
```

## File contents

### `main.py`

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"hello": "fastapi"}
```

(If you didn't change `world` to `fastapi` in step 16, that's fine — both pass the checkpoint.)

## Expected terminal output

```
(.venv) $ uvicorn main:app --reload
INFO:     Will watch for changes in these directories: ['/home/you/docker-course/fastapi-app']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [...]
INFO:     Started server process [...]
INFO:     Application startup complete.
```

In another terminal:

```
(.venv) $ curl http://localhost:8000
{"hello":"fastapi"}

(.venv) $ curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000
200
```

## Browser

`http://localhost:8000` shows `{"hello":"fastapi"}`.

`http://localhost:8000/docs` shows Swagger UI with one route: `GET /`.

## If you got lost

```bash
cd ~/docker-course/fastapi-app
source .venv/bin/activate
cat > main.py <<'EOF'
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"hello": "fastapi"}
EOF
uvicorn main:app --reload
```
