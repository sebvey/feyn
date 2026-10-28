---
date: 2026-10-28
issue: 128
status: accepted
area: repo
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
