# The reading against the purpose

How an item is read against the purpose of feyn before it is presented to the maintainer: an idea at a triage (`/feyn-triage` step 3), an option at an option refinement (`/feyn-refine-option` step 2), first of the checks of a commitment ([commitment.md](commitment.md)). It is the first reading, before the item is read against the repository.

## The reading

Read [vision.md](../../docs/vision.md) (what feyn is for, the yardstick of a change, the lessons) and answer two questions from the item's body, each with the line it rests on:
- which product it is for: the teacher, the site, the course-creator, or none (then which of them it serves, through what);
- how it serves the purpose, measured by the yardstick (for a change of `linear-fr`: does the bench course `product-lines/linear-fr/1/course/samples/cafe/` follow it in the same PR, and do its checks pass on it; for a change of what is expected of the teacher: does the teacher build on it with `teacher-builder/test-build` passing, and is a teaching session on it played by the maintainer at the PR that lands on `main`, decision `teacher-yardstick-cafe-and-maintainer-session`).

An item that names no product it serves says so; it is not refused here, the answer goes to the maintainer with the rest.

## An item labelled `stale`

An item labelled `stale` (posed before the frame of 2026-11-03) is, in this same reading, re-read against that frame: against `vision.md` (the purpose, the yardstick, the lessons) and against what replaced its frame since it was posed (a decision, a PR, a skill, each named). It is not a second reading, and the maintainer decides whether it still holds. The label is removed by the caller's act that executes the decision, never by the reading.

## What the presentation shows

**Purpose**: the product it is for and how it serves the purpose, each with its line, or "Names no product it serves"; an item labelled `stale`: also whether it still holds against `vision.md`, as written, reworked, or not at all (what replaced it), with its proof.
