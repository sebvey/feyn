# Night 1 report, 2026-10-27

One of 14 items ran. S0-01 did its work but is marked blocked after review. The other 13 were skipped because they all depend on it, directly or through S0-02.

## Results

| Item | Status | PR | Squash sha |
|---|---|---|---|
| S0-01 | blocked (work done, review asks for changes) | feyn-o0o #109 and parcours-po-website #30, both squash-merged | not recorded |
| S0-02 | skipped | none | none |
| S0-03 | skipped | none | none |
| S0-04 | skipped | none | none |
| S0-05 | skipped | none | none |
| S0-06 | skipped | none | none |
| S0-07 | skipped | none | none |
| S1-01 | skipped | none | none |
| S1-02 | skipped | none | none |
| S1-03 | skipped | none | none |
| S1-06 | skipped | none | none |
| S1-07 | skipped | none | none |
| S1-08 | skipped | none | none |
| S1-11 | skipped | none | none |

## Needs the maintainer

No `construction/notes/S0-01.md` exists: the author found nothing that needed a decision.

Blocked: S0-01. What unblocks it is the freeze announcement, which the review found missing from the delivered result. Its one line, ready to post:

> Frozen on 2026-10-27: parcours-po at course-v2.5.0, parcours-po-website at site 2.4.1 (aligned on 2.5.0, deployed); successor github.com/sebvey/feyn.

Once you have posted or accepted it, S0-01 is done and S0-02 can start.

From the author (for_maintainer):

- Frozen: course tag course-v2.5.0, site 2.4.1 (aligned on course 2.5.0).
- parcours-po had no root README.md. PR #109 created one: the freeze line plus a one-line description. Rewrite it if you want something else.
- S0-01 is not ticked in `construction/plan/stage-0.md`, because feyn has no git yet (S0-02 creates it). Tick it in the S0-02 PR or by hand.

From the review:

- Deviation from `construction/overnight.md`: the author merged both freeze PRs himself, before any review, against the rule that the orchestrator reviews and merges. The content is correct and the merges cannot be undone, so nothing was changed. No further push to the old repositories is allowed.
- Path gap in the plan: the old repositories are at `/Users/sve/code/workspaces/perso/pdx/parcours-po` (remote sebvey/feyn-o0o) and `/Users/sve/code/workspaces/perso/pdx/parcours-po-website`, not at the `../` paths the plan gives. You may want to fix the design.
- The new README of parcours-po says "taught by an agent", where the glossary reserves "teacher". It sits in a frozen repository, so it is only noted here.

What the review verified: `git diff course-v2.5.0 -- course/` is empty; `check-alignment` reports 20 concept pages and 7 domain pages with no gap; package.json shows 2.4.1 with course version 2.5.0; the last deploy succeeded and the live site shows "2.4.1 · cours 2.5.0"; line 1 of README.md on main in both repositories is the freeze line.

## Skipped and why

| Item | Depends on |
|---|---|
| S0-02 | S0-01 |
| S0-03 | S0-02 |
| S0-04 | S0-02 |
| S0-05 | S0-04 |
| S0-06 | S0-02 |
| S0-07 | S0-04, S0-05 |
| S1-01 | S0-07 |
| S1-02 | S0-07 |
| S1-03 | S1-02 |
| S1-06 | S1-03 |
| S1-07 | S1-03 |
| S1-08 | S1-03, S1-07 |
| S1-11 | S1-03 |

The whole chain waits on S0-01, which is blocked only by the missing announcement.

## What to read first in the morning

1. The announcement line above: accept or post it to unblock S0-01.
2. The merge deviation and the path gap in "Needs the maintainer".
3. The new README of parcours-po (PR #109): keep or rewrite it.
