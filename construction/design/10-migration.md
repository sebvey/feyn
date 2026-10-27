# 10. Migration

## The freeze

The freeze happens on the **current state**, which includes the changes made since the
brainstorm began (domain durations, T-117 and T-118; footer note, T-119; glossary flag,
T-120). As of 2026-10-27 that state is: course tag `course-v2.5.0` (no course change since),
site 2.4.1 aligned on it and deployed, backlog empty.

Sequence: verify the alignment; add the freeze line to both READMEs; the agent announces
"frozen" in one line. After that tag nothing moves in `parcours-po` or
`parcours-po-website`, apart from a blocking fix (done in the old format, migrated with the
rest). **Nothing is frozen until announced.**

## What carries over, what dies

| Carries over | Dies |
|---|---|
| the 20 concept files (8 sections), the 20 sources files, the 7 domain files, the course glossary, the storyline, the durations | the git history of both repositories |
| the reader text of the site's MDX (becomes the body of `concept.md`), the structured `ecoles` and `sources` of the frontmatter | the `alignement` stamps, `src/data/*.ts`, `check-alignment.mjs` |
| the SVGs, extracted from the 23 Astro components | the Astro diagram components |
| the two agent workflows, the test scenario, the two-tests rule, the session diagnosis | the monolithic maintenance skill, `maintainer/backlog/`, `maintainer/site/`, `maintainer/scripts/build-map.sh` |
| the marrow of the ADRs (below) | the 72 ADR files, the course `CHANGELOG.md`, the site `CHANGELOG.md` |
| the templates (concept, domain, sources, learner), adapted to the new shape | learner memory (`learner/seb`), the `learner/*` branches, the `learner/` CI check |
| T-023 and T-050h, rewritten as issues | the 111 other tickets; T-034, T-050d, T-050i, T-052, T-056 are absorbed by the refactoring |

## Decision distillation

One pass, once, by a subagent (Sonnet is enough) that reads the 72 ADRs and classifies each in
a four-column table:

1. **teacher behaviour rule**: becomes a numbered rule of the spec's protocol, normative,
   testable, without history; a "why" line only if it protects against a tempting regression.
   The majority (to verify by the pass): fixes decided after a failure seen in a fresh test,
   which a new teacher would repeat without them;
2. **process rule** (two tests, fresh test on Sonnet, PR flow, diagnosis): goes into the skill
   that applies it;
3. **architecture decision still valid** (course semver, classroom as a build, one source two
   builds…): re-decided as a `feyn` decision, rewritten in English, in the format of
   `09-decisions.md`; five to eight expected;
4. **POC**: nothing.

The table comes back to the maintainer for validation before any writing; it is the only time
the old ADRs are reread. The pass runs at stage 1 (the protocol is written then); the stage 0
architecture decisions are done by hand upstream (there are few and we know them).

## Course migration

An agent workflow (`.claude/workflows/migrate-concept`), run once per concept, from the frozen
clones (`../pdx/parcours-po` at the tag, `../pdx/parcours-po-website` at the same time):

1. reads the concept file (`course/concepts/NN-*.md`), its sources, the site MDX (body +
   frontmatter), the concept's diagram components;
2. writes `concept.md` (frontmatter `stances`, `neighbors` and `diagrams` from the MDX frontmatter; body:
   objective, essentials, stances as prose, one section per leaf sub-concept from the MDX body,
   pitfalls, quick test from the concept file), `teaching.md` (instructions from
   « Sous-concepts », storyline facts and bank from « Banque d'exemples », diagram instruction
   from « Schéma »), `sources.md`, the extracted `.svg` brought under contract;
3. runs the spec checks on the concept;
4. a subagent compares old and new: nothing lost, nothing invented (semantic diff section by
   section), report.

Then, on the whole: `course.yaml` written from the `plan.md` tables and the domain
frontmatters; full `taught-check`; two-reviewer review (`quality-review` workflow); and stage
1's guard (see `11-stages.md`).

The migration is a course batch like any other: its branch, its 20 sub-issues, its reviews.
Not "by hand in one afternoon".

## After migration

- `parcours-po`: last commit "frozen, migrated to feyn", GitHub archive.
- `parcours-po-website`: last deployment, redirect page to `/feyn-site/parcours-po/`, GitHub
  archive.
- Local clones kept as long as the maintainer wants to compare.
