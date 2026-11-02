# The Project and its Status

The one place `/feyn-issue`, `/feyn-issue-branch`, `/feyn-pull-request` and `/feyn-merge-cleanup`
take the Project's names, ids and commands from. The **Project** is the GitHub Project "feyn",
number 4, owner `sebvey`; its **Status** field says where an issue stands, in this order and
nothing else (decisions `idea-and-option-before-ready`, `project-status-not-state-labels`):

| Status | Means | Set by | Option id |
|---|---|---|---|
| Idea | an idea: an issue with no kind holding a finding, to triage; never converted, the triage creates from it the work items it calls for, then closes it | Project workflow "Item added to project", on every issue added | `c1d0b0c3` |
| Option | a work item, epic or story, defined and not committed: the body of its kind, Done when included; until Ready its kind and body may change | `/feyn-issue` on a work item it creates at a triage or asked directly by the maintainer, unless the maintainer says it is committed; always on one a brainstorm creates | `985f6b35` |
| Ready | committed, free to take: the **commitment point**, where the form freezes and the Done when becomes the contract (decision `issue-defines-pr-verifies`) | the maintainer, committing an option; `/feyn-issue` at creation, at a triage or asked directly, when the maintainer says the work item is committed, and on a story posed by the orchestrator of a taken epic | `be2d48d7` |
| In progress | a branch exists | `/feyn-issue-branch` (no Project workflow fires on a branch); `/feyn-deliver` step 4 when a correction is asked on a delivered PR | `be703c13` |
| Ready for review | the work claims done, the maintainer reviews and concludes: a story without an epic whose PR is open after the fresh-agent review, or with the line `Fresh-agent review: none, direct delivery.` (the maintainer merges), an epic whose epic PR is handed over (the maintainer verifies its Done when and merges the epic PR); a story of an epic never has it ("Epics", "Delivery on an integration branch") | `/feyn-pull-request` step 8 (`/feyn-deliver` step 5 when it runs the cycle); for an epic, its orchestrator at the hand-over of the epic PR (`/feyn-deliver-epic` step 5) | `deab4f08` |
| Done | closed (the close reason stays on GitHub) | Project workflow "Item closed"; `/feyn-merge-cleanup` only when that Project workflow is off; for a story of an epic, its orchestrator when it merges the story into the integration branch and closes it | `9e81e5a6` |

No Status says a decision is awaited: the label `blocked:maintainer` carries it, on any Status
(decision `blocked-is-a-label-not-a-state`). A story is a work item with or without a parent
epic (decision `story-with-or-without-an-epic`; "Epics").

Project id `PVT_kwHOADOnU84Bo8V6`, Status field id `PVTSSF_lAHOADOnU84Bo8V6zhnaHqI`.

## The Project workflows

