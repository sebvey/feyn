# feyn

You are a feyn contributor, not a teacher. feyn is a monorepo of courses taught by a Claude
Code teacher and published as a site. Skills carry the detail; this file is the map.

## Map

| Folder | Holds |
|---|---|
| `course-specs/` | the specs, one per type of course (`linear-course`: contract, language packs, checks, templates); rules in `course-specs/README.md` |
| `courses/` | one folder per course, `courses/<id>/` (first: `parcours-po`) |
| `teacher/` | teacher template, teacher skills, classroom build script |
| `site/` | the site engine (Astro); reads `courses/` directly |
| `docs/` | `decisions/`, `glossary.md`, `contributing.md` |
| `.claude/` | `skills/` (the HOW), `agents/` (project subagents), `workflows/`, `reference/` (the WHAT), `decisions/`; decision `claude-folder-layout` |
| `.github/` | issue template and CI workflows |

`construction/` (design, plan, notes, scripts of the construction) was removed on 2026-10-31:
its files are read at `2c16adf3e66a` (`git show 2c16adf3e66a:construction/<path>`; decision
`construction-in-history`).

## Language

English for everything, except course material and quotes from it, which stay in French and
are never translated. French text: no em-dashes, no arrows.

## Vocabulary

Reserved terms live in `docs/glossary.md`. A generic word listed as "not" there is not used
where a reserved term exists.

## Commands

`git` plain (the work session carries the workspace identity); `gh` and `node` through
`mise exec -- <command>` (the work session's PATH can be stale). Never `git config user.email` nor `git -c user.email=`.

## Working with the maintainer

- For an action the maintainer does themself (merging, labels, repository settings, remote
  branches, Project), give the path in the GitHub web interface; a command only when the
  interface cannot do it.
- Never ask the maintainer to run a command you can run.
- Answer in the language of the conversation; the repository stays in English.
- No next topic while the previous one is open, a pending maintainer action included.
- A level-2 heading per topic when a reply holds several topics or opens a new one.
- A pass over a list opens each message with `<pass>: <n>/<N> treated · in progress: #<x>`.
- A list to work through lives in a file, not in memory.
- An item's frame (purpose, place) before what is wrong; English not translated systematically.

## Skills

`/feyn-deliver-epic <epic>` delivers a Ready epic on its integration branch, slice by slice
through the agent workflow `deliver-slice.js`, up to the hand-over of its epic PR.
`/feyn-deliver <n>` delivers a Ready observation (an issue with no parent epic) through the same
workflow, up to the hand-over of its PR to `main`; a direct delivery is made with
`/feyn-issue-branch` and `/feyn-pull-request`. `/feyn-brainstorm` runs a brainstorm with the
maintainer and ends it in a proposal. `/feyn-triage` runs a pass on the Backlog with the
maintainer. Load the one that matches the request. The other `feyn-` skills are the work-cycle
tooling: called by them, and loaded directly for a one-off act. A delivery work session starts
with an issue number. How the work is organised (epics, slices, observations, milestones, the
Project's views): `docs/contributing.md`, "How the work is organised".

## Non-negotiable rules

- Nothing lands on `main` without a PR; squash merge; title `<type>(<area>): <summary>`.
  Never force-push.
- A teacher behaviour decision needs two tests.
- A course changes only through an issue or a batch.
- Secrets (deploy keys, tokens) are the maintainer's: prepare the command, say what you need.
