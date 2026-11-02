---
date: 2026-10-27
issue: 64
status: accepted
area: repo
---

Without this, an agent would keep setting `state:proposed`, `state:todo` and `state:wip` next
to the Project's Status, or read a label instead of the Status, and the two would drift apart
(issue #14 closed with `state:wip` still on it); or it would leave In progress to a Project
workflow, which no branch fires, and the issue would stay in Ready after `/feyn-issue-branch`.

Where an issue stands is the Status of its item in the Project (the GitHub Project "feyn",
number 4, owner `sebvey`): Idea (a finding, to triage), Option (a work item defined, not
committed), Ready (committed, free to take), In progress (a branch exists), Ready for review
(the work claims done, the maintainer reviews and concludes), Done (closed; the close reason
stays on GitHub); the stages before Ready are decision `idea-and-option-before-ready`. Ready for
review is a story without an epic whose PR is open after the fresh-agent review (the maintainer
merges), or an epic whose epic PR is handed over (the maintainer verifies its Done when and
merges); a story of an epic never has it. A correction asked on a delivered PR returns the issue
to In progress, and the renewed hand-over sets Ready for review again. No Status says a decision
is awaited: the label `blocked:maintainer` carries it, on any Status (decision
`blocked-is-a-label-not-a-state`). It replaces the three state labels, which are deleted. The
Project's built-in workflows carry what GitHub sees happen: "Auto-add to project" adds new and
updated open issues, "Item added to project" sets Idea, "Item closed" sets Done, whatever closed
the issue. The skills set what only they know: `/feyn-issue` sets Option on a work item it
creates, or Ready when the maintainer says it is committed, and Ready on a story posed by the
orchestrator of a taken epic (decision `idea-and-option-before-ready`); `/feyn-issue-branch`
refuses an issue in Done, or in In progress with a branch, and sets In progress;
`/feyn-pull-request` on the direct path, and `/feyn-deliver` or `/feyn-deliver-epic` at the
hand-over, set Ready for review; `/feyn-merge-cleanup` reads the workflows and sets Done only
when "Item closed" is off.
The names, ids, workflows (on or off) and commands live in `.claude/reference/project.md`. The
kind (`epic`, `story`; decision `kind-label-per-work-item`), `type:`, `area:` and
`blocked:maintainer` stay labels. The maintainer works in the web interface: the Project's views,
which the maintainer sets there and an agent reads with the query of
`.claude/reference/project.md`, "The Project workflows", the label `blocked:maintainer` first. It
supersedes decision `state-labels-until-the-project`.

## Options ruled out

- State labels kept as a copy of the Status: two truths for one fact, and the copy drifts the
  way the labels already did; a label search is no longer needed once the Project's views
  exist.
- The skills add the issue and set every Status, workflows off (the rule until #71): the same
  `gh project` calls in three skills, and an issue closed by a merged PR stayed In progress
  until `/finish after-merge` ran (#64, #125, #128, #22).
- Done only when closed by a PR ("Pull request merged"): an issue closed as not planned or as a
  duplicate would stay in its Status (In progress, Idea or Option).
