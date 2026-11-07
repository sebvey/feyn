# linear-course: the published parts of a course, for its site

| Reader | Comes for | Opens |
|---|---|---|
| builder | the published parts of a course as data, for the site engine to lay out | [`render-site`](render-site), [`site.schema.yaml`](site.schema.yaml), "The document" below |
| spec writer | what changes here when the form, the lexicons or the URL scheme change | [`render-site`](render-site), [`test-render`](test-render), [`../../course/form.yaml`](../../course/form.yaml) |

The readers are defined in [`spec-directives/README.md`](../../../../../spec-directives/README.md#the-readers).

The half of a site build that depends on this spec MAJOR: the form of a course (`course/form.yaml`, which says what is published), the keys of the course lexicon, the site's lexicon and its URL scheme are this MAJOR's, so what reads them is versioned with it, as `teacher/build/` is for the classroom build. The other half, the site engine, depends on the target only and lives at the root of the repository (`site-builder/`): it runs this folder's `render-site`, validates its output against `site.schema.yaml` and lays the pages out from it, never reading a course file, nor a spec file but this schema. A second MAJOR or a second spec writes its own `site/build/`; the root does not change. Nothing in this folder names a mechanism of the engine.

- `render-site`: the rendering, a Node script.
- `site.schema.yaml`: the shape of its output, JSON Schema 2020-12 written in YAML, as `teacher/build/parts.schema.yaml`.
- `test-render`: its test.

## The command

```
mise exec -- course-specs/linear-course/1/site/build/render-site <course-dir> [--form <file>]
```

It reads the course through the lib of the spec directives this MAJOR declares, `spec-directives/1/lib/course.js` (with `md.js`, `refs.js` and `glossary.js`), the one course parser the checks use: `course.yaml`, `logo.svg`, `plan.md`, the domain files, each concept folder (`concept.md`, its frontmatter and its diagrams, `sources.md`), `storyline.md`, `glossary.md` and `CHANGELOG.md`. It keeps the parts `course/form.yaml` names `published: true`, closed by default: a part the form does not name, or names without `published: true`, is never output, so « Consigne au professeur », « Accueil », the free sections of `plan.md`, « Non vérifié » and « Non publié » never are. It adds the language of the MAJOR's `spec.yaml`, the words of `site/lexicon.yaml`, those of `course/lexicon.yaml` the published parts carry (their headings, the kind words, a case's among them, the labels of the fields of a unit, the stance markers) and `site/url-scheme.yaml`, and prints one JSON document to stdout. It writes nothing and rewrites no course text. It loads the `yaml` package through that lib (`mise exec -- npm ci --prefix spec-directives/1` once).

- `--form <file>`: a form other than `course/form.yaml`, YAML or JSON, so that `test-render` checks the closed default; a site build never gives it.

