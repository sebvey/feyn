# Changelog of the spec directives

The spec directives, MAJOR 1. No version of them is tagged yet.

The directives carry a version `MAJOR.MINOR.PATCH`, like a spec (decision
`alpha-version-until-tag`): `1.0.0-alpha` until the tag `spec-directives/v1.0.0`, when
« Unreleased » becomes `1.0.0`. From the tag on, each change is classed by its bump, and the
entries are ranked by bump, as Changesets does.

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
- `README.md`: the directives, split from `course-specs/linear-course/1/SPEC.md`: what a rule
  file holds, the conformance clause, the levels, the methods, the severity, the versions (a
  spec's, with its bump table, and the directives' own, with theirs), the normative references of
  the rule model, and the tests of a spec's own files (formerly described in the spec's
  `course/checks/README.md`), which cite idea #453; `rule-slugs` reads a spec MAJOR's `README.md`
  in place of `SPEC.md`, and the fixtures carry `README.md` where they carried `SPEC.md` (#463).
- `decisions/`: the decisions of the directives, moved from
  `course-specs/linear-course/1/decisions/`: `rules-with-level-and-method` (the rule model, the
  conformance clause, the tests of a spec's own files) and `checks-use-ajv-and-yaml` (one package
  per directives MAJOR), their area `spec-directives`; `alpha-version-until-tag`, the alpha part
  of the spec's `spec-files-and-alpha-version`, split from it (#465).
- `README.md`: opens with the table Reader, Comes for, Opens over the four readers of a spec,
  defined in `spec-directives/README.md`, beside it the root README of the directives and their
  MAJORs (#467).
- `tests/`, `lib/course.js`: `lexicon-keys` replaces `language-pack-keys`: `course/lexicon.yaml`
  holds every key of the spec's `course/README.md` section 7, every key its `teacher/README.md`
  uses is in `course/lexicon.yaml` or `teacher/lexicon.yaml`, and a group lives in one lexicon;
  `spec-yaml` requires a fifth key, `language`, an ISO 639-1 code; `lib/course.js` loads the
  lexicon of the course files the checks name (`ctx.lexicon`, formerly `ctx.pack`), no longer a
  pack chosen by the `language` of `course.yaml`; the fixtures' `lang/fr.yaml` move to the two
  lexicons, and two broken fixtures show the new failures (#493).
- `tests/`: `composition`, the fifth test of `check-spec`, verifies the form of a spec's
  `teacher/composition.yaml`: exactly five parts by id, a `loads` and a `from` in their closed
  lists, `draws` entries with `from`, `source` and `what`, a `from: spec` source the spec folder
  holds, the moments of `on-demand`; every fixture gains the composition of `valid/`, and nine
  broken fixtures show its failures (#497).
- `tests/`, `README.md`: `rule-files.js` exports nothing (the list of the families, exported for
  the classroom build by #499, is held by the spec MAJOR's `teacher/build/render-parts`); section
  2 says a spec MAJOR may hold a `teacher/build/` that renders the parts of the composition, read
  by a classroom build (#501).
- `tests/`, `README.md`: `scenarios`, the sixth test of `check-spec`, verifies the test
  scenarios of a spec MAJOR's `teacher/tests/`, when the folder exists: its
  `scenario.schema.yaml` compiles, every scenario is valid against it and named after its `id`,
  every slug it names is a rule of the protocol and every slug of an `expect` is in its `rules`;
  `valid/` gains a scenario, and five broken fixtures show its failures; sections 2 and 4 name
  the fresh tests (`classroom-builder/fresh-test`) as the implementation of demonstration (#507).
- `README.md`, `decisions/`: section 1 names the test scenarios among the spec's own files
  verified; section 8 describes the `teacher/tests/` of `valid/` and the broken fixtures of
  `scenarios`; decision `rules-with-level-and-method` points to section 8 for the tests of
  `check-spec` instead of naming them, and says where the rest of the teacher's conformance goes
  now (#515).
- `tests/`: `rule-files` accepts a group `purpose`, a non-empty string, on both rule files (the
  fixture `broken/rule-files-purpose`); `rule-slugs` defines the ids of `course/rules.yaml` in the
  namespace of the slugs, so a description cites a rule of a course as it cites a rule of the
  protocol (the fixture `broken/rule-slugs-course-duplicate`); `README.md` sections 1 and 8 say so
  (#524).
