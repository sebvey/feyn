---
name: feyn-pr-review
description: "Tooling of the work cycle, called by `/feyn-pull-request` on the direct path, its reviewer the project subagent feyn-pr-reviewer, also spawned by the agent workflow deliver-slice.js: a fresh agent reviews a pull request on feyn against its issue's Done when and returns its report (a verdict per statement, blocking and non-blocking findings, what it could not check), changing nothing; it can also review a merged PR after the fact. Use for \"/feyn-pr-review 247\"."
argument-hint: "<pr number>"
---

# /feyn-pr-review <pr>

One job: have a fresh agent review PR `<pr>` against its issue's Done when, and return its
report. Every PR is reviewed this way before it reaches the maintainer (decision
`fresh-agent-review-before-maintainer`): `/feyn-pull-request` runs it on the direct path at its
step 7; the agent workflow `deliver-slice.js` (under `/feyn-deliver` and `/feyn-deliver-epic`)
spawns its own reviewers, of the same project subagent `feyn-pr-reviewer`
([its file](../../agents/feyn-pr-reviewer.md), which holds the reviewer brief), and follows
step 4. It
changes nothing in the repository, pushes nothing, comments nothing on GitHub and sets no
Status: the caller applies the findings and sets Ready for review.

## 1. Read the PR

`mise exec -- gh pr view <pr> --json number,title,state,headRefName,body`

The issue is the number of the body's `Closes #<n>` or `Refs #<n>` line (several lines: the
prompt names each issue). No such line: say so and stop. A closed PR that was not merged: say
so and stop. A merged PR (`state` is `MERGED`): the review comes after the fact, and the reply
says so at the top; its branch may be deleted, so the prompt gets one more line: "The PR is
merged: run `git fetch origin pull/<pr>/head` and read `FETCH_HEAD` wherever your brief says
`origin/<branch>`."

## 2. Spawn the reviewer

A new `Agent` with `subagent_type: "feyn-pr-reviewer"` (the project subagent of
[its file](../../agents/feyn-pr-reviewer.md): the reviewer brief, no Edit or Write tool, model
`opus`), never the contributor and never resumed from it, named `reviewer-<pr>` (its `name`,
for step 4). Its prompt names the PR, its branch (`headRefName`), the issue, and what the
caller passes, "none" for each input it does not pass; the brief itself is in the agent's file,
not in the prompt. A work session sees an agent file added to `.claude/agents/` during it (a
`git pull` that brings one), with no restart (Claude Code, observed 2026-10-31, #373). The
inputs:
- **Checks to rerun.** A PR with any check or fixture runner to rerun (a course, `site/`,
  `course-specs/check-course`, `course-specs/*/*/checks/` in `mise exec -- gh pr diff <pr>
  --name-only`): the reviewer gets
  `isolation: "worktree"`, and its brief has it check out the PR head detached. Its worktree
  holds no issue branch (`.claude/worktrees/agent-<id>`, on a branch `worktree-agent-<id>`);
  the caller removes it once the review and its verification are done: still locked
  (`locked claude agent agent-<id>`), its agent runs, stop it (`TaskStop`) then
  `git worktree unlock <path>`; `git -C <path> status --porcelain` must print nothing
  (anything printed: stop and show it); then `git worktree remove <path>` and
  `git branch -D worktree-agent-<id>`. That reviewer reads
  [worktree-agent.md](../../reference/worktree-agent.md) first: the rules and the Claude Code
  behaviours of an agent in a worktree (its brief names it).
- **A draft PR**: under the agent workflow every PR is a draft until its hand-over, which is not
  a finding; a decision awaited: say so; a decision awaiting the maintainer's answer is not a
  finding.
- **An agent-workflow run.** The run ids `wf_<id>` and their transcript directory.

Wait for its reply; do no review of your own in parallel.

## 3. Return the report

Reply with a heading `Fresh-agent review of PR #<pr>`, then the report as the reviewer wrote
it: the verdict per Done when statement, the blocking findings, the non-blocking findings, what
it could not check. Nothing cut, reworded or judged: the caller decides what to fix. Add the
reviewer's name, for the caller to resume it (step 4), and the path of the reviewer's worktree
when it had one, for the caller's clean-up.

## 4. Verify the corrections

Once corrections are pushed, a caller that keeps the reviewer resumes it with `SendMessage` to
its name and this brief (the agent workflow `deliver-slice.js` gives it to a new agent instead,
with the findings), `<range>` being the PR's head the reviewer read, two dots, the new head;
after a maintainer's answer, the answer quoted follows the brief:

```
You reviewed PR #<pr>. The contributor applied corrections in <range>. Recheck each finding
you raised against the diff, rerun the Done when statements the corrections touch, read
everything in the diff beyond your findings, and report: each finding fixed or not, anything
new, your verdict. Never take the PR body's word for it. Before rerunning checks, `git fetch`,
then `git switch --detach <new head>`; your worktree gone: say so and work from
`git show origin/<branch>:<path>`.
```

Its reply returns as in step 3, under a heading `Fresh-agent verification of PR #<pr>`. Its
name no longer resolves (the reviewer is gone): steps 1 to 3 again, with a new agent.

