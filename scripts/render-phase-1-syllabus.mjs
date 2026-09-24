#!/usr/bin/env node
/**
 * Render Phase 1 branded syllabus HTML → PDF (Letter).
 * Usage: node scripts/render-phase-1-syllabus.mjs
 */
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { homedir } from "os";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "marketing/phase-1-syllabus.html");
const outDir = path.join(root, "marketing/pdf");
const outPath = path.join(outDir, "Agentic-Coding-Phase-1-Syllabus.pdf");

function findChromium() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const cacheRoot = path.join(homedir(), ".cache", "ms-playwright");
  if (!existsSync(cacheRoot)) return null;

  // Prefer full Chromium (supports --print-to-pdf) over headless_shell.
  const dirs = readdirSync(cacheRoot)
    .filter((d) => d.startsWith("chromium-"))
    .sort()
    .reverse();

  for (const dir of dirs) {
    const candidate = path.join(
      cacheRoot,
      dir,
      "chrome-linux64",
      "chrome",
    );
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

const chrome = findChromium();
if (!chrome) {
  console.error(
    "Chromium not found. Run: npx playwright install chromium\n" +
      "Or set CHROME_PATH to a Chrome/Chromium binary.",
  );
  process.exit(1);
}

if (!existsSync(htmlPath)) {
  console.error(`Missing HTML: ${htmlPath}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--disable-print-preview",
    `--print-to-pdf=${outPath}`,
    `file://${htmlPath}`,
  ],
  { stdio: "inherit" },
);

const kb = Math.round(statSync(outPath).size / 1024);
console.log(`Wrote ${outPath} (${kb} KB)`);
