---
date: 2026-10-27
issue: 64
status: accepted
area: repo
---

Without this, an agent would keep setting `state:proposed`, `state:todo` and `state:wip` next
to the Project's Status, or read a label instead of the Status, and the two would drift apart
(issue #14 closed with `state:wip` still on it); or it would rely on the Project's built-in
workflows and leave an issue in Backlog after `/start`.

Where an issue stands is the Status of its item in the Project (the GitHub Project "feyn",
number 4, owner `sebvey`): Backlog (proposed, to triage), Ready (decided, free to take),
In progress (a branch exists), Done (closed by a PR). It replaces the three state labels, which
are deleted. `/ticket` adds the issue to the Project and sets Backlog, or Ready when the
maintainer said the work is decided; `/start` refuses an issue in Done, or in In progress with
a branch, and sets In progress; `/finish after-merge` checks Done and sets it when the
Project's workflow did not. The skills add and set what they need themselves: the built-in
workflows (add on creation, Done on close or merge) help when on, and nothing depends on them.
The names and ids live in `.claude/skills/ticket/project.md`. `type:`, `area:` and
`blocked:maintainer` stay labels. The maintainer works in the web interface: the Project's
Board view, filtered on `label:blocked:maintainer` first. It supersedes decision
`state-labels-until-the-project`.

## Options ruled out

- State labels kept as a copy of the Status: two truths for one fact, and the copy drifts the
  way the labels already did; a label search is no longer needed once the Board view exists.
