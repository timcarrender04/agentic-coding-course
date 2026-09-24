"use client";

import Link from "next/link";

import type { Module } from "@/types/curriculum";
import type { SessionState } from "@/types/session";

import { useSession } from "@/lib/use-session";
import { Icon } from "@/components/cockpit/icon";
import { LessonView } from "@/components/cockpit/lesson-view";
import { SessionTimer } from "@/components/cockpit/session-timer";
import { SyllabusRail } from "@/components/cockpit/syllabus-rail";

export function StudentView({
  modules,
  initialState,
}: {
  modules: Module[];
  initialState: SessionState;
}) {
  const state = useSession(initialState);
  const mod = modules.find((m) => m.id === state.moduleId);
  const lesson = mod?.lessons.find((l) => l.id === state.lessonId);

  if (!lesson) return null;

  const stepIdx =
    lesson.steps.length > 0
      ? Math.max(
          0,
          Math.min(state.stepIndex, lesson.steps.length - 1),
        )
      : 0;
  const stepProgress =
    lesson.steps.length > 0
      ? `Step ${stepIdx + 1} / ${lesson.steps.length}`
      : null;

  return (
    <div className="h-screen flex flex-col bg-[var(--color-board)] overflow-hidden">
      <header className="shrink-0 bg-[var(--color-cockpit)] text-white px-6 py-3 flex items-center justify-between z-30 border-b-2 border-[var(--color-cockpit-divider)]">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            className="text-base font-bold text-[var(--color-primary-soft)] font-display shrink-0"
            href="/"
          >
            Student
          </Link>
          <span className="h-4 w-px bg-slate-500 shrink-0" />
          <div className="min-w-0 flex flex-col gap-0.5">
            <span className="text-slate-300 text-xs truncate md:hidden">
              <span className="text-[var(--color-primary-soft)] font-semibold">
                Now:{" "}
              </span>
              {mod?.id} {mod?.title} · L{lesson.id} — {lesson.title}
            </span>
            <span className="text-slate-300 text-xs truncate hidden md:inline">
              {mod?.id} {mod?.title} · Lesson {lesson.id} — {lesson.title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {stepProgress ? (
            <span className="hidden sm:inline text-[10px] uppercase tracking-wide text-slate-400 border border-slate-500 rounded-sm px-2 py-1">
              {stepProgress}
            </span>
          ) : null}
          <span
            className={`flex items-center gap-1.5 text-xs ${
              state.broadcastOn ? "text-[var(--color-primary-soft)]" : "text-slate-400"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                state.broadcastOn
                  ? "bg-[var(--color-primary-soft)] animate-pulse"
                  : "bg-slate-400"
              }`}
            />
            {state.broadcastOn ? "Following instructor" : "Paused"}
          </span>
          <div className="hidden md:block w-44">
            <div className="font-code text-sm tabular-nums bg-[var(--color-ink)] px-3 py-1 rounded-sm">
              {formatTimer(state)}
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        <div className="hidden md:flex shrink-0 h-full">
          <SyllabusRail
            activeLessonId={state.lessonId}
            activeModuleId={state.moduleId}
            interactive={false}
            modules={modules}
          />
        </div>

        <main className="flex-1 min-w-0 overflow-y-auto p-6 md:p-10">
          <div className="max-w-[1100px] mx-auto">
            <LessonView
              lesson={lesson}
              showCompletionToggles
              state={state}
            />
          </div>
        </main>
      </div>

      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-[var(--color-ink)] text-white p-3 rounded-sm flex items-center justify-between shadow-lg">
        <span className="text-xs flex items-center gap-1.5">
          <Icon className="text-sm" name="schedule" />
          Timer
        </span>
        <span className="font-code tabular-nums">{formatTimer(state)}</span>
      </div>
    </div>
  );
}

function formatTimer(state: SessionState): string {
  const remaining = state.timerEndsAt
    ? Math.max(0, state.timerEndsAt - Date.now())
    : (state.timerPausedRemainingMs ?? 0);
  const min = Math.floor(remaining / 60000);
  const sec = Math.floor((remaining % 60000) / 1000);

  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
