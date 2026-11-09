---
date: 2026-10-31
issue: 322
status: accepted
area: spec:linear-fr
---

Without this, an agent would add a rule as one more sentence of `SPEC.md` prose, beside the text that explains it, where no check can select it by category or count it.

The files of `linear-fr` are split by the course and by product (decision `conformity-of-the-course-and-products`), plus `spec.yaml` and the MAJOR's `README.md`, which describes each file and, like the spec directives, holds no rule: the course and each product have their folder, `course/`, `products/teacher/` and `products/site/`, which holds its own files and, for the course and a product a rule binds, its description (`README.md`) and its rules (`rules.yaml`); `products/site/` holds what the site build needs from the spec and no course file holds, and no rule; `products/teacher/` holds no teacher build, which is the teacher implementation's, outside the spec (decision `teacher-implementation-folder`). The rule files are these two: `course/rules.yaml` in the language of the spec, `products/teacher/rules.yaml` in French, the bounded exception of decision `language-policy`. A description points to its rules (decision `descriptions-point-to-their-rules`), a table of fields is a schema (decision `field-tables-as-schemas`).

## Options ruled out

- One rule file for the course and the protocol: they have neither the same readers (the checks and the course author; the teacher build) nor the same language.

## Consequences

- Amended 2026-11-02 (#463): `SPEC.md` is split and removed, as Material point 3 of epic #454 settles: what holds for every spec (what a rule file holds, conformance, levels, methods, severity, versions) moves to the spec directives, what is `linear-fr`'s own (scope, files, categories, references of its rules, checks) to the MAJOR's `README.md`.
- Amended 2026-11-02 (#465): `spec-files-and-alpha-version` is split (epic #454, Material point 15): its files part stays here, renamed `spec-files-by-product`; its alpha part, which binds the versions of a spec and of the directives alike, becomes decision `alpha-version-until-tag` of the spec directives. Without this, a contributor preparing the directives' version would look for the alpha in a decision of `linear-fr`.
- Amended 2026-11-03 (#501): `products/teacher/` also holds `build/`, the half of a teacher build that depends on the MAJOR (epic #222, Material point 6). Without this, the author of a second MAJOR would look for its teacher's build at the root, which then breaks or fills with versions.
- Amended 2026-11-04 (#545): the names "teacher" and "protocol" leave this decision for the glossary (decision `word-choices-in-the-glossary`).
- Amended 2026-11-07 (#695): `products/site/` joins `course/` and `products/teacher/`, the folder of the site: its lexicon, its URL scheme and, later, the half of the site build that depends on the MAJOR, as `products/teacher/build/` is the teacher build's (epic #598, Material point 13). It holds no rule, so no `rules.yaml` and no description of its own; the MAJOR's `README.md` describes its files. Without this, a contributor would write the words and addresses of the site in `site-builder/`, where they leave the spec, or in `course/lexicon.yaml`, which holds the words recognised in a course file.
- Amended 2026-11-09 (#779): `products/teacher/` no longer holds `build/`, the composition, the learner templates nor the test scenarios: the build and the means of the teacher are its implementation's, `teacher-builder/linear-fr/1/`, outside the spec, and the scenarios left with it, kept in the history (decision `teacher-implementation-folder`; epic #757, Material item 11). The folder holds the description of the teacher, its protocol rules and its lexicon. Without this, a contributor rewriting the means of the teacher would write them beside the protocol rules they serve, and a second implementation would change the spec.
