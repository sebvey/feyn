# The commitment of a work item

The commitment sets a work item, epic or story, to Ready, the commitment point: from then on its form freezes and its Done when is the contract (decisions `idea-and-option-before-ready`, `issue-defines-pr-verifies`). It is cited, not restated, by `/feyn-refine-option` (the action commit, and a part of a split created Ready) and `/feyn-triage` (a work item it creates Ready). It is set on the maintainer's word only, never on the skill's own authority.

## The checks, before the maintainer decides

Run on the item before it is presented, whatever the decision turns out to be, since either caller may end in a commitment: on the option at a refinement, on the idea at a triage (the work items it creates restate it). Each command is run, not assumed; each result is presented with its proof.

1. **Purpose**, first: [purpose-reading.md](purpose-reading.md).
2. **Staleness**: what changed on `origin/main` since the item's `updatedAt`, in the files its body names.
   1. `git fetch`.
   2. The paths its body names, as [neighbours.md](neighbours.md) extracts them.
   3. Which of them `origin/main` still holds: `git ls-tree -r --name-only origin/main -- <path> …`; a bare file name (no folder) is first looked up as a root path (`git ls-tree --name-only origin/main -- <name>`), then, not found there, anywhere, check fixtures left out: `git ls-tree -r --name-only origin/main | grep -E '(^|/)<name>$' | grep -v '/fixtures/'`. A path it no longer holds was moved or removed: `git log origin/main --format='%h %ad %s' --date=short -1 -- <path>` names the commit.
   4. The commits since its `updatedAt` on those paths: `git log origin/main --since=<updatedAt> --format='%h %ad %s' --date=short -- <path> …`; then, for each commit listed, what it changed in them (`git show <hash> --stat -- <path> …`, `git show <hash> -- <path>` where the stat is not enough).
   5. The issues its body cites (`#<m>`): `mise exec -- gh issue view <m> --json number,title,state`.
3. **Overlap**: [neighbours.md](neighbours.md), with the Status filter of the caller.

What the presentation shows of the staleness check: the paths read; the commits since its `updatedAt` on them, each `<hash> <date> <subject>` with what it changed for the item, or "No commit on <paths> since <date>"; the paths `origin/main` no longer holds, with the commit; the issues cited closed since. The purpose and the overlap show what their files say.

## The conditions of the act

The item is set Ready ([project.md](project.md), "Commands", Set; a work item created Ready: `/feyn-issue --status Ready`) only once all of these hold:
- its Done when is verifiable by its baselines: a Done when with none gets them first, each command run on `origin/main` and its output written under its statement as a dated amendment, each line checked against the statement's intent ([done-when.md](done-when.md)); a statement they show wrong is reworked, not committed;
- no open blocked-by link remains ([project.md](project.md), "Dependencies", Read);
- an epic: its five sections written ([contributing](../../docs/contributing.md), "How the work is organised");

A requirement added to an epic's Done when, by a fold or otherwise, is the maintainer's decision: propose it as a choice, never write it on the strength of another decision.

A condition that does not hold is said in the presentation, with what would make it hold; the item is not set Ready until it does. At a triage, where the conditions are checked once the maintainer has said a work item is committed, after the presentation: a condition that does not hold is reported with the creation, and the work item is created Option, to be committed at an option refinement once it holds.

## A story posed in a taken epic

A story the orchestrator of a taken epic poses (`/feyn-deliver-epic` step 2.1) inherits its epic's commitment: it is created Ready, and this procedure is not run on it; its Done when is checked as that step says. A story of an epic created Option by a triage or a brainstorm is not posed by the orchestrator: it is committed here, at an option refinement.
