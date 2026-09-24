# Solution: Lesson 02 — Installing FastAPI

## Project state

```
~/docker-course/fastapi-app/
├── .gitignore
├── .venv/
└── requirements.txt
```

## File contents

### `requirements.txt`

Versions will vary depending on when you ran `pip install`. A representative `pip freeze`:

```
annotated-types==0.6.0
anyio==4.3.0
click==8.1.7
fastapi==0.110.0
h11==0.14.0
httptools==0.6.1
idna==3.6
pydantic==2.6.4
pydantic_core==2.16.3
python-dotenv==1.0.1
PyYAML==6.0.1
sniffio==1.3.1
starlette==0.36.3
typing_extensions==4.10.0
uvicorn==0.29.0
uvloop==0.19.0
watchfiles==0.21.0
websockets==12.0
```

The exact version pins on `fastapi` and `uvicorn` are what matter — the rest are transitive.

## Expected terminal state

```
(.venv) $ pip show fastapi | head -n 3
Name: fastapi
Version: 0.110.0
Summary: FastAPI framework, ...

(.venv) $ python -c "import fastapi; print(fastapi.__version__)"
0.110.0
```

## If you got lost

```bash
cd ~/docker-course/fastapi-app
source .venv/bin/activate
pip install --upgrade pip
pip install fastapi "uvicorn[standard]"
pip freeze > requirements.txt
```
