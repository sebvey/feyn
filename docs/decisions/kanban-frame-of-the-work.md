---
date: 2026-11-02
issue: 395
status: accepted
area: repo
---

Without this, an agent would name the work in a vocabulary of feyn's own (slice, observation,
proposal) beside a table of correspondence to the standard words, so one thing would have two
names, a standing source of confusion, and the outside reference would no longer open from the
word; and with no named frame, each brainstorm would redesign the process anew.

The work on feyn is organised by Kanban (the Kanban Method, as the Kanban Guide of 2020 sums it
up), with two named complements: ADR for the decisions (the `decisions/` folders, decision
`decision-format`), and GitHub flow for the branches, with an integration branch per epic
(decision `epic-on-integration-branch`). What the frame is lives in `docs/kanban.md`; how feyn
applies it lives in `docs/contributing.md`. The vocabulary is the frame's wherever the frame
has a word: **epic** and **story** for the work items, **idea** and **option** for the two
stages before commitment (Upstream Kanban), **Ready** as the commitment point, **WIP limit**,
**triage**, **policies**. Kanban names no type of work item, so those names come from the most
widespread sources: common agile and GitHub vocabulary for epic and story, Steyaert's Upstream
Kanban for idea and option. "Slice", "observation" as a kind and "proposal" go, in the labels,
the skills and the glossary; the terms of feyn's own mechanisms, which the frame does not name,
stay: epic PR, integration branch, plan comment, open question, direct delivery, work session.
This replaces the vocabulary of slices, observations and proposals, and the reference to Scrum
vocabulary.

## Options ruled out

- Scrum: it assumes a team, sprints and roles, none of which exists here, and the history of
  the repository shows a flow, not iterations.
- feyn's terms kept, with a correspondence in the glossary: two words for one thing.
- The label `proposal` kept as "historical": a dead label stays in the list at every issue
  creation, and someone ends up setting it.
