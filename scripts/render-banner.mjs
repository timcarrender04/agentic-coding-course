#!/usr/bin/env node
/**
 * Render rollup banner to JPG (768×2616).
 * Usage: node scripts/render-banner.mjs
 */
import { execFileSync } from "child_process";
import { existsSync, readdirSync } from "fs";
import { homedir } from "os";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "marketing/banners/rollup/chiefos-temple.html");
const outPath = path.join(root, "marketing/banners/rollup/chiefos-temple.jpg");
const width = 768;
const height = 2616;

function findChromeHeadlessShell() {
  const cacheRoot = path.join(homedir(), ".cache", "ms-playwright");
  if (!existsSync(cacheRoot)) return null;
  for (const dir of readdirSync(cacheRoot)) {
    if (!dir.startsWith("chromium_headless_shell-")) continue;
    const candidate = path.join(
      cacheRoot,
      dir,
      "chrome-headless-shell-linux64",
      "chrome-headless-shell",
    );
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

const chrome = findChromeHeadlessShell();
if (!chrome) {
  console.error("Chrome headless shell not found. Run: npx playwright install chromium");
  process.exit(1);
}

execFileSync(
  chrome,
  [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    `--window-size=${width},${height}`,
    `--screenshot=${outPath}`,
    `file://${htmlPath}`,
  ],
  { stdio: "inherit" },
);

console.log(`Wrote ${outPath} (${width}×${height})`);
