# Rules for an agent in a worktree

Read first by every agent that works in a worktree: the contributor of `/feyn-deliver`
([its brief](../skills/feyn-deliver/contributor-brief.md)) and the reviewer of
`/feyn-pr-review` that reruns checks. A line ending with a mark is a Claude Code behaviour
([contributing](../../docs/contributing.md), "Tool behaviours").

## Git and the tools

- Before any commit, run `git config --show-origin user.email` and check it shows the
  workspace identity (not empty). Never `git config user.email` nor `git -c user.email=`.
- `git` plain; `gh` and `node` through `mise exec --`.
- The shell is zsh: quote globs passed as arguments (`grep --include='*.md'`, not
  `--include=*.md`).

## Claude Code behaviours

- Do NOT `git switch main` (main is checked out in the main checkout): it fails in a worktree
  (Claude Code, observed 2026-10-27, #115).
- `git push` can fail to resolve github.com from the sandbox while `gh` works; retry the push
  outside the sandbox (Claude Code, observed 2026-10-27, #27).
- Spawned with isolation, a compound shell command (`&&`, a heredoc) is refused as too complex
  to verify it stays in the worktree: write files with the Write and Edit tools and run one
  plain command at a time (Claude Code, observed 2026-10-29, #249).
- Spawned with isolation, your worktree is removed when you stop with no file change
  (Claude Code, observed 2026-10-28, #171).
- Spawned with isolation, you cannot write nor run git in a worktree other than yours: Edit,
  `git -C` and `cd` to it are refused (Claude Code, observed 2026-10-28, #178).
- You cannot ask the maintainer: work needing their acceptance runs in two phases
  (Claude Code, observed 2026-10-27, #27).
