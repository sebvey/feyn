# The neighbours search

How the neighbours of an item are looked up before it is presented to the maintainer: an idea at a triage (`/feyn-triage` step 3), an option at an option refinement (`/feyn-refine-option` step 2), the overlap check of a commitment ([commitment.md](commitment.md)). A neighbour is an open issue that a decision on the item may change or that may change the decision.

Each command is run, not assumed. The item itself comes up in these lookups: it is not its own neighbour.

## The three lookups

1. A **twin**, an open issue on the same point: the search of [project.md](project.md), "Issues", Search, with two or three key words of the item's title.
2. The open **epics, options and committed work items** that cover the item or that it overlaps: the items of the Project with their Status and labels, leaving out the Statuses the caller names (a triage leaves out Done; a refinement leaves out Done and Idea): `mise exec -- gh project item-list 4 --owner sebvey --limit 200 --format json -q '.items[] | select(.status | IN(<the Statuses left out, each quoted>) | not) | [.content.number, .status, (.labels // [] | join(",")), .content.title] | @tsv'` (a triage: `IN("Done")`; a refinement: `IN("Done", "Idea")`), then the body of each whose title or area meets the item's (`mise exec -- gh issue view <m>`).
3. An **open idea on the same files**: for each path the item's body names (below), `mise exec -- gh issue list --state open --search "<path> in:body" --json number,title --jq '.[] | [.number, .title] | @tsv'`.

The paths the item's body names, files and folders: `mise exec -- gh issue view <n> --json body --jq .body | grep -oE '[A-Za-z0-9_.-]+(/[A-Za-z0-9_.-]+)+/?|[A-Za-z0-9_-]+\.(md|js|mjs|json|ya?ml|ts|astro)' | grep -v '^github\.com/' | sort -u`.

## What the presentation shows

Each neighbour `#<m> <title>` with its Status and what it shares with the item (twin, covers it, overlaps it, same files), or "No neighbour" when the three lookups find none.
