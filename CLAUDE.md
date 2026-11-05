# feyn

You are a feyn contributor, not a teacher. feyn is a monorepo of courses taught by a Claude Code teacher and published as a site. Skills carry the detail; this file is the map.

## What feyn is for

- Two products from one source, a course: a teacher that teaches a learner in a teaching session in Claude Code, and a site that publishes the course. The teacher justifies the rest.
- The yardstick: a change of `linear-course` counts when `courses/po-essai/` (the two-concept bench course) follows it in the same PR, its checks pass and the teacher teaches it.
- Not to lose from sight:
  - the teacher is the product: a spec no teacher consumes is premature;
  - a thing is written once, in the file of the reader who needs it first; a text neither counts nor copies a list another file holds, it points to that file;
  - small and proven over complete.
- The long form, with the lessons behind each line: [`docs/vision.md`](docs/vision.md).

## Map

| Folder | Holds |
|---|---|
| `course-specs/` | the specs, one per type of course (`linear-course`: contract, lexicons, checks, templates); rules in `course-specs/README.md` |
| `spec-directives/` | the spec directives, one folder per MAJOR; `README.md` defines the four readers of a spec; the tests of a spec's files (`check-spec`), the `lib/` and the package the checks load, the directives' `decisions/` |
| `courses/` | one folder per course, `courses/<id>/` (`po-essai`, the bench course every spec change is tried on; the founding course is archived in the history, epic #520) |
| `classroom-builder/` | teacher template, classroom build script (`build-classroom`: it runs the spec MAJOR's `teacher/build/` and writes the classroom, its teacher skills included) and its test (`test-build`), the fresh tests (`fresh-test`) |
| `site-builder/` | the site engine (Astro); reads `courses/` directly |
| `docs/` | `vision.md` (what feyn is for), `decisions/`, `glossary.md`, `contributing.md`, `kanban.md` (the frame of the work) |
| `.claude/` | `skills/` (the procedures run on their own), `agents/` (project subagents), `workflows/`, `reference/` (what a thing is, and the procedures only ever a step of other skills), `decisions/`; decisions `claude-folder-layout`, `one-moment-one-file` |
| `.github/` | issue template and CI workflows |

`construction/` (design, plan, notes, scripts of the construction) was removed on 2026-10-31: its files are read at `2c16adf3e66a` (`git show 2c16adf3e66a:construction/<path>`; decision `construction-in-history`).

## Language

English for everything, except course material and quotes from it, which stay in French and are never translated. French text: no em-dashes, no arrows.

The prose of a Markdown file is one paragraph per line, never wrapped at a width; tables, lists and code blocks as Markdown wants them; the files under `fixtures/` and `test-fixtures/` left as they are (decision `markdown-soft-wrap`).

## Vocabulary

Reserved terms live in `docs/glossary.md`, one entry per concept. A word an entry rejects is not used where its concept applies. Said by the maintainer, such a word is met, before acting, with "You said <word>, did you mean <reserved term>?", in the language of the conversation. No skill accepts it silently: no alias in a description, no argument read as its replacement.

## Commands

`git` plain (the work session carries the workspace identity); `gh` and `node` through `mise exec -- <command>` (the work session's PATH can be stale). Never `git config user.email` nor `git -c user.email=`.

## Working with the maintainer

- The skills follow the maintainer's personal instructions where they are loaded: their sections "Decisions that are mine" and "Reports and messages", and their other working rules, whatever file holds them (a global `CLAUDE.md`, or a `CLAUDE.local.md` beside this file). `CLAUDE.local.example.md` holds the maintainer's, as an example.
- Where none is loaded, a decision is put to the maintainer in this form: one subject per message; its frame (what the thing is and where it sits); a real example from the repository; the options in a table; the recommendation first, labelled as such; one question, asked once.

## Skills

`/feyn-deliver-epic <epic>` delivers a Ready epic on its integration branch, story by story through the agent workflow `deliver-story.js`, up to the hand-over of its epic PR. `/feyn-deliver-story-alone <n>` delivers a Ready story without an epic through the same workflow, up to the hand-over of its PR to `main`; a direct delivery is made with `/feyn-issue-branch`, `/feyn-pull-request` and the hand-over (`.claude/reference/hand-over.md`). `/feyn-brainstorm` runs a brainstorm with the maintainer, subject by subject, and ends it in a plan of work items posed through the skills of the cycle. `/feyn-triage <n> [<n> …]` triages with the maintainer the ideas they name, one at a time. `/feyn-refine-option <n>` runs with the maintainer the option refinement of one option, up to its commitment, rework or close. Load the one that matches the request. The other `feyn-` skills are the work-cycle tooling: called by them, and loaded directly for a one-off act. `/feyn-decision` writes or changes a decision; `/feyn-glossary-entry` adds or changes a glossary entry. A delivery work session starts with an issue number. The frame of the work is Kanban, with ADR for the decisions and GitHub flow for the branches (`docs/kanban.md`). How feyn applies it (the work items, epics and stories, and the ideas; the Statuses from Idea to Done; the moments of the work cycle, each with its one owner, and the paths that chain them; milestones; the Project's views): `docs/contributing.md`, "How the work is organised".

## Non-negotiable rules

- Nothing lands on `main` without a PR; squash merge; title `<type>(<area>): <summary>`. Never force-push.
- A teacher behaviour decision needs two tests.
- A course changes only through an issue or a batch.
- Secrets (deploy keys, tokens) are the maintainer's: prepare the command, say what you need.
