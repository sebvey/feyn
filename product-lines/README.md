# product-lines

| Reader | Comes for | Opens |
|---|---|---|
| creator | the spec a course follows, how to check a course | [`linear-fr/1/README.md`](linear-fr/1/README.md), [`check-course`](check-course) |
| builder | the specs, their MAJORs and versions | [A spec MAJOR](#a-spec-major), [Versions](#versions), [`linear-fr/1/spec.yaml`](linear-fr/1/spec.yaml) |
| verifier | how the checks of a course are run | [`check-course`](check-course), [`linear-fr/1/README.md`](linear-fr/1/README.md) section 5 |
| spec writer | the layout of a spec MAJOR, the bump of a change | [A spec MAJOR](#a-spec-major), [Versions](#versions), [`versioned-objects-and-spec-layout`](../docs/decisions/versioned-objects-and-spec-layout.md), [`spec-directives/`](../spec-directives/README.md) |

The readers are defined in [`spec-directives/README.md`](../spec-directives/README.md#the-readers).

Summary of decision `versioned-objects-and-spec-layout`; if they differ, the decision wins.

Three objects are versioned: a course (`courses/<id>/`), a spec (here) and the spec directives, which say how a spec is written and read and live in `spec-directives/`, one folder per MAJOR, with the tests of a spec's own files (`spec-directives/README.md`).

A spec is the contract of a **product line**: the form of its courses and what it fixes of each of its products ([`docs/glossary.md`](../docs/glossary.md#spec)). The only spec is `linear-fr`; its MAJOR 1 sits in `product-lines/linear-fr/1/`.

## A spec MAJOR

One folder per MAJOR, `product-lines/<name>/<MAJOR>/` (`1/`, not `v1/`). Its manifest, `spec.yaml`, declares its files by role: its own (`README.md`, `CHANGELOG.md`, `decisions/`), those of its course, the input of the builds of the products, under `course/`, and those of each product under `products/<product>/`; then the lists of the spec, which the tests read, and, under `files:`, what each file holds and who reads it. Its identity gives its `name`, `major`, `version`, `language` (the language of the spec, its courses and its protocol: a course of another language follows another spec) and `directives`, the MAJOR of `spec-directives/` it follows, whose tests verify the spec's own files (`spec-directives/check-spec <MAJOR folder>`) and whose `lib/` and package its checks load (`spec-directives/1/README.md` section 8).

Section 2 of a MAJOR's `README.md` points to its manifest, which describes the composition of the spec. For `linear-fr` 1: the manifest [`linear-fr/1/spec.yaml`](linear-fr/1/spec.yaml).

A new MAJOR copies the tree of the previous one, its decisions under the same slugs.

A course declares the MAJOR it follows in `course.yaml` (`spec: linear-fr@1`). `product-lines/check-course <course>` reads it, runs `product-lines/<name>/<MAJOR>/course/checks`, and refuses an unknown spec or MAJOR. The MAJOR's `check-course` takes its checks from the MAJOR's rule files and runs them in one run: a failure of a check that blocks sets exit code 1, a failure of a check that reports is printed and leaves 0; `--category` selects checks by category.

## Versions

A spec version is tagged `<name>/vX.Y.Z`. From the MAJOR's tag on, the bump of a spec change is written in the levels of the rules of a course (requirement, recommendation), as the spec directives write it (`spec-directives/1/README.md` sections 3 and 6):

| Bump | When |
|---|---|
| MAJOR | the structure changes (files, fields, mandatory sections); a requirement added or made stricter; an optional field made mandatory; a recommendation made a requirement |
| MINOR | an optional element; a protocol rule added, changed or renamed (the old slug is burnt); a requirement made looser or made a recommendation; a recommendation added or made stricter; a lexicon key added or renamed |
| PATCH | wording; a false positive lifted |

A MAJOR lives while a served course version declares it, a course tag included; then it is archived. Tooling reads every live MAJOR. An old MAJOR receives bug fixes only, as a PATCH, never a tightening; a bug fix is ported to every live MAJOR.
