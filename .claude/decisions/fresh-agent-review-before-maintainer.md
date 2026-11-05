---
date: 2026-10-28
issue: 128
status: accepted
area: agentic
---

Without this, an agent would hand the maintainer a PR it verified itself; on waves 1 and 2 that missed 5 blocking defects on PR #106 and 2 on PR #121.

Every PR but a direct delivery is reviewed by a fresh agent before it reaches the maintainer. The reviewer is not the contributor agent and is not resumed from it: it reads the issue and the PR cold, holds the PR to the issue's Done when, and recounts and rechecks each claim itself instead of trusting the PR body. It reports blocking and non-blocking findings; the blocking ones are fixed before the hand-over. On every path, whoever corrects a finding checks the fix in the diff against the review's words, and a second fresh review runs only when a correction goes beyond what the review asked. On the direct path, the review is `/feyn-pr-review`, run by the work session that did the work once its PR is open, before the hand-over; that work session applies the findings. Under `/feyn-deliver-story-alone` and `/feyn-deliver-epic`, the agent workflow `deliver-story.js` spawns the fixer (the project subagent `feyn-pr-fixer`), a fresh agent that reviews as `/feyn-pr-review` does, then corrects what it located; the review of the whole branch of an epic is the fixer's too. A story of an epic is reviewed so and merged by the orchestrator into the epic's integration branch; what reaches the maintainer is the epic PR, after a fresh agent reviewed the whole branch (decision `epic-on-integration-branch`). It adds to the contributor's own verification (`/feyn-pull-request`, decision `issue-defines-pr-verifies`), which stays.

## Options ruled out

- The contributor agent reviewing its own PR, or a subagent resumed from it: it rereads with the reasoning that produced the defects.
- The maintainer as the only reviewer: the defects reach them, and each costs a round trip.

## Consequences

- Amended 2026-10-30 (#264): every PR but a direct delivery, a story of one edit with no behaviour that the maintainer names `direct` at creation; its PR says so in its Checks line.
- Amended 2026-11-05 (#604): the fresh agent that verified each round of corrections under the agent workflow is gone; it entered because a workflow cannot resume an agent, never decided for itself. On every path, whoever corrects a finding checks the fix in the diff against the review's words; a second fresh review only when a correction goes beyond what the review asked; under the agent workflow and at the whole-branch review, the fixer corrects what it located. The agent that located a defect holds the reasoning that found it, not the one that produced it, so the contributor still never reviews its own change. Ruled out: a lighter agent fed the findings only that corrects them, with no fresh check after it (still one agent more than needed); one agent definition whose prompt decides whether it may edit (the read-only review of the direct path would hold by its prompt alone).
