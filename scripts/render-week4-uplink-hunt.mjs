#!/usr/bin/env node
/**
 * Render Week 4 Operation Uplink Student Read-Ahead HTML → PDF (Letter).
 * Usage: node scripts/render-week4-uplink-hunt.mjs
 */
import { execFileSync } from "child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { homedir } from "os";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "marketing/week4-uplink-hunt.html");
const outDir = path.join(root, "marketing/pdf");
const outPath = path.join(outDir, "Agentic-Coding-Week4-Uplink-Hunt.pdf");
const week4Copy = path.join(root, "Week4/Agentic-Coding-Week4-Uplink-Hunt.pdf");

function findChromium() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const cacheRoot = path.join(homedir(), ".cache", "ms-playwright");
  if (!existsSync(cacheRoot)) return null;

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
mkdirSync(path.dirname(week4Copy), { recursive: true });

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

copyFileSync(outPath, week4Copy);

const kb = Math.round(statSync(outPath).size / 1024);
console.log(`Wrote ${outPath} (${kb} KB)`);
console.log(`Copied ${week4Copy}`);
