"use client";

import { dispatchAction } from "@/lib/use-session";

import { Icon } from "./icon";

export function CopyToggle({ enabled }: { enabled: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs transition-colors ${
        enabled
          ? "bg-transparent text-white border-slate-500 hover:bg-indigo-800"
          : "bg-amber-900/40 text-amber-100 border-amber-600/60 hover:bg-amber-900/60"
      }`}
      onClick={() => dispatchAction({ type: "copyEnabled", on: !enabled })}
      title="When off, student and projector views hide code copy and discourage text selection"
      type="button"
    >
      <Icon
        className="text-sm"
        name={enabled ? "content_copy" : "block"}
      />
      {enabled ? "Student copy on" : "Student copy off"}
    </button>
  );
}
