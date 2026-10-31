# Contributing to feyn

How a change happens here, from the first observation to `main`, for a reader who has never
opened this repository. Every section ends with the decision it rests on, in
[`docs/decisions/`](decisions/) or, for the agentic layer, in
[`.claude/decisions/`](../.claude/decisions/); the reserved words are in
[`glossary.md`](glossary.md).

## Where things are

`course-specs/` holds the contracts a course is written against, `courses/` the courses, `teacher/`
the teacher template, the teacher skills and
the classroom build script that turns a course into a classroom, `site/` the engine that
builds it, `.claude/` the agentic layer, `docs/` what belongs to no single area. During the
construction, `construction/` holds the design, the plan and the session notes; its fate is
issue #232. `.claude/` has four folders: `skills/` the HOW (one folder per skill, its `SKILL.md`
and its briefs), `workflows/` the agent workflows, `reference/` the WHAT (what a thing is or looks
like: the body templates, the Project reference, the rules of an agent in a worktree),
`decisions/` the decisions that bind the agentic layer. Why: decisions `monorepo-feyn`,
`claude-folder-layout`.

## An observation becomes an issue

GitHub Issues is the only backlog; nothing is tracked in a local file. An issue (a slice or an
observation; an epic and a proposal have their own sections) opens with a head of three lines,
read to choose among the Ready issues (Where: the area; What it delivers; Why now), then its
sections: Done when (statements a reviewer can verify by reading a file or running a command),
Observation (what was seen, where, the fact first), To do, Reads.
`/feyn-issue <kind> [#<epic>] [direct] <observation>` writes it, of the kind it is given
(`observation`, `slice` with its epic, `epic` or `proposal`; no kind, it asks which and creates
nothing; `direct` names a slice or an observation for a direct delivery; the rules on which kind,
and on `direct`, are under "How the work is organised"), with its labels and its blocked-by links;
the Project workflows add it to the Project in Backlog, and `/feyn-issue` sets it Ready when it
is a slice, or an observation whose work the maintainer decided; `/feyn-issue <n>` summarises
one, its links included. Why: decisions `issue-defines-pr-verifies`,
`blocked-by-links-for-dependencies`.

## An issue becomes a branch

`/feyn-issue-branch <n>` takes the issue: it refuses one that carries `blocked:maintainer` or has an
open blocker (decision `blocked-by-links-for-dependencies`), creates `<type>/<n>-<slug>` from an
up-to-date `main`, sets its Status to In progress, and restates the Done when as the contract the
work is held to. It creates the branch with git, not linked to the issue: the PR's `Closes #n` links
them. One branch per issue; commits on it are free-form, only the PR title survives the squash. A
slice of an epic starts from the epic's integration branch instead of `main` (from #342; "How the
work is organised"). Why: decisions `three-channels`, `no-branch-link`,
`epic-on-integration-branch`.

## A branch becomes a pull request

`/feyn-pull-request` rereads the Done when, runs the checks that exist for what the branch touches,
pushes, and opens the PR with the title `<type>(<area>): <summary>`, which becomes the squash commit
on `main`. The body starts with `Closes #n` (or `Refs #n` when the PR is one step of the issue),
then, under `##` headings, Context, Issues, Changes, Checks and Review first, within the limits of
`/feyn-pull-request` step 5, so that the maintainer gets back into the subject from the PR alone.
Checks counts the Done when verdicts (`met`, `not met`, `deviation`) without restating the
statements, and says why for each `not met` or `deviation`; on every PR, unless the maintainer
asked for one without a review or named its slice a direct delivery, the fresh-agent reviewer of
`/feyn-pr-review` reruns every statement. The PR never redefines the Done when; the issue wins,
and the PR says why it deviates.
Once the PR is open, `/feyn-pull-request` checks that the issue lists it (a `Refs` PR: it lists
nothing). A branch that leaves a decision to the maintainer opens as a draft PR, with
`blocked:maintainer` on its issue only, and an "Awaiting the maintainer" section above
`Closes #n`. The maintainer answers with a comment and removes the label from the issue; only
then does the agent apply the answer, remove the section and mark the PR ready (under
`/feyn-deliver`, the orchestrator marks it ready at the hand-over, not the agent). Nothing lands on
`main` without a PR, the author never merges their own, and `main` is never force-pushed. After
the merge, `/feyn-merge-cleanup` confirms the change landed, checks the issue's Status is Done
(the Project workflow "Item closed" sets it; `/feyn-merge-cleanup` sets it only when that Project
workflow is off; a `Refs` issue stays open and In progress), and deletes the local branch; it
then adds the slice closed and the next to pose to the epic's plan comment, sets Ready for review
the epic whose plan comment now says its last slice closed, for the maintainer to verify and
close, and names the issues the closed one blocked that are now free. `/feyn-deliver <n>` runs
this whole cycle from one work session: a contributor agent per issue in its own worktree, a
review by a fresh agent before the PR reaches the maintainer, the PR a draft until that review
and its corrections are done, then the clean-up of the worktree after the merge. On the direct
path, without `/feyn-deliver`, `/feyn-pull-request` runs that review (`/feyn-pr-review`) before
it sets Ready for review, except on a direct delivery ("How the work is organised", moment 2).
This is the path of an observation. A slice of an epic takes another: its PR targets the epic's
integration branch, is reviewed by a fresh agent and merged by the orchestrator, and what reaches
the maintainer is the epic PR ("How the work is organised", moment 2); the skills follow from
#342. Why: decisions `issue-defines-pr-verifies`, `fresh-agent-review-before-maintainer`,
`epic-on-integration-branch`.

