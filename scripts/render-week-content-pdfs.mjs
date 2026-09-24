#!/usr/bin/env node
/**
 * Student review PDFs — one Letter PDF per suggested-pace week.
 * Same lesson text as the D2L cartridge (instructor blocks already stripped).
 * Quizzes are omitted so answer keys never leave the cartridge.
 *
 * Usage: node scripts/render-week-content-pdfs.mjs
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PAGE_CSS,
  PHASES,
  capstonePage,
  lessonPage,
  loadModules,
  moduleOverviewPage,
} from "../tools/d2l-export/export.mjs";
import { LIVE_LABS, liveLabBody } from "../tools/d2l-export/live-labs.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "marketing/pdf/weeks");
const htmlDir = path.join(outDir, "html");
const logoTc = path.join(root, "public/branding/tc-workforce-development-logo.png");
const logoChief = path.join(root, "public/branding/chiefos-logo.svg");

const PRINT_CSS = `
  ${PAGE_CSS}
  @page { size: letter; margin: 0.58in 0.62in 0.62in; }
  html, body {
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    max-width: none;
    margin: 0;
    padding: 0;
    font-size: 10.5pt;
    line-height: 1.45;
  }
  h1 { font-size: 16pt; break-after: avoid; }
  h2 { font-size: 13pt; break-after: avoid; }
  h3 { font-size: 11.5pt; break-after: avoid; }
  pre, table, blockquote, .callout { break-inside: avoid; }
  pre { white-space: pre-wrap; word-break: break-word; }
  img.logo { height: 36px; width: auto; }
  img.logo.chief { height: 22px; }
  .cover { break-after: page; }
  .brandbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; }
  .kicker { color: #E87722; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; font-size: 10pt; margin: 0 0 6px; }
  .cover h1 { font-size: 28pt; border: none; margin: 0; padding: 0; }
  .cover .subtitle { font-size: 13pt; color: #223140; margin: 6px 0 4px; }
  .cover .phase { color: #5b6575; margin: 0 0 16px; }
  .note { background: #FDF3E3; border: 1px solid #F5A83E; border-radius: 8px; padding: 10px 14px; margin: 0 0 16px; }
  .cover ol { margin: 8px 0 0 1.2em; }
  .cover li { margin: 3px 0; }
  .lesson { break-before: page; }
  .running { color: #5b6575; font-size: 9pt; margin: 0 0 8px; }
`;

function findChromium() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const cacheRoot = path.join(homedir(), ".cache", "ms-playwright");
  if (!existsSync(cacheRoot)) return null;
  const dirs = readdirSync(cacheRoot).filter((d) => d.startsWith("chromium-")).sort().reverse();
  for (const dir of dirs) {
    const candidate = path.join(cacheRoot, dir, "chrome-linux64", "chrome");
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

function extractBody(html) {
  const m = html.match(/<body>\s*([\s\S]*?)\s*<\/body>/i);
  if (!m) throw new Error("HTML page is missing a body");
  return m[1];
}

/** Lesson callouts use emoji that headless Chromium draws as empty boxes. */
function stripEmoji(html) {
  return html.replace(/\p{Extended_Pictographic}\uFE0F?/gu, "");
}

function anchorId(modId, mdFile) {
  return `m${modId}-${mdFile.replace(/\.md$/, "")}`;
}

function fileUrl(p) {
  return `file://${p}`;
}

function coverHtml(phase, week, entries) {
  const items = entries
    .map((e) => `<li><a href="#${e.id}">${e.label}</a></li>`)
    .join("");
  return `<section class="cover">
  <div class="brandbar">
    <img class="logo" src="${fileUrl(logoTc)}" alt="Temple College Workforce Development" />
    <img class="logo chief" src="${fileUrl(logoChief)}" alt="ChiefOS" />
  </div>
  <p class="kicker">Student review packet</p>
  <h1>Week ${week.n}</h1>
  <p class="subtitle">${week.title}</p>
  <p class="phase">${phase.title} · ${phase.subtitle}</p>
  <div class="note">
    <strong>No D2L login required.</strong> This is the same lesson text posted in Brightspace for this week.
    Work the lessons in order on your own machine. Keep each checkpoint screenshot or pasted output.
    Bring it to the live session, or email it to your instructor, instead of submitting in D2L.
    Module quizzes stay in D2L and are not included here.
  </div>
  <h2>In this packet</h2>
  <ol>${items}</ol>
</section>`;
}

