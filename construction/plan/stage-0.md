# Stage 0: foundation

Milestone `stage-0`. Design: `design/11-stages.md`, `design/02-monorepo.md`,
`design/08-agentic.md`, `design/09-decisions.md`.

Done when: the first stage 1 issue has been created, taken with `/start` and closed by a PR
with `/finish` in the new repository.

### S0-01 Freeze parcours-po and announce it
`area=repo type=improvement model=sonnet depends=- parallel=no`
- **Reads**: `design/10-migration.md` ("The freeze"). Runs in `../pdx/parcours-po`, with its own
  `maintenance` skill, not in feyn.
- **Observation**: on 2026-10-27, `parcours-po` is at tag `course-v2.5.0` with no course change
  since (T-120 touched the site only), the backlog is empty (T-118 to T-120 done), and
  `parcours-po-website` is at 2.4.1, aligned on 2.5.0 and deployed. If tickets landed after
  that date, the task starts by finishing or parking them (the maintainer says which) and by
  tagging a new course version if `course/` changed.
- **To do**: verify `git diff course-v2.5.0 -- course/` is empty and `check-alignment` is green
  on the site; add one line at the top of both READMEs: "Frozen on <date>; successor:
  github.com/sebvey/feyn" (each through the repository's own PR flow); tell the maintainer
  "frozen" in one line, naming the course tag and the site version the migration reads.
- **Done when**: the course tag and the site version are named in the announcement; both
  READMEs carry the freeze line on `main`; the deployed site is aligned (`check-alignment`
  green).

### S0-02 Initialise the feyn repository and its skeleton
`area=repo type=improvement model=sonnet depends=- parallel=no`
- **Reads**: `design/02-monorepo.md`, `design/13-glossary.md`.
- **Observation**: `~/code/workspaces/perso/feyn/` holds `construction/` and nothing else, no
  git. `~/code/workspaces/mise.toml` already covers the folder (git identity, `gh`).
- **To do**: `git init` (default branch `main`); `.gitignore` (`node_modules/`, `dist/`,
  `.astro/`, `.DS_Store`, `*.local.*`); the folder skeleton of `design/02-monorepo.md` with a
  one-paragraph `README.md` in each empty top folder (`specs/`, `courses/`, `teacher/`,
  `site/`, `docs/`) saying what goes there; the root `README.md` (what feyn is, the "course
  answers are visible in this repository" warning, how to contribute in three lines pointing to
  `docs/contributing.md` to come); the root `CLAUDE.md` of `design/08-agentic.md` (~40 lines),
  with a last section "Construction" that points to `construction/README.md` and is removed at
  stage 4; first commit; `gh repo create sebvey/feyn --public --source=. --push`.
- **Done when**: `mise exec -- gh repo view sebvey/feyn` shows the repository, public, with
  `main` pushed; the tree matches the design; `CLAUDE.md` is under 60 lines including the
  Construction section.

### S0-03 Write the repository glossary and the cross-cutting decisions
`area=repo type=decision model=opus depends=S0-02 parallel=yes`
- **Reads**: `design/13-glossary.md`, `design/09-decisions.md`, `design/README.md`
  ("Decisions the maintainer made"), `design/12-open-points.md` ("Decided").
- **Observation**: the glossary exists only as a design file with its brainstorm framing; no
  decision file exists.
- **To do**: `docs/glossary.md`: the tables of `design/13-glossary.md` without the "why this
  file" framing, with a three-line header on how to use it (reserved term, banned words, how to
  add one). `docs/decisions/`, one file each in the format of `design/09-decisions.md`
  (frontmatter `date`, `issue`, `status`, `scope`; counterfactual first): `monorepo-feyn`,
  `two-versioned-objects`, `three-channels`, `language-policy`, `decision-format`,
  `public-repo-for-now`, `reserved-vocabulary`. Each under 40 lines.
- **Done when**: the eight files exist; every decision opens with "Without this, …"; no banned
  word of the glossary appears in `docs/` or `README.md` (grep).
- [x] Done on 2026-10-27 (night 1).

