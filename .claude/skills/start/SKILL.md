---
name: start
description: Take GitHub issue n on feyn - refuse if a maintainer decision is awaited or an issue that blocks it is still open, create the branch <type>/<n>-<slug> from an up-to-date main, linked to the issue, set its Status to In progress, restate the Done when and lay out the plan. Use for "/start <n>", "take issue 12", "let's do #12".
argument-hint: "<issue number>"
---

# /start <n>

One job: put issue n in progress on its own branch. It writes nothing but the branch and the
Status; the work itself comes after.

## 1. Read the issue

`mise exec -- gh issue view <n> --json number,title,url,state,labels,body,comments,projectItems`

The Status is the `status.name` of the `feyn` item in `projectItems` ([project.md](../ticket/project.md)).

Refuse, saying why in one line, and change nothing, when:
- the issue carries `blocked:maintainer`: name what the maintainer must decide (the body or
  the last comment says it) and stop. Only the maintainer removes that label;
- an issue that blocks it is still open
  ([project.md](../ticket/project.md), "Dependencies"): name each open blocker and stop;
- the issue is closed, or its Status is Done;
- its Status is already In progress: look for its branch (`mise exec -- git branch --list "*/<n>-*"`)
  and its PR (`mise exec -- gh pr list --search "<n> in:body"`), and propose to resume them
  instead. In progress with no branch and no PR is a Status that drifted: say so and go on;
- it has no `type:` label, or no Done when: propose the fix (`/ticket <n>` shows what is
  missing) and stop.

## 2. Start from an up-to-date main

1. `mise exec -- git status --porcelain` must be empty. Uncommitted work belongs to someone:
   say what is there and stop; never stash, restore or clean it.
2. `mise exec -- git switch main`, then `mise exec -- git pull --ff-only`. A pull that is not
   a fast-forward means `main` diverged locally: stop and say so.

## 3. Create the branch

Name: `<type>/<n>-<slug>`, where `<type>` is the issue's `type:` label without its prefix
(`bug`, `course`, `improvement`, `decision`) and `<slug>` is three to five words of the title,
lowercase, joined by hyphens (`course/42-concept-9-cases`).

`mise exec -- gh issue develop <n> --name <type>/<n>-<slug> --base main --checkout`

This creates the branch on GitHub, linked to the issue, and checks it out: the issue's
Development section then lists the branch, and the PR opened from it. A PR from a linked
branch closes the issue at the merge even when it says `Refs`: `/finish` unlinks the branch
first for a `Refs` PR.

A branch of that name that already exists (`mise exec -- gh issue develop --list <n>` shows
the linked ones, `mise exec -- git branch --list "*/<n>-*"` the local ones): switch to it and
say so, do not create a second one.

## 4. Mark it in progress

Set the Status to In progress ([project.md](../ticket/project.md)):

`mise exec -- gh project item-edit 4 --owner sebvey --url <issue url> --field Status --value "In progress"`

An issue that is not in the Project yet (`projectItems` empty) is added first:
`mise exec -- gh project item-add 4 --owner sebvey --url <issue url>`.

## 5. Restate and plan

Reply with:
- the branch name;
- the **Done when**, copied as written: it is the contract `/finish` and the review hold the
  work to. The body has it as a `### Done when` section or a `- **Done when**:` bullet. It is
  not edited after `/start`; a change to it amends the open PR's body as well;
- the files the issue says to read, then the plan: what changes, in which files, and how each
  Done when statement will be verified (a command to run, a file to read). One line per item.

Then read the files the issue lists and begin. Commits on the branch are free-form
(`mise exec -- git commit`); only the PR title survives the squash.
