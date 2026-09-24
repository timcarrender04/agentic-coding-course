# Lesson 06: Final Checkpoint

**Time:** ~15 min — **no instructor help.**

Self-test. Re-read earlier lessons if you forget something. Do not ask the instructor or your neighbor.

## The test

Type these commands. Each step assumes the prior step succeeded.

**1.** Confirm Docker is installed and you're in the docker group.
```bash
docker --version && groups | grep -q docker && echo "OK: docker group" || echo "FAIL: not in docker group"
```
Expected: a Docker version + `OK: docker group`.

**2.** Make sure no leftover containers are running.
```bash
docker ps -aq | xargs -r docker rm -f
```

**3.** Run nginx in detached mode on port 8080, named `final`.
```bash
docker run -d -p 8080:80 --name final nginx
```

**4.** Confirm it's running.
```bash
docker ps --filter name=final
```
Expected: one row with status `Up` and the port `0.0.0.0:8080->80/tcp`.

**5.** Hit it with curl.
```bash
curl -s http://localhost:8080 | grep -o "Welcome to nginx"
```
Expected: `Welcome to nginx`.

**6.** Look at the logs — they should show your curl request.
```bash
docker logs final | tail -n 3
```
Expected: at least one line mentioning `GET /`.

**7.** Open Cursor's Docker sidebar (whale icon in the activity bar). Confirm `final` is listed under **CONTAINERS** with a green/running indicator.

**8.** Take a screenshot showing, in one image:
   - Cursor's Docker sidebar with the `final` container visible and running.
   - Your integrated terminal with the output of `docker ps --filter name=final`.

**9.** Clean up.
```bash
docker stop final && docker rm final
```

**10.** Log it.
```bash
echo "Module 02 final checkpoint: passed $(date -Iseconds)" >> ~/docker-course/notes/notes.txt
```

## What to submit

Submit the screenshot from step 8 to the instructor.

## Self-grade

You pass this module if:

- [ ] All commands ran without errors (no `permission denied`, no `command not found`).
- [ ] Step 5 returned `Welcome to nginx`.
- [ ] Your screenshot clearly shows `final` running in Cursor's Docker sidebar.

If any of those failed, redo the relevant lesson and try again.

## What's next

Module 03 is **Git and GitHub** (sessions 5 and 6 in the schedule). Docker stays installed — you'll keep using it across the rest of the course. Most later modules run things in containers.
