Issues created on 2026-10-27; this file is no longer updated.

# Stage 2: the teacher and the classroom

Milestone `stage-2`. Design: `design/05-teacher-classroom.md`, `design/04-diagrams.md`,
`design/03-spec-linear-course.md` ("Protocol", "Language pack").

Done when: a fresh test on sonnet, in a classroom built from `main`, goes through domain 1 as
today; a classroom rebuilt from another ref keeps `learner/`; a requested diagram shows in the
desktop; the protocol is in English and the A/B of S2-09 matches.

S2-09 is the last task of the stage; stage 3 may start as soon as S2-08 is done.

### S2-01 Write the teacher template
`area=teacher type=improvement model=opus depends=- parallel=yes`
- **Reads**: `design/05-teacher-classroom.md`; the protocol and `lang/fr.yaml`
  (`specs/linear-course/`); `../pdx/parcours-po/CLAUDE.md` for the harness parts (readings at
  start, memory writes, commit).
- **Observation**: the protocol says how to teach; nothing says how the teacher lives in a
  classroom (files, skills, memory, commit).
- **To do**: `teacher/CLAUDE.template.md` in English: the harness part only (where
  `course/`, `learner/`, `course.lock` are; which skills to load when; the memory table of
  today's `CLAUDE.md` "Tenir la mémoire à jour", kept, as the protocol's save-point rules
  need it; the commit rule; what the teacher never does: edit `course/`, push, read outside
  the classroom), with injection points `{{protocol}}`, `{{lang}}`, `{{course}}`,
  `{{classroom}}`. Target: the built `CLAUDE.md` is no longer than today's. `teacher/README.md`
  explains the build inputs.
- **Done when**: a built sample (by hand, with the real protocol and pack) exists in the PR
  and reads as one coherent teacher; the maintainer has read it.

### S2-02 Write the classroom build and the /classroom skill
`area=teacher type=improvement model=sonnet depends=S2-01 parallel=no`
- **Reads**: `design/05-teacher-classroom.md` ("The classroom", "The classroom build"),
  `design/07-versions-channels-flow.md` ("Three channels", "Compatibility").
- **Observation**: no build exists; the fresh tests of stage 1 used a hand-made adapter.
- **To do**: `teacher/build-classroom` (shell or Node, as the checks): args `<course>`,
  `--ref`, `--out`, `--site-url`, `--update`; reads `course.yaml`, checks the spec MAJOR is
  supported, copies the course without `decisions/`, renders `CLAUDE.md` from the template
  (protocol, pack, course parameters, classroom parameters), copies `teacher/skills/`,
  writes `.claude/settings.json` (learner commits only), writes `course.lock`, `git init` if
  absent, copies the `learner/` course templates if absent; `--update` keeps `learner/` and
  refuses on a course MAJOR change unless `--force`; `site_url` derived from the ref and
  channel. `.claude/skills/classroom/SKILL.md` wraps it.
- **Done when**: `build-classroom parcours-po --ref main --out /tmp/x` yields a classroom whose
  `CLAUDE.md` equals the S2-01 sample; `--update` on it keeps a modified `learner/`; the MAJOR
  refusal is tested with a fake tag.

### S2-03 Port the teacher skills and write show-diagram
`area=teacher type=improvement model=opus depends=S2-01 parallel=yes`
- **Reads**: `../pdx/parcours-po/.claude/skills/{learner-onboarding,reset-learner}/SKILL.md`;
  `design/04-diagrams.md` ("Teacher side"), `design/12-open-points.md` (CLI decision).
- **Observation**: two teacher skills exist in French, tied to the old layout; no diagram
  skill.
- **To do**: `teacher/skills/learner-onboarding`, `reset-learner` ported (English
  instructions, French phrases from the pack, new file layout); `show-diagram`: on request
  only, reads the caption in `concept.md`, sends the SVG with `display: render`, says the
  caption; in the CLI, says it cannot show it and gives the site page link.
- **Done when**: the three skills are each under 80 lines; `show-diagram` tested by hand in a
  built classroom on the desktop (the SVG renders) and in the CLI (the fallback text).

### S2-04 Write /fresh-test and the test scenarios
`area=agentic type=improvement model=opus depends=S2-02 parallel=yes`
- **Reads**: `../pdx/parcours-po/.claude/skills/maintenance/SKILL.md` §5 (fresh test, scenarios,
  diagnosis); `design/08-agentic.md`.
