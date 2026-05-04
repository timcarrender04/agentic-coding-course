"use client";

import { useEffect, useState } from "react";

import type { SessionState } from "@/types/session";

import { dispatchAction } from "@/lib/use-session";

import { Icon } from "./icon";

export function SessionTimer({
  state,
  controls,
}: {
  state: SessionState;
  controls: boolean;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);

    return () => clearInterval(id);
  }, []);

  const remainingMs = state.timerEndsAt
    ? Math.max(0, state.timerEndsAt - now)
    : (state.timerPausedRemainingMs ?? 0);
  const running = state.timerEndsAt != null;
  const stopped = !running && remainingMs === 0;
  const min = Math.floor(remainingMs / 60000);
  const sec = Math.floor((remainingMs % 60000) / 1000);
  const display = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

  return (
    <div>
      <p className="text-label-caps text-[var(--color-secondary)] mb-2">
        Session timer
      </p>
      <div className="flex items-center justify-between bg-[var(--color-ink)] text-[var(--color-panel)] p-4 rounded-sm">
        <span className="font-code text-3xl tabular-nums">{display}</span>
        {controls && (
          <div className="flex gap-2">
            {!running && remainingMs > 0 && (
              <button
                aria-label="Resume timer"
                className="text-emerald-300 hover:text-emerald-200"
                onClick={() => dispatchAction({ type: "timerResume" })}
              >
                <Icon name="play_arrow" />
              </button>
            )}
            {running && (
              <button
                aria-label="Pause timer"
                className="text-emerald-300 hover:text-emerald-200"
                onClick={() => dispatchAction({ type: "timerPause" })}
              >
                <Icon name="pause" />
              </button>
            )}
            {stopped && (
              <button
                aria-label="Start 15 min"
                className="text-emerald-300 hover:text-emerald-200"
                onClick={() =>
                  dispatchAction({
                    type: "timerStart",
                    durationMs: 15 * 60 * 1000,
                  })
                }
              >
                <Icon name="play_arrow" />
              </button>
            )}
            <button
              aria-label="Reset timer"
              className="text-slate-300 hover:text-white"
              onClick={() => dispatchAction({ type: "timerReset" })}
            >
              <Icon name="refresh" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
