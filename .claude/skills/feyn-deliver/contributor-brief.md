# Contributor brief

The brief `/feyn-deliver` step 2 fills in and gives to the contributor agent.

It cites only what an agent can read itself: repository files on `main`, issues and their
comments, PRs. A maintainer's note is never cited: its content goes into the issue when it
concerns that slice only, into the repository by a slice when other slices or later agents will
use it.

```
You are a feyn contributor working on GitHub issue #<n> ("<title>") in the repo at your current
working directory (a git worktree of <main checkout path>). Read
`.claude/reference/worktree-agent.md` (the rules and the Claude Code behaviours of an agent in a
worktree), then CLAUDE.md, then the issue (`mise exec -- gh issue view <n>`), then its "Reads"
files.

## How to run the cycle (in a worktree)
Follow `.claude/skills/feyn-issue-branch/SKILL.md` for #<n>, adapted to a worktree:
- In place of its `git switch main`: `git fetch`, then
  `git ls-remote --heads origin <type>/<n>-<slug>`. The branch exists: switch to it
  (`git switch <type>/<n>-<slug>`) and say so, as /feyn-issue-branch step 3 says. Otherwise
  `git switch -c <type>/<n>-<slug> origin/main` and `git push -u origin <type>/<n>-<slug>`.
- Set the issue's Status to In progress as /feyn-issue-branch says.
Then do the work, wrapping the lines you write at the width of the file you edit, then follow
`.claude/skills/feyn-pull-request/SKILL.md` to push and open the PR as a draft: add `--draft`
to its `gh pr create` (step 6). The PR stays a draft until the review and the corrections are
done; the orchestrator marks it ready at the hand-over, and it needs no "Awaiting" section.
Skip its step 7: the orchestrator runs the review. Leave the Status In progress (the
orchestrator sets Ready for review at the hand-over). Do NOT merge. No signature or
generated-by line in the PR body (the squash uses it as the commit message).

## The work
<the To do items this agent owns, with what the orchestrator already knows: files to match,
reserved terms, counterfactuals the maintainer accepted (verbatim, with the date)>

## A decision for the maintainer
A choice the issue does not settle, or a /feyn-decision decision whose counterfactual the maintainer
has not accepted: open the PR as a draft, put `blocked:maintainer` on the issue only (not the
PR), write an "Awaiting the maintainer" section at the top of the body (question, options,
recommendation), and stop. The work runs in two phases (`worktree-agent.md`): you deliver what
does not depend on it, the maintainer answers, then you are resumed with the answer: apply it
and remove the section; the PR stays a draft until the hand-over.

## An agent-workflow run
You have no Workflow tool. A Done when that needs a run: make it runnable, open a draft with
an "Awaiting the orchestrator" section at the top (exact script path and arguments), and stop.
The orchestrator runs it and resumes you with the result: apply it and remove the section; the
PR stays a draft until the hand-over.

Run the checks that exist (as /feyn-pull-request says). When done, reply with: branch name, PR URL, files
changed, checks run and their results, and anything you were unsure of. Stay available for a
corrections pass: review findings may come back to you.
```
