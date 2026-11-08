---
date: 2026-11-06
issue: 628
status: accepted
area: spec:linear-fr
---

Without this, an agent writing or re-cutting a concept would write its sections and units twice, as a tree in `course.yaml` and as the headings of `concept.md`, and the checks would read the `course.yaml` copy: a concept whose ids change would fail every check that reads the tree until both copies were rewritten in step, and a copy left behind would make the checks hold the concept to a tree it no longer has.

`course.yaml` is the map of a course: its identity, its domains and its concepts, with their prerequisites, nothing below a concept. The tree of a concept, its sections and units with their ids and titles, is held by the headings of its `concept.md` alone (`## Section <id> : <title>` for a section, `### Unité <id> : <title>` inside it for a unit, the kind word the lexicon's), for a numbered concept and an annex alike; the checks build the tree from those headings, and the rules on the ids (their form, their order, their uniqueness, nine units at most in a section) are rules of the concept folder (`course/README.md` section 3). The ids stay identifiers of the course: changing one is a course MAJOR. This replaces the tree each concept entry of `course.yaml` held, and the rule that kept each heading's title equal to its `course.yaml` title.

## Options ruled out

- `course.yaml` down to the smallest unit of content: the tree in two places still, and a YAML twice as long.
- The status quo, the tree in `course.yaml` and again in the headings: nobody but the consistency checks needs the tree in `course.yaml`, while the creator cuts a concept where they write it.

## Consequences

- A concept is cut, and re-cut, in its `concept.md` only; `course.yaml` refuses a key for the tree on a concept entry.
- The teacher build is frozen and still describes the course map as holding the tree of each concept, until the protocol is brought back up to date.
