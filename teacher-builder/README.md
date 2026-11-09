# teacher-builder

Builds a classroom from a course: everything that makes the teacher, the teacher template (`CLAUDE.template.md`), the teacher build (`build-teacher`), which builds the teacher skills of the moments into the classroom from the composition, and its test (`test-build`), the fresh tests (`fresh-test`, which runs the teacher on a test scenario and judges it, with its judge's prompt `fresh-test-judge.md`), and the decisions about the teacher's Claude Code realisation (`teacher-builder/decisions/`); a teacher behaviour decision that sets a rule of the protocol goes to the spec MAJOR's `decisions/` (`product-lines/linear-fr/1/decisions/`). `teacher-builder/skills/` is kept for a teacher skill written by hand, if one comes; it holds none and the build does not read it. The classroom itself is built outside this repository from these files and a course; it is rebuilt, never edited by hand (decision `products-built-from-one-course`).

## The two halves

The teacher build is cut in two, as the checks are:
- the half that depends on the spec MAJOR, `product-lines/<name>/<MAJOR>/products/teacher/build/`: its `render-parts` reads the protocol, the composition, the lexicons of the course files and of the teacher, the learner templates and the course, and prints the five parts of the composition rendered as text, one JSON document whose shape the MAJOR's `parts.schema.yaml` fixes (`product-lines/linear-fr/1/products/teacher/build/README.md`);
- the half that depends on the target only, here: the dispatcher and the Claude Code realisation. `build-teacher` reads `spec: <name>@<MAJOR>` in the course's `course.yaml`, refuses (exit 2) a spec or a MAJOR with no `products/teacher/build/render-parts`, runs it, validates its output against the MAJOR's `parts.schema.yaml` (the `ajv` of the spec directives the MAJOR declares), then writes the classroom from it, as `product-lines/check-course` dispatches to the MAJOR's `check-course`.

A second MAJOR or a second spec writes its own `products/teacher/build/`, and this folder does not change; a second target rewrites this folder, and the spec does not change. Nothing here reads the protocol or the composition.

## The command

```
mise exec -- teacher-builder/build-teacher <course-dir> [--out <dir>] [--channel next|prod|preview] [--site-url <base>] [--force]
```

- `<course-dir>`: a course folder, `courses/<id>/`. The build reads the spec MAJOR its `course.yaml` declares (`spec: linear-fr@1`) and runs that MAJOR's `products/teacher/build/render-parts` on it, which loads the `yaml` package through the lib of the spec directives the MAJOR declares (`mise exec -- npm ci --prefix spec-directives/1` once).
- `--out <dir>`: the classroom's folder. Without it, `~/classrooms/<course id>-next/` (channel next) or `~/classrooms/<course id>/` (channel prod), as decision `three-channels` says.
- `--channel`: `next` (the default), `prod`, or `preview` (a disposable classroom, which needs `--out`). It is written to `course.lock`.
- `--site-url <base>`: the address of the course's site for the channel, passed to `render-parts`, which derives the site addresses from it: `<base>`, `<base>domaines/`, `<base>domaines/{n}/`, `<base>concepts/{nn}/`. Without it, `site_url` is `null` in `course.lock` and the four classroom parameters read « (site non publié) », so that no rule points at a dead address.
- `--force`: a target that exists and is not empty is refused, since learner memory may live there; `--force` empties it, learner memory included, and builds again, but only a classroom (a folder holding `course.lock`): any other non-empty folder is refused even with `--force`.

`--channel prod` built from something other than a course tag `<id>/v*` (decision `three-channels`) builds, with a warning: `course.lock` records the `ref` it was read from.

Exit 0 built, 1 an input the build cannot read (`render-parts` failed, a placeholder no lexicon of the spec holds or a moment naming an unknown rule among its causes, or its output is not valid against the schema), 2 a usage error or a refused target (a spec or MAJOR with no `products/teacher/build/render-parts` among them).

## What each part of the composition becomes

The composition (`product-lines/<name>/<MAJOR>/products/teacher/composition.yaml`) names no mechanism; the MAJOR's `render-parts` renders each part as text, and this build realises it in Claude Code.

| Part | In the classroom |
|---|---|
| `permanent` | `CLAUDE.md`, from `CLAUDE.template.md`: the course and its channel (from `course.lock`), then the texts of the document's `permanent`, the posture, the course map, the names of the course files, then the list of the moments and their skills, then the permanent protocol (every rule no moment loads, each family and group preceded by its heading and its purpose, from `products/teacher/build/instructions.yaml`). `@learner/apprenant.md`, `@learner/observations.md` and `@course/course.yaml` are imported at the start, as the rules say they are given (« fourni au démarrage ») |
| `on-demand` | `.claude/skills/feyn-teacher-<moment id>/SKILL.md`, one per moment of the document's `moments` whose `rules` is not empty (none for `reset` while it has none): its name `feyn-teacher-<moment id>` (the prefix keeps it apart from a skill of Claude Code itself, `/resume`), its description says when it is used, from the moment's `when`; its body names what the moment reads (its `draws` and `slots`, a draw given as `text` written out under its path, so that the onboarding needs no read of `plan.md` before its first message) and holds its `rules` |
| `course-reads` | `course/`, the course folder copied as is |
| `learner-memory` | `learner/`, the document's `learner_templates`, each written as is |
| `permissions` | `.claude/settings.json`, from the document's `permissions`: allows `git add` of each `writable` folder (`learner/`) and `git commit`, denies `Edit` and `Write` under each `read_only` folder (`course/`) and `git push` |

Then `course.lock` (`course`, `ref`, `course_sha`, `tooling_sha`, `channel`, `site_url`, `built_at`: the course, the tag or branch it was read from, the last commit of the course folder, the last commit of `teacher-builder/` and of the spec MAJOR's `products/teacher/build/` taken together, the channel, the site address or `null`, the date in ISO 8601), and the classroom's own git: `git init` and one commit holding all of it.

The rules' text is the protocol's, verbatim, French, with every placeholder filled by `render-parts` (`product-lines/linear-fr/1/products/teacher/build/README.md`, "The filling"). The teacher template is English and holds the frame only, no rule (decision `language-policy`).

## The test

`mise exec -- teacher-builder/test-build` builds `cafe`, the spec's sample course (`product-lines/linear-fr/1/course/samples/cafe/`), into temporary folders and checks what a command can check: the files of each part, `diff -r` of the course copy, the learner templates, the skills `feyn-teacher-<moment>` and their descriptions, the onboarding questions of `plan.md` given in the onboarding skill, the « Moments » list naming them, no placeholder left, each rule of the protocol once in `CLAUDE.md` or in one skill, in the protocol's order and verbatim but for its placeholders, each family and group heading followed by its purpose, the three spots of the filling (no « ((site », no period after a phrase that ends with one, no « ses <number> domaines »), the template without rule text, the permissions, the fields of `course.lock`, one commit and a clean classroom git, the refusal of a non-empty target and `--force` (and its refusal of a folder that is not a classroom), `--site-url`, the default folders of the channels (under a temporary `HOME`), and the dispatcher's refusal of an unknown MAJOR and of a MAJOR with no `products/teacher/build/`. Exit 0 when every check passes. The MAJOR's `products/teacher/build/test-render` tests the rendering itself.

## The fresh tests

A **fresh test** runs the teacher on a **test scenario** of the spec MAJOR the course declares (`product-lines/<name>/<MAJOR>/products/teacher/tests/<id>.yaml`, whose `README.md` gives the format and the rules each scenario covers) and judges what it did:

```
mise exec -- teacher-builder/fresh-test <course-dir> <scenario id> [--model <model>] [--keep]
```

1. **The classroom**: `build-teacher <course-dir> --channel preview --out <run>/classroom`, a disposable classroom built from the branch, then the scenario's `learner` memory written in `learner/` and committed in the classroom's git.
2. **The teacher**: `claude -p` in the classroom, one call per learner message of the scenario, in one conversation (the first call's session id, then `--resume <id>`), on Sonnet by default (`--model` for another; the founding ADR-051: a weaker model reveals a flawed instruction a strong one hides). The configuration is isolated from the user's by `--setting-sources project,local`: no `~/.claude/CLAUDE.md`, no user settings, skills or plugins, the authentication (the keychain) kept; `CLAUDE_CONFIG_DIR` set to a temporary folder loses it (« Not logged in »). The classroom's `CLAUDE.md`, its `@` imports and its skills load as in the desktop app. A classroom never opened by hand is not trusted, so Claude Code ignores the `allow` list of its `.claude/settings.json`: the harness passes it as `--allowedTools`, with `--permission-mode acceptEdits` and `--permission-prompts none` (what would prompt is denied). `--output-format stream-json --verbose` gives every message and tool call. A turn with an `if` is sent only when the previous reply ends on the next line or asks a question.
3. **The transcript**: `transcript.json` in the run folder, `<tmp>/feyn-fresh-test/<course id>-<scenario id>-<stamp>/` (printed): each turn's text and tool calls with their results, its tokens, cost and time, then the files of `learner/` and the classroom's git log at the end.
4. **The judgement**, both parts in the run folder's `report.md`:
   - the **script** part checks the form rules a program can check, for the slugs the scenario names, each with its proof: `first-message-without-tools` (no tool call in the first reply but the load of a teacher skill), `short-messages` (at most 15 lines, a line wider than 100 characters counting as several), `example-question-quote-form` and `follow-up-quote-form` (the quote's form), `descriptive-site-links` (no bare address), `course-language-typography` (no character of `typography.banned`), `one-question-per-message` (the quoted question counts one, and no other « ? » outside « », the example, `phrases.why` and `phrases.continue_prompt`), `never-ask-if-understood`, `waiting-sentence-first`, `resume-opening-sentence` and `stop-opening-sentence` (a sentence before the first tool call), `write-only-in-learner`, `write-tool-not-shell`, `one-write-per-file`, `commit-after-save-point` and `no-task-list` (the tool calls);
   - the **agent** part is a fresh `claude -p` on Sonnet with no tool (`--tools ""`), prompted by `fresh-test-judge.md` with the scenario, the rules as the classroom holds them, the transcript and `learner/` (with, for context, the rules those rules cite or rely on, as `what-counts-as-one-question` for `one-question-per-message`): for each slug of the scenario, observed or not observed, with the turn and the passage that shows it; it changes nothing;
   - the report ends with the verdict per slug: observed when the agent says so and the script, where it checks the slug, too.
5. The classroom is removed, unless `--keep`.

A tool call `Skill` that loads a teacher skill is the composition at work (rule `teacher-loads-composition`), not a tool call of the rules that say « sans appel d'outil » or « avant le premier appel d'outil »: both parts count it apart.

Exit 0 when every slug of the scenario is observed, 1 otherwise (a slug not observed, a build or a run that failed), 2 a usage error (an unknown scenario or option, a scenario not valid against the MAJOR's `scenario.schema.yaml`). A run costs real tokens (the first five test scenarios: 0.5 to 2 USD and one to two minutes each, judge included, on Sonnet, 2026-11-03): it is not run for now, a change of what is expected of the teacher being proven by `test-build` and a teaching session the maintainer plays on the bench course (decision `teacher-yardstick-cafe-and-maintainer-session`). Claude Code keeps each teacher conversation under `~/.claude/projects/`, as it does any session's.
