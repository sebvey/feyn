---
date: 2026-10-30
issue: 215
status: accepted
area: repo
---

Without this, an agent would drop `@1` support when `@2` appears, or open a MAJOR for a bug
fix.

Three objects are versioned, a course, a spec and the spec directives, in semver; everything else
is tooling. A spec is the contract for a type of course, kept in one folder per MAJOR,
`course-specs/<name>/<MAJOR>/` (`1/`, not `v1/`), which holds `README.md` (its scope, files,
categories and checks, decision `spec-files-by-product`), one folder per product, `course/`
(`README.md`, what a course is; `rules.yaml`, the rules as data; `schemas/`; `templates/`, the
course templates; `checks/`, its checks and their fixtures) and `teacher/` (`README.md`, the
protocol; `rules.yaml`; `templates/learner/`), then `decisions/`, `lang/` (the language packs),
`CHANGELOG.md` and `spec.yaml` (`name`, `major`, `version`, and `directives`, the MAJOR of the
spec directives it follows). The spec directives say how a spec is written and read (what a rule
file holds, the conformance clause, the levels, the methods, the versions); they live in
`spec-directives/`, which holds the dispatcher `check-spec <spec MAJOR folder>` (it reads the
MAJOR's `spec.yaml` and runs the tests of the directives MAJOR declared) and one folder per MAJOR,
`spec-directives/<MAJOR>/`: `README.md` (the directives), `tests/` (the tests of a spec's own
files, their fixtures), `lib/` with `package.json` and `package-lock.json` (the lib the checks of
a spec and the tests share, and its dependencies), `decisions/` and `CHANGELOG.md`. The checks of a
spec MAJOR load the `lib/` and the package of the directives MAJOR its `spec.yaml` declares, so an
archived spec MAJOR keeps the lib of its directives. A new spec MAJOR copies the tree of the
previous one, its decisions under the same slugs, but not the directives, their tests or `lib/`,
which it declares; a MAJOR in preparation, of a spec or of the directives, carries
`<MAJOR>.0.0-alpha` until its tag (decision `alpha-version-until-tag`). A course declares the
MAJOR it follows (`spec: linear-course@1`); `course-specs/check-course <course>` reads it and runs
`course-specs/<name>/<MAJOR>/course/checks`, refusing an unknown spec or MAJOR. A spec version is
tagged `<name>/vX.Y.Z`, a directives version `spec-directives/vX.Y.Z`, a course version
`<id>/vX.Y.Z`; the bump table reads in levels for the rules of a course (decision
`rules-with-level-and-method`):

| Object | MAJOR | MINOR | PATCH |
|---|---|---|---|
| course `courses/<id>/` | identifiers change (concept and sub-concept numbers, case titles that learner memory cites), or the spec MAJOR changes | what is taught changes (case, sub-concept, stance, duration) | wording |
| spec `course-specs/<name>/` | the structure changes (files, fields, mandatory sections); a requirement added or made stricter; an optional field made mandatory; a recommendation made a requirement | an optional element; a protocol rule added, changed or renamed (the old slug is burnt); a requirement made looser or made a recommendation; a recommendation added or made stricter; a language-pack key added or renamed, every pack updated | wording; a false positive lifted |
| spec directives `spec-directives/` | a rule file that validated stops validating (a field made mandatory, a closed list narrowed) | a field, a level or a method added | wording |

A spec MAJOR lives while a served course version declares it, a course tag included, then is
archived; a directives MAJOR lives while a live spec MAJOR declares it. An old MAJOR receives bug
fixes only (a wrong check, a mistake in the protocol), as a PATCH, never a tightening; a bug fix
is ported to every live MAJOR. A check takes its category and its severity from the rules it
verifies (decision `rules-with-level-and-method`): it blocks when it verifies a requirement by
test, otherwise it reports, and checks are selected by category. The machine runs the checks of
method test on every change (`/feyn-pull-request`, CI, the builds) and a blocking failure blocks;
taught-check, an analysis run by agents, runs on demand and its findings are triaged into course
issues.

Tooling (teacher, site engine, scripts, agentic layer) lives at HEAD, is identified by its
commit sha, and reads every live MAJOR; it refuses to build a course whose spec MAJOR it does
not support. The learner and the contributor see one version, the course's; the site and the
classroom show it with the build date and sha. A course, a spec MAJOR and a directives MAJOR each
keep a `CHANGELOG.md`; tooling has none. The migrated course restarts at `parcours-po/v0.1.0`: 0.x
says it is complete but still beta, identifiers included; `1.0.0` comes when other learners
have gone through it. Its changelog opens with one line pointing to `parcours-po` 2.5.0 in the
archived repository. This replaces decision `two-versioned-objects`.

## Options ruled out

- A stricter check as a MINOR when every course of the repository passes it: a tagged course
  version, or a course outside the repository, is not tested by that condition.
- The course declaring its MINOR (`linear-course@1.2`), each check carrying its version: one
  version per check to maintain. Reconsider it if spec changes arrive one at a time.
- Old MAJORs read from git tags: tooling must read every live MAJOR at run time.
- The directives, their tests and `lib/` inside each spec MAJOR, copied with its tree (the rule
  until #459): two copies drift, and a second spec has the same directives (epic #454, Material
  point 6).
- The directives unversioned, as tooling at HEAD, or one copy with no folder per MAJOR: a change
  to the directives would force every live spec MAJOR to migrate in one change (Material point 7).

## Consequences

- A tooling change alters the whole site without any bump; this cost is accepted.
- A course MAJOR may invalidate learner memory: the classroom build refuses that update unless
  told otherwise. During 0.x this protection is weak, and that is assumed.
- A MAJOR copies the whole tree, so new or stricter requirements are batched into one
  MAJOR; tooling cost grows with each live MAJOR.
- Amended 2026-11-02 (#465): a third versioned object, the spec directives (`spec-directives/`,
  one folder per MAJOR, tagged `spec-directives/vX.Y.Z`, with their own bump table), which a spec
  MAJOR declares in `spec.yaml`; a new spec MAJOR no longer copies the directives, their tests or
  `lib/`, as Material points 6, 7, 10 and 13 of epic #454 settle. Without this, an agent opening
  a spec MAJOR 2 would copy `lib/` and the tests into it, and a change to the rule model would
  have no version that a spec MAJOR can declare.
