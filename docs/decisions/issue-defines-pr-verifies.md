---
date: 2026-10-27
issue: 63
status: accepted
area: repo
---

Without this, an agent would write a second Done when in the PR body, or edit the issue's
Done when while the branch is open, and the reviewer would no longer know which of the two
the work is held to.

The Done when is written once, in the issue; it is the contract. The PR does not define, it
reports: `/finish` rereads the issue's Done when, checks each statement against the branch,
and writes in the PR body, under "Done when, verified:", one line per statement that starts
with a verdict (`met`, `not met`, `deviation`), then the proof (command run, file read). When
the issue and the PR disagree, the issue wins and the PR says why it deviates. The Done when
is not edited after `/start`; a change to it amends the open PR's body as well.

`Closes #n` when the PR ends the issue; `Refs #n` when the PR is one step of it (the issue
stays open and its Development section shows nothing: link the PR by hand if needed).

## Consequences

- The reviewer reads the diff and the proof in one place.
- Issue #61 makes `/finish` write the verdicts and link the PR to its issue and branch.
