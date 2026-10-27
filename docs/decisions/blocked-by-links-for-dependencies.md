---
date: 2026-10-27
issue: 89
status: accepted
area: repo
---

Without this, an agent would run `/start 18` (S1-05) while #87 is open: it would write
`lang/fr.yaml` without `headings.onboarding` and with the keys `memory_headings.role` and
`memory_headings.before` that #87 removes, and the key check would break when #87 merges. And a
night script would run a task whose new blocker is written nowhere in its `depends:` list.

A dependency between issues is a GitHub blocked-by link, and nothing else: one issue is blocked
by another when it cannot start before the other is closed. `/ticket` asks for the links when it
creates an issue and shows them when it reads one; `/start` refuses an issue with an open
blocker; `plan-to-issues` sets the links; the night scripts rely on `/start`'s refusal. This
replaces the « Depends on: » line of the issue body and the `depends:` lists of the night
scripts. Two issues that only edit the same file are not linked: they land one after the other,
which the PR review sees. A block that waits on the maintainer stays the label
`blocked:maintainer` (decision `blocked-is-a-label-not-a-state`).

## Options ruled out

- The « Depends on: » line in the body: no tool reads it, and an issue created later is never
  added to the line of the issues it blocks.
- Sub-issues: they say "part of", not "after"; S1-10's concept migrations use them for that.

## Consequences

- On 2026-10-27 every « Depends on: » line of the open issues became a link (46 links), plus #87
  blocking #18 and #30, and the « Depends on: » lines were removed from the issue bodies. The
  Relationships panel of an issue shows its links.
