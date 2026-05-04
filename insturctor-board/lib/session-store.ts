import { EventEmitter } from "node:events";

import type { SessionAction, SessionState } from "@/types/session";
import { getDefaultLesson } from "@/lib/curriculum";

type Store = {
  state: SessionState;
  emitter: EventEmitter;
};

declare global {
  // eslint-disable-next-line no-var
  var __sessionStore: Store | undefined;
}

function makeInitialState(): SessionState {
  const { moduleId, lessonId } = getDefaultLesson();

  return {
    moduleId,
    lessonId,
    stepIndex: 0,
    timerEndsAt: null,
    timerPausedRemainingMs: null,
    broadcastOn: true,
    updatedAt: Date.now(),
  };
}

function getStore(): Store {
  if (!globalThis.__sessionStore) {
    const emitter = new EventEmitter();

    emitter.setMaxListeners(0);
    globalThis.__sessionStore = { state: makeInitialState(), emitter };
  }

  return globalThis.__sessionStore;
}

export function getState(): SessionState {
  return getStore().state;
}

export function dispatch(action: SessionAction): SessionState {
  const store = getStore();
  const prev = store.state;
  let next: SessionState = prev;

  switch (action.type) {
    case "goto":
      next = {
        ...prev,
        moduleId: action.moduleId,
        lessonId: action.lessonId,
        stepIndex: 0,
      };
      break;
    case "step":
      next = { ...prev, stepIndex: Math.max(0, prev.stepIndex + action.delta) };
      break;
    case "setStep":
      next = { ...prev, stepIndex: Math.max(0, action.stepIndex) };
      break;
    case "timerStart":
      next = {
        ...prev,
        timerEndsAt: Date.now() + action.durationMs,
        timerPausedRemainingMs: null,
      };
      break;
    case "timerPause": {
      if (prev.timerEndsAt) {
        const remaining = Math.max(0, prev.timerEndsAt - Date.now());

        next = {
          ...prev,
          timerEndsAt: null,
          timerPausedRemainingMs: remaining,
        };
      }
      break;
    }
    case "timerResume": {
      if (prev.timerPausedRemainingMs != null) {
        next = {
          ...prev,
          timerEndsAt: Date.now() + prev.timerPausedRemainingMs,
          timerPausedRemainingMs: null,
        };
      }
      break;
    }
    case "timerReset":
      next = { ...prev, timerEndsAt: null, timerPausedRemainingMs: null };
      break;
    case "broadcast":
      next = { ...prev, broadcastOn: action.on };
      break;
  }

  next = { ...next, updatedAt: Date.now() };
  store.state = next;
  store.emitter.emit("change", next);

  return next;
}

export function subscribe(listener: (state: SessionState) => void): () => void {
  const { emitter } = getStore();

  emitter.on("change", listener);

  return () => emitter.off("change", listener);
}
