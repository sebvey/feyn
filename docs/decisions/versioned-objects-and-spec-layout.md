---
date: 2026-10-30
issue: 215
status: accepted
area: repo
---

Without this, an agent would drop `@1` support when `@2` appears, or open a MAJOR for a bug
fix.

Two objects are versioned, a course and a spec, in semver; everything else is tooling. A spec
is the contract for a type of course, kept in one folder per MAJOR, `specs/<name>/<MAJOR>/`
(`1/`, not `v1/`), which holds `SPEC.md` (the structure), `PROTOCOL.md` (the protocol),
`README.md`, `checks/` (its checks and their fixtures), `decisions/`, `lang/` (the language
packs), `templates/` (the course templates) and `CHANGELOG.md`. A new MAJOR copies the tree of
the previous one, its decisions under the same slugs. A course declares the MAJOR it follows
(`spec: linear-course@1`); `specs/check-course <course>` reads it and runs
`specs/<name>/<MAJOR>/checks`, refusing an unknown spec or MAJOR: its conformity mode, the
default, runs the conformity checks, its quality mode the quality checks. A spec version is
tagged `<name>/vX.Y.Z`, a course version `<id>/vX.Y.Z`:

| Object | MAJOR | MINOR | PATCH |
|---|---|---|---|
| course `courses/<id>/` | identifiers change (concept and sub-concept numbers, case titles that learner memory cites), or the spec MAJOR changes | what is taught changes (case, sub-concept, stance, duration) | wording |
| spec `specs/<name>/` | the structure changes (files, fields, mandatory sections); a conformity check added or made stricter; an optional field made mandatory; a quality check moved to conformity | an optional element; a protocol rule added, changed or renamed (the old slug is burnt); a conformity check made looser or moved to quality; a quality check added or made stricter; a language-pack key added or renamed, every pack updated | wording; a false positive lifted |

A MAJOR lives while a served course version declares it, a course tag included, then is
archived. An old MAJOR receives bug fixes only (a wrong check, a mistake in the protocol), as
a PATCH, never a tightening; a bug fix is ported to every live MAJOR. Checks come in two
families. A **conformity check** says whether a course is consumable (the site builds, the
teacher teaches, identifiers resolve); the machine runs it on every change
(`/feyn-pull-request`, CI, the builds) and a `fail` blocks. A **quality check** says whether a
course is good (term order, captions, lengths); the maintainer runs it on demand and its
findings are triaged into course issues; taught-check is one, run by agents. No conformity path
runs the quality mode.

Tooling (teacher, site engine, scripts, agentic layer) lives at HEAD, is identified by its
commit sha, and reads every live MAJOR; it refuses to build a course whose spec MAJOR it does
not support. The learner and the contributor see one version, the course's; the site and the
classroom show it with the build date and sha. A course and a spec MAJOR each keep a
`CHANGELOG.md`; tooling has none. The migrated course restarts at `parcours-po/v0.1.0`: 0.x
says it is complete but still beta, identifiers included; `1.0.0` comes when other learners
have gone through it. Its changelog opens with one line pointing to `parcours-po` 2.5.0 in the
archived repository. This replaces decision `two-versioned-objects`.

## Options ruled out

- A stricter check as a MINOR when every course of the repository passes it: a tagged course
  version, or a course outside the repository, is not tested by that condition.
- The course declaring its MINOR (`linear-course@1.2`), each check carrying its version: one
  version per check to maintain. Reconsider it if spec changes arrive one at a time.
- Old MAJORs read from git tags: tooling must read every live MAJOR at run time.

## Consequences

- A tooling change alters the whole site without any bump; this cost is accepted.
- A course MAJOR may invalidate learner memory: the classroom build refuses that update unless
  told otherwise. During 0.x this protection is weak, and that is assumed.
- A MAJOR copies the whole tree, so stricter or new conformity checks are batched into one
  MAJOR; tooling cost grows with each live MAJOR.
- Amended 2026-10-31 (#322): the folder of a MAJOR also holds `COURSE.md` (what a course is),
  `rules/` (the rules as data) and `schemas/`, and `SPEC.md` becomes the frame (decision
  `spec-files-and-alpha-version`); a MAJOR in preparation carries `<MAJOR>.0.0-alpha` until its
  tag, with no prerelease number nor tag. The two check families and the two modes of
  `check-course` give way to attributes of the rule (decision `rules-with-level-and-method`): a
  check blocks when it verifies a requirement by test, otherwise it reports, and checks are
  selected by category. The bump table reads in levels for the rules of a course: "a
  conformity check" reads "a requirement", "a quality check" reads "a recommendation", so a
  requirement added or made stricter, or a recommendation made a requirement, is a MAJOR; a
  requirement made a recommendation, or a recommendation added or made stricter, is a MINOR; a
  rule of the protocol added, changed or renamed stays a MINOR. `specs/README.md` and
  `checks/README.md` say the old frame until the slices of #317 rewrite them.
