"use client";

import { useEffect, useRef, useState } from "react";
import { Room, Track } from "livekit-client";

import { Icon } from "./icon";

type Status = "idle" | "connecting" | "live" | "error";

export function ScreenBroadcaster() {
  const roomRef = useRef<Room | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function stop() {
    const room = roomRef.current;

    if (room) {
      try {
        await room.localParticipant.setScreenShareEnabled(false);
      } catch {}
      room.disconnect();
      roomRef.current = null;
    }
    setStatus("idle");
  }

  async function start() {
    setError(null);
    setStatus("connecting");
    try {
      const res = await fetch("/api/livekit/token?role=publisher");

      if (!res.ok) throw new Error(`token ${res.status}`);
      const { token, url } = (await res.json()) as {
        token: string;
        url: string;
      };

      const room = new Room({ adaptiveStream: true, dynacast: true });

      await room.connect(url, token);
      roomRef.current = room;

      // If the user clicks "Stop sharing" in the browser chrome, tear down.
      room.localParticipant.on("localTrackUnpublished", (pub) => {
        if (pub.source === Track.Source.ScreenShare) void stop();
      });

      await room.localParticipant.setScreenShareEnabled(true, { audio: true });
      setStatus("live");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setStatus("error");
      await stop();
    }
  }

  useEffect(() => {
    return () => {
      void stop();
    };
  }, []);

  if (status === "live") {
    return (
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-red-300">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          SCREEN LIVE
        </span>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-red-400 bg-red-700/30 text-xs hover:bg-red-700/50 transition-colors"
          type="button"
          onClick={() => void stop()}
        >
          <Icon className="text-sm" name="stop_screen_share" />
          Stop sharing
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-slate-500 text-xs hover:bg-indigo-800 transition-colors disabled:opacity-50"
        disabled={status === "connecting"}
        type="button"
        onClick={() => void start()}
      >
        <Icon className="text-sm" name="screen_share" />
        {status === "connecting" ? "Starting…" : "Share screen"}
      </button>
      {error && <span className="text-xs text-red-300">{error}</span>}
    </div>
  );
}
