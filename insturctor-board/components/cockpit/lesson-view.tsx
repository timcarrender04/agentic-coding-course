"use client";

import { useEffect, useRef, useState } from "react";

import type { Lesson } from "@/types/curriculum";
import type { SessionState } from "@/types/session";

import { LessonStepCard } from "./lesson-step-card";

export function LessonView({
  lesson,
  state,
  scale = "default",
  showCompletionToggles = false,
}: {
  lesson: Lesson;
  state: SessionState;
  scale?: "default" | "projector";
  showCompletionToggles?: boolean;
}) {
  const stepIndex = clamp(state.stepIndex, 0, lesson.steps.length - 1);
  const scrollKey = `${state.moduleId}:${state.lessonId}:${stepIndex}`;
  const titleSize =
    scale === "projector"
      ? "text-5xl md:text-6xl"
      : "text-3xl md:text-4xl";

  return (
    <article className="flex flex-col gap-6 max-w-[1100px]">
      <header>
        <p className="text-label-caps text-[var(--color-primary)] mb-2">
          {state.broadcastOn
            ? `Module ${lesson.moduleId} · Lesson ${lesson.id}`
            : "BROADCAST PAUSED"}
        </p>
        <h1
          className={`${titleSize} font-display font-bold text-[var(--color-ink)]`}
        >
          {lesson.title}
        </h1>
        {lesson.preamble && scale !== "projector" && (
          <p className="mt-3 text-base text-[var(--color-ink-soft)] leading-relaxed">
            {lesson.preamble.split("\n")[0].replace(/\*\*/g, "").slice(0, 240)}
          </p>
        )}
      </header>

      <div className="bg-[var(--color-panel)] border border-[var(--color-panel-edge)] p-6 rounded-sm">
        <ul className="space-y-6">
          {lesson.steps.map((step, i) => (
            <LessonStepRow
              key={step.index}
              scrollKey={scrollKey}
              step={step}
              active={i === stepIndex}
              scale={scale}
              showToggle={showCompletionToggles}
              storageKey={`done:${lesson.moduleId}:${lesson.id}:${step.index}`}
            />
          ))}
        </ul>
        {lesson.steps.length === 0 && (
          <p className="text-[var(--color-ink-soft)] italic">
            No structured steps in this lesson — content is in the lesson
            file&rsquo;s prose. (See raw markdown.)
          </p>
        )}
      </div>
    </article>
  );
}

function LessonStepRow({
  step,
  active,
  scale,
  showToggle,
  scrollKey,
  storageKey,
}: {
  step: import("@/types/curriculum").Step;
  active: boolean;
  scale: "default" | "projector";
  showToggle: boolean;
  scrollKey: string;
  storageKey: string;
}) {
  const [done, setDone] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDone(window.localStorage.getItem(storageKey) === "1");
    }
  }, [storageKey]);

  useEffect(() => {
    if (!active || scale !== "projector") return;

    scrollAnchorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, [active, scale, scrollKey]);

  const toggle = () => {
    const next = !done;

    setDone(next);
    if (typeof window !== "undefined") {
      if (next) window.localStorage.setItem(storageKey, "1");
      else window.localStorage.removeItem(storageKey);
    }
  };

  return (
    <div ref={scrollAnchorRef} className="flex items-start gap-3 scroll-mt-8">
      {showToggle && (
        <button
          aria-label={done ? "Mark step incomplete" : "Mark step complete"}
          className={`flex-shrink-0 mt-1 w-5 h-5 rounded-sm border-2 ${
            done
              ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
              : "border-[var(--color-ink-faint)] hover:border-[var(--color-primary)]"
          }`}
          onClick={toggle}
        >
          {done && (
            <span className="material-symbols-outlined text-white text-sm leading-none">
              check
            </span>
          )}
        </button>
      )}
      <ul className="flex-1">
        <LessonStepCard active={active} scale={scale} step={step} />
      </ul>
    </div>
  );
}

function clamp(n: number, lo: number, hi: number) {
  if (hi < lo) return lo;

  return Math.max(lo, Math.min(hi, n));
}
