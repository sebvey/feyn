---
date: 2026-11-02
issue: 395
status: accepted
area: repo
---

Without this, the work session running a brainstorm would end it in a proposal issue, so the
points the maintainer decided during the brainstorm would pass through the triage again, two
passes for one decision, and its "Proposed next" would cut the work before knowing the ground,
which decision `themes-and-release-milestones` forbids an epic.

A brainstorm ends in options, posed in a plan of work items through the skills of the cycle.
It creates the work items it defined, in Status Option (decision `idea-and-option-before-ready`),
an epic or a story by size, each with the body of its kind; what was settled subject by subject,
with its why and the alternative rejected, goes in the epic's Material or the story's Context.
The epic's Material is therefore what is read when splitting and what was settled, no longer a
reading list only. The same plan reworks or replaces the option the brainstorm opened from, and
comments the neighbours whose work it changes; it may leave the maintainer a working notebook
(the order, the command for each item, what is the maintainer's), not versioned (`tmp/`,
which git ignores). A brainstorm that settles nothing creates nothing; one that surfaces a
finding without deciding its form may leave an idea; one that opens from an idea (decision
`process-change-from-an-observed-problem`) is that idea's triage, and closes it as completed
when it poses its plan, naming the work items. This replaces the proposal: no proposal issue,
no label `proposal`, no proposal template, no "Proposed next". An option is what a proposal
was, defined work not committed.

## Options ruled out

- The proposal kept without "Proposed next": it stays an intermediate document that cannot be
  committed as it is.
- The proposal kept as a kind to trace the brainstorm: the trace is in the epic's Material, and
  git keeps the rest.

## Consequences

- Amended 2026-11-04 (#525): a brainstorm ends in a plan of work items, not in options only:
  the option it opened from reworked or replaced, a neighbour commented, a notebook left to the
  maintainer; the brainstorm of 2026-11-04 reworked option #475 into epics and a story, which
  options alone did not cover.
