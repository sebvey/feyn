# The spec directives, MAJOR 1

| Reader | Comes for | Opens |
|---|---|---|
| creator | nothing here: what a course is, in the spec | [`product-lines/linear-fr/1/course/README.md`](../../product-lines/linear-fr/1/course/README.md) |
| builder | nothing here: the shape of a course and of its products, in the spec | [`product-lines/linear-fr/1/README.md`](../../product-lines/linear-fr/1/README.md) |
| verifier | nothing here: when a course conforms, the levels and the severity of a check, in the spec | [`product-lines/linear-fr/1/README.md`](../../product-lines/linear-fr/1/README.md#3-categories-levels-and-severity) section 3 |
| spec writer | the manifest, the rule model, the versions, the tests of a spec's files | sections [1](#1-the-manifest), [2](#2-rule-files), [3](#3-versions), [4](#4-tests); [`decisions/`](decisions/), [`CHANGELOG.md`](CHANGELOG.md), [`tests/`](tests/) |

The readers are defined in [`spec-directives/README.md`](../README.md#the-readers).

Version 1.0.0-alpha: binding from the tag `spec-directives/v1.0.0` (section 3). This file is the spec directives: the form of a spec that the tools of the directives read, the manifest of a spec MAJOR (section 1), its rule files (section 2), its versions (section 3) and the tests of its own files (section 4). It holds a sentence only when a tool of the directives reads what it describes; what one spec decides, its classifications, when its course or a product conforms, which of its checks block, is that spec's (decision `directives-hold-what-the-tools-read`): for `linear-fr`, `product-lines/linear-fr/1/README.md`, whose paths and tags this file cites as examples. The directives are decision `directives-hold-what-the-tools-read` (what they hold), decision `rules-with-level-and-method` (the rule model), decision `alpha-version-until-tag` (the version during the alpha) and decision `checks-use-ajv-and-yaml` (the dependencies of `lib/`), in `decisions/` of this MAJOR, whose reasons are not restated here. A path such as `course/rules.yaml` is relative to the folder of a spec MAJOR (`product-lines/linear-fr/1/`).

- `README.md`: this file, the directives.
- `CHANGELOG.md`: the changes of the directives, « Unreleased » until the tag.
- `decisions/`: the decisions of the directives.
- `spec.schema.yaml`: the form of a spec MAJOR's manifest, its `spec.yaml` (section 1).
- `rules.schema.yaml`: the form of a rule file, the rule model (section 2).
- `tests/`: the tests of a spec's own files, their fixtures and their `test-fixtures`, and `test-lib`, the tests of the readers of `lib/` (section 4).
- `lib/`, `package.json`, `package-lock.json`: the lib the checks of a spec and the tests share, its helpers (`lib/common.js`: a failure, a slug, a number, a release heading), the reader of the manifest (`lib/manifest.js`) and the reader of CommonMark, `lib/mdast.js` (decision `marks-read-by-one-reader`), among it, the parser of a course and the readers of its concept references and of its glossary being the spec MAJOR's (`course.parser`, `course.refs` and `course.glossary` of its `spec.yaml`), and its dependencies (`yaml`, `ajv`, `mdast-util-from-markdown`), loaded by the checks of a spec MAJOR that declares this MAJOR in its `spec.yaml`.

## 1. The manifest

A spec MAJOR describes itself in its manifest, `spec.yaml`, which every test of `check-spec` reads through one reader, `lib/manifest.js`, loaded once for every test: none parses `spec.yaml` its own way, and none names a file or a list of one spec. `spec.yaml` holds, in this order: the identity of the spec MAJOR (`name`, `major`, `directives`, `version`, `language`), then `spec:`, its own files, then `course:`, the files of the course, the input of the builds of the products, then `products:`, the files of each product, then `lists:`, the closed lists of the spec, then `files:`, what each role holds and who reads it. A file is named by its role, mapped to one path relative to the spec MAJOR, a file or a folder (`rules: course/rules.yaml`). Its form is `spec.schema.yaml` (JSON Schema 2020-12 written in YAML), which the test `spec-yaml` holds it to (section 4):

| Part | Holds | Required |
|---|---|---|
| identity | `name` (a slug ending with `-<language>`), `major`, `directives`, `version`, `language` (ISO 639-1), each a top-level key on a line of its own, which the builds and the course checks read by a line pattern before they know which directives to load | all |
| `spec` | `manifest`, `readme`, `changelog`, `decisions`, each at the path the directives fix (`spec.yaml`, `README.md`, `CHANGELOG.md`, `decisions`) | none |
| `course` | `readme`, `rules`, `lexicon`, `form`, `schemas`, `checks`, `parser`, `refs`, `glossary`, `templates`, `samples` | `course`, its `readme` and `rules` |
| `products` | each product by its name (a slug, neither `course` nor `spec`), a map of its roles, each a slug, to their paths; the directives fix no role of a product | none |
| `lists` | `classifications`, by the owner of a rule file, `course` or a product's name: each key with its values, a list of slugs (section 2); `lexicons`, by owner, `course` or a product's name: each group, each key with its kind, `string` or `list` | none |
| `files` | keyed as the roles (`files.course.rules`, `files.products.site.build`, `files.spec.readme`): `holds`, one line on what the file or folder holds, and `readers`, among `creator`, `builder`, `verifier`, `spec writer` (`spec-directives/README.md`, « The readers »); `undeclared`, for a product the manifest does not declare, by its name, one line saying why | none; when present, an entry for every role declared |

A product line always has a course and declares its products freely. The tests read a role by its name wherever the course or a product declares it: `rules`, a rule file (section 2); `readme`, a description, read for the rules it cites; `lexicon`, a lexicon; `checks`, the folder of the check scripts a rule file names. Each test of `check-spec` and each check of a course says which roles it reads, by the export `reads` of its script (`reads: ['course.rules', 'course.schemas']`, `products.<name>.rules` for the role of every product), never in a list written apart. A test whose files the manifest does not declare checks nothing and says so on its line, `<id>: checked nothing: spec.yaml declares no <role>`, which leaves the exit code 0; a file declared and missing fails.

## 2. Rule files

A rule file is the form of `rules.schema.yaml` (JSON Schema 2020-12 written in YAML), common to the rules of the course and to those of a product, which the test `rule-files` holds every rule file the manifest declares to (section 4):

- a rule file is a map whose one key is `groups:`, a non-empty list of groups;
- a group has `purpose`, what the group is for, and `rules`, a non-empty list of rules; it may have an `id` (a slug of one to five words) and a `title`, and may declare `method` and each classification of its file once for its rules, which a rule may override;
- a rule has `id`, a slug of two to five words; `text`, what the course holds or what the product does, in the third person, which the schema cannot read; `why`, optional, the reason it is expected; `method`, on the rule or its group; then at most one of `check`, the id of the check that implements the method, and `criterion`, what a judge or a reader applies; and the classifications its spec declares for its file, on the rule or its group; no other key.

A rule states how one knows it holds, by one method of the closed list of ISO/IEC/IEEE 29148, even before the check that implements it exists. A rule that no method could verify is rewritten or removed.

| Method | What it does |
|---|---|
| test | a deterministic run says yes or no |
| analysis | reasoning over the whole of what the rule binds |
| inspection | a reading, by a human or an agent |
| demonstration | the system runs and is observed |

**The classifications** are declared by each spec in its manifest, by the owner of the rule file: `lists.classifications.<owner>.<key>: [<values>]`, `<owner>` being `course` or a product's name, `<key>` a slug that is not a key of the model. Every rule of that owner's file carries each key, on the rule or its group, its value one of the list's; a file whose owner declares none carries none. The rules a check implements carry the same value of each classification, so that a spec can derive from them what the check is; a check over two values is split. What a classification means, and what follows from it, is the spec's: `linear-fr` declares the level and the category of the rules of a course (`product-lines/linear-fr/1/README.md` section 3).

Every rule and every group is named by a slug, defined once across the rule files, rules and groups sharing one namespace; it is cited by that slug, never by a number nor by a range (section 4, `rule-slugs`). A check a rule names exists, `<check>.js` in the folder of the role `checks` of the file's owner. A rule file of the course names each schema of `course.schemas` by its path in the text of exactly one rule.

## 3. Versions

**Purpose.** What a spec version and a course version promise, so that a change is classed before it lands and a course runs against the checks of the MAJOR it declares.

| Reader | Needs | When |
|---|---|---|
| the maintainer | the bump a change makes, to the spec or to a course | classing a change; each release |
| the creator (human or agent) | the course changes that are a MAJOR (an identifier) | changing a released course |
| the reviewer | the class a course change claims in `CHANGELOG.md` | reviewing a course change |

The versions of a spec and of the directives, and their MAJOR folders, are decision `versioned-objects-and-spec-layout` (`docs/decisions/versioned-objects-and-spec-layout.md`), the spec's summarised in `product-lines/README.md`. A spec version is tagged `linear-fr/vX.Y.Z`.

**The alpha** (decision `alpha-version-until-tag`). A MAJOR in preparation, of a spec or of the directives, carries `<MAJOR>.0.0-alpha` in its folder until its tag, with no prerelease number and no prerelease tag: the MAJOR 1 of `linear-fr` is `1.0.0-alpha` in `1/` until `linear-fr/v1.0.0`. During the alpha, the entries of `CHANGELOG.md` carry no bump class; its « Unreleased » section becomes `1.0.0` at the tag. `spec.yaml` carries the version, and the test `spec-yaml` holds it to `CHANGELOG.md` (section 4).

**The bump of a spec change**, from the tag on. A binding rule is a rule of the course whose classification the spec declares binding; a spec may write this table in its own words, in its README (`linear-fr`: `product-lines/linear-fr/1/README.md` section 3).

| Bump | When |
|---|---|
| MAJOR | the structure changes (files, fields, mandatory sections); a binding rule added or made stricter; an optional field made mandatory; a rule made binding |
| MINOR | an optional element; a rule of a product added, changed or renamed (the old slug is burnt); a binding rule made looser or no longer binding; a rule that is not binding added or made stricter; a lexicon key added or renamed |
| PATCH | wording; a false positive lifted |

A MAJOR lives while a served course version declares it, a course tag included; then it is archived. Tooling reads every live MAJOR. An old MAJOR receives bug fixes only, as a PATCH, never a tightening; a bug fix is ported to every live MAJOR.

A course declares the MAJOR it follows: `spec: linear-fr@1`. `product-lines/check-course` reads it and runs that MAJOR's checks (`product-lines/linear-fr/1/README.md` section 5).

A course has its own version, tagged `<id>/vX.Y.Z` and recorded in its `CHANGELOG.md`: MAJOR when an identifier changes (`course/README.md` section 3) or the course moves to a new spec MAJOR, MINOR when what is taught changes (a case, a unit, a stance, a duration), PATCH for wording. A course in 0.x can still change anything, identifiers included.

**The directives' version.** The directives are versioned like a spec: one folder per MAJOR under `spec-directives/`, a tag `spec-directives/vX.Y.Z`, a `CHANGELOG.md`. This MAJOR is `1.0.0-alpha` in `1/` until the tag `spec-directives/v1.0.0`, posed with the spec's in #451, when its « Unreleased » section becomes `1.0.0`. A spec MAJOR declares the directives MAJOR it follows in its `spec.yaml` (`directives`), and its checks load the `lib/` and the package of that MAJOR; a directives MAJOR lives while a live spec MAJOR declares it. The bump of a change to the directives, from their tag on:

| Bump | When |
|---|---|
| MAJOR | a manifest or a rule file that validated stops validating (a key made mandatory, a closed list narrowed) |
| MINOR | a key of the manifest or of the rule model, or a method, added |
| PATCH | wording |

## 4. Tests

**The tests of `check-spec`** verify the spec's own files. They are not rules: they carry no classification, each failure blocks `check-spec` (exit code 1), and none counts toward the conformance of the course or of a product. They read the files from the manifest (section 1); the lists they keep in their code are the directives', common to every spec: the methods (section 2).

```
mise exec -- spec-directives/check-spec product-lines/linear-fr/1
mise exec -- spec-directives/check-spec <spec-dir> --only rule-slugs
```

`spec-directives/check-spec <spec-dir>` reads `directives: <MAJOR>` in `<spec-dir>/spec.yaml` and runs `spec-directives/<MAJOR>/tests/check-spec` on it, which runs the tests of the spec's own files, not a course: `spec.yaml`, `README.md`, `CHANGELOG.md` and `decisions/` of `<spec-dir>` (declared or not under `spec:`), and the files its manifest declares. `--checks-dir` defaults to the manifest's `course.checks`, for the checks the rules of the course name. A `<spec-dir>` with no `spec.yaml`, or a `directives` MAJOR with no folder, is refused (exit code 2, one line). Same output and `--only` as `check-course`, with no summary line and a `--list` of ids alone, after a `<spec-dir>`; `--list` without a folder is the MAJOR runner's (`spec-directives/1/tests/check-spec --list`), the dispatcher prints its usage (exit code 2). The file in a failure line is relative to `<spec-dir>`. Their list is written in `spec-directives/1/tests/check-spec`, their scripts beside it. The dependencies are those of this MAJOR, installed by `mise exec -- npm ci --prefix spec-directives/1` (`product-lines/linear-fr/1/course/checks/README.md`, "Install").

| Id | Script | Verifies |
|---|---|---|
| `rule-slugs` | `rule-slugs.js` | every rule and every group of every rule file the manifest declares is named by a slug, defined once across them; every rule or group cited in the `text` and `why` of a rule, in the descriptions the manifest declares (the role `readme` of the course and of each product), `README.md` and `decisions/` (where a decision cites none, decision `decision-format`) is cited by a slug that is defined, a group as a group and a rule as a rule; none is named or cited by a number, no range « `a` à `b` » (section 2) |
| `rule-files` | `rule-files.js` | every rule file the manifest declares exists and is valid against `rules.schema.yaml` (`Ajv2020`), with the classifications its owner declares (section 2); `lists.classifications` names the course or a product that declares a rule file; ids of rules and groups unique across the rule files; every check named exists (`<id>.js` in the role `checks` of the file's owner, a script or an agent workflow, or in the folder `--checks-dir` names for the course); the rules of a check share each value of each classification; each `*.schema.yaml` of `course.schemas` compiles under `Ajv2020` and is named by the text of one rule of the course, by its path, and a schema named there exists |
| `lexicon-keys` | `lexicon-keys.js` | each lexicon the manifest declares (the role `lexicon` of the course and of each product) exists; the lexicon of each owner holds every key of `lists.lexicons.<owner>`, each of its kind, a key a non-empty string, a list a non-empty list of strings; a `lists.lexicons` owner whose lexicon the manifest does not declare fails; when the manifest declares `course.readme`, the table of the course lexicon there lists, group by group, the keys of `lists.lexicons.course`, no more and no less |
| `spec-yaml` | `spec-yaml.js` | `spec.yaml` is valid against `spec.schema.yaml` (`Ajv2020`), each failure naming the key at fault: its identity, `spec:`, `course:`, `products:`, `lists:` and `files:` as section 1 says, no other key; when it has a `files:`, every role it declares has its entry there and its path exists, an entry names a role it declares, a product of `files.undeclared` is not declared; `name` a slug, `major` and `directives` positive integers written as such, `version` `MAJOR.MINOR.PATCH` with an optional `-alpha` and `major` as its MAJOR, `language` an ISO 639-1 code, the language of the spec, `directives` and `language` each on a line of its own; `name` ends with its language, `-<language>` (`linear-fr`): a course of another language follows another spec, whose name says so; `version` agrees with the first `## ` section of `CHANGELOG.md`: « Unreleased » during the alpha (`<MAJOR>.0.0-alpha`), otherwise the section names `version` (`## 1.0.0`, a date after it allowed) (section 3) |

A rule's slug is defined by the `id` of a rule, a group's slug by the `id` of a group, in a rule file the manifest declares. A rule is cited by a code span: in the tables of a description, every code span of a "Used in" or "Rule" column; in the `text` and `why` of a rule, in a description, `README.md` and `decisions/`, the code spans that follow « rule », « rules », « règle » or « règles », joined by commas, « and », « to », « et », « à » (« rules `a`, `b` and `c` »). There, a check id or a decision slug in code is not a rule, as long as no such word leads it. Everywhere, the code spans that follow « group », « groups », « groupe » or « groupes » must be groups, and those that follow « rule(s) » or « règle(s) » must be rules. A range, « `a` à `b` » or « `a` to `b` », fails in a rule file, a description and `README.md`; `decisions/` are not read for ranges, since a decision cites no rule id (decision `decision-format`).

Known limits:
- A code span after « group » that names something other than a rule group fails as a missing group.

`lexicon-keys` reads the table of the course lexicon by its form, not by a word of the README's language: a row whose first cell is a group of `lists.lexicons.course` as a code span (`` | `headings` | ``), and in its second cell each code span right after the start of the cell, a comma or a semicolon, followed by « (its value) or by a colon (`` `banned` : ``); a group with no row, a key of the list missing from its row and a key of a row the list does not hold fail; a manifest that declares no `course.readme` leaves the table unchecked. A course's checks read the spec's `course/lexicon.yaml` (`check-course --lexicon <file>` reads another, the fixtures') and say "see course/README.md section 7" when it is unusable; a lexicon given with `--lexicon` lies outside the spec, so no test verifies its keys.

**The fixtures.**

```
mise exec -- spec-directives/1/tests/test-fixtures
```

`test-fixtures` tests the spec fixtures, under `spec-directives/1/tests/fixtures/` (the course fixtures are tested by `product-lines/linear-fr/1/course/checks/test-fixtures`).

- `spec-directives/1/tests/fixtures/valid/`: a minimal spec, whose manifest declares a course and the site, the classifications of the rules of its course and the keys of its lexicons, so that every test checks it: `README.md`, `course/README.md` (with a "Used in" table and the table of the course lexicon), one decision, `course/rules.yaml` (two groups, rules of three methods, a check and a criterion), `products/site/rules.yaml` (a product's rule file, its owner declaring no classification), one schema, `course/lexicon.yaml` (the course fixtures' lexicon), `products/site/lexicon.yaml`, `spec.yaml`, its manifest, at `1.0.0-alpha`, declaring its own files under `spec:` and, under `files:`, what each holds and who reads it, a `CHANGELOG.md` whose first section is « Unreleased »; every `check-spec` test passes, the check scripts its rules name found in `fixtures/checks/` (stubs, through `--checks-dir`).
- `fixtures/broken/<name>/`: a copy of `valid/` with one defect and its `EXPECT` file; no other `check-spec` test may fail, but those its `also:` line names, which the same defect fails (a slug defined twice fails `rule-slugs` and `rule-files`). The defects, by the test they fail: for `rule-files`, a classification value, a level and a method off their lists, a level missing, a method on neither the rule nor its group, an empty `purpose`, a group with none, a check and a criterion on one rule, an id in both rule files, a check that does not exist, a check over two categories and over two levels, a schema that does not compile, a schema no rule names, a key the model does not have, a classification on a product's rule whose owner declares none, classifications for a product with no rule file; for `rule-slugs`, a missing slug, a duplicate slug, a group whose slug is a rule's, a missing group, a rule cited by number, a range in `README.md` and in `course/README.md`, a group cited as a rule, a rule cited in a rule's `text` that no rule file defines, a "Used in" cell citing a slug no rule file defines; for `lexicon-keys`, a key of `lists.lexicons.course` missing, a group missing (`natures`), a key of the table of the course lexicon the list does not hold and one it misses, a key of `lists.lexicons.site` missing, keys for a lexicon the manifest does not declare; for `spec-yaml`, `spec.yaml` missing, a key missing, a role the schema does not know (`course.index`), a `language` that is not an ISO 639-1 code, a `name` that ends with another language, a `version` whose MAJOR is not `major`, an alpha `version` over a released first section of `CHANGELOG.md`, a released `version` that differs from the version of that section, a role with no entry under `files:`, a product named `course`, a classification named as a key of the rule model.

The test also runs `spec-directives/check-spec` on each spec MAJOR of `product-lines/` whose `spec.yaml` declares `directives: 1` (`linear-fr/1`), which must pass, and holds the enum of `readers` in `spec.schema.yaml` to the readers `spec-directives/README.md` defines (« The readers »), the bold name of each bullet.

The fixtures are plain files: change `valid/` and the broken copies together, then run the test. A new test of the spec's own files adds a script, which exports the roles it reads (`reads`), its id in the list of `spec-directives/1/tests/check-spec`, a row in the table of this section, and a broken fixture under `spec-directives/1/tests/fixtures/broken/`; it verifies no rule.

**The readers of `lib/`.**

```
mise exec -- spec-directives/1/tests/test-lib
```

`test-lib` tests the readers of `lib/` on texts it holds, one `ok` or `FAIL` line per case, `all as expected` at the end: `lib/mdast.js`, the links of a CommonMark text (their url, title, plain text and line; a link in a code span or a code block is no link; after a frontmatter, the line of the file). A reader added to `lib/` adds its cases there.

## 5. Normative references

The standards the directives depend on, with the edition they read:

- YAML 1.2.2: the manifest, the rule files and the schemas.
- JSON Schema 2020-12: the schemas, `spec.schema.yaml` and `rules.schema.yaml` among them, read by ajv's class `Ajv2020` (decision `checks-use-ajv-and-yaml`).
- SemVer 2.0.0: the versions (section 3).
- ISO/IEC/IEEE 29148:2018: the methods (section 2); its text, paid, was not read: the methods were checked against secondary sources.

The standards the rules of one spec depend on are in the README of that spec MAJOR (`product-lines/linear-fr/1/README.md` section 4).
