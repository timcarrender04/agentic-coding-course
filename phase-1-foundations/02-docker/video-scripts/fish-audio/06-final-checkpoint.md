# Video: Final Checkpoint

**Lesson:** [06-final-checkpoint.md](../06-final-checkpoint.md) · **Target:** ~2.5 min · **Words:** 356

**Fish Audio:** S2-Pro `[bracket]` tags — paste only the `## Narration` block.

## Narration

[determined] This is it — the final checkpoint for Module two, and it's also the gate that closes out all of Phase one. Everything since your very first lesson — the terminal, VS Code, Linux, and now Docker — funnels into the next fifteen minutes. [break]

[warm and friendly] The rules are different today. No instructor help, and no asking your neighbor. If you blank on a command, that's fine — go re-read the earlier lesson. That's [emphasis] not cheating; that's exactly what working developers do all day. The only thing you can't do is have someone else type it for you. [break]

[calm] Here's what the test asks, and notice it's nothing new. Prove Docker is installed and you're in the [emphasis] docker group. Clear out any leftover containers. Run engine X detached on port eighty-eighty, named final. Confirm it's up with docker P S. Hit it with curl and get the welcome text back. Check the logs and find your own request in there. Then open the Docker sidebar in VS Code and see final sitting there with a green running icon. Every one of those is a thing you've already done this module. The test is whether you can do them in sequence, on your own, without a script holding your hand. [long-break]

[confident] The artifact is one screenshot, and it has to show two things at once: the VS Code Docker sidebar with the final container visible and running, and your [emphasis] integrated terminal showing the output of docker P S dash dash filter name equals final. One image, both proofs. Then you clean up — stop and remove the container — and log the pass to your notes file with a timestamp, the last line in a file you've been building since Module one. [long-break]

[confident] So here's your lab, and it's the whole lesson. Work the ten steps, top to bottom, alone. [long-break]

[encouraging] You're done when that screenshot shows the sidebar and the terminal agreeing that final is up. Submit it in D2L. Pass this, and Phase one is behind you — Phase two is where you start building real applications. Take a breath, trust your hands, and I'll see you on the other side.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 06 — Final Checkpoint · Phase 1 Gate"; quick montage of Module 00–02 moments |
| 2 | Lesson file header: "no instructor help"; cut to earlier lesson files being scrolled (re-reading is allowed) |
| 3 | Terminal running steps 1–6 in sequence: version + group check, cleanup, `docker run -d -p 8080:80 --name final nginx`, `docker ps --filter name=final`, curl grep, `docker logs final \| tail -n 3` |
| 4 | The money shot: VS Code with Docker sidebar showing `final` running AND terminal showing `docker ps --filter name=final` — frame it as the screenshot; then `docker stop final && docker rm final` and the notes `echo` |
| 5 | Lesson file scrolled to show all ten steps |
| 6 | Screenshot submitted in D2L; closing card: "Phase 1 complete → Phase 2" |