Exit 0 rendered, 1 an input it cannot read (a course of another spec, a course map with no domain or no concept, a form that does not publish the course map or the logo, a `course.yaml` with no `site.accent_color`, a missing `logo.svg`, `plan.md`, domain file, `concept.md` or diagram SVG, a URL scheme without `pages.domain`, `pages.concept` or the form of `{nn}`, a `spec.yaml` with no `language`), 2 a usage error. A missing `storyline.md`, `glossary.md`, `CHANGELOG.md` or `sources.md` is no error: its key is null (`storyline`, `glossary`, `release`) or absent (a concept's `sources`).

## The document

Every text is the course's Markdown as written: its stance markers (`[cours]`) and its concept references (« concept 0b ») stay in it as written, for the engine to render as badges and links.

| Key | Holds |
|---|---|
| `spec` | `linear-course@1` |
| `language` | `language` of the MAJOR's `spec.yaml` (ISO 639-1), the language of its courses and of every page of the site |
| `course` | `id`, `title`, `subtitle`, `annexes` of `course.yaml`; `logo`, the text of the course's `logo.svg` as written (`logo` of `course/form.yaml`); `accent_color`, `site.accent_color` of `course.yaml`, as declared: the engine derives the favicon, the share image and the accent of each theme from them |
| `plan` | the published sections of `plan.md`, each `key` (its lexicon key), `heading`, `text` |
| `domains` | each domain of `course.yaml`, in order: `number`, `slug`, `title`, `objective`, `duration_min`, `concepts` (their numbers), `path` (its address), `sections` (the published sections of its domain file, as in `plan`) |
| `concepts` | each concept and annex of `course.yaml`, in order: `number`, `annex`, `slug`, `title`, `objective`, `prerequisites`, `duration_min`, `domain` (the number of the domain that lists it, null for an annex), `path`; then its published parts: `head` (« L'essentiel »), `sections` (each `id`, `title` and its `units`, each `id`, `title` and its published `blocks`, in the order the site renders them: `lesson` its matter, `cases` each with its `title` (from its heading), its `anchor` and `question`, `revealed` (what the site shows hidden until the reader reveals it, the fields `revealed` of the block of cases in `course/form.yaml`: its `expected_answer`, then its `misconceptions_in_play`, each its `name` and the `id` of the misconception of its unit it names) and `supplementary`, then `misconceptions`, those of the lesson, each its `id` (its anchor on the concept page, the unit's id then its name in lowercase ASCII words joined by hyphens), `name`, `belief`, `root` and `correction`, after the cases so that the site gives none away before the question), `foot` (its `heading` and its published blocks), `stances` (under their `heading`), `neighbors`, `diagrams` (each entry with its `svg`, the file as written), `sources` (the published sections of `sources.md`, each its table, `header` and `rows`) |
| `storyline` | `world` (its H1 `title`, its `text`, its `sections` before the fixed facts) and `fixed_facts` (`heading`, each fact's `text` as written and its `unit`) |
| `glossary` | `table`, its first table (`header`, `rows`), and its published `sections` (« Termes à éviter »), each its table |
| `release` | the latest release of `CHANGELOG.md`, `version` and `date`; null while it has none, the site then writing its own « version non publiée » |
| `concept_refs` | each distinct concept reference of the published text, its `text` as written and its `targets`: each `id` with the `concept` it names, that concept's `path` and the `anchor` (the id of a section or a unit, null for a whole concept) |
| `words` | `course`, the words of `course/lexicon.yaml` the published parts carry, by group and key (`headings`, `block_kinds`, `unit_blocks`, `unit_fields`, `markers`); `site`, `site/lexicon.yaml` as written |
| `url_scheme` | `site/url-scheme.yaml` as written; `path` above is already filled from it |

## The test

`mise exec -- course-specs/linear-course/1/site/build/test-render` runs `render-site` on `cafe`, the spec's sample course (`course-specs/linear-course/1/course/samples/cafe/`), validates the document against `site.schema.yaml` (ajv's `Ajv2020`), and checks what the schema cannot say: the language is that of `spec.yaml`, the logo is `logo.svg` as written and the accent colour that of `course.yaml`, a fragment of each published part reaches it, the SVG as written, a concept reference resolved, the misconceptions of every unit after its cases, each with its id, its name, its belief, its « Racine » and its « Correction »; each case of `cafe` under the title of its heading, in the order of the concept file, its expected answer and « Idées fausses en jeu » inside `revealed` and nowhere else, each name in play linking to the id of the misconception of its unit of that name; no unpublished part does (each « Consigne au professeur », « Accueil », a free section of `plan.md`, « Non vérifié », the introduction of `glossary.md`, « Non publié »); the closed default, one case each, on a copy of the form: a part named `published: false`, a part named without `published`, a part the form does not name, a file the form does not name, and a form that does not name `logo.svg`, which `render-site` refuses (the site has no default logo); the latest release, on a copy of `cafe` given two. Exit 0 when every check passes. `check-spec` does not run it, as it does not run `teacher/build/test-render`.
