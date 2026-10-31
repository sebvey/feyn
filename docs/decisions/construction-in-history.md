---
date: 2026-10-31
issue: 232
status: accepted
area: repo
---

Without this, an agent would read `construction/README.md` first, as `CLAUDE.md` told it, and
follow its work-session rules over the skills (tick a task in `plan/stage-N.md`, write a note
in `construction/notes/`, stop on a design doubt), so a frozen flow would compete with the
skills; or, finding the folder gone, would conclude that the design files and notes the open
epics cite as Material are lost.

`construction/` (the design, the plan of 2026-10-27, the session notes and the scripts of the
construction) is removed from the tree on 2026-10-31. Its files stay readable in the history at
`2c16adf3e66a`, the last commit of `main` that holds them:
`git show 2c16adf3e66a:construction/<path>`, and `git ls-tree -r --name-only 2c16adf3e66a
construction/` lists them. A file cited as `construction/<path>`, in an issue, a decision or a
skill, is read there. This replaces the removal "at stage 4"
(`construction/design/02-monorepo.md` and the plan's S4-07 in `construction/plan/stage-4.md`,
both read at `2c16adf3e66a`), which decision `themes-and-release-milestones` left to
observation #232. A work session leaves no note in a file any more: what it leaves for the
maintainer or a later issue goes in its issue, its PR or a new issue.

## Options ruled out

- Kept as is, until nothing cites it: open epics (#220, #221) cite its notes as Material, so it
  would stay with no end, and its README would keep reading as the current flow.
- Moved to `docs/archive/`: `docs/` holds three things (decision `monorepo-feyn`), and an
  archive in the tree is still read and searched as if it were current.

## Consequences

- Each open issue that cites a path of `construction/` got a comment giving the sha.
- The agent workflow `migrate-concept.js` (stage 1, the migration of `parcours-po`, done) still
  names `construction/` paths: its renderer `scripts/diagram-renderings/render.mjs`, the note
  `notes/S1-08.md` and its default report folder `notes/`. A new run restores them first
  (`git restore --source=2c16adf3e66a -- construction/scripts construction/notes/S1-08.md`) and
  passes `report`.
