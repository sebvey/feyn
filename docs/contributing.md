# Contributing to feyn

How a change happens here, from the first idea to `main`, for a reader who has never opened
this repository. The work is organised by a named frame, Kanban, with ADR for the decisions and
GitHub flow for the branches: what the frame is lives in [`kanban.md`](kanban.md), and this file
says how feyn applies it, in the frame's vocabulary ("How the work is organised"). Every section
ends with the decision it rests on, in [`docs/decisions/`](decisions/) or, for the agentic layer,
in [`.claude/decisions/`](../.claude/decisions/); the reserved words are in
[`glossary.md`](glossary.md).

## Where things are

`course-specs/` holds the contracts a course is written against, `courses/` the courses, `teacher/`
the teacher template, the teacher skills and
the classroom build script that turns a course into a classroom, `site/` the engine that
builds it, `.claude/` the agentic layer, `docs/` what belongs to no single area.
`construction/`, the design, plan and session notes of the construction, was removed on
2026-10-31: its files are read at `2c16adf3e66a` (`git show 2c16adf3e66a:construction/<path>`).
`.claude/` has five folders: `skills/` the HOW (one folder per skill, its `SKILL.md`
and its briefs), `agents/` the project subagents (an agent whose brief is reused from run to
run, spawned by name, its tools limited by its file), `workflows/` the agent workflows, `reference/` the WHAT (what a thing is or looks
like: the body templates, the Project reference, the rules of an agent in a worktree),
`decisions/` the decisions that bind the agentic layer. Why: decisions `monorepo-feyn`,
`claude-folder-layout`, `construction-in-history`.

## An idea, a story or an epic becomes an issue

GitHub Issues is the only place work is tracked; nothing is tracked in a local file. An issue is
only the GitHub object: it carries an idea, a story or an epic ("How the work is organised"),
each in the body template of its form, and only its own, in `.claude/reference/`:
- an **idea**, [`idea-body.md`](../.claude/reference/idea-body.md): Where (the area), Why (what
  the finding breaks or costs), Observation (the fact first, with its place), and nothing else:
  no solution, no Done when, no To do;
- a **story**, [`story-body.md`](../.claude/reference/story-body.md): a head of three lines,
  read to choose among the Ready stories (Where: the area; What it delivers; Why now), then
  Done when (statements a reviewer can verify by reading a file or running a command), Context
  (what the work needs to know, ending with the line naming its origin), To do, Reads;
- an **epic**, [`epic-body.md`](../.claude/reference/epic-body.md): Objective, Why now,
  Material, Done when, Out of scope.

