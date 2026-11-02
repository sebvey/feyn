---
date: 2026-11-02
issue: 465
status: accepted
area: spec-directives
---

Without this, an agent would keep numbering a spec or the directives `1.0.0` while its content
changes from commit to commit, or move it to `0.y.z` and rename `1/` and `@1` twice (working
notes D13).

A MAJOR in preparation, of a spec or of the spec directives, carries `<MAJOR>.0.0-alpha` in its
folder until its tag, with no prerelease number and no prerelease tag: `linear-course` is
`1.0.0-alpha` in `course-specs/linear-course/1/` until `linear-course/v1.0.0`, the directives
`1.0.0-alpha` in `spec-directives/1/` until `spec-directives/v1.0.0`; a spec MAJOR's `spec.yaml`
carries that version, which `check-spec` holds to its changelog. The `CHANGELOG.md` of a spec
MAJOR and of a directives MAJOR takes the form of a course's changelog (one line per entry, ranked
by bump, the convention of Changesets, named in its header), with an « Unreleased » section that
becomes `<MAJOR>.0.0` at the tag; during the alpha, entries carry no bump class. "draft" leaves
the descriptions of a spec and of the directives: it is the reserved term for a PR. Split from
decision `spec-files-and-alpha-version` (#322, 2026-10-31), whose "files of a spec" part stays
with the spec as decision `spec-files-by-product`.

## Options ruled out

- `0.y.z` while the spec moves: two renamings (`1/` to `0/` and back, `@1` to `@0` and back),
  and it works once; the prerelease serves again, a `2.0.0-alpha` prepared in `2/` while `1/`
  serves the courses (D13).
- A prerelease number (`1.0.0-alpha.N`, `1.0.0-draft.N`): no reader tells two prereleases
  apart, a course declares only the MAJOR (D13).
- `rc`: it announces a content almost frozen (D13).
- Keep a Changelog: feyn ranks entries by bump, which the reviewer checks against the claimed
  class, and changing it would touch the changelog of `parcours-po` (D13).
- The alpha left in decision `spec-files-and-alpha-version` of `linear-course`: it binds the
  directives' version too, which no decision of one spec binds (epic #454, Material point 15).

## Sources checked

- SemVer 2.0.0, rules 3 and 9: a published version's content never changes; a prerelease
  follows the patch after a hyphen and precedes the release (read by the second standards run,
  2026-10-30).

## Consequences

- Nothing reads the spec yet, so breaking its number costs nothing; the choice was made on the
  debt (D13).
- The directives and the spec are tagged together, the directives first, in #451: a tagged spec
  declares a tagged directives MAJOR, never an alpha (epic #454, Material point 14).
