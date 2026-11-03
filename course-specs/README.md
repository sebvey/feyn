# course-specs

| Reader | Comes for | Opens |
|---|---|---|
| creator | the spec a course follows, how to check a course | [`linear-course/1/README.md`](linear-course/1/README.md), [`check-course`](check-course) |
| builder | the specs, their MAJORs and versions | [Layout](#layout), [Versions](#versions), [`linear-course/1/spec.yaml`](linear-course/1/spec.yaml) |
| verifier | how the checks of a course are run | [`check-course`](check-course), [`linear-course/1/README.md`](linear-course/1/README.md) section 5 |
| spec writer | the layout of a spec MAJOR, the bump of a change | [Layout](#layout), [Versions](#versions), [`versioned-objects-and-spec-layout`](../docs/decisions/versioned-objects-and-spec-layout.md), [`spec-directives/`](../spec-directives/README.md) |

The readers are defined in [`spec-directives/README.md`](../spec-directives/README.md#the-readers).

Summary of decision `versioned-objects-and-spec-layout`; if they differ, the decision wins.

Three objects are versioned: a course (`courses/<id>/`), a spec (here) and the spec directives,
which say how a spec is written and read and live in `spec-directives/`, one folder per MAJOR,
with the tests of a spec's own files (`spec-directives/README.md`).

A spec is the contract for a type of course. The only spec is `linear-course`; its MAJOR 1
sits in `course-specs/linear-course/1/`.

## Layout

One folder per MAJOR, `course-specs/<name>/<MAJOR>/` (`1/`, not `v1/`), holds:

| File or folder | Holds |
|---|---|
| `README.md` | the entry to the MAJOR: scope, files, categories, the normative references of its rules, checks |
| `course/` | the course, one of the two products: `README.md` (what a course is: its files, fields, diagrams, the lexicon of the course files), `lexicon.yaml` (the words of the course files), `rules.yaml` (the rules of a course, as data), `schemas/` (the JSON Schemas of a course's files), `templates/` (the course templates), `checks/` (the checks of a course, their fixtures) |
| `teacher/` | the teacher, the other product: `README.md` (the protocol and the description of the composition), `rules.yaml` (the rules of the protocol, as data), `composition.yaml` (the composition of the teacher: its parts, when each loads, what each draws from), `templates/learner/` (the templates of learner memory), `lexicon.yaml` (the words the teacher says and writes) |
| `decisions/` | the spec's decisions |
| `CHANGELOG.md` | the changelog of the spec's versions in this MAJOR |
| `spec.yaml` | `name`, `major`, `version`, `language` (the language of the spec, its courses and its protocol: a course of another language follows another spec), and `directives`: the MAJOR of `spec-directives/` it follows, whose tests verify the spec's own files (`spec-directives/check-spec <MAJOR folder>`) and whose `lib/` and package its checks load |

A new MAJOR copies the tree of the previous one, its decisions under the same slugs.

A course declares the MAJOR it follows in `course.yaml` (`spec: linear-course@1`).
`course-specs/check-course <course>` reads it, runs `course-specs/<name>/<MAJOR>/course/checks`, and
refuses an unknown spec or MAJOR. The MAJOR's `check-course` takes its checks from the MAJOR's rule
files and runs them in one run: a failure of a check that blocks sets exit code 1, a failure of a
check that reports is printed and leaves 0; `--category` selects checks by category.

## Versions

A spec version is tagged `<name>/vX.Y.Z`. From the MAJOR's tag on, the bump of a spec change
is written in the levels of the rules of a course (requirement, recommendation), as the
spec directives write it (`spec-directives/1/README.md` sections 3 and 6):

| Bump | When |
|---|---|
| MAJOR | the structure changes (files, fields, mandatory sections); a requirement added or made stricter; an optional field made mandatory; a recommendation made a requirement |
| MINOR | an optional element; a protocol rule added, changed or renamed (the old slug is burnt); a requirement made looser or made a recommendation; a recommendation added or made stricter; a lexicon key added or renamed |
| PATCH | wording; a false positive lifted |

A MAJOR lives while a served course version declares it, a course tag included; then it is
archived. Tooling reads every live MAJOR. An old MAJOR receives bug fixes only, as a PATCH,
never a tightening; a bug fix is ported to every live MAJOR.
