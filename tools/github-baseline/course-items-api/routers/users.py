from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])

users = [
    {"id": 1, "username": "ada"},
    {"id": 2, "username": "linus"},
]


@router.get("")
def list_users():
    return users
