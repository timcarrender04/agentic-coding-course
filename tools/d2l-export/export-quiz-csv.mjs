#!/usr/bin/env node
/**
 * Emits the module "Check on Learning" quizzes as D2L Brightspace CSV question
 * imports (Question Library > Import > Upload a File), one CSV per module plus
 * one combined CSV per invocation.
 *
 * Inputs:  data/module-NN.json (same quiz items the QTI exporter uses)
 * Outputs: dist/quiz-csv/mNN-check.csv  +  dist/quiz-csv/<combined>.csv
 *
 * Run: node export-quiz-csv.mjs [NN ...]   (defaults to every data/module-*.json)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(HERE, "data");
const OUT_DIR = path.join(HERE, "dist", "quiz-csv");

const mods = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(DATA_DIR)
      .filter((f) => /^module-\d{2}\.json$/.test(f))
      .map((f) => f.slice(7, 9))
      .sort();

// D2L's CSV import is plain text; drop markdown code ticks.
const plain = (s) => s.replaceAll("`", "");

const cell = (s) => {
  s = String(s);
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};

// Official sample pads every row to 5 columns.
const row = (...cols) => {
  while (cols.length < 5) cols.push("");
  return cols.map(cell).join(",");
};

function questionRows(mod, n, q) {
  const lines = [
    row("NewQuestion", "MC"),
    row("ID", `M${mod}-Q${String(n).padStart(2, "0")}`),
    row("Title", `M${mod} Check Q${String(n).padStart(2, "0")}`),
    row("QuestionText", plain(q.question)),
    row("Points", 1),
    row("Difficulty", 1),
  ];
  q.options.forEach((opt, i) => {
    lines.push(row("Option", i === q.answer ? 100 : 0, plain(opt)));
  });
  lines.push(row("Feedback", plain(q.feedback)), row());
  return lines;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const combined = [];

for (const mod of mods) {
  const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, `module-${mod}.json`), "utf8"));
  const lines = [row(`// Module ${mod} — ${data.title} — Check on Learning`)];
  data.quiz.forEach((q, i) => lines.push(...questionRows(mod, i + 1, q)));
  fs.writeFileSync(path.join(OUT_DIR, `m${mod}-check.csv`), lines.join("\n") + "\n");
  combined.push(...lines);
  console.log(`m${mod}-check.csv  (${data.quiz.length} questions)`);
}

const combinedName = `modules-${mods[0]}-${mods[mods.length - 1]}-checks.csv`;
fs.writeFileSync(path.join(OUT_DIR, combinedName), combined.join("\n") + "\n");
console.log(`${combinedName}  (all ${mods.length} modules)`);
