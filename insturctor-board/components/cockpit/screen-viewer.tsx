"use client";

import { useEffect, useRef, useState } from "react";
import {
  RemoteTrack,
  Room,
  RoomEvent,
  Track,
} from "livekit-client";

export function ScreenViewer({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasStream, setHasStream] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let room: Room | null = null;

    function attach(track: RemoteTrack) {
      if (track.source === Track.Source.ScreenShare && videoRef.current) {
        track.attach(videoRef.current);
        setHasStream(true);
      } else if (
        track.source === Track.Source.ScreenShareAudio &&
        audioRef.current
      ) {
        track.attach(audioRef.current);
      }
    }

    async function connect() {
      try {
        const res = await fetch("/api/livekit/token?role=viewer");

        if (!res.ok) throw new Error(`token ${res.status}`);
        const { token, url } = (await res.json()) as {
          token: string;
          url: string;
        };

        if (cancelled) return;

        room = new Room({ adaptiveStream: true });
        room
          .on(RoomEvent.TrackSubscribed, (track) => attach(track))
          .on(RoomEvent.TrackUnsubscribed, (track) => {
            track.detach();
            if (track.source === Track.Source.ScreenShare) setHasStream(false);
          });

        await room.connect(url, token);

        for (const p of room.remoteParticipants.values()) {
          for (const pub of p.trackPublications.values()) {
            if (pub.track) attach(pub.track);
          }
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
        }
      }
    }

    void connect();

    return () => {
      cancelled = true;
      room?.disconnect();
    };
  }, []);

  return (
    <div className={className}>
      {error && (
        <p className="text-xs text-red-600">Stream unavailable: {error}</p>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={
          hasStream
            ? "w-full rounded-sm bg-black aspect-video"
            : "hidden"
        }
      />
      <audio ref={audioRef} autoPlay />
      {!hasStream && !error && (
        <div className="text-xs text-[var(--color-ink-faint)] italic">
          Instructor is not sharing their screen.
        </div>
      )}
    </div>
  );
}
