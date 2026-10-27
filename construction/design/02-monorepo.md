# 02. The `feyn` monorepo

## GitHub repositories

| Repository | Visibility | Holds | Role |
|---|---|---|---|
| `sebvey/feyn` | public (for now) | spec, courses, teacher, site (sources), agentic layer, decisions | the source, the only repository we work in |
| `sebvey/feyn-site` | public | branch `gh-pages` only: the `dist/` of the site builds, per channel and per course | artifact served by GitHub Pages; never hand-edited |
| `sebvey/feyn-o0o` (local clone `parcours-po`) | frozen, then archived | the old course at its freeze tag | migration source, read-only |
| `sebvey/parcours-po-website` | frozen, then archived | the old site; last deployment: a redirect page to the new address | courtesy for links already given |

`feyn` is created **empty**, not by renaming `parcours-po`: git history does not carry over
(maintainer's decision). The local folder `~/code/workspaces/perso/feyn/` receives the clone
(today empty apart from `.sve/`).

The artifact repository is named `feyn-site`, not `feyn-website`, because "site" is the
reserved term (decided 2026-10-27).

### Public or private

Public now, revisited if the concept takes off. What the Free plan removes from a private
repository: rulesets and `main` protection, GitHub Pages, the Actions quota (2000 min/month
against unlimited for public). Issues, Projects, unlimited collaborators and unlimited
private repositories are in Free on both sides. The real question of private is **secrecy**:
a public repository exposes the teacher-only files (expected answers, common mistakes,
follow-ups). Acceptable for a beta with trusted testers, said in the README. The day unknown
learners arrive: switch to private (one click), lose rulesets (skill discipline replaces
them), keep an Actions quota that is plenty for checks.

Consequence set from day one: even public, the site deploys to `feyn-site`, not from `feyn`
directly, because a switch to private would kill the monorepo's Pages and its address.

## Tree

```
feyn/
  CLAUDE.md                     # ~40 lines: who you are here, where things are, which skills to load
  README.md                     # what this is, "course answers are visible" warning, how to contribute
  .claude/
    settings.json               # pre-approved read permissions (git, gh, ls, check scripts)
    skills/                     # command and support skills (08-agentic.md)
    workflows/                  # agent workflows: course-batch, taught-check, quality-review, site-verify
  .github/
    ISSUE_TEMPLATE/             # one issue template: Observation / To do / Done when
    workflows/                  # CI workflows: checks, site build and deploy per channel
  construction/                 # TEMPORARY: design/, plan/, notes/, scripts/; removed at stage 4
  docs/
    decisions/                  # cross-cutting decisions (slug.md), see 09-decisions.md
    glossary.md                 # the repository glossary (13-glossary.md)
    contributing.md             # how an issue becomes a PR; nothing else here without a decision
  specs/
    linear-course/
      SPEC.md                   # the contract: structure, protocol, drawing contract
      lang/fr.yaml              # language pack: literal phrases, typography, site labels
      checks/                   # check scripts for a course against this spec
      templates/                # course templates: concept.md, teaching.md, sources.md, domain.md…
      decisions/                # decisions of this spec
  courses/
    parcours-po/
      course.yaml               # identity, spec@version, language, domains, concepts, sub-concepts, prerequisites…
      plan.md                   # prose: audience, stances
      glossary.md               # the course glossary
      storyline.md              # the storyline (file name in English, text in French)
      CHANGELOG.md
      domains/N-slug.md
      concepts/NN-slug/         # one concept folder per concept, see 03-spec-linear-course.md
      decisions/                # decisions of this course (e.g. the bike storyline)
    <second-course>/            # later
  teacher/
    CLAUDE.template.md          # the teacher template, built with the language pack and the course
    skills/                     # teacher skills (onboarding, reset, show-diagram…)
    build-classroom.*           # the classroom build script
    decisions/
  site/
    astro.config.mjs, package.json, src/…   # the site engine; reads courses/<id>/ directly
    scripts/verify.mjs, deploy…
    docs/                       # the engine's own docs
    decisions/
```

## How much lives at the root and in `docs/`

The maintainer's worry: `docs/` and root `*.md` get crowded. The rule:

- **Root: two files**, `CLAUDE.md` and `README.md`, plus dotfiles. Nothing else at the root
  without a decision in `docs/decisions/`. No root `CHANGELOG.md` (tooling has no version), no
  root `ARCHITECTURE.md` (this design folder becomes decisions and the README).
- **`docs/`: three things**, `decisions/`, `glossary.md`, `contributing.md`. A document that
  describes one component lives in that component (`site/docs/`, `teacher/README.md`), like
  the sub-project docs of lisi. `docs/` takes only what no component contains.
- **`construction/`** exists during the refactoring only (design, plan, notes, construction
  scripts), versioned so every session sees it; stage 4 removes it (`11-stages.md`).
- **No per-folder `CLAUDE.md`**: skills carry the detail. The classroom, built **outside** the
  repository, has its own (see `05-teacher-classroom.md`).
- `00-agentic/` as in vierbein does not exist: the agentic layer is `.claude/` and `.github/`,
  where Claude Code and GitHub read it.
- One `package.json`, for the site; the spec's check scripts are shell or dependency-free
  Node, chosen at stage 1.

## Language

**English everywhere, except what touches French course material.**

| English | French |
|---|---|
| code, skills, agent workflows, CI workflows, scripts | concept files: `concept.md`, `teaching.md`, `sources.md` |
| root `CLAUDE.md`, teacher template | course glossary, storyline, the course's `plan.md` and `CHANGELOG.md` |
| `SPEC.md`, repository docs, decisions, issues, labels | diagram text, site pages and labels (through the language pack) |
| file and folder names, `course.yaml` keys | what the teacher says, the literal phrases of the language pack |

Language is a property of the course (`language: fr` in `course.yaml`), not of the
repository. An issue or decision in English that quotes the course quotes in French, without
translating.

The teacher's protocol is written in French first and switched to English once the fresh
tests are green (`05-teacher-classroom.md`, "Rewrite risk"); its template is English from the
start. What the teacher says to the learner comes from the course and the language pack (see `03-spec-linear-course.md`, "Language pack", and
`05-teacher-classroom.md`, "Rewrite risk").
