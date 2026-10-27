---
date: 2026-10-27
issue: 63
status: accepted
area: repo
---

Without this, an agent would set up a GitHub Project, fields and automations on day one, when
the backlog holds fifty issues and the skills only know `gh issue`; or it would keep the state
labels forever once they drift.

The state labels (`state:proposed`, `state:todo`, `state:wip`) are the truth for the agent
until a GitHub Project replaces them. They are a copy of something derivable (a branch
`*/<n>-*` exists, the maintainer said yes), and copies drift: the first real `/finish` runs
are what tells whether the drift is real. The Project is the target, soon: it gives the
maintainer a board and the agent one list with a Status (`gh project item-list`), and its
built-in workflows move an item to Done when its PR merges, which is exactly what drifts by
hand. When it lands, the Status field replaces the three state labels; `type:`, `area:` and
`blocked:maintainer` stay as labels.

## Consequences

- Issue #64 creates the Project, before the twenty sub-issues of S1-10 exist.
- `/ticket`, `/start` and `/finish` then read and set the Status instead of the state labels.
