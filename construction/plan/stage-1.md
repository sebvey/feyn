# Stage 1: the spec and the course

Milestone `stage-1`. Design: `design/03-spec-linear-course.md`, `design/04-diagrams.md`,
`design/10-migration.md`, `design/09-decisions.md`, `design/11-stages.md`.

Done when: the checks pass on `courses/parcours-po`; the full `taught-check` passes; the old /
new comparison report is empty or explained; the guard holds (the old teacher, on the new
course through a disposable adapter, teaches one concept in a fresh test); `linear-course`
v1.0.0 is tagged.

Source material: the frozen clones `../pdx/parcours-po` (tag `course-v2.5.0`) and
`../pdx/parcours-po-website` (its aligned deployment). Read-only.

### S1-01 Distil the 65 ADRs of parcours-po into four columns
`area=spec:linear-course type=decision model=sonnet depends=- parallel=yes`
- **Reads**: `design/10-migration.md` ("Decision distillation"), `design/09-decisions.md`;
  the ADRs in `../pdx/parcours-po/maintainer/adr/` (or wherever `../pdx/parcours-po` keeps them: check
  its maintenance skill).
- **Observation**: 65 ADRs, mostly teacher behaviour fixes decided after fresh-test failures;
  no file carries over, their marrow must.
- **To do**: a subagent reads every ADR and fills `construction/notes/S1-01-distillation.md`:
  one row per ADR (number, title, one-line gist, column: `protocol rule` / `process rule` /
  `architecture decision` / `POC`, and for the first three the target: rule family of the
  protocol, skill name, or decision slug). A second subagent re-reads the rows classified
  `POC` and challenges each (is a teacher behaviour hiding there?). The session delivers the
  table and a ten-line summary (counts per column, the five to eight architecture decisions
  named). Nothing else is written.
- **Done when**: the table has 65 rows, each with a column and a target; the maintainer has
  validated it (comment on the issue); the validated table is the input of S1-04 and S1-14.

### S1-02 Prototype the new concept folder by hand on concept 9
`area=course:parcours-po type=course model=opus depends=- parallel=yes`
- **Reads**: `design/03-spec-linear-course.md` (all), `design/04-diagrams.md`;
  `../pdx/parcours-po/course/concepts/09-decoupage-vertical.md`,
  `../pdx/parcours-po/course/sources/09-decoupage-vertical.md`,
  `../pdx/parcours-po-website/src/content/concepts/fr/09-decoupage-vertical.mdx`,
  `../pdx/parcours-po-website/src/components/schemas/{Gateau,PartRecoupee}.astro`.
- **Observation**: the concept folder format exists on paper only. Concept 9 has two diagrams,
  four leaf sub-concepts, a rich bank: the right probe.
- **To do**: write `courses/parcours-po/concepts/09-decoupage-vertical/` by hand: `concept.md`
  (frontmatter `description`, `stances`, `neighbors`, `diagrams`; body with the sections and
  the reader-text conventions: `## 9a …` + italic promise, `### 9a1 …`, `[cours]` markers,
  `concept N` references, `**Fil rouge :**` blockquotes, `![…](gateau.svg)`), `teaching.md`
  (Consignes, Faits du fil rouge utilisés, Banque d'exemples with every case and field,
  Schéma), `sources.md`, `gateau.svg` and `part-recoupee.svg` extracted from the Astro
  components and brought under the drawing contract (viewBox, currentColor, three classes,
  `<text>`, named groups). Nothing from the old concept file or the MDX may be lost: a
  section-by-section checklist in `construction/notes/S1-02-prototype.md`, with what the
  format could not express cleanly and what the spec must say because of it.
- **Done when**: the folder exists and reads as plain Markdown; the checklist shows every old
  section mapped; the note lists the spec adjustments it recommends (possibly none); the
  maintainer has read the note.

### S1-03 Write SPEC.md v1: structure, conventions, drawing contract, checks
`area=spec:linear-course type=improvement model=opus depends=S1-02 parallel=no`
- **Reads**: `design/03-spec-linear-course.md`, `design/04-diagrams.md`,
  `design/07-versions-channels-flow.md`, `construction/notes/S1-02-prototype.md`;
  `../pdx/parcours-po/course/templates/*.md` and `../pdx/parcours-po/course/plan.md` for the current
  rules of writing.
