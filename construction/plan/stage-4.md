Issues created on 2026-10-27; this file is no longer updated.

# Stage 4: the rest of the agentic layer

Milestone `stage-4`. Design: `design/08-agentic.md`, `design/02-monorepo.md` ("How much lives
at the root and in `docs/`"), `design/11-stages.md`.

Done when: `/health` is green; a fictional contributor (fresh subagent) takes a course issue
and delivers it by PR following only `README.md` and the skills; `construction/` is removed.

### S4-01 Write /health
`area=agentic type=improvement model=opus depends=- parallel=yes`
- **Reads**: `design/08-agentic.md` (`/health`, labels derived from the tree),
  `../pdx/prompt-driven-software-factory/skills/verify-factory/SKILL.md` for the spirit.
- **To do**: `.claude/skills/health/SKILL.md` and a script: `check-course` on every course;
  agent workflows present and parseable; labels existing for every `specs/*` and `courses/*`
  and no orphan area label; `main` buildable (last `checks` run green); root holds only
  `CLAUDE.md` and `README.md` plus dotfiles, `docs/` only `decisions/`, `glossary.md`,
  `contributing.md`; banned glossary words in `docs/`, `.claude/`, `specs/*/SPEC.md`, issue
  titles (reports); decisions all have a counterfactual first line. Reports, never blocks.
- **Done when**: `/health` runs in under a minute and reports every item with ok / warn and a
  one-line fix hint; a deliberately planted violation of each kind is reported.

### S4-02 Write the quality-review and site-verify agent workflows
`area=agentic type=improvement model=opus depends=- parallel=yes`
- **Reads**: `design/08-agentic.md` ("Agent workflows"); the S1-12 review practice; S3-07's
  scripts.
- **To do**: `.claude/workflows/quality-review.js` (two independent reviewers of a course PR
  against `SPEC.md` and the protocol, a merger, findings as a report with file and line);
  `site-verify.js` (runs `verify.mjs` and `compare-captures`, summarises). Skills to invoke
  them, under 40 lines each.
- **Done when**: `quality-review` on a PR that reintroduces a known S1-12 finding reports it;
  `site-verify` on `main` produces the summary.

### S4-03 Write the support skills: triage, arbitration, diagnose-session
`area=agentic type=improvement model=opus depends=- parallel=yes`
- **Reads**: `../pdx/parcours-po/.claude/skills/maintenance/SKILL.md` (triage of an observation,
  arbitration, session diagnosis); `design/08-agentic.md`.
- **To do**: `.claude/skills/{triage,arbitrate,diagnose-session}/SKILL.md`, each under 60
  lines, loaded by `/ticket` (triage: issue, decision, or direct fix), by `quality-review`
  (arbitration of a disagreement between reviewers), by `/fresh-test` (diagnosis, if not done
  at S2-04).
- **Done when**: `/ticket` on three sample observations routes each correctly; the skills
  replace every remaining reference to the old maintenance skill (grep).

### S4-04 Contributor docs and README
`area=repo type=improvement model=opus depends=S4-01 parallel=no`
- **Reads**: `design/02-monorepo.md`, `design/08-agentic.md`; the skills as they exist.
- **To do**: `docs/contributing.md`: how an observation becomes an issue, an issue a branch, a
  branch a PR; the labels; the checks a PR must pass; how to write a concept (pointer to
  `SPEC.md` and the templates); how to run a fresh test; the vocabulary rule. Root `README.md`
  finalised. The root `CLAUDE.md` reread against its 40-line target.
- **Done when**: a reader with no context can find, from `README.md`, where a course is, how
  to change it, and how to see the result; `CLAUDE.md` is under 45 lines once the Construction
  section is removed (S4-07).

### S4-05 Rewrite T-023 as an issue: the course creation chain
`area=spec:linear-course type=improvement model=opus depends=- parallel=yes`
- **Reads**: `../pdx/parcours-po/maintainer/backlog/00-proposed/T-023-course-creation-chain.md`;
  `SPEC.md`; `course-batch`.
- **To do**: one issue (not the work): what a `course-framing` skill would do to start a new
  course on `linear-course` (brief, `course.yaml` skeleton from the templates, first batch),
  with its Done when; labelled `state:proposed`, `blocked:maintainer` until the second course
  is named.
- **Done when**: the issue exists and reads as the first task of the second course.

### S4-06 Contributor fresh test
`area=agentic type=improvement model=sonnet depends=S4-03,S4-04 parallel=no`
- **To do**: a fresh subagent (sonnet), given only the repository URL and the sentence "deliver
  issue #n" on a small course issue (a case to add to one concept), works in a worktree with
  the skills; the session observes without helping; findings on the skills and docs become
  issues.
- **Done when**: the PR is opened and passes `checks`; the findings are filed.

### S4-07 Remove construction/ and close the stage
`area=repo type=improvement model=sonnet depends=S4-01,S4-02,S4-03,S4-04,S4-05,S4-06 parallel=no`
- **Reads**: `construction/README.md`.
- **To do**: check every note in `construction/notes/` is either acted on, turned into an
  issue or a decision, or obsolete (list in the PR); delete `construction/`; remove the
  Construction section of `CLAUDE.md`; `/health` once more.
- **Done when**: `construction/` is gone from `main`; `/health` is green; stage 4's done-when
  holds; the maintainer closes the `stage-4` milestone.
