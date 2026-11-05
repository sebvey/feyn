---
date: 2026-11-05
issue: 576
status: accepted
area: agentic
---

Without this, an agent writing a path skill would rewrite in it the start, the hand-over or the
cleanup of a story, and the copies would diverge: on `1494eec`, the run cleanup of
`feyn-deliver-epic` tolerated a worktree with `node_modules` and removed it with `--force`, the
one of `feyn-pr-review` stopped on anything `git status` printed, two contrary worktree rules.

One moment of the work cycle, one file: the procedure of a moment is written in one file, the
skill or the file of `reference/` that owns it (decision `claude-folder-layout`), and every other
file cites it. A path skill (`feyn-deliver-epic`, `feyn-deliver-story-alone`, the agent workflow
`deliver-story.js`, and on a direct delivery the work session that runs `/feyn-issue-branch` then
`/feyn-pull-request`) chains the moments and passes them their parameters (the base, the
worktree, the Status), and never rewrites a step of one. A policy shared by several
files is written once, in the file of the moment that owns it, otherwise in `reference/`, and
the others point to it. The moments and their owners are listed in `docs/contributing.md`, "How
the work is organised", which this decision does not copy. It replaces one file per path, where
each path skill held its own copy of the moments it runs.

## Options ruled out

- One path, one file (the state until #576): the start was rewritten by the agent workflow and
  by `feyn-deliver-epic`, the hand-over had three owners, the cleanup lived in five skills.
- Fixing the copies without reorganising: it keeps the copies, and with them the next defect.
- One file of all the shared policies: it does not say which moment a policy serves.
- A check that the copies agree: one more tool, written to keep the copies.
