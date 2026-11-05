---
date: 2026-10-31
issue: 322
status: accepted
area: spec-directives
---

Without this, an agent bound by "Dependency-free Node" (`checks/README.md`) would write a JSON
Schema validator of its own in `lib/` to read the schemas, and stretch the YAML subset of
`lib/yaml.js`, which can already misread a `course.yaml` that is valid YAML (working notes
D11; minor point 4 of the second standards run).

The checks of a spec and the tests of the directives take dependencies: one `package.json` with
its lockfile per directives MAJOR (`spec-directives/1/`, beside the `lib/` they share), installed
by `npm ci`, and loaded by the checks of every spec MAJOR that declares that MAJOR in its
`spec.yaml`, through a `createRequire` on that `package.json`; ajv validates the schemas,
through the class `Ajv2020` (`ajv/dist/2020`), since the schemas are JSON Schema 2020-12
(decision `field-tables-as-schemas`); the package `yaml` (eemeli) reads YAML 1.2.2 in
place of `lib/yaml.js`, which is removed. A failure still points at `file:line`: ajv gives a
path in the object (`/concepts/3/slug`), the `yaml` package gives the positions in the source,
and the checks map the one to the other (from #336). The other readers of `lib/` (`md.js`,
`xml.js`) stay. Node 20 or later, run under `mise exec`, stays. This replaces "Dependency-free
Node (CommonJS, no `npm install`)" of `course-specs/linear-course/1/checks/README.md:4-5`.

## Options ruled out

- Staying without dependencies: the site (Astro, #223) brings `package.json` and
  `npm install` anyway, and the classroom build (#222) will be in Node, so "no npm" no longer
  holds; each home-made reader is one more piece to keep (D11).
- A validator written in `lib/`: one more home-made piece for a standard that has its tools
  (D11).
- A `package.json` at the root of the repository, shared with the site: an archived spec MAJOR
  keeps the dependencies its checks were written for, those of the directives MAJOR it declares
  (decision `versioned-objects-and-spec-layout`); the site would move them at its own pace.
- A `package.json` per spec MAJOR, beside its checks (the rule until #459): every spec MAJOR
  would carry a copy of `lib/` and of the package, which drift (epic #454, Material point 7).
- ajv's default class: it applies draft-07, and one Ajv object does not mix draft-07 and
  2020-12 (verified 2026-10-30).

## Consequences

- An `npm ci` step runs before the checks, in CI (#137) and locally (under `mise exec`).
- The checks are ported to the `yaml` package (#327), and the schemas come with #329. Today a
  failure maps to `file:line` through the `yaml` package's positions alone, kept by
  `lib/yaml-lines.js` for each key and item; no ajv instance path is mapped: in `linear-course`, `course-yaml`
  and `concept-folder` verify the two schema rules with their own code until #336 wires ajv into
  them; ajv serves today in `rule-files` (`check-spec`), which compiles the schemas, and in
  `test-fixtures`, which validates the valid fixture against them.
- Amended 2026-11-02 (#465): the decision moves to the spec directives
  (`spec-directives/1/decisions/`), as Material point 15 of epic #454 settles: the package is one
  per directives MAJOR, loaded by the checks of every spec MAJOR that declares it (#459), no
  longer the checks of `linear-course` alone. Without this, a contributor writing a second spec
  would read the dependencies as `linear-course`'s and give the new spec a package of its own.