function buildWeekHtml(phase, week, modules) {
  const modById = new Map(modules.map((m) => [m.id, m]));
  const entries = [];

  for (const span of week.spans) {
    const mod = modById.get(span.mod);
    if (!mod) throw new Error(`Week ${week.n} references unknown module ${span.mod}`);
    if (span.from === 0) {
      entries.push({
        id: `m${mod.id}-overview`,
        label: `Module ${mod.id} — ${mod.title}: overview`,
        html: stripEmoji(extractBody(moduleOverviewPage(mod))),
      });
    }
    const lessons = mod.lessons.filter((l) => l.num >= span.from && l.num <= span.to);
    for (let n = span.from; n <= span.to; n++) {
      if (!lessons.some((l) => l.num === n)) {
        throw new Error(`Week ${week.n}: module ${mod.id} lesson ${n} not found`);
      }
    }
    const ids = new Set(lessons.map((l) => anchorId(mod.id, l.file)));
    const pageNameFor = (modId, mdFile) => {
      const id = anchorId(modId, mdFile);
      return ids.has(id) ? `#${id}` : null;
    };
    for (const lesson of lessons) {
      const id = anchorId(mod.id, lesson.file);
      let html = stripEmoji(extractBody(lessonPage(mod, lesson, pageNameFor)));
      html = html.replace(
        /to the matching assignment folder\./,
        "Keep it. If you cannot submit in D2L, bring it to class or email it to your instructor.",
      );
      entries.push({
        id,
        label: `${mod.id}.${String(lesson.num).padStart(2, "0")} ${lesson.title}`,
        html,
      });
      for (const lab of LIVE_LABS.filter((l) => l.after.mod === mod.id && l.after.num === lesson.num)) {
        entries.push({
          id: `live-${lab.id}`,
          label: lab.tocTitle,
          html: stripEmoji(liveLabBody(lab.id)),
        });
      }
    }
  }

  if (week.capstone) {
    entries.push({
      id: "capstone",
      label: "Capstone lab",
      html: stripEmoji(extractBody(capstonePage())),
    });
  }

  if (entries.length === 0) throw new Error(`Week ${week.n} has no content`);

  const sections = entries
    .map(
      (e) => `<section class="lesson" id="${e.id}">
<p class="running">Agentic Coding · Week ${week.n} · ${e.label}</p>
${e.html}
</section>`,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Agentic Coding — Week ${week.n} Review</title>
<style>${PRINT_CSS}</style>
</head>
<body>
${coverHtml(phase, week, entries)}
${sections}
</body>
</html>`;
}

function printPdf(chrome, htmlPath, pdfPath) {
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--disable-print-preview",
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: "inherit" },
  );
}

const chrome = findChromium();
if (!chrome) {
  console.error("Chromium not found. Run: npx playwright install chromium\nOr set CHROME_PATH.");
  process.exit(1);
}

const modules = loadModules();
mkdirSync(htmlDir, { recursive: true });

const written = [];
for (const phase of PHASES) {
  for (const week of phase.weeks) {
    const html = buildWeekHtml(phase, week, modules);
    const base = `Agentic-Coding-Week${week.n}-Review`;
    const htmlPath = path.join(htmlDir, `${base}.html`);
    const pdfPath = path.join(outDir, `${base}.pdf`);
    writeFileSync(htmlPath, html);
    printPdf(chrome, htmlPath, pdfPath);

    const weekDir = path.join(root, `Week${week.n}`);
    mkdirSync(weekDir, { recursive: true });
    const weekCopy = path.join(weekDir, `${base}.pdf`);
    copyFileSync(pdfPath, weekCopy);
    const kb = Math.round(statSync(pdfPath).size / 1024);
    written.push({ week: week.n, kb, pdfPath, weekCopy });
    console.log(`Week ${week.n}: ${pdfPath} (${kb} KB)`);
  }
}

rmSync(htmlDir, { recursive: true, force: true });
console.log(`Wrote ${written.length} week review PDFs`);
