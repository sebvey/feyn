# classroom-builder

Builds a classroom from a course: everything that makes the teacher, the teacher template
(`CLAUDE.template.md`), the classroom build (`build-classroom`), which builds the teacher skills of
the moments into the classroom from the composition, and its test (`test-build`), and the decisions
about teacher behaviour (`classroom-builder/decisions/`). `classroom-builder/skills/` is kept for a
teacher skill written by hand, if one comes; it holds none and the build does not read it. The classroom itself is built outside this repository from these
files and a course; it is rebuilt, never edited by hand (decision `one-source-two-builds`).

## The two halves

The classroom build is cut in two, as the checks are:
- the half that depends on the spec MAJOR, `course-specs/<name>/<MAJOR>/teacher/build/`: its
  `render-parts` reads the protocol, the composition, the two lexicons, the learner templates and
  the course, and prints the five parts of the composition rendered as text, one JSON document
  whose shape the MAJOR's `parts.schema.yaml` fixes (`course-specs/linear-course/1/teacher/build/README.md`);
- the half that depends on the target only, here: the dispatcher and the Claude Code realisation.
  `build-classroom` reads `spec: <name>@<MAJOR>` in the course's `course.yaml`, refuses (exit 2) a
  spec or a MAJOR with no `teacher/build/render-parts`, runs it, validates its output against the
  MAJOR's `parts.schema.yaml` (the `ajv` of the spec directives the MAJOR declares), then writes the
  classroom from it, as `course-specs/check-course` dispatches to the MAJOR's `check-course`.

A second MAJOR or a second spec writes its own `teacher/build/`, and this folder does not change; a
second target rewrites this folder, and the spec does not change. Nothing here reads the protocol
or the composition.

## The command

```
mise exec -- classroom-builder/build-classroom <course-dir> [--out <dir>] [--channel next|prod|preview] [--site-url <base>] [--force]
```

- `<course-dir>`: a course folder, `courses/<id>/`. The build reads the spec MAJOR its
  `course.yaml` declares (`spec: linear-course@1`) and runs that MAJOR's `teacher/build/render-parts`
  on it, which loads the `yaml` package through the lib of the spec directives the MAJOR declares
  (`mise exec -- npm ci --prefix spec-directives/1` once).
- `--out <dir>`: the classroom's folder. Without it, `~/classrooms/<course id>-next/` (channel
  next) or `~/classrooms/<course id>/` (channel prod), as decision `three-channels` says.
- `--channel`: `next` (the default), `prod`, or `preview` (a disposable classroom, which needs
  `--out`). It is written to `course.lock`.
- `--site-url <base>`: the address of the course's site for the channel, passed to
  `render-parts`, which derives the site addresses from it: `<base>`, `<base>domaines/`,
  `<base>domaines/{n}/`, `<base>concepts/{nn}/`. Without it, `site_url` is `null` in `course.lock`
  and the four classroom parameters read « (site non publié) », so that no rule points at a dead
  address.
- `--force`: a target that exists and is not empty is refused, since learner memory may live
  there; `--force` empties it, learner memory included, and builds again, but only a classroom (a
  folder holding `course.lock`): any other non-empty folder is refused even with `--force`.

`--channel prod` built from something other than a course tag `<id>/v*` (decision
`three-channels`) builds, with a warning: `course.lock` records the `ref` it was read from.

Exit 0 built, 1 an input the build cannot read (`render-parts` failed, a placeholder no lexicon of
the spec holds or a moment naming an unknown rule among its causes, or its output is not valid
against the schema), 2 a usage error or a refused target (a spec or MAJOR with no
`teacher/build/render-parts` among them).

## What each part of the composition becomes

The composition (`course-specs/<name>/<MAJOR>/teacher/composition.yaml`) names no mechanism; the
MAJOR's `render-parts` renders each part as text, and this build realises it in Claude Code.

| Part | In the classroom |
|---|---|
| `permanent` | `CLAUDE.md`, from `CLAUDE.template.md`: the course and its channel (from `course.lock`), then the texts of the document's `permanent`, the posture, the course map, the names of the course files, then the list of the moments and their skills, then the permanent protocol (every rule no moment loads, each family and group preceded by its heading and its Purpose). `@learner/apprenant.md`, `@learner/observations.md` and `@course/course.yaml` are imported at the start, as the rules say they are given (« fourni au démarrage ») |
| `on-demand` | `.claude/skills/feyn-teacher-<moment id>/SKILL.md`, one per moment of the document's `moments` whose `rules` is not empty (none for `reset` while it has none): its name `feyn-teacher-<moment id>` (the prefix keeps it apart from a skill of Claude Code itself, `/resume`), its description says when it is used, from the moment's `when`; its body names what the moment reads (its `draws` and `slots`) and holds its `rules` |
| `course-reads` | `course/`, the course folder copied as is |
| `learner-memory` | `learner/`, the document's `learner_templates`, each written as is |
| `permissions` | `.claude/settings.json`, from the document's `permissions`: allows `git add` of each `writable` folder (`learner/`) and `git commit`, denies `Edit` and `Write` under each `read_only` folder (`course/`) and `git push` |

Then `course.lock` (`course`, `ref`, `course_sha`, `tooling_sha`, `channel`, `site_url`,
`built_at`: the course, the tag or branch it was read from, the last commit of the course folder,
the last commit of `classroom-builder/`, the channel, the site address or `null`, the date in ISO
8601), and the classroom's own git: `git init` and one commit holding all of it.

The rules' text is the protocol's, verbatim, French, with every placeholder filled by
`render-parts` (`course-specs/linear-course/1/teacher/build/README.md`, "The filling"). The
teacher template is English and holds the frame only, no rule (decision `language-policy`).

## The test

`mise exec -- classroom-builder/test-build` builds `courses/po-essai` into temporary folders and
checks what a command can check: the files of each part, `diff -r` of the course copy, the learner
templates, the skills `feyn-teacher-<moment>` and their descriptions, the « Moments » list naming
them, no placeholder left, each rule of the protocol once in `CLAUDE.md` or in one skill, in the
protocol's order and verbatim but for its placeholders, each family and group heading followed by
its Purpose, the three spots of the filling (no « ((site », no period after a phrase that ends
with one, no « ses <number> domaines »), the template without rule text, the permissions, the
fields of `course.lock`, one commit and a clean classroom git, the refusal of a non-empty target
and `--force` (and its refusal of a folder that is not a classroom), `--site-url`, the default
folders of the channels (under a temporary `HOME`), and the dispatcher's refusal of an unknown
MAJOR and of a MAJOR with no `teacher/build/`. Exit 0 when every check passes. The MAJOR's
`teacher/build/test-render` tests the rendering itself.
