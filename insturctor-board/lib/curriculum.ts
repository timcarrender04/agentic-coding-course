import fs from "node:fs";
import path from "node:path";

import type { Lesson, Module, Step } from "@/types/curriculum";

const COURSE_ROOT = path.resolve(process.cwd(), "..");

const MODULE_DIR_RE = /^\d{2}-[a-z0-9-]+$/;
const LESSON_FILE_RE = /^\d{2}-[a-z0-9-]+\.md$/;

const MODULE_EMOJI: Record<string, string> = {
  "00": "🖥️",
  "01": "⌨️",
  "02": "🐳",
  "03": "⚡",
  "04": "🔀",
  "05": "🤖",
  "06": "🎨",
  "07": "🧠",
  "08": "🔌",
};

let cache: Module[] | null = null;

export function loadCurriculum(): Module[] {
  if (cache) return cache;

  const entries = fs
    .readdirSync(COURSE_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && MODULE_DIR_RE.test(e.name))
    .map((e) => e.name)
    .sort();

  cache = entries.map((dirName) => loadModule(dirName));

  return cache;
}

export function getLesson(moduleId: string, lessonId: string): Lesson | null {
  const mod = loadCurriculum().find((m) => m.id === moduleId);

  if (!mod) return null;

  return mod.lessons.find((l) => l.id === lessonId) ?? null;
}

export function getDefaultLesson(): { moduleId: string; lessonId: string } {
  const modules = loadCurriculum();
  const first = modules[0];

  return { moduleId: first.id, lessonId: first.lessons[0].id };
}

export function getNeighbors(moduleId: string, lessonId: string) {
  const flat: { moduleId: string; lessonId: string; title: string }[] = [];

  for (const m of loadCurriculum()) {
    for (const l of m.lessons) {
      flat.push({ moduleId: m.id, lessonId: l.id, title: l.title });
    }
  }
  const i = flat.findIndex(
    (x) => x.moduleId === moduleId && x.lessonId === lessonId,
  );

  return {
    prev: i > 0 ? flat[i - 1] : null,
    next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : null,
  };
}

function loadModule(dirName: string): Module {
  const dirPath = path.join(COURSE_ROOT, dirName);
  const id = dirName.slice(0, 2);
  const title = humanizeName(dirName.slice(3));

  const lessonFiles = fs
    .readdirSync(dirPath)
    .filter((f) => LESSON_FILE_RE.test(f))
    .sort();

  const lessons = lessonFiles.map((f) => loadLesson(dirName, f));

  let instructorNotes: string | undefined;
  const notesPath = path.join(dirPath, "INSTRUCTOR-NOTES.md");

  if (fs.existsSync(notesPath)) {
    instructorNotes = fs.readFileSync(notesPath, "utf8");
  }

  return {
    id,
    title,
    emoji: MODULE_EMOJI[id],
    lessons,
    instructorNotes,
  };
}

