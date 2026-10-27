# 05. The teacher and the classroom

## The generic teacher

The teacher is a **built** `CLAUDE.md`, not a written one: the classroom build takes
`teacher/CLAUDE.template.md` (English), injects the protocol of the course's spec, the
course's language pack, the course parameters (`course.yaml`: identity, storyline, glossary,
durations) and the classroom parameters (`site_url`, channel). Out comes a `CLAUDE.md` that
Claude Code reads as is in the classroom.

The teacher template holds only what belongs to the harness: where files are in the
classroom, which skills to load, how to write memory, how to commit. Everything else comes
from the spec.

Why a build and not a `CLAUDE.md` that reads the spec at run time: Claude Code loads the
`CLAUDE.md` files of parent folders; a teacher launched inside the monorepo would also see the
maintainer's instructions and the whole agentic layer. A classroom built **outside** the
repository has only its own `CLAUDE.md`. The maintainer approved this choice.

## The classroom

A folder outside the monorepo, one per (course, channel) pair:

```
~/classrooms/parcours-po/          # prod: built from the tag
~/classrooms/parcours-po-next/     # next: built from main (or a branch)
  CLAUDE.md                        # built
  .claude/skills/                  # teacher skills: learner-onboarding, reset-learner, show-diagram
  .claude/settings.json            # permissions: git add learner/, git commit, read-only elsewhere
  course/                          # read-only copy: course.yaml, concepts/**, domains/, glossary, storyline
  learner/                         # learner memory: apprenant.md, observations.md, parcours.md
  course.lock                      # course id, ref (tag / branch), course sha, tooling sha, channel, site_url, date
  .git/                            # the classroom is its own repository; only learner/ and course.lock are tracked
```

Rules:
- The classroom is **its own git repository**; learner memory is committed there (today's
  save-point rule, kept). No more `learner/<nickname>` branches in the course repository, no
  more CI check "learner/ equals the template". Today's memory (`learner/seb`) is dropped
  (maintainer's decision).
- `course/` in the classroom is a copy, never edited; the teacher does not write there
  (today's rule).
- **Updating** a classroom = rebuilding `course/` and `CLAUDE.md` from a new ref while keeping
  `learner/`; the build refuses if the course MAJOR changes and `learner/` is not empty, unless
  an explicit option says otherwise.
- `site_url` derives from the channel: tag -> `/<course>/`, `main` -> `/next/<course>/`, branch
  with a PR -> `/pr-N/<course>/`, otherwise the address of a local site build. The address is
  no longer hard-coded in the teacher.
- Fresh tests (see `08-agentic.md`) build a **disposable** classroom from the current branch,
  use it, destroy it.

## The classroom build (`teacher/build-classroom`)

A command skill `/classroom` that calls a script: `build-classroom <course> --ref <tag|branch>
--out <dir> [--site-url …] [--update]`. Steps: read `course.yaml`, check the declared spec is
supported, copy the course (without `decisions/`, without `CHANGELOG.md` unless the protocol
wants it), build `CLAUDE.md` from template + protocol + language pack, copy the teacher skills,
write `course.lock`, init git if absent, copy the `learner/` course templates if absent.

## Rewrite risk, and guard

Today's teacher is instructed in French and its behaviour fixes were tested in that language.
Stage 1 and 2 change two things at once: the **structure** of the instructions (one monolith
becomes template + protocol + language pack + course parameters, in numbered rules) and the
**harness** (classroom, memory, skills). Changing the **language** of the protocol at the same
time would add a third variable with no way to attribute a drift. Decision (2026-10-27): the
protocol is **written in French first**, as a deliberate and bounded exception to the language
policy, and switched to English in its own task once the fresh tests are green and `/fresh-test`
exists to compare the two (`plan/stage-2.md`, S2-09). Guards:
- the phrases the learner sees stay literal in the language pack from the start, so the switch
  touches instructions only;
- stage 2's done-when: a fresh test on Sonnet goes through domain 1 as today (same test
  scenario as today's maintenance skill, §5), with the French protocol;
- the switch is a translation rule by rule, no rule changes, a MINOR spec bump, validated by
  running every scenario on two classrooms built from the two branches (A/B) until they match
  twice in a row;
- if a rule holds in one language and slips in the other in use, it is fixed in the protocol,
  not in the pack.
The teacher template (harness part, new text with no baseline) is written in English from the
start.

## What disappears from today's teacher

`course/map.md` (replaced by `course.yaml`), the hard-coded site address, the `maintainer/`
and `archive/` folders mentioned in `CLAUDE.md` (the classroom has none), the rule "a missing
`learner/` file is copied from `course/templates/learner/`" (the build does it).
