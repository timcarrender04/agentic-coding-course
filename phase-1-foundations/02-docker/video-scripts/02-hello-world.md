# Video: Your First Container

**Lesson:** [02-hello-world.md](../02-hello-world.md) · **Target:** ~2.5 min · **Words:** 339

## Narration

This is the moment Docker gets real. You're about to run a program you didn't write, didn't install, and didn't configure, and it's just going to work. One command. That's the whole promise of containers, and today you see it with your own eyes.

The command is docker run hello dash world. When you hit enter, the first line back says unable to find image locally, and I want to be very clear: that is not an error. Docker checked your machine, didn't find the image, so it reached out to Docker Hub, the public library of images, downloaded it, and ran it. Six things happen in about two seconds: look locally, connect to the hub, download the image, create a container from it, run it, and exit. Run the command a second time and it's instant, because the image is now cached on your machine.

Two words matter here, and we'll go deeper on them in lesson four. The image is the read-only blueprint Docker downloaded. The container is an instance of it, running or stopped. Run the image twice and you get two containers.

Which brings us to the command you'll type more than any other in this module: docker P S. On its own it lists running containers only, so after hello world exits, it shows nothing. Add dash A and you see everything, including stopped ones. Students see that empty list and think their container vanished. It didn't. It exited, and docker P S dash A proves it's still there, with a goofy auto-generated name like modest einstein.

So here's your lab. Run hello world twice, list your images, compare docker P S with docker P S dash A, and log a line to your notes file.

You're done when docker images shows the hello world image and docker P S dash A shows at least one exited hello world container. Paste both outputs, plus the tail of your notes file, into D2L. Then open the lesson, and I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 02 — Your First Container"; terminal waiting at a prompt |
| 2 | Terminal: `docker run hello-world` — zoom on "Unable to find image... locally", pull lines, then "Hello from Docker!"; run it again, instant |
| 3 | Simple two-box overlay: "image = blueprint" → arrow → "container = instance"; `docker images` showing hello-world at 13.3kB |
| 4 | Terminal side-by-side: `docker ps` (empty) vs `docker ps -a` (two Exited rows with random names) |
| 5 | Lesson file steps 1–10; terminal running the `echo ... >> notes.txt` log step |
| 6 | Terminal: `docker images | grep hello-world`, `docker ps -a | grep hello-world`, `tail ~/docker-course/notes/notes.txt` — the paste to submit |
