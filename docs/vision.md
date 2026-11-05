# What feyn is for

The purpose of feyn, the yardstick a change is judged by, and the lessons it was built on. It is read at the moments where one judges: `/feyn-refine-option` asks it of an option before its staleness check, `/feyn-brainstorm` and `/feyn-triage` read it first. It restates no decision: each decision keeps its own counterfactual, and this file names a decision by its slug where one grounds a point. A change to this file is a decision ([contributing](contributing.md), "Policies").

## Two products, one source

feyn makes two products from one source, a course:
- a **teacher**, which teaches the course to a learner in a teaching session in Claude Code;
- a **site**, which publishes the course for the reader.

The spec, its checks and the agentic layer are worth what they bring to the two products: a spec that no product consumes is premature. Several courses, other contributors and several learners come after, and are judged the same way.

## The yardstick

A change of `linear-course` counts when the bench course `courses/po-essai/` (two concepts) follows it in the same PR and its checks pass on it. The site is the product being built; the teacher is frozen until the brainstorm on the protocol rules (idea #597), and comes back after it (decision `teacher-frozen-until-the-protocol-brainstorm`). Small and proven over complete: a change proven on two real concepts is worth more than a complete spec judged on paper.

## The lessons of parcours-po

feyn was rebuilt from a first project that worked: `parcours-po`, a course of 18 concepts and 2 annexes taught in Claude Code, and its site `parcours-po-website`. Three of its couplings are what feyn is built against:
- The site was a copy of the course rewritten by hand and kept in line by sha256 stamps: five re-alignments in two days.
- The teacher was one `CLAUDE.md` of 257 lines, the generic protocol mixed with the course's specifics (its site address, its storyline, its file names): a second course would have copied it.
- In feyn itself, concept 9 of `parcours-po` wrote the matter of one leaf three times: the reader section of its `concept.md`, the « Explication » of its first case and its instruction (epic #475).

Hence three lessons:
- **A thing is written once**, in the file of the reader who needs it first; every other reader is served from there (decision `one-source-two-builds`).
- **The generic and the specific stay apart**: what holds for every course of a type is in the spec, what is one course's own is in the course (decision `onboarding-in-plan` applies it to the teacher's posture and onboarding questions).
- **Outputs are builds**: the site and the classroom are produced from the course by scripts, never edited by hand (decision `one-source-two-builds`).

The course itself is archived at the tag `parcours-po/v0-fondateur` and re-created through the creation path (epic #520; decision `parcours-po-archived`).

## The lesson of feyn's first month

Stated by the maintainer on 2026-11-03: the spec was aimed too big, with nothing concrete to judge it by, and the project lost sight of the teacher. That day an epic of the spec was refined with care while the spec could not build a teacher, and nothing in the tree said what feyn is for (idea #481). Hence the yardstick above, and the bench course it names: a change is proven on something small and real, in the PR that makes it.

## What is still ruled out

- Another harness than Claude Code, for the teacher and for the agentic layer: no abstraction for one, for now.
- A Claude Code or Cowork plugin for the teacher: the classroom makes it unnecessary, for now.
- Mermaid as a diagram format (decision `svg-only-diagrams`).
- Carrying over the founding project's history: its git history, its tickets, its ADRs, its changelog, its learner memory (decision `monorepo-feyn`).