The Project workflows (GitHub's built-in automations of the Project) carry the moves no
skill needs to make (decision `project-status-not-state-labels`). Four are on:
- "Auto-add to project" adds the open issues of `sebvey/feyn` created or updated while it is
  on (filter `is:issue is:open`), never a pull request;
- "Auto-add sub-issues to project" adds the sub-issues of an issue the Project holds, a story
  attached to its epic among them; it shows on, and what it adds is read from its name and its
  settings in the web interface (GitHub, observed 2026-11-02, #403);
- "Item added to project" sets Idea, whichever workflow or command added the item;
- "Item closed" sets Done, on issues only.

Each acts within two seconds: #142 was added and given its first Status by
`github-project-automation` one to two seconds after its creation, and #129, #123 and #99
showed Done one second after their PR closed them (GitHub, observed 2026-10-28, #71).

"Pull request merged", "Pull request linked to issue" and "Auto-close issue" stay off.
"Auto-archive items" stays off: on, it archived the closed sub-issues of epic #317, which left
the Project's views and `gh project item-list`; the maintainer turned it off on 2026-10-31
(#317). Read which are on:
`mise exec -- gh api graphql -f query='query{user(login:"sebvey"){projectV2(number:4){workflows(first:20){nodes{name enabled}}}}}'`.
It shows only the names and on or off; the filter and the Status each sets are read in the web
interface (Project feyn, menu ⋯, Workflows) (GitHub, observed 2026-10-28, #71). The views and
the Status field's options, with their ids, in one query:
`mise exec -- gh api graphql -f query='query{user(login:"sebvey"){projectV2(number:4){views(first:20){nodes{name number layout filter groupByFields(first:5){nodes{... on ProjectV2FieldCommon{name}}} fields(first:20){nodes{... on ProjectV2FieldCommon{name}}}}} field(name:"Status"){... on ProjectV2SingleSelectField{options{id name}}}}}}'`
(each view with its filter, its grouping and its fields).

## Commands

- **Read** an issue's Status: `mise exec -- gh issue view <n> --json projectItems` (the item
  titled `feyn`, its `status.name`; no item means the issue is not in the Project yet; an
  archived item shows too, nothing marking it archived). Every issue with its Status (archived items left out):
  `mise exec -- gh project item-list 4 --owner sebvey --limit 200 --format json -q '.items[] | [.content.number, .status] | @tsv'`.
- **Add** an issue the Project workflow missed (`projectItems` empty):
  `mise exec -- gh project item-add 4 --owner sebvey --url <issue url> --format json -q .id`.
  An issue already in the Project is not added twice: the command returns its existing item id.
- **Set** the Status, by name:
  `mise exec -- gh project item-edit 4 --owner sebvey --url <issue url> --field Status --value "<Status>"`.
  The same by ids, for a script:
  `mise exec -- gh project item-edit --project-id PVT_kwHOADOnU84Bo8V6 --id <item id> --field-id PVTSSF_lAHOADOnU84Bo8V6zhnaHqI --single-select-option-id <option id>`.
- **Set a Status on a new item** (`/feyn-issue` Option or Ready, `/feyn-issue-branch` In
  progress on an issue just added): wait for Idea first, since "Item added to project" would
  overwrite a Status set earlier (GitHub, inferred 2026-10-28, #71). Read the Status up to 3
  times, a few seconds apart (no item yet: add it, once). Idea: set the Status. Still not Idea:
  read the Project workflows ([above](#the-project-workflows)); "Item added to project" off,
  set the Status; on, or the query fails, tell the maintainer and stop.

## Epics

Work is organised in work items of two kinds, epics and stories
([contributing](../../docs/contributing.md), "How the work is organised"; decisions
`themes-and-release-milestones`, `story-with-or-without-an-epic`). An **epic** is an issue with
the label `epic`, titled "Epic: …", in the five sections of [epic-body.md](epic-body.md), parent
of its **stories** (sub-issues), split one story at a time when taken. A **story** is an issue
with the label `story`, in the sections of [story-body.md](story-body.md), delivered in one PR:
under an epic, a sub-issue whose PR targets the epic's integration branch; with no epic, its PR
targets `main`. An **idea** carries no kind label: its Status, Idea, says what it is
([idea-body.md](idea-body.md)).

**The kind labels** (decision `kind-label-per-work-item`): exactly one on a work item, set by
`/feyn-issue` at its creation and changed with the kind while the work item is an option; none
on an idea. The views filter on them.

| Label | Description |
|---|---|
| `epic` | An epic: an objective that closes, delivered in stories split one at a time |
| `story` | A story: a unit of work delivered in one PR, with or without an epic |

- **Read** a story's epic: `mise exec -- gh api repos/sebvey/feyn/issues/<n>/parent --jq .number`
  (HTTP 404 « No parent issue found » when it has none); an epic's stories and their count:
  `mise exec -- gh api repos/sebvey/feyn/issues/<epic>/sub_issues --jq '.[] | [.number, .state, .title] | @tsv'`
  and `mise exec -- gh api repos/sebvey/feyn/issues/<epic> --jq .sub_issues_summary`.
  The epics: `mise exec -- gh issue list --label epic --json number,title --jq '.[] | [.number, .title] | @tsv'`;
  the stories: the same with `--label story`.
- **Attach** a story to its epic (the link takes the story's database id, not its number):
  `mise exec -- gh api -X POST repos/sebvey/feyn/issues/<epic>/sub_issues -F sub_issue_id=$(mise exec -- gh api repos/sebvey/feyn/issues/<n> --jq .id)`.
- **Detach**: `mise exec -- gh api -X DELETE repos/sebvey/feyn/issues/<epic>/sub_issue -F sub_issue_id=<database id>`
  (singular `sub_issue`: the plural returns 404) (GitHub, observed 2026-10-29, #233).
- **The plan comment**: the last comment of the epic whose body starts with "**Plan comment**".
  Its database id:
  `mise exec -- gh api --paginate repos/sebvey/feyn/issues/<epic>/comments --jq '.[] | select(.body | startswith("**Plan comment**")) | .id' | tail -n 1`
  (nothing printed: the epic has none). Edit it: the PATCH replaces the whole body, so read it
  first, `mise exec -- gh api repos/sebvey/feyn/issues/comments/<id> --jq .body > <file>`,
  append to the file, then
  `mise exec -- gh api -X PATCH repos/sebvey/feyn/issues/comments/<id> -F body=@<file>`. Add
  one: `mise exec -- gh issue comment <epic> --body-file <file>`; its body begins with
  `**Plan comment**`, or the lookup never finds it.

**Definition of Ready** of an epic: its five sections are written, the Done when verifiable,
and nothing blocks it (no open blocked-by link, "Dependencies"). The maintainer commits it, from
Option to Ready, at a triage. An epic has no To do and no story posed in advance.

**Take an epic**: the procedure is in [contributing](../../docs/contributing.md), "How the work
is organised", moments 1 and 2, run by `/feyn-deliver-epic`; the commands it needs are above.
The epic goes Ready for review when its epic PR is handed over (below), however many of its
sub-issues are closed.

**Delivery on an integration branch** (decision `epic-on-integration-branch`):
- The **integration branch**: cut from `main` by the epic's orchestrator when the epic is
  taken, named like an issue branch after the epic (`<type>/<epic>-<slug>`), pushed to
  `origin`. Each story branch of the epic starts from it and each story PR targets it
  (`--base <integration branch>`). `main` is merged into it when it moves, never rebased.
- A story PR of the epic is reviewed by a fresh agent and merged (squash) by the orchestrator,
  who then closes the story, since `Closes #<n>` closes an issue only on a merge into `main`
  (`mise exec -- gh issue close <n> --reason completed --comment "Delivered by PR #<pr>, merged into the integration branch <branch> of epic #<epic>."`).
- The **epic PR**: from the integration branch to `main`, its body starting with
  `Closes #<epic>`, opened after a fresh agent reviewed the whole branch against the epic's Done
  when, handed over only when no open question remains. The maintainer merges it (squash),
  which closes the epic.
- An **open question**: a choice of a story of the epic that departs from the epic's Done when
  or adds structure (a new file, a category, a marker, an exception to a principle). The
  orchestrator writes it at once as a line of the plan comment (`Open question: <the choice>,
  <the options ruled out>, <the cost of going back> (#<story>)`), as a comment on the epic, and
  in the work session to the maintainer (the comment, posted from the maintainer's account,
  notifies nobody), and the work goes on. The maintainer answers on the epic; the orchestrator
  adds the line `Answered: <the answer> (<date>)` right under its `Open question:` line, which
  stays, and applies the answer, by a story when it needs work (`/feyn-deliver-epic` step 3).
- The Status: a story of the epic goes Ready, In progress, then Done at its merge into the
  integration branch, never Ready for review; the epic goes In progress with its first story,
  Ready for review at the hand-over of its epic PR, Done when that PR's merge closes it.
- `/feyn-deliver-epic` runs this, each story of the epic through the agent workflow
  `deliver-story.js` in epic mode; `/feyn-deliver` delivers a story without an epic through the
  same workflow, its PR to `main`.

**The views**, set by the maintainer in the web interface (Project feyn, a view's menu:
filter, Layout, Group by, Fields), one per stage of the flow and one overview, all tables, as
read from the Project on 2026-11-02 (the query of the views, "The Project workflows"):

| View | Filter | Grouped by | Fields beside Title |
|---|---|---|---|
| Ideas | `status:Idea` | | Labels, Updated |
| Options | `status:Option` | | Labels |
| Ready | `status:Ready label:story` | Parent issue | Assignees, Status, Linked pull requests, Sub-issues progress |
| In progress | `status:"In progress","Ready for review" label:story` | Status | Linked pull requests, Sub-issues progress |
| Overview | `label:epic,story no:parent-issue is:open` | Status | Labels, Milestone, Sub-issues progress |

Ideas is the triage inbox; Options is what waits for the maintainer's commitment; Ready groups
the stories by epic, those with none under "No Parent issue"; In progress groups its stories
by Status (In progress, the agents' work; Ready for review, what awaits the maintainer's merge);
Overview shows every open work item with no parent, the epics whatever their Status and the
stories without an epic, grouped by Status.

The epics of 2026-10-29: #220 the `linear-course` spec v1; #221 `parcours-po` conformity;
#222 the teacher; #223 the site; #224 `parcours-po`, first quality campaign; #228 the work
organisation.

## Milestones

A milestone is a release target, named after the tag that closes it (`linear-course/v1.0.0`,
`parcours-po/v0.2.0`); it holds the stories that must close before the tag, and the epic that
targets it carries it too; it closes when the tag exists. Tooling issues carry none. Read them:
`mise exec -- gh api repos/sebvey/feyn/milestones --jq '.[] | [.number, .title, .open_issues] | @tsv'`.

## Dependencies

A dependency between issues is a blocked-by link, nothing else (decision
`blocked-by-links-for-dependencies`): issue n is blocked by issue b when n cannot start before b
is closed. Two issues that only edit the same file are not linked.

- **Read** what blocks n, and what n blocks:
  `mise exec -- gh api repos/sebvey/feyn/issues/<n>/dependencies/blocked_by --jq '.[] | [.number, .state, .title] | @tsv'`
  and the same with `blocking`.
- **Set** "n is blocked by b": the link takes b's database id, not its number:
  `mise exec -- gh api -X POST repos/sebvey/feyn/issues/<n>/dependencies/blocked_by -F issue_id=$(mise exec -- gh api repos/sebvey/feyn/issues/<b> --jq .id)`.
- **Remove** it: `mise exec -- gh api -X DELETE repos/sebvey/feyn/issues/<n>/dependencies/blocked_by/<database id of b>`.
