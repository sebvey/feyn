---
date: 2026-11-04
issue: 511
status: accepted
area: spec:linear-fr
---

Without this, the teacher would teach a unit in text alone although its `concept.md` declares a diagram for it, and never offer it; a learner who does not think of asking never sees the picture the course drew for that unit.

The teacher shows a declared diagram unasked: at the message that teaches the unit the diagram's `unit` names (`diagrams` of `concept.md`), it shows the diagram and says its caption, and where a diagram cannot show it says so and gives the concept's page, as the protocol does for any diagram it cannot show. This rule of the protocol replaces the one inherited from the founding course (a diagram only when the learner asks, never offered), against Mayer's multimedia principle (words and a picture teach better than words alone; the standards analysis of 2026-10-30). On request, the teacher shows the diagram the course declares for the unit or its concept, and says so when there is none, drawing no diagram the course does not declare (#476); where a diagram cannot show, it says its caption and gives the concept's page. The rule holds at every message; how the teacher knows the declared diagrams and their caption at that unit, and how it shows one, is the teacher implementation's (for Claude Code, the caption said and the concept's page on the site given, where the diagram shows at its unit). The body of `concept.md` holds no image line: the site build places a declared diagram at its unit too.

The two fresh tests, scenario `declared-diagram` (a learner at the second sub-concept of the first concept, which declares a diagram, who never asks for one) run with `teacher-builder/fresh-test` on a two-concept course, judged on this rule alone:

- necessary: on a classroom built from the protocol before the rule, the teacher taught that sub-concept in text alone, with no diagram, no caption and no concept page; not observed (2026-11-04);
- sufficient: on a classroom built with the rule, the teacher loaded the diagram moment there, said the diagram's caption unasked, said it could not show it there and gave the concept's page; observed, exit 0 (2026-11-04).

## Options ruled out

- Offering the diagram and showing it on a yes: less faithful to the multimedia principle, and one more question in a message that already holds one (the maintainer, 2026-11-04).
- Keeping the inherited rule, a diagram only on request: the gap the standards analysis found.

## Consequences

- Amended 2026-11-06 (#630): a diagram is declared at a unit (its key `unit`, the id of a unit), no longer at any node of the concept's tree, and the image line leaves the body of `concept.md`: the builds place the diagram at its unit (decision `unit-is-the-content-unit`). The evidence above was observed on the form before units, where the diagram was declared at a sub-concept; the teacher implementation names the diagram's unit, and gives the teacher how to show a diagram at that unit or on request.
- Amended 2026-11-09 (#773): the protocol rule is written at the unit (`products/teacher/rules.yaml`, subject message form); the fallback on a drawing instruction is gone with that instruction, and a diagram the course does not declare is not drawn on request (#476).
