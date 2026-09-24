import { chromium } from "playwright-core";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function render(htmlName, outName) {
  const htmlPath = path.resolve(__dirname, htmlName);
  const outPath = path.resolve(__dirname, outName);
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/home/timca/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  await page.goto("file://" + htmlPath, { waitUntil: "networkidle" });
  // Ensure webfonts + images settle
  await page.waitForTimeout(600);
  await page.screenshot({ path: outPath, type: "png" });
  await browser.close();
  const stat = fs.statSync(outPath);
  console.log(`Wrote ${outPath} (${Math.round(stat.size / 1024)} KB)`);
}

(async () => {
  await render("co-branded-vcam.html", "co-branded-vcam-1920x1080.png");
  await render("co-branded-vcam-corners.html", "co-branded-vcam-corners-1920x1080.png");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
