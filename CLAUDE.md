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
| `.claude/` | `skills/` (the HOW), `workflows/`, `reference/` (the WHAT), `decisions/`; decision `claude-folder-layout` |
| `.github/` | issue template and CI workflows |
| `construction/` | temporary: design, plan, notes, scripts; its fate is #232 |

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

## Skills

`/feyn-deliver <n>` delivers a Ready issue through a contributor agent, a fresh-agent review and
the hand-over to the maintainer. `/feyn-brainstorm` runs a brainstorm with the maintainer and
ends it in a proposal. Load the one that matches the request. The other `feyn-` skills are the
work-cycle tooling: called by them or by the moments without a skill (take an epic, triage), and
loaded directly for a one-off act.

## Non-negotiable rules

- Nothing lands on `main` without a PR; squash merge; title `<type>(<area>): <summary>`.
  Never force-push.
- A teacher behaviour decision needs two tests.
- A course changes only through an issue or a batch.
- Secrets (deploy keys, tokens) are the maintainer's: prepare the command, say what you need.

## Construction

This section goes with `construction/`, whose fate is #232. Until then, read
`construction/README.md` first: it says how a work session goes. The design is in
`construction/design/`, the plan of 2026-10-27 in `construction/plan/` (abandoned on
2026-10-29 for epics, decision `themes-and-release-milestones`: read as material only). A
session writes its note in `construction/notes/<id>.md`. Work is framed by epics, split one
slice at a time; a work session starts with an issue number. How the work is organised (epics,
slices, observations, milestones, the Project's views): `docs/contributing.md`, "How the work
is organised".
