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
- `rules/`, `schemas/`, `checks/`: the rules the checks of a course verify as data in
  `rules/course.yaml`, the teacher's in `rules/protocol.yaml` (one rule), at least one rule of
  each method across them; the tables of `COURSE.md` 2 and 3.1 as
  `schemas/course.schema.yaml` and `schemas/concept-frontmatter.schema.yaml`; `concept-folder`
  split, its cases part now `case-contract` (`pedagogy`), the same failures at the same
  `file:line`; `check-spec`'s new `rule-files` validates the rule files and the schemas, with ajv
  (`Ajv2020`) (#329).
- `checks/`: `check-course` takes its checks, their category and their severity from
  `rules/course.yaml` (`lib/rules.js`) and runs, by default, every check of
  method test in one run: a failure of a blocking check sets exit code 1, a failure of a
  reporting check is printed and leaves 0, and a summary line counts both; `--category` selects
  by category, `--list` prints each check with its category and severity; `--quality` is gone, a
  usage error naming its replacement; `test-fixtures` runs each fixture once and checks the exit
  code against the severity (#331).
- `COURSE.md`, `checks/`, `lang/`: the words of the frame replace the two check families in
  three lines of `COURSE.md` (otherwise as moved), the comments of the checks and of the
  language pack and its fixtures: a check blocks or reports; `checks/README.md` names the removed
  flag `--quality`; no behaviour changes (#333).
- `checks/`, `decisions/`: the checks of `check-spec` (`rule-slugs`, `rule-files`,
  `language-pack-keys`) are tests of the spec's own files, not rules: no category, no level,
  each failure blocks `check-spec`; `language-pack-keys` leaves `check-course` and tests every
  pack of `lang/` in `check-spec`; decision `rules-with-level-and-method` amended, a rule binds a
  product (#339).