## How the work is organised

Five work items, all GitHub issues:
- An **epic** is an objective that closes: the label `epic`, the title "Epic: …", five
  sections in order (Objective, Why now, Material, Done when, Out of scope), the parent of its
  slices. **No Done when, no epic**: what cannot get a Done when is an observation to triage,
  or a label. An epic has no To do and no sub-issue posed in advance. Its Status: Backlog
  (not ready), Ready (nothing blocks it, no open blocked-by link, and its five sections are
  written; the maintainer sets it at triage; taken or not), In progress (a slice is in
  progress), Ready for review (its epic PR is handed over: its last slice closed, its whole
  branch reviewed, no open question left; the maintainer verifies its Done when and merges the
  epic PR, which closes it, or asks for a slice and it goes back to In progress), Done
  (closed). An epic is delivered on its **integration branch**, a branch cut from `main` when
  the epic is taken and named like an issue branch after the epic (`<type>/<epic>-<slug>`),
  into which its slices are merged; its **epic PR**, from that branch to `main` with
  `Closes #<epic>`, is how the maintainer validates the whole. An **open question** is a choice
  of a slice that departs from the epic's Done when or adds structure (a new file, a category,
  a marker, an exception to a principle), put to the maintainer at once: a line in the plan
  comment and a comment on the epic.
- A **slice** is a unit of work: one PR, a verifiable Done when, a sub-issue of its epic. It is
  posed only when it is the next one. Its standard name is "story", adopted as its form when
  user stories are written.
- An **observation** is what is seen in passing: an issue without a parent, in the Backlog,
  carrying its `area:` label, until triaged; Ready from its creation when the maintainer
  decided its work.
- A **proposal** is the validated output of a brainstorm: the label `proposal`, the title
  "Proposal: …", six sections in order (Context, Question, What we settled, Open questions,
  Proposed next, Material read), no parent, no milestone, in the Backlog until triaged. It is
  never a PR by itself.
- A **milestone** is a release target, named after the tag that closes it
  (`linear-course/v1.0.0`); it holds the slices that must close before the tag, and the epic
  that targets it carries it too; it is created only when a release is in sight. Tooling has
  none.

Four moments:
1. **Take an epic**, among the Ready ones: read its Material, pose one or two slices with
   `/feyn-issue slice #<epic>`, each attached to the epic and Ready, and write the epic's
   **plan comment** (the slices envisaged, in order, in five lines; what is unknown; what was
   dropped). Whoever takes the epic writes the plan comment, in the work session that takes it,
   with the command of [`.claude/reference/project.md`](../.claude/reference/project.md),
   "Epics", "The plan comment" ("Add one"). Whoever takes the epic is its orchestrator: they
   cut its integration branch from `main` and push it, and deliver every slice on it (moment
   2). The epic goes In progress when its first slice starts. A slice is created only when it
   is the next one the plan comment names, or one of the first one or two of an epic with no
   plan comment yet; otherwise the plan comment is rewritten first. This holds as well for the
   next slice after a delivery and for a slice added when the maintainer's check of the epic's
   Done when fails.
