---
date: 2026-10-28
issue: 128
status: accepted
area: agentic
---

Without this, an agent would hand the maintainer a PR it verified itself; on
waves 1 and 2 that missed 5 blocking defects on PR #106 and 2 on PR #121.

Every PR is reviewed by a fresh agent before it reaches the maintainer. The reviewer is not
the contributor agent and is not resumed from it: it reads the issue and the PR cold, holds the
PR to the issue's Done when, and recounts and rechecks each claim itself instead of trusting
the PR body. It reports blocking and non-blocking findings; the blocking ones go back to the
contributor agent and are fixed before the hand-over, and the orchestrator checks the fixes in
the diff itself. `/orchestrate` runs this review as a step of the issue cycle. It adds to the
contributor's own verification (`/finish`, decision `issue-defines-pr-verifies`), which stays.

## Options ruled out

- The contributor agent reviewing its own PR, or a subagent resumed from it: it rereads with
  the reasoning that produced the defects.
- The maintainer as the only reviewer: the defects reach them, and each costs a round trip.

## Consequences

- Amended 2026-10-29 (#248): the review is `/feyn-pr-review`, a skill of the work-cycle
  tooling, run by `/feyn-deliver` at its review step and by `/feyn-pull-request` on the direct
  path before Ready for review (there, the work session that did the work applies the findings
  and checks them in the diff); so every PR gets it, not only those that went through
  `/orchestrate`.
- Amended 2026-10-30 (#264): every PR but a direct delivery, a slice of one edit with no
  behaviour that the maintainer names `direct` at creation; its PR says so in its Checks line.
- Amended 2026-10-30 (#237): under `/feyn-deliver`, the reviewer, resumed with the
  corrections, checks the fixes (each finding, the statements touched, what lies beyond); the
  orchestrator keeps the sensitive points; a new agent only when the reviewer is gone. On the
  direct path the second-review rule of #258 point 4 holds.
- Amended 2026-10-31 (#344): a slice of an epic is reviewed by a fresh agent and merged by the
  orchestrator into the epic's integration branch; what reaches the maintainer is the epic PR,
  after a fresh agent reviewed the whole branch (decision `epic-on-integration-branch`).
