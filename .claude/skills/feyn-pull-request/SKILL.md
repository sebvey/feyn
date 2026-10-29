---
name: finish
description: 'Deliver the current issue branch on feyn - run the checks that exist, push, open the PR to main with "Closes #n" and the title <type>(<area>): <summary>, ask for review; after the merge, confirm the change landed, delete the local branch and note the slice on its epic's plan comment. Use for "/finish", "open the PR", "it is merged, clean up".'
argument-hint: "[after-merge]"
---

# /finish

Two moments, never in the same turn: **deliver** (open the PR), then, once the PR is merged,
**clean up**. It never merges: the merge belongs to the reviewer. Each writes on GitHub: the
delivery sets the issue Ready for review (step 7); the clean-up adds two lines to the epic's
plan comment, and sets the epic Ready for review when its last slice closed (step 7).

The branch is `<type>/<n>-<slug>` (made by `/start`); `<n>` is the issue. On `main`, or on a
branch without an issue number: stop and say so.

## Deliver

1. **Done when.** Reread the issue's Done when
   (`mise exec -- gh issue view <n> --json title,labels,body`) and check each statement against
   the branch. One that does not hold: fix it, or report it in the PR's Checks as "not met" or
   "deviation", with why (step 5). The Done when is not edited after `/start`; a change to it
   amends the open PR's body as well.
2. **Checks.** Run the ones that exist for what the branch touches
   (`git diff --name-only main...HEAD`):
   - a course `courses/<id>/`: the check runner of the spec it declares
     (`specs/<name>/checks/check-course courses/<id>`);
   - `site/` or a course: `astro check` and the site build, from `site/`;
   - anything else: the checks its area documents, if any.

   No check exists yet for the area: say so in the PR's Checks. A failing check is fixed before
   the PR opens; one that cannot be fixed here is named in the PR's Checks and in Review first.
3. **Commit and push.** Nothing left uncommitted that belongs to the issue
   (`git status --porcelain`), then
   `git push -u origin <branch>`.
4. **Title**: `<type>(<area>): <summary>`, which becomes the squash commit on `main`.
   `<type>` is the `type:` label, `<area>` the `area:` label, both without their prefix
   (`course(course:parcours-po): write the cases of concept 9`). Summary: imperative,
   lowercase, no final period, under 72 characters for the whole title.
5. **Body**, from the PR body template [pr-body.md](pr-body.md). It is read by a maintainer who
   reviews many PRs on many subjects and must get back into this one from the PR alone; it is
   also the squash commit message on `main`. 30 lines at most, blank lines and the awaiting
   section excluded. The sections, in this order, each an `##` heading except the `Closes`
   line; a line of `pr-body.md` that does not apply is dropped (the awaiting section outside a
   draft, `Not verified:` with nothing unverified), and the body carries no HTML comment:
   - **Awaiting the maintainer**, only when the branch leaves a decision to the maintainer
     (a draft, step 6), first because it is the action: the question, the options, the
     recommendation. Removed once the answer is applied. An `Awaiting the orchestrator`
     section (`/orchestrate` step 1) takes the same place.
   - `Closes #<n>` (`Refs #<n>` when the PR is one step of the issue) on its own line, first
     after the awaiting section (the first line of the body when there is none). Several
     issues: one such line each.
   - **Context**: 3 to 10 lines of prose for a reader who forgot the subject: the problem, why
     now, what the PR changes overall.
   - **Issues**: one bullet per issue the PR covers, `#<n> <title>: <what this PR does for it>
     (Closes)` or `(Refs)`. Kept with a single issue.
   - **Changes**: at most 8 bullets, by intent rather than by file. The detail is the diff.
     Decisions written (`/decide`) and issues opened on the way are bullets here.
   - **Checks**:
     - `Done when #<n>: <count> met[, <count> not met][, <count> deviation].`, one line per
       issue, from step 1. The statements are not restated (the issue holds them): only a
       "not met" or a "deviation" gets one sub-bullet, the statement in a few words and why.
     - `Checks run:` their names and results, on one line (step 2); an area with no check:
       say so here.
     - `Behaviours:` the tool behaviours whose mark cites this PR
       ([contributing](../../../docs/contributing.md), "Tool behaviours"), each with its proof
       in a few words, on one line; a longer proof goes in a comment on the issue, and the
       mark cites the issue. Dropped when there is none.
     - `Fresh-agent review: no blocking finding.` or
       `Fresh-agent review: <N> blocking findings, fixed.`: not written by `/finish`; added
       at the hand-over by the corrections pass of `/orchestrate` (step 4), and updated, not
       repeated, after a second review: `<N>` then counts the blocking findings of all the
       reviews. It counts within the 30 lines: leave room for it. Absent when the PR had no
       such review.
     - `Not verified:` one line, if anything.
   - **Review first**: 1 to 3 bullets on where the maintainer's judgment is needed: a
     deviation, a choice the contributor made, a sensitive spot.

   No signature or generated-by line: the squash takes the body as the commit message on
   `main`; the `Co-Authored-By` trailer on the commits is enough.
