# The cleanup of a run

How the worktrees and the local branches a delivery leaves are removed: a workflow run's, a
reviewer's, the scratch worktree of a merge of `main` into an integration branch, a Done when's,
an issue branch after its PR. One worktree policy for all of them. When to clean (after each
run, after a merge) is the caller's step; the caller passes the parameters below. Nothing here
deletes a remote branch.

## The parameters

- **The worktrees**: their paths. A workflow run's are `.claude/worktrees/wf_<run id>-<n>`, on
  a branch `worktree-wf_<run id>-<n>` (`git worktree list --porcelain` lists them); a
  reviewer's, `.claude/worktrees/agent-<id>`, on a branch `worktree-agent-<id>`; the scratch
  worktree of a merge of `main`, a detached path of the scratchpad, on no branch; the worktree
  a Done when's command runs in ([done-when.md](done-when.md)), detached at the base, on no
  branch.
- **The base**, for a run that opened no PR only (step 3): `main`, or the epic's integration
  branch.
- **The branch on `origin`** the worktrees' `HEAD` must be on: a PR not merged, its head
  branch; the scratch worktree of a merge of `main`, or the reviewer of a whole integration
  branch, that integration branch; a PR merged, none (its branch goes with the merge); a run
  that opened no PR (`pr` 0), none; a Done when's worktree, none.
- **The local branch** the delivery made (an issue branch `<type>/<n>-<slug>`, an integration
  branch), with its PR merged or not; none when the caller cleans worktrees only.

## A worktree

For each one, in order; a check that fails stops the cleanup of that worktree and is shown to
the caller, who tells the maintainer:

1. **Not locked**: `git worktree list --porcelain` prints no `locked` line under it. A run's
   worktree locked: its agent still runs, wait. A reviewer's, once the review and its
   verification are done: stop its agent (`TaskStop`), then `git worktree unlock <path>`. The
   worktree is locked while its agent runs (Claude Code, observed 2026-10-28, #128).
2. **Nothing but `node_modules`**: `git -C <path> status --porcelain` prints nothing, or
   nothing but `node_modules`, which a check links from the main checkout
   ([done-when.md](done-when.md)) and `.gitignore` does not ignore as a link.
3. **Its `HEAD` kept**, when the caller names a branch on `origin` or the run opened no PR.
   A branch on `origin`: after `git fetch`, `git -C <path> branch -r --contains HEAD` names
   `origin/<that branch>`. A run that opened no PR: a worktree whose `HEAD` adds nothing to the
   base (`git -C <path> log origin/<base>..HEAD` prints nothing) goes; one with commits stays,
   named to the maintainer with the run's status.
4. **Remove** it: `git worktree remove --force <path>` (an untracked `node_modules` makes a
   plain remove refuse), then its branch, `git branch -D worktree-wf_<run id>-<n>` or
   `git branch -D worktree-agent-<id>` (a detached worktree has none).

A worktree already gone needs nothing: a worktree with no change at the end of its agent's turn
is removed ([worktree-agent.md](worktree-agent.md), "Claude Code behaviours"); a workflow
agent's, holding a change, is kept after the run (Claude Code, observed 2026-10-31, #348).

## The local branch

- **Its PR merged** (`mise exec -- gh pr view <pr> --json state` reads `MERGED`):
  `git branch -D <branch>`, `-D` since a squash merge leaves the branch unmerged in git's eyes.
  No such branch (`git branch --list <branch>`): nothing to do. Checked out in the work
  session's checkout: `git switch main` first. The remote branch goes with the merge, the
  repository deleting a PR's head branch on its merge (GitHub, observed 2026-10-31, #342);
  still there (`git ls-remote --heads origin <branch>`): tell the maintainer, never delete it.
- **Its PR not merged**: move the local branch to the PR's head, which a corrector's push
  (`git push origin HEAD:<branch>`, from a detached `HEAD`) does not move:
  `git branch -f <branch> origin/<branch>`, never the integration branch. A rerun's contributor
  switches to it and its push is a fast-forward; it stays until the merge.
