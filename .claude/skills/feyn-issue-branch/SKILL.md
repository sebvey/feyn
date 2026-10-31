---
name: feyn-issue-branch
description: "Tooling of the work cycle, called by the contributor agent of the agent workflow deliver-slice.js (under `/feyn-deliver` and `/feyn-deliver-epic`), first: put GitHub issue n on feyn in progress on its own branch. It refuses the issue when a maintainer decision is awaited or an issue that blocks it is still open, creates the branch <type>/<n>-<slug> from an up-to-date main, sets the Status of the issue (and of its epic) to In progress, restates the Done when and lays out the plan. Use for \"/feyn-issue-branch 12\"."
argument-hint: "<issue number>"
---

# /feyn-issue-branch <n>

One job: put issue n in progress on its own branch. It writes nothing but the branch and the
Status; the work itself comes after.

## 1. Read the issue

`mise exec -- gh issue view <n> --json number,title,url,state,labels,body,comments,projectItems`

The Status is the `status.name` of the `feyn` item in `projectItems` ([project.md](../../reference/project.md)).

Refuse, saying why in one line, and change nothing, when:
- the issue carries `blocked:maintainer`: name what the maintainer must decide (the body or
  the last comment says it) and stop. Only the maintainer removes that label;
- an issue that blocks it is still open
  ([project.md](../../reference/project.md), "Dependencies"): name each open blocker and stop;
- the issue is closed, or its Status is Done;
- its Status is already In progress: look for its branch (`git branch --list "*/<n>-*"`)
  and its PR (`mise exec -- gh pr list --search "<n> in:body"`), and propose to resume them
  instead. In progress with no branch and no PR is a Status that drifted: say so and go on;
- its Status is Ready for review: its PR awaits the maintainer's merge; name the PR and stop
  (a correction asked on it goes to that PR, `/feyn-deliver` step 4);
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

The branch is not linked to the issue: the PR's `Closes #<n>` links them, and a `Refs #<n>`
PR leaves the issue open (decision `no-branch-link`).

A branch for the issue that already exists (`git branch --list "*/<n>-*"` the local ones,
`git ls-remote --heads origin "*/<n>-*"` the remote ones): switch to it and say so, do not
create a second one.

## 4. Mark it in progress

Set the Status to In progress ([project.md](../../reference/project.md), "Commands"): no
Project workflow fires on a branch. An issue not in the Project yet (`projectItems` empty):
set it as [project.md](../../reference/project.md), "Commands", says under "Set a Status on a new
item". When the issue's parent is an epic (label `epic`, read as
[project.md](../../reference/project.md), "Epics", says) not yet In progress, set the epic In
progress too.

## 5. Restate and plan

Reply with:
- the branch name;
- the **Done when**, copied as written: it is the contract `/feyn-pull-request` and the review hold the
  work to. The body has it as a `### Done when` section or a `- **Done when**:` bullet. It is
  not edited after `/feyn-issue-branch`; a change to it amends the open PR's body as well;
- the files the issue says to read, then the plan: what changes, in which files, and how each
  Done when statement will be verified (a command to run, a file to read). One line per item.

Then read the files the issue lists and begin. Commits on the branch are free-form
(`git commit`); only the PR title survives the squash.
