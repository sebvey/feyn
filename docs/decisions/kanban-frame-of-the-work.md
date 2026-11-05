---
date: 2026-11-02
issue: 395
status: accepted
area: repo
---

Without this, a contributor would add a step or a status of the work at a brainstorm with no outside reference to check it against, so the process would drift from one session to the next and each change be argued from scratch.

The work on feyn is organised by Kanban (the Kanban Method, as the Kanban Guide of 2020 sums it up), with two named complements: ADR for the decisions (the `decisions/` folders, decision `decision-format`), and GitHub flow for the branches, with an integration branch per epic (decision `epic-on-integration-branch`). What the frame is lives in `docs/kanban.md`; how feyn applies it lives in `docs/contributing.md`. This replaces the reference to Scrum.

## Options ruled out

- Scrum: it assumes a team, sprints and roles, none of which exists here, and the history of the repository shows a flow, not iterations.

## Consequences

- Amended 2026-11-04 (#545): the frame's words leave this decision for the glossary, their why in its entries (decision `word-choices-in-the-glossary`).