- **Observation**: the spec exists as design prose; the prototype has tested the format.
- **To do**: `specs/linear-course/SPEC.md` in English: purpose and scope of the spec; the
  structure (`course.yaml` schema with every field and its meaning; the concept folder; domain
  file; course glossary; storyline; changelog); the reader-text conventions (the table of
  `design/03`, made normative, each with its check); the drawing contract; the list of checks
  with their ids; versioning of the spec and what a course declares. The protocol is a
  separate section written by S1-04 (or `PROTOCOL.md` beside `SPEC.md` if `SPEC.md` would
  exceed about 400 lines: say which in the file's header). `specs/linear-course/README.md`,
  ten lines.
- **Done when**: every field of `course.yaml` and every section of the three concept files is
  defined once, with "mandatory" or "optional"; every convention names its check id; the
  prototype of S1-02 conforms to the text (or the text was adjusted and says why in a note).

### S1-04 Write the pedagogical protocol
`area=spec:linear-course type=improvement model=opus depends=S1-01,S1-03 parallel=no`
- **Reads**: `design/03-spec-linear-course.md` ("Protocol", "Language pack"),
  `design/05-teacher-classroom.md` ("Rewrite risk"); `../pdx/parcours-po/CLAUDE.md` (the whole
  teacher), `../pdx/parcours-po/.claude/skills/learner-onboarding/SKILL.md`;
  `construction/notes/S1-01-distillation.md` (validated), rows `protocol rule`.
- **Observation**: the current teacher's rules are in French, mixed with course specifics,
  and spread over `CLAUDE.md` and 65 ADRs.
- **To do**: the protocol **in French** (bounded exception to the language policy, see
  `design/05-teacher-classroom.md` "Rewrite risk"; S2-09 switches it to English), as numbered
  rules grouped by family (session start,
  domain presentation, the loop, message shape, storyline, stances and sources, dig and skip,
  learner memory, stop), each rule one to three lines, testable, with a "why" line only where
  the distillation marked a regression risk. Every literal phrase and typography rule is
  replaced by a language-pack key (`{question_lead}`), even though the text is French: the
  keys are what the switch will keep untouched. Every course specific (site address,
  storyline name, file names) is replaced by a course parameter (`{course.site_url}`). A table
  at the end: "Inherited from parcours-po ADR-nnn" per rule, so nothing is lost silently.
- **Done when**: every `protocol rule` row of the distillation table maps to a rule number;
  every rule of today's `CLAUDE.md` "La boucle du cours" maps to a rule number (a checklist in
  the PR); no learner-facing phrase remains outside a key; `SPEC.md`'s header names the
  exception and the task that closes it; the maintainer has read it.

### S1-05 Write the French language pack
`area=spec:linear-course type=improvement model=sonnet depends=S1-04 parallel=yes`
- **Reads**: `design/03-spec-linear-course.md` ("Language pack"); the protocol (S1-04) for the
  keys it uses; `../pdx/parcours-po/CLAUDE.md` for the literal phrases;
  `../pdx/parcours-po-website/src/{layouts,components,pages}` for the site labels.
- **Observation**: phrases, typography and site labels are scattered in the teacher and the
  site.
- **To do**: `specs/linear-course/lang/fr.yaml`: `phrases` (every key the protocol uses, with
  the exact French string), `typography` (rules as the teacher must apply them), `site`
  (every label of the current site: navigation, tabs, buttons, footer, search), `markers` (the
  reader-text leads and markers: `**Fil rouge :**`, `[cours]`, `[école]`, `[consensus]`). A
  check that every key used by the protocol exists in the pack.
- **Done when**: the pack covers every key of the protocol and every visible label of the old
  site (listed in the PR); the check passes.

### S1-06 Write the course templates
`area=spec:linear-course type=improvement model=sonnet depends=S1-03 parallel=yes`
- **Reads**: `SPEC.md` (S1-03); `../pdx/parcours-po/course/templates/` (concept, domain, sources,
  learner).
- **Observation**: the old templates describe the old single-file concept.
- **To do**: `specs/linear-course/templates/`: `course.yaml`, `plan.md`, `concept.md`,
  `teaching.md`, `sources.md`, `domain.md`, `glossary.md`, `storyline.md`, `CHANGELOG.md`,
  `learner/{apprenant,observations,parcours}.md` (ported), each with the mandatory sections,
  placeholders in angle brackets, and a header comment on how to use it. French text in the
  templates of French files is allowed where it is the file's own language.
- **Done when**: a template exists for every file the spec defines; each conforms to the
  spec's checks when its placeholders are filled with dummy values (a smoke run).

### S1-07 Write the checks
`area=spec:linear-course type=improvement model=sonnet depends=S1-03 parallel=yes`
- **Reads**: `SPEC.md` (S1-03) "Checks"; `design/04-diagrams.md` for the SVG contract;
  `design/03-spec-linear-course.md` ("Checks").
- **Observation**: no check exists; the old repository had an awk map builder and a CI check
  on `learner/`, neither applies.
