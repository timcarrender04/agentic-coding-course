# Video: Running a Real Image

**Lesson:** [03-running-nginx.md](../03-running-nginx.md) · **Target:** ~2.5 min · **Words:** 376

**Fish Audio:** S2-Pro `[bracket]` tags — paste only the `## Narration` block.

## Narration

[warm and friendly] Hello world was cute. Now let's run something real. Engine X is one of the most used web servers on the planet, it takes real effort to install and configure by hand, and today you'll have it serving pages on your machine with one command, without installing it at all. That's the actual point of Docker. [break]

[calm] That one command carries the two concepts of this lesson. First, dash D, detached mode. It runs the container in the background and gives your terminal back. Forget it, and your terminal seems to hang — that's not Docker breaking, that's engine X sitting in the foreground. Second, dash P, the port map. Engine X listens on port eighty inside the container, and the mapping forwards port eighty-eighty on your machine to port eighty inside. Host side on the left, container side on the right. Everybody mixes those up once. Say [emphasis] host, then container, in your head, and you won't. [break]

[calm] Then you get to see it. Localhost, port eighty-eighty, and there's the engine X welcome page. How you open the browser depends on your setup, and all three ways count. W S L students use their normal Windows browser. S S H students use the ports tab at the bottom of VS Code, which forwards the port automatically. Native Linux students just open a browser. Same page either way. [break]

[calm] You'll also poke around. Watch the logs record every request you make, and use docker exec to open a shell inside the running container, where you'll find a whole separate filesystem living in there. Then stop the container, start it again, and see that it keeps its name and its port mapping. [break]

[confident] So here's your lab. Pull the engine X image, run it detached on port eighty-eighty with the name web, hit it with curl and with your browser, read the logs, step inside with exec, and log a line to your notes file. [long-break]

[encouraging] You're done when the welcome page has loaded in your browser and docker P S dash A shows your web container. Submit a screenshot of that welcome page — any of the three browser paths counts — plus the checkpoint outputs and the tail of your notes file in D2L. I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 03 — Running a Real Image"; nginx logo flash, then `docker pull nginx` layers downloading |
| 2 | Terminal: `docker run -d -p 8080:80 --name web nginx`; overlay diagram of `-p 8080:80` with arrows — host 8080 → container 80 |
| 3 | Three quick shots: Windows browser at localhost:8080; VS Code Ports tab with globe icon; Linux browser — all landing on "Welcome to nginx!" |
| 4 | Terminal: `docker logs -f web` scrolling as the page reloads; then `docker exec -it web bash`, `ls /usr/share/nginx/html/`, `exit` |
| 5 | Lesson file steps 1–21; terminal running `docker stop web`, `docker start web`, then the notes `echo` step |
| 6 | The welcome-page screenshot framed; terminal: `docker ps -a --filter name=web`, `docker images | grep nginx`, `tail ~/docker-course/notes/notes.txt` |
