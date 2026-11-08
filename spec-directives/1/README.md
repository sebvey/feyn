# The spec directives, MAJOR 1

| Reader | Comes for | Opens |
|---|---|---|
| creator | nothing here: what a course is, in the spec | [`course-specs/linear-course/1/course/README.md`](../../course-specs/linear-course/1/course/README.md) |
| builder | nothing here: the shape of a course and the protocol, in the spec | [`course-specs/linear-course/1/README.md`](../../course-specs/linear-course/1/README.md) |
| verifier | conformance, levels, methods, severity | sections [2](#2-conformance), [3](#3-levels), [4](#4-methods), [5](#5-severity) |
| spec writer | the rule model, the versions, the tests of a spec's files | sections [1](#1-rules), [6](#6-versions), [8](#8-tests); [`decisions/`](decisions/), [`CHANGELOG.md`](CHANGELOG.md), [`tests/`](tests/) |

The readers are defined in [`spec-directives/README.md`](../README.md#the-readers).

Version 1.0.0-alpha: binding from the tag `spec-directives/v1.0.0` (section 6). This file is the spec directives: how a spec is written and read: what a rule file holds, when the course or a product conforms, the levels and methods a rule carries, how the severity of a check follows from them, the versions, the normative references and the tests of a spec's own files. It holds no rule on a course or on the teacher. Of the specs, it holds what every spec shares: the bump of a spec change and the version of a course (section 6); the paths and tags of `linear-course` it cites are examples. What belongs to one spec, the scope, the files, the categories, the list of checks and the normative references of `linear-course`, is in `course-specs/linear-course/1/README.md`. The directives are decision `rules-with-level-and-method` (the rule model, methods), decision `levels-from-iso-directives` (levels), decision `severity-from-level-and-method` (severity; the categories are the spec's), decision `conformity-of-the-course-and-products` (the conformance clause), decision `alpha-version-until-tag` (the version during the alpha) and decision `checks-use-ajv-and-yaml` (the dependencies of `lib/`), in `decisions/` of this MAJOR, whose reasons are not restated here; the files of `linear-course` are its decision `spec-files-by-product`. A path such as `course/rules.yaml` is relative to the folder of a spec MAJOR (`course-specs/linear-course/1/`).

- `README.md`: this file, the directives.
- `CHANGELOG.md`: the changes of the directives, « Unreleased » until the tag.
- `decisions/`: the decisions of the directives.
- `tests/`: the tests of a spec's own files, their fixtures and their `test-fixtures` (section 8).
- `lib/`, `package.json`, `package-lock.json`: the lib the checks of a spec and the tests share, and its dependencies (`yaml`, `ajv`), loaded by the checks of a spec MAJOR that declares this MAJOR in its `spec.yaml`.

## 1. Rules

A rule file is a list of groups, each a list of rules; a rule has an `id` (a slug), a `level` (section 3), a `category` (`course-specs/linear-course/1/README.md` section 3), a `method` (section 4), a `check` when one implements the method, a `text` and, where an observed counterfactual exists, a `why`. A group has a `purpose`, what the group is for, and may declare `category` and `method` once for its rules, and a rule may override them; a group of `teacher/rules.yaml` is a family, its category as its `id`, holding the rules placed directly under the family, or a group of that family, its slug as its `id` (decision `rule-groups-replace-ranges`), which follows the family in the file. A rule binds the course or a product (section 2), the teacher being the one product a rule binds today, so the rule files are two, `course/rules.yaml` and `teacher/rules.yaml`. The spec's own files (the rule files, the schemas, the slugs of the protocol, the lexicons, `spec.yaml` and its version, the composition of the teacher and its test scenarios) are verified by the tests of `check-spec`, which are not rules (section 8).

## 2. Conformance

A rule binds the **course**, its diagrams included, or a product; the one product a rule binds today is the **teacher**. Each conforms when it holds every requirement of its own.

- A course conforms when it holds every requirement of its rules (`course/rules.yaml`), whatever the method that verifies each one. The blocking checks are a necessary condition, not a sufficient one: the review and taught-check do the rest, and a course tag certifies the whole.
- A teacher conforms when it holds every requirement of the protocol (`teacher/rules.yaml`); the method of a rule of the protocol is demonstration, by the fresh tests (the test scenarios of the spec MAJOR's `teacher/tests/`, run by `classroom-builder/fresh-test`). No teacher conforms yet: the scenarios cover the rules a session of the spec's sample course exercises on their path, not every requirement.
- Recommendations are outside conformance.

The lexicons of a spec (`course/lexicon.yaml`, the words of the course files; `teacher/lexicon.yaml`, the words the teacher says and writes) are neither the course nor a product: they live in the folder of the spec MAJOR, written by the spec's authors, and their consistency is the spec's own, like that of the rule files, the schemas, the slugs of the protocol, `spec.yaml` and the composition of the teacher: the tests of `check-spec` verify them (`lexicon-keys` for the lexicons), and they are not rules, so they count toward the conformance of neither the course nor a product (section 8).

A spec MAJOR may also hold `teacher/build/`, the half of a classroom build that depends on the MAJOR (the form of its protocol, of its composition, its lexicon keys): a script that renders the parts of the composition of the teacher as text for a course, one document whose shape a schema of that folder fixes, read by a classroom build, which realises the parts for its target (`classroom-builder/`). It is the spec's tooling, as its checks are: neither a product nor a rule.

## 3. Levels

A rule has a level, from ISO/IEC Directives Part 2, clause 7. The level is a field of the rule, never a word parsed from its text; the verb of a rule of the spec matches it.

| Level | English | French |
|---|---|---|
| requirement | "shall", "shall not" | « doit », « ne doit pas » |
| recommendation | "should", "should not" | « il convient de », « il convient de ne pas » |
| permission | "may" (never in the negative) | « peut » |

"must" is not a level: ISO keeps it for external constraints. Possibility and capability ("can", « peut ») are not a level either. A rule of the protocol is a prompt to the teacher, in « tu », at the imperative: there the level is the field alone, the imperative counts as a requirement and « peut » as a permission.

## 4. Methods

A rule states how one knows it holds, by one method of the closed list of ISO/IEC/IEEE 29148, even before the check that implements it exists. A rule that no method could verify is rewritten or removed.

| Method | What it does | What implements it in feyn |
|---|---|---|
| test | a deterministic run says yes or no | the scripts of `course/checks/` |
| analysis | reasoning over the whole course | taught-check (an agent workflow) |
| inspection | a reading, by a human or an agent | the review |
| demonstration | the system runs and is observed | the fresh tests of the teacher: `classroom-builder/fresh-test` runs the teacher on a test scenario of the spec MAJOR's `teacher/tests/` and judges it, a script and a fresh agent |

## 5. Severity

The severity of a check's failure is not declared: it follows from the rules the check verifies. A check **blocks** when it verifies a requirement by test; in every other case it **reports**. A check verifies rules of one category and one level, or it is split; its category and level follow from its rules, and the check itself carries only its implementation (a script or an agent).

## 6. Versions

**Purpose.** What a spec version and a course version promise, so that a change is classed before it lands and a course runs against the checks of the MAJOR it declares.

| Reader | Needs | When |
|---|---|---|
| the maintainer | the bump a change makes, to the spec or to a course | classing a change; each release |
| the creator (human or agent) | the course changes that are a MAJOR (an identifier) | changing a released course |
| the reviewer | the class a course change claims in `CHANGELOG.md` | reviewing a course change |

The versions of a spec and of the directives, and their MAJOR folders, are decision `versioned-objects-and-spec-layout` (`docs/decisions/versioned-objects-and-spec-layout.md`), the spec's summarised in `course-specs/README.md`. A spec version is tagged `linear-course/vX.Y.Z`.

**The alpha** (decision `alpha-version-until-tag`). A MAJOR in preparation, of a spec or of the directives, carries `<MAJOR>.0.0-alpha` in its folder until its tag, with no prerelease number and no prerelease tag: the MAJOR 1 of `linear-course` is `1.0.0-alpha` in `1/` until `linear-course/v1.0.0`. During the alpha, the entries of `CHANGELOG.md` carry no bump class; its « Unreleased » section becomes `1.0.0` at the tag. `spec.yaml` carries the version, and the test `spec-yaml` of `check-spec` holds it to `CHANGELOG.md` (section 8).

**The bump of a spec change**, from the tag on, written in levels for the rules of a course:

| Bump | When |
|---|---|
| MAJOR | the structure changes (files, fields, mandatory sections); a requirement added or made stricter; an optional field made mandatory; a recommendation made a requirement |
| MINOR | an optional element; a protocol rule added, changed or renamed (the old slug is burnt); a requirement made looser or made a recommendation; a recommendation added or made stricter; a lexicon key added or renamed |
| PATCH | wording; a false positive lifted |

A MAJOR lives while a served course version declares it, a course tag included; then it is archived. Tooling reads every live MAJOR. An old MAJOR receives bug fixes only, as a PATCH, never a tightening; a bug fix is ported to every live MAJOR.

A course declares the MAJOR it follows: `spec: linear-course@1`. `course-specs/check-course` reads it and runs that MAJOR's checks (`course-specs/linear-course/1/README.md` section 5).

A course has its own version, tagged `<id>/vX.Y.Z` and recorded in its `CHANGELOG.md`: MAJOR when an identifier changes (`course/README.md` section 3) or the course moves to a new spec MAJOR, MINOR when what is taught changes (a case, a unit, a stance, a duration), PATCH for wording. A course in 0.x can still change anything, identifiers included.

**The directives' version.** The directives are versioned like a spec: one folder per MAJOR under `spec-directives/`, a tag `spec-directives/vX.Y.Z`, a `CHANGELOG.md`. This MAJOR is `1.0.0-alpha` in `1/` until the tag `spec-directives/v1.0.0`, posed with the spec's in #451, when its « Unreleased » section becomes `1.0.0`. A spec MAJOR declares the directives MAJOR it follows in its `spec.yaml` (`directives`), and its checks load the `lib/` and the package of that MAJOR; a directives MAJOR lives while a live spec MAJOR declares it. The bump of a change to the directives, from their tag on:

| Bump | When |
|---|---|
| MAJOR | a rule file that validated stops validating (a field made mandatory, a closed list narrowed) |
| MINOR | a field, a level or a method added |
| PATCH | wording |

## 7. Normative references

The standards a rule of the directives depends on, with the edition the directives read:

- ISO/IEC Directives Part 2, 9th edition (2021): the levels (section 3).
- ISO/IEC/IEEE 29148:2018: the methods (section 4); its text, paid, was not read: the methods were checked against secondary sources.
- SemVer 2.0.0: the versions (section 6).
- YAML 1.2.2: the rule files and the schemas.
- JSON Schema 2020-12: the schemas, read by ajv's class `Ajv2020` (decision `checks-use-ajv-and-yaml`).

The standards the rules of one spec depend on are in the README of that spec MAJOR (`course-specs/linear-course/1/README.md` section 4).

## 8. Tests

**The tests of `check-spec`** verify the spec's own files. They are not rules (decision `conformity-of-the-course-and-products`, amended by #339): they carry no category and no level, and each failure blocks `check-spec` (exit code 1). They carry lists of `linear-course` (the five categories and the nine families in `rule-files.js`, the keys of section 7 in `lexicon-keys.js`, the file names in `rule-slugs.js`): a named debt, idea #485; the lists move to `spec.yaml` when a second spec needs them. The nine families are also held, by category, by the spec MAJOR's `teacher/build/render-parts`, which finds a family of the protocol by its category: the move carries it, and `rule-files.js` exports nothing. `composition.js` adds none (idea #485): its closed lists are the composition model's, and a `from: spec` source is checked against `<spec-dir>`, not against a list of file names; nor does `scenarios.js`, which reads the schema the spec MAJOR's `teacher/tests/` holds.

```
mise exec -- spec-directives/check-spec course-specs/linear-course/1
mise exec -- spec-directives/check-spec <spec-dir> --only rule-slugs
```

`spec-directives/check-spec <spec-dir>` reads `directives: <MAJOR>` in `<spec-dir>/spec.yaml` and runs `spec-directives/<MAJOR>/tests/check-spec` on it, which runs the tests of the spec's own files, not a course: `teacher/README.md`, `README.md`, `course/README.md`, `decisions/`, `course/rules.yaml`, `teacher/rules.yaml`, `course/schemas/`, `course/lexicon.yaml`, `teacher/lexicon.yaml`, `teacher/composition.yaml`, `teacher/tests/`, `spec.yaml` and `CHANGELOG.md` of `<spec-dir>`. A `<spec-dir>` with no `spec.yaml`, or a `directives` MAJOR with no folder, is refused (exit code 2, one line). Same output and `--only` as `check-course`, with no summary line and a `--list` of ids alone, after a `<spec-dir>`; `--list` without a folder is the MAJOR runner's (`spec-directives/1/tests/check-spec --list`), the dispatcher prints its usage (exit code 2). The file in a failure line is relative to `<spec-dir>`. Their list is written in `spec-directives/1/tests/check-spec`, their scripts beside it. The dependencies are those of this MAJOR, installed by `mise exec -- npm ci --prefix spec-directives/1` (`course-specs/linear-course/1/course/checks/README.md`, "Install").

| Id | Script | Verifies | Reads |
|---|---|---|---|
| `rule-slugs` | `rule-slugs.js` | every rule and every group of rules of `teacher/rules.yaml` is named by a slug, defined once in one namespace; every rule or group cited in the `text` and `why` of `teacher/rules.yaml`, in `teacher/README.md`, `README.md`, `course/README.md` and `decisions/` (where a decision cites none, decision `decision-format`) is cited by a slug that is defined, a group as a group and a rule as a rule; none is named or cited by a number, no range « `a` à `b` » (decisions `rules-named-by-slug`, `rule-groups-replace-ranges`) | `teacher/rules.yaml`, `teacher/README.md`, `README.md`, `course/README.md`, `decisions/` |
| `rule-files` | `rule-files.js` | `course/rules.yaml` and `teacher/rules.yaml` exist; a group has a non-empty `rules` list and a `purpose` (a non-empty string), and may declare `id`, `title`, `category`, `method`; a rule has `id` (a slug), `level`, `category` and `method` (on the rule or its group), `text`, optional `check` and `why`, no other key; a group of `teacher/rules.yaml` has an `id` and a `category`, and is a family (its `id` its category) or a group of a family whose group comes before it; the closed lists (levels, methods, the categories of a course, the families of the protocol; a rule of the protocol is a demonstration); ids of rules and groups unique across the two files; every check named exists (`course/checks/<id>.js` of `<spec-dir>`, a script or an agent workflow, or of the folder `--checks-dir` names); one category and one level per check; each `course/schemas/*.schema.yaml` compiles under `Ajv2020` and is named by the text of one rule of `course/rules.yaml`, and a schema named there exists (sections 1, 3 and 4; the spec MAJOR's `README.md` sections 2 and 3) | `course/rules.yaml`, `teacher/rules.yaml`, `course/schemas/` |
| `lexicon-keys` | `lexicon-keys.js` | `course/lexicon.yaml` holds every key of `course/README.md` section 7; every key the protocol uses (`teacher/README.md`, `teacher/rules.yaml`) is in `course/lexicon.yaml` or `teacher/lexicon.yaml`; a group lives in one lexicon only; a key a non-empty string, a list a non-empty list of strings (`course/README.md` 7) | `course/lexicon.yaml`, `teacher/lexicon.yaml`, `teacher/README.md`, `teacher/rules.yaml` |
| `spec-yaml` | `spec-yaml.js` | `spec.yaml` holds `name`, `major`, `directives`, `version` and `language`, no other key; `name` a slug, `major` and `directives` positive integers, `version` `MAJOR.MINOR.PATCH` with an optional `-alpha` and `major` as its MAJOR, `language` an ISO 639-1 code, the language of the spec; `version` agrees with the first `## ` section of `CHANGELOG.md`: « Unreleased » during the alpha (`<MAJOR>.0.0-alpha`), otherwise the section names `version` (`## 1.0.0`, a date after it allowed) (section 6) | `spec.yaml`, `CHANGELOG.md` |
| `composition` | `composition.js` | `teacher/composition.yaml` exists and holds exactly five parts, ids `permanent`, `on-demand`, `course-reads`, `learner-memory`, `permissions`; a part has `loads`, one of `every-message`, `at-a-moment`, `during-the-session`, `at-start-and-save-points`, `always`, and `draws`, a non-empty list whose entries have `from`, one of `spec`, `course`, `learner`, `classroom`, `source` and `what`; a `from: spec` source is a file or folder of `<spec-dir>`; `on-demand` has `moments`, each with `id`, `when`, a list `rules` and `draws`; the form only, never the sense, which the fresh tests judge | `teacher/composition.yaml` |
| `scenarios` | `scenarios.js` | when `teacher/tests/` exists: `teacher/tests/scenario.schema.yaml` compiles under `Ajv2020`; every other `*.yaml` of the folder, a test scenario, is valid against it and its `id` is its file name; every slug it names, in `rules` and in the `rules` of an `expect`, is a rule of the protocol (`teacher/rules.yaml`), and every slug of an `expect` is in its `rules`; the form only, never what a run shows, which `classroom-builder/fresh-test` judges | `teacher/tests/`, `teacher/rules.yaml` |

`lexicon-keys` tests `course/lexicon.yaml` of `<spec-dir>` against the keys of `course/README.md` section 7, and the lexicons of the course files and of the teacher, `course/lexicon.yaml` and `teacher/lexicon.yaml`, against every key the protocol uses: a row of the lexicon tables of the « Clés et paramètres » section of `teacher/README.md` (a value that opens on « liste » is a list), or a `{group.key}` in a `purpose`, a `text` or a `why` of `teacher/rules.yaml` (the test reads the files of `<spec-dir>`, so a new key there is required of the lexicons at once); a group lives in one lexicon only. A key is a non-empty string; the lists (`typography.banned`, the `learner_says` lists) are non-empty lists of strings. A `<spec-dir>` with neither of these lexicons has none to test. A course's checks read the spec's `course/lexicon.yaml` (`check-course --lexicon <file>` reads another, the fixtures') and say "see course/README.md section 7" when it is unusable; a lexicon given with `--lexicon` lies outside the spec, so no test verifies its keys.

A rule's slug is defined by the `id` of a rule of `teacher/rules.yaml`, a group's slug by the `id` of a group (one to five words; a family is the group whose `id` is its category). Rules and groups share one namespace: a slug is defined once. A rule is cited by a code span: in the tables of `teacher/README.md`, every code span of a "Used in" or "Rule" column; in the `text` and `why` of a rule of `teacher/rules.yaml`, every code span shaped like a rule slug, which must be a rule or a group; in `teacher/README.md`, `README.md`, `course/README.md` and `decisions/`, the code spans that follow « rule », « rules », « règle » or « règles », joined by commas, « and », « to », « et », « à » (« rules `a`, `b` and `c` »). There, a check id or a decision slug in code is not a rule, as long as no such word leads it. Everywhere, the code spans that follow « group », « groups », « groupe » or « groupes » must be groups, and those that follow « rule(s) » or « règle(s) » must be rules. A range, « `a` à `b` » or « `a` to `b` », fails in `teacher/rules.yaml`, `teacher/README.md`, `README.md` and `course/README.md`; `decisions/` are not read for ranges, since a decision cites no rule id (decision `decision-format`).

Known limits:
- A code span after « group » that names something other than a rule group fails as a missing group.

**The fixtures.**

```
mise exec -- spec-directives/1/tests/test-fixtures
```

`test-fixtures` tests the spec fixtures, under `spec-directives/1/tests/fixtures/` (the course fixtures are tested by `course-specs/linear-course/1/course/checks/test-fixtures`).

- `spec-directives/1/tests/fixtures/valid/`: a minimal spec (`teacher/README.md` with a string key and a list key, `README.md`, `course/README.md`, one decision, the two rule files with a rule of each method, `teacher/rules.yaml` with two families and a group, one schema, `course/lexicon.yaml` (the course fixtures' lexicon) and `teacher/lexicon.yaml` (the spec's, plus the key of its `teacher/README.md`), `spec.yaml` at `1.0.0-alpha`, a `CHANGELOG.md` whose first section is « Unreleased », a `teacher/composition.yaml` of five parts whose `from: spec` sources are files every copy holds, a `teacher/tests/` with `scenario.schema.yaml` and one test scenario); every `check-spec` test passes, the check scripts its rules name found in `fixtures/checks/` (stubs, through `--checks-dir`). `fixtures/broken/<name>/` there: a copy of it with one defect and its `EXPECT` file; no other `check-spec` test may fail, but those its `also:` line names, which the same defect fails (a slug defined twice in `teacher/rules.yaml` fails `rule-slugs` and `rule-files`). Every copy holds the composition of `valid/`, except a copy whose defect is in it. The copies for `rule-slugs` and `rule-files` have no lexicon, so `lexicon-keys` has none to test there. For `lexicon-keys`: a key of `course/README.md` section 7 missing, a group missing (`natures`), a key of `teacher/README.md` missing, a list key of `teacher/README.md` given as a string, a group in both lexicons. For `spec-yaml`: `spec.yaml` missing, a key missing, a `language` that is not an ISO 639-1 code, a `version` whose MAJOR is not `major`, an alpha `version` over a released first section of `CHANGELOG.md`, a released `version` that differs from the version of that section. For `rule-slugs`: a missing slug, a duplicate slug, a rule cited by number, a missing group, a group whose slug is a rule's, a range, a range in `course/README.md`, a group cited as a rule, a « Used in » cell of `teacher/README.md` citing a slug `teacher/rules.yaml` does not define, a code span shaped like a slug in the `text` of a rule that no rule defines. For `rule-files`: a missing level; a level, a method, a category and a family off their lists; a protocol group before the group of its family; an id in both rule files; a check that does not exist; a check over two categories; a check over two levels; a schema that does not compile; a schema no rule names; an empty group `purpose`; a group of `course/rules.yaml` without one; a group of `teacher/rules.yaml` without one. For `composition`: `teacher/composition.yaml` missing, four parts, a part with no `draws`, a part with no `loads`, a `loads` and a `from` off their lists, a `from: spec` source the spec folder does not hold, an entry with no `what`, an `on-demand` with no `moments`. For `scenarios`: `teacher/tests/scenario.schema.yaml` missing, a scenario not valid against it, an `id` that is not the file name, a slug that is not a rule of the protocol, a slug of an `expect` not in the scenario's `rules`. The test also runs `spec-directives/check-spec` on each spec MAJOR of `course-specs/` whose `spec.yaml` declares `directives: 1` (`linear-course/1`), which must pass.

The fixtures are plain files: change `valid/` and the broken copies together, then run the test. A new test of the spec's own files adds a script, its id in the list of `spec-directives/1/tests/check-spec`, a row in the table of this section, and a broken fixture under `spec-directives/1/tests/fixtures/broken/`; it verifies no rule.
