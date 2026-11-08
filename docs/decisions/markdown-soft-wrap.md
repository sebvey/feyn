---
date: 2026-11-05
issue: 601
status: accepted
area: repo
---

Without this, an agent would keep wrapping the prose of a Markdown file at 100 columns by habit, and a human editing it would redo the breaks by hand, so the diff of one changed phrase shows the whole paragraph reflowed (PR #445: one phrase, nine lines).

The prose of a Markdown file of the repository is soft-wrapped: one paragraph per line, never wrapped at a width; a list item is one line, its sub-items and its later paragraphs their own lines. The prose inside an HTML comment follows the same rule. Tables, lists, code blocks, frontmatter and headings stay as Markdown wants them, and a code block is copied as is, the prose inside it included; a hard break Markdown means (two trailing spaces) stays. The editor and the renderer (GitHub, the site) wrap the text for the reader. The files under `fixtures/` and `test-fixtures/` are left as they are: their tests cite their line numbers. No tool enforces the rule: it is written once, in the project instructions (`CLAUDE.md` imports them, every project subagent preloads them), where every agent reads it.

## Options ruled out

- A formatter kept with the hard wrap (Prettier `proseWrap: always`): a tool to install and run before each commit, and the diff of one changed phrase still shows the whole paragraph.
- `courses/` left out: a course is edited by hand as much as the rest, with the same diffs.
- The files under `fixtures/` and `test-fixtures/` reflowed too: their tests cite `file:line`, and every expectation would move.

## Consequences

- A Done when that cites a line number of a file reflowed on 2026-11-05 points elsewhere after it; the start of a work item tolerates a line number moved (`.claude/reference/done-when.md`).
