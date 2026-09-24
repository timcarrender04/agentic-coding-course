# Video: The VS Code Docker Sidebar

**Lesson:** [05-vscode-docker-sidebar.md](../05-vscode-docker-sidebar.md) · **Target:** ~2.5 min · **Words:** 345

**Fish Audio:** S2-Pro `[bracket]` tags — paste only the `## Narration` block.

## Narration

[warm and friendly] Way back in Module zero, you installed the Docker extension in VS Code, clicked the whale icon, and got an error, because Docker wasn't installed yet. I told you we'd come back. This is the payoff lesson. Today, that sidebar comes alive. [break]

[calm] The concept here is a simple division of labor. The sidebar is for [emphasis] seeing. The command line is for doing. Everything you've typed this module — docker P S, docker stop, docker logs — has a mirror in that sidebar. Click the whale, and the sections light up: containers, images, networks, volumes. Run a container in the terminal, and watch it appear in the list with a green icon. Right-click it, and there's stop, remove, view logs, attach shell. Attach shell drops you inside the container, exactly like docker exec did in lesson three. Same engine underneath, two ways to drive it. [break]

[calm] So which should you use? For seeing what's running at a glance, the sidebar wins. For real work, like running a container with specific ports and a name, the command line wins, because the sidebar's run button doesn't let you set flags. Knowing which tool fits which job is the actual skill in this lesson. [break]

[calm] One warning before you start. If your sidebar is still empty, or says [emphasis] failed to connect, your VS Code window is probably connected to the wrong environment. Check the bottom-left corner. It should say W S L Ubuntu, or S S H and your host name. If it doesn't, reconnect first, because a VS Code window pointed at Windows can't see the Docker daemon living inside your Linux environment. [break]

[confident] So here's your lab. Open the Docker sidebar, run a container named sidebar demo from the terminal, watch it show up, open its logs, attach a shell, then stop and remove it entirely from the right-click menu. [long-break]

[encouraging] You're done when you've driven a container from the sidebar, start to finish. Take one screenshot showing the populated containers and images sections and submit it in D2L. Then open the lesson, and I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 05 — The VS Code Docker Sidebar"; flashback shot of the Module 00 "Failed to connect" sidebar |
| 2 | Whale icon click → populated sections; terminal runs `docker run -d -p 8080:80 --name sidebar-demo nginx`; container appears with green icon; right-click menu open |
| 3 | Side-by-side: sidebar view of running containers vs terminal `docker run` with `-p` and `--name` flags |
| 4 | Bottom-left corner zoom: "WSL: Ubuntu" / "SSH: hostname" badge; brief shot of an empty sidebar on a disconnected window |
| 5 | Right-click `sidebar-demo` → View Logs (opens in tab) → Attach Shell (terminal inside container) → Stop (icon turns red) → Remove |
| 6 | Final framing of the populated CONTAINERS + IMAGES sections — the screenshot to take |
