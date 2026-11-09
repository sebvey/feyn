# teacher-builder/linear-fr/1: the teacher implementation of linear-fr@1

| Reader | Comes for | Opens |
|---|---|---|
| builder | the means of the teacher and the protocol rules each serves | [`instructions.yaml`](instructions.yaml), [`means.yaml`](means.yaml), "The means" below |
| builder | the parts of `composition.yaml` as text, which `build-teacher` realises in a classroom | [`render-parts`](render-parts), [`parts.schema.yaml`](parts.schema.yaml), "The document" below |
| builder | what changes here when the instructions, `composition.yaml`, the lexicon, the learner templates or the spec's lexicon of the course files change form | [`render-parts`](render-parts), [`test-render`](test-render) |

The readers are defined in [`spec-directives/README.md`](../../../spec-directives/README.md#the-readers).

The implementation of the teacher of the spec MAJOR `linear-fr@1` (`product-lines/linear-fr/1/`), for Claude Code (decision `teacher-implementation-folder`): what the spec does not fix of the teacher. The implementation reads the spec, its manifest, its protocol rules, its lexicon of the course files, its course parser and its sample course; the spec never reads it. `teacher-builder/build-teacher` reads `spec: linear-fr@1` in a course's `course.yaml`, runs this folder's `render-parts` and validates its output against `parts.schema.yaml`, then writes the classroom (`teacher-builder/README.md`). A second MAJOR or a second spec writes its own `teacher-builder/<spec>/<MAJOR>/`; the engine at the root does not change.

- `instructions.yaml`: the instructions of the teacher, in French, in « tu » (decision `language-policy`), by group, each with the protocol rules it serves (`serves`).
- `means.yaml`: the means with no text of their own (the learner templates, the permissions, the preparations at build time), each with its `serves`, and the protocol rules left with no means on purpose.
- `lexicon.yaml`: the words the instructions make the teacher say and write, named by key in them; the form marks and titles among them are the protocol rules' words, word for word.
- `composition.yaml`: the five parts a classroom's teacher is made of, each by when it is loaded and what it draws from: how the means reach the teacher, a moment loading groups of instructions whole.
- `CLAUDE.template.md`: the teacher template, the frame of the classroom's `CLAUDE.md`, in French; `build-teacher` fills its slots and refuses a spec MAJOR whose implementation folder has none.
- `templates/learner/`: the learner templates, the files learner memory starts from, in French; each opens on a header comment for whoever edits it, which `build-teacher` drops when it writes `learner/`.
- `render-parts`: the rendering, a Node script.
- `parts.schema.yaml`: the shape of its output, JSON Schema 2020-12 written in YAML.
- `test-render`: its test.

## The means

A means is what makes one or more protocol rules of the spec (`product-lines/linear-fr/1/products/teacher/rules.yaml`) hold on Claude Code, and names them by slug in its `serves` (decision `three-layers-of-a-product`). An instruction carries its `serves` beside its `text` in `instructions.yaml`; a means with no text of its own is an entry of `means.yaml`: its `id`, its `kind` (`template`, `permission`, `hook`, `script`, `build`), its `source` (the file or the setting) and its `serves`. A protocol rule left with no means on purpose is listed under `declared` in `means.yaml`, with its `reason` and `decided` (`by`, `date`). `teacher-builder/test-build` checks the link both ways: every slug a `serves` names is a protocol rule, every protocol rule is served by a means or declared, no means has an empty `serves`; it prints the declared rules. The teacher template (`CLAUDE.template.md`) and `composition.yaml` are the frame the means reach the teacher through, not means.

An instruction: `id` (a slug, unique across `instructions.yaml` and `means.yaml`), `text` (in « tu », French), `serves`, and `why` only when a reason helps the teacher hold it. A group: `id`, `title`, `purpose`, `instructions`, grouped as the loading by moment serves.

## The command

```
mise exec -- teacher-builder/linear-fr/1/render-parts <course-dir> [--site-url <base>] [--channel <c>]
```

It reads the course through the spec's parser (`product-lines/linear-fr/1/course/parser.js`, `load`, with the spec's `course/lexicon.yaml` and `course/form.yaml`, as the site build reads it), the instructions (`instructions.yaml`, by group, each group with its `purpose`), `composition.yaml`, the folder's `lexicon.yaml` and the spec's `course/lexicon.yaml`, and the learner templates, and prints one JSON document to stdout. It writes nothing. It loads the `yaml` package through the lib of the spec directives the spec MAJOR declares (`mise exec -- npm ci --prefix spec-directives/1` once).