2. **Deliver a slice**, on the epic's integration branch (decision `epic-on-integration-branch`): a
   contributor agent opens a PR to that branch, a fresh agent reviews it, and the orchestrator
   merges it (squash), closes the slice (`Closes` does not close an issue on a branch other than
   `main`) and sets it Done; a slice never goes Ready for review, its PR never awaits the
   maintainer. `main` is merged into the integration branch when it moves, never rebased. A choice
   of a slice that departs from the epic's Done when or adds structure becomes an open question at
   once, and the work goes on; the maintainer answers on the epic, and the orchestrator marks the
   line answered in the plan comment and applies the answer, by a slice when it needs work. The
   slice workflow and the skill that deliver an epic come from #342; until then the orchestrator
   runs this delivery with the work-cycle tooling (`/feyn-deliver`, `/feyn-pull-request`), base and
   merge adapted. After each merge, two lines go on the plan comment (the slice closed, the next to
   pose; if the next is not obvious, back to moment 1), as `/feyn-merge-cleanup` writes them. When
   the last slice is merged, a fresh agent reviews the whole integration branch against the epic's
   Done when, a slice fixes what it finds, and the orchestrator hands over the epic PR once no open
   question remains: the epic goes Ready for review, the maintainer verifies its Done when and
   merges the epic PR, which closes the epic (from #342; until then `/feyn-merge-cleanup` sets the
   epic Ready for review when the plan comment's last "Next slice to pose" line says "Next slice to
   pose: none, the epic closes"). All its sub-issues closed does not mean the epic closes: a slice
   exists only if it is the next one (rules of the cycle, below), so every delivery leaves them all
   closed until the next is posed.
   **Deliver an observation**: one PR to `main`, merged by the maintainer, in one of two ways:
   `/feyn-deliver <n>`, or a direct delivery. `/feyn-deliver <n>` delivers every observation
   except those the maintainer named `direct` at their creation
   (`/feyn-issue observation direct <observation>`, or `/feyn-issue slice #<epic> direct
   <observation>` for a slice), whose To do then opens with the line "Direct delivery". A
   **direct delivery** is a slice or a standalone observation of one edit with no behaviour: no
   skill, check, decision, agent workflow or course file touched, and no Done when statement
   that asks more than "this sentence says this" (a wording, a link, a typo, a mechanical rename
   in one file). The maintainer's work session makes its branch, its edit and its PR with the
   work-cycle tooling (`/feyn-issue-branch`, `/feyn-pull-request`): no contributor, no
   fresh-agent review, and the PR's Checks say `Fresh-agent review: none, direct delivery.`; a
   direct slice's PR targets the integration branch and the orchestrator merges it (until #342
   brings the tooling, it skips `/feyn-pull-request` step 8, so the slice never goes Ready for
   review). An observation is Ready for review while its PR awaits the merge.
3. **Brainstorm**: `/feyn-brainstorm` frames a work session with the maintainer on how feyn works
   (the maintainer decides, one point at a time, nothing written in the repository during the
   brainstorm) and ends it in a proposal, created with `/feyn-issue proposal`. A brainstorm that
   settles nothing leaves no issue.
4. **Triage the Backlog**: each observation is attached to an epic as a slice, set Ready if it
   stands alone in one PR, made an epic if it is an objective, or closed with the reason. A
   proposal is self-sufficient: the triage turns its Proposed next into what it says
   (`/feyn-decision` for a decision; `/feyn-issue epic`, `/feyn-issue slice #<epic>`, or
   `/feyn-issue observation` set Ready when it stands alone in one PR; each citing the
   proposal) without rereading what fed it, then closes it as completed with a comment naming
   what it produced. A proposal reworked by a new brainstorm is closed as completed with a
   comment naming the new proposal, never edited.

Rules of the cycle: one epic In progress at a time per orchestrator (two at most, on disjoint
files); a slice exists only if it is the next one; a slice that reveals work of another epic
opens an observation, not a slice; an open question never stops the work, and the epic PR is
handed over only when none remains; an observation is never delivered on an integration branch.

Two glossaries, each at home: the repository glossary applies in repository files, a course's
in that course's files, so Scrum vocabulary (epic, story) is available to the repository even
where a course teaches it ([`glossary.md`](glossary.md)).

The Project has four views: three show the slices by Status (Ready, WIP for In progress and
Ready for review, Backlog), the fourth lists the epics:

| View | Shows | Answers |
|---|---|---|
| Epics | `label:epic`; Status, Sub-issues progress, Milestone | where does each epic stand? |
| Ready | `status:Ready -label:epic`, grouped by Parent issue | what is ready to take? |
| WIP | board, `-status:Backlog,Ready,Done has:status -label:epic` (In progress and Ready for review), grouped by Parent issue, with Linked pull requests | what is in progress, what awaits the merge? |
| Backlog | `status:Backlog -label:epic`, grouped by Parent issue | what awaits triage? Its "No Parent Issue" group is the inbox |

Why: decisions `themes-and-release-milestones`, `epic-on-integration-branch`.

## Status and labels

