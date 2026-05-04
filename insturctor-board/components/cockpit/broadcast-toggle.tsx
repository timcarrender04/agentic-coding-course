"use client";

import { dispatchAction } from "@/lib/use-session";

import { Icon } from "./icon";

export function BroadcastToggle({ on }: { on: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs transition-colors ${
        on
          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] hover:bg-[var(--color-primary-strong)]"
          : "bg-transparent text-white border-slate-500 hover:bg-indigo-800"
      }`}
      onClick={() => dispatchAction({ type: "broadcast", on: !on })}
    >
      <Icon name={on ? "podcasts" : "videocam_off"} className="text-sm" />
      {on ? "Broadcasting" : "Paused"}
    </button>
  );
}
