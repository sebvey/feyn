---
date: 2026-10-28
issue: 122
status: accepted
area: spec:linear-course
---

Without this, an agent adding a rule would give it the next free number at the end of its
family, or renumber the protocol and shift the tests that cited the old number.

Every rule of `PROTOCOL.md` is named by a stable slug, as decisions are (decision
`decision-format`), and loses its number. Every reference cites the slug: cross-references
between rules, `SPEC.md`, the decisions of this spec, the "Used in" column of "Keys and
parameters", the "Inherited from parcours-po" table, the fresh tests, and the English
translation of S2-09 (same slugs, not same numbers). The order of the rules and their sections
are then free: a rule moves without changing its name. A split rule gets two slugs; a removed
rule's slug is never reused. A check of `specs/linear-course/checks/` verifies that every cited
slug exists and that none is duplicated. This replaces the numbers `1.1` to `9.5` and the
header line "Rule numbers are cited by tests and by S2-09: a removed rule leaves its number
unused". It is a structure decision, taken on argument: it changes how rules are named, not
how the teacher teaches.

## Options ruled out

- Letters on a split (`1.7a`, `1.7b`, as the rows `8.4a` to `8.4h`): the maintainer refused
  them; they keep a number whose order no longer means anything.
- The next free number at the end of the family: it breaks the reading order of the chains.
- Renumbering at each change: every citation in tests and decisions shifts with it.

## Consequences

- The applying issue gives every rule its slug, splits the eleven rules of
  `construction/notes/122-rule-scope.md`, and lands before the `linear-course/v1.0.0` tag.
- A test or a document never cites a rule by its position.
