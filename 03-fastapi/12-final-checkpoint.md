# Lesson 12: Final Checkpoint

**Time:** ~30 min — **no instructor help, no peeking at solutions** until you've tried.

This is the cumulative test. You'll add a real, working resource to your app from memory using only the patterns from this module: venv, FastAPI, Pydantic, routers, dependencies, Docker Compose, Postgres, SQLAlchemy, and proper status codes.

If you get stuck on a step, reread the relevant earlier lesson — but **don't** open `solutions/12-solution.md` until you've finished or genuinely can't move forward.

---

## The spec

Extend the existing app with a fully-functional `Profile` resource. Treat this like a real backend ticket.

**Model:** `profiles` table with these columns:
- `id` — int, primary key, auto-increment
- `email` — string, required, unique
- `display_name` — string, required
- `created_at` — timestamp, defaults to now

**Routes:** all under `/profiles`, mounted via a router in `routers/profiles.py`:

| Method | Path | Status code | Behavior |
|---|---|---|---|
| `POST` | `/profiles` | 201 | Create a profile from `{email, display_name}`. Reject duplicate email with 409. Reject empty `display_name` with 400. |
| `GET` | `/profiles/{id}` | 200 | Return the profile. 404 if not found. |
| `DELETE` | `/profiles/{id}` | 204 | Delete the profile. 404 if not found. **Protected** — requires `X-Token: secret-token` (use the dependency from lesson 07). GET and POST are unprotected. |

**Output schema:** the response should always include `id`, `email`, `display_name`, `created_at` (ISO 8601). Never the password (there isn't one — just a reminder that response models hide internal fields).

---

## Suggested order of attack

1. Add the SQLAlchemy model to `models.py` (look at `Item` for the shape; use `DateTime` and `func.now()` for `created_at`).
2. Restart the api so `Base.metadata.create_all` picks up the new table. Verify with `\dt` in psql.
3. Create `routers/profiles.py`. Pattern after `routers/items.py` (after lesson 11). Two Pydantic models: `ProfileIn` and `ProfileOut`.
4. Mount the router in `main.py` with `app.include_router(profiles.router)`.
5. Apply `Depends(get_current_user)` only to the DELETE route, not to the router.
6. For the duplicate-email check, query the DB before inserting — if `db.query(Profile).filter(Profile.email == ...).first()` returns something, raise 409.
7. For the empty-`display_name` check, validate in the route handler (or use a Pydantic validator).
8. Test every path with curl and with Swagger.

---

## The acceptance test (run when you think you're done)

These commands must all behave exactly as described. **Don't move on if any fail.**

**1.** POST a valid profile.
```bash
curl -i -X POST http://localhost:8000/profiles \
  -H "Content-Type: application/json" \
  -d '{"email":"a@example.com","display_name":"Alice"}'
```
Expected: `201 Created`. Response body has `id`, `email`, `display_name`, `created_at`.

**2.** POST the same email again.
```bash
curl -i -X POST http://localhost:8000/profiles \
  -H "Content-Type: application/json" \
  -d '{"email":"a@example.com","display_name":"Alice2"}'
```
Expected: `409 Conflict`.

**3.** POST with empty display_name.
```bash
curl -i -X POST http://localhost:8000/profiles \
  -H "Content-Type: application/json" \
  -d '{"email":"b@example.com","display_name":""}'
```
Expected: `400 Bad Request`.

**4.** GET the existing profile (use the id from step 1).
```bash
curl -i http://localhost:8000/profiles/1
```
Expected: `200 OK` with the profile.

**5.** GET a non-existent profile.
```bash
curl -i http://localhost:8000/profiles/999999
```
Expected: `404 Not Found`.

**6.** DELETE without the auth header.
```bash
curl -i -X DELETE http://localhost:8000/profiles/1
```
Expected: `422 Unprocessable Entity` (header missing — Pydantic-level rejection from the dependency).

**7.** DELETE with the wrong token.
```bash
curl -i -X DELETE http://localhost:8000/profiles/1 -H "X-Token: nope"
```
Expected: `401 Unauthorized`.

**8.** DELETE with the right token.
```bash
curl -i -X DELETE http://localhost:8000/profiles/1 -H "X-Token: secret-token"
```
Expected: `204 No Content`.

**9.** GET that deleted profile.
```bash
curl -i http://localhost:8000/profiles/1
```
Expected: `404 Not Found`.

**10.** Look at the database directly to confirm the table exists and the row is gone.
```bash
docker compose exec db psql -U postgres -d appdb -c "\d profiles"
docker compose exec db psql -U postgres -d appdb -c "SELECT * FROM profiles;"
```
Expected: schema printout, then a result that does not contain the deleted row.

---

## Final submission

When all 10 acceptance steps pass:

1. Take a screenshot of your terminal showing the output of the full acceptance test (or at least steps 1, 2, 4, 5, 7, 8, 9).
2. Show your `/docs` page — Swagger should now display three sections: **items**, **users**, and **profiles**.
3. Submit the screenshot to the instructor.

Then:
```bash
echo "Module 03 final checkpoint: passed $(date -Iseconds)" >> ~/docker-course/notes/notes.txt
```

---

## What you should be able to do now

You built a real backend. Reflect for a minute on what's in `~/docker-course/fastapi-app/`:

- A Python project with a venv, dependency-pinned via `requirements.txt`
- A FastAPI app with three resources, each in its own router
- Pydantic input + output models with type-driven validation
- A reusable auth dependency
- A Dockerfile that packages the whole thing
- A Compose stack with Postgres and a healthcheck
- SQLAlchemy ORM models persisted to a real database
- Proper HTTP status codes and error handling
- Auto-generated Swagger docs at `/docs`

That's the shape of every real Python backend service. The same patterns scale to thousands of routes.

---

## What's next

Module 04 picks up from here — your FastAPI app becomes the codebase for AI-assisted refactoring, testing, and agent integration. Don't delete `~/docker-course/fastapi-app/`.
