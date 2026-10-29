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

A new `Agent`, model `opus` always, never the contributor and never resumed from it, with the
[reviewer brief](#reviewer-brief) filled in: the PR, its branch (`headRefName`), the issue, and
what the caller passes, "none" for each input it does not pass:
- **Checks to rerun.** A PR with any check or fixture runner to rerun (a course, `site/`,
  `specs/*/checks/` in `mise exec -- gh pr diff <pr> --name-only`): the reviewer gets
  `isolation: "worktree"`, and the brief has it check out the PR head detached. Its worktree
  holds no issue branch; the caller removes it (`/feyn-deliver` step 6.1, 6.2 and 6.4). That
  reviewer reads [worktree-agent.md](../../reference/worktree-agent.md) first: the rules and
  the Claude Code behaviours of an agent in a worktree (the brief names it).
- **A draft PR** (a decision awaited): say so; a decision awaiting the maintainer's answer is
  not a finding.
- **An agent-workflow run.** The run ids `wf_<id>` and their transcript directory.
- **A blind run.** The deleted paths and the worktree.
- **A `migrate-concept` PR** (the S1-10 sub-issues). The [migration variant](#migration-variant),
  appended to the brief; with no prototype of the concept, the run ids given are "none" (the PR
  still cites its run id).

Wait for its reply; do no review of your own in parallel.

## 3. Return the report

Reply with a heading `Fresh-agent review of PR #<pr>`, then the report as the reviewer wrote
it: the verdict per Done when statement, the blocking findings, the non-blocking findings, what
it could not check. Nothing cut, reworded or judged: the caller decides what to fix. Add the
path of the reviewer's worktree when it had one, for the caller's clean-up.

## Reviewer brief

```
You review PR #<pr> (branch <branch>) on feyn, which claims to deliver issue #<n>. You are
not its contributor: trust nothing in the PR body or in any summary; recount and recheck
every claim yourself. Read CLAUDE.md, the issue (`mise exec -- gh issue view <n>`) and the
files it lists, then the PR (`mise exec -- gh pr view <pr>`, `mise exec -- gh pr diff <pr>`); read a file at the PR's
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
  (`mise exec -- gh pr diff <pr> --name-only`), rerun them;
- evidence from an agent-workflow run
  (<run ids wf_<id> and transcript directory, or "none">): read the run's transcripts and check what its agents actually read and did, not only what
  they output. The directory moves with the work session's working directory (Claude Code,
  observed 2026-10-28, #130); not found: `find ~/.claude/projects -type d -name 'wf_<id>*'`.
  A blind run (<the deleted paths and the worktree, or "none">): each agent's `"cwd"` is that
  worktree, and no tool call reads a deleted path or the main checkout's copy of it, or runs
  `git` (the workflow's agents are told not to use git: a `git` call can reach the deleted
  file through history);
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

### Migration variant

Appended to the reviewer brief for a PR that delivers a `migrate-concept` run (rule D on #23,
2026-10-28: the comparison with the old course is dropped; what counts is the quality of the
new concept):

```
This PR migrates concept <n> into <concept folder>. Judge the new concept, not its likeness to
the old one:
- against specs/linear-course/SPEC.md: the reader text of concept.md, the frontmatter, the
  three files of section 4, and each diagram under section 7.2 (open the SVGs and the
  renderings of the report);
- against specs/linear-course/PROTOCOL.md: what the teacher reads in teaching.md and
  sources.md;
- under rules A to C of #23: glossary-order failures listed under Checks, not fixed (A); the
  citation line of « Consignes » in its one form, no teaching content added (B); each orphan
  reference tied to the claim it supports or removed, the PR saying which (C);
- read the old concept once (<old concept file>, <site page>), as the only guard against a
  passage lost: name a lost passage as a finding, never a rewording that keeps the meaning.
This replaces the brief's bullet on evidence from an agent-workflow run: read the run's
transcripts only when a hand migration of this concept existed before the run (a prototype in
construction/notes/), to check that no agent of the run read it. With no prototype, the
transcripts are not read.
```
