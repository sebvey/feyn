# 01. Vision and scope

## Why we refactor

`parcours-po` and `parcours-po-website` are a POC that succeeded: a course of 18 concepts and
2 annexes, a teacher that teaches it in Claude Code, a site that publishes it. Before scaling,
the POC's couplings cost more than they return:

- The site is a **rewritten copy** of the course: one MDX per concept, three `.ts` files copied
  by hand (domains, glossary, storyline), sha256 stamps over the whole concept file. The
  example bank (teacher-only) sits in the same file as the reader text: any fix to the bank
  invalidates the stamp and triggers a site realignment that changes nothing (five
  realignments in two days at brainstorm time).
- The teacher (`CLAUDE.md`) mixes the **generic protocol** (one question per message, wait for
  the answer, save points) with **course specifics** (site address, bike storyline, file
  names). A second course would require copying it.
- **Diagrams** are Astro components of the site; the teacher cannot show them.
- Learner memory lives on `learner/<nickname>` branches of the course repository, with a CI
  check to keep `main` clean: a patch.
- The maintenance process is a 250-line monolithic skill, a backlog in local folders (113
  tickets), 65 ADRs; readable by one maintainer, not by contributors.

## What we scale

In the maintainer's order of importance:

1. **Several courses.** `parcours-po` first; a second course on the same spec next, to prove
   the spec is not `parcours-po`; `pdsf-discovery` later, which will likely need another spec
   (a discovery course, non-linear).
2. **Other contributors**, French-speaking, who write course files and review.
3. **Faster course evolution**, hence frictionless builds (site, classroom).
4. **Several learners**, later; the course is still a beta that needs tests by other users.

## Principles

- **One source of truth per concept.** Everything the site and the teacher show comes from a
  course file, without rewriting. What does not come from a course file does not exist.
- **The spec separates the generic from the specific.** Whatever holds for every course of the
  same type (shape, protocol, checks, drawing contract) is in the spec; whatever is one
  course's own (concepts, storyline, glossary, diagrams, durations, colour) is in the course.
- **Outputs are builds.** The site and the classroom are produced by scripts from the course;
  never hand-edited; no version of their own.
- **Claude Code is the only framework** of the teacher and the agentic layer, for now. No
  abstraction for another harness.
- **Native, short, as commands.** The agentic layer is made of short single-responsibility
  skills, not a manual. A rule lives in the skill that applies it.
- **The repository is the only memory** between sessions, for the maintainer as for
  contributors; GitHub Issues carries the work in progress.
- **Reserved vocabulary.** A term means one thing (`13-glossary.md`); generic words are not
  used where a reserved term exists.

## What we rule out

- Cloning vierbein (copied agentic layer, imported agreements): judged clumsy.
- PDSF's multi-harness portability (`AGENTS.md`, `.agents/skills`, `curl | sh` bootstrap), its
  git-flow (`develop`, integration branches), its software pipeline (spec, tickets,
  ready-for-agent, auto-merge).
- A permanent channel per branch; previews are per PR.
- A Claude Code or Cowork plugin for the teacher: the classroom makes it unnecessary for now
  (ticket T-034 absorbed).
- Mermaid as a diagram format (see `04-diagrams.md`).
- Carrying over git history, the 113 tickets, the 65 ADR files, the changelog, learner memory
  (see `10-migration.md`).
