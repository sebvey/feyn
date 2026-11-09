# teacher-builder/linear-fr/1: the teacher implementation of linear-fr@1

| Reader | Comes for | Opens |
|---|---|---|
| builder | the parts of the composition as text, which `build-teacher` realises in a classroom | [`render-parts`](render-parts), [`parts.schema.yaml`](parts.schema.yaml), "The document" below |
| builder | what changes here when the instructions, the composition, the learner templates or the spec's lexicons change form | [`render-parts`](render-parts), [`test-render`](test-render) |

The readers are defined in [`spec-directives/README.md`](../../../spec-directives/README.md#the-readers).

The implementation of the teacher of the spec MAJOR `linear-fr@1` (`product-lines/linear-fr/1/`), for Claude Code (decision `teacher-implementation-folder`): what the spec does not fix of the teacher. The implementation reads the spec, its manifest, its two lexicons, its course parser and its sample course; the spec never reads it. `teacher-builder/build-teacher` reads `spec: linear-fr@1` in a course's `course.yaml`, runs this folder's `render-parts` and validates its output against `parts.schema.yaml`, then writes the classroom (`teacher-builder/README.md`). A second MAJOR or a second spec writes its own `teacher-builder/<spec>/<MAJOR>/`; the engine at the root does not change.

- `instructions.yaml`: the instructions of the teacher, in French (decision `language-policy`), the texts of the former protocol in « tu », by family and group; the raw material of the means, which the next story of epic #757 rewrites from the protocol rules of the spec.
- `composition.yaml`: the five parts a classroom's teacher is made of, each by when it is loaded and what it draws from.
- `templates/learner/`: the learner templates, the files learner memory starts from, in French.
- `render-parts`: the rendering, a Node script.
- `parts.schema.yaml`: the shape of its output, JSON Schema 2020-12 written in YAML.
- `test-render`: its test.

## The command

```
mise exec -- teacher-builder/linear-fr/1/render-parts <course-dir> [--site-url <base>] [--channel <c>]
```

It reads the course through the spec's parser (`product-lines/linear-fr/1/course/parser.js`, `load`, with the spec's `course/lexicon.yaml` and `course/form.yaml`, as the site build reads it), the instructions (the rules of `instructions.yaml` by family and group, each family and group with its `purpose`), `composition.yaml`, the two lexicons of the spec (`products/teacher/lexicon.yaml`, `course/lexicon.yaml`) and the learner templates, and prints one JSON document to stdout. It writes nothing. It loads the `yaml` package through the lib of the spec directives the spec MAJOR declares (`mise exec -- npm ci --prefix spec-directives/1` once).

- `--site-url <base>`: the address of the course's site. The four classroom parameters are derived from it: `<base>`, `<base>domaines/`, `<base>domaines/{n}/`, `<base>concepts/{nn}/`. Without it, each reads « (site non publié) ».
- `--channel <c>`: the classroom's channel (decision `three-channels`), `next` by default, a classroom parameter passed through.

Exit 0 rendered, 1 an input it cannot read (a placeholder in neither lexicon, a moment naming neither a group, a family nor a rule of the instructions, a course of another spec, a course the parser cannot read), 2 a usage error.

## The document

| Key | Holds |
|---|---|
| `spec` | `linear-fr@1` |
| `permanent` | the part `permanent`: `protocol`, every rule no moment loads, in the order of `instructions.yaml`, each family and group that keeps a rule preceded by its heading (`## <n>. <title>` for a family, n its rank in the file; ``### <title> (`<id>`)`` for a group) and its `purpose`, each rule as `**<id>** <text>`, its `why` on a line `*Pourquoi :* <why>`; `posture`, the paragraph of `plan.md` under « Accueil »; `course_map`, each domain, then its concepts, number, title and `dir`, in the words of `phrases.domain_title` and `phrases.concept_title`, then each annex under its own title, as its `concept.md` opens (`block_kinds.annex`, its id, `block_kinds.separator`, its title: « Annexe A1 : Les méthodes »), and its `dir`; `course_files`, the files of the course as paths under `course/`, each with what it holds, a concept or an annex folder with the files it has (`concept.md`, `sources.md`) |
| `moments` | the part `on-demand`, one entry per moment of the composition, in its order: `id`, `when`, `draws` (what the moment reads from the course and learner memory, each a `path` under `course/` or `learner/`, a `what`, and a `text` when the draw names a heading of a course file whose path holds no slot: the section under that heading, given so that the moment needs no read, as the onboarding questions of `plan.md` are), `slots` (the slots of those paths, `<dir>`, `<file>`, each with its `meaning`), `rules` (its rules as text: a group under its heading raised to `##` with its `purpose`, a family by its category with its groups, rules by slug under the heading of their family or group; empty while the moment has no rule, `reset`) |
| `learner_templates` | the part `learner-memory`: each learner template of `templates/learner/`, its `name` and its `text` verbatim |
| `permissions` | the part `permissions`, from its `classroom` draws: `writable` (the folders the teacher writes, `learner/`), `read_only` (those it never writes, `course/`), `commit` (what it writes is committed), `push` (`false`: never pushed), read from the French `what` of each draw: « peut s'écrire », « se commite », « ne se pousse jamais », « en lecture seule » |
| `params` | the parameters used: `course` (`id`, and the course parameters `title`, `domain_count`, `storyline`, `glossary`), `classroom` (`site_url`, `domains_url`, `domain_url`, `concept_url`, and `channel`) |

The part `course-reads` has no key: it is the course folder as it is, which `build-teacher` copies.

A family is found by its category (the moment `stop`): in `instructions.yaml`, a family is the group whose `id` is its category, and a group belongs to the family of its `category`, which comes before it. `render-parts` holds no list of the families: a family is the group whose `id` is its category.

## The filling

Every text is final. `{group.key}` takes the value of the spec's `products/teacher/lexicon.yaml` or `course/lexicon.yaml` (a list as its items in « », separated by commas, in place of the « » around the placeholder), `{course.<name>}` the course parameter, `{classroom.<name>}` the classroom parameter. A slot without a dot (`{n}`, `{title}`) is the teacher's to fill and stays. Two spots keep the sentence whole: a phrase in « » that ends with its own period is not followed by the period the rule adds after the » (« Je sauvegarde ta progression, un instant. »), and a value already in parentheses, inside the parentheses of a link, keeps one pair (`[le site web](site non publié)`).

## The test

`mise exec -- teacher-builder/linear-fr/1/test-render` runs `render-parts` on `cafe`, the spec's sample course (`product-lines/linear-fr/1/course/samples/cafe/`), with no `--site-url` and with one, validates each document against `parts.schema.yaml` (ajv's `Ajv2020`), and checks what the schema cannot say: one moment per moment of the composition, each rule of the instructions once, the learner templates verbatim, both annexes in the course map under their own title and no `teaching.md` among the course files, the parameters, and the two spots of the filling with the plural of the domains. Exit 0 when every check passes. `teacher-builder/test-build` tests the classroom built from the document.
