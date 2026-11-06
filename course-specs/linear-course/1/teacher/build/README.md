# linear-course: the rendering of the teacher's parts

| Reader | Comes for | Opens |
|---|---|---|
| builder | the parts of the composition as text, for a classroom build to realise | [`render-parts`](render-parts), [`parts.schema.yaml`](parts.schema.yaml), "The document" below |
| spec writer | what changes here when the protocol, the composition or the lexicons change form | [`render-parts`](render-parts), [`test-render`](test-render) |

The readers are defined in [`spec-directives/README.md`](../../../../../spec-directives/README.md#the-readers).

The half of a classroom build that depends on this spec MAJOR: the form of the protocol (`teacher/rules.yaml`), the format of `teacher/composition.yaml` and the keys of the two lexicons are this MAJOR's, so what reads them is versioned with it, as `course/checks/` is. The other half, the realisation of the parts for a target, depends on the target only and lives at the root of the repository (`classroom-builder/`), which reads `spec: <name>@<MAJOR>` in a course's `course.yaml`, runs this folder's `render-parts` and validates its output against `parts.schema.yaml`, as `course-specs/check-course` dispatches to the MAJOR's `course/checks/check-course`. A second MAJOR or a second spec writes its own `teacher/build/`; the root does not change. Nothing in this folder names a mechanism of a target.

- `render-parts`: the rendering, a Node script.
- `parts.schema.yaml`: the shape of its output, JSON Schema 2020-12 written in YAML, as `course/schemas/`.
- `test-render`: its test.

## The command

```
mise exec -- course-specs/linear-course/1/teacher/build/render-parts <course-dir> [--site-url <base>] [--channel <c>]
```

It reads the course (`course.yaml`, `plan.md`), the protocol (the rules of `teacher/rules.yaml` by family and group, each family and group with its `purpose`), `teacher/composition.yaml`, the two lexicons and the learner templates, and prints one JSON document to stdout. It writes nothing. It loads the `yaml` package through the lib of the spec directives this MAJOR declares (`mise exec -- npm ci --prefix spec-directives/1` once).

- `--site-url <base>`: the address of the course's site. The four classroom parameters are derived from it: `<base>`, `<base>domaines/`, `<base>domaines/{n}/`, `<base>concepts/{nn}/`. Without it, each reads « (site non publié) ».
- `--channel <c>`: the classroom's channel (decision `three-channels`), `next` by default, a classroom parameter passed through.

Exit 0 rendered, 1 an input it cannot read (a placeholder in neither lexicon, a moment naming neither a group, a family nor a rule of the protocol, a course of another spec), 2 a usage error.

## The document

| Key | Holds |
|---|---|
| `spec` | `linear-course@1` |
| `permanent` | the part `permanent`: `protocol`, every rule no moment loads, in the order of `teacher/rules.yaml`, each family and group that keeps a rule preceded by its heading (`## <n>. <title>` for a family, n its rank in the file; ``### <title> (`<id>`)`` for a group) and its `purpose`, each rule as `**<id>** <text>`, its `why` on a line `*Pourquoi :* <why>`; `posture`, the paragraph of `plan.md` under « Accueil »; `course_map`, each domain, then its concepts, number, title and `dir`, in the words of `phrases.domain_title` and `phrases.concept_title`; `course_files`, the files of the course as paths under `course/`, each with what it holds |
| `moments` | the part `on-demand`, one entry per moment of the composition, in its order: `id`, `when`, `draws` (what the moment reads from the course and learner memory, each a `path` under `course/` or `learner/`, a `what`, and a `text` when the draw names a heading of a course file whose path holds no slot: the section under that heading, given so that the moment needs no read, as the onboarding questions of `plan.md` are), `slots` (the slots of those paths, `<dir>`, `<file>`, each with its `meaning`), `rules` (its rules as text: a group under its heading raised to `##` with its `purpose`, a family by its category with its groups, rules by slug under the heading of their family or group; empty while the moment has no rule, `reset`) |
| `learner_templates` | the part `learner-memory`: each learner template of `teacher/templates/learner/`, its `name` and its `text` verbatim |
| `permissions` | the part `permissions`, from its `classroom` draws: `writable` (the folders the teacher writes, `learner/`), `read_only` (those it never writes, `course/`), `commit` (what it writes is committed), `push` (`false`: never pushed), read from the French `what` of each draw: « peut s'écrire », « se commite », « ne se pousse jamais », « en lecture seule » |
| `params` | the parameters used: `course` (`id`, and the course parameters `title`, `domain_count`, `storyline`, `glossary`), `classroom` (`site_url`, `domains_url`, `domain_url`, `concept_url`, and `channel`) |

The part `course-reads` has no key: it is the course folder as it is, which a classroom build copies.

A family is found by its category (the moment `stop`): in `teacher/rules.yaml`, a family is the group whose `id` is its category, and a group belongs to the family of its `category`, which comes before it. `render-parts` holds no list of the families; the test `rule-files` of `check-spec` holds one, a debt named in idea #485.

## The filling

Every text is final. `{group.key}` takes the value of `teacher/lexicon.yaml` or `course/lexicon.yaml` (a list as its items in « », separated by commas, in place of the « » around the placeholder), `{course.<name>}` the course parameter, `{classroom.<name>}` the classroom parameter. A slot without a dot (`{n}`, `{title}`) is the teacher's to fill and stays. Two spots keep the sentence whole: a phrase in « » that ends with its own period is not followed by the period the rule adds after the » (« Je sauvegarde ta progression, un instant. »), and a value already in parentheses, inside the parentheses of a link, keeps one pair (`[le site web](site non publié)`).

## The test

`mise exec -- course-specs/linear-course/1/teacher/build/test-render` runs `render-parts` on `cafe`, the spec's example course (`course-specs/linear-course/1/course/examples/cafe/`), with no `--site-url` and with one, validates each document against `parts.schema.yaml` (ajv's `Ajv2020`), and checks what the schema cannot say: one moment per moment of the composition, each rule of the protocol once, the learner templates verbatim, the parameters, and the two spots of the filling with the plural of the domains. Exit 0 when every check passes. `classroom-builder/test-build` tests the classroom built from the document.
