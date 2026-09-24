# Video: Images vs Containers

**Lesson:** [04-images-and-containers.md](../04-images-and-containers.md) · **Target:** ~2.5 min · **Words:** 357

## Narration

If you only remember one idea from this whole module, make it this one. An image is a recipe. A container is a meal cooked from that recipe. One recipe, as many meals as you want. Get that straight, and every Docker command you ever type makes sense.

Today you prove it. You'll take the one engine X image already on your machine and run three more containers from it — web two, web three, web four — each on its own port. Then you'll look at docker images and see exactly one engine X image, and look at docker P S and see three containers running from it. One image, many containers. Not a metaphor anymore. It's on your screen.

The second half is cleanup, and it's where the vocabulary earns its keep. Docker R M removes a container. The meal. Docker R M I removes an image. The recipe. Two different commands for two different things, and mixing them up is the classic beginner mistake. There's an order to it, too: containers first, then images, because Docker won't delete a recipe while meals from it still exist. And once you've done it by hand, you'll learn the fast way — docker container prune, and docker image prune — which sweep up everything stopped and unused in one shot.

By the end, your machine is wiped clean, and then you'll pull engine X one more time, fresh, because the final checkpoint needs it. Deleting everything and re-pulling isn't wasteful. It's the point. Images are disposable, and that mindset is what makes Docker feel light instead of scary.

So here's your lab. Run the three extra containers, see the one image behind them, stop them, remove them all, remove the images, prune, and re-pull engine X. Log a line to your notes file when you're done.

You're done when the three checkpoint commands run clean: engine X back in your images, docker P S dash A empty, and the run, stop, remove one-liner finishing with no errors. Paste those outputs, plus the tail of your notes file, into D2L, and I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 04 — Images vs Containers"; overlay: recipe card → three plates |
| 2 | Terminal: three `docker run -d -p 808X:80 --name webX nginx` commands; `docker ps` showing three rows, `docker images \| grep nginx` showing one |
| 3 | Terminal: `docker rm web web2 web3 web4`, then `docker rmi hello-world`; then `docker container prune -f` and `docker image prune -a -f` reclaiming space |
| 4 | Terminal: `docker images` and `docker ps -a` both empty; then `docker pull nginx` re-downloading layers |
| 5 | Lesson file steps 1–23 plus the quick-reference table; terminal running the notes `echo` step |
| 6 | Terminal: the three Checkpoint commands running clean, then `tail ~/docker-course/notes/notes.txt` — the paste to submit |
