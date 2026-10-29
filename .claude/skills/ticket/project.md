# The Project and its Status

The one place `/ticket`, `/start` and `/finish` take the Project's names, ids and commands
from. The **Project** is the GitHub Project "feyn", number 4, owner `sebvey`; its **Status**
field says where an issue stands:

| Status | Means | Set by | Option id |
|---|---|---|---|
| Backlog | proposed, to triage | Project workflow "Item added to project" | `c1d0b0c3` |
| Ready | decided, free to take | `/ticket` when the maintainer decided, or the maintainer | `be2d48d7` |
| In progress | a branch exists | `/start` (no Project workflow fires on a branch); `/orchestrate` step 4 when a correction is asked on a delivered PR | `be703c13` |
| Needs Decision | present in the Project, unused by the skills for now: the label `blocked:maintainer` carries a decision awaited | nobody | `33e9b212` |
| Ready for review | the work claims done, the maintainer reviews and concludes: a slice whose PR is open after the fresh-agent review (the maintainer merges), an epic whose slices are all closed (the maintainer verifies its Done when and closes it) | `/finish`: "Deliver" step 7 for a slice (`/orchestrate` step 5 when it runs the cycle), "Clean up" step 7 for its epic | `deab4f08` |
| Done | closed (the close reason stays on GitHub) | Project workflow "Item closed"; `/finish after-merge` only when that Project workflow is off | `9e81e5a6` |

Project id `PVT_kwHOADOnU84Bo8V6`, Status field id `PVTSSF_lAHOADOnU84Bo8V6zhnaHqI`.

## The Project workflows

The Project workflows (GitHub's built-in automations of the Project) carry the moves no
skill needs to make (decision `project-status-not-state-labels`):
- "Auto-add to project" adds the open issues of `sebvey/feyn` created or updated while it is
  on (filter `is:issue is:open`), never a pull request;
- "Item added to project" sets Backlog;
- "Item closed" sets Done, on issues only.

Each acts within two seconds: #142 was added and set Backlog by `github-project-automation`
one to two seconds after its creation, and #129, #123 and #99 showed Done one second after
their PR closed them (GitHub, observed 2026-10-28, #71).

"Pull request merged", "Pull request linked to issue" and "Auto-close issue" stay off. Read
which are on:
`mise exec -- gh api graphql -f query='query{user(login:"sebvey"){projectV2(number:4){workflows(first:20){nodes{name enabled}}}}}'`.
It shows only the names and on or off; the filter and the Status each sets are read in the web
interface (Project feyn, menu ⋯, Workflows) (GitHub, observed 2026-10-28, #71).

## Commands

- **Read** an issue's Status: `mise exec -- gh issue view <n> --json projectItems` (the item
  titled `feyn`, its `status.name`; no item means the issue is not in the Project yet). Every
  issue with its Status:
  `mise exec -- gh project item-list 4 --owner sebvey --limit 200 --format json -q '.items[] | [.content.number, .status] | @tsv'`.
- **Add** an issue the Project workflow missed (`projectItems` empty):
  `mise exec -- gh project item-add 4 --owner sebvey --url <issue url> --format json -q .id`.
  An issue already in the Project is not added twice: the command returns its existing item id.
- **Set** the Status, by name:
  `mise exec -- gh project item-edit 4 --owner sebvey --url <issue url> --field Status --value "<Status>"`.
  The same by ids, for a script:
  `mise exec -- gh project item-edit --project-id PVT_kwHOADOnU84Bo8V6 --id <item id> --field-id PVTSSF_lAHOADOnU84Bo8V6zhnaHqI --single-select-option-id <option id>`.
- **Set a Status on a new item** (`/ticket` Ready, `/start` In progress on an issue just
  added): wait for Backlog first, since "Item added to project" would overwrite a Status set
  earlier (GitHub, inferred 2026-10-28, #71). Read the Status up to 3 times, a few seconds
  apart (no item yet: add it, once). Backlog: set the Status. Still not Backlog: read the
  Project workflows ([above](#the-project-workflows)); "Item added to project" off, set the
  Status; on, or the query fails, tell the maintainer and stop.

## Epics

Work is organised by epics, split into slices one at a time
([contributing](../../../docs/contributing.md), "How the work is organised"; decision
`themes-and-release-milestones`). An **epic** is an issue with the label `epic`, titled
"Epic: …", in the five sections of [epic-body.md](epic-body.md), parent of its **slices**
(sub-issues). An **observation** is an issue with no parent, in the Backlog until triaged.

- **Read** a slice's epic: `mise exec -- gh api repos/sebvey/feyn/issues/<n>/parent --jq .number`
  (HTTP 404 « No parent issue found » when it has none); an epic's slices and their count:
  `mise exec -- gh api repos/sebvey/feyn/issues/<epic>/sub_issues --jq '.[] | [.number, .state, .title] | @tsv'`
  and `mise exec -- gh api repos/sebvey/feyn/issues/<epic> --jq .sub_issues_summary`.
  The epics: `mise exec -- gh issue list --label epic --json number,title --jq '.[] | [.number, .title] | @tsv'`.
- **Attach** a slice to its epic (the link takes the slice's database id, not its number):
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
and nothing blocks it (no open blocked-by link, "Dependencies"). The maintainer sets it Ready
at triage. An epic has no To do and no slice posed in advance.

**Take an epic**, among the Ready ones: read its Material, pose one or two slices with
`/ticket`, each attached to the epic and Ready, and write the epic's plan comment (the slices
envisaged, in order, in five lines; what is unknown; what was dropped). The epic goes In
progress when its first slice starts: `/start` sets it ("Commands"). After each slice, `/finish`
adds two lines to the plan comment (the slice closed, the next to pose). When its last slice
closes (`sub_issues_summary.completed == total`), `/finish` sets the epic Ready for review: the
maintainer verifies its Done when and closes it. A statement that does not hold adds a slice
(`/ticket`), and the epic goes back to In progress when that slice starts (`/start`).

**The views**, set by the maintainer in the web interface (Project feyn, a view's menu:
filter, Layout, Group by, Fields):

| View | Layout | Filter | Grouped by | Columns |
|---|---|---|---|---|
| Epics | table | `label:epic` | | Status, Sub-issues progress, Milestone |
| Ready | table | `status:Ready -label:epic` | Parent issue | |
| WIP | board | `-status:Backlog,Ready,Done has:status -label:epic` (In progress and Ready for review) | Parent issue | Linked pull requests |
| Backlog | table | `status:Backlog -label:epic` | Parent issue | |

The Backlog's "No Parent Issue" group is the triage inbox: the observations.

The epics of 2026-10-29: #220 the `linear-course` spec v1; #221 `parcours-po` conformity;
#222 the teacher; #223 the site; #224 `parcours-po`, first quality campaign; #228 the work
organisation.

## Milestones

A milestone is a release target, named after the tag that closes it (`linear-course/v1.0.0`,
`parcours-po/v0.2.0`); it holds the slices that must close before the tag, and the epic that
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