- **To do**: `specs/linear-course/checks/`: one script per check id, a runner
  `check-course <course-dir>` that runs them all and prints one line per check (`ok` /
  `fail: <file>:<line> <message>`), exit code non-zero on any fail, `--only <id>`. Shell or
  dependency-free Node, chosen once and said in `checks/README.md`. Includes `svg-contract`,
  `course-yaml`, `concept-folder`, `conventions` (the reader-text conventions),
  `glossary-order`, `sources`, `language-pack-keys`, `domain-first-sentence` (the first sentence
  of each concept paragraph in « Le fil des concepts » stands alone). Fixtures: one minimal
  valid course and one broken course per check, under `checks/fixtures/`.
- **Done when**: the runner passes on the valid fixture and fails on each broken fixture with
  the right message; it passes on the S1-02 prototype (or the prototype is fixed in the same
  PR and the fix is noted).

### S1-08 Write the course skeleton: course.yaml, plan, glossary, storyline, domains
`area=course:parcours-po type=course model=sonnet depends=S1-03,S1-07 parallel=yes`
- **Reads**: `SPEC.md`; `../pdx/parcours-po/course/{plan.md,map.md,glossary.md,fil-rouge-velos.md,CHANGELOG.md}`,
  `../pdx/parcours-po/course/domains/*.md`; `design/12-open-points.md` ("Decided": audience,
  objective, accroches).
- **Observation**: structure lives in `plan.md` tables, `map.md` (built), domain frontmatters
  and the site's `domaines.ts`.
- **To do**: `courses/parcours-po/course.yaml` (every concept, sub-concept tree with message
  counts, prerequisites, durations, domains, annexes, `objective` from the merged « Objectif »
  / « À la fin, l'apprenant sait », one `audience` sentence); `plan.md` (audience prose,
  stances, writing rules, without the tables); `glossary.md`, `storyline.md` (copied, file
  renamed); `domains/N-slug.md` (reduced frontmatter, four sections; first sentence of each
  concept paragraph checked to stand alone); `CHANGELOG.md` opening with "before 0.1.0:
  parcours-po 2.5.0, archived repository"; `decisions/` empty for now.
- **Done when**: `check-course` passes on the structure checks (`course-yaml`,
  `glossary-order`, `domain-first-sentence`); a diff against `map.md` shows every concept,
  sub-concept and prerequisite present; the objective merge is listed concept by concept in
  the PR (identical, merged, or flagged).

### S1-09 Write the migrate-concept agent workflow
`area=agentic type=improvement model=opus depends=S1-03,S1-07 parallel=no`
- **Reads**: `design/10-migration.md` ("Course migration"); `SPEC.md`; the checks;
  `../pdx/parcours-po/.claude/workflows/course-lot.js` for the house style of a workflow;
  `construction/notes/S1-02-prototype.md`.
- **Observation**: 20 concepts to migrate mechanically; the prototype shows the mapping.
- **To do**: `.claude/workflows/migrate-concept.js`, args `{ course, concept, from, site }`:
  reads the old concept file, its sources, the MDX body and frontmatter, the Astro diagram
  components; writes the four kinds of files; runs `check-course --only` the concept checks;
  a comparison subagent produces `construction/notes/S1-10-<nn>-report.md` (section by section:
  kept, moved, lost, invented); the workflow fails on `lost` or `invented` unless the run says
  `--accept`. Validated by running it on concept 9 and diffing against the S1-02 prototype.
- **Done when**: the run on concept 9 produces a folder whose semantic diff with the prototype
  is empty or explained in the PR; the report format is fixed; the workflow is documented in
  ten lines at its top.

### S1-10 Migrate the 20 concepts
`area=course:parcours-po type=course model=sonnet depends=S1-09 parallel=yes`
- **Reads**: the workflow (S1-09); `design/10-migration.md`.
- **Observation**: umbrella task; one sub-task per concept, each its own branch and PR,
  parallelisable in worktrees (distinct folders).
- **To do**: for each concept `S1-10.<nn>` (00 to 17, A1, A2): run the workflow, read the
  report, fix what it flags (in the output, never in the source), open the PR with the report
  attached. Concept 9's run replaces the hand prototype if they differ (the workflow is the
  truth from here).
- **Done when**: 20 PRs merged; `check-course` passes on the whole course; every report is
  empty of `lost` and `invented`, or the exceptions are listed in the umbrella issue.

### S1-11 Port the course-batch and taught-check agent workflows
`area=agentic type=improvement model=sonnet depends=S1-03 parallel=yes`
- **Reads**: `../pdx/parcours-po/.claude/workflows/{course-lot,course-taught-check}.js` and their
  skills; `SPEC.md`; `design/08-agentic.md` ("Agent workflows").
- **Observation**: both workflows read the old single-file concept and `map.md`.
- **To do**: `.claude/workflows/course-batch.js` and `taught-check.js`, same logic, reading
  `course.yaml` and the concept folder, writing in the new format, their invoking skills
  (`.claude/skills/course-batch`, `taught-check`) ported and shortened; the vocabulary of the
  glossary applied.
