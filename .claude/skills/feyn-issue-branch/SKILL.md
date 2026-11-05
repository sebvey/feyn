---
name: feyn-issue-branch
description: "Put GitHub issue n on feyn in progress on its own branch, before any work on it. It refuses the issue when it is not committed (Idea or Option), a maintainer decision is awaited or an issue that blocks it is still open, creates the branch <type>/<n>-<slug> from an up-to-date base (--base <branch>, main by default; its epic's integration branch for a story of an epic), resumes an issue In progress and its branch when run by an agent in its own worktree (--worktree), reruns the commands of its Done when against their baselines (writes them when it has none), sets the Status of the issue (and of its epic) to In progress, restates the Done when and lays out the plan. Use for \"/feyn-issue-branch 12\"."
argument-hint: "<issue number> [--base <branch>] [--worktree]"
---

# /feyn-issue-branch <n> [--base <branch>] [--worktree]

One job: put issue n in progress on its own branch. It writes nothing but the branch, the Status and, for a Done when with no baseline, its baselines (a dated amendment of the issue); the work itself comes after.

Its caller passes its variations as parameters and rewrites none of its steps (decision `one-moment-one-file`):
- `--base <branch>`: the branch the issue branch is cut from, `main` by default. A story of an epic, a direct story included, gives its epic's integration branch (the Delivery line of its plan comment; decision `epic-on-integration-branch`). Steps 2 and 3.
- `--worktree`: run by an agent in its own worktree (the contributor of the agent workflow `deliver-story.js`), which can neither `git switch main` (it fails in a worktree, [worktree-agent.md](../../reference/worktree-agent.md)) nor ask the maintainer. Steps 1 to 3.

## 1. Read the issue

`mise exec -- gh issue view <n> --json number,title,url,state,labels,body,comments,projectItems`

The Status is the `status.name` of the `feyn` item in `projectItems` ([project.md](../../reference/project.md)).

Refuse, saying why in one line, and change nothing, when:
- the issue carries `blocked:maintainer`: name what the maintainer must decide (the body or the last comment says it) and stop. Only the maintainer removes that label;
- an issue that blocks it is still open ([project.md](../../reference/project.md), "Dependencies"): name each open blocker and stop;
- the issue is closed, or its Status is Done;
- its Status is Idea or Option: it is not committed, since Ready is the commitment point (decision `idea-and-option-before-ready`); an idea goes to a triage (`/feyn-triage`), an option waits for the maintainer to commit it (set Ready) at an option refinement (`/feyn-refine-option`);
- its Status is already In progress: look for its branch (`git branch --list "*/<n>-*"`) and its PR (`mise exec -- gh pr list --search "<n> in:body"`), and propose to resume them instead. In progress with no branch and no PR is a Status that drifted: say so and go on. With `--worktree`, not a refusal: resume them, with or without a branch or a PR (the orchestrator or an earlier run set the Status), and go on;
- its Status is Ready for review: its PR awaits the maintainer's merge; name the PR and stop (a correction asked on it goes to that PR, `/feyn-deliver-story-alone` step 4);
- it has no `type:` label, or no Done when: propose the fix (`/feyn-issue <n>` shows what is missing) and stop.

## 2. Start from an up-to-date base

1. `git status --porcelain` must be empty. Uncommitted work belongs to someone: say what is there and stop; never stash, restore or clean it.
2. `git switch main`, then `git pull --ff-only`, which fetches `origin/<base>` too. A pull that is not a fast-forward means `main` diverged locally: stop and say so. With `--worktree`: `git fetch` only.

## 3. Create the branch

Name: `<type>/<n>-<slug>`, where `<type>` is the issue's `type:` label without its prefix (`bug`, `course`, `improvement`, `decision`) and `<slug>` is three to five words of the title, lowercase, joined by hyphens (`course/42-concept-9-cases`).

`git switch -c <type>/<n>-<slug> origin/<base>`, then `git push -u origin <type>/<n>-<slug>`.

The branch is not linked to the issue: the PR's `Closes #<n>` links them, and a `Refs #<n>` PR leaves the issue open (decision `no-branch-link`).

A branch for the issue that already exists (`git branch --list "*/<n>-*"` the local ones, `git ls-remote --heads origin "*/<n>-*"` the remote ones): switch to it and say so, do not create a second one. With `--worktree`: `git switch <that branch>`, then `git merge origin/<base>` when it is behind.

## 4. Rerun the Done when

On a branch just created, which holds the base and nothing else yet, run each command of the Done when in it ([done-when.md](../../reference/done-when.md); a statement that compares the base and the head is run on its base side). A branch resumed skips this step: its start ran it, or stopped on it, and then the author's dated amendment, its commands run on the base as [done-when.md](../../reference/done-when.md) says, stands in for the rerun.
- A statement with a baseline: compare the output with it as [done-when.md](../../reference/done-when.md), "The start reruns them", says. Unchanged: go on. An output that changed: stop before step 5.
- A statement with no baseline (a Done when written before [done-when.md](../../reference/done-when.md), or a statement added since): check its output against the statement's intent as [done-when.md](../../reference/done-when.md) says. All hold, and no output changed: write each missing baseline under its statement, as a dated amendment of the issue (its body edited, `mise exec -- gh issue edit <n> --body-file <file>`). A command too broad or a count that misses content: stop before step 5.

A stop posts nothing on the issue, no baseline included. It names each statement, its baseline (or the one it would write) and its output now; the base moved under the statement, or the statement is wrong, and its author (the orchestrator for a story of an epic, otherwise the maintainer) amends the statement and its baseline in one dated amendment. Under the agent workflow `deliver-story.js`, that stop is a `blocked` result, with them in its question.

## 5. Mark it in progress

Set the Status to In progress ([project.md](../../reference/project.md), "Commands"): no Project workflow fires on a branch. An issue not in the Project yet (`projectItems` empty): set it as [project.md](../../reference/project.md), "Commands", says under "Set a Status on a new item". When the issue's parent is an epic (label `kind:epic`, read as [project.md](../../reference/project.md), "Epics", says) not yet In progress, set the epic In progress too.

## 6. Restate and plan

Reply with:
- the branch name;
- the **Done when**, copied as written, its baselines included: it is the contract `/feyn-pull-request` and the review hold the work to. The body has it as a `### Done when` section or a `- **Done when**:` bullet. It is not edited after `/feyn-issue-branch` but by a dated amendment ([done-when.md](../../reference/done-when.md)), which amends the open PR's body as well;
- the files the issue says to read, then the plan: what changes, in which files, and how each Done when statement will be verified (a command to run, a file to read). One line per item.

Then read the files the issue lists and begin. Commits on the branch are free-form (`git commit`); only the PR title survives the squash.
