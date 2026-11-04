---
date: 2026-10-31
issue: 344
status: accepted
area: repo
---

Without this, an agent would deliver each story of an epic as a PR to `main` and wait for the
maintainer to merge each one, so the epic stops at its first PR while the maintainer is away,
and a story that departs from the epic's Done when reaches the hand-over unseen, as #329 did.

An epic is delivered by its orchestrator on an **integration branch**, cut from `main` when the
epic is taken and named like an issue branch after the epic (`<type>/<epic>-<slug>`). Each story
is a PR to that branch: reviewed by a fresh agent, merged (squash) by the orchestrator, who
closes the story (`Closes` does not close an issue on a branch other than `main`) and sets it
Done. `main` is merged into the branch when it moves, never rebased. A choice that departs from
the epic's Done when or adds structure (a new file, a category, a marker, an exception to a
principle) is sorted at once, and the work goes on: one a decision, the epic's Material, a rule,
an answer of the maintainer or a story of the plan already settles is applied and the maintainer
informed; the rest, costly to undo or foundational, becomes an **open question** to the
maintainer, a line in the plan comment and a comment on the epic. The maintainer answers on the
epic or in the work session, the orchestrator records the answer at once in the plan comment
and applies it, by a story when it needs work. When the last story is merged, a
fresh agent reviews the whole branch against the epic's Done when; the **epic PR**, from the
integration branch to `main` with `Closes #<epic>`, is handed over only when no open question
remains. The maintainer validates the whole by merging the epic PR into `main` (squash), which
closes the epic. A story without an epic stays one PR to `main`, merged by the maintainer
(decision `story-with-or-without-an-epic`). This replaces, for a story of an epic, the delivery
to `main` with one merge by the maintainer per story.

## Options ruled out

- A PR per story to `main`, merged by the maintainer: the epic waits on each merge.
- Stopping on a departure until the maintainer answers: the epic stops while they are away.

## Consequences

- Trial: epic #317 (plan comment, 2026-10-31), eight stories merged by the orchestrator, one
  merge by the maintainer (#335). A story of an epic never goes Ready for review; its epic does.
- Amends `three-channels` (one more branch outlives an issue),
  `fresh-agent-review-before-maintainer` (the epic PR reaches the maintainer) and
  `themes-and-release-milestones` (the plan comment holds the open questions).
- Amended 2026-11-04 (#550): a departure is sorted before it becomes an open question, and an
  answer may come in the work session. In the delivery of epic #450, every departure became a
  question: about half of the maintainer's 17 answers restated a rule, a decision or a planned
  story that already settled it.
