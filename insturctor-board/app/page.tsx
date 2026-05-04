import Link from "next/link";

import { loadCurriculum } from "@/lib/curriculum";

export default function Home() {
  const modules = loadCurriculum();
  const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <p className="text-label-caps text-[var(--color-primary)] mb-3">
          Agentic Coding · classroom dashboard
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight font-display">
          Instructor Board
        </h1>
        <p className="mt-4 text-lg text-[var(--color-ink-soft)]">
          Three coordinated views over the same lesson:{" "}
          <strong>{modules.length}</strong> modules ·{" "}
          <strong>{totalLessons}</strong> lessons. The instructor advances; the
          projector and student devices follow within a second.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          <LaunchCard
            blurb="The cockpit. Drives session state for everyone."
            color="primary"
            href="/instructor"
            kbd="I"
            title="Instructor"
          />
          <LaunchCard
            blurb="Clean view for the beamer. Read-only mirror."
            color="ink"
            href="/projector"
            kbd="P"
            title="Projector"
          />
          <LaunchCard
            blurb="Student companion. Mark steps as you go."
            color="secondary"
            href="/student"
            kbd="S"
            title="Student"
          />
        </div>

        <p className="mt-10 text-sm text-[var(--color-ink-faint)]">
          Source: {modules.map((m) => `${m.id}-${m.title}`).join(" · ")}
        </p>
      </div>
    </main>
  );
}

function LaunchCard({
  href,
  title,
  blurb,
  kbd,
  color,
}: {
  href: string;
  title: string;
  blurb: string;
  kbd: string;
  color: "primary" | "ink" | "secondary";
}) {
  const accent =
    color === "primary"
      ? "border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
      : color === "secondary"
        ? "border-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white"
        : "border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white";

  return (
    <Link
      className={`group block p-5 bg-[var(--color-panel)] border-2 ${accent} transition-colors`}
      href={href}
    >
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-bold font-display">{title}</h2>
        <kbd className="font-code text-xs px-2 py-1 bg-[var(--color-ink)] text-[var(--color-panel)] rounded-sm">
          {kbd}
        </kbd>
      </div>
      <p className="mt-2 text-sm leading-relaxed">{blurb}</p>
      <p className="mt-4 text-label-caps text-[var(--color-primary)] group-hover:text-white">
        Open →
      </p>
    </Link>
  );
}