### S0-04 Issue template, labels, milestones and the plan-to-issues script
`area=agentic type=improvement model=sonnet depends=S0-02 parallel=yes`
- **Reads**: `design/08-agentic.md` ("GitHub Issues"), `construction/README.md` ("Task
  format").
- **Observation**: no issue template, no label, no milestone exist; the plan lives in
  `construction/plan/stage-*.md`.
- **To do**: `.github/ISSUE_TEMPLATE/task.yml` with the three sections Observation / To do /
  Done when and a "Reads" field; labels created with `gh label create`: `state:proposed`,
  `state:todo`, `state:wip`, `blocked:maintainer`, `type:bug`, `type:course`,
  `type:improvement`, `type:decision`, `area:repo`, `area:agentic`, `area:teacher`,
  `area:site`, `area:spec:linear-course`, `area:course:parcours-po`; milestones `stage-0` to
  `stage-4`; `construction/scripts/plan-to-issues` (shell or Node, no dependency): parses a
  stage file, creates one issue per task (title = heading, body = the bullets plus
  `Depends on: …`, labels from the metadata line, milestone from the file), idempotent (an
  existing title is skipped), `--dry-run` lists what it would do, `S1-10.nn` tasks become
  sub-issues of `S1-10`.
- **Done when**: `plan-to-issues --dry-run plan/stage-0.md` lists the seven tasks with their
  labels; a real run on `stage-0.md` creates them, and S0-01 to S0-04 are closed by hand as
  done; a second run creates nothing.

### S0-05 Command skills /ticket, /start, /finish, /decide, and permissions
`area=agentic type=improvement model=opus depends=S0-04 parallel=no`
- **Reads**: `design/08-agentic.md` ("Command skills", "Permissions"),
  `design/09-decisions.md`, `design/07-versions-channels-flow.md` ("Git flow"); for the shape
  of a short skill, `../pdx/prompt-driven-software-factory/skills/triage/SKILL.md`; for the
  current process rules worth keeping, `../pdx/parcours-po/.claude/skills/maintenance/SKILL.md`
  (§ PR flow only).
- **Observation**: no skill exists; the maintenance skill of `parcours-po` is a 250-line
  monolith that mixes backlog, PR flow, tests and diagnosis.
- **To do**: `.claude/skills/{ticket,start,finish,decide}/SKILL.md`, each under 80 lines, one
  responsibility, support files beside it when needed (the issue body template, the decision
  template). `/start <n>`: refuses on `blocked:maintainer`, creates `<type>/<n>-<slug>` from an
  up-to-date `main`, sets `state:wip`, restates the task's Done when. `/finish`: runs the
  checks that exist, opens the PR with `Closes #n`, title `<type>(<area>): <summary>`, asks
  for review, and after merge deletes the local branch (two steps, as lisi does).
  `/decide`: asks for the counterfactual, refuses without it, picks the `decisions/` folder by
  scope, checks for a neighbouring slug. `/ticket`: creates from an observation or reads and
  summarises. `.claude/settings.json` with the pre-approved commands of the design, nothing
  more.
- **Done when**: on a dummy issue, `/start`, a trivial change, `/finish` produce a merged
  squash PR whose title follows the convention and whose issue is closed; `/decide` refuses a
  decision without counterfactual and writes one with it; the four skills are each under 80
  lines.

### S0-06 Create the feyn-site artifact repository and its Pages
`area=site type=improvement model=sonnet depends=S0-02 parallel=yes`
- **Reads**: `design/06-site.md` ("Deployment mechanics"), `design/02-monorepo.md`.
- **Observation**: no artifact repository; the old site is served from
  `parcours-po-website`'s own Pages.
- **To do**: `gh repo create sebvey/feyn-site --public` with a `gh-pages` branch holding a
  placeholder `index.html` ("feyn, nothing published yet") and `.nojekyll`; Pages enabled on
  `gh-pages`; a deploy key pair generated by the agent, public key added to `feyn-site` with
  write access (`gh repo deploy-key add`), private key stored as secret `FEYN_SITE_DEPLOY_KEY`
  on `feyn` (`gh secret set`); the maintainer runs or approves the two commands that need his
  permissions; the private key file is deleted after.
- **Done when**: `https://sebvey.github.io/feyn-site/` serves the placeholder; the secret exists
  on `feyn`; a dry CI workflow `site-ping` (manual) that pushes a timestamp file to `gh-pages`
  with the key succeeds once and is removed.

### S0-07 Create the stage 1 to 4 issues and run the first one through the flow
`area=agentic type=improvement model=sonnet depends=S0-04,S0-05 parallel=no`
- **Reads**: `construction/README.md`, `plan/stage-1.md` to `plan/stage-4.md`.
- **Observation**: the plan is in files; the flow (`/start`, `/finish`) is untested on a real
  task.
- **To do**: run `plan-to-issues` on the four stage files; verify the milestones and the
  sub-issues of S1-10; freeze the plan files (a line at the top: "Issues created on <date>;
  this file is no longer updated"); then take S1-01 with `/start` and deliver it with
  `/finish` (S1-01 is a read-only pass, which makes it the right first run).
- **Done when**: every task of stages 1 to 4 is an open issue with the right labels and
  milestone; S1-01 is closed by a merged PR; stage 0's done-when holds.
