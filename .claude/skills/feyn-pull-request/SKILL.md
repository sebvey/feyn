---
name: feyn-pull-request
description: "Tooling of the work cycle, called by the contributor agent of the agent workflow deliver-slice.js (under `/feyn-deliver` and `/feyn-deliver-epic`), at the end of the work, and by `/feyn-deliver-epic` for a direct slice: turn the current issue branch on feyn into a pull request to main (to its epic's integration branch for a slice of an epic), rereading the Done when, running the checks that exist, pushing, opening the PR with \"Closes #n\" and the title <type>(<area>): <summary>, checking the issue lists it, having it reviewed by `/feyn-pr-review` on the direct path (not on a direct delivery), then asking for review. It never merges. Use for \"/feyn-pull-request\"."
---

# /feyn-pull-request

One job: deliver the current issue branch as a pull request to `main` and ask for its review.
It never merges: the merge belongs to the maintainer. A slice of an epic, a direct slice
included, is a pull request to the epic's integration branch, merged by the epic's orchestrator
(decision `epic-on-integration-branch`; steps 6 and 8). On the direct path (the work session that
did the work runs it), it has the PR reviewed by a fresh agent, except on a direct delivery
(step 7). It writes on GitHub: the PR, and the issue set Ready for review (step 8). Once the PR
is merged, `/feyn-merge-cleanup` cleans up, never in the same turn.

The branch is `<type>/<n>-<slug>` (made by `/feyn-issue-branch`); `<n>` is the issue. On
`main`, or on a branch without an issue number: stop and say so.

## Steps

1. **Done when.** Reread the issue's Done when
   (`mise exec -- gh issue view <n> --json title,labels,body`) and check each statement against
   the branch. One that does not hold: fix it, or report it in the PR's Checks as "not met" or
   "deviation", with why (step 5). The Done when is not edited after `/feyn-issue-branch`; a change to it
   amends the open PR's body as well.
2. **Checks.** Run the ones that exist for what the branch touches
   (`git diff --name-only main...HEAD`):
   - a course `courses/<id>/`: the check runner of the spec it declares
     (`course-specs/check-course courses/<id>`);
   - `site/` or a course: `astro check` and the site build, from `site/`;
   - anything else: the checks its area documents, if any.

   No check exists yet for the area: say so in the PR's Checks. A failing blocking check (exit
   code 1; the summary line of `check-course` names it) is fixed before the PR opens; one that
   cannot be fixed here is named in the PR's Checks and in Review first. A failing reporting
   check leaves the exit code 0 and blocks nothing: its failures are findings, and the Checks
   line gives their count by check.
3. **Commit and push.** Nothing left uncommitted that belongs to the issue
   (`git status --porcelain`), then
   `git push -u origin <branch>`.
4. **Title**: `<type>(<area>): <summary>`, which becomes the squash commit on `main`.
   `<type>` is the `type:` label, `<area>` the `area:` label, both without their prefix
   (`course(course:parcours-po): write the cases of concept 9`). Summary: imperative,
   lowercase, no final period, under 72 characters for the whole title.
5. **Body**, from the PR body template [pr-body.md](../../reference/pr-body.md). It is read by
   a maintainer who reviews many PRs on many subjects and must get back into this one from the
   PR alone; it is also the squash commit message on `main`. 30 lines at most, blank lines and
   the awaiting section excluded. The sections, in this order, each an `##` heading except the
   `Closes` line; a line of `pr-body.md` that does not apply is dropped (the awaiting section
   outside a draft, `Not verified:` with nothing unverified), and the body carries no HTML
   comment:
   - **Awaiting the maintainer**, only when the branch leaves a decision to the maintainer
     (a draft, step 6), first because it is the action: the question, the options, the
     recommendation. Removed once the answer is applied.
   - `Closes #<n>` (`Refs #<n>` when the PR is one step of the issue) on its own line, first
     after the awaiting section (the first line of the body when there is none). Several
     issues: one such line each.
   - **Context**: 3 to 10 lines of prose for a reader who forgot the subject: the problem, why
     now, what the PR changes overall.
   - **Issues**: one bullet per issue the PR covers, `#<n> <title>: <what this PR does for it>
     (Closes)` or `(Refs)`. Kept with a single issue.
   - **Changes**: at most 8 bullets, by intent rather than by file. The detail is the diff.
     Decisions written (`/feyn-decision`) and issues opened on the way are bullets here.
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
       `Fresh-agent review: <N> blocking findings, fixed.`: added after the review, by step 7 on
       the direct path; under the agent workflow `deliver-slice.js` (`/feyn-deliver`,
       `/feyn-deliver-epic`), by its corrector, or by the orchestrator when the first review
       finds nothing to correct (`/feyn-deliver` step 3, `/feyn-deliver-epic` step 2.4); updated,
       not repeated, after a second review: `<N>` then counts the blocking findings of all the
       reviews. A decision or a check touched as the review prescribed, without a second review
       (step 7): `Fresh-agent review: <N> blocking findings, fixed; a decision touched as
       prescribed, no second review.` (`a check` for a check). On a direct delivery (the
       issue's To do opens with "Direct delivery",
       [contributing](../../../docs/contributing.md), "How the work is organised", moment 2):
       `Fresh-agent review: none, direct delivery.`, written here, before the PR opens, since no
       review runs (step 7). It counts within the 30 lines: leave room for it. Absent when the
       maintainer asked for a PR without a review.
     - `Not verified:` one line, if anything.
   - **Review first**: 1 to 3 bullets on where the maintainer's judgment is needed: a
     deviation, a choice the contributor made, a sensitive spot.

   No signature or generated-by line: the squash takes the body as the commit message on
   `main`; the `Co-Authored-By` trailer on the commits is enough.
