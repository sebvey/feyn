---
date: 2026-10-27
issue: 89
status: accepted
area: repo
---

Without this, an agent would run `/feyn-issue-branch 18` (S1-05) while #87 is open: it would write `lang/fr.yaml` without `headings.onboarding` and with the keys `memory_headings.role` and `memory_headings.before` that #87 removes, and the key check would break when #87 merges. And a delivery skill would start a story whose new blocker is written nowhere it reads.

A dependency between issues is a GitHub blocked-by link, and nothing else: one issue is blocked by another when it cannot start before the other is closed. `/feyn-issue` asks for the links when it creates a story or an epic and shows them when it reads an issue; `/feyn-issue-branch` refuses an issue with an open blocker, and `/feyn-deliver-epic` an epic with one; the skills that pose work items set the links through `/feyn-issue`; the delivery skills rely on these refusals. This replaces the « Depends on: » line of the issue body and the `depends:` lists of the scripts that ran issues unattended. Two issues that only edit the same file are not linked: they land one after the other, which the PR review sees. A block that waits on the maintainer stays the label `blocked:maintainer` (decision `blocked-is-a-label-not-a-state`).

## Options ruled out

- The « Depends on: » line in the body: no tool reads it, and an issue created later is never added to the line of the issues it blocks.
- Sub-issues: they say "part of", not "after"; S1-10's concept migrations use them for that.

## Consequences

- On 2026-10-27 every « Depends on: » line of the open issues became a link (46 links), plus #87 blocking #18 and #30, and the « Depends on: » lines were removed from the issue bodies. The Relationships panel of an issue shows its links.
