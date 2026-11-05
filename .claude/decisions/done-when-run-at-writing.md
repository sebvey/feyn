---
date: 2026-11-05
issue: 569
status: accepted
area: agentic
---

Without this, a Done when command would first be run by the contributor, as on #450: the
contributor of #554 rewrote three French wordings (« adresse » into « URL ») to bring a too
broad `grep -i 'ADR'` to zero, and three reviews reran the grep and said met, so a wrong command
changes merged content and every review that reruns it confirms it.

Whoever writes a Done when (a triage, a brainstorm, an option refinement, the orchestrator of an
epic, the maintainer) runs each of its commands on the base and writes the **baseline** under
its statement, each line checked against the statement's intent and what the command cannot see
looked for. The start of a story reruns each command and stops on an output that changed. A
Done when written with no baseline gets one at the first moment that uses it (the commitment of
an option, the start of a story, the take of an epic), as a dated amendment of the issue. The
intent of a statement prevails over its command: the contributor never changes content to
satisfy a command and reports a wrong command as a deviation, with the corrected command; the
reviewer checks that each line changed for a statement was in its baseline and serves its
intent; an instruction deviation corrects the issue's Done when by a dated amendment, in an epic
as for a story without one. The rules live in one file of reference,
`.claude/reference/done-when.md`, which the body templates, the skills that write or use a Done
when and the two reviewers cite.

## Options ruled out

- A script that runs the Done when: it can follow once commands repeat; the trace comes first.
- A fresh agent checking each Done when before its start: costly for one defect in five.
- A check at the start only: the start has no reference to judge an output by.
- Baselines written on every open work item at once: stale by the time each one starts.
- Blocking the run on a wrong command (a whole run for a wrong count), or leaving it to the
  review (one more correction round).
- One file of all the shared policies: it does not say which moment a policy serves.
