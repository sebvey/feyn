---
date: 2026-10-27
issue: 63
status: accepted
area: repo
---

Without this, an agent would add a `state:blocked` label, and when the maintainer unblocks
an issue, nobody would know whether it goes back to `state:todo` or to `state:wip`; or it
would filter `state:wip` and take a blocked issue as if it were moving.

`blocked:maintainer` is a label on top of the Status, never a Status. The Status of the
issue in the Project says where the work stands (Backlog, Ready, In progress, Ready for review,
Done, one at a time; decision `project-status-not-state-labels`); `blocked:maintainer` says who
holds the next move, and can sit on any Status. The Status Needs Decision is present in the
Project and unused: the label carries a decision awaited. Only the maintainer removes it;
`/feyn-issue-branch` refuses an issue that carries it. The label sits on the issue only. A PR
that leaves a decision to the maintainer is a draft, without the label (a PR has no Status, so
without the draft such a PR looks mergeable: PRs #102, #103 and #106 had neither); the
maintainer removes the issue's label, one removal per answer (the label on the PR said nothing
the draft did not, and cost a second removal). The maintainer's morning walks the Project's
views, Epics, Ready, WIP and Backlog (`docs/contributing.md`, "How the work is organised"),
the label `blocked:maintainer` first (what waits for them).

## Options ruled out

- The label on the PR only: the Project holds issues only, so it would no longer show the
  wait, and `/feyn-issue-branch` reads the issue.
- The agent removing the label after a maintainer comment: it loosens who lifts a block.
- A GitHub Action copying the removal to the PR: a mechanism to maintain for what dropping one
  label solves.
- A fourth state `state:blocked`: it loses the state the issue had before the block.
- No label, the block written in a comment: it cannot be filtered, and an agent reading the
  list would start the issue.