- **Observation**: the current practice (fresh subagent on sonnet in a copy, scenario,
  checkpoints, diagnosis) is buried in the monolithic skill.
- **To do**: `.claude/skills/fresh-test/SKILL.md` (builds a disposable classroom from the
  current branch with `build-classroom`, runs a sonnet subagent as the learner of a named
  scenario, collects the transcript, judges the checkpoints, writes a report, destroys the
  classroom) and `scenarios/*.md` (onboarding; resume with a pending question; domain 1 end to
  end; a validated concept dug with two cases; a diagram request; a stop and resume), each
  with its checkpoints. The session diagnosis of §5 becomes a support skill `diagnose-session`.
- **Done when**: `/fresh-test onboarding` runs end to end and produces a report with pass/fail
  per checkpoint; the scenarios cover today's §5 list (mapping in the PR).

### S2-05 Fresh test campaign and fixes
`area=teacher type=improvement model=sonnet depends=S2-03,S2-04 parallel=no`
- **Reads**: `design/05-teacher-classroom.md` ("Rewrite risk"); `design/09-decisions.md`
  (two-tests rule).
- **Observation**: the protocol was restructured (numbered rules, keys, course parameters)
  and the harness is new; behaviour may have drifted. The language is still French: one
  variable fewer.
- **To do**: run every scenario; for each failed checkpoint, diagnose (support skill), then fix
  in the protocol or the template (never in the pack unless the phrase itself is wrong), under
  the two-tests rule: a new behaviour rule enters the protocol only when two fresh tests show
  it; rerun until clean. Fixes to the protocol are PRs on `specs/linear-course/` (MINOR).
- **Done when**: every scenario passes twice in a row; the list of protocol changes is in the
  umbrella issue; `linear-course` is tagged `v1.1.0` if the protocol changed.

### S2-06 Write the teacher decisions
`area=teacher type=decision model=opus depends=S2-02 parallel=yes`
- **Reads**: `design/09-decisions.md`, `design/05-teacher-classroom.md`.
- **To do**: through `/decide`: `classroom-as-build`, `learner-memory-in-classroom`,
  `teacher-instructed-in-english`, `diagram-on-request-only` (if not already a spec decision).
- **Done when**: the files pass `/decide`'s bar.

### S2-07 Stage 2 review
`area=teacher type=improvement model=fable depends=S2-05,S2-06 parallel=no`
- **Reads**: `teacher/`, the protocol, a built classroom, the S2-05 reports.
- **To do**: read-only review of the built teacher: rules that contradict each other once
  assembled, harness gaps (a file the teacher needs and the build does not copy), memory rules
  that can lose a save point, anything the old teacher did that the new one no longer does.
  Output `construction/notes/S2-07-review.md`; findings become issues or dismissals.
- **Done when**: the note exists; every finding has an issue or a dismissal; the maintainer
  has read it.

### S2-08 Fix the review findings; build the maintainer's next classroom
`area=teacher type=improvement model=sonnet depends=S2-07 parallel=no`
- **To do**: deliver each finding's issue; `build-classroom parcours-po --ref main --out
  ~/classrooms/parcours-po-next`; the maintainer runs one real session in it.
- **Done when**: no open `stage-2` issue; the next classroom exists; stage 2's done-when holds.

### S2-09 Switch the protocol to English, A/B tested
`area=spec:linear-course type=improvement model=opus depends=S2-08 parallel=yes`
- **Reads**: `design/05-teacher-classroom.md` ("Rewrite risk"), `design/02-monorepo.md`
  ("Language"); the French protocol; the `/fresh-test` scenarios.
- **Observation**: the protocol is in French by a bounded exception; the fresh tests are green
  on it; `/fresh-test` can now compare two teachers on the same scenarios.
- **To do**: on a branch, translate the protocol rule by rule, same numbers, same keys, no
  rule added or removed (a diff that shows only translated lines); build two classrooms, one
  from `main` (French) and one from the branch (English); run every scenario on both; compare
  checkpoint by checkpoint; where the English teacher drifts, fix the English wording (never
  the rule) and rerun; merge when both match twice in a row; MINOR bump of `linear-course`;
  remove the exception line from `SPEC.md`'s header.
- **Done when**: the protocol is English; every scenario passes on the English classroom twice
  in a row with the same checkpoints as the French one; the diff of the switch PR shows no
  rule change; the language policy holds everywhere again (grep for French outside keys and
  quotes).
