"use client";

import type { Module } from "@/types/curriculum";
import type { SessionState } from "@/types/session";

import { useSession } from "@/lib/use-session";
import { LessonView } from "@/components/cockpit/lesson-view";
import { SessionTimer } from "@/components/cockpit/session-timer";

export function ProjectorView({
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
    <div className="min-h-screen bg-[var(--color-board)] p-12">
      <header className="flex items-end justify-between mb-10 max-w-[1400px] mx-auto">
        <div>
          <p className="text-label-caps text-[var(--color-primary)]">
            {mod?.id} · {mod?.title}
          </p>
          <p className="mt-1 text-2xl font-display font-semibold text-[var(--color-ink-soft)]">
            Lesson {lesson.id}
          </p>
        </div>
        <div className="w-72">
          <SessionTimer controls={false} state={state} />
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto">
        <LessonView lesson={lesson} scale="projector" state={state} />
      </div>

      {!state.broadcastOn && (
        <div className="fixed inset-0 bg-[var(--color-cockpit)]/95 flex items-center justify-center text-white text-4xl font-display">
          <div className="text-center">
            <span className="material-symbols-outlined text-7xl block mb-4">
              videocam_off
            </span>
            BROADCAST PAUSED
          </div>
        </div>
      )}
    </div>
  );
}
