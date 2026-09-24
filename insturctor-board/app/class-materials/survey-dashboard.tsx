"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type ViewId = "overview" | "question" | "built" | "talking";

type Question = {
  id: string;
  short: string;
  title: string;
  avg: number;
  kind: "confidence" | "skill" | "knowledge";
  dist: { label: string; count: number; pct: number }[];
};

const QUESTIONS: Question[] = [
  {
    id: "code",
    short: "Code confidence",
    title: "Q1. How confident are you writing code in any programming language?",
    avg: 1.7,
    kind: "confidence",
    dist: [
      { label: "1 — Not at all", count: 29, pct: 50 },
      { label: "2 — Slightly", count: 20, pct: 34 },
      { label: "3 — Somewhat", count: 7, pct: 12 },
      { label: "4 — Confident", count: 2, pct: 3 },
      { label: "5 — Very", count: 0, pct: 0 },
    ],
  },
  {
    id: "terminal",
    short: "Terminal skill",
    title: "Q2. What is your skill level in using a terminal / command line?",
    avg: 2.3,
    kind: "skill",
    dist: [
      { label: "1 — Beginner", count: 8, pct: 14 },
      { label: "2 — Basic", count: 31, pct: 53 },
      { label: "3 — Intermediate", count: 14, pct: 24 },
      { label: "4 — Advanced", count: 4, pct: 7 },
      { label: "5 — Expert", count: 1, pct: 2 },
    ],
  },
  {
    id: "git",
    short: "Git knowledge",
    title: "Q3. How would you rate your knowledge of Git?",
    avg: 1.7,
    kind: "knowledge",
    dist: [
      { label: "1 — None", count: 29, pct: 50 },
      { label: "2 — Awareness", count: 18, pct: 31 },
      { label: "3 — Familiar", count: 9, pct: 16 },
      { label: "4 — Solid", count: 1, pct: 2 },
      { label: "5 — Strong", count: 1, pct: 2 },
    ],
  },
  {
    id: "debug",
    short: "Debug confidence",
    title: "Q4. How confident are you finding and fixing bugs in code?",
    avg: 1.6,
    kind: "confidence",
    dist: [
      { label: "1 — Not at all", count: 33, pct: 57 },
      { label: "2 — Slightly", count: 17, pct: 29 },
      { label: "3 — Somewhat", count: 5, pct: 9 },
      { label: "4 — Confident", count: 3, pct: 5 },
      { label: "5 — Very", count: 0, pct: 0 },
    ],
  },
  {
    id: "docker",
    short: "Docker skill",
    title: "Q5. What is your skill level in working with Docker?",
    avg: 1.4,
    kind: "skill",
    dist: [
      { label: "1 — Beginner", count: 37, pct: 64 },
      { label: "2 — Basic", count: 18, pct: 31 },
      { label: "3 — Intermediate", count: 1, pct: 2 },
      { label: "4 — Advanced", count: 2, pct: 3 },
      { label: "5 — Expert", count: 0, pct: 0 },
    ],
  },
  {
    id: "read",
    short: "Reading code",
    title: "Q6. Knowledge of reading and understanding code written by someone else?",
    avg: 1.9,
    kind: "knowledge",
    dist: [
      { label: "1 — None", count: 23, pct: 40 },
      { label: "2 — Awareness", count: 21, pct: 36 },
      { label: "3 — Familiar", count: 9, pct: 16 },
      { label: "4 — Solid", count: 5, pct: 9 },
      { label: "5 — Strong", count: 0, pct: 0 },
    ],
  },
  {
    id: "aiConf",
    short: "AI confidence",
    title: "Q7. How confident are you using AI tools while writing or debugging code?",
    avg: 2.2,
    kind: "confidence",
    dist: [
      { label: "1 — Not at all", count: 18, pct: 31 },
      { label: "2 — Slightly", count: 17, pct: 29 },
      { label: "3 — Somewhat", count: 16, pct: 28 },
      { label: "4 — Confident", count: 5, pct: 9 },
      { label: "5 — Very", count: 2, pct: 3 },
    ],
  },
  {
    id: "prompt",
    short: "Prompt / review",
    title: "Q8. Skill in writing prompts, reviewing AI output, and catching mistakes?",
    avg: 2.2,
    kind: "skill",
    dist: [
      { label: "1 — Beginner", count: 14, pct: 24 },
      { label: "2 — Basic", count: 19, pct: 33 },
      { label: "3 — Intermediate", count: 22, pct: 38 },
      { label: "4 — Advanced", count: 3, pct: 5 },
      { label: "5 — Expert", count: 0, pct: 0 },
    ],
  },
  {
    id: "learn",
    short: "Learning tools",
    title: "Q9. Knowledge of learning a new editor, framework, or dev tool on your own?",
    avg: 2.0,
    kind: "knowledge",
    dist: [
      { label: "1 — None", count: 24, pct: 41 },
      { label: "2 — Awareness", count: 16, pct: 28 },
      { label: "3 — Familiar", count: 12, pct: 21 },
      { label: "4 — Solid", count: 5, pct: 9 },
      { label: "5 — Strong", count: 1, pct: 2 },
    ],
  },
];

