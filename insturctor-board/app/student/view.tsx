"use client";

import Link from "next/link";

import type { Module } from "@/types/curriculum";
import type { SessionState } from "@/types/session";

import { useSession } from "@/lib/use-session";
import { Icon } from "@/components/cockpit/icon";
import { LessonView } from "@/components/cockpit/lesson-view";
import { SessionTimer } from "@/components/cockpit/session-timer";

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

  return (
    <div className="min-h-screen bg-[var(--color-board)]">
      <header className="bg-[var(--color-cockpit)] text-white px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            className="text-base font-bold text-[var(--color-primary-soft)] font-display"
            href="/"
          >
            Student
          </Link>
          <span className="h-4 w-px bg-slate-500" />
          <span className="text-slate-300 text-xs">
            {mod?.id} · Lesson {lesson.id}
          </span>
        </div>
        <div className="flex items-center gap-3">
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

      <main className="max-w-[1100px] mx-auto p-6 md:p-10">
        <LessonView
          lesson={lesson}
          showCompletionToggles
          state={state}
        />
      </main>

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
