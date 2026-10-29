# Contributor brief

The brief `/feyn-deliver` step 2 fills in and gives to the contributor agent.

```
You are a feyn contributor working on GitHub issue #<n> ("<title>") in the repo at your current
working directory (a git worktree of <main checkout path>; for a two-phase migration, the
worktree <path>, your working directory being the main checkout). Read
`.claude/reference/worktree-agent.md` (the rules and the Claude Code behaviours of an agent in a
worktree), then CLAUDE.md, then the issue (`mise exec -- gh issue view <n>`), then its "Reads"
files.

## How to run the cycle (in a worktree)
Follow `.claude/skills/feyn-issue-branch/SKILL.md` for #<n>, adapted to a worktree:
- In place of its `git switch main`: `git fetch`, then
  `git switch -c <type>/<n>-<slug> origin/main` and `git push -u origin <type>/<n>-<slug>`.
- Set the issue's Status to In progress as /feyn-issue-branch says.
(Two-phase migration, spawned without isolation: your current directory is the main checkout:
never edit, commit or switch there. The branch, the worktree <path> and the Status are done:
skip their steps above. Absolute paths, `git -C <path>`, `gh pr create --head <branch>`.)
Then do the work, then follow `.claude/skills/feyn-pull-request/SKILL.md` to push and open the PR;
skip its step 7: the orchestrator runs the review. Leave the Status In progress (the
orchestrator sets Ready for review at the hand-over). Do NOT
merge. No signature or generated-by line in the PR body (the squash uses it as the commit
message).

## The work
<the To do items this agent owns, with what the orchestrator already knows: files to match,
reserved terms, counterfactuals the maintainer accepted (verbatim, with the date)>

## A decision for the maintainer
A choice the issue does not settle, or a /feyn-decision decision whose counterfactual the maintainer
has not accepted: open the PR as a draft, put `blocked:maintainer` on the issue only (not the
PR), write an "Awaiting the maintainer" section at the top of the body (question, options,
recommendation), and stop. The work runs in two phases (`worktree-agent.md`): you deliver what
does not depend on it, the maintainer answers, then you are resumed with the answer and the
work resumes.

## An agent-workflow run
You have no Workflow tool. A Done when that needs a run: make it runnable, open a draft with
an "Awaiting the orchestrator" section at the top (exact script path and arguments), and stop.
The orchestrator runs it and resumes you with the result: apply it, remove the section, run
`mise exec -- gh pr ready <pr>`. A worktree lost when you stopped with no file change
(`worktree-agent.md`): the orchestrator creates one on your branch and resumes you with its
absolute path; from then on (from the start, spawned without isolation), work on that path as
`worktree-agent.md` says.

Run the checks that exist (as /feyn-pull-request says). When done, reply with: branch name, PR URL, files
changed, checks run and their results, and anything you were unsure of. Stay available for a
corrections pass: review findings may come back to you.
```
