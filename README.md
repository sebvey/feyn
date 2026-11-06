# feyn

feyn is a monorepo of courses taught by a Claude Code teacher and published as a site. A course is a set of source files under `courses/<id>/`, written against a spec in `course-specs/`; the teacher template in `classroom-builder/` turns a course into a classroom, and the engine in `site-builder/` builds the site from it.

> **The expected answers of every course are visible in this repository.** It is public for now: the unpublished fields of the concept files (expected answers, instructions) can be read by anyone. This is acceptable for a beta with trusted testers; do not read the concept files here if you want to learn from the course.

## Map

| Folder | Holds |
|---|---|
| `course-specs/` | the specs, one per type of course (`linear-course`: contract, lexicons, checks, templates); rules in `course-specs/README.md` |
| `spec-directives/` | the spec directives, one folder per MAJOR; `README.md` defines the four readers of a spec; the tests of a spec's files (`check-spec`), the `lib/` and the package the checks load, the directives' `decisions/` |
| `courses/` | one folder per course, `courses/<id>/`; none until the founding course, archived in the history, is re-created (epic #520). The bench course every spec change is tried on is the spec's example course, `course-specs/linear-course/1/course/examples/cafe/` |
| `classroom-builder/` | teacher template, classroom build script (`build-classroom`: it runs the spec MAJOR's `teacher/build/` and writes the classroom, its teacher skills included) and its test (`test-build`), the fresh tests (`fresh-test`) |
| `site-builder/` | the site engine (Astro); reads `courses/` directly |
| `docs/` | `vision.md` (what feyn is for), `decisions/`, `glossary.md`, `contributing.md`, `kanban.md` (the frame of the work) |
| `.claude/` | `skills/` (the procedures run on their own), `agents/` (project subagents), `workflows/`, `reference/` (what a thing is, and the procedures only ever a step of other skills), `decisions/`, `scripts/` (the scripts a skill and an agent both run); decisions `claude-folder-layout`, `one-moment-one-file` |
| `.github/` | issue template and CI workflows |

## Contributing

1. Every change starts from an issue: an idea, a story or an epic ([docs/contributing.md](docs/contributing.md), "How the work is organised").
2. Work on a branch and open a pull request; nothing lands on `main` without one.
3. The whole flow, the labels and the maintainer's part are in [docs/contributing.md](docs/contributing.md).
