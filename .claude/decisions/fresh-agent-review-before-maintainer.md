---
date: 2026-10-28
issue: 128
status: accepted
area: agentic
---

Without this, an agent would hand the maintainer a PR it verified itself; on
waves 1 and 2 that missed 5 blocking defects on PR #106 and 2 on PR #121.

Every PR but a direct delivery is reviewed by a fresh agent before it reaches the maintainer.
The reviewer is not the contributor agent and is not resumed from it: it reads the issue and
the PR cold, holds the PR to the issue's Done when, and recounts and rechecks each claim itself
instead of trusting the PR body. It reports blocking and non-blocking findings; the blocking
ones are fixed before the hand-over. The review is `/feyn-pr-review`. Under
`/feyn-deliver-story-alone` and `/feyn-deliver-epic`, the agent workflow `deliver-story.js` runs
it, and a fresh agent verifies each round of corrections. On the direct path,
`/feyn-pull-request` runs it before Ready for review; the work session that did the work applies
the findings and checks them in the diff, and a second review runs only when a correction goes
beyond what the review asked. A story of an epic is reviewed so and merged by the orchestrator
into the epic's integration branch; what reaches the maintainer is the epic PR, after a fresh
agent reviewed the whole branch (decision `epic-on-integration-branch`). It adds to the
contributor's own verification (`/feyn-pull-request`, decision `issue-defines-pr-verifies`),
which stays.

## Options ruled out

- The contributor agent reviewing its own PR, or a subagent resumed from it: it rereads with
  the reasoning that produced the defects.
- The maintainer as the only reviewer: the defects reach them, and each costs a round trip.

## Consequences

- Amended 2026-10-30 (#264): every PR but a direct delivery, a story of one edit with no
  behaviour that the maintainer names `direct` at creation; its PR says so in its Checks line.
