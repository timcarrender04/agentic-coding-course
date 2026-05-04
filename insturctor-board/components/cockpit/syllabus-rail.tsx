"use client";

import type { Module } from "@/types/curriculum";

import { dispatchAction } from "@/lib/use-session";

import { Icon } from "./icon";

export function SyllabusRail({
  modules,
  activeModuleId,
  activeLessonId,
  interactive,
}: {
  modules: Module[];
  activeModuleId: string;
  activeLessonId: string;
  interactive: boolean;
}) {
  return (
    <nav className="flex flex-col bg-[var(--color-cockpit)] text-white border-r-2 border-[var(--color-cockpit-divider)] w-72 overflow-y-auto">
      <div className="p-4 border-b border-[var(--color-cockpit-divider)]">
        <p className="text-label-caps text-[var(--color-secondary-soft)]">
          Syllabus
        </p>
        <h2 className="text-sm font-bold mt-1">Module overview</h2>
      </div>
      <ul className="flex flex-col py-2">
        {modules.map((m) => {
          const isActive = m.id === activeModuleId;

          return (
            <li key={m.id}>
              <div
                className={`mx-2 my-0.5 ${
                  isActive
                    ? "bg-[var(--color-primary)] rounded-sm"
                    : interactive && m.lessons.length > 0
                      ? "hover:bg-indigo-700/50 rounded-sm"
                      : "rounded-sm"
                }`}
              >
                {interactive && m.lessons.length > 0 ? (
                  <button
                    className="w-full text-left rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
                    type="button"
                    onClick={() =>
                      dispatchAction({
                        type: "goto",
                        moduleId: m.id,
                        lessonId: m.lessons[0].id,
                      })
                    }
                  >
                    <div className="flex items-center gap-3 px-3 py-2.5">
                      <span className="text-base" aria-hidden>
                        {m.emoji ?? "•"}
                      </span>
                      <span
                        className={`text-xs ${isActive ? "font-bold text-white" : "text-slate-300"}`}
                      >
                        {m.id} {m.title}
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <span className="text-base" aria-hidden>
                      {m.emoji ?? "•"}
                    </span>
                    <span
                      className={`text-xs ${isActive ? "font-bold text-white" : "text-slate-300"}`}
                    >
                      {m.id} {m.title}
                    </span>
                  </div>
                )}
                {isActive && (
                  <ul className="pl-9 pr-3 pb-3 flex flex-col gap-1.5 border-l border-emerald-300/30 ml-5">
                    {m.lessons.map((l) => {
                      const isLessonActive = l.id === activeLessonId;
                      const Inner = (
                        <span
                          className={`text-[11px] flex items-center gap-1.5 ${
                            isLessonActive
                              ? "font-bold text-white"
                              : "opacity-70"
                          }`}
                        >
                          {isLessonActive && (
                            <span className="w-1 h-1 bg-white rounded-full" />
                          )}
                          Lesson {l.id} — {l.title}
                        </span>
                      );

                      return (
                        <li key={l.id}>
                          {interactive ? (
                            <button
                              className="text-left w-full hover:opacity-100 transition-opacity"
                              onClick={() =>
                                dispatchAction({
                                  type: "goto",
                                  moduleId: m.id,
                                  lessonId: l.id,
                                })
                              }
                            >
                              {Inner}
                            </button>
                          ) : (
                            Inner
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto p-4 border-t border-[var(--color-cockpit-divider)] text-[10px] text-slate-400">
        <Icon name="info" className="text-xs align-middle mr-1" />
        Live state synced via SSE
      </div>
    </nav>
  );
}
