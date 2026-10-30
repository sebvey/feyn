---
date: 2026-10-31
issue: 322
status: accepted
area: spec:linear-course
---

Without this, an agent bound by "Dependency-free Node" (`checks/README.md`) would write a JSON
Schema validator of its own in `lib/` to read the schemas, and stretch the YAML subset of
`lib/yaml.js`, which can already misread a `course.yaml` that is valid YAML (working notes
D11; minor point 4 of the second standards run).

The checks of `linear-course` take dependencies: a `package.json` with its lockfile in
`specs/linear-course/1/checks/`, installed by `npm ci`; ajv validates the schemas, through the
class `Ajv2020` (`ajv/dist/2020`), since the schemas are JSON Schema 2020-12 (decision
`spec-files-and-alpha-version`); the package `yaml` (eemeli) reads YAML 1.2.2 in place of
`lib/yaml.js`, which is removed. A failure still points at `file:line`: ajv gives a path in the
object (`/concepts/3/slug`), the `yaml` package gives the positions in the source, and the
checks map the one to the other. The other readers of `lib/` (`md.js`, `xml.js`) stay. Node 20
or later, run under `mise exec`, stays. This replaces "Dependency-free Node (CommonJS, no
`npm install`)" of `specs/linear-course/1/checks/README.md:4-5`.

## Options ruled out

- Staying without dependencies: the site (Astro, #223) brings `package.json` and
  `npm install` anyway, and the classroom build (#222) will be in Node, so "no npm" no longer
  holds; each home-made reader is one more piece to keep (D11).
- A validator written in `lib/`: one more home-made piece for a standard that has its tools
  (D11).
- A `package.json` at the root of the repository, shared with the site: a MAJOR copies its
  tree (decision `versioned-objects-and-spec-layout`), and an archived MAJOR keeps the
  dependencies its checks were written for; the site would move them at its own pace.
- ajv's default class: it applies draft-07, and one Ajv object does not mix draft-07 and
  2020-12 (verified 2026-10-30).

## Consequences

- An `npm ci` step runs before the checks, in CI (#137) and locally (under `mise exec`).
- The checks are ported to the `yaml` package; how an instance path maps to `file:line` is
  settled by the slice that ports them (#317, slice 3).
