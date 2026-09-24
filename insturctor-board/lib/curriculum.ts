import fs from "node:fs";
import path from "node:path";

import type { Lesson, Module, Phase, Step } from "@/types/curriculum";

const COURSE_ROOT = path.resolve(process.cwd(), "..");

const MODULE_DIR_RE = /^\d{2}-[a-z0-9-]+$/;
const PHASE_DIR_RE = /^phase-(\d)-[a-z0-9-]+$/;
const LESSON_FILE_RE = /^\d{2}-[a-z0-9-]+\.md$/;

/** Nicely-cased phase titles + suggested-pace weeks, keyed by phase number. */
const PHASE_TITLE: Record<number, string> = {
  1: "Foundations",
  2: "Building Real Apps",
  3: "AI-Assisted Development",
};
const PHASE_WEEKS: Record<number, string> = {
  1: "Weeks 1–6",
  2: "Weeks 7–12",
  3: "Weeks 13–18",
};

const MODULE_ICON: Record<string, string> = {
  "00": "desktop_mac",
  "01": "terminal",
  "02": "deployed_code",
  "03": "bolt",
  "04": "fork_right",
  "05": "smart_toy",
  "06": "palette",
  "07": "psychology",
  "08": "power",
};

let cache: Module[] | null = null;

/** A module's location relative to COURSE_ROOT, plus the phase it belongs to (if any). */
type ModuleRef = { relPath: string; phase?: Phase };

function phaseMetaFromDir(dirName: string): Phase | undefined {
  const m = PHASE_DIR_RE.exec(dirName);

  if (!m) return undefined;
  const number = parseInt(m[1], 10);

  return {
    number,
    title: PHASE_TITLE[number] ?? humanizeName(dirName.replace(/^phase-\d-/, "")),
    weeks: PHASE_WEEKS[number],
  };
}

/** Discover modules nested under `phase-N-...` folders, falling back to any left at the root. */
function discoverModuleRefs(): ModuleRef[] {
  const top = fs.readdirSync(COURSE_ROOT, { withFileTypes: true });
  const refs: ModuleRef[] = [];

  for (const phaseDir of top
    .filter((e) => e.isDirectory() && PHASE_DIR_RE.test(e.name))
    .map((e) => e.name)
    .sort()) {
    const phase = phaseMetaFromDir(phaseDir);

    for (const mod of fs
      .readdirSync(path.join(COURSE_ROOT, phaseDir), { withFileTypes: true })
      .filter((e) => e.isDirectory() && MODULE_DIR_RE.test(e.name))
      .map((e) => e.name)
      .sort()) {
      refs.push({ relPath: path.join(phaseDir, mod), phase });
    }
  }

  // Backward-compatible fallback: modules still sitting directly at the root.
  for (const mod of top
    .filter((e) => e.isDirectory() && MODULE_DIR_RE.test(e.name))
    .map((e) => e.name)
    .sort()) {
    refs.push({ relPath: mod });
  }

  // Dedupe by module id (a phased copy wins over a stray root copy) and order by id.
  const byId = new Map<string, ModuleRef>();

  for (const ref of refs) {
    const id = path.basename(ref.relPath).slice(0, 2);

    if (!byId.has(id)) byId.set(id, ref);
  }

  return Array.from(byId.values()).sort((a, b) =>
    path.basename(a.relPath).localeCompare(path.basename(b.relPath)),
  );
}

export function loadCurriculum(): Module[] {
  if (cache) return cache;

  cache = discoverModuleRefs().map((ref) => loadModule(ref));

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

function loadModule(ref: ModuleRef): Module {
  const dirPath = path.join(COURSE_ROOT, ref.relPath);
  const dirName = path.basename(ref.relPath);
  const id = dirName.slice(0, 2);
  const title = humanizeName(dirName.slice(3));

  const lessonFiles = fs
    .readdirSync(dirPath)
    .filter((f) => LESSON_FILE_RE.test(f))
    .sort();

  const lessons = lessonFiles.map((f) => loadLesson(ref.relPath, f));

  let instructorNotes: string | undefined;
  const notesPath = path.join(dirPath, "INSTRUCTOR-NOTES.md");

  if (fs.existsSync(notesPath)) {
    instructorNotes = fs.readFileSync(notesPath, "utf8");
  }

  return {
    id,
    title,
    icon: MODULE_ICON[id],
    phase: ref.phase,
    lessons,
    instructorNotes,
  };
}

function loadLesson(moduleRelPath: string, file: string): Lesson {
  const filePath = path.join(COURSE_ROOT, moduleRelPath, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const moduleId = path.basename(moduleRelPath).slice(0, 2);
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
