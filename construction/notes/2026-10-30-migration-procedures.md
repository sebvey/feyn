# Note, 2026-10-30: the migration procedures of the work cycle

These procedures served the S1-10 sub-issues (#23, sub-issues #146 to #165: the
`migrate-concept` runs). #237 removed them from `feyn-deliver`, `feyn-pr-review`, the
contributor brief and `worktree-agent.md`; their text and marks follow.

## From `feyn-deliver` step 1, under the agent-workflow run

- **The worktree.** A contributor that stops with no file change loses its worktree at the
  end of its turn (Claude Code, observed 2026-10-28, #171). Once it pushed its branch:
  `git worktree add -q <main checkout>/.claude/worktrees/<name> -B <branch> origin/<branch>`,
  `git -C <path> branch --set-upstream-to=origin/<branch>`, and resume it with that path.
- **A two-phase migration** (a run whose output a contributor then fixes and delivers, as the
  S1-10 sub-issues): the orchestrator creates the branch and the worktree itself before the
  run: `git fetch origin`, `git push origin origin/main:refs/heads/<branch>`,
  `git fetch origin <branch>`,
  `git worktree add <main checkout>/.claude/worktrees/<name> -B <branch> origin/<branch>`,
  `git -C <path> branch --set-upstream-to=origin/<branch>`; sets the Status to In progress
  (`/feyn-issue-branch` step 4); runs with absolute `dest` and `report` paths into that
  worktree, no `cd` (the workflow takes its spec root from an absolute `dest`). After the run,
  the contributor is spawned without `isolation`: its current directory is the main checkout,
  which its brief forbids it to touch; it works with absolute paths, `git -C <path>` and
  `gh pr create --head <branch>`, and its brief marks the steps of `/feyn-issue-branch`
  already done. A contributor spawned with `isolation: "worktree"` cannot write nor run git in
  another worktree: Edit, `git -C` and `cd` to it are refused
  (Claude Code, observed 2026-10-28, #178). Other issues keep the path above, where the
  contributor runs `/feyn-issue-branch` first.
- **A blind run** (a run that must not see a file). Its agents run in the work session's
  working directory (Claude Code, observed 2026-10-28, #130); a copy of the repository
  outside it cannot hold the work session: a `cd` there is reset, and `change_directory`
  did not move the next run (Claude Code, observed 2026-10-28, #171). In the run's
  worktree, delete the file (and the construction notes the workflow does not allow), then
  `cd <worktree>`: the work session's primary working directory moves there
  (Claude Code, observed 2026-10-28, #171). Run; then read `git -C <worktree> status
  --porcelain`, restore only the deleted paths the run did not rewrite (the construction
  notes), and `cd <main checkout>`. The reviewer searches its transcripts (step 3).
- **No other `cd`.** A `cd` into a worktree moves the work session even for one command, and
  a run launched then runs its agents there (Claude Code, observed 2026-10-28, #171): while
  a run is launched or running, absolute paths and `git -C <path>`.

## From `feyn-deliver` steps 2, 3 and 6

- Step 2: `Agent` with `isolation: "worktree"` (none for a two-phase migration, step 1).
- Step 3, what the caller passes to `/feyn-pr-review`: for a blind run the deleted paths and
  the worktree; for a `migrate-concept.js` PR (the S1-10 sub-issues), the
  [migration variant](#migration-variant) with what fills it: the concept, its folder, the old
  concept file and the site page.
- Step 6, last paragraph: A worktree you created (step 1, `.claude/worktrees/<name>`): steps 2
  and 3 the same way. It holds the issue branch, so there is no `worktree-agent-*` branch for
  it; but the lost worktree of its contributor leaves its `worktree-agent-<id>` branch behind
  (Claude Code, observed 2026-10-28, #171): delete that one with step 4. A contributor spawned
  without `isolation` (a two-phase migration) has no worktree of its own: no
  `worktree-agent-*` branch to delete.

## From the contributor brief

- Head: "(a git worktree of <main checkout path>; for a two-phase migration, the worktree
  <path>, your working directory being the main checkout)".
- How to run the cycle: "(Two-phase migration, spawned without isolation: your current
  directory is the main checkout: never edit, commit or switch there. The branch, the worktree
  <path> and the Status are done: skip their steps above. Absolute paths, `git -C <path>`,
  `gh pr create --head <branch>`.)"
- An agent-workflow run: "A worktree lost when you stopped with no file change
  (`worktree-agent.md`): the orchestrator creates one on your branch and resumes you with its
  absolute path; from then on (from the start, spawned without isolation), work on that path
  as `worktree-agent.md` says."

## From `.claude/reference/worktree-agent.md`

- Head: "Read first by every agent that works in a worktree, spawned with isolation or not".
- Git and the tools: "Told to work in a worktree by its absolute path (resumed on a new
  worktree, or spawned without isolation): never `cd`; absolute paths for every file,
  `git -C <path>` for every git command, including those of `/feyn-pull-request`
  (`git -C <path> status --porcelain`, `git -C <path> push`)."

## From `feyn-pr-review`

Step 2, what the caller passes:

- **A blind run.** The deleted paths and the worktree.
- **A `migrate-concept.js` PR** (the S1-10 sub-issues). The
  [migration variant](#migration-variant), appended to the brief; with no prototype of the
  concept, the run ids given are "none" (the PR still cites its run id).

The reviewer brief, end of the bullet on evidence from an agent-workflow run:

```
  A blind run (<the deleted paths and the worktree, or "none">): each agent's `"cwd"` is that
  worktree, and no tool call reads a deleted path or the main checkout's copy of it, or runs
  `git` (the workflow's agents are told not to use git: a `git` call can reach the deleted
  file through history);
```

### Migration variant

Appended to the reviewer brief for a PR that delivers a `migrate-concept.js` run (rule D on #23,
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