- Every issue is an item of the Project (the GitHub Project "feyn", number 4), and its Status says
  where it stands: Backlog (proposed, to triage), Ready (decided, free to take), In progress (a
  branch exists), Ready for review (the work claims done, the maintainer reviews and concludes: an
  observation whose PR is open after the fresh-agent review, or with the line `Fresh-agent review:
  none, direct delivery.`, the maintainer merges; an epic whose epic PR is handed over, the
  maintainer verifies its Done when and merges the epic PR; a slice of an epic never has it), Done
  (closed; the close reason stays on GitHub). Needs Decision is in the Project but unused for now:
  the label `blocked:maintainer` carries a decision awaited. One at a time. The Project workflows
  add the open issues created or updated while they are on, set Backlog when one is added and Done
  when it closes; the skills set the rest: `/feyn-issue` Ready for a slice or a decided observation,
  `/feyn-issue-branch` In progress, `/feyn-pull-request` Ready for review, or the orchestrator at
  the hand-over under `/feyn-deliver` (a correction asked on a delivered PR returns the slice to In
  progress, `/feyn-deliver` step 4); the orchestrator of an epic sets a slice Done when it merges it
  into the integration branch, and the epic Ready for review when it hands over the epic PR
  (from #342). `.claude/reference/project.md` says who sets each Status. There are no state
  labels. Why: decisions `project-status-not-state-labels`, `epic-on-integration-branch`.
- `blocked:maintainer`: a decision of the maintainer is awaited; on the issue only (its PR is
  a draft, which keeps it from being merged); on top of the Status, never instead of it; only
  the maintainer removes it. Why: decision `blocked-is-a-label-not-a-state`.
- `type:bug`, `type:course`, `type:improvement`, `type:decision`; `area:*` derived from the
  tree (`spec:<name>`, `course:<id>`, `teacher`, `site`, `agentic`, `repo`).

## The maintainer's morning

In the web interface, the Project's views. First what waits for the maintainer: the search
`label:blocked:maintainer` in the issue list; the PR list shows the draft PRs (a PR under
`/feyn-deliver` is also a draft until its review is done: not one to answer); the Ready for
review column of the WIP view and the Ready for review epics (Epics view), whose epic PR waits
for the merge; the open questions of the epics In progress, in their plan comments. Then the WIP
view (what moves on its own), then Ready (what can be taken), then Backlog (what to triage).
An unblock is a comment on the issue that says what was validated, then the label removed: the
comment is the trace a fresh agent reads; an open question is answered by a comment on the epic.
Why: decisions `blocked-is-a-label-not-a-state`, `project-status-not-state-labels`,
`epic-on-integration-branch`.

## Tool behaviours

The flow relies on how GitHub and Claude Code behave, and these are found in work sessions, then
lost. A behaviour the flow relies on is written at its point of use (the skill step or document that
depends on it), in one line ending with a mark `(<tool>, <status> <date>, #<n>)`: `<tool>` is
`GitHub` or `Claude Code`; `<status>` is `tested` (provoked on purpose), `observed` (seen happen),
`inferred` (deduced from other facts) or `documented` (stated by the tool's documentation); `<date>`
is `YYYY-MM-DD`; `#<n>` is the issue or PR that holds the proof: a PR holds it on the `Behaviours:`
line of its Checks, an issue in a comment (`/feyn-pull-request` step 5). The line goes with its
step. A line the tool disproves is corrected or removed.
`grep -rn '(GitHub,\|(Claude Code,' .claude docs construction` lists them all. There is no
catalogue of behaviours: it would be read at the wrong moment. Two exceptions: the behaviours
every agent in a worktree meets are written once in
[`.claude/reference/worktree-agent.md`](../.claude/reference/worktree-agent.md), which the
briefs of those agents name as their first read; that file is their point of use. And a skill
may group its marks in a last section, `## Tool behaviours`, one line per mark naming its step:
the step states its rule, the section its proof (as `/feyn-deliver` does).
`.claude/settings.json` sets `"idleCompaction": false`: an idle compaction replaces a work
session's history by a summary and erases the material of its debrief, as the maintainer saw
on 2026-10-31 (Claude Code, observed 2026-10-31, #345).

## Decisions and vocabulary

A choice that spans several files or is costly to undo becomes a decision file, counterfactual
first ("Without this, an agent would…"), in the `decisions/` folder of the area it binds:
the agentic layer's (`.claude/`, `.github/`) in `.claude/decisions/`, two areas or more and the
repository's in `docs/decisions/`; `/feyn-decision` writes it and refuses one without a
counterfactual. A decision that still holds but whose mechanism changed gets an "Amended" line;
one that no longer holds is superseded. Issues, PRs and documents use the reserved words of the
glossary and avoid the words it lists as "not". Why: decisions `decision-format`,
`reserved-vocabulary`.

## Language

English everywhere, except course material and quotes from it, which stay in French. Why:
decision `language-policy`.
