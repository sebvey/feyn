# Changelog of the spec

`linear-course`, MAJOR 1. No version of it is tagged yet.

The spec carries a version `MAJOR.MINOR.PATCH` (see `SPEC.md`, section 8): `1.0.0-alpha` until
the tag `linear-course/v1.0.0`, when « Unreleased » becomes `1.0.0`. From the tag on, the bump
table of `SPEC.md` section 8 classes each change, and the entries are ranked by bump, as
Changesets does.

One line per change: `- CLASS, file or area: what changes`. During the alpha, an entry carries
no class: `- file or area: what changes`.

## Unreleased

- `decisions/`: the frame of the spec as three decisions (#322): `rules-with-level-and-method`
  (the rule as the unit, with a level from ISO/IEC Directives Part 2, a method from
  ISO/IEC/IEEE 29148, a category; the severity of a check derived; the conformance clause; the
  normative references), `spec-files-and-alpha-version` (the files by class of products, the
  version `1.0.0-alpha`, this changelog), `checks-use-ajv-and-yaml` (the checks take ajv and the
  `yaml` package); `versioned-objects-and-spec-layout`, `rules-named-by-slug` and
  `rule-groups-replace-ranges` amended.
- `SPEC.md`, `COURSE.md`: `SPEC.md` becomes the frame (scope, files, conformance, levels,
  methods, categories, severity, versions, normative references, the checks with their category,
  level, method and severity); sections 2 to 7 and 9 move to `COURSE.md` as written, renumbered
  1 to 7 (#323). `check-spec`'s `rule-slugs` reads `COURSE.md` too.
- `SPEC.md`, `PROTOCOL.md`: version `1.0.0-alpha`, "draft" gone (#323).
- `checks/`: the checks read YAML with the package `yaml` (YAML 1.2), installed by `npm ci` from
  `checks/package.json`; `lib/yaml.js` removed; the same failures at the same `file:line` (#327).
