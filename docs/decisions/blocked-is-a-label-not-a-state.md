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
issue in the Project says where the work stands (Backlog, Ready, In progress, Done, one at a
time; decision `project-status-not-state-labels`); `blocked:maintainer` says who holds the next
move, and can sit on any Status. Only the maintainer removes it; `/start` refuses an issue that
carries it. The maintainer's morning is the Project's Board view: the filter
`label:blocked:maintainer` first (what waits for them), then the In progress column (what moves
on its own), then Ready (what can be taken).

## Options ruled out

- A fourth state `state:blocked`: it loses the state the issue had before the block.
- No label, the block written in a comment: it cannot be filtered, and an agent reading the
  list would start the issue.