function loadLesson(moduleDir: string, file: string): Lesson {
  const filePath = path.join(COURSE_ROOT, moduleDir, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const moduleId = moduleDir.slice(0, 2);
  const lessonId = file.replace(/\.md$/, "").slice(0, 2);

  return {
    id: lessonId,
    moduleId,
    title: extractTitle(raw, file),
    preamble: extractPreamble(raw),
    steps: extractSteps(raw),
    presenterNotes: extractPresenterNotes(raw),
    raw,
  };
}

function extractTitle(md: string, fallbackFile: string): string {
  const h1 = md.match(/^#\s+(.+)$/m);

  if (h1) {
    return h1[1].replace(/^Lesson\s+\d+\s*:\s*/i, "").trim();
  }

  return humanizeName(fallbackFile.replace(/^\d{2}-/, "").replace(/\.md$/, ""));
}

function extractPreamble(md: string): string | undefined {
  const afterTitle = md.replace(/^#\s+.+\n+/m, "");
  const firstStep = afterTitle.indexOf("**1.**");
  const firstHr = afterTitle.indexOf("\n---");
  const cutAt = [firstStep, firstHr]
    .filter((i) => i >= 0)
    .reduce((a, b) => Math.min(a, b), Infinity);

  if (!Number.isFinite(cutAt)) return undefined;
  const intro = afterTitle.slice(0, cutAt).trim();

  return intro.length > 0 ? intro : undefined;
}

function extractSteps(md: string): Step[] {
  const stepRe = /\*\*(\d+)\.\*\*\s+([\s\S]*?)(?=\n\*\*\d+\.\*\*|\n---|\n##\s|$)/g;
  const out: Step[] = [];
  let m: RegExpExecArray | null;

  while ((m = stepRe.exec(md))) {
    const index = parseInt(m[1], 10);
    const bodyRaw = m[2].trim();
    const { script, bodyWithoutFences } = extractInstructorFences(bodyRaw);
    const code = extractCodeBlocks(bodyWithoutFences);
    const kind: Step["kind"] = /watch out|warning/i.test(bodyWithoutFences)
      ? "warning"
      : code.length > 0
        ? "code"
        : "instruction";

    out.push({
      index,
      kind,
      body: stripCodeBlocks(bodyWithoutFences),
      code,
      instructorScript: script,
    });
  }

  if (out.length > 0) return out;

  return splitBySections(md);
}

function splitBySections(md: string): Step[] {
  const stripped = md.replace(/^#\s+.+\n+/m, "");
  const sections = stripped.split(/\n##\s+/).filter((s) => s.trim().length > 0);

  return sections.slice(0, 12).map((sec, i) => {
    const [first, ...rest] = sec.split("\n");
    const heading = i === 0 ? "Overview" : first.trim();
    const bodyRaw = (i === 0 ? sec : rest.join("\n")).trim();
    const { script, bodyWithoutFences } = extractInstructorFences(bodyRaw);
    const code = extractCodeBlocks(bodyWithoutFences);

    return {
      index: i + 1,
      kind: code.length > 0 ? "code" : "instruction",
      body: `**${heading}**\n\n${stripCodeBlocks(bodyWithoutFences)}`,
      code,
      instructorScript: script,
    };
  });
}

/** Strips fenced ```instructor blocks from step body and returns combined script (never shown to students). */
function extractInstructorFences(body: string): {
  script?: string;
  bodyWithoutFences: string;
} {
  const re = /```instructor\s*\n([\s\S]*?)```/gi;
  const scripts: string[] = [];
  const bodyWithoutFences = body.replace(re, (_full, inner: string) => {
    const t = String(inner).trim();

    if (t) scripts.push(t);

    return "";
  });

  const collapsed = bodyWithoutFences.replace(/\n{3,}/g, "\n\n").trim();

  return {
    script: scripts.length > 0 ? scripts.join("\n\n") : undefined,
    bodyWithoutFences: collapsed,
  };
}

function extractCodeBlocks(body: string) {
  const re = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks: { lang: string; source: string }[] = [];
  let m: RegExpExecArray | null;

  while ((m = re.exec(body))) {
    blocks.push({ lang: m[1] || "text", source: m[2].trimEnd() });
  }

  return blocks;
}

function stripCodeBlocks(body: string): string {
  return body.replace(/```\w*\n[\s\S]*?```/g, "").trim();
}

function extractPresenterNotes(md: string): string | undefined {
  const watchOut = md.match(
    /##\s+(?:⚠️\s+)?Watch out\s*\n([\s\S]*?)(?=\n---|\n##\s|$)/i,
  );

  if (watchOut) return watchOut[1].trim();

  return undefined;
}

function humanizeName(s: string): string {
  return s
    .replace(/-/g, " ")
    .replace(/\bthough\b/, "through")
    .split(" ")
    .map((w) => (w.length <= 3 ? w : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}
