---
date: 2026-10-28
issue: 71
status: accepted
area: repo
---

Without this, an agent would link the branch to the issue with `gh issue develop`, and a `Refs`
PR would close its issue at the merge (#24, closed wrongly on 2026-10-27); `/finish` would then
have to unlink it by GraphQL.

An issue branch is not linked to its issue. `/start` creates it with git
(`git switch -c <type>/<n>-<slug> origin/main`, `git push -u origin <type>/<n>-<slug>`), and the
only link between the work and the issue is the PR body: `Closes #n` links the PR to the issue
and closes it at the merge; `Refs #n` links nothing and leaves the issue open. It replaces the
link `/start` made with `gh issue develop` and the unlink `/finish` ran before a `Refs` PR
(PR #103, tested with #109 and PR #110).

## Options ruled out

- Keep the link and unlink before a `Refs` PR: two steps, one GraphQL call, and a `Refs` issue
  closed wrongly whenever the unlink is missed or fails.

## Consequences

- The issue's Development section lists the PR once it says `Closes #n`, never the branch; a
  `Refs` PR shows only in the issue's timeline.
- No Project workflow depends on the link: "Item closed" sets Done on the close, whatever
  closed the issue (decision `project-status-not-state-labels`).
