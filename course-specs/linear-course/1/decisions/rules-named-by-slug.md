---
date: 2026-10-28
issue: 122
status: accepted
area: spec:linear-course
---

Without this, an agent adding a rule would give it the next free number at the end of its
family, or renumber the protocol and shift the tests that cited the old number.

Every rule of the protocol is named by a stable slug, as decisions are (decision
`decision-format`), and loses its number; the slug is the `id` of the rule in the rule files
(decision `rules-with-level-and-method`), where the protocol's rules moved with their slugs kept
(epic #450), and the rules of `course/rules.yaml` are named the same way. A rule id
is unique across the two rule files. Every reference cites the slug: cross-references
between rules, the MAJOR's `README.md`, the "Used in" column of « Clés et paramètres », the
fresh tests, and the English translation of S2-09 (same slugs, not same numbers). A decision cites no slug: it names the rule
by what it asks (decision `decision-format`). The order of the rules and their sections
are then free: a rule moves without changing its name. A split rule gets two slugs; a removed
rule's slug is never reused. A test of the spec's own files, `rule-slugs` (`check-spec`, of the
directives the spec follows), verifies that every cited slug exists and that none is
duplicated; it reads the slugs from `teacher/rules.yaml`. This replaces the numbers `1.1` to
`9.5` and the header line "Rule numbers are cited by tests and by S2-09: a removed rule leaves
its number unused". It is a structure decision, taken on argument: it changes how rules are named,
not how the teacher teaches.

## Options ruled out

- Letters on a split (`1.7a`, `1.7b`, as the rows `8.4a` to `8.4h`): the maintainer refused
  them; they keep a number whose order no longer means anything.
- The next free number at the end of the family: it breaks the reading order of the chains.
- Renumbering at each change: every citation in tests and decisions shifts with it.

## Consequences

- Issue #125 gives every rule its slug, splits the eleven rules the study of issue #122 named,
  and lands before the `linear-course/v1.0.0` tag.
- A test or a document never cites a rule by its position.
- Amended 2026-10-31 (#322): the slug becomes the `id` of the rule in the rule files
  (decision `rules-with-level-and-method`): the protocol's rules move from `teacher/README.md`
  to `teacher/rules.yaml` at the extraction of #318, their slugs kept; the rules of
  `course/rules.yaml` are named the same way. A rule id is unique across the rule files
  (two, `course/rules.yaml` and `teacher/rules.yaml`; #339) and never reused; the check
  `rule-slugs` reads the rule files once the rules are there.
- Amended 2026-11-04 (#528): the decisions of this spec are no longer among the references that
  cite a slug; a decision cites no rule id (decision `decision-format`), since a slug changes
  faster than the decision that settles the rule.
- Amended 2026-11-05 (#554): the protocol's rules are in `teacher/rules.yaml` only, which
  `rule-slugs` reads; the table of where each rule came from left `teacher/README.md` with the
  rules, and is no longer among the references that cite a slug (epic #450: a spec names no
  course).
