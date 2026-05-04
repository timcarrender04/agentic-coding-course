# Solution: Lesson 09 — Docker Compose and Postgres

## Project state

```
~/docker-course/fastapi-app/
├── .dockerignore
├── .env                ← new (and in .gitignore)
├── .gitignore          ← updated (added .env)
├── .venv/
├── docker-compose.yml  ← new
├── Dockerfile
├── dependencies.py
├── main.py
├── requirements.txt
└── routers/
    ├── __init__.py
    ├── items.py
    └── users.py
```

## File contents

### `docker-compose.yml`

```yaml
services:
  api:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ./:/app
    environment:
      DATABASE_URL: ${DATABASE_URL}
    depends_on:
      db:
        condition: service_healthy
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: appdb
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 2s
      timeout: 3s
      retries: 10

volumes:
  pgdata:
```

### `.env`

```
POSTGRES_PASSWORD=devpass
DATABASE_URL=postgresql://postgres:devpass@db:5432/appdb
```

### `.gitignore`

```
.venv/
.env
```

## Expected commands and outputs

```
$ docker compose up -d
[+] Running 4/4
 ✔ Network fastapi-app_default     Created
 ✔ Volume "fastapi-app_pgdata"     Created
 ✔ Container fastapi-app-db-1      Healthy
 ✔ Container fastapi-app-api-1     Started

$ docker compose ps
NAME                 IMAGE                 STATUS                  PORTS
fastapi-app-api-1    fastapi-app-api       Up X seconds            0.0.0.0:8000->8000/tcp
fastapi-app-db-1     postgres:16           Up X seconds (healthy)  0.0.0.0:5432->5432/tcp

$ curl http://localhost:8000
{"hello":"fastapi"}

$ docker compose exec db psql -U postgres -d appdb -c "SELECT 1;"
 ?column?
----------
        1
```

## Hot-reload check

After editing `main.py`, the api logs should show:

```
WARNING:  WatchFiles detected changes in 'main.py'. Reloading...
INFO:     Application startup complete.
```

## Cleanup commands

```bash
docker compose down       # stops services, keeps volume
docker compose down -v    # stops services AND deletes the data volume
```
