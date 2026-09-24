# Video: Making Things

**Lesson:** [02-making-things.md](../02-making-things.md) · **Target:** ~2 min · **Words:** 312

## Narration

Today you build something you'll use every single week for the rest of this course: your working directory. By the end of this lesson, tilde slash docker dash course exists on your machine, and every later module assumes it's there.

First idea: creating. Make-dir creates directories, and make-dir with dash P builds a whole nested path in one shot. Touch creates empty files. C P copies files, and M V moves them — and here's a little secret, M V is also how you rename things, because a rename is just moving a file onto a new name.

Second idea, and this is the big one: destroying. R M removes files, and R M space dash R removes a directory and everything inside it. This is the first command in the course with no undo. There is no trash can in the terminal. When R M runs, it's gone. So the habit I want you to build today: before any R M, look at the path you typed. Then look again.

The drill has you build the course directory with a notes folder, a practice folder, and a nested projects tree. Then you'll make files, copy them around, rename one, move one, and finally — carefully — delete a throwaway directory you created just to destroy. You'll even watch plain R M refuse to delete a directory, which is the terminal trying to protect you. That refusal is a feature, not a bug.

You're done when the structure matches what the lesson expects. For the lab, run the four checkpoint commands — they L S each corner of docker dash course — and submit one screenshot showing all four commands and their output in D2L. The listings should show notes, practice, and projects, with the right files in each. Open the lesson and start building. I'll see you in the next one.

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | Title card: "Lesson 02 — Making Things"; `ls ~` showing no docker-course yet |
| 2 | Terminal: `mkdir docker-course`, `mkdir -p projects/web/app`, `touch practice/file1.txt`, a `cp`, then `mv` as a rename |
| 3 | Terminal: `rm practice/temp-dir` failing with "Is a directory", then `ls` the contents, then `rm -r` succeeding; linger on the path before Enter |
| 4 | Terminal: fast montage of the drill ending on `ls -R docker-course/` showing the full tree |
| 5 | Terminal: the four checkpoint `ls` commands; cursor circles the outputs (the screenshot to submit) |
