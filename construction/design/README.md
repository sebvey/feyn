# feyn: outcome of the refactoring brainstorm

Date: 2026-10-27. Source: brainstorming sessions between the maintainer (Seb) and the agent,
starting from `parcours-po` and `parcours-po-website`, with `.sve/feyn-brainstorming.excalidraw`,
`nessie-ooo`, `vierbein` and `prompt-driven-software-factory` (PDSF) as material.

This folder is the maintainer's review support, kept in `construction/design/` (versioned,
removed at stage 4). The implementation plan is beside it in `construction/plan/`. Vocabulary follows `13-glossary.md`, which
is the draft of the repository glossary. Nothing written here is implemented or frozen yet.

Quotes from the course stay in French: the course is French material, and we never translate
a quote.

## What we do, in six lines

1. A public monorepo `feyn` replaces `parcours-po` and `parcours-po-website`; both old
   repositories are frozen, then archived. The site is published to a public artifact
   repository (`feyn-site`).
2. A **spec** (`linear-course`) fixes the shape of a course: file structure, pedagogical
   protocol, drawing contract, checks. A course declares its spec and version.
3. Each concept is **one source**, a folder with reader-facing files (site) and a teacher-only
   file. The site and the teacher's classroom are **builds** of it, without rewriting.
4. The **teacher** is a generic `CLAUDE.md` built from the spec, served in a **classroom**
   built outside the repository, holding the course copy, a `course.lock` and learner memory.
5. The **agentic layer** is native Claude Code: short command skills, agent workflows, GitHub
   issues as the only backlog, decisions by slug stored next to what they bind.
6. Two versioned objects (course, spec), tooling at HEAD; three channels (prod by tag, next
   from `main`, preview by PR).

## Files

| File | Concern |
|---|---|
| `01-vision.md` | Why we refactor, what we scale, principles, what we rule out |
| `02-monorepo.md` | Tree, GitHub repositories, visibility, language, how much lives at the root |
| `03-spec-linear-course.md` | The spec: concept folder, `course.yaml`, protocol, language pack, checks |
| `04-diagrams.md` | The SVG drawing contract, what we tested, what we rule out |
| `05-teacher-classroom.md` | The generic teacher, the classroom, `course.lock`, learner memory |
| `06-site.md` | The site: built from the course, channels and addresses, deployment |
| `07-versions-channels-flow.md` | Versioned objects, semver rules, channels, git flow |
| `08-agentic.md` | Skills, agent workflows, issues and labels, permissions; what we take and refuse from PDSF and vierbein |
| `09-decisions.md` | Decision format, slug identifiers, groups, entry bar |
| `10-migration.md` | Freeze, what carries over, what dies, decision distillation, course migration |
| `11-stages.md` | Stages 0 to 4, their done-when, the order and its reasons |
| `12-open-points.md` | What remains to decide, and what the agent proposed uncontested but without an explicit decision |
| `13-glossary.md` | The repository glossary: reserved terms and the generic words they replace |

## Decisions the maintainer made during the brainstorm

- Target scale: several courses, other contributors, faster course evolution; several
  learners later.
- One source per concept, reader-facing and teacher-only parts, site extracted mechanically;
  a bank of specs, one spec per type of course.
- Monorepo, site published apart. Public repository for now.
- Generic teacher, Claude Code as the only framework for now.
- The spec owns structure and formats, the pedagogical protocol, the checks.
- The concept changes shape: yes. The classroom as a build: yes.
- Diagrams defined in the course must serve both the teacher and the site.
- Do not clone vierbein; take the GitHub issues and project idea. Look at PDSF for the
  "all skills" approach, without its harness-agnostic side.
- The site's ADRs are not a constraint.
- New repository, new site under a new name, learner memory dropped, ADR and ticket history
  not carried over (the marrow of the ADRs is extracted), tickets in GitHub as early as
  possible.
- Changelog not carried over, the course restarts at 0.x.
- English everywhere except what touches French course material.
- Vocabulary pass: reserved terms, non-generic; `stances` + `neighbors` for the old `ecoles`.
- Open points settled on 2026-10-27: `feyn-site`, squash merge, audience in `plan.md` plus one
  line in `course.yaml`, one term `objective`, domain « accroches » dropped, CLI teacher
  describes and says so, second course named later (`12-open-points.md`).
