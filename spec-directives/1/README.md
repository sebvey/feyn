# The spec directives, MAJOR 1

| Reader | Comes for | Opens |
|---|---|---|
| creator | nothing here: what a course is, in the spec | [`course-specs/linear-course/1/course/README.md`](../../course-specs/linear-course/1/course/README.md) |
| builder | nothing here: the shape of a course and the protocol, in the spec | [`course-specs/linear-course/1/README.md`](../../course-specs/linear-course/1/README.md) |
| verifier | conformance, levels, methods, severity | sections [2](#2-conformance), [3](#3-levels), [4](#4-methods), [5](#5-severity) |
| spec writer | the rule model, the versions, the tests of a spec's files | sections [1](#1-rules), [6](#6-versions), [8](#8-tests); [`decisions/`](decisions/), [`CHANGELOG.md`](CHANGELOG.md), [`tests/`](tests/) |

The readers are defined in [`spec-directives/README.md`](../README.md#the-readers).

Version 1.0.0-alpha: binding from the tag `spec-directives/v1.0.0` (section 6). This file is the
spec directives: how a spec is written and read: what a rule file holds, when a product conforms,
the levels and methods a rule carries, how the severity of a check follows from them, the
versions, the normative references and the tests of a spec's own files. It holds no rule on a
course or on the teacher, and nothing of one spec: the scope, the files, the categories, the list
of checks and the normative references of `linear-course` are in
`course-specs/linear-course/1/README.md`. The directives are decision `rules-with-level-and-method`
(the rule model, levels, methods, severity, conformance clause, normative references; the categories
are the spec's), decision `alpha-version-until-tag` (the version during the alpha) and decision
`checks-use-ajv-and-yaml` (the dependencies of `lib/`), in `decisions/` of this MAJOR, whose
reasons are not restated here; the files of `linear-course` are its decision
`spec-files-by-product`. A path such as `course/rules.yaml` is relative to the folder of a spec
MAJOR (`course-specs/linear-course/1/`).

- `README.md`: this file, the directives.
- `CHANGELOG.md`: the changes of the directives, « Unreleased » until the tag.
- `decisions/`: the decisions of the directives.
- `tests/`: the tests of a spec's own files, their fixtures and their `test-fixtures` (section 8).
- `lib/`, `package.json`, `package-lock.json`: the lib the checks of a spec and the tests share,
  and its dependencies (`yaml`, `ajv`), loaded by the checks of a spec MAJOR that declares this
  MAJOR in its `spec.yaml`.

## 1. Rules

A rule file is a list of groups, each a list of rules; a rule has an `id` (a slug), a `level`
(section 3), a `category` (`course-specs/linear-course/1/README.md` section 3), a `method`
(section 4), a `check` when one implements the method, a `text` and, where an observed
counterfactual exists, a `why`; a rule of the protocol also has an `origin`. A group may declare
`category` and `method` once for its rules, and a rule may override them; a group of
`teacher/rules.yaml` is a group of `teacher/README.md`, its slug as its `id` (decision
`rule-groups-replace-ranges`). A rule binds a product (section 2), so the rule files are two,
`course/rules.yaml` and `teacher/rules.yaml`. The spec's own files (the rule files, the schemas,
the slugs of the protocol, the language packs, `spec.yaml` and its version) are verified by the
tests of `check-spec`, which are not rules (section 8).

## 2. Conformance

Two classes of products: the **course**, its diagrams included, and the **teacher**.

- A course conforms when it holds every requirement of its rules (`course/rules.yaml`, and until
  #318 the rest of `course/README.md`), whatever the method that verifies each one. The blocking
  checks are a necessary condition, not a sufficient one: the review and taught-check do the rest,
  and a course tag certifies the whole.
- A teacher conforms when it holds every requirement of the protocol (`teacher/rules.yaml`,
  and until #318 the rest of `teacher/README.md`); the method of a rule of the protocol is
  demonstration, by the fresh tests. No teacher conforms yet, since no fresh test exists.
- Recommendations are outside conformance.

A rule binds a product, a course or a teacher. The language pack is not a product: it lives in
the folder of the spec MAJOR, written by the spec's authors, and its consistency is the spec's
own, like that of the rule files, the schemas, the slugs of the protocol and `spec.yaml`: the
tests of `check-spec` verify them (`language-pack-keys` for the packs), and they are not rules, so
they count toward no product's conformance (section 8).

## 3. Levels

A rule has a level, from ISO/IEC Directives Part 2, clause 7. The level is a field of the rule,
never a word parsed from its text; the verb of a rule of the spec matches it.

| Level | English | French |
|---|---|---|
| requirement | "shall", "shall not" | « doit », « ne doit pas » |
| recommendation | "should", "should not" | « il convient de », « il convient de ne pas » |
| permission | "may" (never in the negative) | « peut » |

"must" is not a level: ISO keeps it for external constraints. Possibility and capability ("can",
« peut ») are not a level either. A rule of the protocol is a prompt to the teacher, in « tu », at
the imperative: there the level is the field alone, the imperative counts as a requirement and
« peut » as a permission.

## 4. Methods

A rule states how one knows it holds, by one method of the closed list of ISO/IEC/IEEE 29148,
even before the check that implements it exists. A rule that no method could verify is
rewritten or removed.

| Method | What it does | What implements it in feyn |
|---|---|---|
| test | a deterministic run says yes or no | the scripts of `course/checks/` |
| analysis | reasoning over the whole course | taught-check (an agent workflow) |
| inspection | a reading, by a human or an agent | the review |
| demonstration | the system runs and is observed | the fresh tests of the teacher |

## 5. Severity

The severity of a check's failure is not declared: it follows from the rules the check verifies.
A check **blocks** when it verifies a requirement by test; in every other case it **reports**.
A check verifies rules of one category and one level, or it is split; its category and level
follow from its rules, and the check itself carries only its implementation (a script or an
agent).

## 6. Versions

**Purpose.** What a spec version and a course version promise, so that a change is classed
before it lands and a course runs against the checks of the MAJOR it declares.

| Reader | Needs | When |
|---|---|---|
| the maintainer | the bump a change makes, to the spec or to a course | classing a change; each release |
| the creator (human or agent) | the course changes that are a MAJOR (an identifier) | changing a released course |
| the reviewer | the class a course change claims in `CHANGELOG.md` | reviewing a course change |

The versions of a spec and of the directives, and their MAJOR folders, are decision
`versioned-objects-and-spec-layout` (`docs/decisions/versioned-objects-and-spec-layout.md`), the
spec's summarised in `course-specs/README.md`. A spec version is tagged `linear-course/vX.Y.Z`.

**The alpha** (decision `alpha-version-until-tag`). A MAJOR in preparation, of a spec or of the
directives, carries `<MAJOR>.0.0-alpha` in its folder until its tag, with no prerelease number
and no prerelease tag: the MAJOR 1 of `linear-course` is `1.0.0-alpha` in `1/` until
`linear-course/v1.0.0`. During the alpha, the entries of `CHANGELOG.md` carry no
bump class; its « Unreleased » section becomes `1.0.0` at the tag. `spec.yaml` carries the
version, and the test `spec-yaml` of `check-spec` holds it to `CHANGELOG.md` (section 8).

**The bump of a spec change**, from the tag on, written in levels for the rules of a course:

| Bump | When |
|---|---|
| MAJOR | the structure changes (files, fields, mandatory sections); a requirement added or made stricter; an optional field made mandatory; a recommendation made a requirement |
| MINOR | an optional element; a protocol rule added, changed or renamed (the old slug is burnt); a requirement made looser or made a recommendation; a recommendation added or made stricter; a language-pack key added or renamed, every pack updated |
| PATCH | wording; a false positive lifted |

A MAJOR lives while a served course version declares it, a course tag included; then it is
archived. Tooling reads every live MAJOR. An old MAJOR receives bug fixes only, as a PATCH,
never a tightening; a bug fix is ported to every live MAJOR.

A course declares the MAJOR it follows: `spec: linear-course@1`. `course-specs/check-course` reads
it and runs that MAJOR's checks (`course-specs/linear-course/1/README.md` section 5).

A course has its own version, tagged `<id>/vX.Y.Z` and recorded in its `CHANGELOG.md`: MAJOR
when an identifier changes (`course/README.md` section 2) or the course moves to a new spec MAJOR,
MINOR when what is taught changes (a case, a sub-concept, a stance, a duration), PATCH for
wording. A course in 0.x can still change anything, identifiers included.

**The directives' version.** The directives are versioned like a spec: one folder per MAJOR under
`spec-directives/`, a tag `spec-directives/vX.Y.Z`, a `CHANGELOG.md`. This MAJOR is `1.0.0-alpha`
in `1/` until the tag `spec-directives/v1.0.0`, posed with the spec's in #451, when its
« Unreleased » section becomes `1.0.0`. A spec MAJOR declares the directives MAJOR it follows in
its `spec.yaml` (`directives`), and its checks load the `lib/` and the package of that MAJOR; a
directives MAJOR lives while a live spec MAJOR declares it. The bump of a change to the
directives, from their tag on:

| Bump | When |
|---|---|
| MAJOR | a rule file that validated stops validating (a field made mandatory, a closed list narrowed) |
| MINOR | a field, a level or a method added |
| PATCH | wording |

## 7. Normative references

The standards a rule of the directives depends on, with the edition the directives read:

- ISO/IEC Directives Part 2, 9th edition (2021): the levels (section 3).
- ISO/IEC/IEEE 29148:2018: the methods (section 4).
- SemVer 2.0.0: the versions (section 6).
- YAML 1.2.2: the rule files and the schemas.
- JSON Schema 2020-12: the schemas, read by ajv's class `Ajv2020` (decision
  `checks-use-ajv-and-yaml`).

The standards the rules of one spec depend on are in the README of that spec MAJOR
(`course-specs/linear-course/1/README.md` section 4).

## 8. Tests

**The tests of `check-spec`** verify the spec's own files. They are not rules (decision
`rules-with-level-and-method`, amended by #339): they carry no category and no level, and each
failure blocks `check-spec` (exit code 1). They carry lists of
`linear-course` (the five categories and the nine families in `rule-files.js`, the pack keys in
`language-pack-keys.js`, the file names in `rule-slugs.js`): a named debt, idea #453; the lists
move to `spec.yaml` when a second spec needs them.

```
mise exec -- spec-directives/check-spec course-specs/linear-course/1
mise exec -- spec-directives/check-spec <spec-dir> --only rule-slugs
```

`spec-directives/check-spec <spec-dir>` reads `directives: <MAJOR>` in `<spec-dir>/spec.yaml` and
runs `spec-directives/<MAJOR>/tests/check-spec` on it, which runs the tests of the spec's own files,
not a course: `teacher/README.md`, `README.md`, `course/README.md`, `decisions/`,
`course/rules.yaml`, `teacher/rules.yaml`, `course/schemas/`, `lang/`, `spec.yaml` and
`CHANGELOG.md` of `<spec-dir>`. A `<spec-dir>` with no `spec.yaml`, or a `directives` MAJOR with no
folder, is refused (exit code 2, one line). Same output and `--only` as `check-course`, with no
summary line and a `--list` of ids alone; the file in a failure line is relative to `<spec-dir>`.
Their list is written in `spec-directives/1/tests/check-spec`, their scripts beside it. The dependencies are those of
this MAJOR, installed by `mise exec -- npm ci --prefix spec-directives/1`
(`course-specs/linear-course/1/course/checks/README.md`, "Install").

| Id | Script | Verifies | Reads |
|---|---|---|---|
| `rule-slugs` | `rule-slugs.js` | every rule and every group of rules of `teacher/README.md` is named by a slug, defined once in one namespace; every rule or group cited in `teacher/README.md`, `README.md`, `course/README.md` and `decisions/` is cited by a slug that is defined, a group as a group and a rule as a rule; none is named or cited by a number, no range « `a` à `b` » (decisions `rules-named-by-slug`, `rule-groups-replace-ranges`) | `teacher/README.md`, `README.md`, `course/README.md`, `decisions/` |
| `rule-files` | `rule-files.js` | `course/rules.yaml` and `teacher/rules.yaml` exist; a group has a non-empty `rules` list and may declare `id`, `title`, `category`, `method`; a rule has `id` (a slug), `level`, `category` and `method` (on the rule or its group), `text`, optional `check` and `why`, and in the protocol `origin`, no other key; a group of `teacher/rules.yaml` has an `id` that is a group of `teacher/README.md`; the closed lists (levels, methods, the categories of a course, the families of the protocol; a rule of the protocol is a demonstration); ids of rules and groups unique across the two files; every check named exists (`course/checks/<id>.js` of `<spec-dir>`, or of the folder `--checks-dir` names, or `.claude/workflows/<id>.js`); one category and one level per check; each `course/schemas/*.schema.yaml` compiles under `Ajv2020` and is named by the text of one rule of `course/rules.yaml`, and a schema named there exists (sections 1, 3 and 4; the spec MAJOR's `README.md` sections 2 and 3) | `course/rules.yaml`, `teacher/rules.yaml`, `course/schemas/`, `teacher/README.md` |
| `language-pack-keys` | `language-pack-keys.js` | every pack of `lang/` holds every key of `course/README.md` section 7 and every key `teacher/README.md` uses: a key a non-empty string, a list a non-empty list of strings (`course/README.md` 7) | `lang/`, `teacher/README.md` |
| `spec-yaml` | `spec-yaml.js` | `spec.yaml` holds `name`, `major`, `directives` and `version`, no other key; `name` a slug, `major` and `directives` positive integers, `version` `MAJOR.MINOR.PATCH` with an optional `-alpha` and `major` as its MAJOR; `version` agrees with the first `## ` section of `CHANGELOG.md`: « Unreleased » during the alpha (`<MAJOR>.0.0-alpha`), otherwise the section names `version` (`## 1.0.0`, a date after it allowed) (section 6) | `spec.yaml`, `CHANGELOG.md` |

`language-pack-keys` tests each `lang/*.yaml` of `<spec-dir>` against the keys of `course/README.md`
section 7 and every key `teacher/README.md` uses: a row of the pack tables of its "Keys and
parameters" section, or a `{group.key}` in a rule (the test reads the `teacher/README.md` of
`<spec-dir>`, so a new key there is required of the packs at once). A key is a non-empty string; the
lists (`typography.banned`, the `learner_says` lists) are non-empty lists of strings.
`checks.anaphora` is optional: `domain-first-sentence-standalone` reads it. The groups beside
those (`site`) are read by the site, not tested here. A `<spec-dir>` with no pack in `lang/` has
none to test. A course's checks read the pack of its language as before (`--lang-dir` included)
and say "see course/README.md section 7" when it is unusable; a pack given with `--lang-dir` lies
outside the spec's `lang/`, so no test verifies its keys.

A rule's slug is defined by a line of a rule family (`## <n>. …`) that opens on `**<slug>** `, or by
a table row of a family whose first cell is `**<slug>**` (the save-point table); a group's slug by a
heading of a family, « ### <title> (`<slug>`) » (one to five words). The `**Purpose.**` paragraph
that opens a family or a group defines nothing. Rules and groups share one namespace: a slug is
defined once. A rule is cited by a code span: in a rule family, every code span shaped like a slug
(two to five lowercase words joined by hyphens); in the tables of `teacher/README.md`, every code
span of a "Used in" or "Rule" column; elsewhere, the code spans that follow « rule », « rules »,
« règle » or « règles », joined by commas, « and », « to », « et », « à » (« rules `a`, `b` and
`c` »). A check id or a decision slug in code is not a rule, as long as no such word leads it.
Everywhere, the code spans that follow « group », « groups », « groupe » or « groupes » must be
groups, and those that follow « rule(s) » or « règle(s) » must be rules. A range, « `a` à `b` » or
« `a` to `b` », fails in `teacher/README.md`, `README.md` and `course/README.md`; `decisions/` are
not read for ranges, since they quote the ones they replaced.

Known limits:
- A code span after « group » that names something other than a rule group fails as a missing group.
- A `####` heading inside a family is neither a group nor read by the check: the rules under it stay in the group above.

**The fixtures.**

```
mise exec -- spec-directives/1/tests/test-fixtures
```

`test-fixtures` tests the spec fixtures, under `spec-directives/1/tests/fixtures/` (the course
fixtures are tested by `course-specs/linear-course/1/course/checks/test-fixtures`).

- `spec-directives/1/tests/fixtures/valid/`: a minimal spec (`teacher/README.md` with a string key
  and a list key, `README.md`, `course/README.md`, one decision, the two rule files with a rule of
  each method, one schema, `lang/fr.yaml`: the fixtures' pack plus the key of its
  `teacher/README.md`, `spec.yaml` at `1.0.0-alpha`, a `CHANGELOG.md` whose first section is
  « Unreleased »); every `check-spec` test passes, the check scripts its rules name found in
  `fixtures/checks/` (stubs, through `--checks-dir`). `fixtures/broken/<name>/` there: a copy of it
  with one defect and its `EXPECT` file; no other `check-spec` test may fail. The copies for
  `rule-slugs` and `rule-files` have no `lang/`, so `language-pack-keys` has no pack to test there.
  For `language-pack-keys`: a key of `course/README.md` section 7 missing, a group missing
  (`natures`), a key of `teacher/README.md` missing, a list key of `teacher/README.md` given as a
  string. For `spec-yaml`: `spec.yaml` missing, a key missing, a `version` whose MAJOR is not
  `major`, an alpha `version` over a released first section of `CHANGELOG.md`, a released `version`
  that differs from the version of that section. For `rule-slugs`: a missing slug, a duplicate slug,
  a rule cited by number, a missing group, a group whose slug is a rule's, a range, a range in
  `course/README.md`, a group cited as a rule. For `rule-files`: a missing level; a level, a method,
  a category and a family off their lists; a protocol group that `teacher/README.md` does not
  define; an id in both rule files; a check that does not exist; a check over two categories; a
  check over two levels; a schema that does not compile; a schema no rule names. The test also runs
  `spec-directives/check-spec` on each spec MAJOR of `course-specs/` whose `spec.yaml` declares
  `directives: 1` (`linear-course/1`), which must pass.

The fixtures are plain files: change `valid/` and the broken copies together, then run the test.
A new test of the spec's own files adds a script, its id in the list of
`spec-directives/1/tests/check-spec`, a row in the table of this section, and a broken fixture
under `spec-directives/1/tests/fixtures/broken/`; it verifies no rule.
