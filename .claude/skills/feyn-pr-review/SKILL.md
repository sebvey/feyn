---
name: feyn-pr-review
description: "Tooling of the work cycle, called by `/feyn-deliver` and by `/feyn-pull-request`: a fresh agent reviews a pull request on feyn against its issue's Done when and returns its report (a verdict per statement, blocking and non-blocking findings, what it could not check), changing nothing; it can also review a merged PR after the fact. Use for \"/feyn-pr-review 247\"."
argument-hint: "<pr number>"
---

# /feyn-pr-review <pr>

One job: have a fresh agent review PR `<pr>` against its issue's Done when, and return its
report. Every PR is reviewed this way before it reaches the maintainer (decision
`fresh-agent-review-before-maintainer`): `/feyn-deliver` runs it at its step 3,
`/feyn-pull-request` on the direct path at its step 7. It changes nothing in the repository,
pushes nothing, comments nothing on GitHub and sets no Status: the caller applies the findings
and sets Ready for review.

## 1. Read the PR

`mise exec -- gh pr view <pr> --json number,title,state,headRefName,body`

The issue is the number of the body's `Closes #<n>` or `Refs #<n>` line (several lines: the
brief names each issue). No such line: say so and stop. A closed PR that was not merged: say
so and stop. A merged PR (`state` is `MERGED`): the review comes after the fact, and the reply
says so at the top; its branch may be deleted, so the brief gets one more line: "The PR is
merged: run `git fetch origin pull/<pr>/head` and read `FETCH_HEAD` wherever this brief says
`origin/<branch>`."

## 2. Spawn the reviewer

A new `Agent`, model `opus` always, never the contributor and never resumed from it, named
`reviewer-<pr>` (its `name`, for step 4), with the [reviewer brief](#reviewer-brief) filled in:
the PR, its branch (`headRefName`), the issue, and what the caller passes, "none" for each
input it does not pass:
- **Checks to rerun.** A PR with any check or fixture runner to rerun (a course, `site/`,
  `course-specs/check-course`, `course-specs/*/*/checks/` in `mise exec -- gh pr diff <pr>
  --name-only`): the reviewer gets
  `isolation: "worktree"`, and the brief has it check out the PR head detached. Its worktree
  holds no issue branch; the caller removes it (`/feyn-deliver` step 6.1, 6.2 and 6.4). That
  reviewer reads [worktree-agent.md](../../reference/worktree-agent.md) first: the rules and
  the Claude Code behaviours of an agent in a worktree (the brief names it).
- **A draft PR**: under `/feyn-deliver` every PR is a draft until its hand-over, which is not
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

Under `/feyn-deliver` (its step 4), once the contributor pushed its corrections, the caller
resumes the reviewer with `SendMessage` to its name and this brief, `<range>` being the PR's
head the reviewer read, two dots, the new head; after a maintainer's answer, the answer quoted
follows the brief:

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

## Reviewer brief

```
You review PR #<pr> (branch <branch>) on feyn, which claims to deliver issue #<n>. You are
not its contributor: trust nothing in the PR body or in any summary; recount and recheck
every claim yourself. Read CLAUDE.md, the issue (`mise exec -- gh issue view <n>`) and the
files it lists (a note of construction/notes/ only when the issue names it), then the PR
(`mise exec -- gh pr view <pr>`, `mise exec -- gh pr diff <pr>`); read a file at the PR's
head with `git fetch` and `git show origin/<branch>:<path>`. To rerun checks in a worktree,
`git fetch` then `git switch --detach origin/<branch>` (the branch itself is checked out in
the contributor's worktree, so `git switch <branch>` fails). Change nothing, push nothing,
comment nothing.
In a worktree, read `.claude/reference/worktree-agent.md` first.

The yardstick is the issue's Done when, statement by statement, not the PR's own verdicts.
Recheck yourself:
- each statement of the issue's Done when: find the proof yourself (run a command, read a
  file; a count, recount it); the PR gives only the verdict counts and why a statement is not
  met or deviates, and those you check too;
- the checks /feyn-pull-request requires for what the PR touches
  (`mise exec -- gh pr diff <pr> --name-only`), rerun them; `course-specs/check-course` prints the
  failures of the reporting checks too, with exit code 0: one the PR adds is a non-blocking
  finding;
- evidence from an agent-workflow run
  (<run ids wf_<id> and transcript directory, or "none">): read the run's transcripts and check what its agents actually read and did, not only what
  they output. The directory moves with the work session's working directory (Claude Code,
  observed 2026-10-28, #130); not found: `find ~/.claude/projects -type d -name 'wf_<id>*'`;
- reserved terms of docs/glossary.md and the words it bans; the rules of CLAUDE.md
  (language, no em-dashes in French, title `<type>(<area>): <summary>`, `Closes #<n>`, no
  signature line);
- consistency with the files the change must match (sibling skills, docs/contributing.md,
  decisions it names), and that every path, command and decision slug it cites exists;
- a decision: its counterfactual names a concrete wrong act, and the maintainer accepted it.

Report, nothing else:
- Verdict per Done when statement: met, not met, deviation, with your own proof.
- Blocking findings (the PR must not reach the maintainer as is): file, line, what is wrong,
  what fixes it.
- Non-blocking findings: same format, one line each.
- What you could not check, and why.
```
