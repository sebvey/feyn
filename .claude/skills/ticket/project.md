# The Project and its Status

The one place `/ticket`, `/start` and `/finish` take the Project's names and ids from. The
**Project** is the GitHub Project "feyn", number 4, owner `sebvey`; its **Status** field says
where an issue stands:

| Status | Means | Option id |
|---|---|---|
| Backlog | proposed, to triage | `c1d0b0c3` |
| Ready | decided, free to take | `be2d48d7` |
| In progress | a branch exists | `be703c13` |
| Done | closed by a PR | `9e81e5a6` |

Project id `PVT_kwHOADOnU84Bo8V6`, Status field id `PVTSSF_lAHOADOnU84Bo8V6zhnaHqI`.

The maintainer may turn on the Project's built-in workflows (add on creation, Done on close or
merge); the skills do not count on them: they add the issue and set the Status themselves.

- **Read** an issue's Status: `mise exec -- gh issue view <n> --json projectItems` (the item
  titled `feyn`, its `status.name`; no item means the issue is not in the Project yet). Every
  issue with its Status:
  `mise exec -- gh project item-list 4 --owner sebvey --limit 200 --format json -q '.items[] | [.content.number, .status] | @tsv'`.
- **Add** an issue: `mise exec -- gh project item-add 4 --owner sebvey --url <issue url> --format json -q .id`.
  An issue already in the Project is not added twice: the command returns its existing item id.
- **Set** the Status, by name:
  `mise exec -- gh project item-edit 4 --owner sebvey --url <issue url> --field Status --value "<Status>"`.
  The same by ids, for a script:
  `mise exec -- gh project item-edit --project-id PVT_kwHOADOnU84Bo8V6 --id <item id> --field-id PVTSSF_lAHOADOnU84Bo8V6zhnaHqI --single-select-option-id <option id>`.

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