6. **Open it**:
   - `mise exec -- gh pr create --base main --title "<title>" --body-file <file>`; with a
     decision awaited, add `--draft` (no label on the PR: the draft already keeps it from
     being merged) and put `blocked:maintainer` on the issue
     (`mise exec -- gh issue edit <n> --add-label blocked:maintainer`). Under the agent
     workflow `deliver-slice.js`, `--draft` always: the PR stays a draft until its review and
     corrections are done, then is marked ready at the hand-over (`/feyn-deliver` step 5) or at
     the merge of a slice (the workflow's Merge stage). A direct delivery is never a
     draft. A slice of an epic: `--base <integration branch>` in place of `--base main`; its
     `Closes #<n>` closes nothing on that branch, the orchestrator closes the slice at the
     merge, so the check below may not list the PR: expected;
   - check the issue shows it: `mise exec -- gh issue view <n> --json closedByPullRequestsReferences`
     lists the PR when it says `Closes #<n>`; a `Refs` PR: it lists nothing, since the branch
     is not linked to the issue (decision `no-branch-link`). GitHub can take a few seconds to
     list the PR: rerun once. PR still missing on a `Closes` PR, or listed on a `Refs` PR (a
     closing keyword left in the body): fix the body (`mise exec -- gh pr edit <pr> --body-file <file>`).
7. **Fresh-agent review**, on the direct path. On a direct delivery, `/feyn-pr-review` does
   not run and the line is already in Checks (step 5): skip to step 8; the rest of this step
   applies to the other PRs. Under the agent workflow `deliver-slice.js` (`/feyn-deliver`,
   `/feyn-deliver-epic`), skip this step: the workflow runs the review and the corrections. Run
   `/feyn-pr-review <pr>`; a draft PR (a decision awaited, step 6) is reviewed now, before the
   maintainer's answer, and the decision awaiting that answer is not a finding. Then, yourself,
   since no other agent fixes on the direct path:
   - remove the reviewer's worktree when `/feyn-pr-review` returns one, as `/feyn-pr-review`
     step 2 says;
   - apply the blocking findings, and the non-blocking ones worth fixing; commit, push, and
     update the body (`mise exec -- gh pr edit <pr> --body-file <file>`);
   - check each fix in the diff (`mise exec -- gh pr diff <pr>`);
   - add to Checks `Fresh-agent review: <N> blocking findings, fixed.` or
     `Fresh-agent review: no blocking finding.` (step 5).

   **A second review**, `/feyn-pr-review <pr>` again, only when the correction goes beyond
   what the review asked: a change added on your own, or one that changes the meaning of a
   rule; the line then counts the blocking findings of all the reviews. A change the review
   prescribed, its text included, decision or check included: check it yourself in the diff
   against the review's words. The `Fresh-agent review:` line says when a decision or a check
   was touched without a second review (step 5). The same holds for the maintainer's answer
   (step 8). Under the agent workflow `deliver-slice.js` this rule does not apply: a fresh agent
   of the workflow verifies each round of corrections.
8. **Ask for review**: set the issue's Status to Ready for review (the work claims done, the
   maintainer concludes; [project.md](../../reference/project.md)):
   `mise exec -- gh project item-edit 4 --owner sebvey --url <issue url> --field Status --value "Ready for review"`.
   Only once the `Fresh-agent review:` line is in Checks (step 7), `none, direct delivery`
   included (step 5), or when the maintainer asked for a PR without a review (the reply then
   says so); not for a `Refs` PR (the issue stays In progress), not under `/feyn-deliver`,
   whose orchestrator runs the review and sets it at the hand-over (its step 5), and never for a
   slice of an epic, a direct slice included: it never goes Ready for review, its orchestrator
   merges it into the integration branch (`/feyn-deliver-epic` step 2), and this step stops
   here. A correction asked on the PR returns the issue to In progress until it is delivered
   again. Then reply with the PR URL, the title, what the maintainer should look at first (the
   PR's Review first, in one line), and the merge command:
   `mise exec -- gh pr merge <pr> --squash --delete-branch`.
   The repository squashes with the PR title and body and allows squash only (GitHub,
   observed 2026-10-28, #135), so the PR title, followed by ` (#<pr>)`, becomes the subject
   on `main`: the command names no subject. Stop there.
   A draft PR: the issue stays In progress, with its label; name the question instead of the
   merge command. The maintainer answers with a comment and removes `blocked:maintainer` from
   the issue: one removal. Then apply the answer, remove the section from the body,
   `mise exec -- gh pr ready <pr>`, and ask for review again (the second-review rule of step 7
   applies; Ready for review then, as above). Under `/feyn-deliver`, neither: the PR stays a
   draft, the orchestrator reruns its workflow with the answer, then marks the PR ready and
   sets Ready for review at its hand-over (its steps 4 and 5). Never
   remove the label yourself; if it is still on the issue, the answer is not given: stop.

