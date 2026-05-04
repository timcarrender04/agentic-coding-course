"use client";

import { useEffect, useState } from "react";

import type { SessionAction, SessionState } from "@/types/session";

export function useSession(initial: SessionState) {
  const [state, setState] = useState<SessionState>(initial);

  useEffect(() => {
    const es = new EventSource("/api/stream");

    es.onmessage = (e) => {
      try {
        const next = JSON.parse(e.data) as SessionState;

        setState(next);
      } catch {}
    };

    return () => es.close();
  }, []);

  return state;
}

export async function dispatchAction(action: SessionAction): Promise<void> {
  await fetch("/api/state", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(action),
  });
}