6. **Open it**:
   - `mise exec -- gh pr create --base main --title "<title>" --body-file <file>`; with a
     decision awaited, add `--draft` (no label on the PR: the draft already keeps it from
     being merged) and put `blocked:maintainer` on the issue
     (`mise exec -- gh issue edit <n> --add-label blocked:maintainer`);
   - check the issue shows it: `mise exec -- gh issue view <n> --json closedByPullRequestsReferences`
     lists the PR when it says `Closes #<n>`; a `Refs` PR: it lists nothing, since the branch
     is not linked to the issue (decision `no-branch-link`). GitHub can take a few seconds to
     list the PR: rerun once. PR still missing on a `Closes` PR, or listed on a `Refs` PR (a
     closing keyword left in the body): fix the body (`mise exec -- gh pr edit <pr> --body-file <file>`).
7. **Ask for review**: set the issue's Status to Ready for review (the work claims done, the
   maintainer concludes; [project.md](../../reference/project.md)):
   `mise exec -- gh project item-edit 4 --owner sebvey --url <issue url> --field Status --value "Ready for review"`.
   Only when a fresh-agent review was done (the Checks line `Fresh-agent review:` exists) or
   the maintainer asked for a PR without one; not for a `Refs` PR (the issue stays In
   progress), and not under `/orchestrate`, whose hand-over sets it after the fresh-agent
   review (its step 5). A correction asked on the PR returns the issue to In progress until it
   is delivered again. Then reply with the PR URL, the
   title, what the reviewer should look at first (the PR's Review first, in one line), and the
   merge command: `mise exec -- gh pr merge <pr> --squash --delete-branch`.
   The repository squashes with the PR title and body and allows squash only (GitHub,
   observed 2026-10-28, #135), so the PR title, followed by ` (#<pr>)`, becomes the subject
   on `main`: the command names no subject. Stop there.
   A draft PR: the issue stays In progress, with its label; name the question instead of the
   merge command. The maintainer answers with a comment and removes `blocked:maintainer` from
   the issue: one removal. Then apply the answer, remove the section from the body,
   `mise exec -- gh pr ready <pr>`, and ask for review again (Ready for review then, as above; not under `/orchestrate`, where
   the orchestrator sets it after the fresh-agent review). Never
   remove the label yourself; if it is still on the issue, the answer is not given: stop.

## Clean up (after the merge)

Squash makes a new commit on `main`, so git does not see the branch as merged and
`git branch -d` refuses it. Two separate moves: confirm, then delete.

1. `mise exec -- gh pr view <branch> --json state,mergedAt,title` shows `MERGED`; otherwise
   stop: nothing to clean.
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
     and tell the maintainer which step of "Deliver" missed it.
   - Either way, if the issue still carries `blocked:maintainer`, tell the
     maintainer.
7. A `Closes` PR whose issue closed: say what its closing frees. Nothing closes a parent issue
   (an epic has no PR of its own, and no GitHub automation closes it with its sub-issues), and
   nothing says an issue is free once its last blocker closes.
   - **The epic.** `mise exec -- gh api repos/sebvey/feyn/issues/<n>/parent --jq .number`
     prints the parent's number; HTTP 404 « No parent issue found »: no parent, skip to the
     next bullet. Then
     `mise exec -- gh api repos/sebvey/feyn/issues/<parent> --jq '[.state, .sub_issues_summary, [.labels[].name]]'`.
     A parent with the label `epic` is the epic: add two lines to its **plan comment**
     ([project.md](../../reference/project.md), "Epics": find it, read it into a file, append,
     PATCH it), the slice closed (`#<n> (PR #<pr>)`, what it delivered in a few words) and the
     next slice to pose, from the plan comment's order, or "next slice to pose: the maintainer
     decides" when it is not obvious, or "next slice: none, the epic closes" when this was its
     last; no plan comment: add one beginning with `**Plan comment**`, with the two lines, and
     say it was missing. The reply
     gives the two lines. Any other parent: no plan comment, and "parent issue" replaces
     "epic" below. Open, with `completed` equal to `total`, means every sub-issue is closed:
     set the epic Ready for review ([project.md](../../reference/project.md), "Commands"; an epic
     only, not another parent), and the reply ends with one line, the epic's number and title,
     its Done when (read in its body), to verify, and that closing it is the maintainer's
     (path: the epic, button "Close issue", reason completed or not planned; a statement that
     does not hold: a new slice, `/issue`); only the lines of the next bullet follow it. Never
     close it yourself.
   - **The issues it blocked.**
     `mise exec -- gh api --paginate repos/sebvey/feyn/issues/<n>/dependencies/blocking --jq '.[] | select(.state == "open" and .issue_dependencies_summary.blocked_by == 0) | [.number, .title] | @tsv'`
     lists each open issue that #n blocked whose blockers are now all closed
     (`issue_dependencies_summary.blocked_by` counts its open blockers, `total_blocked_by` all
     of them); it prints nothing when there is none. Name each at the end of the same reply,
     one line each, as now free, with its Status ([project.md](../../reference/project.md),
     "Commands"): free to take when Ready, still to triage when Backlog.
