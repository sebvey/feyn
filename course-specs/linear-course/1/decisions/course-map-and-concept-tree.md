---
date: 2026-11-06
issue: 628
status: accepted
area: spec:linear-course
---

Without this, an agent writing or re-cutting a concept would write its sub-concepts twice, as a tree in `course.yaml` and as the headings of `concept.md`, and the checks would read the `course.yaml` copy: a concept whose ids change would fail every check that reads the tree until both copies were rewritten in step, and a copy left behind would make the checks hold the concept to a tree it no longer has.

`course.yaml` is the map of a course: its identity, its domains and its concepts, with their prerequisites, nothing below a concept. The tree of a concept, its sub-concepts with their ids and titles, is held by the headings of its `concept.md` alone (`## <id> <title>` for a first-level sub-concept, `### <id> <title>` inside it for a second-level one), for a numbered concept and an annex alike; the checks build the tree from those headings, and the rules on the ids (their form, their order, their uniqueness, nine children at most) are rules of the concept folder (`course/README.md` section 3). The ids stay identifiers of the course: changing one is a course MAJOR. This replaces the tree of sub-concepts each concept entry of `course.yaml` held, and the rule that kept each heading's title equal to its `course.yaml` title.

## Options ruled out

- `course.yaml` down to the smallest unit of content: the tree in two places still, and a YAML twice as long.
- The status quo, the tree in `course.yaml` and again in the headings: nobody but the consistency checks needs the sub-concepts in `course.yaml`, while the creator cuts a concept where they write it.

## Consequences

- A concept is cut, and re-cut, in its `concept.md` only; `course.yaml` refuses a sub-concept key on a concept entry.
- The classroom build is frozen and still describes the course map as holding the sub-concepts, until the protocol is brought back up to date.
