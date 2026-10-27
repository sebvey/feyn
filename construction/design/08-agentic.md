# 08. The agentic layer

Native Claude Code, as short commands, nothing harness-agnostic. It lives in `.claude/`
(skills, agent workflows, permissions) and `.github/` (issue template, CI workflows), plus
GitHub Issues.

## What we take, what we refuse

| Source | We take | We refuse |
|---|---|---|
| PDSF | "all skills" (one command = one short skill with its support files), the named counterfactual as the entry bar of a decision, a decision that may fit in one paragraph, decisions per context, "guided not gated" (a check reports, does not block, except in CI) | multi-harness portability, `AGENTS.md`, bootstrap, git-flow with `develop` and integration, the spec / tickets / ready-for-agent / auto-merge pipeline, `CONTEXT.md` as a separate glossary (the course glossary is course material; the repository glossary is `docs/glossary.md`) |
| vierbein / nessie-ooo | GitHub issues as backlog and technical dashboard, PR-only delivery, pre-approved read permissions | the layer copied into every project, imported agreements, local analysis tickets |
| lisi (`lisitempgitlab`) | the squash title `<type>(<area>): <summary>`, the one-table layout in `CLAUDE.md`, command recipes living with each component | a hand-maintained domain list (areas derive from the tree) |
| today's `parcours-po` | the two agent workflows (`course-batch`, `taught-check`), the fresh test on Sonnet, the two-tests rule before a teacher behaviour decision, the session diagnosis, the templates | the 250-line monolithic skill, the folder backlog, ticket and ADR numbering, `maintainer/site/` (the site documents itself in `site/docs/`) |

## Root `CLAUDE.md` (~40 lines)

Who you are here (a feyn contributor, not a teacher), the repository map (one line per
folder), the language, the commands (`mise exec`), which skills to load for which request, the
three non-negotiable rules (nothing on `main` without a PR; a teacher behaviour decision needs
two tests; a course changes only through an issue or a batch). Everything else is in skills.

## Command skills

Each short, one responsibility, its support files beside it.

| Skill | Does |
|---|---|
| `/ticket` | creates an issue from an observation (template Observation / To do / Done when, area and type labels), or reads an issue and summarises it |
| `/start <n>` | takes issue n: checks blocking labels, creates the branch, sets `state:wip`, lays out the plan |
| `/finish` | opens the PR that closes the issue, runs the checks, asks for review; after merge, cleans up |
| `/decide` | writes a decision (see `09-decisions.md`) in the right place, with its counterfactual; refuses if the bar is not met |
| `/fresh-test <scenario>` | builds a disposable classroom from the branch, runs a fresh subagent (Sonnet) on a test scenario, reports, destroys |
| `/classroom` | builds or updates a classroom (see `05-teacher-classroom.md`) |
| `/publish <course>` | sets the course tag, updates the changelog, triggers the prod deployment |
| `/health` | reports the repository's state: spec checks on every course, agent workflows present, labels existing and matching the tree, `main` buildable (the spirit of `verify-factory`, reports without blocking) |

Support skills (loaded by the above, not called directly): observation triage (issue, decision,
or direct fix), arbitration of a course disagreement between reviewers, test scenarios (today's
§5 of the maintenance skill).

## Agent workflows (`.claude/workflows/`)

- `course-batch`: writes a batch of concepts (sources, writing, two reviews, fix); ported as
  is, parametrised by course and concept folder (was `course-lot`).
- `taught-check`: verifies no case asks what the learner has not received; ported.
- `quality-review`: reviews a course PR against the spec (new, replaces T-050i).
- `site-verify`: wraps `verify.mjs` and the capture diff (new, stage 3).
- `migrate-concept`: one-off, stage 1 (see `10-migration.md`).

## GitHub Issues

The only backlog, from the repository's first day. Nothing local.

- **Issue template**: imperative title; body in three sections: Observation (what we saw,
  where), To do, Done when. Today's ticket template, unchanged in spirit.
- **State labels**: `state:proposed` (to triage), `state:todo`, `state:wip`; done = issue
  closed by PR. `blocked:maintainer` prevents `/start` (a maintainer decision is awaited).
- **Area labels**: derived from the tree, never hand-listed: `area:spec:<name>` for each
  `specs/<name>/`, `area:course:<id>` for each `courses/<id>/`, `area:teacher`, `area:site`,
  `area:agentic` (`.claude/`, `.github/`), `area:repo` (root, `docs/`). `/health` creates the
  missing ones and flags the orphans; `/ticket` picks the area from the paths the observation
  names. This replaces lisi's hand-maintained domain table: the tree is the list.
- **Type labels**: `type:bug`, `type:course`, `type:improvement`, `type:decision`.
- **Milestones**: one per stage of the refactoring (stage 0 to 4), then per course version.
- **Sub-issues** for course batches (one per concept, as today).
- **No Project at first**: labels are the truth for the agent, which only handles `gh issue`.
  A dashboard is added when the list exceeds one screen.
- The 113 old tickets do not carry over; T-023 (course creation chain) and T-050h (quality
  controls) are reborn as rewritten issues.

## Permissions (`.claude/settings.json`)

Pre-approved: reads (`ls`, `cat`, `git status/log/diff/branch --list`, `gh issue view/list`,
`gh pr view/list`), the check scripts, `git add`, `git commit`, `git switch -c`, `gh issue
create/edit`, `gh pr create`. Never pre-approved: `git push --force`, `gh pr merge`, `gh repo`,
remote branch deletion.

## CI workflows (`.github/workflows/`)

- `checks`: on every PR, the spec checks on every touched course; `astro check` and site build
  if `site/` or a course is touched. Blocking.
- `site-next`: on merge to `main`, deploys `/next/<course>/` for every touched course.
- `site-preview`: on PR, deploys `/pr-N/<course>/`; on close, removes it.
- `site-prod`: manual, `course` + `tag`, deploys `/<course>/`.
