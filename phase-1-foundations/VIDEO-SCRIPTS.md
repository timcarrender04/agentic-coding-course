# Video Scripts — Format & Fish Audio Conventions

Every lesson (learning object) ships with a **2–3 minute concept-intro video**. The instructor records these with **Fish Audio** (cloned voice) using the narration text in each script file, over a screen recording that follows the script's cues. Scripts live in a `video-scripts/` folder inside each module, one file per lesson, **same basename as the lesson** (e.g. `00-vscode-walkthrough/video-scripts/02-integrated-terminal.md` pairs with `02-integrated-terminal.md`). The `video-scripts/` folder is ignored by the instructor-board loader, so scripts never show up as lessons.

## What a video covers (and doesn't)

The video is the **setup, not the walkthrough**. It answers: why this lesson matters, the one or two concepts inside it, what you're about to do, and what artifact proves you did it. The typed drills stay in the lesson text — the video should make a student *want* to open the lesson, not replace it.

Structure every narration the same way:

1. **Hook** — one or two sentences on why this matters right now.
2. **Concepts** — the 1–2 ideas the lesson teaches, in plain speech.
3. **What you'll do** — the drill in one breath, not step-by-step.
4. **Done-when** — the lab artifact: "you're done when X; submit Y in D2L."
5. **Handoff** — send them into the lesson text.

## File format

```markdown
# Video: <Lesson Title>

**Lesson:** [NN-slug.md](../NN-slug.md) · **Target:** ~2–3 min · **Words:** NNN

## Narration

<pure prose paragraphs — this whole block is pasted into Fish Audio>

## Screen cues

| Paragraph | On screen |
|---|---|
| 1 | <what to record while that paragraph plays> |
```

## Narration rules (Fish Audio reads raw text)

- **Length:** 300–450 words (~150 words per minute → 2–3 min).
- **Pure prose.** No headings, bullets, backticks, code blocks, or stage directions inside the Narration section — the TTS reads every character it's given.
- **Short sentences, contractions, spoken register.** It's the instructor's voice; write like he talks, not like documentation.
- **Commands are spoken, not typed.** Spell letter-by-letter where a reader would: "P W D", "C D", "L S space dash L A". Say "dash" for `-`, "dot" for `.`, "slash" for `/`. Write "soo-doo" for sudo, "engine X" for nginx, "curl" as-is.
- **No URLs as-is.** Write "code dot visualstudio dot com", "hub dot docker dot com".
- **Numbers that matter get words.** "port eighty-eighty" (8080), "seven five five" (755).
- **End on the artifact.** The last two sentences always state what to submit and hand off to the lesson.

## Screen cues

One row per narration paragraph. Cues describe what the instructor screen-records (VS Code UI, terminal commands, browser) so the video tracks the voice. Keep them terse — they're shot notes, not a storyboard.

## Recording pipeline (instructor)

1. Paste the `## Narration` block into Fish Audio with the cloned voice; export audio.
2. Screen-record the cues at the paragraph pace (the audio's natural pauses give you the beats).
3. Combine, export, upload as the lesson's D2L Topic video, above the lesson HTML.
