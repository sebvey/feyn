# 07. Versions, channels, git flow

## Two versioned objects, tooling at HEAD

| Object | Where | Tag | MAJOR | MINOR | PATCH |
|---|---|---|---|---|---|
| A course | `courses/<id>/` | `<id>/vX.Y.Z` | identifiers change (concept and sub-concept numbers, case titles cited by learner memory) **or** the spec changes MAJOR | what is taught changes (case, sub-concept, school, duration) | wording |
| A spec | `specs/<name>/` | `<name>/vX.Y.Z` | the structure changes (files, fields, mandatory sections): builds and checks must follow | an optional section or field added, a protocol rule | the contract's text |
| Tooling (teacher, site, scripts, agentic layer) | the rest | none | lives at HEAD, identified by commit sha; must read every spec MAJOR still alive (one or two) |

What the learner and the contributor see: the course version, alone. The site and the
classroom show it, with build date and sha. The site has no version, the classroom neither
(`course.lock`).

Accepted cost: a tooling change changes every page without a version bump. Nobody needs a
changelog of the site engine; the course `CHANGELOG.md` is the only one read.

## The course restarts at 0.x

Migrated `parcours-po` comes out as `parcours-po/v0.1.0`. 0.x says what the course is:
accomplished but beta, where anything may still move, identifiers included. `1.0.0` when
other learners have gone through it. The `parcours-po` changelog (2.x) does not carry over: its
bumps were forced by the site / course dependency. The new changelog opens with one line:
"before 0.1.0: parcours-po 2.5.0, archived repository".

## Three channels

| Channel | Source | Site | Classroom |
|---|---|---|---|
| prod | the course tag | `/<course>/` | `~/classrooms/<course>/` |
| next | `main` | `/next/<course>/` | `~/classrooms/<course>-next/` |
| preview | a PR branch | `/pr-N/<course>/` | disposable classroom (fresh tests) or local |

No permanent channel per branch: the PR preview covers the need (a reviewer who is not the
author), and it is the same mechanism as next with one more prefix.

## Git flow: trunk-based

- `main` is always buildable: spec checks green, site builds.
- One branch per issue, named `<type>/<number>-<slug>` (e.g. `course/42-concept-9-cases`),
  created by `/start`.
- PR to `main`, closing the issue; review (human or agent workflow) before merge; squash merge
  to keep one commit per issue on `main` (decided 2026-10-27). The squash commit title
  follows `<type>(<area>): <summary>`, as in lisi; branch commits are free-form.
- No `develop`, no integration branch: they hold unfinished code away from prod, and here a
  course's prod is a tag, not `main`.
- Two courses in parallel: two branches touching `courses/a/` and `courses/b/`, no conflict,
  merged in the order they are ready.
- A course release: a tag `<id>/vX.Y.Z` on `main` by `/publish`, which updates the course
  `CHANGELOG.md`, triggers the prod site deployment, and rebuilds the prod classroom if the
  maintainer asks.
- A spec release: a tag `<name>/vX.Y.Z`; courses that follow it update their declaration when
  they want.

## Compatibility

- A course declares `spec: linear-course@1` (the MAJOR). Tooling refuses to build a course
  whose spec MAJOR is not supported.
- Learner memory cites course identifiers; a course MAJOR change may invalidate it: the
  classroom build refuses the update unless told otherwise (during 0.x this protection is
  weak, which is assumed).
