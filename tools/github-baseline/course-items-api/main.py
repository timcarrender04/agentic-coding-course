from fastapi import FastAPI

from routers import items, users

app = FastAPI(title="Course Items API")

app.include_router(items.router)
app.include_router(users.router)


@app.get("/")
def read_root():
    return {"message": "Hello from the course items API"}
