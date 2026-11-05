# The Project and its Status

The one place `/feyn-issue`, `/feyn-issue-branch`, `/feyn-pull-request`, `/feyn-merge-cleanup`,
`/feyn-deliver-story-alone`, `/feyn-deliver-epic`, `/feyn-triage`, `/feyn-refine-option`, the
procedures of `reference/` and the agent workflow `deliver-story.js` take the Project's names, ids
and commands from, and the commands on issues ("Issues"). The **Project** is the GitHub Project
"feyn", number 4, owner `sebvey`, id `PVT_kwHOADOnU84Bo8V6`; its **Status** field, id
`PVTSSF_lAHOADOnU84Bo8V6zhnaHqI`, says where an issue stands, in this order and nothing else
(decisions `idea-and-option-before-ready`, `project-status-not-state-labels`); what each Status
means: [glossary](../../docs/glossary.md), row Status.

| Status | Option id |
|---|---|
| Idea | `c1d0b0c3` |
| Option | `985f6b35` |
| Ready | `be2d48d7` |
| In progress | `be703c13` |
| Ready for review | `deab4f08` |
| Done | `9e81e5a6` |

No Status says a decision is awaited: the label `blocked:maintainer` carries it, on any Status
(decision `blocked-is-a-label-not-a-state`). No Status says an item was posed before the frame
of 2026-11-03 (`docs/vision.md`): the label `stale` carries it, on an issue in Idea or Option, removed
by `/feyn-triage` or `/feyn-refine-option` when they re-read the item (decision
`project-status-not-state-labels`).

## GitHub writes

The output of every GitHub write (`gh issue comment`, `gh issue create`, `gh pr create`,
`gh pr edit`, `gh api -X …`, `gh project item-edit`) is read: a URL or an id printed, or, for a
command that prints nothing on success, the value read back (`gh issue view`, `gh pr view`,
`gh api` without `-X`). Nothing printed and nothing read back, or an error, is a failed write:
reported, never assumed done. A `gh issue comment` failed silently on an epic's issue (GitHub,
observed 2026-11-05, #570).

## The Project workflows

On: "Auto-add to project" (filter `is:issue is:open`, never a pull request), "Auto-add
sub-issues to project", "Item added to project" (sets Idea), "Item closed" (sets Done, on issues
only). Off: "Pull request merged", "Pull request linked to issue", "Auto-close issue",
"Auto-archive items". Read which are on (names and on or off only; the filter and the Status
each sets are read in the web interface, Project feyn, menu ⋯, Workflows):
`mise exec -- gh api graphql -f query='query{user(login:"sebvey"){projectV2(number:4){workflows(first:20){nodes{name enabled}}}}}'`.
Read the views (each with its filter, its grouping and its fields) and the Status field's
options, with their ids:
`mise exec -- gh api graphql -f query='query{user(login:"sebvey"){projectV2(number:4){views(first:20){nodes{name number layout filter groupByFields(first:5){nodes{... on ProjectV2FieldCommon{name}}} fields(first:20){nodes{... on ProjectV2FieldCommon{name}}}}} field(name:"Status"){... on ProjectV2SingleSelectField{options{id name}}}}}}'`.

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

## Issues

- **Read** an issue, all of it:
  `mise exec -- gh issue view <n> --json number,title,state,labels,milestone,body,comments,closedByPullRequestsReferences,projectItems`.
- **Search** the open issues by key words (the twin of a new one):
  `mise exec -- gh issue list --state open --search "<two or three key words>"`.
