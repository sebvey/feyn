---
name: feyn-merge-cleanup
description: "Tooling of the work cycle, called by `/feyn-deliver` once the maintainer merged a pull request: confirm the issue branch's change landed on main, delete the local branch, check the issue is closed and Done, and name the issues the merge freed. An observation's PR or a direct delivery to main; a slice of an epic is cleaned up by /feyn-deliver-epic. Use for \"/feyn-merge-cleanup\", \"/feyn-merge-cleanup improvement/12-fix-caption-check\"."
argument-hint: "[<issue branch>]"
---

# /feyn-merge-cleanup

One job: clean up after the merge into `main` of an issue branch's PR (an observation's, under
`/feyn-deliver` or on the direct path, or a direct delivery), the moment that follows
`/feyn-pull-request` and is never in the same turn. It never merges, never deletes a remote
branch, and writes nothing on GitHub but a Status. A slice of an epic is merged into its epic's
integration branch, not `main`: `/feyn-deliver-epic` cleans up after it (step 2.5) and writes its
lines on the plan comment (step 2.6), and cleans up after the merge of the epic PR (step 6).

The branch is the issue branch `<type>/<n>-<slug>` (made by `/feyn-issue-branch`): the one the
argument names, or else the current branch; `<n>` is the issue. No argument on `main`, or a
branch without an issue number: stop and say so.

## Steps

Squash makes a new commit on `main`, so git does not see the branch as merged and
`git branch -d` refuses it. Two separate moves: confirm, then delete.

1. `mise exec -- gh pr view <branch> --json state,mergedAt,title,baseRefName` shows `MERGED`;
   otherwise stop: nothing to clean. A base other than `main` (a slice's, into its epic's
   integration branch): stop and name `/feyn-deliver-epic`.
2. `git switch main`, `git pull --ff-only`.
3. **Confirm** that `main` holds the branch's version of every file it touched (`main` may
   have moved on with other merges, so compare those files only):
   `git diff main <branch> -- $(git diff --name-only $(git merge-base main <branch>) <branch>)`
   must print nothing. Read the result before going on; anything printed: stop and show it.
4. **Delete**: `git branch -D <branch>` (already gone if the merge ran in this
   checkout: nothing to do). The remote branch goes with the merge
   (`mise exec -- gh pr merge --squash --delete-branch`); if it is still there
   (`git ls-remote --heads origin <branch>`), tell the maintainer. Never delete a
   remote branch yourself.
5. Check the squash commit carries the PR title
   (`git log main -1 --format=%s --grep "(#<pr>)"`); if not, tell the
   maintainer (`main` is never rewritten).
6. Check the issue with the PR (`mise exec -- gh issue view <n> --json url,state,projectItems`).
   - `Closes` PR: the issue must be closed; if not, say so (the PR body lost its
     `Closes #<n>`). Its Status is Done when the Project workflow "Item closed" is on: read
     the Project workflows ([project.md](../../reference/project.md), "The Project workflows").
     On: the Status should read Done; not yet, rerun the Status read once after a few
     seconds; still not Done, say so and leave it (the Project workflow is what failed, the
     maintainer looks). Off: set Done yourself ([project.md](../../reference/project.md), "Commands").
     The query fails: the state is unknown, report it and set nothing. `projectItems` empty:
     the issue was never in the Project, tell the maintainer.
   - `Refs` PR: the issue must still be open, Status unchanged (In progress). If it closed
     anyway (a closing keyword in the body), reopen it
     (`mise exec -- gh issue reopen <n> --comment "Reopened: PR #<pr> only referenced it (Refs)."`),
     set its Status back to In progress ([project.md](../../reference/project.md), "Commands"),
     and tell the maintainer which step of `/feyn-pull-request` missed it.
   - Either way, if the issue still carries `blocked:maintainer`, tell the
     maintainer.
7. A `Closes` PR whose issue closed: say what its closing frees. No GitHub automation closes a
   parent issue with its sub-issues, and nothing says an issue is free once its last blocker
   closes.
   - **The parent.** `mise exec -- gh api repos/sebvey/feyn/issues/<n>/parent --jq .number`
     prints the parent's number; HTTP 404 « No parent issue found »: no parent, skip to the
     next bullet. A parent with the label `epic`: the issue is a slice, which this skill does
     not clean up; say so and name `/feyn-deliver-epic <epic>`. Any other parent
     (`mise exec -- gh api repos/sebvey/feyn/issues/<parent> --jq '[.state, .sub_issues_summary]'`):
     no plan comment and no Status; it is done when, open, its `sub_issues_summary` shows every
     sub-issue closed. A parent done: the reply ends with one line, its number and title, its
     Done when (read in its body), to verify, and that closing it is the maintainer's (path:
     the issue, button "Close issue", reason completed or not planned); only the lines of the
     next bullet follow it. Never close a parent yourself.
   - **The issues it blocked.**
     `mise exec -- gh api --paginate repos/sebvey/feyn/issues/<n>/dependencies/blocking --jq '.[] | select(.state == "open" and .issue_dependencies_summary.blocked_by == 0) | [.number, .title] | @tsv'`
     lists each open issue that #n blocked whose blockers are now all closed
     (`issue_dependencies_summary.blocked_by` counts its open blockers, `total_blocked_by` all
     of them); it prints nothing when there is none. Name each at the end of the same reply,
     one line each, as now free, with its Status ([project.md](../../reference/project.md),
     "Commands"): free to take when Ready, still to triage when Backlog.
