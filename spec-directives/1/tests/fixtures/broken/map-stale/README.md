# fixture: the spec

The protocol (`products/teacher/rules.yaml`, rules `first-rule`, `second-rule` and `save-points`) is read by the
teacher build; the group `onboarding` welcomes a new learner. A check id in code is not a rule: `course-files`.

## 2. Files

Generated from `spec.yaml` by `mise exec -- spec-directives/generate-map spec-directives/1/tests/fixtures/broken/map-stale`: do not edit it by hand, change the manifest (its roles and its `map:`) and run the command again.

The files of this MAJOR, one table per owner, a row per role the manifest declares: the file, what it holds and who reads it (`map:`), its kind, told from its path (`data` a `.yaml`, `prose` a `.md`, `script` a program, `folder`), and what tests it, the tests of `check-spec` and the checks of a course that read it, as each says. The readers are defined in `spec-directives/README.md`, « The readers »; the tests of `check-spec` in `spec-directives/1/README.md` section 8, the checks of a course in section 5.

### The spec

| File | Holds | Kind | Readers | Tested by |
|---|---|---|---|---|
| [`spec.yaml`](spec.yaml) | the manifest | data | builder, verifier, spec writer | check-spec: `map`, `spec-yaml` |
| [`README.md`](README.md) | the entry to the spec | prose | creator, builder, verifier, spec writer | check-spec: `map`, `rule-slugs` |
| [`CHANGELOG.md`](CHANGELOG.md) | the changes of the spec | prose | spec writer | check-spec: `spec-yaml` |
| [`decisions/`](decisions/) | the decisions of the spec | folder | spec writer | check-spec: `rule-slugs` |

### The course

| File | Holds | Kind | Readers | Tested by |
|---|---|---|---|---|
| [`course/README.md`](course/README.md) | what a course is | prose | creator, builder | check-spec: `rule-slugs` |
| [`course/rules.yaml`](course/rules.yaml) | the rules of a course, as they were | data | verifier, spec writer | check-spec: `rule-files` |
| [`course/lexicon.yaml`](course/lexicon.yaml) | the lexicon of the course files | data | creator, builder | check-spec: `lexicon-keys` |
| [`course/schemas/`](course/schemas/) | the schemas of a course | folder | builder, verifier | check-spec: `rule-files` |

### The product `site`

| File | Holds | Kind | Readers | Tested by |
|---|---|---|---|---|
| [`products/site/lexicon.yaml`](products/site/lexicon.yaml) | the lexicon of the site | data | builder | check-spec: `lexicon-keys` |

No build declared.

### The product `teacher`

| File | Holds | Kind | Readers | Tested by |
|---|---|---|---|---|
| [`products/teacher/README.md`](products/teacher/README.md) | the protocol, described | prose | builder | check-spec: `lexicon-keys`, `rule-slugs` |
| [`products/teacher/rules.yaml`](products/teacher/rules.yaml) | the rules of the protocol | data | builder, verifier | check-spec: `lexicon-keys`, `rule-files`, `rule-slugs`, `scenarios` |
| [`products/teacher/lexicon.yaml`](products/teacher/lexicon.yaml) | the lexicon of the teacher | data | builder | check-spec: `lexicon-keys` |
| [`products/teacher/composition.yaml`](products/teacher/composition.yaml) | the composition of the teacher | data | builder | check-spec: `composition` |
| [`products/teacher/tests/`](products/teacher/tests/) | the test scenarios of the teacher | folder | verifier | check-spec: `scenarios` |

No build declared.