- **Comment** on an issue: `mise exec -- gh issue comment <n> --body-file <file>`.
- **Hide a duplicate** comment (posted twice by mistake), never deleted: on its page, the
  comment's menu ⋯, "Hide", reason "Duplicate"; or `mise exec -- gh api graphql -f
  query='mutation { minimizeComment(input: {subjectId: "<comment node id>", classifier:
  DUPLICATE}) { clientMutationId } }'`, the node id read with `mise exec -- gh api
  repos/sebvey/feyn/issues/<n>/comments --jq '.[] | [.node_id, .body[:60]] | @tsv'`.
- **Create** an issue, one form per command; it prints the issue URL:
  - an idea: `mise exec -- gh issue create --title "<title>" --body-file <file> --label area:<area>`;
  - a story: `mise exec -- gh issue create --title "<title>" --body-file <file> --label kind:story --label type:<type> --label area:<area>`;
  - an epic: the same with `--label kind:epic` in place of `--label kind:story`;
  - with a milestone: `--milestone <name>` added.

  One issue per command, never from a shell function: a `gh issue create` inside a function
  with `${5:+--milestone "$5"}` failed silently (Claude Code, observed 2026-10-29, #269).
- **Create a label** missing on GitHub, an area the tree has:
  `mise exec -- gh label create area:<area> --color 0075ca --description "Area: <area>"`.

## Epics

- **Read** a story's epic: `mise exec -- gh api repos/sebvey/feyn/issues/<n>/parent --jq .number`
  (HTTP 404 « No parent issue found » when it has none); an epic's stories and their count:
  `mise exec -- gh api repos/sebvey/feyn/issues/<epic>/sub_issues --jq '.[] | [.number, .state, .title] | @tsv'`
  and `mise exec -- gh api repos/sebvey/feyn/issues/<epic> --jq .sub_issues_summary`.
  The epics: `mise exec -- gh issue list --label kind:epic --json number,title --jq '.[] | [.number, .title] | @tsv'`;
  the stories: the same with `--label kind:story`.
- **Attach** a story to its epic (the link takes the story's database id, not its number):
  `mise exec -- gh api -X POST repos/sebvey/feyn/issues/<epic>/sub_issues -F sub_issue_id=$(mise exec -- gh api repos/sebvey/feyn/issues/<n> --jq .id)`.
- **Detach**: `mise exec -- gh api -X DELETE repos/sebvey/feyn/issues/<epic>/sub_issue -F sub_issue_id=<database id>`
  (singular `sub_issue`: the plural returns 404) (GitHub, observed 2026-10-29, #233).
- **The plan comment**: the last comment of the epic whose body starts with "**Plan comment**";
  its database id (nothing printed: the epic has none):
  `mise exec -- gh api --paginate repos/sebvey/feyn/issues/<epic>/comments --jq '.[] | select(.body | startswith("**Plan comment**")) | .id' | tail -n 1`.
  Its three parts, in this order:
  - the plan comment head, under the line `**Plan comment**`: at most ten lines, which say where
    the epic stands, what runs, what awaits the maintainer and what comes next; rewritten whole
    at each step that rewrites the plan or adds to the log, so that it is read at a glance and
    holds nothing the plan or the log does not;
  - the plan, from its line `Delivery: <integration branch>`, rewritten in place at each change
    (that line; `Stories (an estimate):`, the stories in their current order, one per line, each
    delivered one `- [x] #<n> <title> (PR #<pr>)`, the others `- [ ] <story>`, the next one
    ending `(next)`; `Unknown:`; `Dropped:`);
  - the log, from the line `**Log**`, only added to (a line per delivery,
    `<date> #<n> (PR #<pr>): <what it delivered>`; per open question, `Open question: …`; per
    answer, `Answered: …`, right under its question, as [sort.md](sort.md), "An open question",
    says).

  A plan comment in an older form (no head, or no `**Log**` line) is rewritten in three parts at
  the next step of its epic.
  Edit it: the PATCH replaces the whole body, so read it first,
  `mise exec -- gh api repos/sebvey/feyn/issues/comments/<id> --jq .body > <file>`, edit the
  file, then `mise exec -- gh api -X PATCH repos/sebvey/feyn/issues/comments/<id> -F body=@<file>`.
  Add one: `mise exec -- gh issue comment <epic> --body-file <file>`; its body begins with
  `**Plan comment**`, or the lookup never finds it.
- **Close** a story merged into its epic's integration branch (`Closes #<n>` closes an issue
  only on a merge into `main`):
  `mise exec -- gh issue close <n> --reason completed --comment "Delivered by PR #<pr>, merged into the integration branch <branch> of epic #<epic>."`.

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
