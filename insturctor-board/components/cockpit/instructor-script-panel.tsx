"use client";

import { useEffect, useRef } from "react";

import type { Lesson } from "@/types/curriculum";
import type { SessionState } from "@/types/session";

import { Icon } from "./icon";

function clampStepIndex(stepIndex: number, len: number) {
  if (len <= 0) return 0;

  return Math.max(0, Math.min(stepIndex, len - 1));
}

export function InstructorScriptPanel({
  lesson,
  state,
}: {
  lesson: Lesson;
  state: SessionState;
}) {
  const stepIndex = clampStepIndex(state.stepIndex, lesson.steps.length);
  const scrollKey = `${state.moduleId}:${state.lessonId}:${stepIndex}`;

  const segments = lesson.steps
    .map((step, i) => ({
      stepIndex: i,
      script: step.instructorScript,
    }))
    .filter(
      (x): x is { stepIndex: number; script: string } =>
        typeof x.script === "string" && x.script.length > 0,
    );

  const activeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lesson.steps[stepIndex]?.instructorScript) return;

    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [lesson.steps, scrollKey, stepIndex]);

  const hasPerStepScript = segments.length > 0;
  const emptyHint =
    "No per-step script yet—open lesson-wide watch-outs below—or add ```instructor fenced blocks to this lesson's steps.";

  return (
    <div className="flex flex-col gap-3 min-h-0 shrink-0">
      <p className="text-label-caps text-[var(--color-secondary)] flex items-center gap-1.5">
        <Icon className="text-sm" name="speaker_notes" />
        Read from (script)
      </p>

      {hasPerStepScript ? (
        <div className="rounded-sm border border-[var(--color-panel-edge)] bg-[var(--color-panel)] max-h-[min(52vh,28rem)] overflow-y-auto">
          <div className="p-4 space-y-5">
            {segments.map((seg) => {
              const active = seg.stepIndex === stepIndex;

              return (
                <div
                  key={seg.stepIndex}
                  ref={active ? activeRef : undefined}
                  className={`rounded-sm pl-4 pr-3 py-3 border-l-4 scroll-mt-3 transition-colors ${
                    active
                      ? "border-[var(--color-primary)] bg-[var(--color-panel-tint)] shadow-sm"
                      : "border-transparent opacity-75"
                  }`}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-faint)] mb-2">
                    Step {seg.stepIndex + 1}
                  </p>
                  <div className="text-base md:text-lg leading-relaxed text-[var(--color-ink)] whitespace-pre-line">
                    {seg.script}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-sm border border-dashed border-[var(--color-panel-edge)] bg-[var(--color-panel)] p-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
          {lesson.presenterNotes ? emptyHint : "Add optional ```instructor blocks beside numbered steps in the lesson markdown to show a live script here."}
        </div>
      )}
    </div>
  );
}
