---
date: 2026-11-04
issue: 528
status: accepted
area: spec-directives
---

Without this, an agent writing a decision of a spec would state its evidence with the id of the bench course and the id of one of its units, so the decision ages with that course: once the course renames that unit or is archived, as the founding course was, the evidence points at nothing, and the spec reads as bound to one course though it generalises what a course taught.

The files of a spec, its decisions included, name no course: no course id, no path to the folder of one course (a pattern of that folder, naming none, is allowed). A spec generalises what a course taught; what a course showed enters the spec stated for any course of its type. The evidence of a spec decision, a fresh test included, is stated without naming a course ("on a two-concept course", "a learner at the second unit of the first concept"), with no marker pointing at a course or at a version of it. The same holds for the decisions of the spec directives. A sample course, a course in a spec MAJOR's `course/samples/`, is part of that spec and changes only with it: the spec's files other than its decisions may name it, its id and its path; its decisions name no course, a sample course included, since a sample course changes with each change of the spec and a decision citing one of its units would point at nothing after the next one; the rule holds for every other course. Two lines keep their words: an "Amended" line keeps its account of the change of scope (decision `decision-format`), and a superseded decision or a released CHANGELOG entry is history. The repository's own decisions (`docs/decisions/`) may name a course; which course is the bench, the one every spec change is tried on, is a policy of the repository (`docs/contributing.md`, "Policies"), outside the spec.

## Options ruled out

- The evidence kept with its course, as dated history: the course moves on and the spec keeps reading as the history of one course (the maintainer, 2026-11-04, epic #450).
- A marker `[obs-n]` pointing at a frozen version of the course: one more mechanism to read for a fact the generic wording already carries (same answers).

## Consequences

- `/feyn-decision` checks it before writing a decision of a spec or of the directives.
- At this decision, files of the spec still name a course outside its decisions: the provenance of the protocol's rules (`products/teacher/README.md`, `products/teacher/rules.yaml`), which epic #450 removes, and the spec's tests that run on the bench course and the READMEs that describe them, which issue #529 moves to the spec's own sample courses.
- Amended 2026-11-06 (#688, #690): a course in a spec MAJOR's `course/samples/` is part of that spec, so the spec's files other than its decisions may name it (its id, its path); its decisions name no course, a sample course included, a sample course changing with each change of the spec (#690); the rule holds for every other course. Why: the spec's files that run on or describe its sample course (its README, its CHANGELOG, the test of the rendering, the READMEs of the tests) contradicted the text, and an agent reading it flagged or hesitated on each of them; a sample course changes only with its spec, so naming it does not bind the spec to a course that moves on its own (the maintainer, 2026-11-06, epic #668).
