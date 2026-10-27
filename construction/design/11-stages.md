# 11. Stages

Order: course, teacher, site, agentic layer. Reasons: the course is what the teacher and the
site consume, so it comes first; the teacher is what the learner uses, so before the site; the
prod site does not move during stages 0 to 2 (it stays aligned on the freeze, at no cost); the
full agentic layer comes last because stages 1 to 3 are driven with stage 0's minimum, and by
then we know what contributors need.

During stages 0 to 3: freeze of `parcours-po`, apart from a blocking fix.

## Stage 0: foundation

Before: `parcours-po` at tag `course-v2.5.0`, site 2.4.1 aligned and deployed, backlog empty
(true on 2026-10-27); freeze announced.

Done:
- repository `sebvey/feyn` created, public, empty; clone in `~/code/workspaces/perso/feyn/`;
  `.gitignore` with `.sve/`;
- root `CLAUDE.md`, `README.md` (with the "course answers are visible" warning), folder
  skeleton (`02-monorepo.md`), `docs/glossary.md` from `13-glossary.md`;
- issue template, state, area and type labels, milestones stage 0 to stage 4;
- skills `/ticket`, `/start`, `/finish`, `/decide`; `.claude/settings.json`;
- cross-cutting decisions rewritten in `docs/decisions/`: `monorepo-feyn`,
  `two-versioned-objects`, `three-channels`, `language-policy`, `decision-format`,
  `public-repo-for-now`, `reserved-vocabulary`;
- issues of stages 1 to 4 created (one umbrella issue per stage, sub-issues as we go);
- repository `sebvey/feyn-site` created, public, empty, with a `gh-pages` branch and Pages
  enabled; deploy key set.

Done when: the first stage 1 issue has been created, taken with `/start` and closed by a PR
with `/finish` in the new repository.

## Stage 1: the spec and the course

Done:
- `specs/linear-course/SPEC.md` v1: structure, protocol (distilled from today's `CLAUDE.md`
  rules and the teacher's ADRs, after the distillation pass validated by the maintainer),
  drawing contract, checks; `lang/fr.yaml`; `templates/`; `checks/`;
- `courses/parcours-po/`: `course.yaml`, `plan.md`, `glossary.md`, `storyline.md`, `domains/`,
  the 20 concept folders migrated by the agent workflow, new `CHANGELOG.md`;
- decisions: `specs/linear-course/decisions/` (what comes from the teacher's ADRs and is not a
  rule), `courses/parcours-po/decisions/` (bike storyline, team in sprints);
- agent workflows `migrate-concept`, `course-batch` and `taught-check` ported.

Done when: the checks pass on the course; the full `taught-check` passes; the old / new
comparison report is empty or explained; and **the guard**: the old teacher (`CLAUDE.md` of
`parcours-po`, pointed at the new course by a disposable adapter that projects `course.yaml`
into `map.md` and concatenates `concept.md` + `teaching.md`) still teaches one concept in a
fresh test on Sonnet. The migration must not change what is taught, which is why it precedes
the new teacher.

## Stage 2: the teacher and the classroom

Done: `teacher/CLAUDE.template.md`, `build-classroom`, `/classroom` skill, `course.lock`,
teacher skills (`learner-onboarding`, `reset-learner`, `show-diagram`), `/fresh-test` skill,
learner memory in the classroom, `site_url` per channel; `teacher/decisions/`.

Done when: a fresh test on Sonnet, in a classroom built from `main`, goes through domain 1 as
today (same scenario as today's §5); a classroom rebuilt from another ref keeps `learner/`; a
requested diagram shows in the desktop.

## Stage 3: the site

Done: `site/` reads `courses/<id>/`; language pack for labels; SVGs served; footer with course
version and sha; prod, next and preview channels; CI workflows deploying to `feyn-site`;
`verify.mjs` ported; `/publish`; redirect of the old site; archive of both old repositories;
`site/decisions/`.

Done when: `verify.mjs` passes; the capture diff between the old site (freeze) and
`/next/parcours-po/` is explained page by page (decided changes or cleaner components) and the
maintainer judges the site equivalent; `parcours-po/v0.1.0` is published in prod; the prod
classroom is built from that tag.

## Stage 4: the rest of the agentic layer

Done: `/health`, `quality-review` and `site-verify` agent workflows, support skills (triage,
arbitration, test scenarios), full CI, repository docs for a contributor (`docs/contributing.md`),
rewritten issue of T-023 (course creation chain) ready to be taken; `construction/` removed and
the Construction section of `CLAUDE.md` with it.

Done when: `/health` is green; a fictional contributor (fresh subagent) takes a course issue and
delivers it by PR following only `README.md` and the skills.

## After

A second course on `linear-course` (proof the spec is not `parcours-po`); tests by other
learners towards `1.0.0`; `pdsf-discovery` and its spec, later.
