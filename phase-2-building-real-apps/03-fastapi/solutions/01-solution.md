# Solution: Lesson 01 — Python Virtual Environment

## Project state

```
~/docker-course/fastapi-app/
├── .gitignore
└── .venv/         (the venv — many files, do not edit by hand)
```

## File contents

### `.gitignore`

```
.venv/
```

## Expected terminal state

The shell prompt should show `(.venv)` prefix:

```
(.venv) you@host:~/docker-course/fastapi-app$
```

`which python` and `which pip` should both point inside `.venv`:

```
(.venv) $ which python
/home/you/docker-course/fastapi-app/.venv/bin/python

(.venv) $ which pip
/home/you/docker-course/fastapi-app/.venv/bin/pip
```

`echo $VIRTUAL_ENV` should print the venv path.

## If you got lost

```bash
cd ~/docker-course
rm -rf fastapi-app
mkdir fastapi-app && cd fastapi-app
python3 -m venv .venv
source .venv/bin/activate
echo ".venv/" > .gitignore
```
