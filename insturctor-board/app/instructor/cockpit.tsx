"use client";

import { useMemo } from "react";
import Link from "next/link";

import type { Module } from "@/types/curriculum";
import type { SessionState } from "@/types/session";

import { useSession } from "@/lib/use-session";
import { BroadcastToggle } from "@/components/cockpit/broadcast-toggle";
import { Icon } from "@/components/cockpit/icon";
import { LessonControls } from "@/components/cockpit/lesson-controls";
import { LessonView } from "@/components/cockpit/lesson-view";
import { SessionTimer } from "@/components/cockpit/session-timer";
import { InstructorScriptPanel } from "@/components/cockpit/instructor-script-panel";
import { SyllabusRail } from "@/components/cockpit/syllabus-rail";

export function InstructorCockpit({
  modules,
  initialState,
}: {
  modules: Module[];
  initialState: SessionState;
}) {
  const state = useSession(initialState);

  const { activeLesson, neighbors } = useMemo(() => {
    const flat: { moduleId: string; lessonId: string; title: string }[] = [];

    for (const m of modules) {
      for (const l of m.lessons) {
        flat.push({ moduleId: m.id, lessonId: l.id, title: l.title });
      }
    }
    const i = flat.findIndex(
      (x) => x.moduleId === state.moduleId && x.lessonId === state.lessonId,
    );
    const mod = modules.find((m) => m.id === state.moduleId);
    const lesson = mod?.lessons.find((l) => l.id === state.lessonId);

    return {
      activeLesson: lesson,
      neighbors: {
        prev: i > 0 ? flat[i - 1] : null,
        next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : null,
      },
    };
  }, [modules, state.moduleId, state.lessonId]);

  if (!activeLesson) {
    return (
      <div className="p-8">
        <p className="text-red-700">
          Lesson not found: {state.moduleId}/{state.lessonId}
        </p>
      </div>
    );
  }

  const activeModule = modules.find((m) => m.id === state.moduleId);

  return (
    <div className="h-screen flex flex-col bg-[var(--color-board)]">
      <header className="flex justify-between items-center w-full px-6 py-3 h-16 bg-[var(--color-cockpit)] text-white border-b-2 border-[var(--color-cockpit-divider)]">
        <div className="flex items-center gap-4">
          <Link
            className="text-lg font-bold text-[var(--color-primary-soft)] font-display"
            href="/"
          >
            Instructor Board
          </Link>
          <span className="h-4 w-px bg-slate-500" />
          <span className="text-slate-300 text-sm">
            {activeModule?.id} {activeModule?.title} · Lesson{" "}
            {activeLesson.id}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <BroadcastToggle on={state.broadcastOn} />
          <Link
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-slate-500 text-xs hover:bg-indigo-800 transition-colors"
            href="/projector"
            target="_blank"
          >
            <Icon className="text-sm" name="cast" />
            Open projector
          </Link>
          <Link
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-slate-500 text-xs hover:bg-indigo-800 transition-colors"
            href="/student"
            target="_blank"
          >
            <Icon className="text-sm" name="groups" />
            Student view
          </Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <SyllabusRail
          activeLessonId={state.lessonId}
          activeModuleId={state.moduleId}
          interactive={true}
          modules={modules}
        />

        <main className="flex-[3] p-8 overflow-y-auto border-r-2 border-[var(--color-panel-edge)]">
          <LessonView lesson={activeLesson} state={state} />
          <div className="mt-8">
            <LessonControls
              next={neighbors.next}
              prev={neighbors.prev}
              state={state}
              totalSteps={activeLesson.steps.length}
            />
          </div>
        </main>

        <aside className="flex-[1.5] min-w-[320px] max-w-[400px] bg-[var(--color-panel-tint)] p-6 flex flex-col gap-6 overflow-y-auto min-h-0">
          <SessionTimer controls={true} state={state} />

          <InstructorScriptPanel lesson={activeLesson} state={state} />

          {activeLesson.presenterNotes ? (
            <div>
              <details className="bg-[var(--color-panel)] border border-[var(--color-panel-edge)] rounded-sm group">
                <summary className="cursor-pointer p-3 text-sm font-bold list-none flex items-center gap-2 [&::-webkit-details-marker]:hidden">
                  <Icon className="text-base opacity-70" name="warning" />
                  Lesson-wide watch-outs (legacy)
                </summary>
                <div className="px-3 pb-3 text-sm leading-relaxed whitespace-pre-line text-[var(--color-ink-soft)] max-h-48 overflow-y-auto border-t border-[var(--color-panel-edge)] pt-3">
                  {activeLesson.presenterNotes}
                </div>
              </details>
            </div>
          ) : null}

          {activeModule?.instructorNotes ? (
            <div>
              <details className="bg-[var(--color-panel)] border border-[var(--color-panel-edge)] rounded-sm">
                <summary className="cursor-pointer p-3 text-sm font-bold list-none [&::-webkit-details-marker]:hidden">
                  Module reference (INSTRUCTOR-NOTES.md)
                </summary>
                <div className="p-3 pt-0 text-xs leading-relaxed whitespace-pre-line text-[var(--color-ink-soft)] max-h-72 overflow-y-auto">
                  {activeModule.instructorNotes.slice(0, 4000)}
                </div>
              </details>
            </div>
          ) : null}

          <div className="mt-auto">
            <p className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-2">
              Shortcuts
            </p>
            <ul className="text-xs space-y-1.5 text-[var(--color-ink-soft)]">
              <li>
                <kbd className="font-code px-1.5 py-0.5 bg-[var(--color-ink)] text-[var(--color-panel)] rounded-sm text-[10px]">
                  →
                </kbd>{" "}
                next step
              </li>
              <li>
                <kbd className="font-code px-1.5 py-0.5 bg-[var(--color-ink)] text-[var(--color-panel)] rounded-sm text-[10px]">
                  ←
                </kbd>{" "}
                previous step
              </li>
              <li>
                <kbd className="font-code px-1.5 py-0.5 bg-[var(--color-ink)] text-[var(--color-panel)] rounded-sm text-[10px]">
                  B
                </kbd>{" "}
                toggle broadcast
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
