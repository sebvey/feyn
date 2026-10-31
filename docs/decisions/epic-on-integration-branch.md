---
date: 2026-10-31
issue: 344
status: accepted
area: repo
---

Without this, an orchestrator delivers each slice of an epic to `main` and waits for the
maintainer to merge each one, as `/feyn-deliver` step 5 says; with the maintainer away, the epic
stops at its first PR, and a slice that departs from the epic's Done when reaches the hand-over
unseen, as #329 did.

An epic is delivered by its orchestrator on an **integration branch**, cut from `main` when the
epic is taken and named like an issue branch after the epic (`<type>/<epic>-<slug>`). Each slice
is a PR to that branch: reviewed by a fresh agent, merged (squash) by the orchestrator, who
closes the slice (`Closes` does not close an issue on a branch other than `main`) and sets it
Done. `main` is merged into the branch when it moves, never rebased. A choice that departs from
the epic's Done when or adds structure (a new file, a category, a marker, an exception to a
principle) becomes at once an **open question** to the maintainer, a line in the plan comment
and a comment on the epic, and the work goes on; the maintainer answers on the epic, and the
orchestrator applies the answer, by a slice when it needs work. When the last slice is merged, a
fresh agent reviews the whole branch against the epic's Done when; the **epic PR**, from the
integration branch to `main` with `Closes #<epic>`, is handed over only when no open question
remains. The maintainer validates the whole by merging the epic PR into `main` (squash), which
closes the epic. An observation stays one PR to `main`, merged by the maintainer. This replaces,
for a slice, the delivery to `main` with one merge by the maintainer per slice.

## Options ruled out

- A PR per slice to `main`, merged by the maintainer: the epic waits on each merge.
- Stopping on a departure until the maintainer answers: the epic stops while they are away.

## Consequences

- Trial: epic #317 (plan comment, 2026-10-31), eight slices merged by the orchestrator, one
  merge by the maintainer (#335). A slice of an epic never goes Ready for review; the epic does,
  when its epic PR is handed over.
- Amends `three-channels` (one more branch outlives an issue),
  `fresh-agent-review-before-maintainer` (the epic PR reaches the maintainer) and
  `themes-and-release-milestones` (the plan comment holds the open questions).
