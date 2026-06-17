# Three-Part LMS Redesign — Blueprint

**Status:** Proposal for review. Nothing in the existing curriculum is moved or deleted by this document; it defines the target structure and the work to get there.

**Decisions locked in (from instructor):**
1. **Delivery:** Author in markdown (current source of truth), **export to an external LMS** via SCORM/xAPI. Recommended LMS: **Moodle** (see §4).
2. **Credential:** A **workforce certificate aligned to a recognized standard** — requires documented learning objectives, competency mapping, and assessment rigor.
3. **Foundations:** **Distributed** — each tool is taught where it's first needed, not in a separate prerequisite track.

---

## 1. The shape: three parts, one cumulative project

The course collapses from 9 tool-named modules into **three credential-bearing parts**, each ending in a graded checkpoint. The same app (`fastapi-app` → `+ frontend` → `+ agent`) carries through all three parts, so each part's assessment builds on the last.

| Part | Title | Earns | Existing modules folded in |
|---|---|---|---|
| **1** | **Backend Engineering with AI Assistance** | Backend competency badge | `00` Cursor, `01` Terminal, `02` Docker, `04` Git/Gitea, `03` FastAPI, `05` Local GPU + Continue |
| **2** | **Frontend Engineering with AI Assistance** | Frontend competency badge | `06` HeroUI/Next.js frontend |
| **3** | **Capstone: Agentic Application** | Capstone badge → **full certificate** | `07` Agents & tool use, `08` MCP + capstone *(to be authored)* |

**Certificate is issued when all three badges are earned.** Each part is independently gradeable so a learner can pause between parts (important for cohort/workforce scheduling).

### Where the distributed foundations land

Per the "distribute across parts" decision, foundation tooling is taught at first point of use, not up front:

- **Part 1 (Backend):** Cursor IDE → terminal → Docker → Git/Gitea are all prerequisites *for backend work*, so they open Part 1. Local GPU + Continue is introduced here and first applied against the FastAPI codebase.
- **Part 2 (Frontend):** Node.js install + the frontend toolchain live here (first needed for Next.js). Continue is reused, not re-taught.
- **Part 3 (Capstone):** The Claude API, agents/tool-use, and MCP setup are introduced here as capstone-specific foundations.

> **Naming note:** the on-disk module directories (`00-…`–`08-…`) stay as-is — the LMS parts are an *export grouping*, not a directory rename. `lib/curriculum.ts` already derives structure from directory prefixes, so a thin `parts.config.ts` mapping (part → module IDs) is all that's needed to group them. This keeps the live instructor-board working unchanged.

---

## 2. Per-part breakdown

### Part 1 — Backend Engineering with AI Assistance
- **Outcome:** Learner ships a containerized FastAPI + Postgres service with multiple resources, ORM persistence, DI-based auth, and proper HTTP semantics, using an AI assistant (local Ollama + Continue) and Git.
- **Modules:** `00, 01, 02, 04, 03, 05` (taught roughly in that dependency order).
- **Graded checkpoint:** `03/12-final-checkpoint.md` — already a 10-step acceptance test (the `Profile` resource). **This becomes the Part 1 practical exam, mostly auto-gradeable** (see §3).
- **Est. effort:** ~16–18 of the current 32 instructor hours.

### Part 2 — Frontend Engineering with AI Assistance
- **Outcome:** Learner builds a Next.js + HeroUI frontend that talks to their Part 1 backend over CORS, and ships a new feature end-to-end using AI assistance + Git branching/PR workflow.
- **Modules:** `06`.
- **Graded checkpoint:** `06/07-final-checkpoint.md` — the client-side search feature, built via Continue, committed on a branch. Already includes a self-grade rubric.
- **Est. effort:** ~4–5 hours.

### Part 3 — Capstone: Agentic Application *(content gap — must be authored)*
- **Outcome:** Learner builds a small agentic tool: an LLM that calls tools (including their own FastAPI endpoints), optionally via MCP, and demos it.
- **Modules:** `07` (agents & tool use), `08` (MCP + capstone) — **proposed in `COURSE-SCHEDULE.md` but no lesson files exist yet.**
- **Graded checkpoint:** capstone project + demo, graded against a **rubric** (the only instructor-graded item; everything else can be auto/peer-graded).
- **Est. effort:** ~8 hours. **This is the largest authoring gap.**

---

## 3. Assessments → LMS graded items

The existing checkpoints are already structured as `spec → acceptance test → submission artifact`, which maps directly onto LMS scoring. Three assessment mechanisms:

1. **Auto-graded acceptance tests (preferred).** Checkpoints like `03/12` are a list of `curl`/`docker`/`psql` commands with exact expected outputs. Ship a small **lab harness script** (`labs/grade.sh` per part) that runs the acceptance test against the learner's running stack and emits a pass/fail + an **xAPI statement** (`actor passed activity`) the LMS records. This is the cornerstone of "aligned to a standard" — objective, reproducible scoring.
2. **Artifact submission + auto-check.** Screenshot/PR-link upload (already required today) plus a lightweight `grep`/`git log` sanity check, as `06/07` already does.
3. **Rubric-graded (capstone only).** Instructor or peer scoring against published criteria, recorded as a competency outcome in the LMS.

