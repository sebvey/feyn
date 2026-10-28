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
and writes in the PR body's Checks section one line per issue that counts the verdicts
(`met`, `not met`, `deviation`), without restating the statements; only a `not met` or a
`deviation` gets a line saying why. The proof of each statement is not in the PR: the
fresh-agent reviewer reruns every statement of the issue itself (decision
`fresh-agent-review-before-maintainer`). When the issue and the PR disagree, the issue wins
and the PR says why it deviates. The Done when is not edited after `/start`; a change to it
amends the open PR's body as well.

`Closes #n` when the PR ends the issue; `Refs #n` when the PR is one step of it (the issue
stays open and its Development section shows nothing: link the PR by hand if needed).

## Consequences

- The PR stays short and names only what does not hold; the reviewer holds the diff to the
  issue's statements, not to proof lines the contributor chose.
- Amended 2026-10-28 (#123): the PR gave each statement with its verdict and proof; it now
  gives the counts and a line per `not met` or `deviation`.
- Issue #61 makes `/finish` write the verdicts and link the PR to its issue and branch.
