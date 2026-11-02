---
date: 2026-11-02
issue: 395
status: accepted
area: repo
---

Without this, a work session would open a brainstorm on the process from a wish of design and
redesign it again, as happened once per brainstorm since the start, each redesign contradicting
part of the previous one, more than half of the issues being about the process itself; so the
volume of process work would have no bound, and a change no problem to be checked against.

After the foundation (epic #392, which lands the frame of decision `kanban-frame-of-the-work`),
a change to the process (a skill, a workflow, a policy, the glossary, `contributing.md`) enters
only by an idea that names the problem observed and where it was seen (a delivery, a debrief, a
triage, a teaching session), triaged like any other idea. A brainstorm on the process opens
from such an idea, never from a wish of design. The change is chosen by two criteria, in order:
the smallest change that settles the observed problem, then the standard form when one exists
(Kanban, ADR, GitHub flow). Tying each change to an observed problem bounds its volume and gives
it its justification, which is also the counterfactual a decision asks for. It is Kanban's own
principle, improve through evolutionary change (`docs/kanban.md`).

## Options ruled out

- A quota (one process story for three product stories): arbitrary, and a real problem would
  wait its turn.
- A freeze of the process for a period: observed problems would pile up without remedy, and the
  freeze would break all at once.
