#!/usr/bin/env python3
"""Convert video-scripts narration blocks to Fish Audio S2-Pro format."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Terms that benefit from [emphasis] when they appear (first match per paragraph).
EMPHASIS_TERMS = [
    r"not an error",
    r"That's normal",
    r"That's expected",
    r"permission denied",
    r"no undo",
    r"phase gate",
    r"not cheating",
    r"WILL fail today",
    r"supposed to fail",
    r"expected failure",
    r"one recipe, many containers",
    r"One image, many containers",
    r"catalog first, then shopping",
    r"one arrow replaces, two arrows add",
    r"host, then container",
    r"seeing\. The command line is for doing",
    r"recipe\. A container is a meal",
    r"containers first, then images",
    r"all packages are up to date",
    r"zero percent packet loss",
    r"Failed to connect",
    r"nothing shows on screen",
    r"type the word yes",
    r"control shift P",
    r"command palette",
    r"integrated terminal",
    r"docker group",
    r"Docker Engine, not Docker Desktop",
    r"unable to find image locally",
    r"Hello from Docker",
    r"Welcome to nginx",
]

HOOK_PATTERNS = [
    r"^Hey,",
    r"^Hey ",
    r"^Welcome",
    r"^Alright,",
    r"^This is the moment",
    r"^This is it",
    r"^This one's different",
    r"^Here's where",
    r"^In the last lesson",
    r"^Out of the box",
    r"^Today's lesson",
    r"^Today['']s the day",
    r"^Today, one of",
    r"^Today you",
    r"^Today we",
    r"^Today is",
    r"^So far you",
    r"^Up to now",
    r"^Next week",
    r"^Your computer",
    r"^Every terminal",
    r"^Fair warning",
    r"^Hello world was cute",
    r"^If you only remember",
    r"^Way back in",
    r"^The rules are different",
]

WARNING_PATTERNS = [
    r"Fair warning",
    r"One trap",
    r"One heads-up",
    r"One warning",
    r"One more thing\. Somewhere",
    r"One branch to know",
    r"don't panic",
    r"no undo",
    r"security hole",
    r"most common beginner mistake",
    r"weird twist",
    r"WILL fail today",
    r"failure modes",
    r"mixing them up",
    r"chmod seven seven seven",
]

LAB_PATTERNS = [
    r"^So here's your lab",
    r"^Here's your lab",
    r"^So the artifact",
    r"^The artifact",
    r"^Windows students:",
    r"^Because this is a phase gate",
]

DONE_PATTERNS = [
    r"^You're done when",
    r"^You pass the module",
    r"^You pass this",
]

CLOSING_PATTERNS = [
    r"I'll see you",
    r"trust your hands",
    r"go take the test",
    r"Get a glass of water",
    r"Take a breath",
    r"Most of you will get there",
    r"Windows folks",
    r"If you genuinely can't",
    r"Phase two is where",
]


def matches_any(text: str, patterns: list[str]) -> bool:
    return any(re.search(p, text, re.IGNORECASE) for p in patterns)


def paragraph_tone(paragraph: str, index: int, total: int) -> str:
    if matches_any(paragraph, HOOK_PATTERNS):
        if "Fair warning" in paragraph or "phase gate" in paragraph.lower():
            return "[calm]"
        if "This is it" in paragraph or "Final Checkpoint" in paragraph:
            return "[determined]"
        if "superpowers" in paragraph or "gets real" in paragraph or "big one" in paragraph:
            return "[enthusiastic]"
        return "[warm and friendly]"

    if matches_any(paragraph, WARNING_PATTERNS):
        return "[calm]"

    if matches_any(paragraph, LAB_PATTERNS):
        return "[confident]"

    if matches_any(paragraph, DONE_PATTERNS):
        return "[encouraging]"

    if matches_any(paragraph, CLOSING_PATTERNS):
        return "[friendly]"

    if paragraph.startswith(("First,", "Second,", "Third,", "And third,", "And finally", "The last stretch")):
        return "[calm]"

    if "?" in paragraph[:80] and index == 0:
        return "[curious]"

    if index == total - 1:
        return "[friendly]"

    return "[calm]"


def add_emphasis(paragraph: str) -> str:
    result = paragraph
    used: set[str] = set()
    for term in EMPHASIS_TERMS:
        match = re.search(term, result, re.IGNORECASE)
        if match and term.lower() not in used:
            start = match.start()
            # Avoid double-tagging
            prefix = result[max(0, start - 12) : start]
            if "[emphasis]" in prefix:
                continue
            used.add(term.lower())
            result = result[:start] + "[emphasis] " + result[start:]
    return result


def convert_paragraph(paragraph: str, index: int, total: int) -> str:
    paragraph = paragraph.strip()
    if not paragraph:
        return paragraph

    tone = paragraph_tone(paragraph, index, total)
    body = add_emphasis(paragraph)

    # Pause before enumerated concept sections after the hook
    converted = f"{tone} {body}"

    # Trailing pause between paragraphs (not after the last one)
    if index < total - 1:
        next_para = ""  # filled by caller via long-break logic
        if matches_any(paragraph, LAB_PATTERNS) or "Here's what the test" in paragraph:
            converted += " [long-break]"
        elif matches_any(paragraph, DONE_PATTERNS):
            converted += " [break]"
        else:
            converted += " [break]"

    return converted


def convert_narration(narration: str) -> str:
    paragraphs = [p.strip() for p in narration.strip().split("\n\n") if p.strip()]
    converted = [convert_paragraph(p, i, len(paragraphs)) for i, p in enumerate(paragraphs)]
    return "\n\n".join(converted)


def convert_file(source: Path) -> str:
    text = source.read_text(encoding="utf-8")

    narration_match = re.search(
        r"(## Narration\n\n)(.*?)(\n\n## Screen cues)",
        text,
        re.DOTALL,
    )
    if not narration_match:
        raise ValueError(f"No narration block found in {source}")

    converted_narration = convert_narration(narration_match.group(2))

    header = text[: narration_match.start()]
    screen_cues = text[narration_match.end(2) :]

    # Add Fish Audio note after title metadata if not present
    if "**Fish Audio:**" not in header:
        header = header.rstrip() + "\n\n**Fish Audio:** S2-Pro `[bracket]` tags — paste only the `## Narration` block.\n\n"

    return f"{header}{narration_match.group(1)}{converted_narration}{screen_cues}"


def main() -> None:
    sources = sorted(ROOT.glob("**/video-scripts/*.md"))
    # Skip files already in fish-audio subfolder
    sources = [s for s in sources if "fish-audio" not in s.parts]

    output_paths: list[str] = []
    for source in sources:
        dest = source.parent / "fish-audio" / source.name
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(convert_file(source), encoding="utf-8")
        output_paths.append(str(dest.relative_to(ROOT)))

    print(f"Converted {len(output_paths)} files:")
    for path in output_paths:
        print(path)


if __name__ == "__main__":
    main()
