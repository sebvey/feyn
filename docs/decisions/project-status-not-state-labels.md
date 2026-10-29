---
date: 2026-10-27
issue: 64
status: accepted
area: repo
---

Without this, an agent would keep setting `state:proposed`, `state:todo` and `state:wip` next
to the Project's Status, or read a label instead of the Status, and the two would drift apart
(issue #14 closed with `state:wip` still on it); or it would leave In progress to a Project
workflow, which no branch fires, and the issue would stay in Backlog after `/start`.

Where an issue stands is the Status of its item in the Project (the GitHub Project "feyn",
number 4, owner `sebvey`): Backlog (proposed, to triage), Ready (decided, free to take),
In progress (a branch exists), Done (closed; the close reason stays on GitHub). It replaces the
three state labels, which are deleted. The Project's built-in workflows carry what GitHub sees
happen: "Auto-add to project" adds new and updated open issues, "Item added to project" sets Backlog,
"Item closed" sets Done. The skills set what only they know: `/ticket` sets Ready when the
maintainer said the work is decided; `/start` refuses an issue in Done, or in In progress with
a branch, and sets In progress; `/finish after-merge` reads the workflows and sets Done only
when "Item closed" is off. The names, ids, workflows and commands live in
`.claude/skills/ticket/project.md`. `type:`, `area:` and `blocked:maintainer` stay labels.
The maintainer works in the web interface: the Project's Board view, filtered on
`label:blocked:maintainer` first. It supersedes decision `state-labels-until-the-project`.

## Options ruled out

- State labels kept as a copy of the Status: two truths for one fact, and the copy drifts the
  way the labels already did; a label search is no longer needed once the Board view exists.
- The skills add the issue and set every Status, workflows off: the same `gh project` calls in
  three skills, and an issue closed by a merged PR stayed In progress until
  `/finish after-merge` ran (#64, #125, #128, #22).
- Done only when closed by a PR ("Pull request merged"): an issue closed as not planned or as a
  duplicate would stay In progress or Backlog.

## Consequences

- Amended 2026-10-28 (#71): the skills added the issue and set every Status, the workflows
  only helping when on; the workflows now carry add, Backlog and Done, and Done means closed,
  not closed by a PR.
- Amended 2026-10-29 (#229): the Project's views are Epics, Ready, WIP and Backlog
  (`docs/contributing.md`, "How the work is organised"); the morning walks them, not a Board view.
- Amended 2026-10-29 (#235): the Status field has six options. **Ready for review**: the work
  claims done, the maintainer reviews and concludes; for a slice, its PR is open after the
  fresh-agent review and the maintainer merges; for an epic, every slice is closed and the
  maintainer verifies its Done when before closing it (a statement that does not hold adds a
  slice, and the epic goes back to In progress). `/finish` sets it, at the hand-over of a slice
  (`/orchestrate` step 5 when it runs the cycle, after the fresh-agent review) and when an
  epic's last slice closes. A correction asked on a delivered PR returns the slice
  to In progress (`/orchestrate` step 4), and the renewed hand-over sets Ready for review
  again. **Needs Decision** stays in the Project, unused by the skills for now: the label
  `blocked:maintainer` carries a decision awaited (decision `blocked-is-a-label-not-a-state`).
- Amended 2026-10-29 (#248): Ready for review on a slice is set by `/feyn-pull-request` at
  delivery on the direct path, after the fresh-agent review, and by `/feyn-deliver` at the
  hand-over; the names, ids, workflows and commands live in `.claude/reference/project.md`
  (moved by #240).
