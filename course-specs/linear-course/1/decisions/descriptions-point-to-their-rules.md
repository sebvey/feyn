---
date: 2026-10-31
issue: 322
status: accepted
area: spec:linear-course
---

Without this, a contributor writing a description of `linear-course` would state a rule in its
prose, with a verb of obligation, beside the rule file that holds it, and the two drift.

A description (the spec directives, the MAJOR's `README.md`, `course/README.md`,
`teacher/README.md`) is informative: it explains and never uses the verbal forms of obligation;
the rule files are normative. A section of `course/README.md` whose rules are in a rule file
points to their group, restates none and cites no rule id; `teacher/README.md` describes how a
rule of the protocol is written and holds no section per group, pointing once to
`teacher/rules.yaml`, the one source of the protocol, which the classroom build and the tests
of `check-spec` read.

## Consequences

- The drift between a description and its rules is held by this writing rule, which
  `check-spec` can verify.
- Amended 2026-11-04 (#531): a section of a product's `README.md` whose rules are in its rule
  file points to their group, restates none and cites no rule id, where a description cited rule
  ids before, as the maintainer settled in epic #450 (Material point 10). Without this, a
  contributor extracting a section would restate each rule in the README prose beside the rule
  file, and the two drift.
- Amended 2026-11-05 (#554): `teacher/rules.yaml` is the one source of the protocol, which the
  classroom build and the tests of `check-spec` read; `teacher/README.md`, its family and group
  sections gone, describes how a rule is written and points once to the rule file, as epic #450
  settles (its Objective). Without this, a contributor would keep a section per group in
  `teacher/README.md` beside the groups of the rule file, and the two drift.
