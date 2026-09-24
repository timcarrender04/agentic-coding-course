export type StepKind = "instruction" | "code" | "warning" | "checkpoint";

export type Step = {
  index: number;
  kind: StepKind;
  body: string;
  code?: { lang: string; source: string }[];
  /** Optional instructor-only script; stripped from student/projector bodies. */
  instructorScript?: string;
};

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  preamble?: string;
  steps: Step[];
  presenterNotes?: string;
  raw: string;
};

export type Phase = {
  /** Phase number, 1-based. */
  number: number;
  /** Display title, e.g. "Foundations". */
  title: string;
  /** Suggested-pace week span, e.g. "Weeks 1–6". */
  weeks?: string;
};

export type Module = {
  id: string;
  title: string;
  icon?: string;
  /** Present when the module lives under a `phase-N-*` folder. */
  phase?: Phase;
  lessons: Lesson[];
  instructorNotes?: string;
};
