# classroom-builder

Builds a classroom from a course: everything that makes the teacher, the teacher template
(`CLAUDE.template.md`), the classroom build (`build-classroom`), which builds the teacher skills of
the moments into the classroom from the composition, and its test (`test-build`), and the decisions
about teacher behaviour (`classroom-builder/decisions/`). `classroom-builder/skills/` is kept for a
teacher skill written by hand, if one comes; it holds none and the build does not read it. The classroom itself is built outside this repository from these
files and a course; it is rebuilt, never edited by hand (decision `one-source-two-builds`).

## The command

```
mise exec -- classroom-builder/build-classroom <course-dir> [--out <dir>] [--channel next|prod|preview] [--site-url <base>] [--force]
```

- `<course-dir>`: a course folder, `courses/<id>/`. The build reads its `course.yaml` and the spec
  MAJOR it declares (`spec: linear-course@1`): `teacher/composition.yaml`, the protocol (the
  `**slug** text` rules of `teacher/README.md`, until #450 moves them to `teacher/rules.yaml`), the
  two lexicons and the learner templates. It loads the `yaml` package through the lib of the spec
  directives the MAJOR declares (`mise exec -- npm ci --prefix spec-directives/1` once).
- `--out <dir>`: the classroom's folder. Without it, `~/classrooms/<course id>-next/` (channel
  next) or `~/classrooms/<course id>/` (channel prod), as decision `three-channels` says.
- `--channel`: `next` (the default), `prod`, or `preview` (a disposable classroom, which needs
  `--out`). It is written to `course.lock`.
- `--site-url <base>`: the address of the course's site for the channel. The site addresses are
  derived from it: `<base>`, `<base>domaines/`, `<base>domaines/{n}/`, `<base>concepts/{nn}/`.
  Without it, `site_url` is `null` in `course.lock` and the four classroom parameters read
  « (site non publié) », so that no rule points at a dead address.
- `--force`: a target that exists and is not empty is refused, since learner memory may live
  there; `--force` empties it, learner memory included, and builds again, but only a classroom (a
  folder holding `course.lock`): any other non-empty folder is refused even with `--force`.

`--channel prod` built from something other than a course tag `<id>/v*` (decision
`three-channels`) builds, with a warning: `course.lock` records the `ref` it was read from.

Exit 0 built, 1 an input the build cannot read (a placeholder no lexicon holds, a moment naming
an unknown rule), 2 a usage error or a refused target.

## What each part of the composition becomes

The composition (`course-specs/<name>/<MAJOR>/teacher/composition.yaml`) names no mechanism; this
build realises each part in Claude Code.

| Part | In the classroom |
|---|---|
| `permanent` | `CLAUDE.md`, from `CLAUDE.template.md`: the course and its channel (from `course.lock`), the posture (the paragraph of `plan.md` under « Accueil »), the course map (each domain, then its concepts, number, title and `dir`, in the words of `phrases.domain_title` and `phrases.concept_title`), the names of the course files, the list of the moments and their skills, then every rule of the protocol that no moment loads, in the order of `teacher/README.md`, each family and group that keeps a rule preceded by its heading and its Purpose paragraph (the reader tables are the spec's readers', left out). `@learner/apprenant.md`, `@learner/observations.md` and `@course/course.yaml` are imported at the start, as the rules say they are given (« fourni au démarrage ») |
| `on-demand` | `.claude/skills/<moment id>/SKILL.md`, one per moment that has rules (none for `reset` while it has none): its description says when it is used, from the moment's `when`; its body names what the moment reads (its `draws`) and holds its rules, a group by its id, a family by its category (the list `FAMILIES` of `spec-directives/1/tests/rule-files.js`, a debt named in `spec-directives/1/README.md` section 8), or rules by slug |
| `course-reads` | `course/`, the course folder copied as is |
| `learner-memory` | `learner/`, the three learner templates copied as is |
| `permissions` | `.claude/settings.json`: allows `git add learner/` and `git commit`, denies `Edit` and `Write` under `course/` and `git push` |

Then `course.lock` (`course`, `ref`, `course_sha`, `tooling_sha`, `channel`, `site_url`,
`built_at`: the course, the tag or branch it was read from, the last commit of the course folder,
the last commit of `classroom-builder/`, the channel, the site address or `null`, the date in ISO
8601), and the classroom's own git: `git init` and one commit holding all of it.

The rules' text is copied verbatim, French, with every placeholder filled: `{group.key}` by the
value of `teacher/lexicon.yaml` or `course/lexicon.yaml` (a list as its items in « », separated by
commas, in place of the « » around the placeholder), `{course.<name>}` by the course parameter of
`course.yaml`, `{classroom.<name>}` by the classroom parameter of `course.lock`. A slot without a
dot (`{n}`, `{title}`) is the teacher's to fill and stays. The teacher template is English and holds
the frame only, no rule (decision `language-policy`).

## The test

`mise exec -- classroom-builder/test-build` builds `courses/po-essai` into temporary folders and
checks what a command can check: the files of each part, `diff -r` of the course copy, the learner
templates, the skills and their descriptions, no placeholder left, each rule of the protocol once
in `CLAUDE.md` or in one skill, in the protocol's order and verbatim but for its placeholders, each
family and group heading followed by its Purpose, the template without rule text, the
permissions, the fields of `course.lock`, one commit and a clean classroom git, the refusal of a
non-empty target and `--force` (and its refusal of a folder that is not a classroom), `--site-url`, and the default folders of the channels (under a
temporary `HOME`). Exit 0 when every check passes.
