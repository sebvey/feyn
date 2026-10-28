# The Project and its Status

The one place `/ticket`, `/start` and `/finish` take the Project's names, ids and commands
from. The **Project** is the GitHub Project "feyn", number 4, owner `sebvey`; its **Status**
field says where an issue stands:

| Status | Means | Set by | Option id |
|---|---|---|---|
| Backlog | proposed, to triage | Project workflow "Item added to project" | `c1d0b0c3` |
| Ready | decided, free to take | `/ticket` when the maintainer decided, or the maintainer | `be2d48d7` |
| In progress | a branch exists | `/start` (no Project workflow fires on a branch) | `be703c13` |
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
