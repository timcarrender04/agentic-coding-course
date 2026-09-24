# Video: The Docker Extension

**Lesson:** [04-docker-extension.md](../04-docker-extension.md) · **Target:** ~2 min · **Words:** 314

## Narration

Today's lesson comes with a weird twist: we're going to install something, and then it's going to look broken. And that's exactly what's supposed to happen. Let me explain.

First, Docker, in one breath. Docker is a tool that packages an application together with everything it needs to run — operating system files, libraries, configs — into a single bundle called a container. Ship that container to any computer with Docker on it and it runs the same way everywhere. Think of containers as very lightweight virtual machines. We install Docker itself in Module two, not today.

So why are we here now? Because VS Code has a Docker extension — Microsoft calls it Container Tools — that gives you a whole sidebar for inspecting containers, images, networks, and volumes. We're installing that extension today so it's sitting ready when Module two arrives. But here's the twist I promised: since Docker isn't installed yet, that sidebar has nothing to talk to. It's going to say failed to connect, or just sit there empty. That is correct. You didn't break anything. The extension is a dashboard for an engine that isn't there yet.

Here's your lab. Open the extensions side bar, search for Docker, check that the publisher is Microsoft, and install it. A new icon appears in your activity bar — a whale with a stack of containers on its back. Click it and tour the sections: containers, images, networks, volumes, registries. All empty or showing an error, all expected.

You're done when the whale icon is in your activity bar and you can explain, in one sentence, why the sidebar is empty. Take a screenshot showing the whale icon and the open Docker sidebar — error and all — and submit it in D2L with that one-sentence explanation in your comment. Then open the lesson, and I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 04 — The Docker Extension"; Docker sidebar showing "Failed to connect" with a big green check over it |
| 2 | Simple diagram: app + libraries boxed into a container, shipped between two machines; "Docker installs in Module 02" callout |
| 3 | Side by side: empty "Failed to connect" sidebar vs the instructor's populated Docker sidebar from a working machine |
| 4 | Install Docker extension (publisher Microsoft, ms-azuretools); whale icon appears; click through the empty sections |
| 5 | Whale icon + open empty sidebar in one frame; cursor circles both (the screenshot to take) |
