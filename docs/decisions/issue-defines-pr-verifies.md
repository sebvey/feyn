---
date: 2026-10-27
issue: 63
status: accepted
area: repo
---

Without this, an agent would write a second Done when in the PR body, or edit the issue's Done when while the branch is open, and the reviewer would no longer know which of the two the work is held to.

The Done when is written once, in the issue; from Ready on, it is the contract. The form of a work item freezes at Ready, the commitment point: until then, as an option, its kind and body may change (decision `idea-and-option-before-ready`). The PR does not define, it reports: `/feyn-pull-request` rereads the issue's Done when, checks each statement against the branch, and writes in the PR body's Checks section one line per issue that counts the verdicts (`met`, `not met`, `deviation`), without restating the statements; only a `not met` or a `deviation` gets a line saying why. The proof of each statement is not in the PR: the fresh-agent reviewer (`/feyn-pr-review`) reruns every statement of the issue itself (decision `fresh-agent-review-before-maintainer`). When the issue and the PR disagree, the issue wins and the PR says why it deviates. The Done when is not edited after `/feyn-issue-branch` but by a dated amendment of the issue, which amends the open PR's body as well: a baseline added to a Done when that has none, and a statement corrected after an instruction deviation found in delivery (decision `done-when-run-at-writing`). The issue stays the one contract.

`Closes #n` when the PR ends the issue; `Refs #n` when the PR is one step of it (the issue stays open and its Development section shows nothing; never link the PR there by hand). A linked PR closes its issue at the merge (GitHub, documented 2026-10-28, #71).

## Consequences

- The PR stays short and names only what does not hold; the reviewer holds the diff to the issue's statements, not to proof lines the contributor chose.
- Issue #61 makes `/feyn-pull-request` write the verdicts; the PR's `Closes #n` links it to its issue, nothing links the branch (decision `no-branch-link`).
- Amended 2026-11-02 (#395): the contract starts at Ready, where the form of a work item freezes; before it, as an option, its kind and body may change (a story rewritten as an epic, or the reverse). Without this, an agent would hold an option's Done when as frozen and refuse to reshape it, though refining an option is what the stages before commitment are for.
- Amended 2026-11-05 (#569): a committed Done when changes by a dated amendment of the issue in two cases, a baseline added at the first moment that uses it and a statement corrected after an instruction deviation, the open PR's body amended with it. Without this, an agent would read "not edited after the start" as forbidding both, and would either leave a Done when with no baseline or hold the work to a command shown wrong, as #554 was held to a grep that matched « adresse »; the issue stays the one contract, so "the issue wins" still holds.
