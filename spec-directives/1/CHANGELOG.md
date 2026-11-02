# Changelog of the spec directives

The spec directives, MAJOR 1. No version of them is tagged yet.

The directives carry a version `MAJOR.MINOR.PATCH`, like a spec: `1.0.0-alpha` until the tag
`spec-directives/v1.0.0`, when « Unreleased » becomes `1.0.0`. From the tag on, each change is
classed by its bump, and the entries are ranked by bump, as Changesets does.

One line per change: `- CLASS, file or area: what changes`. During the alpha, an entry carries
no class: `- file or area: what changes`.

## Unreleased

- folder: the directives MAJOR 1 is created, `spec-directives/1/`, run on a spec MAJOR by
  `spec-directives/check-spec`, which reads the `directives` its `spec.yaml` declares (#459).
- `tests/`, `lib/`, `package.json`, `package-lock.json`: moved out of
  `course-specs/linear-course/1/` (formerly its `checks/`): the tests of a spec's own files
  (`check-spec`, `rule-slugs`, `rule-files`, `language-pack-keys`), their fixtures and their
  `test-fixtures`, the `lib/` the checks of a spec share, the package (`yaml`, `ajv`) the checks
  of a spec MAJOR that declares this MAJOR load; no test changes (#459).
- `tests/`: `spec-yaml`, the fourth test of `check-spec`, verifies a spec MAJOR's `spec.yaml`
  (`name`, `major`, `directives`, `version`, no other key) and holds `version` to the first
  section of its `CHANGELOG.md`: « Unreleased » during the alpha (`<MAJOR>.0.0-alpha`), the
  version itself after the tag; every fixture gains a `spec.yaml` and a `CHANGELOG.md`, and five
  broken fixtures show its failures (#461).
