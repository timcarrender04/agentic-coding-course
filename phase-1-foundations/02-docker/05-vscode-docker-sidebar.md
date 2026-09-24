# Lesson 05: The Cursor Docker Sidebar

**Time:** ~10 min

```instructor
Say: "Remember Module 00 lesson 04? The empty Docker sidebar? Now we go look at it populated. This is the payoff."
Mention: "If their sidebar is still empty, the Cursor window is connected to the wrong environment. Bottom-left should say 'WSL: Ubuntu' or 'SSH: <hostname>'. Reconnect if needed."
Pause: After the sidebar fills in. Right-click a container — show 'Stop' and 'Remove' from the menu. Demonstrate UI/CLI parity, then move on.
Say: "You're done when they can see their nginx container in CONTAINERS and the nginx image in IMAGES, and start/stop a container from the sidebar."
```

Remember Module 00 lesson 04? You installed the Docker extension in Cursor and the sidebar said "Failed to connect" because Docker wasn't installed yet. Now Docker is installed. Let's go look.

## Step 1: open the Docker sidebar

1. In the activity bar (left edge of Cursor), click the **whale** icon (Docker).
2. The Docker side bar opens. The sections — **CONTAINERS**, **IMAGES**, **NETWORKS**, **VOLUMES**, **REGISTRIES** — should now be populated, not empty.

If they're still empty or showing an error, your Cursor session might be looking at the wrong Docker daemon (e.g. Cursor is on Windows but Docker is in WSL). Make sure your Cursor window is connected to the same environment where you installed Docker — bottom-left should say "WSL: Ubuntu" or "SSH: <hostname>." Reconnect if needed.

## Step 2: run a container and watch it appear

1. Open the integrated terminal.
2. Run:
   ```
   docker run -d -p 8080:80 --name sidebar-demo nginx
   ```
3. Look at the **CONTAINERS** section in the Docker sidebar.
4. `sidebar-demo` should appear in the list, with a green play icon (running).

You can refresh the sidebar manually if it doesn't auto-update — there's a refresh icon at the top of the Docker section.

## Step 3: explore the right-click menu

1. Right-click `sidebar-demo` in the sidebar.
2. The context menu shows actions: **Stop**, **Restart**, **Remove**, **Inspect**, **Attach Shell**, **View Logs**, and more.
3. Click **View Logs** — Cursor opens nginx's logs in a new editor tab.
4. Click **Attach Shell** — Cursor opens a new integrated terminal that's already inside the container (same as `docker exec -it sidebar-demo bash`).

Type `exit` to leave the attached shell.

## Step 4: stop and remove via the UI

1. Right-click `sidebar-demo` → **Stop**.
2. The icon next to the container changes from green to red.
3. Right-click → **Remove**.
4. The container disappears from the list.

You can do all of this from the CLI, and you should — it's faster once you know it. But the sidebar is a good way to **see** what's running at a glance, especially when you have multiple containers.

## Step 5: explore the IMAGES section

1. Click the **IMAGES** section in the sidebar.
2. You should see `nginx` listed.
3. Right-click → see options like **Run**, **Run Interactive**, **Remove**.
4. **Run** is a quick way to start a container from an image without typing the full `docker run` command — though you lose control over flags like `-p` and `--name`. For real work, the CLI is better.

## When to use the sidebar vs the CLI

| Task | Better with |
|---|---|
| See what's running right now | Sidebar |
| Read a container's logs | Either — sidebar opens them in a tab, CLI is faster |
| Run a container with specific port mappings | CLI |
| One-off cleanup of stopped containers | CLI (`docker container prune -f`) |
| Get a shell into a running container | Either |
| Inspect environment variables / mounts | Sidebar (right-click → Inspect — much easier than `docker inspect`) |

The sidebar is for seeing. The CLI is for doing. Use both.

## Checkpoint

You're done when:

- [ ] You opened the Docker sidebar in Cursor and it showed populated sections (not "Failed to connect").
- [ ] You ran a container in the terminal and saw it appear in the sidebar.
- [ ] You stopped and removed a container via right-click in the sidebar.
- [ ] You opened a container's logs via the sidebar.
