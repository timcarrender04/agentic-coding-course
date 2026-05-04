# Solution: Lesson 08 — Containerizing FastAPI

## Project state

```
~/docker-course/fastapi-app/
├── .dockerignore       ← new
├── .gitignore
├── .venv/
├── Dockerfile          ← new
├── dependencies.py
├── main.py
├── requirements.txt
└── routers/
    ├── __init__.py
    ├── items.py
    └── users.py
```

## File contents

### `Dockerfile`

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### `.dockerignore`

```
.venv/
__pycache__/
*.pyc
.git/
.gitignore
Dockerfile
.dockerignore
```

## Expected commands and outputs

```
$ docker build -t fastapi-app .
[+] Building 12.3s (10/10) FINISHED
 => => naming to docker.io/library/fastapi-app

$ docker images | grep fastapi-app
fastapi-app   latest   abc123...   30 seconds ago   180MB

$ docker run -d -p 8000:8000 --name fastapi-app fastapi-app
abc123def456...

$ curl http://localhost:8000
{"hello":"fastapi"}

$ curl http://localhost:8000/items/me/protected -H "X-Token: secret-token"
{"message":"Hello admin, you reached a protected route"}
```

## Cleanup at end of lesson

The container is stopped and removed; the image stays:

```
$ docker ps -a --filter name=fastapi-app
(empty)

$ docker images | grep fastapi-app
fastapi-app   latest   ...
```

## Common rebuild after code change

```
docker stop fastapi-app
docker rm fastapi-app
docker build -t fastapi-app .
docker run -d -p 8000:8000 --name fastapi-app fastapi-app
```

This pain is what motivates lesson 09's bind-mount-and-Compose setup.