- `--site-url <base>`: the address of the course's site. The six classroom parameters are derived from it: `<base>`, `<base>domaines/`, `<base>domaines/{n}/`, `<base>fil-rouge/` (the storyline page), `<base>concepts/{nn}/`, `<base>concepts/{nn}/#schema-{file}` (a diagram on its concept page, `{file}` its file name without `.svg`: the anchor `anchors.diagram` of the site's URL scheme, `product-lines/linear-fr/1/products/site/url-scheme.yaml`). Without it, each reads « (site non publié) ».
- `--channel <c>`: the classroom's channel (decision `three-channels`), `next` by default, a classroom parameter passed through.

Exit 0 rendered, 1 an input it cannot read (a placeholder in neither lexicon, a moment naming no group of the instructions, a group or an instruction with a key its form has not, a course of another spec, a course the parser cannot read, a storyline file with no title « # <titre> » or no text under it), 2 a usage error.

## The document

| Key | Holds |
|---|---|
| `spec` | `linear-fr@1` |
| `permanent` | the part `permanent`: `instructions`, every group of `instructions.yaml` no moment loads, in its order, each under its heading ``## <title> (`<id>`)`` and its `purpose`, each instruction as `**<id>** <text>`, its `why` on a line `*Pourquoi :* <why>`, never its `serves`; `posture`, the paragraph of `plan.md` under « Accueil »; `course_map`, the course map, `file` (`carte-du-cours.md`, its name at the classroom's root, which the template imports) and `text`, in French: the storyline, titled in the words of `phrases.storyline_title`, its file and the text under its H1 verbatim (the world and the learner's role in it); each domain in the course's order, its title in the words of `phrases.domain_title`, its objective and its file, then its concepts; then the annexes under « Annexes », each under its own title, as its `concept.md` opens (`block_kinds.annex`, its id, `block_kinds.separator`, its title: « Annexe A1 : Les méthodes »); each concept (titled in the words of `phrases.concept_title`) and annex with its objective, its prerequisites by their titles, its folder under `course/` and the files it has (`concept.md`, `sources.md`), and its « L'essentiel » (`headings.essentials`) verbatim, the head of its `concept.md` read through the spec's parser; then the other course files, `plan.md`, the storyline and the glossary |
| `moments` | the part `on-demand`, one entry per moment of `composition.yaml`, in its order: `id`, `when`, `draws` (what the moment reads from the course and learner memory, each a `path` under `course/` or `learner/`, a `what`, and a `text` when the draw names a heading of a course file whose path holds no slot: the section under that heading, given so that the moment needs no read, as the onboarding questions of `plan.md` are), `slots` (the slots of those paths, `<dir>`, `<file>`, each with its `meaning`), `instructions` (the groups the moment loads, each as in `permanent`; empty while the moment loads none, `reset`) |
| `learner_templates` | the part `learner-memory`: each learner template of `templates/learner/`, its `name` and its `text` verbatim |
| `permissions` | the part `permissions`, from its `classroom` draws: `writable` (the folders the teacher writes, `learner/`), `read_only` (those it never writes, `course/`), `commit` (what it writes is committed), `push` (`false`: never pushed), read from the French `what` of each draw: « peut s'écrire », « se commite », « ne se pousse jamais », « en lecture seule » |
| `params` | the parameters used: `course` (`id`, and the course parameters `title`, `domain_count`, `storyline`, `glossary`), `classroom` (`site_url`, `domains_url`, `storyline_url`, `domain_url`, `concept_url`, `diagram_url`, and `channel`) |

The part `course-reads` has no key: it is the course folder as it is, which `build-teacher` copies.

## The filling

Every text is final. `{group.key}` takes the value of the folder's `lexicon.yaml` or of the spec's `course/lexicon.yaml` (a list as its items in « », separated by commas, in place of the « » around the placeholder), `{course.<name>}` the course parameter, `{classroom.<name>}` the classroom parameter. A slot without a dot (`{n}`, `{title}`) is the teacher's to fill and stays. Two spots keep the sentence whole: a phrase in « » that ends with its own period is not followed by the period the instruction adds after the » (« Je sauvegarde ta progression, un instant. »), and a value already in parentheses, inside the parentheses of a link, keeps one pair (`[le site web](site non publié)`).

## The test

`mise exec -- teacher-builder/linear-fr/1/test-render` runs `render-parts` on `cafe`, the spec's sample course (`product-lines/linear-fr/1/course/samples/cafe/`), with no `--site-url` and with one, validates each document against `parts.schema.yaml` (ajv's `Ajv2020`), and checks what the schema cannot say: one moment per moment of `composition.yaml`, each instruction once and no `serves` rendered, the learner templates verbatim, the course map's file, both annexes in it as annexes under their own title, each « L'essentiel » of `cafe` verbatim and no `teaching.md`, the parameters, and the two spots of the filling with the plural of the domains. Exit 0 when every check passes. `teacher-builder/test-build` tests the classroom built from the document, and the link between the means and the protocol rules.
