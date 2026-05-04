export type SessionState = {
  moduleId: string;
  lessonId: string;
  stepIndex: number;
  timerEndsAt: number | null;
  timerPausedRemainingMs: number | null;
  broadcastOn: boolean;
  updatedAt: number;
};

export type SessionAction =
  | { type: "goto"; moduleId: string; lessonId: string }
  | { type: "step"; delta: number }
  | { type: "setStep"; stepIndex: number }
  | { type: "timerStart"; durationMs: number }
  | { type: "timerPause" }
  | { type: "timerResume" }
  | { type: "timerReset" }
  | { type: "broadcast"; on: boolean };
