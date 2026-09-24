# API for the signup roster. Runs inside the `web` container only.
# Do not run this file with python/uvicorn on the host — Compose starts it.
import os
from contextlib import contextmanager
from pathlib import Path

import psycopg2
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

DATABASE_URL = os.environ["DATABASE_URL"]
UI_DIR = Path(__file__).resolve().parent / "ui"

app = FastAPI()


class SignupIn(BaseModel):
    name: str = Field(min_length=1)
    email: str = Field(min_length=1)


@contextmanager
def db():
    conn = psycopg2.connect(DATABASE_URL)
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


@app.get("/api/signups")
def list_signups():
    with db() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT name, email FROM signups ORDER BY id ASC")
            rows = [{"name": name, "email": email} for name, email in cur.fetchall()]
    return rows


@app.post("/api/signups", status_code=201)
def create_signup(body: SignupIn):
    name = body.name.strip()
    email = body.email.strip()
    if not name or not email:
        raise HTTPException(status_code=400, detail="name and email required")
    with db() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO signups (name, email) VALUES (%s, %s) RETURNING name, email",
                (name, email),
            )
            row = cur.fetchone()
    return {"name": row[0], "email": row[1]}


app.mount("/", StaticFiles(directory=str(UI_DIR), html=True), name="ui")
