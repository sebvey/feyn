---
date: 2026-10-31
issue: 322
status: accepted
area: spec:linear-course
---

Without this, an agent would add a rule as one more sentence of `SPEC.md` prose, beside the
text that explains it, where no check can select it by category or count it.

The files of `linear-course` are split by class of products (decision `conformity-by-product`),
plus `spec.yaml` and the MAJOR's `README.md`, which describes each file and, like the spec
directives, holds no rule: each product has its folder, `course/` and `teacher/`, which holds
its description (`README.md`), its rules (`rules.yaml`) and its own files. The rule files are
these two: `course/rules.yaml` in the language of the spec, `teacher/rules.yaml` in French, the
bounded exception of decision `language-policy`. A description points to its rules (decision
`descriptions-point-to-their-rules`), a table of fields is a schema (decision
`field-tables-as-schemas`).

## Options ruled out

- One rule file for the course and the protocol: they have neither the same readers (the
  checks and the course author; the classroom build) nor the same language.

## Consequences

- Amended 2026-11-02 (#463): `SPEC.md` is split and removed, as Material point 3 of epic #454
  settles: what holds for every spec (what a rule file holds, conformance, levels, methods,
  severity, versions) moves to the spec directives, what is `linear-course`'s own (scope,
  files, categories, references of its rules, checks) to the MAJOR's `README.md`.
- Amended 2026-11-02 (#465): `spec-files-and-alpha-version` is split (epic #454, Material
  point 15): its files part stays here, renamed `spec-files-by-product`; its alpha part, which
  binds the versions of a spec and of the directives alike, becomes decision
  `alpha-version-until-tag` of the spec directives. Without this, a contributor preparing the
  directives' version would look for the alpha in a decision of `linear-course`.
- Amended 2026-11-03 (#501): `teacher/` also holds `build/`, the half of a classroom build that
  depends on the MAJOR (epic #222, Material point 6). Without this, the author of a second MAJOR
  would look for its teacher's build at the root, which then breaks or fills with versions.
- Amended 2026-11-04 (#545): the names "teacher" and "protocol" leave this decision for the
  glossary (decision `word-choices-in-the-glossary`).