`/feyn-issue <kind> [#<epic>] [direct] <what>` writes one, of the kind it is given (`idea`,
`story` with its epic or none, `epic`; no kind, it asks which and creates nothing; `direct`
names a story for a direct delivery; the rules on which kind, and on `direct`, are under "How
the work is organised"), with its labels and its blocked-by links; the Project workflows add it
to the Project in Idea, and `/feyn-issue` sets a work item Option, or Ready when it is committed
(the stages, under "How the work is organised"); `/feyn-issue <n>` summarises one, its links
included. In the web interface, the one issue form,
[`idea.yml`](../.github/ISSUE_TEMPLATE/idea.yml), follows `idea-body.md`, and blank issues are
disabled: what the maintainer creates by hand is a finding seen in passing, the work items are
created by the skills. Why: decisions `issue-carries-a-work-item-or-an-idea`,
`issue-defines-pr-verifies`, `blocked-by-links-for-dependencies`.

## An issue becomes a branch

`/feyn-issue-branch <n>` takes a Ready story: it refuses one that carries `blocked:maintainer` or
has an open blocker (decision `blocked-by-links-for-dependencies`), creates `<type>/<n>-<slug>`
from an up-to-date `main`, sets its Status to In progress, and restates the Done when as the
contract the work is held to. It creates the branch with git, not linked to the issue: the PR's
`Closes #n` links them. One branch per issue; commits on it are free-form, only the PR title
survives the squash. A story of an epic starts from the epic's integration branch instead of
`main` ("How the work is organised"). Why: decisions `three-channels`, `no-branch-link`,
`epic-on-integration-branch`.

## A branch becomes a pull request

`/feyn-pull-request` rereads the Done when, runs the checks that exist for what the branch touches,
pushes, and opens the PR with the title `<type>(<area>): <summary>`, which becomes the squash commit
on `main`. The body starts with `Closes #n` (or `Refs #n` when the PR is one step of the issue),
then, under `##` headings, Context, Issues, Changes, Checks and Review first, within the limits of
`/feyn-pull-request` step 5, so that the maintainer gets back into the subject from the PR alone.
The detail the body leaves out (choices and their options ruled out, findings left, the detail of
the checks) goes in one PR comment, "Delivery notes", out of the squash commit.
Checks counts the Done when verdicts (`met`, `not met`, `deviation`) without restating the
statements, and says why for each `not met` or `deviation`; on every PR, unless the maintainer
asked for one without a review or named its story a direct delivery, the fresh-agent reviewer of
`/feyn-pr-review` reruns every statement. The PR never redefines the Done when; the issue wins,
and the PR says why it deviates.
A statement the PR makes false anywhere in the repository, a live decision included, is corrected
in that PR, never left nor sent to a separate issue, and the review blocks on one left
(decision `pr-corrects-what-it-makes-false`).
Once the PR is open, `/feyn-pull-request` checks that the issue lists it (a `Refs` PR: it lists
nothing). A branch that leaves a decision to the maintainer opens as a draft PR, with
`blocked:maintainer` on its issue only, and an "Awaiting the maintainer" section above
`Closes #n`. The maintainer answers with a comment and removes the label from the issue; only
then does the agent apply the answer, remove the section and mark the PR ready (under
`/feyn-deliver`, the orchestrator marks it ready at the hand-over, not the agent). Nothing lands on
`main` without a PR, the author never merges their own, and `main` is never force-pushed. After
the merge, `/feyn-merge-cleanup` confirms the change landed, checks the issue's Status is Done
(the Project workflow "Item closed" sets it; `/feyn-merge-cleanup` sets it only when that Project
workflow is off; a `Refs` issue stays open and In progress), deletes the local branch, and names
the issues the closed one blocked that are now free. `/feyn-deliver <n>` runs this whole cycle
for a story without an epic from one work session, through the agent workflow
`deliver-story.js` of `.claude/workflows/`: a contributor agent in its own worktree, a review by
a fresh agent before the PR reaches the maintainer, the PR a draft until that review and its
corrections are done, the clean-up of the run's worktrees, the hand-over, then the clean-up
after the merge. On the direct path, without `/feyn-deliver`, `/feyn-pull-request` runs that
review (`/feyn-pr-review`) before it sets Ready for review, except on a direct delivery ("How the
work is organised", moment 2). This is the path of a story without an epic. A story of an epic
takes another: its PR targets the epic's integration branch, is reviewed by a fresh agent and
merged by the orchestrator, and what reaches the maintainer is the epic PR;
`/feyn-deliver-epic <epic>` runs it ("How the work is organised", moment 2). Why: decisions
`issue-defines-pr-verifies`, `fresh-agent-review-before-maintainer`,
`epic-on-integration-branch`, `pr-corrects-what-it-makes-false`.

## How the work is organised

The frame is Kanban, with ADR for the decisions and GitHub flow for the branches, plus an
integration branch per epic; [`kanban.md`](kanban.md) says what the frame is (its principles,
the upstream, ADR, GitHub flow, its sources), and this section how feyn applies it. The words are
the frame's wherever the frame has one; feyn's own mechanisms, which the frame does not name,
keep their names (epic PR, integration branch, plan comment, open question, direct delivery,
work session). Why: decision `kanban-frame-of-the-work`.

**The work items and the idea.** An issue carries a work item, of one of two kinds, epic or
story, or an idea, which has no kind. A work item carries exactly one kind label, `epic` or
`story`, set by `/feyn-issue` at its creation; an idea carries none.
- An **epic** is an objective that closes: the label `epic`, the title "Epic: …", five
  sections in order (Objective, Why now, Material, Done when, Out of scope), the parent of its
  stories. Its Material is what is read when splitting it and what was settled, with its why
  and the alternative rejected. **No Done when, no epic**: what cannot get a Done when is an
  idea to triage, or a label. An epic has no To do and no story posed in advance; it is
  committed (Ready) when its five sections are written and nothing blocks it (no open
  blocked-by link). An epic is delivered on its **integration branch**, a branch cut from
  `main` when the epic is taken and named like an issue branch after the epic
  (`<type>/<epic>-<slug>`), into which its stories are merged; its **epic PR**, from that branch
  to `main` with `Closes #<epic>`, is how the maintainer validates the whole. An **open
  question** is a choice of a story of an epic that departs from the epic's Done when or adds
  structure (a new file, a category, a marker, an exception to a principle), put to the
  maintainer at once: a line in the plan comment and a comment on the epic.
- A **story** is a unit of work delivered in one PR, with a verifiable Done when: the label
  `story`, with or without a parent epic. Under an epic, it is a sub-issue posed only when it is
  the next one, and its PR targets the epic's integration branch; with no epic, its PR targets
  `main` and the maintainer merges it. Its Context restates what the work needs to know and
  ends with its origin: "From idea #<n>.", "Story of epic #<n>.", "From a brainstorm with the
  maintainer, <date>.", or "Asked by the maintainer, <date>." for a story the maintainer asks
  for directly, with no epic and no idea.
- An **idea** is a finding seen in passing, to triage: no solution, no kind label, no `type:`
  label (the triage sets the type on the work items it creates), only its `area:` label. It is
  never converted: the triage creates from it the work items it calls for, each citing it, then
  closes it.

A **milestone** is not a work item: it is a release target, named after the tag that closes it
(`linear-course/v1.0.0`); it holds the stories that must close before the tag, and the epic
that targets it carries it too; it is created only when a release is in sight. Tooling has
none.

**The flow.** An issue moves through six Statuses, in this order and nothing else: Idea,
Option, Ready, In progress, Ready for review, Done. Idea and Option are the upstream, the two
stages before commitment:
- **Idea** is the inbox: the ideas, to triage.
- **Option** is a work item, epic or story, defined and not committed: it has the body of its
  kind, Done when included, and waits for the maintainer to commit it (set Ready) or close it;
  until then its kind and body may change (a story rewritten as an epic, or the reverse, its
  kind label with it), since refining an option is what the upstream is for.
- **Ready** is the **commitment point**: from it the work item's form freezes and its Done when
  becomes the contract the PR is held to.

Creating and committing are two acts. A work item a triage creates from an idea is born Option,
or Ready when the maintainer says at its creation that it is committed (the triage asks, Option
by default); a work item a brainstorm creates is always born Option, its commitment decided at a
triage; a work item the maintainer asks for directly in a work session, a story or an epic
(`/feyn-issue story …`, `/feyn-issue epic …`), is born Option, or Ready on the maintainer's
word; a story posed by the orchestrator of a taken
epic is born Ready. A decision of the maintainer awaited is the label `blocked:maintainer`, on
any Status, never a Status. Why: decisions `issue-carries-a-work-item-or-an-idea`,
`story-with-or-without-an-epic`, `kind-label-per-work-item`, `idea-is-never-converted`,
`idea-and-option-before-ready`, `issue-defines-pr-verifies`, `themes-and-release-milestones`.

Four moments:
1. **Take an epic**, among the Ready ones: read its Material, pose one or two stories with
   `/feyn-issue story #<epic>`, each attached to the epic and Ready, and write the epic's
   **plan comment** (the stories envisaged, in order, in five lines; what is unknown; what was
   dropped). Whoever takes the epic writes the plan comment, in the work session that takes it,
   with the command of [`.claude/reference/project.md`](../.claude/reference/project.md),
   "Epics", "The plan comment" ("Add one"). Whoever takes the epic is its orchestrator: they
   cut its integration branch from `main` and push it, and deliver every story on it (moment
   2); `/feyn-deliver-epic <epic>` runs this moment and the next. The epic goes In progress when
   its first story starts. A story of an epic is created only when it is the next one the plan
   comment names, or one of the first one or two of an epic with no plan comment yet; otherwise
   the plan comment is rewritten first. This holds as well for the next story after a delivery
   and for a story added when the maintainer's check of the epic's Done when fails.
2. **Deliver a story under an epic**, on the epic's integration branch (decision
   `epic-on-integration-branch`): a contributor agent opens a PR to that branch, a fresh agent
   reviews it, and the orchestrator merges it (squash), closes the story (`Closes` does not close
   an issue on a branch other than `main`) and sets it Done; a story of an epic never goes Ready
   for review, its PR never awaits the maintainer. `main` is merged into the integration branch
   when it moves, never rebased. A choice of a story that departs from the epic's Done when or
   adds structure becomes an open question at once, and the work goes on; the maintainer answers
   on the epic, and the orchestrator adds the answer under its line in the plan comment and
   applies it, by a story when it needs work. `/feyn-deliver-epic <epic>` runs this delivery,
   each story through the agent workflow `deliver-story.js` of `.claude/workflows/`. After each
   merge, two lines go on the plan comment (the story closed, the next to pose; if the next is
   not obvious, back to moment 1), and a progress report of four lines goes to the maintainer
   (stories planned, done, in progress, remaining; open questions). When the last story is
   merged, a fresh agent reviews the whole integration branch against the epic's Done when, a
   story fixes what it finds, and the orchestrator hands over the epic PR once no open question
   remains: the epic goes Ready for review, the maintainer verifies its Done when and merges the
   epic PR, which closes the epic, or asks for a story and the epic goes back to In progress. All
   its sub-issues closed does not mean the epic closes: a story of an epic exists only if it is
   the next one (the policies, below), so every delivery leaves them all closed until the next is
   posed.
   **Deliver a story alone**, a story with no parent epic: one PR to `main`, merged by the
   maintainer, in one of two ways: `/feyn-deliver <n>`, or a direct delivery. `/feyn-deliver <n>`
   delivers every story without an epic (given a story of an epic, it refuses and names
   `/feyn-deliver-epic`), through `deliver-story.js` with no epic, except those the maintainer
   named `direct` at their creation. A **direct delivery** is a story, alone or under an epic, of
   one edit with no behaviour, named `direct` by the maintainer at its creation
   (`/feyn-issue story direct <what>`, or `/feyn-issue story #<epic> direct <what>` under an
   epic), its To do then opening with the line "Direct delivery": no skill, check, decision,
   agent workflow or course file touched, and no Done when statement that asks more than "this
   sentence says this" (a wording, a link, a typo, a mechanical rename in one file). The
   maintainer's work session makes its branch, its edit and its PR with the work-cycle tooling
   (`/feyn-issue-branch`, `/feyn-pull-request`): no contributor, no fresh-agent review, and the
   PR's Checks say `Fresh-agent review: none, direct delivery.`. A direct story of an epic is
   delivered so by its epic's orchestrator (`/feyn-deliver-epic` step 2): its
   branch is cut from the integration branch, its PR targets it
   (`--base <integration branch>`), the orchestrator merges it, and it skips
   `/feyn-pull-request` step 8, so the story never goes Ready for review. Which skill delivers
   what: `/feyn-deliver-epic` an epic, its stories included, direct ones too; `/feyn-deliver` a
   story without an epic; the work-cycle tooling the direct delivery of a story without an epic.
   A story without an epic is Ready for review while its PR awaits the merge.
3. **Brainstorm**: `/feyn-brainstorm` frames a work session with the maintainer on how feyn works
   (the maintainer decides, one point at a time, nothing written in the repository during the
   brainstorm) and ends it in options: it creates the work items it defined, in Status Option,
   an epic or a story by size, each with the body of its kind, what was settled point by point,
   with its why and the alternative rejected, going in the epic's Material or the story's
   Context. A brainstorm that settles nothing creates nothing; one that surfaces a finding
   without deciding its form may leave an idea; one that opens from an idea is that idea's
   triage, and closes it as completed when it creates its options, naming them. Why: decision
   `brainstorm-ends-in-options`.
4. **Triage**, run with `/feyn-triage` on the ideas and the options the maintainer names, one at
   a time: the work session reads each one against the repository and its neighbours (a twin, an
   epic or an option that covers or overlaps it, an open idea on the same files), the maintainer
   decides it, whatever it holds. Each idea is read for what it calls for: the triage creates
   the work items (stories, under an epic or alone, or an epic), each with the form of its kind
   and citing the idea, born Option, or Ready on the maintainer's word, then closes the idea as
   completed, its comment naming them; an idea that calls for nothing is closed as not planned,
   with the reason. The idea is never converted, its finding stays as written. An issue written
   before this frame whose body already defines a work (a Done when, a To do) is recreated as a
   story or an epic and closed, its blocked-by links set again on the new work item. Each option
   is committed (set Ready) or closed by the maintainer, or kept to refine. Why: decisions
   `idea-is-never-converted`, `idea-and-option-before-ready`.

**Policies.** The policies of the cycle, written down here as Kanban asks, and in the
decisions and the skills:
- The **WIP limit**: one epic In progress at a time per orchestrator (two at most, on disjoint
  files); within an epic, one story at a time; the stories without an epic, no limit beyond
  distinct files (several run in parallel only when their files are distinct).
- A story of an epic exists only if it is the next one; a story that reveals work of another
  epic opens an idea, not a story.
- An open question never stops the work, and the epic PR is handed over only when none remains.
- A story without an epic is never delivered on an integration branch.
- **A process change comes from an observed problem.** After epic #392, which lands this frame,
  a change to the process (a skill, a workflow, a policy, the glossary, this file) enters only by
  an idea that names the problem observed and where it was seen (a delivery, a debrief, a triage,
  a teaching session), triaged like any other idea; a brainstorm on the process opens from such
  an idea, never from a wish of design. The change is chosen by two criteria, in order: the
  smallest change that settles the observed problem, then the standard form when one exists
  (Kanban, ADR, GitHub flow). Why: decision `process-change-from-an-observed-problem`.

Two glossaries, each at home: the repository glossary applies in repository files, a course's
in that course's files, so the frame's vocabulary (epic, story) is available to the repository
even where a course teaches those words in its own sense ([`glossary.md`](glossary.md)).

The Project has one view per stage of the flow and one overview, all tables: Ideas (the triage
inbox), Options (what waits for the maintainer's commitment), Ready (the Ready stories, grouped
by epic), In progress (the stories In progress and Ready for review) and Overview (every open
work item with no parent, grouped by Status: the epics, whatever their Status, and the stories
without an epic). Their filters, groupings and fields are read with the query of
[`.claude/reference/project.md`](../.claude/reference/project.md), "The Project workflows", that
reads the views. Why: decisions `themes-and-release-milestones`, `epic-on-integration-branch`,
`kind-label-per-work-item`.

## Status and labels

- Every issue is an item of the Project (the GitHub Project "feyn", number 4), and its Status says
  where it stands: Idea (an idea, to triage), Option (a work item defined, not committed), Ready
  (committed, free to take: the commitment point), In progress (a branch exists), Ready for
  review (the work claims done, the maintainer reviews and concludes: a story without an epic
  whose PR is open after the fresh-agent review, or with the line `Fresh-agent review: none,
  direct delivery.`, the maintainer merges; an epic whose epic PR is handed over, the maintainer
  verifies its Done when and merges the epic PR; a story of an epic never has it), Done (closed;
  the close reason stays on GitHub). One at a time; no Status says a decision is awaited. The
  Project workflows add the open issues created or updated while they are on, and their
  sub-issues, set Idea when one is added and Done when it closes; the skills and the maintainer
  set the rest: `/feyn-issue` Option or Ready for a work item it creates ("How the work is
  organised", the flow), the maintainer Ready when committing an option, `/feyn-issue-branch` In
  progress, `/feyn-pull-request` Ready for review, or the orchestrator at the hand-over under
  `/feyn-deliver` (a correction asked on a delivered PR returns the story to In progress,
  `/feyn-deliver` step 4); the orchestrator of an epic sets a story Done when it merges it into
  the integration branch, and the epic Ready for review when it hands over the epic PR.
  There are no state labels. Why: decisions `project-status-not-state-labels`,
  `idea-and-option-before-ready`, `epic-on-integration-branch`.
- `epic`, `story`: the kind labels, exactly one on a work item, set by `/feyn-issue` at its
  creation and changed with the kind while the work item is an option; none on an idea, whose
  Status says what it is. The views filter on them. Why: decision `kind-label-per-work-item`.
- `blocked:maintainer`: a decision of the maintainer is awaited; on the issue only (its PR is
  a draft, which keeps it from being merged); on top of the Status, never instead of it; only
  the maintainer removes it. Why: decision `blocked-is-a-label-not-a-state`.
- `type:bug`, `type:course`, `type:improvement`, `type:decision`, on a work item only;
  `area:*` derived from the tree (`spec:<name>`, `course:<id>`, `teacher`, `site`, `agentic`,
  `repo`), on every issue.

## The maintainer's morning

In the web interface, the Project's views. First what waits for the maintainer: the search
`label:blocked:maintainer` in the issue list; the PR list shows the draft PRs (a PR under
`/feyn-deliver` is also a draft until its review is done: not one to answer); the Ready for
review items, a story's PR in the In progress view or an epic's epic PR in Overview, waiting for
the merge; the open questions of the epics In progress, in their plan comments. Then the In
progress view (what moves on its own), then Ready (what can be taken), then Options (what to
commit or close), then Ideas (what to triage). An unblock is a comment on the issue that says
what was validated, then the label removed: the comment is the trace a fresh agent reads; an
open question is answered by a comment on the epic. Why: decisions
`blocked-is-a-label-not-a-state`, `project-status-not-state-labels`,
`idea-and-option-before-ready`, `epic-on-integration-branch`.

## Tool behaviours

The flow relies on how GitHub and Claude Code behave, and these are found in work sessions, then
lost. A behaviour the flow relies on is written at its point of use (the skill step or document that
depends on it), in one line ending with a mark `(<tool>, <status> <date>, #<n>)`: `<tool>` is
`GitHub` or `Claude Code`; `<status>` is `tested` (provoked on purpose), `observed` (seen happen),
`inferred` (deduced from other facts) or `documented` (stated by the tool's documentation); `<date>`
is `YYYY-MM-DD`; `#<n>` is the issue or PR that holds the proof: a PR holds it on the `Behaviours:`
line of its Checks, an issue in a comment (`/feyn-pull-request` step 5). The line goes with its
step. A line the tool disproves is corrected or removed.
`grep -rn '(GitHub,\|(Claude Code,' .claude docs` lists them all. There is no
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

A choice that spans several files or is costly to undo becomes a decision file, under the frame's ADR
([`kanban.md`](kanban.md), "ADR"), counterfactual first (`Without this, <who acts> would…`, an
agent being the common case, followed by a concrete wrong act), in the `decisions/` folder of
the area it binds:
the agentic layer's (`.claude/`, `.github/`) in `.claude/decisions/`, two areas or more and the
repository's in `docs/decisions/`; `/feyn-decision` writes it and refuses one without a
counterfactual. A live decision states what holds today: a mechanism that changes is corrected
in place in its body, a change of scope also gets an "Amended" line; one that no longer holds
is superseded. Issues, PRs and documents use the reserved words of the
glossary and avoid the words it lists as "not". Why: decisions `decision-format`,
`reserved-vocabulary`, `kanban-frame-of-the-work`.

## Language

English everywhere, except course material and quotes from it, which stay in French. Why:
decision `language-policy`.
