---
name: feyn-issue-branch
description: "Put GitHub issue n on feyn in progress on its own branch, before any work on it. It refuses the issue when it is not committed (Idea or Option), a maintainer decision is awaited or an issue that blocks it is still open, creates the branch <type>/<n>-<slug> from an up-to-date main (from its epic's integration branch for a story of an epic), reruns the commands of its Done when against their baselines (writes them when it has none), sets the Status of the issue (and of its epic) to In progress, restates the Done when and lays out the plan. Use for \"/feyn-issue-branch 12\"."
argument-hint: "<issue number>"
---

# /feyn-issue-branch <n>

One job: put issue n in progress on its own branch. It writes nothing but the branch, the
Status and, for a Done when with no baseline, its baselines (a dated amendment of the issue);
the work itself comes after.

## 1. Read the issue

`mise exec -- gh issue view <n> --json number,title,url,state,labels,body,comments,projectItems`

The Status is the `status.name` of the `feyn` item in `projectItems` ([project.md](../../reference/project.md)).

Refuse, saying why in one line, and change nothing, when:
- the issue carries `blocked:maintainer`: name what the maintainer must decide (the body or
  the last comment says it) and stop. Only the maintainer removes that label;
- an issue that blocks it is still open
  ([project.md](../../reference/project.md), "Dependencies"): name each open blocker and stop;
- the issue is closed, or its Status is Done;
- its Status is Idea or Option: it is not committed, since Ready is the commitment point
  (decision `idea-and-option-before-ready`); an idea goes to a triage (`/feyn-triage`), an
  option waits for the maintainer to commit it (set Ready) at an option refinement
  (`/feyn-refine-option`);
- its Status is already In progress: look for its branch (`git branch --list "*/<n>-*"`)
  and its PR (`mise exec -- gh pr list --search "<n> in:body"`), and propose to resume them
  instead. In progress with no branch and no PR is a Status that drifted: say so and go on;
- its Status is Ready for review: its PR awaits the maintainer's merge; name the PR and stop
  (a correction asked on it goes to that PR, `/feyn-deliver-story-alone` step 4);
- it has no `type:` label, or no Done when: propose the fix (`/feyn-issue <n>` shows what is
  missing) and stop.

## 2. Start from an up-to-date main

1. `git status --porcelain` must be empty. Uncommitted work belongs to someone:
   say what is there and stop; never stash, restore or clean it.
2. `git switch main`, then `git pull --ff-only`. A pull that is not
   a fast-forward means `main` diverged locally: stop and say so.

## 3. Create the branch

Name: `<type>/<n>-<slug>`, where `<type>` is the issue's `type:` label without its prefix
(`bug`, `course`, `improvement`, `decision`) and `<slug>` is three to five words of the title,
lowercase, joined by hyphens (`course/42-concept-9-cases`).

`git switch -c <type>/<n>-<slug> origin/main`, then `git push -u origin <type>/<n>-<slug>`.
A story of an epic, a direct story included, starts from the epic's integration branch (the
Delivery line of its plan comment; decision `epic-on-integration-branch`):
`origin/<integration branch>` in place of `origin/main`, as the brief of the agent workflow
`deliver-story.js` or `/feyn-deliver-epic` step 2, "A direct story", says.

The branch is not linked to the issue: the PR's `Closes #<n>` links them, and a `Refs #<n>`
PR leaves the issue open (decision `no-branch-link`).

A branch for the issue that already exists (`git branch --list "*/<n>-*"` the local ones,
`git ls-remote --heads origin "*/<n>-*"` the remote ones): switch to it and say so, do not
create a second one.

## 4. Rerun the Done when

On a branch just created (not on one resumed, whose start already ran this step), which holds
the base and nothing else yet, run each command of the Done when
([done-when.md](../../reference/done-when.md)):
- A statement with a baseline: compare the output with it as
  [done-when.md](../../reference/done-when.md), "The start reruns them", says. Unchanged: go
  on. An output that changed: stop before step 5, naming each statement, its baseline and its
  output now; the base moved under the statement, and its author (the orchestrator for a story of an epic, otherwise the
  maintainer) rewrites the statement and its baseline. Under the agent workflow
  `deliver-story.js`, that stop is a `blocked` result, with them in its question.
- A Done when with no baseline (written before
  [done-when.md](../../reference/done-when.md)): write the output of each command under its
  statement, as a dated amendment of the issue (its body edited,
  `mise exec -- gh issue edit <n> --body-file <file>`), each line checked against the
  statement's intent as [done-when.md](../../reference/done-when.md) says; a command too broad
  or a count that misses content stops the start in the same way.

## 5. Mark it in progress

Set the Status to In progress ([project.md](../../reference/project.md), "Commands"): no
Project workflow fires on a branch. An issue not in the Project yet (`projectItems` empty):
set it as [project.md](../../reference/project.md), "Commands", says under "Set a Status on a new
item". When the issue's parent is an epic (label `kind:epic`, read as
[project.md](../../reference/project.md), "Epics", says) not yet In progress, set the epic In
progress too.

## 6. Restate and plan

Reply with:
- the branch name;
- the **Done when**, copied as written, its baselines included: it is the contract
  `/feyn-pull-request` and the review hold the work to. The body has it as a `### Done when`
  section or a `- **Done when**:` bullet. It is not edited after `/feyn-issue-branch` but by a
  dated amendment ([done-when.md](../../reference/done-when.md)), which amends the open PR's
  body as well;
- the files the issue says to read, then the plan: what changes, in which files, and how each
  Done when statement will be verified (a command to run, a file to read). One line per item.

Then read the files the issue lists and begin. Commits on the branch are free-form
(`git commit`); only the PR title survives the squash.
