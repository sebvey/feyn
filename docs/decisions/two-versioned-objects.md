---
date: 2026-10-27
issue: null
status: superseded
superseded-by: versioned-objects-and-spec-layout
area: repo
---

Without this, an agent would give the site, the teacher or the scripts a version of their own,
keep a changelog for each, and bump the course because the site changed, as the 2.x versions
of `parcours-po` were bumped by its coupling with the site.

Two objects are versioned, a course and a spec, in semver; everything else is tooling.

| Object | Tag | MAJOR | MINOR | PATCH |
|---|---|---|---|---|
| course `courses/<id>/` | `<id>/vX.Y.Z` | identifiers change (concept and sub-concept numbers, case titles that learner memory cites), or the spec MAJOR changes | what is taught changes (case, sub-concept, stance, duration) | wording |
| spec `specs/<name>/` | `<name>/vX.Y.Z` | the structure changes (files, fields, mandatory sections): builds and checks must follow | an optional section or field, a protocol rule | the contract's text |

Tooling (teacher, site engine, scripts, agentic layer) lives at HEAD and is identified by its
commit sha. It must read every spec MAJOR still in use (one or two). A course declares the
MAJOR it follows (`spec: linear-course@1`); tooling refuses to build a course whose spec MAJOR
it does not support. The learner and the contributor see one version, the course's; the site
and the classroom show it with the build date and sha. The course `CHANGELOG.md` is the only
changelog.

The migrated course restarts at `parcours-po/v0.1.0`: 0.x says it is complete but still beta,
identifiers included. `1.0.0` comes when other learners have gone through it. Its changelog
opens with one line pointing to `parcours-po` 2.5.0 in the archived repository.

## Consequences

- A tooling change alters the whole site without any bump; this cost is accepted.
- A course MAJOR may invalidate learner memory: the classroom build refuses that update unless
  told otherwise. During 0.x this protection is weak, and that is assumed.