- **Done when**: `taught-check` runs on the migrated course (after S1-10) and produces its
  inventory; `course-batch --dry-run` on a fake batch lists its steps.

### S1-12 Run the full taught-check and a two-reviewer review of the migrated course
`area=course:parcours-po type=course model=sonnet depends=S1-10,S1-11 parallel=no`
- **Reads**: `design/10-migration.md`; the `taught-check` workflow;
  `../pdx/parcours-po/.claude/skills/maintenance/SKILL.md` (§5, the review loop) for the current
  practice.
- **Observation**: the migration is mechanical; the taught-check and a review are the
  safety net.
- **To do**: run `taught-check` on the whole course; two review subagents (opus) read the
  course against `SPEC.md`, each independently, then a third merges their findings; every
  finding becomes a fix PR or an issue (`type:course`), never a silent edit.
- **Done when**: `taught-check` reports no finding (or every finding is fixed and a second run
  is clean); the review's findings are all fixed or filed.

### S1-13 The guard: the old teacher teaches from the new course
`area=teacher type=improvement model=sonnet depends=S1-10 parallel=yes`
- **Reads**: `design/11-stages.md` (stage 1 guard); `../pdx/parcours-po/CLAUDE.md`;
  `../pdx/parcours-po/.claude/skills/maintenance/SKILL.md` (§5, fresh test in a copy).
- **Observation**: the migration must not change what is taught; the new teacher does not
  exist yet; only the old teacher can tell.
- **To do**: `construction/scripts/old-teacher-adapter`: builds a scratch folder with the old
  `CLAUDE.md`, old skills, a `course/` in the old layout projected from the new course
  (`map.md` from `course.yaml`, `concepts/NN-slug.md` = `concept.md` + `teaching.md`
  concatenated under the old section names, `sources/`, `domains/`, `glossary.md`,
  `fil-rouge-velos.md`), fresh `learner/` templates; then the fresh test of §5 on sonnet:
  onboarding, domain 1 presentation, concept 0 through its first sub-concept, and concept 9
  with a diagram request; compared with the same scenario run on the frozen `../pdx/parcours-po`.
- **Done when**: both runs behave the same on the scenario's checkpoints (listed in the PR);
  differences are explained by the migration's known changes (none expected) or filed as
  `type:course` issues.

### S1-14 Write the spec and course decisions
`area=spec:linear-course type=decision model=opus depends=S1-01,S1-04 parallel=yes`
- **Reads**: `design/09-decisions.md`; `construction/notes/S1-01-distillation.md`, rows
  `architecture decision`; `design/12-open-points.md`.
- **Observation**: the spec and the course have decisions behind them that are nowhere yet.
- **To do**: `specs/linear-course/decisions/` (what the distillation assigns to the spec and is
  not a protocol rule: e.g. one-source-two-builds, reader-facing-and-teacher-only-files,
  svg-only-diagrams, markdown-conventions-not-mdx); `courses/parcours-po/decisions/`
  (`bike-share-storyline`, `team-in-sprints`, `restart-at-0-x`); each with its counterfactual,
  through `/decide`.
- **Done when**: every `architecture decision` row of the distillation table is either a
  decision file or marked "covered by <slug>" in the table; files pass `/decide`'s bar.

### S1-15 Stage 1 review
`area=spec:linear-course type=improvement model=fable depends=S1-12,S1-13,S1-14 parallel=no`
- **Reads**: everything in `specs/linear-course/` and `courses/parcours-po/`; `design/`.
- **Observation**: the spec and the protocol are the two pieces where a weakness is paid for
  months.
- **To do**: read-only review: contradictions between `SPEC.md`, the protocol, the checks and
  the course; rules that are not testable; conventions the checks do not enforce; anything the
  design says that the spec dropped; vocabulary drift. Output: `construction/notes/S1-15-review.md`,
  findings ranked, each with the file and line and a proposed fix. Every finding becomes an
  issue (`type:improvement`, milestone `stage-1`) or is dismissed with a reason in the note.
- **Done when**: the note exists; every finding has an issue or a dismissal; the maintainer
  has read it.

### S1-16 Fix the review findings and tag linear-course v1.0.0
`area=spec:linear-course type=improvement model=sonnet depends=S1-15 parallel=no`
- **Reads**: the issues from S1-15.
- **Observation**: the spec is not released until the findings are closed.
- **To do**: deliver each finding's issue by PR; then tag `linear-course/v1.0.0` on `main`
  and set `spec: linear-course@1` in `course.yaml` (it should already be); update
  `specs/linear-course/CHANGELOG.md` (created here, first entry).
- **Done when**: no open `stage-1` issue; the tag exists; stage 1's done-when holds.