const BUILT = [
  { label: "No — not yet", value: 39, pct: 67, color: "var(--color-warn)" },
  {
    label: "Small projects / tutorials",
    value: 14,
    pct: 24,
    color: "#c47a1a",
  },
  {
    label: "Built & shipped a real app",
    value: 5,
    pct: 9,
    color: "var(--color-primary)",
  },
];

const VIEWS: { id: ViewId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "question", label: "By question" },
  { id: "built", label: "Built an app?" },
  { id: "talking", label: "Talking points" },
];

function BarRow({
  label,
  value,
  max,
  suffix = "",
  accent = "var(--color-secondary)",
}: {
  label: string;
  value: number;
  max: number;
  suffix?: string;
  accent?: string;
}) {
  const width = max > 0 ? Math.max((value / max) * 100, value > 0 ? 2 : 0) : 0;

  return (
    <div className="grid grid-cols-[minmax(7rem,11rem)_1fr_3.5rem] items-center gap-3 py-1.5">
      <span className="text-sm text-[var(--color-ink-soft)] truncate">
        {label}
      </span>
      <div className="h-3 rounded-sm bg-[var(--color-panel-tint)] overflow-hidden">
        <div
          className="h-full rounded-sm transition-[width] duration-300"
          style={{ width: `${width}%`, background: accent }}
        />
      </div>
      <span className="text-sm font-code text-right tabular-nums">
        {value}
        {suffix}
      </span>
    </div>
  );
}

