---
date: 2026-10-28
issue: 181
status: accepted
area: spec:linear-course
---

Without this, each writer of a diagram (a migration agent per concept, `course-batch` later)
would choose its own meaning for `primary`, `secondary` and `muted`, and the same notion would be
drawn in a different colour from one concept to the next: in wave 2 of S1-10, the old main text
colour became `muted` in concept 2, `primary` in concepts 3 and 4, `secondary` in concept 5.

Every diagram of a course is drawn in one style, `course/README.md` section 6.2: one meaning per
class (`primary` what the diagram teaches, its focus; `secondary` the contrast, a second element set
against the first; `muted` the context and the ordinary text) and six principles (one idea per
diagram; the roles subject, contrast, context, text; their rendering in class, opacity and form;
readable in one colour; the composition; the text a diagram holds). The style is written for the
diagrams to draw, not for compatibility with older ones: it holds principles, not a table of
colours. It binds every writer of a diagram, and a review checks it; the drawing contract of section
7.1 stays the only part a script checks. A migrated diagram is drawn anew under it from an inventory
of what the old one shows, not transcribed. The meaning of the classes and this counterfactual were
accepted by the maintainer on 2026-10-28 (work session, « Je valide le sens des trois classes », «
Contrefactuel validé »).

## Options ruled out

- One colour mapping per concept, decided by an agent: the wave-2 drift above.
- One fixed table from the old site's colour tokens to classes and opacities (first draft of
  #181, PR #182): the old site drew one hue at three strengths, now for a series, now for a
  contrast, so no table maps its tokens one to one, and per-diagram exceptions would write its
  accidents into the spec.

## Consequences

- The diagrams of concepts 0 to 5 and 9, migrated before this, are not redrawn under the style:
  #180, which planned it, was closed not planned. `course-batch` follows it for new diagrams.
- A drawing no longer keeps the old composition: the review judges whether it carries the same
  information.
- Amended 2026-10-30 (#216): #180 was closed not planned: no redraw of the diagrams of concepts
  0 to 5 and 9, migrated before this decision, is planned.
