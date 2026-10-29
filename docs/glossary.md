# Repository glossary

Every term below is **reserved**: it means one thing in the repository's files: code, docs, skills, issues and decisions.
The words in its "Not" column are **banned** for that meaning: never use them where the reserved term applies.
To add a term, open a PR that adds its row here and replaces, in the same PR, the banned words already in use.

**Two glossaries, each at home.** This is the repository glossary: it applies in repository files
(docs, skills, issues, decisions, specs). Each course has its own **course glossary**
(`courses/<id>/glossary.md`), which belongs to the course, follows the course's language and applies
in that course's files. A word may be reserved in both with two meanings (**epic**); a repository
text that speaks of the course's meaning says so ("epic, in the course's sense"). French
course files keep their French section headings (« Objectif », « L'essentiel », « Pièges »…);
the English terms below are how we talk about them in code, docs and issues.

## The things we build

| Term | Means | Not |
|---|---|---|
| **feyn** | the monorepo and the project | "the platform", "the system" |
| **spec** | the contract for a *type of course*: structure, protocol, drawing contract, checks. Named: `linear-course`. Versioned | "specification" for anything else; never "spec" for an issue or a design |
| **course** | one course's source files, `courses/<id>/`, identified by its **course id** (`parcours-po`) | "content" (banned as a noun for the course), "material", "data" |
| **build** (noun and verb) | producing an output from a course: the **site build**, the **classroom build**. Builds have no version of their own | "render", "generate", "export", "compile", "publish" (reserved below) |
| **site** | the published website and its engine (`site/`) | "website", "web", "pages" |
| **teacher** | the generic Claude Code agent that teaches: a `CLAUDE.md` built from the teacher template, the protocol and the language pack | "prof", "tutor", "coach", "agent" alone |
| **classroom** | the folder built outside the repo where the teacher runs: course copy, `course.lock`, `learner/`, its own git | "workspace", "instance", "environment" |
| **learner** | the person being taught; **learner memory** = `learner/` | "student", "user" |
| **maintainer** | Seb: owns decisions, releases, freezes | "owner", "admin" |
| **contributor** | anyone who delivers an issue by PR (course files or code) | "author", "developer" |

## Inside a course

| Term | Means | Not |
|---|---|---|
| **domain** (course) | an ordered group of concepts with its own page and presentation. Course vocabulary only: never a part of the repo (that is an **area**) | |
| **concept** | a numbered unit of the course (`0`..`17`, `A1`, `A2`); its **concept folder** holds `concept.md`, `teaching.md`, `sources.md`, diagrams | "fiche", "lesson", "chapter", "page" |
| **sub-concept** | a node of a concept's teaching tree (`9a`, `9a1`); a **leaf sub-concept** is one teacher message with one question | "section", "step", "unit" |
| **objective** | what the learner can do after the concept (one sentence; `course.yaml` field, « Objectif » section). One term for the current « Objectif » and « À la fin, l'apprenant sait » | "goal", "outcome", "aim" |
| **reader text** | the reader-facing explanation of a sub-concept in `concept.md`, what the site shows | "body", "content", "copy" |
| **reader-facing** / **teacher-only** | the two visibility classes of course files: `concept.md`, `sources.md`, diagrams are reader-facing; `teaching.md` is teacher-only | "public" / "private" (those describe the repository) |
| **teaching notes** | `teaching.md`: teaching instructions and the example bank | "guide", "notes", "answers" |
| **example bank** | the set of **cases** of a concept, in its teaching notes | "examples", "exercises", "questions" |
| **case** | one entry of the bank: situation, question, expected answer, common mistakes, follow-ups; its **title** is its id (learner memory cites it) | "example", "exercise", "scenario" |
| **example** | in a teacher message, the illustration that precedes the question (« Exemple ») | the bank's cases |
| **follow-up** | the targeted re-question after a partial or wrong answer (« relance »); ranked 1 or 2 | "retry", "hint", "probe" |
| **storyline** | the running world the cases live in (the bike-share operator); `storyline.md` | "red thread", "thread", "fil rouge", "narrative" |
| **stances** | the standing of each claim of a concept, structured in the frontmatter: **consensus** (Scrum Guide, established practice), **school** (short for school of thought: a named author's or current's choice, « choix d'école »), **course** (this course's own choice, « choix du cours »). A stance is also any stated position of a course (« une équipe en sprints ») | "schools", "opinions", "positions", "status" |
| **neighbors** | the neighbouring notions not to confuse with the concept (« notions voisines »); a frontmatter key of their own, not a stance | "related", "see also" |
| **sources** | `sources.md`: **claims**, **references**, **unverified** | "bibliography", "citations" |
| **diagram** | an SVG of a concept under the **drawing contract**, with its **caption** | "schema" (data), "figure", "image", "illustration", "schéma" |
| **drawing contract** | the SVG rules of the spec, `SPEC.md` 7.1 (viewBox, currentColor, three classes, `<text>`, named groups); the style of 7.2 is not part of it | "style guide" |
| **pitfalls**, **essentials**, **quick test** | the « Pièges », « L'essentiel », « Le test rapide » sections | |
| **course glossary** | `courses/<id>/glossary.md`, course material | this file |

## How the teacher works

| Term | Means | Not |
|---|---|---|
| **protocol** | the pedagogical protocol: the testable teaching rules of a spec, each named by a slug, set in families and **groups** of rules, each group named by a slug too (`onboarding`) | "the loop", "pedagogy", "rules", "behaviour" |
| **language pack** | `lang/<code>.yaml`: literal phrases, typography, site labels of one language | "i18n", "locale", "strings" |
| **teaching session** | always qualified (the other sense is a **work session**): one conversation between the teacher and a learner; **resume** = the first message of a teaching session with an existing learner; **onboarding** = a new learner | "session" alone, "course session" |
| **save point** | a moment where the teacher writes and commits learner memory | "checkpoint", "sync" |
| **mini-recap** | the five-line recap every 3 or 4 validated concepts | "summary" |
| **course.lock** | the classroom's record: course id, ref, course sha, tooling sha, channel, `site_url`, date | "manifest" |

## How we work

| Term | Means | Not |
|---|---|---|
| **area** | the part of the repo an issue or PR belongs to, derived from the tree: `spec:<name>`, `course:<id>`, `teacher`, `site`, `agentic`, `repo` | "domain" (reserved for a course domain in this glossary), "component", "module", "scope" |
| **issue** | a GitHub issue, the only ticket; sections **Observation**, **To do**, **Done when**; an epic, an issue with the label `epic`, has the five sections of decision `themes-and-release-milestones` instead | "ticket", "task", "story" |
| **label** | always qualified: **type** (`type:bug`, `type:course`, `type:improvement`, `type:decision`), **area** (`area:<area>`), and `blocked:maintainer` (a maintainer decision is awaited; on the issue only). No state label: where an issue stands is its **Status** | |
| **Project** | the GitHub Project "feyn" (number 4) that holds every issue with its Status: what the maintainer looks at in the web interface (its four **views**, Epics, Ready, WIP and Backlog, are in `docs/contributing.md`) and what the agent lists (`gh project item-list`) | "board" for the Project itself, "kanban", "dashboard" |
| **Status** | the Project's field that says where an issue stands: **Backlog** (proposed, to triage), **Ready** (decided, free to take), **In progress** (a branch exists), **Ready for review** (the work claims done, the maintainer reviews and concludes: a slice whose PR is open after the fresh-agent review, which the maintainer merges; an epic whose slices are all closed, whose Done when the maintainer verifies before closing it), **Needs Decision** (present in the Project, unused for now: the label `blocked:maintainer` carries a decision awaited), **Done** (closed; the close reason stays on GitHub). It replaces the state labels. Written with a capital when it names the field; the lowercase `status` key of a decision's frontmatter is a different, allowed key | "state" for where the work stands (an issue's `state` is GitHub's open or closed) |
| **draft** | a PR that cannot be merged until it is marked ready (`gh pr ready`); `/finish` opens one when a maintainer decision is awaited (the issue, not the PR, carries `blocked:maintainer`), and a contributor opens one when an orchestrator's agent-workflow run is awaited (`/orchestrate`, step 1) | "WIP" |
| **blocked** | two senses, never mixed. "Blocked by #n": a blocked-by link between issues (decision `blocked-by-links-for-dependencies`), lifted when the blocking issue closes. `blocked:maintainer`: a maintainer decision is awaited, on the issue only, lifted when the maintainer removes the label | "on hold" |
| **work session** | always qualified (the other sense is a **teaching session**): one Claude Code conversation on the feyn repository: a **reflection session** (with the maintainer, distilled by `/debrief`), an orchestration (`/orchestrate`), a construction task. A reflection session or a construction task leaves a **session note** in `construction/notes/` | "session" alone |
| **epic** | an objective that closes, with a verifiable Done when: an issue with the label `epic`, titled "Epic: …", in five sections (Objective, Why now, Material, Done when, Out of scope), parent of its slices, split one slice at a time when taken; its plan is a **plan comment** on it (decision `themes-and-release-milestones`). No Done when, no epic | "theme", "subject", "initiative", "stream", "phase" |
| **slice** | a unit of work, one PR with a verifiable Done when: the result of splitting an epic, attached to it as a sub-issue. The standard name is "story", which becomes the form of a slice once user stories are written | "task", "story" (until user stories are written) |
| **observation** | what is seen in passing: an issue without a parent, in the Backlog, grouped by its `area:` label; triaged into a slice, an epic, an issue Ready on its own, or closed. Also the first section of an issue | |
| **milestone** | a release target: named after the tag that closes it (`linear-course/v1.0.0`, `parcours-po/v0.2.0`), holding the slices that must close before the tag, created when a release is in sight; an epic may target one; tooling has none | "sprint", "phase", "version" for the milestone itself |
| **stage** | historical: one of the five milestones of the construction plan of 2026-10-27 (stage 0 to 4), abandoned on 2026-10-29 for epics; the word stays only in `construction/` and in old issues | "lot", "phase", "sprint", "iteration" |
| **batch** | a set of concepts written in one `course-batch` agent workflow run (ex `course-lot`) | "lot", "chunk" |
| **decision** | a recorded decision: one file by slug in a `decisions/` folder, with its counterfactual. "ADR" is the known synonym in conversation, never in paths | "ADR" in file names, "RFC", "design doc" |
| **counterfactual** | the first line of a decision: what an agent would do without it | "rationale", "motivation" |
| **check** | a deterministic script that validates a course, or the spec's own files, against its spec (`checks/`), run locally and in CI | "test", "lint", "validation" |
| **taught-check** | the agent workflow that verifies no case asks what the learner has not yet been taught | |
| **fresh test** | a run of the teacher by a fresh subagent (Sonnet) in a disposable classroom, following a **test scenario** | "e2e", "smoke test", "simulation" |
| **review** | a reading of a change against the spec by an agent or a human (**quality review** workflow) | "audit", "QA" |
| **skill** | a Claude Code skill; a **command skill** is invoked as `/name`, a **support skill** is loaded by other skills | "command", "prompt", "recipe" |
| **agent workflow** | a Claude Code multi-agent script in `.claude/workflows/` | |
| **CI workflow** | a GitHub Actions file in `.github/workflows/` | "pipeline", "action" |
| **Project workflow** | a built-in automation of the Project ("Auto-add to project", "Item added to project", "Item closed"), turned on in the web interface; `.claude/skills/ticket/project.md` lists which are on | "automation", "workflow" alone |
| **template** | always qualified: **course templates** (`specs/<name>/templates/`, model files of a course), **teacher template** (`teacher/CLAUDE.template.md`), **issue template**, **PR body template** (`.claude/skills/finish/pr-body.md`) | "template" alone, "boilerplate", "scaffold" |
| **channel** | where a build is served from: **prod** (a course tag), **next** (`main`), **preview** (a PR) | "environment", "stage", "env" |
| **release** | tagging a course version (`<id>/vX.Y.Z`) and deploying prod; done by `/publish` | "deploy" alone, "ship" |
| **course version** / **spec version** | the two versioned objects; tooling has a **commit sha**, no version | "site version", "teacher version" |
| **freeze** | the moment after which the old repositories no longer change; announced by the agent | |
| **health** | the `/health` report on the repository's state | "status", "doctor" |
| **repository glossary** | this file, `docs/glossary.md` | |