export function SurveyDashboard() {
  const [view, setView] = useState<ViewId>("overview");
  const [questionId, setQuestionId] = useState(QUESTIONS[0].id);
  const [distMode, setDistMode] = useState<"pct" | "count">("pct");

  const active = useMemo(
    () => QUESTIONS.find((q) => q.id === questionId) ?? QUESTIONS[0],
    [questionId],
  );

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-label-caps text-[var(--color-primary)]">
              Class materials · Baseline survey
            </p>
            <Link
              className="text-sm text-[var(--color-ink-faint)] hover:text-[var(--color-primary)]"
              href="/"
            >
              ← Instructor Board
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display">
            Agentic Coding Baseline Survey
          </h1>
          <p className="text-[var(--color-ink-soft)]">
            58 submissions · Jul 20, 2026 · Aggregate ratings only — share this
            page in Zoom for class discussion
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Responses" value="58" />
          <StatCard label="Avg confidence" value="1.9" hint="/5" warn />
          <StatCard label="Avg skill" value="2.0" hint="/5" />
          <StatCard label="Avg knowledge" value="1.9" hint="/5" />
        </div>

        <div className="flex flex-wrap gap-2">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              className={`px-3 py-1.5 text-sm font-medium border-2 transition-colors ${
                view === v.id
                  ? "bg-[var(--color-ink)] text-[var(--color-panel)] border-[var(--color-ink)]"
                  : "bg-[var(--color-panel)] border-[var(--color-panel-edge)] hover:border-[var(--color-ink)]"
              }`}
              type="button"
              onClick={() => setView(v.id)}
            >
              {v.label}
            </button>
          ))}
        </div>

        {view === "overview" && (
          <section className="space-y-6">
            <Callout>
              Overall average is about <strong>1.9 / 5</strong>. Most students
              are beginners. AI-related ratings are slightly higher than coding,
              Git, and Docker — a useful entry point for the course.
            </Callout>

            <Panel title="Average rating by topic (1–5 scale)">
              <div className="space-y-1">
                {[...QUESTIONS]
                  .sort((a, b) => b.avg - a.avg)
                  .map((q) => (
                    <BarRow
                      key={q.id}
                      accent={
                        q.avg < 1.8
                          ? "var(--color-warn)"
                          : "var(--color-secondary)"
                      }
                      label={q.short}
                      max={5}
                      value={q.avg}
                    />
                  ))}
              </div>
              <p className="mt-4 text-xs text-[var(--color-ink-faint)]">
                Vertical dashed reference would be cohort mean 1.91 · Source:
                Agentic Coding Baseline Survey · n=58
              </p>
            </Panel>

            <div className="grid md:grid-cols-2 gap-4">
              <Panel title="Highest relative strengths">
                <SimpleTable
                  rows={[
                    ["Terminal / CLI", "2.3"],
                    ["AI tool confidence", "2.2"],
                    ["Prompt + review skill", "2.2"],
                    ["Learning new tools", "2.0"],
                  ]}
                />
              </Panel>
              <Panel title="Biggest gaps to close early">
                <SimpleTable
                  rows={[
                    ["Docker", "1.4"],
                    ["Debugging confidence", "1.6"],
                    ["Writing code", "1.7"],
                    ["Git", "1.7"],
                  ]}
                />
              </Panel>
            </div>
          </section>
        )}

        {view === "question" && (
          <section className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  className={`px-3 py-1.5 text-sm border transition-colors ${
                    questionId === q.id
                      ? "bg-[var(--color-secondary)] text-white border-[var(--color-secondary)]"
                      : "bg-[var(--color-panel)] border-[var(--color-panel-edge)] hover:border-[var(--color-secondary)]"
                  }`}
                  type="button"
                  onClick={() => setQuestionId(q.id)}
                >
                  {q.short}
                </button>
              ))}
            </div>

            <Panel
              title={active.title}
              trailing={
                <div className="flex gap-1">
                  <ModeChip
                    active={distMode === "pct"}
                    label="Percent"
                    onClick={() => setDistMode("pct")}
                  />
                  <ModeChip
                    active={distMode === "count"}
                    label="Count"
                    onClick={() => setDistMode("count")}
                  />
                </div>
              }
            >
              <p className="mb-4 text-sm text-[var(--color-ink-soft)]">
                Average{" "}
                <strong className="font-code text-[var(--color-ink)]">
                  {active.avg.toFixed(1)}
                </strong>{" "}
                / 5 · {active.kind} scale · n=58
              </p>
              <div className="space-y-1">
                {active.dist.map((d) => (
                  <BarRow
                    key={d.label}
                    accent="var(--color-secondary)"
                    label={d.label}
                    max={distMode === "pct" ? 70 : 40}
                    suffix={distMode === "pct" ? "%" : ""}
                    value={distMode === "pct" ? d.pct : d.count}
                  />
                ))}
              </div>
            </Panel>
          </section>
        )}

        {view === "built" && (
          <section className="grid md:grid-cols-2 gap-4">
            <Panel title="Have you ever built an application?">
              <div className="space-y-3">
                {BUILT.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{b.label}</span>
                      <span className="font-code">
                        {b.pct}% ({b.value})
                      </span>
                    </div>
                    <div className="h-4 rounded-sm bg-[var(--color-panel-tint)] overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${b.pct}%`,
                          background: b.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="What this means for the course">
              <ul className="space-y-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                <li>
                  <strong className="text-[var(--color-ink)]">67%</strong> have
                  not built an app — end-to-end projects are the main vehicle.
                </li>
                <li>
                  <strong className="text-[var(--color-ink)]">24%</strong> have
                  tutorial experience — peer helpers, still need Git/Docker
                  workflows.
                </li>
                <li>
                  Only <strong className="text-[var(--color-ink)]">9%</strong>{" "}
                  have shipped — stretch pace, not the default.
                </li>
              </ul>
            </Panel>
          </section>
        )}

        {view === "talking" && (
          <section className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Panel title="Open with honesty">
                <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  Half the class is “not confident at all” writing code. That is
                  expected — we start from step zero. Debugging is the lowest
                  confidence area (avg 1.6; 57% at level 1).
                </p>
              </Panel>
              <Panel title="Use the AI foothold">
                <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  AI confidence (2.2) and prompt/review (2.2) are relative
                  strengths. Lean on prompting + output review first, then
                  backfill code reading, Git, and Docker.
                </p>
              </Panel>
              <Panel title="Support groups">
                <ul className="text-sm space-y-2 text-[var(--color-ink-soft)]">
                  <li>Low code/debug (1–2): foundational labs</li>
                  <li>Docker/Git at 1: intro workshops before milestones</li>
                  <li>No app yet (67%): one end-to-end project path</li>
                </ul>
              </Panel>
              <Panel title="Goal themes students named">
                <ul className="text-sm space-y-2 text-[var(--color-ink-soft)]">
                  <li>AI for coding and agentic workflows</li>
                  <li>Build basics: code, apps, programming skills</li>
                  <li>Automation and IT/tech careers</li>
                  <li>Security verification and secure apps</li>
                </ul>
              </Panel>
            </div>

            <Panel title="Five numbers worth saying out loud">
              <SimpleTable
                headers={["Finding", "Number", "Class line"]}
                rows={[
                  [
                    "Not confident writing code",
                    "50%",
                    "We assume zero — that is fine.",
                  ],
                  [
                    "Never built an application",
                    "67%",
                    "Your first real app is a course outcome.",
                  ],
                  [
                    "No Docker experience",
                    "64%",
                    "Containers come with the project.",
                  ],
                  [
                    "No Git knowledge yet",
                    "50%",
                    "Version control starts week one.",
                  ],
                  [
                    "Not confident debugging",
                    "57%",
                    "Debugging is practiced every lab.",
                  ],
                ]}
              />
            </Panel>
          </section>
        )}
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  hint,
  warn,
}: {
  label: string;
  value: string;
  hint?: string;
  warn?: boolean;
}) {
  return (
    <div className="bg-[var(--color-panel)] border border-[var(--color-panel-edge)] p-4">
      <p
        className={`text-3xl font-bold font-display tabular-nums ${
          warn ? "text-[var(--color-warn)]" : ""
        }`}
      >
        {value}
        {hint ? (
          <span className="text-base font-normal text-[var(--color-ink-faint)]">
            {" "}
            {hint}
          </span>
        ) : null}
      </p>
      <p className="mt-1 text-xs text-[var(--color-ink-faint)]">{label}</p>
    </div>
  );
}

function Panel({
  title,
  children,
  trailing,
}: {
  title: string;
  children: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--color-panel)] border border-[var(--color-panel-edge)] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold font-display">{title}</h2>
        {trailing}
      </div>
      {children}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-[var(--color-primary)] bg-[var(--color-panel)] px-4 py-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
      {children}
    </div>
  );
}

function ModeChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`px-2 py-1 text-xs border ${
        active
          ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)]"
          : "border-[var(--color-panel-edge)]"
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function SimpleTable({
  headers = ["Topic", "Avg"],
  rows,
}: {
  headers?: string[];
  rows: string[][];
}) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-[var(--color-ink-faint)] border-b border-[var(--color-panel-edge)]">
          {headers.map((h) => (
            <th key={h} className="pb-2 font-medium">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.join("|")}
            className="border-b border-[var(--color-panel-edge)] last:border-0"
          >
            {row.map((cell, i) => (
              <td
                key={`${cell}-${i}`}
                className={`py-2 ${i > 0 ? "font-code" : ""}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
