# spec-directives

| Reader | Comes for | Opens |
|---|---|---|
| creator | nothing here: what a course is, in the spec | [`product-lines/linear-fr/1/course/README.md`](../product-lines/linear-fr/1/course/README.md) |
| builder | nothing here: the shape of a course and the protocol, in the spec | [`product-lines/linear-fr/1/README.md`](../product-lines/linear-fr/1/README.md) |
| verifier | conformance, levels, methods, severity | [`1/README.md`](1/README.md) sections 2 to 5 |
| spec writer | the directives, their MAJORs, their tests | [`1/README.md`](1/README.md), [`1/decisions/`](1/decisions/), [`1/CHANGELOG.md`](1/CHANGELOG.md), [`1/tests/`](1/tests/), [`check-spec`](check-spec), [`generate-map`](generate-map) |

The readers are defined [below](#the-readers), and only here.

## The readers

The spec is read by four makers, each of something that must agree with a course. The teacher and the site do not read the spec: they read a course, and what their build took from the spec; the protocol reaches the teacher verbatim through the teacher build.

- **creator**: a human or an agent who makes a course; comes for what a course is, the templates, and how to verify a course.
- **builder**: whoever writes the teacher build or the site build, a consumer of courses; comes for the shape of a course, of learner memory and the lexicons of the spec, and, for the classroom, the protocol to inject.
- **verifier**: the checks, the reviewer and the fresh tests, which make a verdict; comes for the rules as data, the conformance clause and the fixtures.
- **spec writer**: whoever writes a rule, a check or a decision of a spec, the maintainer at the tag included; comes for the directives, the decisions and the changelogs.

The map of a spec MAJOR, section 2 of its `README.md`, generated from its manifest, names the readers of each of its files, among these four (`1/README.md` section 8, "The map").

## The directives and their MAJORs

The spec directives say how a spec is written and read: what a rule file holds, when the course or a product conforms, the levels and methods a rule carries, the severity of a check, the versions, the normative references of the rule model, and the tests of a spec's own files. They are the third versioned object, beside a course and a spec (decision `versioned-objects-and-spec-layout`).

- One folder per MAJOR, `spec-directives/<MAJOR>/` (`1/`, not `v1/`): `README.md` (the directives), `spec.schema.yaml`, `generate-map`, `tests/`, `lib/` with `package.json` and `package-lock.json`, `decisions/`, `CHANGELOG.md`. The only MAJOR is `1/`, at `1.0.0-alpha` until its tag (decision `alpha-version-until-tag`).
- A spec MAJOR declares the directives MAJOR it follows in its `spec.yaml` (`directives: 1`), and its checks load the `lib/` and the package of that MAJOR; a directives MAJOR lives while a live spec MAJOR declares it.
- The dispatcher `check-spec <spec MAJOR folder>` reads that `spec.yaml` and runs the tests of the declared MAJOR on the folder: `mise exec -- spec-directives/check-spec product-lines/linear-fr/1`.
- The dispatcher `generate-map <spec MAJOR folder>` reads it too and runs the `generate-map` of the declared MAJOR, which writes the map of the spec MAJOR from its manifest: `mise exec -- spec-directives/generate-map product-lines/linear-fr/1`.
- A version of the directives is tagged `spec-directives/vX.Y.Z`; `spec-directives/v1.0.0` is posed with `linear-fr/v1.0.0`, on the same commit (#451). The bump table of the directives is in [`1/README.md`](1/README.md) section 6.
