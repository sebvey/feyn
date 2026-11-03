---
date: 2026-11-04
issue: 511
status: accepted
area: spec:linear-course
---

Without this, the teacher would teach sub-concept 0b of `po-essai` in text alone although its
`concept.md` declares a diagram for it, and never offer it; a learner who does not think of
asking never sees the picture the course drew for that sub-concept.

The teacher shows a declared diagram unasked: at the message that teaches the sub-concept the
diagram's `subconcept` names (`diagrams` of `concept.md`; for a parent sub-concept, its first
message), it shows the diagram and says its caption, and where a diagram cannot show it says so
and gives the concept's page (rule `diagram-not-displayable`). This is the protocol rule
`declared-diagram-shown`, which replaces `diagram-only-on-request` (inherited from
`parcours-po`, ADR-075: a diagram only when the learner asks, never offered), against Mayer's
multimedia principle (words and a picture teach better than words alone; the standards analysis
of 2026-10-30). On request, rules `requested-diagram-shown` and `diagram-not-displayable` are
unchanged. The rule holds at every message; the moment `diagram` of the composition also comes
at that sub-concept, so that the teacher loads what it reads there (the declared diagrams, their
caption).

The two fresh tests, scenario `declared-diagram` (a learner at sub-concept 0b of concept 0 who
never asks for a diagram) run with `classroom-builder/fresh-test` on `courses/po-essai`, judged on
this rule alone:

- necessary: on a classroom built from the protocol before the rule, the teacher taught 0b in
  text alone, with no diagram, no caption and no concept page; not observed (2026-11-04);
- sufficient: on a classroom built with the rule, the teacher loaded the diagram moment at 0b,
  said the diagram's caption unasked, said it could not show it there and gave the concept's
  page; observed, exit 0 (2026-11-04).

## Options ruled out

- Offering the diagram and showing it on a yes: less faithful to the multimedia principle, and
  one more question in a message that already holds one (the maintainer, 2026-11-04).
- Keeping `diagram-only-on-request`: the gap the standards analysis found.
