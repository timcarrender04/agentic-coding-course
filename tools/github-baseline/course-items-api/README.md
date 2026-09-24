# course-items-api

The course FastAPI project — a small items API, exactly at the state you built it by the end of Module 03's router lessons. This is the **fallback starter** for Module 04 (git): if your own `~/docker-course/fastapi-app` is broken, click **Use this template** on GitHub, create your own public copy, and do the git module on that.

## Run it

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Then open http://localhost:8000/docs

## Routes

| Method | Path | What it does |
|---|---|---|
| GET | `/` | Hello message |
| GET | `/items` | List all items |
| GET | `/items/{item_id}` | One item by id (404 if missing) |
| POST | `/items` | Add an item (JSON body) |
| GET | `/users` | List demo users |

## Docker

```bash
docker build -t course-items-api .
docker run -d -p 8000:8000 course-items-api
```
