---
date: 2026-10-31
issue: 322
status: accepted
area: spec-directives
---

Without this, an agent would call a course conforming because it passes the blocking checks, and give a check of the spec's own files a rule and a category of its own.

Two classes of products, the course, its diagrams included, and the teacher; a rule binds a product. A course conforms when it holds every requirement of `course/rules.yaml`, whatever its method: the blocking checks are a necessary condition, not a sufficient one, the review and taught-check do the rest, and a course tag certifies the whole. A teacher conforms when it holds every requirement of `teacher/rules.yaml`, the method of a rule of the protocol being demonstration, by the fresh tests. Recommendations are outside conformity (the ISO sense of "should"). The lexicons are not products: they live in the spec's folder, written by its authors. The spec's own files (the rule files, the schemas, the slugs of the protocol, the lexicons, `spec.yaml` and its version, the composition of the teacher and its test scenarios) are verified by the tests of the spec directives, run by `check-spec`, which are not rules: they carry no category and no level, each failure blocks `check-spec`, and none counts toward the conformity of a product.

## Consequences

- No teacher conforms today: the fresh tests cover the rules a session of the spec's example course exercises on their path, not every requirement; the rules they do not observe yet are idea #509.
- Amended 2026-10-31 (#339): a rule binds a product, a course or a teacher; the consistency of the spec's own files is verified by the tests of `check-spec`, which are not rules; the categories are those of a course and the families of the protocol. Without this, a contributor applies "every check verifies a rule" to a check of the spec's files and writes a rule file and a category for them, as #329 did (a third rule file, a sixth category named after the spec, and a marker so that `check-course` ran it on a course).
- Amended 2026-11-03 (#497): the composition of the teacher joins the spec's own files that the tests of `check-spec` verify, by a test that checks the form of the file. Without this, a contributor reads the composition as a rule of the teacher and gives it a category and a level, or leaves its test outside the clause.
- Amended 2026-11-04 (#545): "conformity", "conformance clause", and the French words of a diagram and of a schema, leave for the glossary (decision `word-choices-in-the-glossary`).
