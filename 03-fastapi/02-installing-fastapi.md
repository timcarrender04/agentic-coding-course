# Lesson 02: Installing FastAPI

**By the end, you will have FastAPI and Uvicorn installed in your venv, and a `requirements.txt` file pinning your dependencies.**

⏱ ~10 minutes of typing

---

**1.** Make sure you're in the project directory and the venv is active. Look for `(.venv)` in your prompt.
```bash
cd ~/docker-course/fastapi-app
source .venv/bin/activate
```

**2.** Confirm pip points to the venv.
```bash
which pip
```
```
/home/your-user/docker-course/fastapi-app/.venv/bin/pip
```

**3.** Upgrade pip itself first.
```bash
pip install --upgrade pip
```

**4.** Install FastAPI and Uvicorn (the ASGI server FastAPI runs on). The `[standard]` adds extras like the watchfiles reloader.
```bash
pip install fastapi "uvicorn[standard]"
```
(You'll see several packages download.)

**5.** Confirm FastAPI is installed.
```bash
pip show fastapi | head -n 3
```
```
Name: fastapi
Version: 0.110.0
Summary: FastAPI framework, high performance, easy to learn, fast to code, ready for production
```
(Version will vary.)

**6.** Confirm Uvicorn is installed.
```bash
pip show uvicorn | head -n 3
```
```
Name: uvicorn
Version: 0.29.0
...
```

**7.** See the full list of installed packages.
```bash
pip list
```
You'll see fastapi, uvicorn, and a dozen transitive dependencies (pydantic, starlette, etc.).

**8.** Save those exact versions to a `requirements.txt`. This is how you make a project reproducible.
```bash
pip freeze > requirements.txt
```

**9.** Read the file you just created.
```bash
cat requirements.txt
```
You should see lines like `fastapi==0.110.0`, `pydantic==2.6.4`, `uvicorn==0.29.0`, etc. Each package pinned to an exact version.

**10.** Count how many packages got installed.
```bash
wc -l requirements.txt
```
```
20 requirements.txt
```
(Number will vary, usually 15-25.)

**11.** Log it.
```bash
echo "FastAPI installed: $(pip show fastapi | grep Version)" >> ~/docker-course/notes/notes.txt
```

---

## ⚠️ Watch out

- If pip says `Defaulting to user installation because normal site-packages is not writeable`, your venv is **not** active. Stop, run `source .venv/bin/activate`, and try again.
- Do not commit `.venv/` to git — that's why you wrote `.venv/` to `.gitignore` in lesson 01. Only `requirements.txt` should be committed.

---

## Checkpoint

```bash
pip show fastapi | head -n 1
```
You should see `Name: fastapi`.

```bash
ls requirements.txt
```
You should see the path printed (no error).

```bash
grep fastapi requirements.txt
```
You should see a line like `fastapi==0.110.0`.

```bash
python -c "import fastapi; print(fastapi.__version__)"
```
You should see a version number.

---

**Next up:** [03-hello-world.md](03-hello-world.md) — Write your first FastAPI app
