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

export type Module = {
  id: string;
  title: string;
  emoji?: string;
  lessons: Lesson[];
  instructorNotes?: string;
};
