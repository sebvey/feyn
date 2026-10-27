---
name: taught-check
description: Run the taught-check agent workflow, which reports the cases of a course that ask what the learner has not yet been taught, and triage its findings. Use for "/taught-check", "run taught-check on parcours-po from concept 9", after any change to what a concept teaches.
argument-hint: "<course id> [from <concept>] [to <concept>]"
---

# /taught-check

One job: run `.claude/workflows/taught-check.js` and handle what it finds. It is mandatory
after any change to what is taught (teaching notes, a sub-concept, an order), before the merge
(`SPEC.md` section 10).

## 1. Run

Arguments: `{ course, from?, to? }`. Pass `from` as the first concept touched by the change;
without it, the whole course is reread, annexes included. The workflow builds an inventory of
what the learner receives, unit by unit, then has groups of four concepts reread against it,
with seven checks. It modifies no file and returns the `inventory` and the `findings`.

## 2. Handle the findings

- A finding whose fix does not change what a concept teaches (cross-reference, a case
  attributed to its sub-concept, a wording that assumes a notion not yet received): fix it on
  the issue's branch, whether or not the change caused it, then rerun from the first concept
  fixed. Two rounds at most.
- A finding whose fix changes what a concept teaches, or one that returns after round two:
  an issue (`/ticket`), not a fix here.
- The PR lists each finding fixed or deferred, and the workflow's result as a `Done when,
  verified:` line.
