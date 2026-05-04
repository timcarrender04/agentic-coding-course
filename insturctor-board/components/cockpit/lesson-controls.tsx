"use client";

import { useEffect } from "react";

import type { SessionState } from "@/types/session";

import { dispatchAction } from "@/lib/use-session";

import { Icon } from "./icon";

export function LessonControls({
  state,
  totalSteps,
  prev,
  next,
}: {
  state: SessionState;
  totalSteps: number;
  prev: { moduleId: string; lessonId: string; title: string } | null;
  next: { moduleId: string; lessonId: string; title: string } | null;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowRight") {
        if (state.stepIndex >= totalSteps - 1 && next) {
          dispatchAction({
            type: "goto",
            moduleId: next.moduleId,
            lessonId: next.lessonId,
          });
        } else {
          dispatchAction({ type: "step", delta: 1 });
        }
      } else if (e.key === "ArrowLeft") {
        if (state.stepIndex === 0 && prev) {
          dispatchAction({
            type: "goto",
            moduleId: prev.moduleId,
            lessonId: prev.lessonId,
          });
        } else {
          dispatchAction({ type: "step", delta: -1 });
        }
      } else if (e.key === "b") {
        dispatchAction({ type: "broadcast", on: !state.broadcastOn });
      }
    }
    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [state.stepIndex, state.broadcastOn, totalSteps, prev, next]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        className="p-4 border border-[var(--color-panel-edge)] bg-[var(--color-panel-tint)] flex items-center gap-3 disabled:opacity-40 hover:bg-[var(--color-panel-edge)] transition-colors text-left"
        disabled={!prev && state.stepIndex === 0}
        onClick={() => {
          if (state.stepIndex === 0 && prev) {
            dispatchAction({
              type: "goto",
              moduleId: prev.moduleId,
              lessonId: prev.lessonId,
            });
          } else {
            dispatchAction({ type: "step", delta: -1 });
          }
        }}
      >
        <Icon className="text-[var(--color-ink-faint)]" name="arrow_back" />
        <div>
          <p className="text-label-caps text-[var(--color-ink-faint)]">
            Previous
          </p>
          <p className="text-sm font-bold">
            {state.stepIndex === 0
              ? (prev?.title ?? "Start")
              : `Step ${state.stepIndex}`}
          </p>
        </div>
      </button>
      <button
        className="p-4 bg-[var(--color-primary)] text-white flex items-center justify-between gap-3 disabled:opacity-40 hover:bg-[var(--color-primary-strong)] transition-colors text-left"
        disabled={!next && state.stepIndex >= totalSteps - 1}
        onClick={() => {
          if (state.stepIndex >= totalSteps - 1 && next) {
            dispatchAction({
              type: "goto",
              moduleId: next.moduleId,
              lessonId: next.lessonId,
            });
          } else {
            dispatchAction({ type: "step", delta: 1 });
          }
        }}
      >
        <div>
          <p className="text-label-caps opacity-70">
            {state.stepIndex >= totalSteps - 1 ? "Next lesson" : "Next step"}
          </p>
          <p className="text-sm font-bold">
            {state.stepIndex >= totalSteps - 1
              ? (next?.title ?? "Done")
              : `Step ${state.stepIndex + 2}`}
          </p>
        </div>
        <Icon name="arrow_forward" />
      </button>
    </div>
  );
}
