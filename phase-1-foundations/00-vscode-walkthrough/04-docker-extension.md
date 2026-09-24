# Lesson 04: The Docker Extension

**Time:** ~10 min

```instructor
Say: "We're installing the Docker extension now so it's ready for Module 02. Docker itself is not installed yet."
Mention: "The sidebar will say 'Failed to connect' or be empty. THAT IS CORRECT. Say it loud — half the room will think they broke something."
Pause: After the whale icon appears in the activity bar — let them click it, see the empty sections, and ask 'why is this empty' before you reassure them.
Show: Your own machine's populated Docker sidebar (or your prepped screenshot) so they know what success looks like after Module 02.
Say: "You're done when the whale icon is in your activity bar and you can explain in one sentence why the sidebar is empty."
```

## What is Docker, in one paragraph?

**Docker** is a tool for packaging an application together with everything it needs to run (its operating system files, libraries, configs) into a single bundle called a **container**. You can ship that container to any computer that has Docker installed and it will run the same way. Containers are like very lightweight virtual machines.

You don't need to fully understand Docker today. You just need to know:

- Docker is installed in **Module 02**, not now.
- Cursor has a **Docker extension** that gives you a sidebar for looking at your containers, images, etc. We're installing that extension now so it's ready when you need it.

## Important: what you'll see vs what works

Because Docker isn't installed yet, the Docker sidebar will say **"Failed to connect"** or just be empty when you open it. **This is correct.** You haven't done anything wrong. The extension is fine — it just has nothing to talk to until Module 02.

Your instructor will show you what the sidebar **will** look like after Module 02 (with their own Docker running, or a screenshot).

## Try it yourself: install the Docker extension

1. Open the extensions side bar (`Ctrl+Shift+X`).
2. Search for **Docker**.
3. The one you want is published by **Microsoft** (publisher id `ms-azuretools.vscode-docker`). It usually has the most installs.
4. Click **Install**.
5. After install, look at the activity bar on the left edge of the window. There's a new icon: a whale with a stack on its back. That's the Docker side bar.

## Tour the Docker side bar

1. Click the Docker whale icon in the activity bar.
2. The side bar shows several sections:
   - **CONTAINERS** — running and stopped containers.
   - **IMAGES** — the read-only blueprints that containers are built from.
   - **NETWORKS** — virtual networks Docker has created.
   - **VOLUMES** — persistent storage attached to containers.
   - **REGISTRIES** — places you can pull or push images to (Docker Hub, etc.).
3. All of these will show "Failed to connect" or "No items found." Again — expected.

You don't need to understand what every section does today. Just remember they exist. Once Module 02 is done, this sidebar will fill up and you'll come back to it.

## Checkpoint

You're done when:

- [ ] You installed the **Docker** extension by **Microsoft** (`ms-azuretools.vscode-docker`).
- [ ] The Docker whale icon is in your activity bar on the left.
- [ ] You clicked it and saw the CONTAINERS / IMAGES / NETWORKS / VOLUMES / REGISTRIES sections (even if they're empty or showing an error).
- [ ] You can explain in one sentence why the sidebar is empty right now.
