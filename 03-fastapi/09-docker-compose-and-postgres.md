# Lesson 09: Docker Compose and Postgres

**By the end, you will have a `docker-compose.yml` defining two services — your FastAPI app and a Postgres database — running side by side, with hot-reload mounted in.**

⏱ ~40 minutes of typing (this lesson runs long — it's normal)

> Compose is YAML that orchestrates multiple containers. You declare services, volumes, networks; one `docker compose up` and Compose does the wiring.

```instructor
Say: "Compose orchestrates multiple containers from one YAML file. Today: FastAPI service plus Postgres, talking over a Compose network."
Mention: "From inside FastAPI, the Postgres host is `db` (the service name) — NOT `localhost`. Wrong host is the #1 connection-string mistake. Drill it before they write the connection string."
Pause: After `docker compose up`. Wait until both services are healthy before they curl. Compose starts services in order but does NOT wait for them to be ready — they'll see connection errors otherwise.
Say: "You're done when both containers run, FastAPI hot-reloads on code edits, and `docker compose logs db` shows Postgres ready to accept connections."
```

---

**1.** Make sure you're in the project directory and any leftover container from lesson 08 is removed.
```bash
cd ~/docker-course/fastapi-app
docker ps -a --filter name=fastapi-app -q | xargs -r docker rm -f
```

**2.** Create `docker-compose.yml`.
```bash
touch docker-compose.yml
```

**3.** Open it in Cursor.

**4.** Type the top-level structure. Compose YAML is indentation-sensitive (2 spaces, no tabs).
```yaml
services:
  api:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ./:/app
    environment:
      DATABASE_URL: postgresql://postgres:devpass@db:5432/appdb
    depends_on:
      db:
        condition: service_healthy
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: devpass
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

**5.** Save. Read it back.
```bash
cat docker-compose.yml
```

**6.** **Read each block aloud** before starting:
   - `api` — built from your Dockerfile, port 8000 mapped, code mounted as a bind volume, env var pointing at the db service, waits for db to be healthy, runs uvicorn with reload.
   - `db` — official postgres image, password baked in for dev, data persisted in a named volume `pgdata`, port 5432 mapped (for tools), healthcheck so api waits.
   - `volumes:` — declares the named volume Postgres uses.

**7.** Bring up the stack. The `-d` runs detached; without it the logs of both containers stream together.
```bash
docker compose up -d
```
You'll see `Creating network ...`, `Creating volume ...`, `Creating fastapi-app-db-1`, `Creating fastapi-app-api-1`.

**8.** List the services.
```bash
docker compose ps
```
You should see two services, both `Up`. The `db` service should show `(healthy)` after a few seconds.

**9.** Tail the api logs.
```bash
docker compose logs api
```
You should see uvicorn's startup banner.

**10.** Hit the api.
```bash
curl http://localhost:8000
```
```
{"hello":"fastapi"}
```

**11.** Hit `/items`.
```bash
curl http://localhost:8000/items
```
```
[]
```

**12.** Now feel the **bind-mount hot reload**. Edit `main.py`, change `read_root` to:
```python
    return {"hello": "from-compose"}
```

**13.** Save. Look at the api logs — uvicorn should reload because of the `--reload` flag and the volume mount.
```bash
docker compose logs api --tail=10
```
You should see `WatchFiles detected changes in 'main.py'. Reloading...`.

**14.** Curl.
```bash
curl http://localhost:8000
```
```
{"hello":"from-compose"}
```
(Same dopamine loop as the venv version, now in Docker.)

**15.** Revert the change to `{"hello": "fastapi"}` and save.

**16.** Now poke at Postgres directly. Get a shell into the db container.
```bash
docker compose exec db psql -U postgres -d appdb
```
You should see the Postgres prompt:
```
psql (16.x)
appdb=#
```

**17.** List databases.
```sql
\l
```
You should see `appdb` in the list.

**18.** List tables — should be empty.
```sql
\dt
```
```
Did not find any relations.
```

**19.** Run a trivial query.
```sql
SELECT version();
```

**20.** Exit psql.
```sql
\q
```

**21.** Confirm the data volume exists separately from the container.
```bash
docker volume ls | grep pgdata
```
You should see your `fastapi-app_pgdata` volume.

**22.** Restart the db service — your data (well, the empty database) survives.
```bash
docker compose restart db
docker compose exec db psql -U postgres -d appdb -c "SELECT 1;"
```
```
 ?column?
----------
        1
```

**23.** Stop the stack.
```bash
docker compose down
```
```
Stopping fastapi-app-api-1 ... done
Stopping fastapi-app-db-1  ... done
Removing fastapi-app-api-1 ... done
Removing fastapi-app-db-1  ... done
Removing network fastapi-app_default
```
**Note:** `down` does **not** remove the named volume `pgdata`. To wipe data, use `docker compose down -v`.

**24.** Bring it back up.
```bash
docker compose up -d
```

**25.** Confirm the api is back up.
```bash
curl http://localhost:8000
```
```
{"hello":"fastapi"}
```

**26.** Add a `.env` file to keep the password out of the YAML. First, edit `docker-compose.yml` and replace the two `devpass` strings with `${POSTGRES_PASSWORD}` and the URL with `${DATABASE_URL}`. Add at the top of each service's environment list as needed. The relevant changes:

In the `api` service's `environment`:
```yaml
      DATABASE_URL: ${DATABASE_URL}
```

In the `db` service's `environment`:
```yaml
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
```

**27.** Create `.env` (Compose reads this automatically).
```bash
cat > .env <<'EOF'
POSTGRES_PASSWORD=devpass
DATABASE_URL=postgresql://postgres:devpass@db:5432/appdb
EOF
```

**28.** Add `.env` to `.gitignore` so secrets don't get committed.
```bash
echo ".env" >> .gitignore
```

**29.** Recreate the stack to pick up the env file.
```bash
docker compose up -d --force-recreate
```

**30.** Confirm everything still works.
```bash
curl http://localhost:8000
docker compose exec db psql -U postgres -d appdb -c "SELECT 1;"
```

**31.** Log it.
```bash
echo "Compose: api + postgres up, hot-reload via bind mount" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- **YAML indentation.** 2 spaces, never tabs. A misaligned key kills Compose with a cryptic error.
- **The hostname is `db`, not `localhost`.** From inside the api container, the postgres host is the **service name** in compose. Connection string: `postgresql://postgres:devpass@db:5432/appdb`. Beginners type `localhost` and spend 30 minutes debugging.
- **`depends_on: condition: service_healthy`** — this is what makes api wait until db is actually accepting connections, not just started. Without the healthcheck, api starts before postgres is ready and crashes on the first DB query.
- `docker compose down` keeps the volume. `docker compose down -v` wipes it (deletes all data). Be careful.
- The `--reload` flag plus the bind mount (`./:/app`) is what gives you hot-reload inside the container. If you leave either out, you lose the dev loop.

---

## Checkpoint

```bash
docker compose ps
```
Should show two services running, db `(healthy)`.

```bash
curl -s http://localhost:8000
```
Should print `{"hello":"fastapi"}`.

```bash
docker compose exec db psql -U postgres -d appdb -c "SELECT 1;"
```
Should print `1`.

```bash
docker compose logs api --tail=5
```
Should show recent uvicorn output.

```bash
docker volume ls | grep pgdata
```
Should show your named volume.

---

**Next up:** [10-database-with-sqlalchemy.md](10-database-with-sqlalchemy.md) — Connect FastAPI to Postgres with SQLAlchemy