Each lesson gets explicit, numbered **learning objectives** in frontmatter so they can be tagged to competencies (§5). Today objectives are implicit in the "What you should be able to do now" sections — those become the formal objective list.

---

## 4. LMS export architecture (markdown → SCORM/xAPI)

**Source of truth stays markdown.** We add a build step, not a CMS.

```
course markdown (00-…/08-…)
        │
        ├─ parts.config.ts            ← maps Part → module IDs, objectives, competencies
        │
   build/export-scorm.ts             ← reuses insturctor-board/lib/curriculum.ts parser
        │                               (already extracts title/preamble/steps/code,
        │                                and strips ```instructor```-only blocks)
        ▼
   dist/part-1.zip  part-2.zip  part-3.zip   ← SCORM 2004 / cmi5 packages
        │
        ▼
   Moodle (or Canvas/Teachable) ── enrollment, progress, competency tracking, certificate
```

- **Why reuse the existing parser:** `insturctor-board/lib/curriculum.ts` already parses lessons into steps/code/notes and, critically, **strips instructor-only `\`\`\`instructor` fences** — so the student-facing export is correct by construction.
- **Lab/checkpoint scoring** flows back to the LMS as **xAPI statements** from the `grade.sh` harness (cmi5 is the cleanest fit for hands-on labs that run outside the LMS iframe).
- **Recommended LMS — Moodle**, because the credential must be standard-aligned: Moodle has first-class **Competency Frameworks**, learning-plan tracking, SCORM + cmi5/xAPI support, cohort enrollment, and a **Certificate** plugin — all OSS/self-hostable. Canvas is the alternative if an institution mandates it; Teachable is viable only if we drop competency-level tracking (it can't model standard alignment well).

---

## 5. Credentialing — aligning to a standard

This is the work that turns "course completion" into a "workforce cert." It is **process + documentation**, not just code:

1. **Pick the framework.** Recommended anchor: **O*NET 15-1252.00 (Software Developers)** task/skill statements, and/or a **DOL Registered Apprenticeship** competency model for software development. *The specific accreditor/board is yours to confirm* (see open decisions) — it determines the exact competency codes and any required seat-time/assessment-integrity rules.
2. **Write a competency map** (`CERTIFICATION.md`): every lesson objective → one or more framework competency codes → the assessment item that proves it. Reviewers and auditors read this document.
3. **Tighten assessment integrity** to the standard's bar: unique-per-learner lab specs or randomized parameters, recorded xAPI evidence, and a defined passing threshold per part.
4. **Define issuance:** certificate template, expiry/renewal policy, and verification (recommend **Open Badges 2.0 / 3.0** so the credential is portable and verifiable — Moodle supports this natively).

---

## 6. Gap analysis & roadmap

| # | Work item | Type | Blocker? |
|---|---|---|---|
| 1 | Author Part 3 lessons (`07` agents, `08` MCP + capstone) + capstone rubric | **Content** | Yes — biggest gap |
| 2 | Add numbered learning objectives to every lesson's frontmatter | Content | For §5 |
| 3 | `parts.config.ts` — Part → module/objective/competency mapping | Code | Small |
| 4 | `build/export-scorm.ts` — SCORM/cmi5 packager reusing existing parser | Code | Medium |
| 5 | `labs/grade.sh` per part — acceptance-test harness emitting xAPI | Code | Medium |
| 6 | `CERTIFICATION.md` — competency map to chosen framework | Doc | After framework chosen |
| 7 | Stand up Moodle, import packages, configure competency framework + cohorts + cert | Ops | After 3–6 |

**Suggested phasing:**
- **Phase A — Foundations:** items 2 + 3 (objectives + part mapping). Low risk, makes everything else possible.
- **Phase B — Pipeline:** items 4 + 5 against Parts 1 & 2 (which already have content + checkpoints). Validates the whole export→grade loop on real material before authoring more.
- **Phase C — Capstone & cert:** item 1 (author Part 3) + item 6 (competency map) + item 7 (Moodle stand-up).

---

## 7. Open decisions (need instructor input)

- [ ] **Which standard/accreditor** anchors the cert (O*NET, a DOL apprenticeship model, a state workforce board, an industry cert)? This unblocks `CERTIFICATION.md`.
- [ ] **Self-hosted Moodle vs. MoodleCloud vs. an institution's existing Canvas** — affects ops effort in item 7.
- [ ] **Cohort vs. fully self-paced** — the current `COURSE-SCHEDULE.md` is cohort/instructor-led; self-paced export changes pacing language in the lessons.
- [ ] **Capstone scope** for Part 3 — confirm/revise the `07`/`08` outline in `COURSE-SCHEDULE.md` before authoring.
- [ ] **Assessment integrity bar** required by the chosen standard (proctoring? unique specs? minimum score?).
```
