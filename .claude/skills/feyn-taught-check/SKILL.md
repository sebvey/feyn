---
name: feyn-taught-check
description: "Tooling of the work cycle, called by the maintainer and by `/feyn-deliver`'s contributor after any change to what a concept teaches: run the agent workflow feyn-taught-check-workflow, which reports the cases of a course that ask what the learner has not yet been taught, and triage its findings. Use for \"/feyn-taught-check parcours-po\", \"/feyn-taught-check parcours-po from 9\"."
argument-hint: "<course id> [from <concept>] [to <concept>]"
---

# /feyn-taught-check

One job: run the agent workflow `feyn-taught-check-workflow` (`taught-check.js` of
`.claude/workflows/`) and handle what it finds.
It is mandatory after any change to what is taught (teaching notes, a sub-concept, an order), before
the merge (`SPEC.md` section 10).

## 1. Run

Arguments: `{ course, from?, to? }`. Pass `from` as the first concept touched by the change;
without it, the whole course is reread, annexes included. The workflow builds an inventory of
what the learner receives, unit by unit, then has groups of four concepts reread against it,
with seven checks. It modifies no file and returns the `inventory` and the `findings`.
Launch it with `scriptPath` absolute: `Workflow` called by name serves a frozen version of the
script (Claude Code, observed 2026-10-29, #269). An agent of the run with no tool call for
several minutes is stalled, not blocked: wait (Claude Code, observed 2026-10-29, #269).

## 2. Handle the findings

- A finding whose fix does not change what a concept teaches (cross-reference, a case
  attributed to its sub-concept, a wording that assumes a notion not yet received): fix it on
  the issue's branch, whether or not the change caused it, then rerun from the first concept
  fixed. Two rounds at most.
- A finding whose fix changes what a concept teaches, or one that returns after round two:
  an issue (`/feyn-issue observation`), not a fix here.
- The PR summarises them under Changes, within `/feyn-pull-request` step 5's limits: one bullet for the
  findings fixed, with their count, one for the findings deferred, with their issue numbers;
  the workflow's result goes on a line of its own in Checks, `taught-check: <result>` (an
  agent workflow, not a check: not on the `Checks run:` line).
