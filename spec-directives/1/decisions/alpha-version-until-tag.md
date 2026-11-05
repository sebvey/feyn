---
date: 2026-11-02
issue: 465
status: accepted
area: spec-directives
---

Without this, an agent would keep numbering a spec or the directives `1.0.0` while its content
changes from commit to commit, or move it to `0.y.z` and rename `1/` and `@1` twice.

A MAJOR in preparation, of a spec or of the spec directives, carries `<MAJOR>.0.0-alpha` in its
folder until its tag, with no prerelease number and no prerelease tag: SemVer 2.0.0 never changes
a published version's content, and puts a prerelease after the patch, behind a hyphen, before the
release (its rules 3 and 9). A spec MAJOR's `spec.yaml` carries that version. The `CHANGELOG.md`
of a spec MAJOR and of a directives MAJOR takes the form of a course's changelog (one line per
entry, ranked by bump, the convention of Changesets, named in its header), with an « Unreleased »
section that becomes `<MAJOR>.0.0` at the tag; during the alpha, entries carry no bump class.

## Options ruled out

- `0.y.z` while the spec moves: two renamings (`1/` to `0/` and back, `@1` to `@0` and back),
  and it works once; the prerelease serves again, a `2.0.0-alpha` prepared in `2/` while `1/`
  serves the courses.
- A prerelease number (`1.0.0-alpha.N`, `1.0.0-draft.N`): no reader tells two prereleases
  apart, a course declares only the MAJOR.
- `rc`: it announces a content almost frozen.
- Keep a Changelog: feyn ranks entries by bump, which the reviewer checks against the claimed
  class, and changing it would touch the changelog of a course already written.
- The alpha in a decision of one spec: it binds the directives' version too, which no decision
  of one spec binds.

## Consequences

- Nothing reads the spec yet, so breaking its number costs nothing.
- The directives and the spec are tagged together, the directives first: a tagged spec declares
  a tagged directives MAJOR, never an alpha.
- Amended 2026-11-04 (#545): the word "draft" leaves this decision for its glossary entry
  (decision `word-choices-in-the-glossary`).
